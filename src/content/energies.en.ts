// Energy interpretations for Matrix of Destiny numbers (English version)

export interface EnergyInfo {
  number: number;
  name: string;
  shortDesc: string;
  keywords: string[];
  detailedDesc?: string;
  positiveTraits?: string[];
  weaknesses?: string[];
  moneyBlocks?: string[];
  videoUrl?: string;
  chakra?: number; // 1-7 chakra association
  expressionTraits?: string[]; // Yes/No questions for self-assessment
  plusSpectrum?: string[]; // Positive manifestations
  minusSpectrum?: string[]; // Negative manifestations
}

export const energies: Record<number, EnergyInfo> = {
  1: {
    number: 1,
    name: "The Magician",
    shortDesc: "Energy of new beginnings, leadership and independence",
    keywords: ["leader", "initiator", "independence", "innovation"],
    chakra: 3, // Solar Plexus - personal power
    detailedDesc: "The Magician represents the energy of manifestation and personal power. This is the energy of someone who takes initiative, creates new paths, and leads with confidence. People with this energy are natural pioneers who aren't afraid to start something from nothing. They possess the unique ability to transform ideas into reality through focused willpower and determination. The Magician energy connects spiritual purpose with practical action, making these individuals excellent at turning vision into tangible results.",
    positiveTraits: [
      "Natural leadership abilities and charisma",
      "Strong willpower and determination to achieve goals",
      "Innovative thinking and creative problem-solving",
      "Ability to inspire and motivate others",
      "Confidence in taking the first step and initiating projects",
      "Excellent at manifesting desires into reality",
      "Independent and self-reliant nature"
    ],
    weaknesses: [
      "Can be overly controlling or domineering",
      "Tendency to be impatient with slower processes",
      "May struggle with delegation and trusting others",
      "Risk of becoming too self-focused or egotistical",
      "Difficulty accepting help or admitting weaknesses",
      "Can burn out from taking on too much alone"
    ],
    moneyBlocks: [
      "Believing they must do everything themselves to succeed financially",
      "Impatience with long-term investment strategies",
      "Reluctance to collaborate or form partnerships that could increase wealth",
      "Ego-driven financial decisions that ignore practical advice",
      "Fear of sharing credit or profits with team members",
      "Overconfidence leading to risky financial ventures"
    ],
    expressionTraits: [
      "I often take the lead in group situations",
      "I prefer to work independently rather than in teams",
      "I can easily turn my ideas into reality",
      "People often come to me for guidance and direction",
      "I feel confident starting new projects from scratch"
    ],
    plusSpectrum: ["Charismatic leader", "Visionary thinker", "Powerful manifestor", "Confident initiator"],
    minusSpectrum: ["Controlling dictator", "Impatient taskmaster", "Egotistical manipulator", "Isolated perfectionist"],
    videoUrl: "https://www.youtube.com/embed/7GZx2Vg5M6E"
  },
  2: {
    number: 2,
    name: "The High Priestess",
    shortDesc: "Energy of intuition, sensitivity and partnership",
    keywords: ["intuition", "partnership", "balance", "diplomacy"],
    chakra: 6, // Third Eye - intuition
    detailedDesc: "The High Priestess embodies the energy of deep intuition, inner wisdom, and receptivity. This is the energy of someone who understands the subtle currents of life and can sense what others cannot see. People with this energy are naturally empathetic and possess a strong connection to their inner voice. They excel in partnerships and collaborative environments, bringing balance and harmony to relationships. The High Priestess energy represents the power of listening, both to others and to one's own inner guidance.",
    positiveTraits: [
      "Strong intuitive and psychic abilities",
      "Natural mediator and peacemaker",
      "Excellent listener and empathetic communicator",
      "Ability to see multiple perspectives",
      "Diplomatic approach to conflict resolution",
      "Deep emotional intelligence and sensitivity",
      "Skilled at creating harmonious partnerships"
    ],
    weaknesses: [
      "Can be overly dependent on others for validation",
      "Tendency to avoid direct confrontation",
      "May suppress own needs to maintain harmony",
      "Risk of becoming indecisive or passive",
      "Can absorb others' emotions too deeply",
      "Difficulty establishing boundaries"
    ],
    moneyBlocks: [
      "Undervaluing their intuitive gifts and insights",
      "Difficulty negotiating or asking for fair compensation",
      "Tendency to defer financial decisions to others",
      "Fear of appearing too assertive in business",
      "Hesitation to pursue solo ventures without a partner",
      "Avoiding financial conflicts even when necessary"
    ],
    expressionTraits: [
      "I rely heavily on my intuition when making decisions",
      "I can sense what others are feeling without them saying it",
      "I prefer to observe and listen before speaking",
      "I feel uncomfortable with direct confrontation",
      "I work best in collaborative partnerships"
    ],
    plusSpectrum: ["Intuitive guide", "Empathetic healer", "Wise counselor", "Harmonious partner"],
    minusSpectrum: ["Passive avoider", "Overly dependent", "Indecisive worrier", "Boundary-less absorber"],
    videoUrl: "https://www.youtube.com/embed/ytX10_LGkzo"
  },
  3: {
    number: 3,
    name: "The Empress",
    shortDesc: "Energy of creativity, abundance and motherhood",
    keywords: ["creativity", "abundance", "care", "harmony"],
    chakra: 4, // Heart - love and nurturing
    detailedDesc: "The Empress represents the energy of abundance, creativity, and nurturing. This is the energy of creation in all its forms - artistic expression, bringing ideas to life, and caring for others. People with this energy are naturally creative and possess a strong connection to beauty and nature. They excel at making things grow and flourish, whether it's a project, relationship, or creative endeavor.",
    positiveTraits: [
      "Highly creative and artistic abilities",
      "Natural nurturing and caring instincts",
      "Ability to create beauty and harmony",
      "Strong connection to nature and life cycles",
      "Generous and abundant mindset",
      "Excellent at manifesting tangible results"
    ],
    weaknesses: [
      "Can be overly indulgent or excessive",
      "Tendency to smother or overprotect",
      "May prioritize comfort over growth",
      "Risk of creative blocks or stagnation",
      "Difficulty with discipline and structure"
    ],
    moneyBlocks: [
      "Undervaluing creative work and talents",
      "Overspending on comfort and luxury",
      "Difficulty saying no to requests for help",
      "Giving too much without receiving"
    ],
    expressionTraits: [
      "I express myself best through creative activities",
      "I enjoy nurturing and caring for others",
      "I appreciate beauty and aesthetics in my environment",
      "I feel most fulfilled when creating something tangible",
      "People describe me as warm and generous"
    ],
    plusSpectrum: ["Creative genius", "Abundant provider", "Nurturing mother", "Beautiful creator"],
    minusSpectrum: ["Creative blocker", "Overindulgent enabler", "Smothering controller", "Luxury addict"],
    videoUrl: "https://www.youtube.com/embed/BcHkgwyQV20"
  },
  4: {
    number: 4,
    name: "The Emperor",
    shortDesc: "Energy of stability, structure and power",
    keywords: ["stability", "order", "power", "discipline"],
    chakra: 3, // Solar Plexus - personal power and authority
    detailedDesc: "The Emperor embodies the energy of structure, authority, and strategic thinking. This is the energy of someone who creates order from chaos and builds lasting foundations. People with this energy are natural organizers and excel at strategic planning and execution. They bring stability and security through clear rules and boundaries.",
    positiveTraits: [
      "Strong organizational and leadership skills",
      "Strategic and logical thinking",
      "Ability to create structure and systems",
      "Disciplined and reliable nature",
      "Natural authority and command respect"
    ],
    weaknesses: [
      "Can be overly rigid or inflexible",
      "Tendency to be controlling or authoritarian",
      "May struggle with emotional expression",
      "Difficulty adapting to change",
      "Risk of being too focused on rules over people"
    ],
    moneyBlocks: [
      "Fear of losing control over finances",
      "Overly conservative investment approach",
      "Difficulty delegating financial management",
      "Rigid attachment to traditional career paths"
    ],
    expressionTraits: [
      "I prefer clear rules and structure in my life",
      "I excel at planning and organizing projects",
      "People see me as authoritative and reliable",
      "I feel uncomfortable when things are chaotic or unplanned",
      "I value tradition and established systems"
    ],
    plusSpectrum: ["Strategic leader", "Stable provider", "Wise ruler", "Disciplined achiever"],
    minusSpectrum: ["Rigid dictator", "Controlling tyrant", "Emotionally distant", "Inflexible bureaucrat"],
    videoUrl: "https://www.youtube.com/embed/9FiZLQAbyG8"
  },
  5: {
    number: 5,
    name: "The Hierophant",
    shortDesc: "Energy of tradition, teaching and spiritual guidance",
    keywords: ["tradition", "teaching", "wisdom", "spirituality"],
    chakra: 5, // Throat - communication and teaching
    detailedDesc: "The Hierophant represents the energy of tradition, spirituality, and teaching. This is the energy of someone who preserves wisdom and passes it on to others. People with this energy are natural teachers and spiritual guides who value tradition and established knowledge while helping others find their own path.",
    positiveTraits: [
      "Natural teaching and mentoring abilities",
      "Deep spiritual wisdom and understanding",
      "Respect for tradition and cultural heritage",
      "Ability to guide others on their path",
      "Strong moral compass and ethical values"
    ],
    weaknesses: [
      "Can be overly traditional or conventional",
      "Tendency to be dogmatic or preachy",
      "May resist new ideas or innovation",
      "Risk of imposing beliefs on others",
      "Difficulty thinking outside established norms"
    ],
    moneyBlocks: [
      "Believing money is spiritual or impure",
      "Following traditional career paths without questioning",
      "Undervaluing spiritual or teaching work",
      "Fear of breaking from family financial traditions"
    ],
    expressionTraits: [
      "I enjoy teaching and sharing knowledge with others",
      "I have a strong connection to spiritual or religious traditions",
      "I value conventional wisdom and proven methods",
      "People come to me for moral or spiritual guidance",
      "I feel responsible for upholding certain traditions"
    ],
    plusSpectrum: ["Wise teacher", "Spiritual guide", "Ethical mentor", "Cultural keeper"],
    minusSpectrum: ["Rigid dogmatist", "Preachy moralist", "Tradition-bound", "Change-resistant"],
    videoUrl: "https://www.youtube.com/embed/9zi3YZNkbpQ"
  },
  6: {
    number: 6,
    name: "The Lovers",
    shortDesc: "Energy of choice, love and relationship harmony",
    keywords: ["love", "choice", "harmony", "relationships"],
    chakra: 4, // Heart - love and relationships
    detailedDesc: "The Lovers embody the energy of choice, union, and harmony. This is the energy of meaningful relationships and important life decisions. People with this energy understand the power of connection and the importance of alignment between values and actions. They excel at creating harmony and making choices that honor their authentic selves.",
    positiveTraits: [
      "Strong capacity for deep, meaningful relationships",
      "Ability to see multiple perspectives",
      "Natural harmony and balance in partnerships",
      "Good decision-making when aligned with values",
      "Magnetic and attractive to others"
    ],
    weaknesses: [
      "Can be indecisive when faced with choices",
      "Tendency to lose self in relationships",
      "May avoid difficult decisions",
      "Risk of people-pleasing behavior",
      "Fear of making the wrong choice"
    ],
    moneyBlocks: [
      "Making financial decisions to please others",
      "Difficulty choosing between passion and profit",
      "Avoiding solo financial ventures",
      "Valuing relationships over financial security"
    ],
    expressionTraits: [
      "I value deep, meaningful relationships above all",
      "I struggle with making important decisions",
      "I often feel torn between different options",
      "I seek harmony and balance in all my relationships",
      "People describe me as charming and easy to connect with"
    ],
    plusSpectrum: ["Harmonious partner", "Value-aligned", "Magnetic connector", "Loving unifier"],
    minusSpectrum: ["Indecisive waverer", "Co-dependent lover", "People-pleaser", "Self-sacrificing martyr"],
    videoUrl: "https://www.youtube.com/embed/aJy_A_ys-Fs"
  },
  7: {
    number: 7,
    name: "The Chariot",
    shortDesc: "Energy of movement, victory and control",
    keywords: ["movement", "victory", "control", "determination"],
    chakra: 3, // Solar Plexus - willpower and determination
    detailedDesc: "The Chariot represents the energy of determination, willpower, and victory. This is the energy of someone who overcomes obstacles through sheer force of will and focused intention. People with this energy are goal-oriented achievers who can harness opposing forces and direct them toward success.",
    positiveTraits: [
      "Strong willpower and determination",
      "Ability to overcome obstacles and challenges",
      "Natural competitive drive and ambition",
      "Excellent at setting and achieving goals",
      "Confident and assertive in pursuing objectives"
    ],
    weaknesses: [
      "Can be overly aggressive or forceful",
      "Tendency to steamroll over others",
      "May lack flexibility or adaptability",
      "Risk of burnout from constant striving",
      "Difficulty relaxing or accepting defeat"
    ],
    moneyBlocks: [
      "Workaholism and difficulty relaxing",
      "Competing instead of collaborating financially",
      "Pushing too hard and missing opportunities",
      "Viewing financial success as constant battle"
    ],
    expressionTraits: [
      "I am highly competitive and driven to win",
      "I rarely give up once I set a goal",
      "I prefer to take charge and control situations",
      "I thrive on challenges and overcoming obstacles",
      "I can be impatient with slower progress"
    ],
    plusSpectrum: ["Victorious achiever", "Determined warrior", "Goal-focused champion", "Willful conqueror"],
    minusSpectrum: ["Aggressive bulldozer", "Exhausted striver", "Inflexible controller", "Burnout victim"],
    videoUrl: "https://www.youtube.com/embed/X8Axnd2V9oY"
  },
  8: {
    number: 8,
    name: "Justice",
    shortDesc: "Energy of balance, fairness and karma",
    keywords: ["justice", "balance", "karma", "honesty"],
    chakra: 6, // Third Eye - clarity and truth
    detailedDesc: "Justice embodies the energy of truth, fairness, and karmic balance. This is the energy of someone who seeks truth and acts with integrity. People with this energy have a strong sense of right and wrong and work to create balance and fairness in all situations. They understand cause and effect and take responsibility for their actions.",
    positiveTraits: [
      "Strong sense of fairness and integrity",
      "Ability to see situations objectively",
      "Natural mediator and arbitrator",
      "Commitment to truth and honesty",
      "Understanding of cause and effect"
    ],
    weaknesses: [
      "Can be overly critical or judgmental",
      "Tendency to be rigid about right and wrong",
      "May lack compassion in pursuit of justice",
      "Risk of being too black-and-white in thinking",
      "Difficulty forgiving or moving past mistakes"
    ],
    moneyBlocks: [
      "Believing they don't deserve wealth due to past mistakes",
      "Overly focused on fairness preventing growth",
      "Fear of karmic consequences of wealth",
      "Judging others' financial success harshly"
    ],
    expressionTraits: [
      "I have a strong sense of right and wrong",
      "I believe in karma and that actions have consequences",
      "I value honesty and truth above all else",
      "I find it difficult to forgive dishonesty",
      "I strive to be fair and balanced in all situations"
    ],
    plusSpectrum: ["Fair judge", "Truth seeker", "Balanced arbitrator", "Karmic sage"],
    minusSpectrum: ["Harsh critic", "Rigid moralist", "Cold calculator", "Unforgiving judge"],
    videoUrl: "https://www.youtube.com/embed/77jHNlYzoXE"
  },
  9: {
    number: 9,
    name: "The Hermit",
    shortDesc: "Energy of wisdom, solitude and self-knowledge",
    keywords: ["wisdom", "solitude", "self-knowledge", "search"],
    chakra: 7, // Crown - spiritual wisdom
    detailedDesc: "The Hermit represents the energy of introspection, wisdom, and inner guidance. This is the energy of someone who seeks truth through solitude and self-reflection. People with this energy are natural philosophers and seekers who understand that true wisdom comes from within. They serve as lights for others who seek guidance.",
    positiveTraits: [
      "Deep wisdom and self-knowledge",
      "Ability to provide profound guidance",
      "Natural introspection and self-reflection",
      "Independent and self-sufficient",
      "Strong connection to inner truth"
    ],
    weaknesses: [
      "Can be overly isolated or withdrawn",
      "Tendency to avoid social connections",
      "May become too introspective or self-absorbed",
      "Risk of loneliness and depression",
      "Difficulty relating to others' perspectives"
    ],
    moneyBlocks: [
      "Withdrawing from financial opportunities",
      "Believing money requires too much social interaction",
      "Undervaluing wisdom and knowledge work",
      "Fear of losing independence through wealth"
    ],
    expressionTraits: [
      "I need regular time alone to recharge and reflect",
      "I prefer deep thinking to small talk",
      "I often seek answers within myself rather than from others",
      "People come to me for wise counsel",
      "I feel uncomfortable in large social gatherings"
    ],
    plusSpectrum: ["Wise sage", "Inner guide", "Profound teacher", "Spiritual seeker"],
    minusSpectrum: ["Lonely recluse", "Social avoider", "Self-absorbed isolate", "Disconnected hermit"],
    videoUrl: "https://www.youtube.com/embed/P-l779NmxGI"
  },
  10: {
    number: 10,
    name: "Wheel of Fortune",
    shortDesc: "Energy of cycles, destiny and change",
    keywords: ["cycles", "destiny", "change", "opportunities"],
    chakra: 1, // Root - grounding through change
    detailedDesc: "The Wheel of Fortune represents the energy of cycles, change, and destiny. This is the energy of understanding life's ups and downs and the natural rhythm of existence. People with this energy are adaptable and understand that change is constant. They can ride the waves of fortune and make the best of any situation.",
    positiveTraits: [
      "Adaptable to changing circumstances",
      "Optimistic outlook on life's cycles",
      "Ability to seize opportunities",
      "Understanding of life's natural rhythms",
      "Resilient in face of challenges"
    ],
    weaknesses: [
      "Can be too passive about life direction",
      "Tendency to blame fate for circumstances",
      "May lack consistency or follow-through",
      "Risk of becoming fatalistic",
      "Difficulty with long-term planning"
    ],
    moneyBlocks: [
      "Believing wealth is purely a matter of luck",
      "Waiting for fortune to change instead of taking action",
      "Gambling or risky financial behavior",
      "Blaming bad luck for financial struggles"
    ],
    expressionTraits: [
      "I believe in the power of destiny and fate",
      "I adapt easily to changing circumstances",
      "I've experienced significant ups and downs in life",
      "I trust that things happen for a reason",
      "I'm comfortable with uncertainty and change"
    ],
    plusSpectrum: ["Lucky opportunist", "Adaptable survivor", "Destiny's favorite", "Cycle rider"],
    minusSpectrum: ["Passive victim", "Fatalistic blamer", "Inconsistent drifter", "Fortune's fool"],
    videoUrl: "https://www.youtube.com/embed/fgbvMOf0DH0"
  },
  11: {
    number: 11,
    name: "Strength",
    shortDesc: "Energy of inner strength, courage and patience",
    keywords: ["strength", "courage", "patience", "self-control"],
    chakra: 3, // Solar Plexus - inner strength
    detailedDesc: "Strength represents the energy of inner fortitude, courage, and compassion. This is the energy of someone who has mastered their inner beasts and channels raw power through gentle persuasion. People with this energy possess quiet courage and the ability to overcome challenges through patience and compassion rather than force.",
    positiveTraits: [
      "Inner courage and resilience",
      "Patient and compassionate approach",
      "Ability to tame inner demons",
      "Strong self-control and discipline",
      "Gentle yet powerful influence"
    ],
    weaknesses: [
      "Can suppress emotions too much",
      "Tendency to over-control impulses",
      "May stay in difficult situations too long",
      "Risk of martyrdom or self-sacrifice",
      "Difficulty expressing anger appropriately"
    ],
    moneyBlocks: [
      "Patience turning into passivity with finances",
      "Staying in unfulfilling work due to loyalty",
      "Difficulty asserting worth and asking for raises",
      "Over-controlling spending to point of deprivation"
    ],
    expressionTraits: [
      "I remain calm and patient in difficult situations",
      "I prefer gentle persuasion over force",
      "I have strong self-control and discipline",
      "I can handle challenges that overwhelm others",
      "People see me as compassionate yet strong"
    ],
    plusSpectrum: ["Gentle warrior", "Compassionate leader", "Patient master", "Inner conqueror"],
    minusSpectrum: ["Repressed volcano", "Self-sacrificing martyr", "Over-controller", "Passive endurer"],
    videoUrl: "https://www.youtube.com/embed/jPKGpmgHThc"
  },
  12: {
    number: 12,
    name: "The Hanged Man",
    shortDesc: "Energy of sacrifice, pause and new perspective",
    keywords: ["pause", "sacrifice", "rethinking", "letting go"],
    chakra: 6, // Third Eye - new perspective
    detailedDesc: "The Hanged Man represents the energy of surrender, pause, and gaining new perspective. This is the energy of someone who understands that sometimes the best action is inaction and that sacrificing one thing can lead to gaining something greater. People with this energy can see things from unique angles and find wisdom in waiting.",
    positiveTraits: [
      "Ability to see situations from new angles",
      "Wisdom through patience and waiting",
      "Understanding of necessary sacrifice",
      "Letting go of control to gain insight",
      "Spiritual growth through surrender"
    ],
    weaknesses: [
      "Can be too passive or inactive",
      "Tendency to martyrdom or victimhood",
      "May wait too long to take action",
      "Risk of feeling stuck or suspended",
      "Difficulty moving forward"
    ],
    moneyBlocks: [
      "Waiting for perfect opportunity instead of acting",
      "Sacrificing too much for others' financial gain",
      "Feeling stuck in financial situations",
      "Believing suffering leads to spiritual wealth"
    ],
    expressionTraits: [
      "I often gain insights by stepping back and waiting",
      "I understand the value of sacrifice for greater good",
      "I can see situations from unusual perspectives",
      "I sometimes feel stuck between two options",
      "I believe that pausing can be as powerful as action"
    ],
    plusSpectrum: ["Wise pauser", "Perspective shifter", "Sacrificial giver", "Patient prophet"],
    minusSpectrum: ["Stuck victim", "Passive martyr", "Inactive waiter", "Suspended sufferer"],
    videoUrl: "https://www.youtube.com/embed/s9ANeUN1UbI"
  },
  13: {
    number: 13,
    name: "Death",
    shortDesc: "Energy of transformation, endings and new beginnings",
    keywords: ["transformation", "ending", "renewal", "rebirth"],
    chakra: 1, // Root - transformation and rebirth
    detailedDesc: "Death represents the energy of transformation, endings, and rebirth. This is the energy of profound change and letting go of what no longer serves. People with this energy understand that endings are necessary for new beginnings and can navigate major life transitions with grace. They are agents of transformation.",
    positiveTraits: [
      "Ability to embrace change and transformation",
      "Understanding that endings enable new beginnings",
      "Natural at letting go of the past",
      "Powerful transformation agent",
      "Resilient through major life changes"
    ],
    weaknesses: [
      "Can be too quick to end things",
      "Tendency toward destructive patterns",
      "May struggle with continuity or commitment",
      "Risk of constant upheaval",
      "Fear of stagnation leading to unnecessary change"
    ],
    moneyBlocks: [
      "Fear that wealth will be taken away",
      "Constantly ending financial ventures prematurely",
      "Difficulty with long-term financial planning",
      "Destructive financial patterns"
    ],
    expressionTraits: [
      "I embrace change and transformation in my life",
      "I understand that endings are necessary for growth",
      "I can let go of people and situations that no longer serve me",
      "I've experienced major life transformations",
      "People see me as someone who constantly reinvents themselves"
    ],
    plusSpectrum: ["Powerful transformer", "Phoenix rising", "Rebirth master", "Change catalyst"],
    minusSpectrum: ["Constant destroyer", "Commitment phobic", "Upheaval addict", "Self-sabotager"],
    videoUrl: "https://www.youtube.com/embed/xpIxpPwuQvY"
  },
  14: {
    number: 14,
    name: "Temperance",
    shortDesc: "Energy of harmony, balance and patience",
    keywords: ["harmony", "balance", "patience", "moderation"],
    chakra: 4, // Heart - balance and harmony
    detailedDesc: "Temperance represents the energy of balance, moderation, and alchemy. This is the energy of someone who can blend opposing forces into harmonious wholes. People with this energy are natural healers and mediators who understand the power of patience and gradual progress. They can create harmony from discord.",
    positiveTraits: [
      "Natural ability to create balance and harmony",
      "Patient and moderate approach to life",
      "Skill in blending different elements",
      "Healing presence and calming influence",
      "Understanding of timing and gradual progress"
    ],
    weaknesses: [
      "Can be too compromising or middle-ground",
      "Tendency to avoid extremes or passion",
      "May lack decisiveness or strong opinions",
      "Risk of being too cautious or slow",
      "Difficulty with immediate action when needed"
    ],
    moneyBlocks: [
      "Too conservative with financial growth",
      "Difficulty taking calculated risks",
      "Always seeking balance instead of bold moves",
      "Moderation preventing wealth accumulation"
    ],
    expressionTraits: [
      "I value balance and moderation in all areas of life",
      "I'm patient and willing to work gradually toward goals",
      "I can blend different ideas or perspectives harmoniously",
      "People see me as calm and balanced",
      "I avoid extremes and prefer the middle path"
    ],
    plusSpectrum: ["Balanced alchemist", "Patient healer", "Harmonious blender", "Moderate sage"],
    minusSpectrum: ["Indecisive middler", "Passion avoider", "Overly cautious", "Bland compromiser"],
    videoUrl: "https://www.youtube.com/embed/pts_oDDtnhg"
  },
  15: {
    number: 15,
    name: "The Devil",
    shortDesc: "Energy of materialism, passions and addictions",
    keywords: ["materialism", "passion", "addiction", "temptation"],
    chakra: 1, // Root - material world and desires
    detailedDesc: "The Devil represents the energy of materialism, desire, and shadow self. This is the energy of recognizing our attachments, addictions, and unhealthy patterns. People with this energy have powerful desires and magnetic charisma but must be aware of becoming enslaved to material or physical pleasures.",
    positiveTraits: [
      "Powerful charisma and magnetism",
      "Strong connection to physical world",
      "Ambitious and success-oriented",
      "Passionate and intense nature",
      "Awareness of shadow self"
    ],
    weaknesses: [
      "Can become enslaved to desires or addictions",
      "Tendency toward materialism or greed",
      "May manipulate others for personal gain",
      "Risk of unhealthy attachments",
      "Difficulty with moderation"
    ],
    moneyBlocks: [
      "Greed preventing sustainable wealth",
      "Addictive spending or financial behaviors",
      "Using money to control or manipulate others",
      "Enslaved to pursuit of wealth"
    ],
    expressionTraits: [
      "I have strong desires and ambitions",
      "I'm aware of my shadow side and darker impulses",
      "Material success is very important to me",
      "I can be quite persuasive or magnetic",
      "I struggle with moderation in areas I'm passionate about"
    ],
    plusSpectrum: ["Magnetic leader", "Ambitious achiever", "Shadow integrator", "Passionate creator"],
    minusSpectrum: ["Greedy addict", "Manipulative controller", "Material slave", "Desire prisoner"],
    videoUrl: "https://www.youtube.com/embed/cqrLQi0jyxE"
  },
  16: {
    number: 16,
    name: "The Tower",
    shortDesc: "Energy of destroying illusions and unexpected changes",
    keywords: ["destruction", "change", "liberation", "revelation"],
    chakra: 7, // Crown - sudden revelation
    detailedDesc: "The Tower represents the energy of sudden change, revelation, and destruction of false structures. This is the energy of breakthrough moments that shatter illusions. People with this energy often experience dramatic life changes that, while difficult, ultimately lead to liberation and truth.",
    positiveTraits: [
      "Ability to rebuild after major setbacks",
      "Sees through illusions to truth",
      "Resilient and adaptable to sudden change",
      "Liberating breakthrough insights",
      "Courage to face uncomfortable truths"
    ],
    weaknesses: [
      "Life may feel chaotic or unstable",
      "Tendency to create drama or crisis",
      "May resist necessary change",
      "Risk of being caught in destructive patterns",
      "Difficulty with gradual, stable progress"
    ],
    moneyBlocks: [
      "Sudden financial losses or upheavals",
      "Difficulty maintaining financial stability",
      "Fear of building wealth due to potential loss",
      "Dramatic financial patterns (boom and bust)"
    ],
    expressionTraits: [
      "I've experienced sudden, life-changing events",
      "I can see through false pretenses and illusions",
      "My life tends to have dramatic ups and downs",
      "I'm resilient and can rebuild after disasters",
      "I sometimes feel like a lightning rod for change"
    ],
    plusSpectrum: ["Truth revealer", "Resilient rebuilder", "Liberation bringer", "Illusion shatterer"],
    minusSpectrum: ["Drama creator", "Chaos magnet", "Stability avoider", "Crisis addict"],
    videoUrl: "https://www.youtube.com/embed/Qu9tGG068I0"
  },
  17: {
    number: 17,
    name: "The Star",
    shortDesc: "Energy of hope, inspiration and healing",
    keywords: ["hope", "inspiration", "healing", "harmony"],
    chakra: 5, // Throat - expression and inspiration
    detailedDesc: "The Star represents the energy of hope, inspiration, and renewal. This is the energy of someone who brings light and healing to others. People with this energy are natural inspirers who maintain faith even in darkness. They have a gift for healing and helping others reconnect with their dreams and purpose.",
    positiveTraits: [
      "Naturally inspiring and uplifting to others",
      "Strong healing abilities",
      "Optimistic and hopeful outlook",
      "Connection to higher purpose",
      "Ability to renew faith in others"
    ],
    weaknesses: [
      "Can be overly idealistic or naive",
      "Tendency to ignore practical realities",
      "May struggle when hope seems lost",
      "Risk of giving too much to others",
      "Difficulty with harsh truths"
    ],
    moneyBlocks: [
      "Believing money isn't spiritual or pure",
      "Giving away resources too freely",
      "Unrealistic financial expectations",
      "Difficulty with practical financial planning"
    ],
    expressionTraits: [
      "I inspire hope in others naturally",
      "I believe in the goodness of people and life",
      "I have healing presence or abilities",
      "I maintain optimism even in difficult times",
      "People are drawn to my positive energy"
    ],
    plusSpectrum: ["Inspiring beacon", "Hopeful healer", "Dream renewer", "Faith keeper"],
    minusSpectrum: ["Naive idealist", "Reality avoider", "Over-giver", "Disappointed dreamer"],
    videoUrl: "https://www.youtube.com/embed/YfkWzbbKlQc"
  },
  18: {
    number: 18,
    name: "The Moon",
    shortDesc: "Energy of illusions, subconscious and intuition",
    keywords: ["illusions", "subconscious", "intuition", "fears"],
    chakra: 6, // Third Eye - subconscious and dreams
    detailedDesc: "The Moon represents the energy of the subconscious, intuition, and the realm of dreams and fears. This is the energy of someone who navigates the murky waters of emotion and illusion. People with this energy have powerful intuitive abilities but must learn to distinguish between genuine intuition and fear-based illusion.",
    positiveTraits: [
      "Powerful intuitive and psychic abilities",
      "Deep connection to subconscious mind",
      "Understanding of dreams and symbols",
      "Emotional depth and sensitivity",
      "Ability to navigate uncertainty"
    ],
    weaknesses: [
      "Can be caught in illusions or deception",
      "Tendency toward anxiety or fear",
      "May struggle with clarity or certainty",
      "Risk of being overwhelmed by emotions",
      "Difficulty distinguishing truth from illusion"
    ],
    moneyBlocks: [
      "Fear and anxiety around money",
      "Unclear or confused financial situation",
      "Deception or illusion in financial matters",
      "Letting subconscious fears drive financial decisions"
    ],
    expressionTraits: [
      "I have vivid dreams that feel significant",
      "I rely heavily on my intuition and gut feelings",
      "I sometimes struggle to separate reality from imagination",
      "I'm sensitive to emotional atmospheres",
      "I tend to worry or feel anxious about the unknown"
    ],
    plusSpectrum: ["Intuitive mystic", "Dream interpreter", "Emotional navigator", "Psychic guide"],
    minusSpectrum: ["Anxious worrier", "Illusion victim", "Fearful confuser", "Deception magnet"],
    videoUrl: "https://www.youtube.com/embed/y0P6wUojVbs"
  },
  19: {
    number: 19,
    name: "The Sun",
    shortDesc: "Energy of joy, success and vitality",
    keywords: ["joy", "success", "energy", "optimism"],
    chakra: 3, // Solar Plexus - personal power and vitality
    detailedDesc: "The Sun represents the energy of joy, vitality, and success. This is the energy of someone who radiates warmth and positivity. People with this energy are naturally optimistic and bring light wherever they go. They achieve success through authenticity and have an innate ability to see the bright side of life.",
    positiveTraits: [
      "Naturally joyful and optimistic",
      "Radiant and warm personality",
      "Success comes naturally",
      "High vitality and energy",
      "Ability to uplift and energize others"
    ],
    weaknesses: [
      "Can be overly confident or naive",
      "Tendency to avoid shadow or darkness",
      "May not take things seriously enough",
      "Risk of being surface-level or superficial",
      "Difficulty acknowledging negative emotions"
    ],
    moneyBlocks: [
      "Overconfidence in financial matters",
      "Not planning for rainy days",
      "Difficulty managing money during difficult times",
      "Assuming success will always come easily"
    ],
    expressionTraits: [
      "I'm naturally optimistic and cheerful",
      "Success and achievement come relatively easily to me",
      "I radiate confidence and positive energy",
      "People are drawn to my warmth and vitality",
      "I sometimes struggle to acknowledge negative emotions"
    ],
    plusSpectrum: ["Radiant achiever", "Joyful success", "Vital energizer", "Confident winner"],
    minusSpectrum: ["Superficial optimist", "Shadow avoider", "Overconfident fool", "Fair-weather friend"],
    videoUrl: "https://www.youtube.com/embed/W0poIry5mbI"
  },
  20: {
    number: 20,
    name: "Judgement",
    shortDesc: "Energy of awakening, calling and renewal",
    keywords: ["awakening", "calling", "renewal", "liberation"],
    chakra: 5, // Throat - calling and expression
    detailedDesc: "Judgement represents the energy of awakening, calling, and rebirth. This is the energy of someone who hears their true calling and has the courage to answer it. People with this energy experience powerful moments of clarity about their life purpose and have the ability to help others awaken to their own calling.",
    positiveTraits: [
      "Clear sense of life purpose or calling",
      "Ability to awaken others to their potential",
      "Forgiveness and release of past judgments",
      "Renewal and rebirth capacity",
      "Strong inner knowing about next steps"
    ],
    weaknesses: [
      "Can be overly judgmental of self or others",
      "Tendency to be harsh or critical",
      "May make snap judgments",
      "Risk of feeling called to too many things",
      "Difficulty with patience in awakening process"
    ],
    moneyBlocks: [
      "Judging self as unworthy of wealth",
      "Following calling over financial stability",
      "Self-criticism preventing financial growth",
      "Waiting for \"sign\" before financial action"
    ],
    expressionTraits: [
      "I have a strong sense of my life purpose or calling",
      "I've experienced significant awakening moments",
      "I can be quite critical or judgmental of myself",
      "I help others discover their true path",
      "I know when it's time to make major life changes"
    ],
    plusSpectrum: ["Purpose caller", "Awakening guide", "Renewal catalyst", "Liberation angel"],
    minusSpectrum: ["Harsh judge", "Self-critic", "Impatient awakener", "Calling chaser"],
    videoUrl: "https://www.youtube.com/embed/ZRQFbWp96Oc"
  },
  21: {
    number: 21,
    name: "The World",
    shortDesc: "Energy of completion, success and wholeness",
    keywords: ["completion", "success", "wholeness", "achievement"],
    chakra: 7, // Crown - completion and integration
    detailedDesc: "The World represents the energy of completion, accomplishment, and integration. This is the energy of someone who brings things to successful completion and understands the cycles of achievement. People with this energy have a gift for seeing projects through to the end and integrating all aspects of themselves into wholeness.",
    positiveTraits: [
      "Natural ability to complete what they start",
      "Success and accomplishment",
      "Sense of wholeness and integration",
      "Understanding of cycles and completion",
      "Ability to celebrate achievements"
    ],
    weaknesses: [
      "Can struggle with starting new things after completion",
      "Tendency to rest on past achievements",
      "May fear success or completion",
      "Risk of perfectionism preventing completion",
      "Difficulty with ongoing processes"
    ],
    moneyBlocks: [
      "Fear that success is final or limiting",
      "Difficulty maintaining wealth after achieving it",
      "Perfectionism preventing financial completion",
      "Resting on past financial success"
    ],
    expressionTraits: [
      "I have a strong track record of completing projects",
      "I feel fulfilled and accomplished in my life",
      "I understand the importance of bringing things to closure",
      "I celebrate my achievements and successes",
      "I sometimes struggle with what comes after success"
    ],
    plusSpectrum: ["Successful completer", "Integrated achiever", "Wholeness master", "Cycle finisher"],
    minusSpectrum: ["Past-dweller", "Perfection blocker", "Success fearer", "Completion avoider"],
    videoUrl: "https://www.youtube.com/embed/0IrSWQyntXU"
  },
  22: {
    number: 22,
    name: "The Fool",
    shortDesc: "You are a brave soul embarking on a new journey, trusting life completely and finding freedom in every spontaneous step.",
    keywords: ["beginning", "possibilities", "spontaneity", "freedom"],
    chakra: 7, // Crown - infinite potential
    detailedDesc: "The Fool represents the energy of new beginnings, infinite potential, and faith in the journey. This is the energy of someone who steps into the unknown with trust and openness. People with this energy are free spirits who embrace life as an adventure and aren't afraid to take leaps of faith.",
    positiveTraits: [
      "Openness to new experiences and adventures",
      "Faith and trust in the journey",
      "Spontaneous and free-spirited nature",
      "Beginner's mind and fresh perspective",
      "Courage to take leaps of faith"
    ],
    weaknesses: [
      "Can be too naive or reckless",
      "Tendency to avoid responsibility",
      "May lack planning or foresight",
      "Risk of making foolish decisions",
      "Difficulty with commitment or follow-through"
    ],
    moneyBlocks: [
      "Lack of financial planning or responsibility",
      "Impulsive spending or investments",
      "Trusting wrong people with money",
      "Avoiding practical financial matters"
    ],
    expressionTraits: [
      "I love new beginnings and fresh starts",
      "I trust the universe and take leaps of faith",
      "I'm spontaneous and embrace the unknown",
      "People sometimes see me as naive or foolish",
      "I prefer freedom over security"
    ],
    plusSpectrum: ["Brave adventurer", "Free spirit", "Faith leaper", "Possibility opener"],
    minusSpectrum: ["Naive fool", "Irresponsible drifter", "Reckless risk-taker", "Commitment phobic"],
    videoUrl: "https://www.youtube.com/embed/dg6LJj4aa3k"
  },
};
