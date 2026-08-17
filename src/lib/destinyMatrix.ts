// SoulPlus AI calculation logic using numerology principles

export interface MatrixResult {
  day: number;
  month: number;
  year: number;
  // Main positions
  personalGrowth: number;
  talents: number;
  purpose: number;
  karma: number;
  // Channels
  moneyChannel: number;
  relationshipChannel: number;
  healthChannel: number;
  // Center
  centerEnergy: number;
}

// Reduce a number to single digit or master numbers (11, 22)
function reduceNumber(num: number): number {
  while (num > 22) {
    num = num
      .toString()
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  if (num === 0) {
    num = 22;
  }
  return num;
}

// Calculate sum of digits
function sumDigits(num: number): number {
  return num
    .toString()
    .split("")
    .reduce((sum, digit) => sum + parseInt(digit), 0);
}

export function calculateMatrix(
  day: number,
  month: number,
  year: number
): MatrixResult {
  // Basic validations
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
    throw new Error("Invalid date");
  }

  // SoulPlus AI formulas
  const D = day > 22 ? reduceNumber(day) : day;  // День (редукция если > 22)
  const M = month;                            // Месяц (без редукции)
  const Y = reduceNumber(sumDigits(year));    // Y = reduce22(сумма цифр года)

  // Calculate all positions
  const center = reduceNumber(D + M + Y);     // Центр
  const purpose = reduceNumber(D + M);        // Предназначение (Purpose)
  const growth = reduceNumber(D);             // Рост (Growth)
  const talents = reduceNumber(M);            // Таланты (Talents)
  const karma = Y;                            // Карма (Karma)
  const money = reduceNumber(D + Y);          // Денежный канал (Money)
  const love = reduceNumber(M + Y);           // Канал любви (Love)
  const health = center;                      // Здоровье = центр (Health)

  return {
    day,
    month,
    year,
    personalGrowth: growth,
    talents: talents,
    purpose: purpose,
    karma: karma,
    moneyChannel: money,
    relationshipChannel: love,
    healthChannel: health,
    centerEnergy: center,
  };
}

// Extended interpretation structure
export interface NumberInterpretation {
  name: string;
  description?: string; // Short description for backward compatibility
  plus?: string[];
  minus?: string[];
  resource?: string[];
  talents?: string[];
  guidelines?: string[];
  money_channel?: {
    entry?: string;
    expand?: string[];
  };
  health_notes?: string;
  premium: boolean;
}

// Interpretations for each number
export const interpretations: Record<number, NumberInterpretation> = {
  1: {
    name: "Маг",
    description: "Independence, leadership, and pioneering spirit. You are meant to lead and innovate.",
    plus: ["мастерство", "авантюризм", "идеи"],
    minus: ["эгоизм", "манипуляции", "злопамятность"],
    resource: ["творчество", "путешествия", "йога/медитации"],
    talents: ["быстрая генерация идей", "наставничество"],
    guidelines: ["верить в себя", "воплощать идеи", "развивать интуицию"],
    money_channel: {
      entry: "движение и вдохновение",
      expand: ["движение", "вдохновение", "командные проекты"]
    },
    health_notes: "Важна работа с энергией и балансом",
    premium: true,
  },
  2: {
    name: "The Mediator",
    description: "Diplomacy, partnership, and balance. You excel in cooperation and harmony.",
    premium: false,
  },
  3: {
    name: "The Creator",
    description: "Creativity, expression, and joy. Your gift is bringing beauty and inspiration to the world.",
    premium: false,
  },
  4: {
    name: "The Builder",
    description: "Stability, practicality, and hard work. You create lasting foundations and structures.",
    premium: false,
  },
  5: {
    name: "The Explorer",
    description: "Freedom, adventure, and change. You thrive on variety and new experiences.",
    premium: false,
  },
  6: {
    name: "The Nurturer",
    description: "Love, responsibility, and harmony. You excel in caring for others and creating balance.",
    premium: false,
  },
  7: {
    name: "The Seeker",
    description: "Wisdom, spirituality, and analysis. You are drawn to deeper truths and understanding.",
    premium: false,
  },
  8: {
    name: "The Achiever",
    description: "Power, success, and material mastery. You have great potential for accomplishment.",
    premium: false,
  },
  9: {
    name: "The Humanitarian",
    description: "Compassion, completion, and universal love. You serve the greater good.",
    premium: false,
  },
  10: {
    name: "The Transformer",
    description: "New beginnings and infinite potential. You bring fresh starts and renewal.",
    premium: false,
  },
  11: {
    name: "The Intuitive (Master)",
    description: "Spiritual insight and illumination. A master number of higher consciousness.",
    premium: false,
  },
  12: {
    name: "The Visionary",
    description: "Creativity and self-sacrifice. You bridge the spiritual and material worlds.",
    premium: false,
  },
  13: {
    name: "The Alchemist",
    description: "Transformation and rebirth. You turn challenges into opportunities.",
    premium: false,
  },
  14: {
    name: "The Balancer",
    description: "Adaptability and balance. You find harmony between extremes.",
    premium: false,
  },
  15: {
    name: "The Magician",
    description: "Magic and manifestation. You have strong creative and manifesting abilities.",
    premium: false,
  },
  16: {
    name: "The Truth Seeker",
    description: "Spiritual awakening through challenges. Deep transformation and wisdom.",
    premium: false,
  },
  17: {
    name: "The Star",
    description: "Hope, inspiration, and spiritual connection. You light the way for others.",
    premium: false,
  },
  18: {
    name: "The Illuminator",
    description: "Illusion and intuition. You see beyond surface appearances.",
    premium: false,
  },
  19: {
    name: "The Sun",
    description: "Joy, success, and vitality. You radiate positive energy and confidence.",
    premium: false,
  },
  20: {
    name: "The Awakener",
    description: "Judgment and renewal. You bring clarity and new perspectives.",
    premium: false,
  },
  21: {
    name: "The Achiever",
    description: "Completion and success. You bring projects and cycles to fulfillment.",
    premium: false,
  },
  22: {
    name: "The Master Builder",
    description: "Master architect of dreams. You can manifest great visions into reality.",
    premium: false,
  },
};
