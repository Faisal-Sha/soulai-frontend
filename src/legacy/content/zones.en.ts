// Zone interpretations for Matrix of Destiny (English version)

export interface ZoneInfo {
  key: string;
  title: string;
  description: string;
  manifestation?: string;
  application?: string;
  plusMinus?: string;
  recommendations?: string;
}

export const zones: Record<string, ZoneInfo> = {
  // ============= PRIMARY ENERGIES =============
  a: {
    key: "a",
    title: "Your Sacred Source (Birthday)",
    description: "This is your natural reservoir of strength—the unique gifts you brought into this world to rely on for stability, energy, and recovery.",
    manifestation: "This energy is often visible from childhood — in your automatic reactions, type of thinking, habits. When you're tired or stressed, this energy is the first to kick in to 'save' you. It tells you: where you recover fastest and what your innate gift is.",
    application: "In work: the resource zone helps you 'hold the bar' — especially in routine, in repetitive actions. In relationships: this energy shows what support you can give to others, and what you expect from the world. In difficult periods: the resource zone is like an 'internal battery' that helps you not give up.",
    plusMinus: "In the plus: you feel that you have strength and stability. You use your energy consciously — like a navigator. In the minus: you can either overload yourself, or wait for the world to 'owe' you something. There may be a feeling of being drained or returning to old scenarios.",
    recommendations: "Immerse yourself in activities that correspond to this energy — this way you recharge faster. Create an 'energy first aid kit' for yourself: things, activities, people that remind you of your strength. Track whether you're wasting your resource 'in vain' — for example, proving your point or working against yourself.",
  },
  b: {
    key: "b",
    title: "Your Divine Talent (Month)",
    description: "Your most positive energy manifestation—the natural 'processor' responsible for your greatest performances. This is what you do effortlessly and brilliantly by nature.",
    manifestation: "This is a gift from God and a connection with higher powers. It manifests as what comes easily, naturally, without effort. Others often notice this gift before you do. This is the energy where you are maximally 'in the flow' and feel support from above.",
    application: "Realization of the main talent energy improves the connection with the higher, helps to receive support and feel better. Use this talent in work, creativity, relationships — where you can express yourself as naturally as possible.",
    plusMinus: "In the plus: ease, naturalness, flow. A sense of support and 'correctness' of the path. In the minus: ignoring talent, underestimating your abilities, looking for complex paths where there is a simple one.",
    recommendations: "Acknowledge your talent and use it consciously. Share it with the world — this way you strengthen your connection with higher powers. Don't devalue what comes easily — that's where your strength is.",
  },
  c: {
    key: "c",
    title: "Your Soul's Mission (Year)",
    description: "The primary purpose you came to realize in this lifetime—your soul's unique goal that brings meaning and fulfillment to your existence.",
    manifestation: "This is the point that stretches the matrix into the future, determining our development and passing life lessons. It manifests as what constantly pulls you, what causes interest and desire to develop. Often this is an area where you need to make an effort, but the result brings deep satisfaction.",
    application: "It is closely related to money and realization. When you work in the direction of the soul's task, new opportunities open up, resources come. This is the key to financial well-being and inner satisfaction.",
    plusMinus: "In the plus: a sense of the meaning of life, realization, prosperity, inner satisfaction. In the minus: ignoring your task, a feeling of 'not in your place', financial difficulties, inner emptiness.",
    recommendations: "Explore this energy, move in its direction. Ask yourself: 'Why did I come to this life?' Realization of the soul's task is not only about work, but also about your contribution to the world, about the trace you want to leave.",
  },
  d: {
    key: "d",
    title: "Your Deep Transformation (Karma)",
    description: "These are your soul's unresolved lessons from the past—the 'system errors' that, once fixed, unlock your greatest growth and stable life operation.",
    manifestation: "Most of a person's problems and difficulties in life are related to this energy. It manifests as repeating situations, patterns that 'don't let go'. Often this is the zone of maximum discomfort and resistance.",
    application: "Working on this energy is the main lesson of life. When you start working with it consciously, life becomes easier, new opportunities open up. This is the key to transformation and breaking out of the vicious circle of problems.",
    plusMinus: "In the plus: transformation, growth, liberation from old patterns, ease in life. In the minus: repeating problems, getting stuck, a feeling of 'Groundhog Day', resistance to change.",
    recommendations: "Recognize this area as a growth zone. Work with it through awareness, therapy, spiritual practices. Don't avoid difficulties — your main lesson is hidden in them. Be patient with yourself — processing takes time.",
  },
  e: {
    key: "e",
    title: "Soul Comfort Zone",
    description: "Comfort energy shows the energy by which the soul is most comfortable to express itself. It is analogous to a computer's operating system (Windows, Mac), providing the basis for functioning.",
    manifestation: "Comfort energy affects all areas of life. This is your 'basic mode of operation', how you interact with the world on autopilot. When you're in this energy, everything goes easily and naturally.",
    application: "Proper realization of this energy helps to avoid negative states and attracting negative situations. Create an environment and conditions that support this energy — this way you will be in resources and harmony.",
    plusMinus: "In the plus: ease, harmony, naturalness in all areas of life. In the minus: discomfort, tension, attraction of negative situations, a feeling of 'out of place'.",
    recommendations: "Study this energy and create conditions for its manifestation. Surround yourself with people, places, activities that resonate with it. When you feel discomfort — check if you have deviated from your comfort zone.",
  },

  // ============= MALE LINEAGE PROGRAMS =============
  f: {
    key: "f",
    title: "Father's Lineage Program (1)",
    description: "Energy of the male lineage, transmitted through the paternal line. Influence of father and grandfathers.",
  },
  y: {
    key: "y",
    title: "Father's Lineage Program (2)",
    description: "Secondary energy of the paternal lineage. Additional qualities from the male line.",
  },
  o: {
    key: "o",
    title: "Male Lineage Result",
    description: "Overall program of the male lineage. Total influence of the paternal line on your destiny.",
  },

  // ============= FEMALE LINEAGE PROGRAMS =============
  g: {
    key: "g",
    title: "Mother's Lineage Program (1)",
    description: "Energy of the female lineage, transmitted through the maternal line. Influence of mother and grandmothers.",
  },
  k: {
    key: "k",
    title: "Mother's Lineage Program (2)",
    description: "Secondary energy of the maternal lineage. Additional qualities from the female line.",
  },
  u: {
    key: "u",
    title: "Female Lineage Result",
    description: "Overall program of the female lineage. Total influence of the maternal line on your destiny.",
  },

  // ============= PARENT-CHILD RELATIONS ZONE =============
  a1: {
    key: "a1",
    title: "Relationships with Children (1)",
    description: "Energy of relationships with children. How you manifest as a parent.",
  },
  a2: {
    key: "a2",
    title: "Relationships with Children (2)",
    description: "Additional aspect of parent-child relationships. Deep connections with descendants.",
  },

  // ============= KARMIC TAIL =============
  d1: {
    key: "d1",
    title: "Karmic Tail (1)",
    description: "First level of karmic tasks. What needs to be worked through from past incarnations.",
  },
  d2: {
    key: "d2",
    title: "Karmic Tail (2)",
    description: "Second level of karmic tasks. Deep karmic nodes for processing.",
  },

  // ============= PROSPERITY LINE =============
  c1: {
    key: "c1",
    title: "Your Path to Abundance (1)",
    description: "Your primary point of material growth—the first step toward achieving financial stability and flow.",
  },
  c2: {
    key: "c2",
    title: "Your Path to Abundance (2)",
    description: "An additional resource for your prosperity, showing what else feeds your material well-being.",
  },
  x: {
    key: "x",
    title: "Your Prosperity Center",
    description: "The heart of your material success—the central key to your financial power and long-term stability.",
  },
  x1: {
    key: "x1",
    title: "Prosperity Support (1)",
    description: "The foundational support that helps you maintain your financial flow.",
  },
  x2: {
    key: "x2",
    title: "Prosperity Support (2)",
    description: "The secondary support system for your material growth and expansion.",
  },

  // ============= SEXUALITY PROGRAM =============
  e1: {
    key: "e1",
    title: "Sexuality (1)",
    description: "Program of sexual energy. Manifestation in the intimate sphere of life.",
  },
  e2: {
    key: "e2",
    title: "Sexuality (2)",
    description: "Additional aspect of sexual energy. Depth of intimate relationships.",
  },

  // ============= ADDITIONAL LINEAGE POINTS =============
  s1: {
    key: "s1",
    title: "Father's Lineage Point (1)",
    description: "Additional energy of the paternal line.",
  },
  s2: {
    key: "s2",
    title: "Father's Lineage Point (2)",
    description: "Second additional energy of the paternal line.",
  },
  s3: {
    key: "s3",
    title: "Father's Lineage Point (3)",
    description: "Third additional energy of the paternal line.",
  },
  s4: {
    key: "s4",
    title: "Father's Lineage Point (4)",
    description: "Fourth additional energy of the paternal line.",
  },
  p1: {
    key: "p1",
    title: "Mother's Lineage Point (1)",
    description: "Additional energy of the maternal line.",
  },
  p2: {
    key: "p2",
    title: "Mother's Lineage Point (2)",
    description: "Second additional energy of the maternal line.",
  },
  p3: {
    key: "p3",
    title: "Mother's Lineage Point (3)",
    description: "Third additional energy of the maternal line.",
  },
  p4: {
    key: "p4",
    title: "Mother's Lineage Point (4)",
    description: "Fourth additional energy of the maternal line.",
  },

  // ============= DIVINE TALENTS =============
  b1: {
    key: "b1",
    title: "Divine Talent (1)",
    description: "First level of talents given from above. Special abilities of the soul.",
  },
  b2: {
    key: "b2",
    title: "Divine Talent (2)",
    description: "Second level of divine talents. Deep gifts of the soul.",
  },

  // ============= PURPOSE 20-40 YEARS =============
  h: {
    key: "h",
    title: "Purpose 20-40 years (1)",
    description: "First task in the period of youth and personality formation.",
  },
  j: {
    key: "j",
    title: "Purpose 20-40 years (2)",
    description: "Second task of the 20-40 years period. Development and self-realization.",
  },
  m: {
    key: "m",
    title: "Purpose 20-40 years Result",
    description: "Overall goal of the youth period. What needs to be achieved by age 40.",
  },

  // ============= PURPOSE 40-60 YEARS =============
  n: {
    key: "n",
    title: "Purpose 40-60 years (1)",
    description: "First task of the maturity and wisdom period.",
  },
  t: {
    key: "t",
    title: "Purpose 40-60 years (2)",
    description: "Second task of the 40-60 years period. Experience accumulation.",
  },
  z: {
    key: "z",
    title: "Purpose 40-60 years Result",
    description: "Overall goal of the maturity period. What needs to be achieved by age 60.",
  },

  // ============= PURPOSE AFTER 60 YEARS =============
  s: {
    key: "s",
    title: "Purpose after 60 years",
    description: "Mission of the wisdom period. Spiritual mentorship and experience transmission.",
  },

  // ============= HEALTH TABLE - ANAHATA =============
  a3: {
    key: "a3",
    title: "Health: Anahata (1)",
    description: "Heart chakra energy. Emotional health and love.",
  },
  b3: {
    key: "b3",
    title: "Health: Anahata (2)",
    description: "Additional anahata energy. Balance in relationships.",
  },

  // ============= HEALTH TABLE - EMOTIONS =============
  l: {
    key: "l",
    title: "Emotions: Basic",
    description: "Basic emotional background. Main emotional patterns.",
  },
  l1: {
    key: "l1",
    title: "Emotions: Level 1",
    description: "First level of emotional state.",
  },
  l2: {
    key: "l2",
    title: "Emotions: Level 2",
    description: "Second level of emotional sphere.",
  },
  l3: {
    key: "l3",
    title: "Emotions: Level 3",
    description: "Third level of emotions and feelings.",
  },
  l4: {
    key: "l4",
    title: "Emotions: Level 4",
    description: "Fourth level of emotional depth.",
  },
  l5: {
    key: "l5",
    title: "Emotions: Level 5",
    description: "Fifth level of emotional experiences.",
  },
  l6: {
    key: "l6",
    title: "Emotions: Level 6",
    description: "Sixth level of emotional sphere.",
  },

  // ============= HEALTH TABLE - SUMMARY =============
  healthPhysTotal: {
    key: "healthPhysTotal",
    title: "Health: Physical Body",
    description: "Overall physical health condition. Body energy.",
  },
  healthEnergyTotal: {
    key: "healthEnergyTotal",
    title: "Health: Energy",
    description: "Energy state. Life force and vitality.",
  },
  healthBalanceTotal: {
    key: "healthBalanceTotal",
    title: "Health: Summary",
    description: "Overall health summary. Integral assessment of all body systems.",
  },

  // ============= INTERMEDIATE POINTS =============
  c3: {
    key: "c3",
    title: "Prosperity (3)",
    description: "Intermediate point between center and prosperity entry. Additional material potential.",
  },
  d3: {
    key: "d3",
    title: "Karmic Processing (3)",
    description: "Intermediate point between center and karmic tail. Additional karmic lesson.",
  },

  // ============= LEGACY COMPATIBILITY FIELDS =============
  center: {
    key: "center",
    title: "Your Soul's Core",
    description: "Your absolute essence—the core energy of your personality and the direct path to your self-realization.",
  },
  top: {
    key: "top",
    title: "Top / Spirit",
    description: "Spiritual purpose, connection with higher forces.",
  },
  left: {
    key: "left",
    title: "Left / Impression",
    description: "Your perception of the world, personal impressions and experience.",
  },
  right: {
    key: "right",
    title: "Right / Karma",
    description: "Karmic tasks, lessons from past incarnations.",
  },
  bottom: {
    key: "bottom",
    title: "Bottom / Destiny",
    description: "Life path, main direction of development.",
  },
  money: {
    key: "money",
    title: "Money Channel",
    description: "Ways to attract money and material well-being.",
  },
  love: {
    key: "love",
    title: "Love Channel",
    description: "Type of relationships, partnership and romantic sphere.",
  },
  health: {
    key: "health",
    title: "Health",
    description: "Energetic state and approach to health.",
  },
};
