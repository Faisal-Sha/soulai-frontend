import React, { useState, useRef, useEffect, useCallback, forwardRef, useImperativeHandle } from "react";
import { MessageCircle, X, Send, Minus, Maximize2, Loader2, Sparkles, Bot, History, Plus, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatWithKB, synthesizeSpeech, type ChatUsageInfo } from "@/lib/aiInsightsService";
import { CHAT_MESSAGE_COST, getChatFreeMessageLimit, resolveChatPlanType } from "@/lib/chatLimits";
import { useLanguage } from "@/contexts/LanguageContext";
import { MatrixValues } from "@/core/calc";
import type { MatrixChatContext } from "@/types/chatContext";
import { getChatSessionBirthDate } from "@/types/chatContext";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";

import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@/hooks/useUser";
import { RechargeDialog } from "./RechargeDialog";
import { RechargePrompt } from "./RechargePrompt";
import { Wallet } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  session_id: string;
  session_name: string;
  last_message_at: string;
}

export interface MatrixChatbotHandle {
  askQuestion: (message: string) => void;
  openChat: () => void;
}

interface MatrixChatbotProps {
  matrix: MatrixValues | null;
  name?: string;
  birthDate?: string;
  suggestedQuestions?: string[];
  /** personal = full individual matrix; compatibility = combined pair matrix + metrics */
  chatContext?: MatrixChatContext;
  /** ACTIVATION handoff: open chat once on mount (e.g. /?mentor=1) */
  autoOpen?: boolean;
}

export const MatrixChatbot = forwardRef<MatrixChatbotHandle, MatrixChatbotProps>(function MatrixChatbot(
  { matrix, name, birthDate, suggestedQuestions, chatContext, autoOpen = false },
  ref,
) {
  const { language } = useLanguage();
  const sessionBirthDate = getChatSessionBirthDate(birthDate, chatContext);
  const isCompatibility = chatContext?.mode === "compatibility";
  const { user, profile, refetch } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const didAutoOpenRef = useRef(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [isRechargeOpen, setIsRechargeOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playingMessageIndex, setPlayingMessageIndex] = useState<number | null>(null);
  const skipHistoryFetchRef = useRef(false);
  const { subscription } = useUser();
  const [usageSnapshot, setUsageSnapshot] = useState<ChatUsageInfo | null>(null);

  const effectivePlan = resolveChatPlanType(subscription?.plan_type, subscription?.status);
  const freeLimit = usageSnapshot?.freeLimit ?? getChatFreeMessageLimit(effectivePlan);
  const freeMessagesUsed = usageSnapshot?.freeMessagesUsed ?? (profile?.free_messages_count || 0);
  const displayBalance = usageSnapshot?.balance ?? (Number(profile?.balance) || 0);
  const remainingFree = usageSnapshot?.remainingFree ?? Math.max(0, freeLimit - freeMessagesUsed);
  const isLimitReached = remainingFree <= 0 && displayBalance < CHAT_MESSAGE_COST;

  // Fetch sessions list
  const fetchSessions = async () => {
    if (!sessionBirthDate) return;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("chat_messages")
        .select("session_id, session_name, created_at")
        .eq("user_id", user.id)
        .eq("birth_date", sessionBirthDate)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (data) {
        // Group by session_id and get the most recent message for each
        const uniqueSessions: Record<string, ChatSession> = {};
        data.forEach((msg: any) => {
          if (msg.session_id && !uniqueSessions[msg.session_id]) {
            uniqueSessions[msg.session_id] = {
              session_id: msg.session_id,
              session_name: msg.session_name || (language === "ru" ? "Новый чат" : "New Chat"),
              last_message_at: msg.created_at
            };
          }
        });
        setSessions(Object.values(uniqueSessions));
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  // Load chat history for a specific session
  useEffect(() => {
    const fetchHistory = async () => {
      if (!sessionBirthDate || !currentSessionId) {
        setMessages([]);
        return;
      }
      
      setIsLoadingHistory(true);
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { data, error } = await supabase
          .from("chat_messages")
          .select("role, content")
          .eq("user_id", user.id)
          .eq("birth_date", sessionBirthDate)
          .eq("session_id", currentSessionId)
          .order("created_at", { ascending: true });

        if (error) throw error;
        
        if (data) {
          setMessages(data as Message[]);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    if (isOpen && !isMinimized && currentSessionId) {
      if (skipHistoryFetchRef.current) {
        skipHistoryFetchRef.current = false;
        return;
      }
      fetchHistory();
    }
  }, [isOpen, isMinimized, sessionBirthDate, currentSessionId]);

  // Initial load: fetch sessions and pick the most recent one
  useEffect(() => {
    if (isOpen && !isMinimized && sessions.length === 0 && !currentSessionId) {
      const init = async () => {
        await fetchSessions();
      };
      init();
    }
  }, [isOpen, isMinimized]);

  // If sessions loaded and none selected, select the first one (only on initial load)
  useEffect(() => {
    if (sessions.length > 0 && !currentSessionId && !isHistoryOpen) {
      // Find if we have't actually clicked "New Chat" by checking some state or just allowing it to be null
      // For now, let's only auto-select if we haven't explicitly cleared it
    }
  }, [sessions, currentSessionId]);

  // Handle initial auto-selection separately to avoid overriding "New Chat"
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    if (sessions.length > 0 && !currentSessionId && !hasInitialized) {
      setCurrentSessionId(sessions[0].session_id);
      setHasInitialized(true);
    }
  }, [sessions, currentSessionId, hasInitialized]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen && !isMinimized) {
      // Use a slightly longer timeout to ensure content has rendered
      const timeoutId = setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [messages, isOpen, isMinimized, isLoading]);

  const handlePlayAudio = async (text: string, index: number) => {
    if (playingMessageIndex === index) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setPlayingMessageIndex(null);
      return;
    }

    setPlayingMessageIndex(index);
    console.log(`[Chatbot] handlePlayAudio triggered for message index: ${index}`);
    try {
      // Strip markdown for better speech synthesis
      const cleanText = text.replace(/[#*`_~[\]()]/g, '');
      const audioBlob = await synthesizeSpeech(cleanText);
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();
      
      audio.onended = () => {
        setPlayingMessageIndex(null);
        URL.revokeObjectURL(audioUrl);
      };
    } catch (error: any) {
      toast.error(error.message || "Failed to play audio");
      setPlayingMessageIndex(null);
    }
  };

  const sendMessage = useCallback(async (rawMessage: string) => {
    const userMessage = rawMessage.trim();
    if (!userMessage || isLoading || !matrix) return;

    if (isLimitReached) {
      setIsPromptOpen(true);
      return;
    }

    const sessionId = currentSessionId || crypto.randomUUID();
    const isNewSession = !currentSessionId;

    const sessionName = isNewSession
      ? (userMessage.length > 30 ? userMessage.substring(0, 27) + "..." : userMessage)
      : undefined;

    if (isNewSession) {
      skipHistoryFetchRef.current = true;
      setCurrentSessionId(sessionId);
    }

    setInputValue("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { answer, usage } = await chatWithKB({
        message: userMessage,
        matrix,
        language: language as "en" | "ru",
        name,
        birthDate: sessionBirthDate,
        history: messages,
        sessionId,
        sessionName,
        chatContext,
      });

      if (usage) {
        setUsageSnapshot(usage);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: answer }]);
      await refetch();
      setUsageSnapshot(null);

      if (isNewSession) {
        fetchSessions();
      }
    } catch (error: any) {
      if (error.message === "LIMIT_REACHED") {
        setIsPromptOpen(true);
      } else {
        toast.error(error.message || "Failed to get response");
      }
    } finally {
      setIsLoading(false);
    }
  }, [
    chatContext,
    currentSessionId,
    fetchSessions,
    isLimitReached,
    isLoading,
    language,
    matrix,
    messages,
    name,
    refetch,
    sessionBirthDate,
  ]);

  const askQuestion = useCallback((message: string) => {
    setIsOpen(true);
    setIsMinimized(false);
    setIsHistoryOpen(false);
    void sendMessage(message);
  }, [sendMessage]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setIsHistoryOpen(false);
  }, []);

  useImperativeHandle(ref, () => ({ askQuestion, openChat }), [askQuestion, openChat]);

  // ACTIVATION / hub: open once per autoOpen pulse; reset when pulse ends
  useEffect(() => {
    if (!autoOpen) {
      didAutoOpenRef.current = false;
      return;
    }
    if (!matrix || didAutoOpenRef.current) return;
    didAutoOpenRef.current = true;
    openChat();
  }, [autoOpen, matrix, openChat]);

  if (!matrix) return null;

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;
    await sendMessage(inputValue);
  };

  const defaultSuggestions = [
    language === "ru" ? "Что означает мой центр?" : "What does my center mean?",
    language === "ru" ? "Как проработать карму?" : "How to process karma?",
    language === "ru" ? "Мой денежный потенциал?" : "My money potential?",
  ];
  const emptySuggestions = suggestedQuestions?.length ? suggestedQuestions : defaultSuggestions;

  const handleNewChat = () => {
    setCurrentSessionId(null);
    setMessages([]);
    setIsHistoryOpen(false);
    setHasInitialized(true); // Prevent auto-selecting again
  };

  const toggleChat = () => {
    if (isMinimized) {
      setIsMinimized(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="pointer-events-auto"
          >
            <div className="w-[calc(100vw-32px)] sm:w-[420px] h-[calc(100vh-120px)] sm:h-[600px] max-h-[calc(100vh-120px)] sm:max-h-[calc(100vh-100px)] flex flex-col shadow-2xl border border-border bg-white dark:bg-[#0A0A0A] overflow-hidden rounded-[20px] mt-10">
              {/* Header */}
              <div className="p-4 bg-primary text-primary-foreground flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot size={20} className="text-primary-foreground" />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold tracking-tight leading-none">
                      {language === "ru" ? "ИИ Помощник" : "AI Assistant"}
                    </h3>
                    <p className="text-[10px] opacity-70 mt-1 uppercase tracking-widest font-bold">
                      {language === "ru" ? "SoulPlus AI" : "SoulPlus AI"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
                    onClick={() => setIsHistoryOpen(!isHistoryOpen)}
                    title={language === "ru" ? "История" : "History"}
                  >
                    <History size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
                    onClick={handleNewChat}
                    title={language === "ru" ? "Новый чат" : "New Chat"}
                  >
                    <Plus size={16} />
                  </Button>
                  {profile && (
                    <div className="flex items-center gap-1 mr-2 px-2 py-1 bg-primary-foreground/20 rounded-full border border-primary-foreground/30">
                      <Wallet size={12} className="text-primary-foreground/80" />
                      <span className="text-[9px] sm:text-[10px] font-bold text-primary-foreground">
                        ${displayBalance.toFixed(2)}
                      </span>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
                    onClick={() => setIsMinimized(true)}
                  >
                    <Minus size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20 rounded-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <X size={16} />
                  </Button>
                </div>
              </div>

              {/* Chat Area Content */}
              <div className="flex-1 overflow-hidden relative flex">
                {/* History Sidebar/Overlay */}
                <AnimatePresence>
                  {isHistoryOpen && (
                    <motion.div
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="absolute inset-0 z-20 bg-background/95 backdrop-blur-md border-r border-border flex flex-col w-full sm:w-3/4 shadow-xl"
                    >
                      <div className="p-4 border-b border-border flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                          {language === "ru" ? "История чатов" : "Chat History"}
                        </h4>
                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsHistoryOpen(false)}>
                          <X size={14} />
                        </Button>
                      </div>
                      <ScrollArea className="flex-1">
                        <div className="p-2 space-y-1">
                          {sessions.length === 0 ? (
                            <p className="text-[10px] text-center py-10 text-muted-foreground italic">
                              {language === "ru" ? "История пуста" : "No history yet"}
                            </p>
                          ) : (
                            sessions.map((session) => (
                              <button
                                key={session.session_id}
                                onClick={() => {
                                  setCurrentSessionId(session.session_id);
                                  setIsHistoryOpen(false);
                                }}
                                className={`w-full text-left p-2 rounded-lg text-xs transition-colors hover:bg-muted ${
                                  currentSessionId === session.session_id ? "bg-muted font-bold text-primary" : "text-muted-foreground"
                                }`}
                              >
                                <div className="truncate pr-4">{session.session_name}</div>
                                <div className="text-[9px] opacity-50 mt-1">
                                  {new Date(session.last_message_at).toLocaleDateString()}
                                </div>
                              </button>
                            ))
                          )}
                        </div>
                      </ScrollArea>
                      <div className="p-4 border-t border-border">
                        <Button 
                          variant="outline" 
                          className="w-full text-xs gap-2 rounded-xl"
                          onClick={handleNewChat}
                        >
                          <Sparkles size={14} />
                          {language === "ru" ? "Новый чат" : "New Chat"}
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Main Chat Area */}
                <div className="flex-1 flex flex-col min-w-0">
                  <ScrollArea className="flex-1 p-3 sm:p-4" ref={scrollRef}>
                  <div className="space-y-4">
                    {isLoadingHistory ? (
                      <div className="flex flex-col items-center justify-center py-20 gap-3">
                        <Loader2 className="w-8 h-8 animate-spin text-primary/40" />
                        <p className="text-xs text-muted-foreground animate-pulse">
                          {language === "ru" ? "Загрузка истории..." : "Loading history..."}
                        </p>
                      </div>
                    ) : messages.length === 0 ? (
                      <div className="text-center py-10 px-6">
                        <Sparkles className="w-10 h-10 text-primary/30 mx-auto mb-4" />
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {isCompatibility
                            ? (language === "ru"
                              ? "Спросите о совместимости пары — я отвечу на основе объединённой матрицы."
                              : "Ask about this couple's compatibility — I'll use their combined matrix.")
                            : (language === "ru"
                              ? "Здравствуйте! Я помогу вам разобраться в SoulPlus AI. Задайте любой вопрос."
                              : "Hello! I can help you understand your SoulPlus AI. Ask me anything.")}
                        </p>
                        <div className="grid grid-cols-1 gap-2 mt-6">
                          {emptySuggestions.map((suggest, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => askQuestion(suggest)}
                              className="text-[10px] sm:text-[11px] p-1.5 sm:p-2 rounded-lg border border-border bg-muted/50 hover:bg-primary/5 hover:border-primary/30 transition-all text-left"
                            >
                              {suggest}
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {messages.map((msg, i) => (
                      <div
                        key={i}
                        className={`flex ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] p-2 sm:p-3 rounded-2xl text-xs sm:text-sm ${
                            msg.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-none shadow-md"
                              : "bg-muted border border-border rounded-tl-none shadow-sm"
                          } animate-in fade-in slide-in-from-bottom-2 duration-300`}
                        >
                          {msg.role === "assistant" ? (
                            <div className="relative group">
                              <div className="prose prose-sm dark:prose-invert prose-p:leading-relaxed prose-p:mb-0 max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.content}
                                </ReactMarkdown>
                              </div>
                              <div className="mt-2 flex justify-end">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-7 w-7 text-muted-foreground hover:bg-primary/10 hover:text-primary rounded-full transition-all"
                                  onClick={() => handlePlayAudio(msg.content, i)}
                                  disabled={playingMessageIndex !== null && playingMessageIndex !== i}
                                  title={language === "ru" ? "Прослушать" : "Listen"}
                                >
                                  {playingMessageIndex === i ? (
                                    <Loader2 size={14} className="animate-spin text-primary" />
                                  ) : (
                                    <Volume2 size={14} />
                                  )}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="leading-relaxed">{msg.content}</p>
                          )}
                        </div>
                      </div>
                    ))}
                    {isLoading && (
                      <div className="flex justify-start">
                        <div className="bg-muted border border-border p-3 rounded-2xl rounded-tl-none flex items-center gap-2 shadow-sm">
                          <Loader2 className="w-4 h-4 animate-spin text-primary" />
                          <span className="text-xs text-muted-foreground">
                            {language === "ru" ? "Думаю..." : "Thinking..."}
                          </span>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} className="h-0" />
                  </div>
                </ScrollArea>
                </div>
              </div>

              {/* Input */}
              <div className="p-4 bg-muted border-t border-border mt-auto">
                <div className="flex justify-between items-center mb-3 px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${remainingFree > 0 ? 'bg-green-500 animate-pulse' : 'bg-gold'}`} />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                      {remainingFree > 0 
                        ? (language === 'ru' ? `Осталось: ${remainingFree}` : `Remaining: ${remainingFree}`)
                        : (language === 'ru' ? `Платно: $0.15/сообщ.` : `Pay-per-message: $0.15/msg`)
                      }
                    </span>
                  </div>
                  {remainingFree <= 0 && (
                    <span className="text-[9px] text-gold font-bold px-2 py-0.5 bg-gold/10 rounded-full border border-gold/20">
                      PREMIUM RATE
                    </span>
                  )}
                </div>

                {isLimitReached && (
                  <div className="mb-2 p-2 bg-primary/10 rounded-lg border border-primary/20 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary">
                      {language === "ru" ? "Лимит исчерпан" : "Limit reached"}
                    </span>
                    <Button 
                      variant="link" 
                      className="h-auto p-0 text-[10px] font-bold text-primary underline"
                      onClick={() => setIsPromptOpen(true)}
                    >
                      {language === "ru" ? "Пополнить" : "Recharge"}
                    </Button>
                  </div>
                )}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    placeholder={
                      isLimitReached 
                        ? (language === "ru" ? "Пополните баланс..." : "Please recharge...")
                        : (language === "ru" ? "Спросите о матрице..." : "Ask about matrix...")
                    }
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className={`flex-1 bg-background rounded-xl border-border focus-visible:ring-primary h-9 sm:h-10 text-xs sm:text-sm ${
                      isLimitReached ? "opacity-60" : ""
                    }`}
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="h-10 w-10 rounded-xl shadow-lg hover:scale-105 transition-transform"
                    disabled={isLoading || !inputValue.trim()}
                  >
                    <Send size={18} />
                  </Button>
                </form>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button - Hidden when chat is open and not minimized */}
      <AnimatePresence>
        {(!isOpen || isMinimized) && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            layout
            className="pointer-events-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={toggleChat}
              className={`h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
                isOpen ? "bg-primary" : "bg-primary hover:bg-primary/90"
              } flex items-center justify-center border-2 border-white/20`}
            >
              {isMinimized ? (
                <Maximize2 className="w-7 h-7" />
              ) : (
                <MessageCircle className="w-7 h-7" />
              )}
              
              {/* Pulse effect when closed */}
              {!isOpen && (
                <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping -z-10" />
              )}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <RechargePrompt 
        isOpen={isPromptOpen} 
        onOpenChange={setIsPromptOpen} 
        onOpenRecharge={() => setIsRechargeOpen(true)}
      />

      <RechargeDialog 
        isOpen={isRechargeOpen} 
        onOpenChange={setIsRechargeOpen} 
        currentBalance={displayBalance}
      />
    </div>
  );
});
