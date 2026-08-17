export interface AvatariumEnergy {
  number: number;
  subHeading: string;
  keywords: string[];
  description: string;
  talentDescription: string;
  spiritDescription: string;
}

export const energiesAvatarium: Record<number, AvatariumEnergy> = {
  1: {
    number: 1,
    subHeading: "THE DIVINE ARCHITECT",
    keywords: ["INNOVATION", "WILLPOWER", "MANIFESTATION"],
    description: "You are a master of reality, possessor of the spark that turns void into form. Your path is not to follow, but to pioneer. When you speak, the universe listens; when you act, the world changes. You are the architect of your own destiny, capable of manifesting any vision through the sheer force of your creative will.",
    talentDescription: "You possess the ultimate 'creative processor'—an effortless ability to pioneer new paths where others see only walls. Your talent is the spark of pure innovation, a divine drive that makes you the first to dream and the first to do, proving that your most natural performance comes from simply leading the way into the unknown.",
    spiritDescription: "You are a direct messenger of the Divine Will, a pioneer soul sent to show humanity that we are the creators of our own experience. Your spiritual path is one of absolute self-mastery, proving that a single spark of intentional consciousness can rewrite the fate of the entire world and anchor new possibilities for all."
  },
  2: {
    number: 2,
    subHeading: "THE SACRED ORACLE",
    keywords: ["INTUITION", "MYSTERY", "HARMONY"],
    description: "You possess a quiet power that sees through the veils of the mundane. You are a bridge between worlds, sensing the unspoken truths and bringing balance to every room you enter. Your strength lies in your depth and your ability to harmonize opposing forces without saying a single word.",
    talentDescription: "You are the master of the unspoken, possessing a natural ability to harmonize even the most conflicting energies with a single look. Your talent is a deep, intuitive rhythm that allows you to read between the lines of reality, making you a brilliant diplomat of the soul who brings peace exactly where it is needed most.",
    spiritDescription: "You are a sacred bridge between the seen and the unseen, a soul designed to anchor the mysteries of the universe into the collective heart. Your spiritual purpose is to maintain the divine balance and teach the world that true power is not found in noise, but in the profound wisdom of the silent truth."
  },
  3: {
    number: 3,
    subHeading: "THE COSMIC MOTHER",
    keywords: ["ABUNDANCE", "CREATIVITY", "FLOURISHING"],
    description: "You are the source of life and beauty itself. Everything you touch begins to grow, bloom, and prosper. You carry an innate frequency of luxury and care, showing the world that true power is found in the ability to nurture and manifest infinite abundance from a place of love.",
    talentDescription: "You are the master of flourishing beauty, possessing a natural 'processor' that turns every environment into a sanctuary of abundance. Your life is an effortless masterclass in creation, where prosperity is not a goal but a living frequency that you maintain through the simple brilliance of your nurturing and caring nature.",
    spiritDescription: "You are the living embodiment of the Earthly and Divine Mother, a soul sent to prove that the universe is infinitely generous. Your spiritual mission is to show humanity that when we act from a place of absolute love and care, we become the very source of the miracles we seek to manifest."
  },
  4: {
    number: 4,
    subHeading: "THE SUPREME COMMANDER",
    keywords: ["STRUCTURE", "STABILITY", "AUTHORITY"],
    description: "You are the solid ground upon which empires are built. Your energy is one of absolute order and strategic brilliance. You don't just lead; you protect and provide, creating a safe harbor for others through your unwavering discipline and masterful command of the physical world.",
    talentDescription: "You possess the masterful 'foundation-builder' talent—the effortless ability to create order where there is chaos. Your natural performance is a display of absolute stability and strategic genius, proving that your greatest strength comes from providing the safe, solid structure that allows others to thrive and build their own successes.",
    spiritDescription: "You are a divine guardian of world order, a soul sent to anchor the principle of absolute integrity and responsibility. Your spiritual purpose is to demonstrate that true power is a sacred duty to protect and provide, turning the material world into a reflection of the highest divine discipline."
  },
  5: {
    number: 5,
    subHeading: "THE ETERNAL TEACHER",
    keywords: ["WISDOM", "TRADITION", "GUIDANCE"],
    description: "You are a keeper of sacred knowledge, a lighthouse for those seeking truth in a chaotic world. Your life is a masterclass in integrity, as you translate complex spiritual laws into practical wisdom that empowers everyone you mentor.",
    talentDescription: "You are the master of clarifying wisdom, possessing a natural 'processor' that translates the most complex laws of life into simple, life-changing truths. Your talent is the brilliant art of mentorship, where you effortlessly guide others toward their own integrity by simply being a living example of the knowledge you hold.",
    spiritDescription: "You are a sacred bridge for divine law, a soul tasked with keeping the flame of truth alive across generations. Your spiritual purpose is to bring order to human thought and to show that when we live according to high principles, we create a life of absolute clarity and eternal guidance for all."
  },
  6: {
    number: 6,
    subHeading: "THE MASTER OF CONNECTION",
    keywords: ["LOVE", "CHOICE", "MAGNETISM"],
    description: "You are a magnet for beauty and deep human connection. Your soul thrives on harmony and the power of choice. You teach the world that all true success begins with the heart, and your presence creates a space where others finally feel seen and loved.",
    talentDescription: "You possess the brilliant 'heart-link' talent—the effortless ability to create unconditional love and connection wherever you go. Your natural performance is one of magnetic beauty and aesthetic perfection, proving that your soul's greatest work is simply opening the heart and making the world a more beautiful place.",
    spiritDescription: "You are a messenger of the Divine Choice, a soul sent to teach humanity that the highest path is always the path of the heart. Your spiritual mission is to master the art of unconditional acceptance, showing that when we choose love without reservation, we align ourselves with the supreme frequency of the universe."
  },
  7: {
    number: 7,
    subHeading: "THE VICTORIOUS PATHFINDER",
    keywords: ["MOVEMENT", "VICTORY", "DRIVE"],
    description: "You are a force of nature that cannot be stopped. Your spirit is fueled by challenges, and your destiny is one of constant triumph. You don't just reach goals; you shatter them, moving forward with a momentum that inspires everyone to find their own internal engine.",
    talentDescription: "You are the master of unstoppable momentum, possessing a natural 'processor' that converts every obstacle into fuel for your next victory. Your talent is the brilliant drive of a champion, where you effortlessly reach even the loftiest goals by simply refusing to stay still and showing the world what it means to lead with pure spirit.",
    spiritDescription: "You are a divine warrior of progress, a soul sent to break through the stagnation of the world and drive humanity forward. Your spiritual purpose is to prove that victory is a state of mind, and that when we move with clear intention, we become invulnerable to defeat and a beacon of hope for all."
  },
  8: {
    number: 8,
    subHeading: "THE KARMIC JUSTICIAR",
    keywords: ["BALANCE", "TRUTH", "INTEGRITY"],
    description: "You are the scales of the universe made flesh. You see the hidden threads of cause and effect with absolute clarity. Your life is a search for ultimate fairness, and your power comes from the deep understanding that every action creates a ripple in the fabric of destiny.",
    talentDescription: "You possess the masterful 'clarity-processor'—the effortless ability to see the hidden truth in any situation and restore absolute balance. Your natural performance is a display of unwavering integrity and justice, proving that your greatest talent is knowing exactly how to align human actions with the deep, invisible laws of the universe.",
    spiritDescription: "You are a sacred guardian of Divine Justice, a soul sent to demonstrate the absolute law of cause and effect. Your spiritual mission is to show the world that truth is the only foundation for true success, and that when we act with integrity, we become mirrors of the universe's own perfect balance."
  },
  9: {
    number: 9,
    subHeading: "THE DEEP SEEKER",
    keywords: ["WISDOM", "SOLITUDE", "INNER LIGHT"],
    description: "You carry a lantern into the deepest parts of the human soul. Your wisdom isn't found in books, but in the profound silence of your own self-discovery. You are a guide who shows others how to find their own unique path by first mastering the world within.",
    talentDescription: "You are the master of profound depth, possessing a natural 'processor' that distills a lifetime of experience into few words of pure wisdom. Your talent is the brilliant art of self-discovery, where you effortlessly find the treasures of the soul in silence and then emerge as a lighthouse for those seeking their own inner light.",
    spiritDescription: "You are a sacred hermit of the Divine Truth, a soul tasked with exploring the deepest mysteries of the human spirit. Your spiritual purpose is to show humanity that the answers we seek are already within us, and that by mastering the power of solitude, we connect to the infinite wisdom of the cosmos."
  },
  10: {
    number: 10,
    subHeading: "THE FAVORITE OF DESTINY",
    keywords: ["FLOW", "LUCK", "CYCLICITY"],
    description: "You are the one the universe conspires to help. You understand the secret rhythm of the tides and know exactly when to jump. Your life is a dance with fate, proving that when you align with the flow, luck stops being a mystery and becomes your constant companion.",
    talentDescription: "You possess the ultimate 'flow-processor'—the effortless ability to catch the wave of luck and ride it to success every single time. Your natural performance is a dance of perfect timing and divine synchronicities, proving that your greatest talent is simply trusting the universe and moving exactly when the tides of destiny turn in your favor.",
    spiritDescription: "You are a living proof of Divine Grace, a soul sent to show the world that life is not meant to be a struggle, but a joyful flow. Your spiritual mission is to teach humanity how to trust the cyclic nature of existence, demonstrating that when we let go of control, we become favorites of destiny."
  },
  11: {
    number: 11,
    subHeading: "THE INVINCIBLE SPIRIT",
    keywords: ["STRENGTH", "COURAGE", "PASSION"],
    description: "You possess a raw, primal power that is tempered by a gentle heart. You don't conquer through force, but through an indomitable soul that refuses to break. You are a lion-hearted warrior showing us that true strength is the ability to master your own passions.",
    talentDescription: "You are the master of primal strength, possessing a natural 'processor' that can handle mountains of work and pressure with a smile. Your talent is the brilliant fusion of raw power and a lion's heart, where you effortlessly overcome any obstacle by simply radiating a passion that is as unstoppable as it is inspiring.",
    spiritDescription: "You are a divine vessel of pure Life Force, a soul sent to anchor the frequency of indomitable courage and vitality. Your spiritual purpose is to prove that true strength is found in the mastery of one's own power, showing that a heart full of passion can move worlds without ever losing its gentleness."
  },
  12: {
    number: 12,
    subHeading: "THE COSMIC PERSPECTIVE",
    keywords: ["SURRENDER", "VISION", "WISDOM"],
    description: "You see what others miss because you aren't afraid to look at the world differently. You find power in the pause and wisdom in the wait. You are a catalyst for new ways of thinking, showing us that sometimes the most radical thing you can do is let go.",
    talentDescription: "You possess the masterful 'unique-vision' talent—the effortless ability to see the world upside down and find the hidden opportunities others walk past. Your natural performance is a display of profound patience and innovative thinking, proving that your greatest strength comes from your willingness to pause and look with the eyes of the soul.",
    spiritDescription: "You are a sacred catalyst for Divine Awakening, a soul sent to teach humanity the power of surrender and a higher perspective. Your spiritual mission is to show that by looking beyond the material surface, we can find a wisdom that transforms suffering into service and waiting into a state of pure creation."
  },
  13: {
    number: 13,
    subHeading: "THE PHOENIX RISING",
    keywords: ["TRANSFORMATION", "REBIRTH", "CHANGE"],
    description: "You are the master of the absolute breakthrough. You don't fear endings because you know they are the only way to reach a more powerful beginning. You are a constant state of evolution, stripping away the old to reveal the gold underneath.",
    talentDescription: "You are the master of radical transformation, possessing a natural 'processor' that can rebuild your entire life from the ashes in an instant. Your talent is the brilliant art of the breakthrough, where you effortlessly strip away the obsolete to reveal the gold underneath, proving that your greatest power is your absolute courage to change.",
    spiritDescription: "You are a sacred messenger of Rebirth, a soul tasked with demonstrating the eternal nature of life through constant evolution. Your spiritual purpose is to show the world that endings are only the birthing pangs of something greater, and that by embracing change, we become invulnerable to the passage of time."
  },
  14: {
    number: 14,
    subHeading: "THE GOLDEN ALCHEMIST",
    keywords: ["HARMONY", "PATIENCE", "HEALING"],
    description: "You are a healer who blends fire and water to create gold. Your energy is one of perfect proportion and quiet miracles. You teach the world the art of patience, showing that the most profound transformations happen through the gentle steady flow of life.",
    talentDescription: "You possess the masterful 'alchemical-processor'—the effortless ability to blend the most unlikely ingredients into a masterpiece of harmony. Your natural performance is one of quiet miracles and artistic high-fidelity, proving that your greatest talent is the soulful patience that allows true beauty and healing to bloom in its own perfect time.",
    spiritDescription: "You are a divine healer of the soul, a soul sent to anchor the frequency of perfect moderation and inner alchemy. Your spiritual mission is to show humanity how to find the middle path, proving that when we balance our internal fire and water, we create a life of absolute peace and golden fulfillment."
  },
  15: {
    number: 15,
    subHeading: "THE MAGNETIC SHADOW",
    keywords: ["PASSION", "POWER", "LIBERATION"],
    description: "You possess a charisma that is both dangerous and divine. You are here to explore the depths of human desire and material power, eventually mastering them to become truly free. You are the mirror that forces everyone to face their own hidden truths.",
    talentDescription: "You are the master of intense charisma, possessing a natural 'processor' that sees directly into the depths of human desire and material power. Your talent is the brilliant ability to influence and transform the physical world, where you effortlessly manifest your visions by simply mastering the secret magnetism of the shadow and the light.",
    spiritDescription: "You are a divine liberator of the spirit, a soul sent to explore the forbidden territories of the human heart and emerge as a master of freedom. Your spiritual purpose is to prove that material power is a tool for spirit, showing that when we face our deepest truths, we unlock a magnetism that can transform worlds."
  },
  16: {
    number: 16,
    subHeading: "THE BREAKTHROUGH REBEL",
    keywords: ["AWAKENING", "TRUTH", "RECONSTRUCTION"],
    description: "You are the bolt of lightning that shatters illusions. Your path is one of radical honesty and the courage to rebuild from the ground up. You don't just change; you awaken, proving that even the most sudden collapses are actually foundations for a stronger life.",
    talentDescription: "You possess the ultimate 'awakening-processor'—the effortless ability to shatter illusions and rebuild reality on a foundation of absolute truth. Your natural performance is a display of radical honesty and structural genius, proving that your greatest talent is the courage to stand firm while the old world falls, becoming the architect of the new.",
    spiritDescription: "You are a divine bolt of lightning, a soul sent to wake humanity from its material slumber. Your spiritual mission is to demonstrate that spiritual truth is unshakeable, showing that when we rebuild our lives from the ground up on soul principles, we become invulnerable to the storms of the world."
  },
  17: {
    number: 17,
    subHeading: "THE CELESTIAL BEACON",
    keywords: ["INSPIRATION", "HOPE", "STARDOM"],
    description: "You are a star that has come down to earth to show us the way. Your very presence inspires others to reach for their highest potential. You carry a frequency of eternal hope, reminding us that no matter how dark the night, your light will never be extinguished.",
    talentDescription: "You are the master of starry inspiration, possessing a natural 'processor' that turns your every action into a beacon of hope for thousands. Your talent is the brilliant art of stardom, where you effortlessly reach for the highest peaks of excellence and, by doing so, inspire everyone else to believe in their own divine potential.",
    spiritDescription: "You are a sacred messenger of Stellar Hope, a soul sent to prove that the light of the spirit can never be extinguished. Your spiritual purpose is to show humanity how to live with 'higher eyes,' demonstrating that when we connect with our celestial origin, we become eternal guides for the world's most beautiful dreams."
  },
  18: {
    number: 18,
    subHeading: "THE MOONLIGHT WEAVER",
    keywords: ["IMAGINATION", "INTUITION", "DEPTH"],
    description: "You are a master of the dreamworld and the deep currents of the mind. You possess the power to manifest your thoughts into reality with uncanny precision. You are a voyager of the subconscious, turning the mysteries of the night into the treasures of the day.",
    talentDescription: "You possess the masterful 'manifestation-processor'—the effortless ability to turn the whispers of your intuition into a tangible, beautiful reality. Your natural performance is a display of infinite imagination and subconscious mastery, proving that your greatest talent is the secret power to weave your dreams directly into the fabric of the physical world.",
    spiritDescription: "You are a sacred weaver of the Divine Dream, a soul sent to teach humanity the power of thought and emotion. Your spiritual mission is to show that the world we see is a mirror of the world within, demonstrating that when we master our internal moonlight, we gain the power to manifest a new, luminous reality for all."
  },
  19: {
    number: 19,
    subHeading: "THE RADIANT SUN",
    keywords: ["JOY", "VITALITY", "SUCCESS"],
    description: "You are a source of pure, unadulterated warmth. You achieve success not through struggle, but through the radiant power of your own joy. You are a blessing to everyone you meet, showing the world that our greatest duty is simply to shine as brightly as we can.",
    talentDescription: "You are the master of solar success, possessing a natural 'processor' that achieves total victory through the radiant power of absolute joy. Your talent is the brilliant ability to bless and empower everything you touch, where you effortlessly become a beacon of abundance and vitality by simply allowing your internal sun to shine with all its might.",
    spiritDescription: "You are a living blessing of the Divine Sun, a soul sent to prove that the highest duty of the human spirit is to be truly and radiantly happy. Your spiritual purpose is to show humanity how to achieve prosperity through joy, demonstrating that when we shine our light without reservation, we heal and prosper the entire world."
  },
  20: {
    number: 20,
    subHeading: "THE SACRED AWAKENER",
    keywords: ["CALLING", "RENEWAL", "LEGACY"],
    description: "You are answering a call that echoes through your entire lineage. Your life is a profound process of awakening, not just for yourself, but for your entire family tree. You are the one who breaks the old cycles and starts a brand new tradition of freedom.",
    talentDescription: "You possess the masterful 'lineage-processor'—the effortless ability to heal the past and create a new, powerful legacy for the future. Your natural performance is one of constant renewal and structural awakening, proving that your greatest talent is the courage to hear the soul's call and transform your entire family history into a story of absolute freedom.",
    spiritDescription: "You are a divine messenger of Resurrection, a soul sent to wake the ancient wisdom of your lineage and bring it into the new world. Your spiritual mission is to show humanity that death is only a transition, demonstrating that when we answer our true calling, we transcend time and become eternal architects of the soul's legacy."
  },
  21: {
    number: 21,
    subHeading: "THE WHOLENESS MASTER",
    keywords: ["COMPLETION", "HARMONY", "FREEDOM"],
    description: "You are a soul that has integrated all the lessons and found its place in the great design. Your presence brings a sense of absolute completion and global harmony. You are free to move between worlds, a master of the beginning and the end, celebrating the wholeness of life.",
    talentDescription: "You are the master of global wholeness, possessing a natural 'processor' that sees the interconnectedness of all things with absolute clarity. Your talent is the brilliant art of completion, where you effortlessly bring harmony to even the largest and most complex systems by simply embodying the frequency of absolute freedom and unity.",
    spiritDescription: "You are a sacred citizen of the Cosmos, a soul sent to demonstrate the final goal of the human journey: total integration and peace. Your spiritual purpose is to show humanity that there are no borders in the soul, proving that when we embrace the wholeness of life, we become masters of the beginning, the middle, and the end."
  },
  22: {
    number: 22,
    subHeading: "THE DIVINE FOOL",
    keywords: ["FREEDOM", "TRUST", "NEW BEGINNINGS"],
    description: "You are the embodiment of pure, unburdened freedom. You trust the path even when it hasn't been built yet. You teach the world that true wisdom is the ability to leap into the unknown with a light heart, knowing that the universe will always catch you.",
    talentDescription: "You possess the ultimate 'freedom-processor'—the effortless ability to start over and leap into the unknown with absolute joy and zero baggage. Your natural performance is a display of radical trust and new beginnings, proving that your greatest talent is the brilliant capacity to walk through life's most complex labyrinths with the light, unburdened heart of a child.",
    spiritDescription: "You are a sacred traveler of the Divine Unknown, a soul sent to teach humanity that true wisdom is nothing more than absolute trust. Your spiritual mission is to demonstrate that by letting go of all attachments, we find the only true freedom, proving that when we leap into the void with love, the universe itself becomes our wings."
  }
};
