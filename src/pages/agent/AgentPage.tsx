import { useCallback, useEffect, useRef, useState, type MouseEvent } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useUser } from '@/hooks/useUser'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { SoulBrand, SoulButton, SoulChip, SoulComposer, SoulNav, type SoulNavTab } from '@/components/soul'
import {
  deleteThread,
  fetchHistory,
  fetchThreads,
  formatApiError,
  sendChat,
  type AgentMessage,
  type AgentThread,
} from '@/lib/soulAgentApi'
import { toast } from 'sonner'
import './agent-chat.css'
import bgChat from './assets/bg-chat.png'
import orbChat from './assets/orb-chat.png'
import iconMenu from './assets/icon-menu.svg'
import iconSave from './assets/icon-save.svg'
import iconSaved from './assets/icon-saved.svg'
import iconChapter from './assets/icon-chapter.svg'
import iconCopy from './assets/icon-copy.svg'
import iconBack from './assets/icon-back.svg'
import iconNewChat from './assets/icon-new-chat.svg'
import iconChevron from './assets/icon-chevron.svg'
import iconCheck from './assets/icon-check.svg'
import iconRetry from './assets/icon-retry.svg'
import { TopUpSheet, TopUpSuccessPill, type TopUpSheetMode } from './TopUpSheet'

const DESKTOP_MQ = '(min-width: 900px)'
const SUGGESTIONS = ['Money this year', 'Why do I pull away?', 'What am I avoiding?'] as const
/** UI shell until top-up / quota is wired to backend */
const MESSAGES_LEFT_SHELL = 3

type AgentNavState = {
  starter?: string
  quotedNote?: string
  /** When true (or when a starter is present), open a blank thread instead of the latest chat */
  newChat?: boolean
}

function seedFromNavState(state: unknown): string {
  if (!state || typeof state !== 'object') return ''
  const s = state as AgentNavState
  return (s.starter ?? s.quotedNote ?? '').trim()
}

function wantsNewChatFromNav(state: unknown): boolean {
  if (!state || typeof state !== 'object') return false
  const s = state as AgentNavState
  return Boolean(s.newChat) || Boolean(seedFromNavState(state))
}

function truncate(text: string | undefined, n = 42) {
  if (!text) return 'New conversation'
  const t = text.trim().replace(/\s+/g, ' ')
  return t.length > n ? t.slice(0, n) + '…' : t
}

function formatHistoryMeta(thread: AgentThread): string {
  const count = thread.message_count ?? 0
  const msgs = `${count} message${count === 1 ? '' : 's'}`
  if (!thread.updated_at) return msgs
  const then = new Date(thread.updated_at).getTime()
  if (Number.isNaN(then)) return msgs
  const diffMs = Date.now() - then
  const mins = Math.floor(diffMs / 60000)
  if (mins < 1) return `${msgs} · just now`
  if (mins < 60) return `${msgs} · ${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${msgs} · ${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 7) return `${msgs} · ${days}d ago`
  return `${msgs} · ${new Date(thread.updated_at).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  })}`
}

function newThreadId() {
  if (window.crypto?.randomUUID) {
    return 'thread_' + crypto.randomUUID().slice(0, 8)
  }
  return 'thread_' + Date.now()
}

function MentorBubble({ content }: { content: string }) {
  return (
    <div className="soul-chat__bubble soul-chat__bubble--mentor">
      <div className="msg-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

function UserBubble({ content }: { content: string }) {
  return (
    <div className="soul-chat__bubble soul-chat__bubble--user">
      <p className="soul-chat__bubble-text">{content}</p>
    </div>
  )
}

function ThinkingRow() {
  return (
    <div className="soul-chat__typing" aria-live="polite" aria-label="Still with you">
      <div className="soul-chat__typing-bubble" aria-hidden="true">
        <span className="soul-chat__typing-dot" />
        <span className="soul-chat__typing-dot" />
        <span className="soul-chat__typing-dot" />
      </div>
      <p className="soul-chat__typing-label">Still with you — going through your chapters.</p>
    </div>
  )
}

function FailedBubble({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="soul-chat__bubble soul-chat__bubble--failed">
      <p className="soul-chat__bubble-text">
        I lost that one — something interrupted me on my side. Your message is saved.
      </p>
      <button type="button" className="soul-chat__retry" onClick={onRetry}>
        <img src={iconRetry} alt="" width={14} height={14} />
        Try again
      </button>
    </div>
  )
}

type ChatGate = 'none' | 'limit' | 'ended'

function LimitGateCard({
  onAddMore,
  onDismiss,
}: {
  onAddMore: () => void
  onDismiss: () => void
}) {
  return (
    <div className="soul-chat__gate" role="dialog" aria-label="Message limit">
      <div className="soul-chat__gate-copy">
        <p className="soul-chat__gate-title">You&apos;ve used today&apos;s messages.</p>
        <p className="soul-chat__gate-body">
          Your conversation is saved. Come back tomorrow, or keep going now.
        </p>
      </div>
      <div className="soul-chat__gate-actions">
        <button type="button" className="soul-chat__gate-cta" onClick={onAddMore}>
          Add 10 messages · $7
        </button>
        <button type="button" className="soul-chat__gate-secondary" onClick={onDismiss}>
          Not now
        </button>
      </div>
    </div>
  )
}

function EndedGateCard({
  onResume,
  onOpenProfile,
}: {
  onResume: () => void
  onOpenProfile: () => void
}) {
  return (
    <div className="soul-chat__gate" role="dialog" aria-label="Subscription ended">
      <div className="soul-chat__gate-copy">
        <p className="soul-chat__gate-title">Your subscription ended.</p>
        <p className="soul-chat__gate-body">
          Your profile and everything you saved stay yours. Resume to keep talking.
        </p>
      </div>
      <div className="soul-chat__gate-actions">
        <button type="button" className="soul-chat__gate-cta" onClick={onResume}>
          Resume · $5.99/mo
        </button>
        <button type="button" className="soul-chat__gate-secondary" onClick={onOpenProfile}>
          Open my profile
        </button>
      </div>
    </div>
  )
}

function isNetworkError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err ?? '')
  return /failed to fetch|networkerror|load failed|offline|could not reach/i.test(msg)
}

function MessageActions({ content }: { content: string }) {
  const navigate = useNavigate()
  const [saved, setSaved] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      toast.success('Copied')
    } catch {
      toast.error('Could not copy')
    }
  }

  const onSave = () => {
    if (saved) return
    // UI shell — persist to insights backend later
    setSaved(true)
  }

  return (
    <div className="soul-chat__actions-wrap">
      <div className="soul-chat__actions">
        <button
          type="button"
          className={`soul-chat__action${saved ? ' soul-chat__action--saved' : ''}`}
          aria-pressed={saved}
          onClick={onSave}
        >
          <img src={saved ? iconSaved : iconSave} alt="" width={15} height={15} />
          {saved ? 'Saved' : 'Save'}
        </button>
        <button
          type="button"
          className="soul-chat__action"
          onClick={() => navigate('/readings/your-pattern')}
        >
          <img src={iconChapter} alt="" width={15} height={15} />
          Open chapter
        </button>
        <button type="button" className="soul-chat__action" onClick={() => void onCopy()}>
          <img src={iconCopy} alt="" width={15} height={15} />
          Copy
        </button>
      </div>
      {saved ? (
        <div className="soul-chat__status-pill" role="status">
          <img src={iconCheck} alt="" width={13} height={13} />
          <span>Saved to your insights</span>
        </div>
      ) : null}
    </div>
  )
}

/**
 * SOUL+AI Chat — Figma DEV Empty / Generating / Response
 * Wired: threads, history, send, delete. Top-up / limits = UI shell for now.
 */
export default function AgentPage() {
  const { user, subscription, isPremium } = useUser()
  const previewMode = true
  const userId = user?.id
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const navSeed = seedFromNavState(location.state)
  const openFreshChat = wantsNewChatFromNav(location.state) || previewMode

  const [threads, setThreads] = useState<AgentThread[]>([])
  const [currentThreadId, setCurrentThreadId] = useState<string | null>(() =>
    openFreshChat ? newThreadId() : null,
  )
  const [messages, setMessages] = useState<AgentMessage[] | null>(() =>
    openFreshChat ? [] : null,
  )
  const [thinking, setThinking] = useState(false)
  const [sendFailed, setSendFailed] = useState(false)
  const [retryMessage, setRetryMessage] = useState<string | null>(null)
  const [offline, setOffline] = useState(
    () => typeof navigator !== 'undefined' && !navigator.onLine,
  )
  const [isSending, setIsSending] = useState(false)
  const [deletingThreadId, setDeletingThreadId] = useState<string | null>(null)
  const [threadPendingDelete, setThreadPendingDelete] = useState<string | null>(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [desktop, setDesktop] = useState(false)
  const [threadsError, setThreadsError] = useState<string | null>(null)
  const [input, setInput] = useState(() => navSeed)
  const [composerFocus, setComposerFocus] = useState(() => Boolean(navSeed))
  /** UI shell until quota / billing is wired */
  const [shellGate, setShellGate] = useState<ChatGate>('none')
  const [gateCardHidden, setGateCardHidden] = useState(false)
  const [messagesLeft, setMessagesLeft] = useState(MESSAGES_LEFT_SHELL)
  const [topUpOpen, setTopUpOpen] = useState(false)
  const [topUpMode, setTopUpMode] = useState<TopUpSheetMode>('pay')
  const [topUpPaying, setTopUpPaying] = useState(false)
  const [cardLabel, setCardLabel] = useState('Visa ending 4242')
  const [showTopUpSuccess, setShowTopUpSuccess] = useState(false)
  const [showLimitNote, setShowLimitNote] = useState(false)

  const chatRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const currentThreadIdRef = useRef<string | null>(currentThreadId)
  const appliedNavSeed = useRef(false)

  useEffect(() => {
    if (appliedNavSeed.current) return
    const seed = seedFromNavState(location.state)
    const fresh = wantsNewChatFromNav(location.state)
    if (!seed && !fresh) return
    appliedNavSeed.current = true
    if (fresh) {
      if (!currentThreadIdRef.current) {
        const id = newThreadId()
        setCurrentThreadId(id)
        currentThreadIdRef.current = id
      }
      setMessages([])
      setThinking(false)
      setSendFailed(false)
      setRetryMessage(null)
    }
    if (seed) {
      setInput(seed)
      setComposerFocus(true)
    }
    navigate(`${location.pathname}${location.search}`, { replace: true, state: null })
  }, [location.pathname, location.search, location.state, navigate])

  useEffect(() => {
    currentThreadIdRef.current = currentThreadId
  }, [currentThreadId])

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ)
    const sync = () => setDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const param = searchParams.get('gate')
    if (param === 'limit' || param === 'ended') {
      setShellGate(param)
      setGateCardHidden(false)
      setShowLimitNote(false)
      setShowTopUpSuccess(false)
      if (param === 'limit') setMessagesLeft(0)
      return
    }
    if (searchParams.get('sheet') === 'topup') {
      setShellGate('limit')
      setMessagesLeft(0)
      setGateCardHidden(true)
      setTopUpOpen(true)
      setTopUpMode(searchParams.get('fail') === '1' ? 'declined' : 'pay')
      return
    }
    const status = subscription?.status?.toLowerCase() ?? ''
    const ended =
      !!subscription &&
      !isPremium &&
      ['canceled', 'cancelled', 'expired', 'inactive', 'unpaid'].includes(status)
    if (ended) {
      setShellGate('ended')
      setGateCardHidden(false)
    }
  }, [searchParams, subscription, isPremium])

  const chatLocked = shellGate === 'ended' || messagesLeft <= 0
  const showGateCard =
    !topUpOpen &&
    !gateCardHidden &&
    ((shellGate === 'limit' && messagesLeft <= 0) || shellGate === 'ended')

  const openLimitGate = useCallback(() => {
    setShellGate('limit')
    setMessagesLeft(0)
    setGateCardHidden(false)
    setShowLimitNote(false)
    setShowTopUpSuccess(false)
  }, [])

  const openTopUp = useCallback(() => {
    setShellGate('limit')
    setMessagesLeft(0)
    setGateCardHidden(true)
    setShowLimitNote(false)
    setTopUpMode('pay')
    setTopUpOpen(true)
  }, [])

  const closeTopUp = useCallback(() => {
    setTopUpOpen(false)
    setTopUpPaying(false)
    setTopUpMode('pay')
    setGateCardHidden(true)
    setShowLimitNote(true)
    setShellGate('limit')
    setMessagesLeft(0)
  }, [])

  const completeTopUp = useCallback(() => {
    setTopUpPaying(true)
    window.setTimeout(() => {
      const forceFail = searchParams.get('fail') === '1'
      setTopUpPaying(false)
      if (forceFail) {
        setTopUpMode('declined')
        return
      }
      setTopUpOpen(false)
      setTopUpMode('pay')
      setShellGate('none')
      setMessagesLeft(10)
      setGateCardHidden(true)
      setShowLimitNote(false)
      setShowTopUpSuccess(true)
    }, 650)
  }, [searchParams])

  const scrollChatToBottom = useCallback(() => {
    const el = chatRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [])

  useEffect(() => {
    scrollChatToBottom()
  }, [messages, thinking, scrollChatToBottom])

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false)
  }, [])

  const openDrawer = useCallback(() => {
    setDrawerOpen(true)
  }, [])

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((v) => !v)
  }, [])

  const showError = useCallback((err: unknown, fallback?: string) => {
    const message = formatApiError(err) || fallback || 'Something went wrong. Please try again.'
    setThinking(false)
    toast.error(message)
  }, [])

  const clearStatus = useCallback(() => {
    setThinking(false)
    setSendFailed(false)
    setRetryMessage(null)
  }, [])

  const startNewChat = useCallback(() => {
    const id = newThreadId()
    setCurrentThreadId(id)
    setMessages([])
    setThinking(false)
    setSendFailed(false)
    setRetryMessage(null)
    setInput('')
    closeDrawer()
  }, [closeDrawer])

  const loadThreads = useCallback(
    async (opts?: { selectFirst?: boolean }) => {
      if (!userId) return
      try {
        setThreadsError(null)
        const data = await fetchThreads(userId)
        setThreads(data)

        const activeId = currentThreadIdRef.current
        if (!activeId && data.length && opts?.selectFirst !== false) {
          const firstId = data[0].thread_id
          setCurrentThreadId(firstId)
          const history = await fetchHistory(userId, firstId)
          setMessages(history)
          clearStatus()
        } else if (!activeId) {
          startNewChat()
        } else {
          clearStatus()
        }
      } catch (err) {
        const message = formatApiError(err)
        setThreadsError(message)
        toast.error(message)
        if (!currentThreadIdRef.current) startNewChat()
      }
    },
    [userId, startNewChat, clearStatus],
  )

  const selectThread = useCallback(
    async (threadId: string) => {
      if (!userId) return
      setCurrentThreadId(threadId)
      closeDrawer()
      try {
        setThinking(false)
        setSendFailed(false)
        setRetryMessage(null)
        const history = await fetchHistory(userId, threadId)
        setMessages(history)
      } catch (err) {
        setMessages([])
        showError(err, 'Could not load this conversation.')
      }
    },
    [userId, closeDrawer, showError],
  )

  const requestDeleteThread = useCallback(
    (threadId: string, e: MouseEvent) => {
      e.stopPropagation()
      e.preventDefault()
      if (!userId || deletingThreadId) return
      setThreadPendingDelete(threadId)
    },
    [userId, deletingThreadId],
  )

  const confirmDeleteThread = useCallback(async () => {
    const threadId = threadPendingDelete
    if (!userId || !threadId || deletingThreadId) return

    setThreadPendingDelete(null)
    setDeletingThreadId(threadId)
    try {
      await deleteThread(userId, threadId)
      const remaining = threads.filter((t) => t.thread_id !== threadId)
      setThreads(remaining)

      if (currentThreadIdRef.current === threadId) {
        if (remaining.length) {
          await selectThread(remaining[0].thread_id)
        } else {
          startNewChat()
        }
      }
    } catch (err) {
      showError(err, 'Could not delete this conversation.')
    } finally {
      setDeletingThreadId(null)
    }
  }, [
    userId,
    threadPendingDelete,
    deletingThreadId,
    threads,
    selectThread,
    startNewChat,
    showError,
  ])

  useEffect(() => {
    if (userId) void loadThreads({ selectFirst: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId])

  useEffect(() => {
    const syncViewportHeight = () => {
      const frame = frameRef.current
      if (!frame) return
      if (window.matchMedia(DESKTOP_MQ).matches) {
        frame.style.height = ''
        return
      }
      const vv = window.visualViewport
      if (!vv) return
      frame.style.height = `${vv.height}px`
    }

    const vv = window.visualViewport
    vv?.addEventListener('resize', syncViewportHeight)
    vv?.addEventListener('scroll', syncViewportHeight)
    window.addEventListener('resize', syncViewportHeight)
    syncViewportHeight()

    return () => {
      vv?.removeEventListener('resize', syncViewportHeight)
      vv?.removeEventListener('scroll', syncViewportHeight)
      window.removeEventListener('resize', syncViewportHeight)
    }
  }, [])

  useEffect(() => {
    const onOffline = () => setOffline(true)
    const onOnline = () => setOffline(false)
    window.addEventListener('offline', onOffline)
    window.addEventListener('online', onOnline)
    return () => {
      window.removeEventListener('offline', onOffline)
      window.removeEventListener('online', onOnline)
    }
  }, [])

  useEffect(() => {
    scrollChatToBottom()
  }, [sendFailed, offline, showTopUpSuccess, showLimitNote, scrollChatToBottom])

  const handleSend = async (raw?: string, opts?: { isRetry?: boolean }) => {
    if (isSending || !userId || chatLocked) return
    const message = (raw ?? input).trim()
    if (!message) return

    let threadId = currentThreadId
    if (!threadId) {
      threadId = newThreadId()
      setCurrentThreadId(threadId)
    }

    setIsSending(true)
    if (!opts?.isRetry) {
      setInput('')
      setMessages((prev) => [...(prev ?? []), { role: 'user', content: message }])
    }
    setSendFailed(false)
    setRetryMessage(null)
    setThinking(true)

    try {
      const data = await sendChat(userId, threadId, message)
      setMessages((prev) => [
        ...(prev ?? []),
        { role: 'assistant', content: data.answer ?? '(no answer)' },
      ])
      await loadThreads({ selectFirst: false })
      setThinking(false)
      if (navigator.onLine) setOffline(false)
    } catch (err) {
      setThinking(false)
      setSendFailed(true)
      setRetryMessage(message)
      if (isNetworkError(err) || !navigator.onLine) {
        setOffline(true)
      }
    } finally {
      setIsSending(false)
    }
  }

  const handleRetry = () => {
    if (!retryMessage || isSending) return
    void handleSend(retryMessage, { isRetry: true })
  }

  const onNav = (tab: SoulNavTab) => {
    if (tab === 'home') navigate('/')
    else if (tab === 'readings') navigate('/readings')
    else if (tab === 'people') navigate('/people')
    else if (tab === 'profile') navigate('/account')
  }

  // V2 is open — no auth gate until login ships.

  const showWelcome = messages !== null && messages.length === 0 && !thinking
  const lastAssistantIdx =
    messages && messages.length
      ? [...messages].map((m, i) => ({ m, i })).reverse().find((x) => x.m.role === 'assistant')?.i
      : undefined

  return (
    <div className="soul-chat" data-name="Chat · Empty / Generating / Response">
      <div className="soul-chat__bg" aria-hidden="true">
        <img className="soul-chat__bg-img" src={bgChat} alt="" />
        <div className="soul-chat__bg-dim" />
      </div>

      <div
        className={`soul-chat__backdrop${drawerOpen ? ' soul-chat__backdrop--open' : ''}`}
        onClick={closeDrawer}
        aria-hidden={!drawerOpen}
      />

      <aside
        className={`soul-chat__drawer${
          drawerOpen || (desktop && !sidebarCollapsed) ? ' soul-chat__drawer--open' : ''
        }${desktop && sidebarCollapsed ? ' soul-chat__drawer--collapsed' : ''}`}
        aria-hidden={desktop ? sidebarCollapsed : !drawerOpen}
        data-name="Chat · Conversation history"
      >
        <header className="soul-chat__hist-header">
          <div className="soul-chat__hist-header-left">
            <button
              type="button"
              className="soul-chat__hist-back"
              onClick={() => {
                if (desktop) toggleSidebar()
                else closeDrawer()
              }}
              aria-label={desktop ? 'Collapse sidebar' : 'Back to chat'}
            >
              <img src={iconBack} alt="" width={22} height={22} />
            </button>
            <SoulBrand />
          </div>
          <button
            type="button"
            className="soul-chat__hist-new"
            onClick={startNewChat}
            aria-label="New conversation"
          >
            <img src={iconNewChat} alt="" width={22} height={22} />
          </button>
        </header>

        <h2 className="soul-chat__hist-title">Chat history</h2>

        <div className="soul-chat__hist-body">
          {threadsError ? (
            <div className="soul-chat__hist-empty">
              <p className="soul-chat__hist-empty-title">Could not load history.</p>
              <p className="soul-chat__hist-empty-sub">{threadsError}</p>
            </div>
          ) : !threads.length ? (
            <div className="soul-chat__hist-empty">
              <p className="soul-chat__hist-empty-title">No conversations yet.</p>
              <p className="soul-chat__hist-empty-sub">
                Anything you talk through with your mentor is saved here.
              </p>
              <SoulButton
                showArrow
                className="soul-chat__hist-cta"
                onClick={startNewChat}
              >
                Start a conversation
              </SoulButton>
            </div>
          ) : (
            <ul className="soul-chat__hist-list">
              {threads.map((t) => {
                const isDeleting = deletingThreadId === t.thread_id
                return (
                  <li key={t.thread_id}>
                    <button
                      type="button"
                      className={`soul-chat__hist-row${
                        t.thread_id === currentThreadId ? ' soul-chat__hist-row--active' : ''
                      }`}
                      onClick={() => void selectThread(t.thread_id)}
                    >
                      <div className="soul-chat__hist-row-main">
                        <p className="soul-chat__hist-row-title">
                          {truncate(t.preview || 'New conversation', 48)}
                        </p>
                        <p className="soul-chat__hist-row-meta">{formatHistoryMeta(t)}</p>
                      </div>
                      <img
                        className="soul-chat__hist-row-chevron"
                        src={iconChevron}
                        alt=""
                        width={22}
                        height={22}
                      />
                    </button>
                    <button
                      type="button"
                      className="soul-chat__hist-row-delete"
                      aria-label="Delete conversation"
                      disabled={isDeleting || !!deletingThreadId}
                      onClick={(e) => requestDeleteThread(t.thread_id, e)}
                    >
                      Delete
                    </button>
                  </li>
                )
              })}
            </ul>
          )}
        </div>

        <div className="soul-chat__hist-nav">
          <SoulNav active={null} onChange={onNav} />
        </div>
      </aside>

      <div className={`soul-chat__shell${sidebarCollapsed ? ' soul-chat__shell--sidebar-collapsed' : ''}`}>
        <div className="soul-chat__frame" ref={frameRef}>
          <div className="soul-chat__scrim" aria-hidden="true" />
          <div className="soul-chat__dock-scrim" aria-hidden="true" />

          <header className="soul-chat__header">
            <div className="soul-chat__header-left">
              <button
                type="button"
                className="soul-chat__menu"
                onClick={openDrawer}
                aria-label="Open conversation history"
              >
                <img src={iconMenu} alt="" width={22} height={22} />
              </button>
              <button
                type="button"
                className="soul-chat__sidebar-toggle"
                onClick={toggleSidebar}
                aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                aria-expanded={!sidebarCollapsed}
              >
                <img src={iconMenu} alt="" width={20} height={20} />
              </button>
              <SoulBrand />
            </div>
            <div className="soul-chat__header-nav" aria-label="Desktop navigation">
              <SoulNav active={null} onChange={onNav} className="soul-chat__top-nav" />
            </div>
          </header>

          {offline ? (
            <div className="soul-chat__offline-banner" role="status">
              You&apos;re offline. We&apos;ll send this when you&apos;re back.
            </div>
          ) : null}

          <div
            ref={chatRef}
            className={`soul-chat__thread${showWelcome ? ' soul-chat__thread--empty' : ''}`}
          >
            <div className="soul-chat__thread-inner">
              {messages === null ? null : showWelcome ? (
                <>
                  <img className="soul-chat__orb" src={orbChat} alt="" width={64} height={64} />
                  <div className="soul-chat__empty-copy">
                    <h1 className="soul-chat__empty-title">Ask me anything about you.</h1>
                    <p className="soul-chat__empty-sub">I&apos;ve read all nine chapters.</p>
                  </div>
                </>
              ) : (
                <>
                  {(messages ?? []).map((m, i) =>
                    m.role === 'user' ? (
                      <UserBubble key={`u-${i}-${m.content.slice(0, 16)}`} content={m.content} />
                    ) : (
                      <div
                        key={`a-${i}-${m.content.slice(0, 16)}`}
                        className="soul-chat__assistant-block"
                      >
                        <MentorBubble content={m.content} />
                        {i === lastAssistantIdx && !thinking ? (
                          <MessageActions content={m.content} />
                        ) : null}
                      </div>
                    ),
                  )}
                  {thinking ? <ThinkingRow /> : null}
                  {!thinking && sendFailed ? <FailedBubble onRetry={handleRetry} /> : null}
                  {showTopUpSuccess ? <TopUpSuccessPill /> : null}
                  {showLimitNote && messagesLeft <= 0 && shellGate === 'limit' ? (
                    <p className="soul-chat__limit-note">
                      You have used today&apos;s messages.
                      <br />
                      Your conversation is saved.
                    </p>
                  ) : null}
                </>
              )}
            </div>
          </div>

          <div className="soul-chat__dock">
            {showGateCard && shellGate === 'limit' ? (
              <LimitGateCard
                onAddMore={openTopUp}
                onDismiss={() => {
                  setGateCardHidden(true)
                  setShowLimitNote(true)
                }}
              />
            ) : null}

            {showGateCard && shellGate === 'ended' ? (
              <EndedGateCard
                onResume={() =>
                  toast.message('Resume subscription', {
                    description: 'Billing resume flow comes next — not wired yet.',
                  })
                }
                onOpenProfile={() => navigate('/account')}
              />
            ) : null}

            {showWelcome && !chatLocked ? (
              <div className="soul-chat__chips">
                {SUGGESTIONS.map((label, idx) => (
                  <SoulChip
                    key={label}
                    label={label}
                    selected={idx === 1}
                    disabled={isSending}
                    onClick={() => void handleSend(label)}
                  />
                ))}
              </div>
            ) : null}

            <SoulComposer
              value={input}
              placeholder="What's on your mind?"
              disabled={isSending || chatLocked}
              autoFocus={composerFocus}
              onChange={setInput}
              onSubmit={(v) => void handleSend(v)}
            />

            <p className="soul-chat__counter">
              {shellGate === 'ended' ? (
                'Chat is paused'
              ) : messagesLeft <= 0 ? (
                <>
                  0 messages left today
                  {gateCardHidden || showLimitNote ? (
                    <>
                      {' · '}
                      <button type="button" onClick={openTopUp}>
                        Add more
                      </button>
                    </>
                  ) : null}
                </>
              ) : (
                <>
                  {messagesLeft} messages left today ·{' '}
                  <button type="button" onClick={openLimitGate}>
                    Add more
                  </button>
                </>
              )}
            </p>

            <div className="soul-chat__nav-wrap">
              <SoulNav active={null} onChange={onNav} />
            </div>
          </div>

          <TopUpSheet
            open={topUpOpen}
            mode={topUpMode}
            paying={topUpPaying}
            cardLabel={cardLabel}
            onClose={closeTopUp}
            onPay={completeTopUp}
            onChangeCard={() => setTopUpMode('change')}
            onTryAgain={() => setTopUpMode('pay')}
            onBackFromChange={() => setTopUpMode('pay')}
            onSaveCard={(label) => {
              setCardLabel(label)
              setTopUpMode('pay')
            }}
          />
        </div>
      </div>

      <AlertDialog
        open={!!threadPendingDelete}
        onOpenChange={(open) => {
          if (!open) setThreadPendingDelete(null)
        }}
      >
        <AlertDialogContent className="z-[100]">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this conversation?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently remove the chat and its history. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={!!deletingThreadId}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => void confirmDeleteThread()}
              disabled={!!deletingThreadId}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deletingThreadId ? 'Deleting…' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
