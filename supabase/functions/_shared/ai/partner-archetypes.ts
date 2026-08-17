/** Short archetype names used in partner readings (Matrix of Destiny / Abundance school style). */
export const PARTNER_ARCHETYPES: Record<number, string> = {
  1: "Magician",
  2: "High Priestess",
  3: "Empress",
  4: "Emperor",
  5: "Hierophant",
  6: "Lovers",
  7: "Warrior",
  8: "Justice",
  9: "Sage",
  10: "Wheel of Fortune",
  11: "Strength",
  12: "Hanged Man",
  13: "Death",
  14: "Temperance",
  15: "Devil",
  16: "Tower",
  17: "Star",
  18: "Moon",
  19: "Sun",
  20: "Judgement",
  21: "World",
  22: "Fool",
};

export function partnerArchetype(n: number): string {
  return PARTNER_ARCHETYPES[n] || `Energy ${n}`;
}
