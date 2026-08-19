import { whoAmIData, myStrengthsData, myIntellectData, selfManifestationData, weaknessesData, energySourceData, lifePurposeData } from './sectors/identity.en';
import { healthSectorData } from './sectors/health.en';
import { forecastSectorData } from './sectors/forecast.en';
import {
    financeExpansionSector,
    financeChannelSector,
    financeProsperitySector,
    financeBlocksSector,
    financeBalanceSector,
} from './sectors/finance.en';
import { relationshipsSectorData } from './sectors/relationships.en';

const lifePurposeSector = (energy: number): SectorCardContent | undefined =>
    lifePurposeData[energy] ? { identitySections: [lifePurposeData[energy]] } : undefined;

export interface SectorCardContent {
    body?: string[];
    characteristics?: string[];
    bullets?: {
        high: string[];
        low: string[];
    };
    subSections?: {
        title: string;
        content: string | string[];
    }[];
    // Enhanced Identity structure
    identitySections?: {
        title: string;
        intro?: string;
        comfortZoneText?: string;
        archetype?: string;
        tabs: {
            id: string;
            label: string;
            keywords?: string;
            intro?: string;
            items?: { label: string }[];
            description?: string;
        }[];
    }[];
}

export interface EnergySectorInterpretation {
    number: number;
    name: string;
    archetype: {
        title: string;
        description: string;
    };
    summary: {
        plus: string[];
        minus: string[];
    };
    sectors: {
        health?: SectorCardContent;
        forecast?: SectorCardContent;
        identity?: SectorCardContent; // "Who am I? / Comfort Zone"
        talents?: SectorCardContent;  // "My strengths"
        intellect?: SectorCardContent; // "My Intellect"
        social?: SectorCardContent;    // "Self-manifestation"
        karma?: SectorCardContent;     // "My weaknesses"
        energySource?: SectorCardContent; // "My energy source"
        finance?: SectorCardContent;           // "Expansion of financial channel" (C1)
        financeChannel?: SectorCardContent;    // "Financial channel" (X2)
        financeProsperity?: SectorCardContent; // "Prosperity energy" (C2)
        financeBlocks?: SectorCardContent;     // "What blocks my finances?" (C)
        financeBalance?: SectorCardContent;    // "Balance between finances and relationships" (X)
        relationships?: SectorCardContent; // "Entrance into relationship channel"
        family?: SectorCardContent;   // "Parent-children relationships"
        others?: SectorCardContent;    // "Relationships with others"
        lifePurpose?: SectorCardContent; // "My life purpose"
        ancestral?: SectorCardContent; // "Ancestral karma"
    };
}

export const sectorInterpretations: Record<number, EnergySectorInterpretation> = {
    1: {
        number: 1,
        name: "The Magician",
        archetype: {
            title: "First Energy Archetype – The Magician",
            description: "You are the Magician, a natural manifestor of reality. This energy grants you the unique ability to turn visionary ideas into tangible results through willpower, focus, and a pioneering spirit."
        },
        summary: {
            plus: ['MASTERY', 'ADVENTURISM', 'IDEAS'],
            minus: ['DARK MAGIC', 'EGOISM', 'MANIPULATION']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[1]] },
            intellect: { identitySections: [myIntellectData[1]] },
            talents: { identitySections: [myStrengthsData[1]] },
            social: { identitySections: [selfManifestationData[1]] },
            karma: { identitySections: [weaknessesData[1]] },
            energySource: { identitySections: [energySourceData[1]] },
            health: healthSectorData[1],
            forecast: forecastSectorData[1],
            finance: financeExpansionSector(1),
            financeChannel: financeChannelSector(1),
            financeProsperity: financeProsperitySector(1),
            financeBlocks: financeBlocksSector(1),
            financeBalance: financeBalanceSector(1),
            relationships: relationshipsSectorData[1],
            lifePurpose: lifePurposeSector(1)
        }
    },
    2: {
        number: 2,
        name: "The High Priestess",
        archetype: {
            title: "Second Energy Archetype – The High Priestess",
            description: "You are the High Priestess, the guardian of secret wisdom and deep intuition. Your power lies in your sensitivity and ability to sense the subtle currents of life, bringing harmony and balance to all you touch."
        },
        summary: {
            plus: ['COMPASSION', 'UNITY', 'HARMONY'],
            minus: ['ANGER', 'HYPOCRISY', 'CAPRICES']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[2]] },
            intellect: { identitySections: [myIntellectData[2]] },
            talents: { identitySections: [myStrengthsData[2]] },
            social: { identitySections: [selfManifestationData[2]] },
            karma: { identitySections: [weaknessesData[2]] },
            energySource: { identitySections: [energySourceData[2]] },
            health: healthSectorData[2],
            forecast: forecastSectorData[2],
            finance: financeExpansionSector(2),
            financeChannel: financeChannelSector(2),
            financeProsperity: financeProsperitySector(2),
            financeBlocks: financeBlocksSector(2),
            financeBalance: financeBalanceSector(2),
            relationships: relationshipsSectorData[2],
            lifePurpose: lifePurposeSector(2)
        }
    },
    3: {
        number: 3,
        name: "The Empress",
        archetype: {
            title: "Third Energy Archetype – The Empress",
            description: "You are the Empress, the source of limitless abundance and creative power. You naturally nurture growth, creating beauty and prosperity in every project and relationship you choose to cultivate."
        },
        summary: {
            plus: ['AUTHORITY', 'HOUSEWIFERY', 'FERTILITY'],
            minus: ['ARROGANCE', 'SLUTTISHNESS', 'STINGINESS']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[3]] },
            intellect: { identitySections: [myIntellectData[3]] },
            talents: { identitySections: [myStrengthsData[3]] },
            social: { identitySections: [selfManifestationData[3]] },
            karma: { identitySections: [weaknessesData[3]] },
            energySource: { identitySections: [energySourceData[3]] },
            health: healthSectorData[3],
            forecast: forecastSectorData[3],
            finance: financeExpansionSector(3),
            financeChannel: financeChannelSector(3),
            financeProsperity: financeProsperitySector(3),
            financeBlocks: financeBlocksSector(3),
            financeBalance: financeBalanceSector(3),
            relationships: relationshipsSectorData[3],
            lifePurpose: lifePurposeSector(3)
        }
    },
    4: {
        number: 4,
        name: "The Emperor",
        archetype: {
            title: "Fourth Energy Archetype – The Emperor",
            description: "You are the Emperor, the architect of stability and strategic order. You possess the authority and discipline to build lasting foundations, turning chaos into a structured and successful reality."
        },
        summary: {
            plus: ['AUTHORITY', 'HOUSEWIFERY', 'MULTIPLYING'],
            minus: ['TYRANNY', 'WEAKNESS', 'CHAOS']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[4]] },
            intellect: { identitySections: [myIntellectData[4]] },
            talents: { identitySections: [myStrengthsData[4]] },
            social: { identitySections: [selfManifestationData[4]] },
            karma: { identitySections: [weaknessesData[4]] },
            energySource: { identitySections: [energySourceData[4]] },
            health: healthSectorData[4],
            forecast: forecastSectorData[4],
            finance: financeExpansionSector(4),
            financeChannel: financeChannelSector(4),
            financeProsperity: financeProsperitySector(4),
            financeBlocks: financeBlocksSector(4),
            financeBalance: financeBalanceSector(4),
            relationships: relationshipsSectorData[4],
            lifePurpose: lifePurposeSector(4)
        }
    },
    5: {
        number: 5,
        name: "The Hierophant",
        archetype: {
            title: "Fifth Energy Archetype – The Hierophant",
            description: "You are the Hierophant, a wise teacher and keeper of sacred knowledge. You guide others through tradition and spiritual insight, helping them find their own path while mastering your own."
        },
        summary: {
            plus: ['TEACHING', 'ORDER', 'FAMILY'],
            minus: ['DOGMATISM', 'NARROW-MINDEDNESS', 'CHAOS']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[5]] },
            intellect: { identitySections: [myIntellectData[5]] },
            talents: { identitySections: [myStrengthsData[5]] },
            social: { identitySections: [selfManifestationData[5]] },
            karma: { identitySections: [weaknessesData[5]] },
            energySource: { identitySections: [energySourceData[5]] },
            health: healthSectorData[5],
            forecast: forecastSectorData[5],
            finance: financeExpansionSector(5),
            financeChannel: financeChannelSector(5),
            financeProsperity: financeProsperitySector(5),
            financeBlocks: financeBlocksSector(5),
            financeBalance: financeBalanceSector(5),
            relationships: relationshipsSectorData[5],
            lifePurpose: lifePurposeSector(5)
        }
    },
    6: {
        number: 6,
        name: "The Lovers",
        archetype: {
            title: "Sixth Energy Archetype – The Lovers",
            description: "You are the Lover, defined by the power of choice and deep connection. You create harmony and union in your life by aligning your relationships with your truest values and authentic self."
        },
        summary: {
            plus: ['LOVE', 'CHOICE', 'HARMONY'],
            minus: ['INDECISION', 'DEPENDENCY', 'PLEASING']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[6]] },
            intellect: { identitySections: [myIntellectData[6]] },
            talents: { identitySections: [myStrengthsData[6]] },
            social: { identitySections: [selfManifestationData[6]] },
            karma: { identitySections: [weaknessesData[6]] },
            energySource: { identitySections: [energySourceData[6]] },
            health: healthSectorData[6],
            forecast: forecastSectorData[6],
            finance: financeExpansionSector(6),
            financeChannel: financeChannelSector(6),
            financeProsperity: financeProsperitySector(6),
            financeBlocks: financeBlocksSector(6),
            financeBalance: financeBalanceSector(6),
            relationships: relationshipsSectorData[6],
            lifePurpose: lifePurposeSector(6)
        }
    },
    7: {
        number: 7,
        name: "The Chariot",
        archetype: {
            title: "Seventh Energy Archetype – The Chariot",
            description: "You are the Charioteer, a victorious achiever driven by invincible willpower. You harness opposing forces with focused determination, overcoming every obstacle to reach your highest goals."
        },
        summary: {
            plus: ['VICTORY', 'MOVEMENT', 'CONTROL'],
            minus: ['AGGRESSION', 'BURNOUT', 'INFLEXIBILITY']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[7]] },
            intellect: { identitySections: [myIntellectData[7]] },
            talents: { identitySections: [myStrengthsData[7]] },
            social: { identitySections: [selfManifestationData[7]] },
            karma: { identitySections: [weaknessesData[7]] },
            energySource: { identitySections: [energySourceData[7]] },
            health: healthSectorData[7],
            forecast: forecastSectorData[7],
            finance: financeExpansionSector(7),
            financeChannel: financeChannelSector(7),
            financeProsperity: financeProsperitySector(7),
            financeBlocks: financeBlocksSector(7),
            financeBalance: financeBalanceSector(7),
            relationships: relationshipsSectorData[7],
            lifePurpose: lifePurposeSector(7)
        }
    },
    8: {
        number: 8,
        name: "Justice",
        archetype: {
            title: "Eighth Energy Archetype – Justice",
            description: "You are the embodiment of Justice, a seeker of truth and karmic balance. You understand the laws of cause and effect, acting with integrity and responsibility to create fairness in your world."
        },
        summary: {
            plus: ['LOGIC', 'FAIRNESS', 'DEPTH'],
            minus: ['IMBALANCE', 'DECEIT', 'CRUELTY']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[8]] },
            intellect: { identitySections: [myIntellectData[8]] },
            talents: { identitySections: [myStrengthsData[8]] },
            social: { identitySections: [selfManifestationData[8]] },
            karma: { identitySections: [weaknessesData[8]] },
            energySource: { identitySections: [energySourceData[8]] },
            health: healthSectorData[8],
            forecast: forecastSectorData[8],
            finance: financeExpansionSector(8),
            financeChannel: financeChannelSector(8),
            financeProsperity: financeProsperitySector(8),
            financeBlocks: financeBlocksSector(8),
            financeBalance: financeBalanceSector(8),
            relationships: relationshipsSectorData[8],
            lifePurpose: lifePurposeSector(8)
        }
    },
    9: {
        number: 9,
        name: "The Hermit",
        archetype: {
            title: "Ninth Energy Archetype – The Hermit",
            description: "You are the Hermit, a wise philosopher guided by inner light. You find profound truth in solitude and introspection, serving as a beacon of deep self-knowledge and guidance for those who seek it."
        },
        summary: {
            plus: ['WISDOM', 'SOLITUDE', 'DEPTH'],
            minus: ['ISOLATION', 'WITHDRAWAL', 'CRITICISM']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[9]] },
            intellect: { identitySections: [myIntellectData[9]] },
            talents: { identitySections: [myStrengthsData[9]] },
            social: { identitySections: [selfManifestationData[9]] },
            karma: { identitySections: [weaknessesData[9]] },
            energySource: { identitySections: [energySourceData[9]] },
            health: healthSectorData[9],
            forecast: forecastSectorData[9],
            finance: financeExpansionSector(9),
            financeChannel: financeChannelSector(9),
            financeProsperity: financeProsperitySector(9),
            financeBlocks: financeBlocksSector(9),
            financeBalance: financeBalanceSector(9),
            relationships: relationshipsSectorData[9],
            lifePurpose: lifePurposeSector(9)
        }
    },
    10: {
        number: 10,
        name: "Wheel of Fortune",
        archetype: {
            title: "Tenth Energy Archetype – Wheel of Fortune",
            description: "You are a master of the Wheel of Fortune, dancing with the cycles of destiny. You adapt gracefully to life's changes, knowing exactly when to seize the lucky opportunities that flow your way."
        },
        summary: {
            plus: ['LUCK', 'FLOW', 'ADAPTABILITY'],
            minus: ['PASSIVITY', 'FATALISM', 'DRIFTING']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[10]] },
            intellect: { identitySections: [myIntellectData[10]] },
            talents: { identitySections: [myStrengthsData[10]] },
            social: { identitySections: [selfManifestationData[10]] },
            karma: { identitySections: [weaknessesData[10]] },
            energySource: { identitySections: [energySourceData[10]] },
            health: healthSectorData[10],
            forecast: forecastSectorData[10],
            finance: financeExpansionSector(10),
            financeChannel: financeChannelSector(10),
            financeProsperity: financeProsperitySector(10),
            financeBlocks: financeBlocksSector(10),
            financeBalance: financeBalanceSector(10),
            relationships: relationshipsSectorData[10],
            lifePurpose: lifePurposeSector(10)
        }
    },
    11: {
        number: 11,
        name: "Strength",
        archetype: {
            title: "Eleventh Energy Archetype – Strength",
            description: "You possess the Strength of a gentle conqueror. Your power comes from inner courage and a compassionate heart, allowing you to master your instincts and overcome challenges with patient resilience."
        },
        summary: {
            plus: ['STRENGTH', 'COURAGE', 'PATIENCE'],
            minus: ['FORCE', 'BURNOUT', 'BATTLES']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[11]] },
            intellect: { identitySections: [myIntellectData[11]] },
            talents: { identitySections: [myStrengthsData[11]] },
            social: { identitySections: [selfManifestationData[11]] },
            karma: { identitySections: [weaknessesData[11]] },
            energySource: { identitySections: [energySourceData[11]] },
            health: healthSectorData[11],
            forecast: forecastSectorData[11],
            finance: financeExpansionSector(11),
            financeChannel: financeChannelSector(11),
            financeProsperity: financeProsperitySector(11),
            financeBlocks: financeBlocksSector(11),
            financeBalance: financeBalanceSector(11),
            relationships: relationshipsSectorData[11],
            lifePurpose: lifePurposeSector(11)
        }
    },
    12: {
        number: 12,
        name: "The Hanged Man",
        archetype: {
            title: "Twelfth Energy Archetype – The Hanged Man",
            description: "You are the Hanged Man, a visionary who finds wisdom through surrender. By pausing and looking at life from an unusual perspective, you gain the profound insights that others miss."
        },
        summary: {
            plus: ['SERVICE', 'NEW ANGLE', 'KINDNESS'],
            minus: ['MARTYRDOM', 'STUCK', 'VICTIMHOOD']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[12]] },
            intellect: { identitySections: [myIntellectData[12]] },
            talents: { identitySections: [myStrengthsData[12]] },
            social: { identitySections: [selfManifestationData[12]] },
            karma: { identitySections: [weaknessesData[12]] },
            energySource: { identitySections: [energySourceData[12]] },
            health: healthSectorData[12],
            forecast: forecastSectorData[12],
            finance: financeExpansionSector(12),
            financeChannel: financeChannelSector(12),
            financeProsperity: financeProsperitySector(12),
            financeBlocks: financeBlocksSector(12),
            financeBalance: financeBalanceSector(12),
            relationships: relationshipsSectorData[12],
            lifePurpose: lifePurposeSector(12)
        }
    },
    13: {
        number: 13,
        name: "Death",
        archetype: {
            title: "Thirteenth Energy Archetype – Death",
            description: "You are the master of Transformation, the phoenix who rises from the ashes. You navigate endings with grace, knowing that every closure is a sacred gateway to a powerful new beginning."
        },
        summary: {
            plus: ['REBIRTH', 'EXTREME', 'CHANGE'],
            minus: ['DESTRUCTION', 'FEAR', 'CHAOS']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[13]] },
            intellect: { identitySections: [myIntellectData[13]] },
            talents: { identitySections: [myStrengthsData[13]] },
            social: { identitySections: [selfManifestationData[13]] },
            karma: { identitySections: [weaknessesData[13]] },
            energySource: { identitySections: [energySourceData[13]] },
            health: healthSectorData[13],
            forecast: forecastSectorData[13],
            finance: financeExpansionSector(13),
            financeChannel: financeChannelSector(13),
            financeProsperity: financeProsperitySector(13),
            financeBlocks: financeBlocksSector(13),
            financeBalance: financeBalanceSector(13),
            relationships: relationshipsSectorData[13],
            lifePurpose: lifePurposeSector(13)
        }
    },
    14: {
        number: 14,
        name: "Temperance",
        archetype: {
            title: "Fourteenth Energy Archetype – Temperance",
            description: "You are the Alchemist of Temperance, creating perfect harmony from discord. You blend different parts of life with patience and moderation, bringing a healing and balanced presence."
        },
        summary: {
            plus: ['HARMONY', 'BALANCE', 'HEALING'],
            minus: ['MODERATION', 'CAUTION', 'BLANDNESS']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[14]] },
            intellect: { identitySections: [myIntellectData[14]] },
            talents: { identitySections: [myStrengthsData[14]] },
            social: { identitySections: [selfManifestationData[14]] },
            karma: { identitySections: [weaknessesData[14]] },
            energySource: { identitySections: [energySourceData[14]] },
            health: healthSectorData[14],
            forecast: forecastSectorData[14],
            finance: financeExpansionSector(14),
            financeChannel: financeChannelSector(14),
            financeProsperity: financeProsperitySector(14),
            financeBlocks: financeBlocksSector(14),
            financeBalance: financeBalanceSector(14),
            relationships: relationshipsSectorData[14],
            lifePurpose: lifePurposeSector(14)
        }
    },
    15: {
        number: 15,
        name: "The Devil",
        archetype: {
            title: "Fifteenth Energy Archetype – The Devil",
            description: "You possess the magnetic charisma of the Devil's highest path. You are ambitious and success-oriented, learning to master your deepest desires and use your power for liberation and growth."
        },
        summary: {
            plus: ['MAGNETISM', 'WEALTH', 'PASSION'],
            minus: ['GREED', 'ADDICTION', 'CONTROL']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[15]] },
            intellect: { identitySections: [myIntellectData[15]] },
            talents: { identitySections: [myStrengthsData[15]] },
            social: { identitySections: [selfManifestationData[15]] },
            karma: { identitySections: [weaknessesData[15]] },
            energySource: { identitySections: [energySourceData[15]] },
            health: healthSectorData[15],
            forecast: forecastSectorData[15],
            finance: financeExpansionSector(15),
            financeChannel: financeChannelSector(15),
            financeProsperity: financeProsperitySector(15),
            financeBlocks: financeBlocksSector(15),
            financeBalance: financeBalanceSector(15),
            relationships: relationshipsSectorData[15],
            lifePurpose: lifePurposeSector(15)
        }
    },
    16: {
        number: 16,
        name: "The Tower",
        archetype: {
            title: "Sixteenth Energy Archetype – The Tower",
            description: "You are the bringer of breakthrough in the Tower. You have the courage to let false structures crumble, revealing the absolute truth and rebuilding your life on a foundation of genuine power."
        },
        summary: {
            plus: ['REBUILDING', 'SPIRITUALITY', 'POWER'],
            minus: ['CHAOS', 'DESTRUCTION', 'AGGRESSION']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[16]] },
            intellect: { identitySections: [myIntellectData[16]] },
            talents: { identitySections: [myStrengthsData[16]] },
            social: { identitySections: [selfManifestationData[16]] },
            karma: { identitySections: [weaknessesData[16]] },
            energySource: { identitySections: [energySourceData[16]] },
            health: healthSectorData[16],
            forecast: forecastSectorData[16],
            finance: financeExpansionSector(16),
            financeChannel: financeChannelSector(16),
            financeProsperity: financeProsperitySector(16),
            financeBlocks: financeBlocksSector(16),
            financeBalance: financeBalanceSector(16),
            relationships: relationshipsSectorData[16],
            lifePurpose: lifePurposeSector(16)
        }
    },
    17: {
        number: 17,
        name: "The Star",
        archetype: {
            title: "Seventeenth Energy Archetype – The Star",
            description: "You are the Star, an inspiring beacon of hope and creativity. You follow your highest dreams with faith, naturally healing others and sharing your unique light with the entire world."
        },
        summary: {
            plus: ['BRIGHTNESS', 'CREATIVITY', 'SENSITIVITY'],
            minus: ['VANITY', 'UNREALIZATION', 'ILLUSIONS']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[17]] },
            intellect: { identitySections: [myIntellectData[17]] },
            talents: { identitySections: [myStrengthsData[17]] },
            social: { identitySections: [selfManifestationData[17]] },
            karma: { identitySections: [weaknessesData[17]] },
            energySource: { identitySections: [energySourceData[17]] },
            health: healthSectorData[17],
            forecast: forecastSectorData[17],
            finance: financeExpansionSector(17),
            financeChannel: financeChannelSector(17),
            financeProsperity: financeProsperitySector(17),
            financeBlocks: financeBlocksSector(17),
            financeBalance: financeBalanceSector(17),
            relationships: relationshipsSectorData[17],
            lifePurpose: lifePurposeSector(17)
        }
    },
    18: {
        number: 18,
        name: "The Moon",
        archetype: {
            title: "Eighteenth Energy Archetype – The Moon",
            description: "You are a master of the Moon's mystical depths. Guided by a powerful intuition, you navigate the subconscious and the realm of dreams to manifest your reality beyond all illusions."
        },
        summary: {
            plus: ['DEPTH', 'INTUITION', 'ATTRACTION'],
            minus: ['FEARS', 'NEGATIVITY', 'WITHDRAWAL']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[18]] },
            intellect: { identitySections: [myIntellectData[18]] },
            talents: { identitySections: [myStrengthsData[18]] },
            social: { identitySections: [selfManifestationData[18]] },
            karma: { identitySections: [weaknessesData[18]] },
            energySource: { identitySections: [energySourceData[18]] },
            health: healthSectorData[18],
            forecast: forecastSectorData[18],
            finance: financeExpansionSector(18),
            financeChannel: financeChannelSector(18),
            financeProsperity: financeProsperitySector(18),
            financeBlocks: financeBlocksSector(18),
            financeBalance: financeBalanceSector(18),
            relationships: relationshipsSectorData[18],
            lifePurpose: lifePurposeSector(18)
        }
    },
    19: {
        number: 19,
        name: "The Sun",
        archetype: {
            title: "Nineteenth Energy Archetype – The Sun",
            description: "You are the Sun, a radiant source of joy and success. You bring warmth, vitality, and abundance to everyone you meet, achieving greatness through your authentic and optimistic spirit."
        },
        summary: {
            plus: ['SCALE', 'ACTION', 'OPTIMISM'],
            minus: ['HARSHNESS', 'APATHY', 'GREED']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[19]] },
            intellect: { identitySections: [myIntellectData[19]] },
            talents: { identitySections: [myStrengthsData[19]] },
            social: { identitySections: [selfManifestationData[19]] },
            karma: { identitySections: [weaknessesData[19]] },
            energySource: { identitySections: [energySourceData[19]] },
            health: healthSectorData[19],
            forecast: forecastSectorData[19],
            finance: financeExpansionSector(19),
            financeChannel: financeChannelSector(19),
            financeProsperity: financeProsperitySector(19),
            financeBlocks: financeBlocksSector(19),
            financeBalance: financeBalanceSector(19),
            relationships: relationshipsSectorData[19],
            lifePurpose: lifePurposeSector(19)
        }
    },
    20: {
        number: 20,
        name: "Judgement",
        archetype: {
            title: "Twentieth Energy Archetype – Judgement",
            description: "You are answering the sacred call of Judgement. You experience profound awakening and renewal, liberating yourself from the past to step fully into your true life mission."
        },
        summary: {
            plus: ['WHOLENESS', 'LINEAGE', 'CLARITY'],
            minus: ['LOSTNESS', 'PRIDE', 'JUDGMENT']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[20]] },
            intellect: { identitySections: [myIntellectData[20]] },
            talents: { identitySections: [myStrengthsData[20]] },
            social: { identitySections: [selfManifestationData[20]] },
            karma: { identitySections: [weaknessesData[20]] },
            energySource: { identitySections: [energySourceData[20]] },
            health: healthSectorData[20],
            forecast: forecastSectorData[20],
            finance: financeExpansionSector(20),
            financeChannel: financeChannelSector(20),
            financeProsperity: financeProsperitySector(20),
            financeBlocks: financeBlocksSector(20),
            financeBalance: financeBalanceSector(20),
            relationships: relationshipsSectorData[20],
            lifePurpose: lifePurposeSector(20)
        }
    },
    21: {
        number: 21,
        name: "The World",
        archetype: {
            title: "Twenty-first Energy Archetype – The World",
            description: "You are the citizen of the World, expanding your horizons to reach global fulfillment. You integrate all your lessons into wholeness, achieving complete freedom and universal harmony."
        },
        summary: {
            plus: ['GLOBAL', 'PEACE', 'FREEDOM'],
            minus: ['NARROWNESS', 'CONFLICT', 'LIMITS']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[21]] },
            intellect: { identitySections: [myIntellectData[21]] },
            talents: { identitySections: [myStrengthsData[21]] },
            social: { identitySections: [selfManifestationData[21]] },
            karma: { identitySections: [weaknessesData[21]] },
            energySource: { identitySections: [energySourceData[21]] },
            health: healthSectorData[21],
            forecast: forecastSectorData[21],
            finance: financeExpansionSector(21),
            financeChannel: financeChannelSector(21),
            financeProsperity: financeProsperitySector(21),
            financeBlocks: financeBlocksSector(21),
            financeBalance: financeBalanceSector(21),
            relationships: relationshipsSectorData[21],
            lifePurpose: lifePurposeSector(21)
        }
    },
    22: {
        number: 22,
        name: "The Fool",
        archetype: {
            title: "Twenty-second Energy Archetype – The Fool",
            description: "You are the Fool, a brave soul embarking on a journey of infinite potential. You trust life completely, finding freedom and joy in every spontaneous step into the unknown."
        },
        summary: {
            plus: ['FREEDOM', 'JOY', 'SPONTANEITY'],
            minus: ['RECKLESSNESS', 'RESTRICTION', 'DEBT']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[22]] },
            intellect: { identitySections: [myIntellectData[22]] },
            talents: { identitySections: [myStrengthsData[22]] },
            social: { identitySections: [selfManifestationData[22]] },
            karma: { identitySections: [weaknessesData[22]] },
            energySource: { identitySections: [energySourceData[22]] },
            health: healthSectorData[22],
            forecast: forecastSectorData[22],
            finance: financeExpansionSector(22),
            financeChannel: financeChannelSector(22),
            financeProsperity: financeProsperitySector(22),
            financeBlocks: financeBlocksSector(22),
            financeBalance: financeBalanceSector(22),
            relationships: relationshipsSectorData[22],
            lifePurpose: lifePurposeSector(22)
        }
    },
};

