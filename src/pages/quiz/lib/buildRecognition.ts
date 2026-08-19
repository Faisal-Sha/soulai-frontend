// buildRecognition — ported verbatim from soul-v6.html buildRecognition()
// Generates 2–3 personalized paragraphs from the user's prior answers.

import type { QuizAnswers } from '../types'

export function buildRecognition(answers: QuizAnswers): string[] {
  const paragraphs: string[] = []

  // ── Para 1: the pattern / where you've been ──
  const blockLines: Record<string, string> = {
    'wrong-people': "You keep ending up with the same kind of person. Different names, same shape. You already know this.",
    'fear':         "You're not closed. You're careful. There's a difference.",
    'self-worth':   "You've been the one editing yourself down. Smaller voice, smaller needs, smaller ask. That's the part that has to stop first.",
    'unavailable':  "You keep picking people who keep a door half-shut. That's a pattern, not a preference.",
    'timing':       "You've met the right people at the wrong moment enough times to wonder if timing is the whole trick.",
    'overgiving':   "You give a lot. You give first. You give more than gets returned. You already know.",
  }
  const attachmentLines: Record<string, string> = {
    'anxious':  "Closeness makes you reach. You watch for the small shifts — tone, text speed, whether they said goodnight the way they used to.",
    'avoidant': "When it gets real, you get quiet. You want the connection, but your body pulls back before your mind catches up.",
    'mixed':    "You do both. Reach when you should rest, pull back when you should lean in. The inconsistency isn't the problem — it's the signal.",
    'shutdown': "When it gets too close, something in you goes quiet. Not cold — protected.",
    'secure':   "You don't panic when love goes quiet. That's rarer than you think.",
  }
  const statusLines: Record<string, string> = {
    'single-ready':        "You're in the in-between. Done with who was, not quite at who's next. It's the hardest stretch.",
    'single-healing':      "You're not ready yet. You know that. Don't let anyone rush the part of you that's still putting itself back together.",
    'dating':              "You're in something and you're not sure. That's data. The uncertainty is the answer, just not the one you want.",
    'relationship-good':   "You're in something that works, and you're here anyway. Curiosity isn't betrayal. It's just being awake.",
    'relationship-unsure': "You're in it and questioning it. Most people don't ask until it's too late. You're asking in time.",
    'divorced':            "You're not starting from zero. You're starting from what you learned.",
  }

  if (answers.block && blockLines[answers.block]) {
    paragraphs.push(blockLines[answers.block])
  } else if (answers.attachment && attachmentLines[answers.attachment]) {
    paragraphs.push(attachmentLines[answers.attachment])
  } else if (answers.status && statusLines[answers.status]) {
    paragraphs.push(statusLines[answers.status])
  }

  // ── Para 2: what you actually want ──
  const hopeLines: Record<string, string> = {
    'who':       "You're not looking for a checklist. You want to know who they actually are.",
    'when':      "You're not impatient. You're tired of not knowing.",
    'where':     "You want the logistics. The door. The room.",
    'recognize': "You want to not miss them when they walk past. You're worried you already have.",
    'current':   "You're asking whether the person in front of you is the one. That's not a small question.",
    'why':       "You want to know why it's been so hard. Not to be fixed — to be understood.",
  }
  const vibeLines: Record<string, string> = {
    'calm':      "You want safe, not boring. Steady, not flat. There's a version of calm that's electric — that's the one.",
    'spark':     "You want alive. You're done being comfortable with people who don't light anything up.",
    'familiar':  "You want someone who feels like coming home before you've even left.",
    'mystery':   "You want depth. Not games — depth. There's a difference.",
    'mirror':    "You want to be seen. All of it. Not the version you perform.",
  }

  if (answers.hope && hopeLines[answers.hope]) {
    paragraphs.push(hopeLines[answers.hope])
  } else if (answers['soulmate-vibe'] && vibeLines[answers['soulmate-vibe']]) {
    paragraphs.push(vibeLines[answers['soulmate-vibe']])
  }

  // ── Para 3: the closer — what you need / how you love ──
  const loveLines: Record<string, string> = {
    'words': "You need to hear it. Silent love doesn't land.",
    'touch': "You need the body in the room. Texts don't hold you.",
    'time':  "You need presence. Not performance, presence.",
    'acts':  "You believe what people do, not what they say.",
    'gifts': "You notice the small, thoughtful things. You always have.",
  }
  const energyLines: Record<string, string> = {
    'fire':  "You run hot. You need someone who doesn't flinch.",
    'water': "You feel everything. Your person needs to be able to sit with that, not manage it.",
    'earth': "You're steady. You need someone who shows up the same way twice.",
    'air':   "You need a mind that keeps up. Otherwise you leave.",
    'mix':   "You shape-shift a little depending on who you're with. Your person lets you.",
  }

  if (answers['love-receive'] && loveLines[answers['love-receive']]) {
    paragraphs.push(loveLines[answers['love-receive']])
  } else if (answers.energy && energyLines[answers.energy]) {
    paragraphs.push(energyLines[answers.energy])
  }

  // Fallback
  if (paragraphs.length < 2) {
    paragraphs.push("We have enough to start seeing your person.")
  }

  return paragraphs.slice(0, 3)
}
