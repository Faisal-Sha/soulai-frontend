import { whoAmIData, myStrengthsData, myIntellectData, energySourceData, selfManifestationData, weaknessesData, lifePurposeData } from './sectors/identity.ru';
import { healthSectorData } from './sectors/health.ru';
import { forecastSectorData } from './sectors/forecast.ru';
import {
    financeExpansionSector,
    financeChannelSector,
    financeProsperitySector,
    financeBlocksSector,
    financeBalanceSector,
} from './sectors/finance.ru';
import { relationshipsSectorData } from './sectors/relationships.ru';

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
        identity?: SectorCardContent;
        talents?: SectorCardContent;
        intellect?: SectorCardContent;
        social?: SectorCardContent;
        karma?: SectorCardContent;
        energySource?: SectorCardContent;
        finance?: SectorCardContent;
        financeChannel?: SectorCardContent;
        financeProsperity?: SectorCardContent;
        financeBlocks?: SectorCardContent;
        financeBalance?: SectorCardContent;
        relationships?: SectorCardContent;
        family?: SectorCardContent;
        others?: SectorCardContent;
        lifePurpose?: SectorCardContent;
        ancestral?: SectorCardContent;
    };
}

export const sectorInterpretations: Record<number, EnergySectorInterpretation> = {
    1: {
        number: 1,
        name: "Маг",
        archetype: {
            title: "Архетип Первой Энергии – Маг",
            description: "Маг представляет энергию проявления и личной силы. Это энергия того, кто берет на себя инициативу, создает новые пути и ведет за собой с уверенностью. Люди с этой энергией — прирожденные первопроходцы, которые не боятся начинать что-то с нуля. Они обладают уникальной способностью превращать идеи в реальность с помощью сосредоточенной силы воли и решимости."
        },
        summary: {
            plus: ['МАСТЕРСТВО', 'АВАНТЮРИЗМ', 'ИДЕИ'],
            minus: ['ТЕМНАЯ МАГИЯ', 'ЭГОИЗМ', 'МАНИПУЛЯЦИЯ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[1]] },
            intellect: { identitySections: [myIntellectData[1]] },
            talents: { identitySections: [myStrengthsData[1]] },
            social: { identitySections: [selfManifestationData[1]] },
            karma: { identitySections: [weaknessesData[1]] },
            health: healthSectorData[1],
            forecast: forecastSectorData[1],
            energySource: { identitySections: [energySourceData[1]] },
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
        name: "Верховная Жрица",
        archetype: {
            title: "Архетип Второй Энергии – Верховная Жрица",
            description: "Верховная Жрица воплощает энергию глубокой интуиции, внутренней мудрости и восприимчивости. Это энергия того, кто понимает тонкие течения жизни и может чувствовать то, чего не видят другие. Прирожденные целители и посредники, приносящие баланс и гармонию."
        },
        summary: {
            plus: ['СОСТРАДАНИЕ', 'ЕДИНСТВО', 'ГАРМОНИЯ'],
            minus: ['ГНЕВ', 'ЛИЦЕМЕРИЕ', 'КАПРИЗЫ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[2]] },
            intellect: { identitySections: [myIntellectData[2]] },
            talents: { identitySections: [myStrengthsData[2]] },
            social: { identitySections: [selfManifestationData[2]] },
            karma: { identitySections: [weaknessesData[2]] },
            health: healthSectorData[2],
            forecast: forecastSectorData[2],
            energySource: { identitySections: [energySourceData[2]] },
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
        name: "Императрица",
        archetype: {
            title: "Архетип Третьей Энергии – Императрица",
            description: "Энергия плодородия, изобилия и заботы. Императрица представляет творческую силу природы и способность воплощать вещи в жизнь."
        },
        summary: {
            plus: ['АВТОРИТЕТНОСТЬ', 'ХОЗЯЙСТВЕННОСТЬ', 'ПЛОДОРОДИЕ'],
            minus: ['ВЫСОКОМЕРИЕ', 'РАСПУЩЕННОСТЬ', 'ЖАДНОСТЬ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[3]] },
            intellect: { identitySections: [myIntellectData[3]] },
            talents: { identitySections: [myStrengthsData[3]] },
            social: { identitySections: [selfManifestationData[3]] },
            karma: { identitySections: [weaknessesData[3]] },
            health: healthSectorData[3],
            forecast: forecastSectorData[3],
            energySource: { identitySections: [energySourceData[3]] },
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
        name: "Император",
        archetype: {
            title: "Архетип Четвертой Энергии – Император",
            description: "Структура, авторитет и стратегическое мышление. Император создает порядок из хаоса и строит прочные фундаменты."
        },
        summary: {
            plus: ['АВТОРИТЕТНОСТЬ', 'ХОЗЯЙСТВЕННОСТЬ', 'УМНОЖЕНИЕ'],
            minus: ['ТИРАНИЯ', 'СЛАБОСТЬ', 'ХАОС']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[4]] },
            intellect: { identitySections: [myIntellectData[4]] },
            talents: { identitySections: [myStrengthsData[4]] },
            social: { identitySections: [selfManifestationData[4]] },
            karma: { identitySections: [weaknessesData[4]] },
            health: healthSectorData[4],
            forecast: forecastSectorData[4],
            energySource: { identitySections: [energySourceData[4]] },
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
        name: "Иерофант",
        archetype: {
            title: "Архетип Пятой Энергии – Иерофант",
            description: "Традиции, обучение и духовное руководство. Хранитель мудрости, передающий знания другим."
        },
        summary: {
            plus: ['ОБУЧЕНИЕ', 'ПОРЯДОК', 'СЕМЬЯ'],
            minus: ['ДОГМАТИЗМ', 'УЗКОЛОБОСТЬ', 'ХАОС']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[5]] },
            intellect: { identitySections: [myIntellectData[5]] },
            talents: { identitySections: [myStrengthsData[5]] },
            social: { identitySections: [selfManifestationData[5]] },
            karma: { identitySections: [weaknessesData[5]] },
            health: healthSectorData[5],
            forecast: forecastSectorData[5],
            energySource: { identitySections: [energySourceData[5]] },
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
        name: "Влюбленные",
        archetype: {
            title: "Архетип Шестой Энергии – Влюбленные",
            description: "Выбор, союз и гармония. Энергия значимых отношений и важных жизненных решений. Люди с этой энергией понимают силу связи."
        },
        summary: {
            plus: ['ЛЮБОВЬ', 'ВЫБОР', 'ГАРМОНИЯ'],
            minus: ['НЕРЕШИТЕЛЬНОСТЬ', 'ЗАВИСИМОСТЬ', 'УГОДНИЧЕСТВО']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[6]] },
            intellect: { identitySections: [myIntellectData[6]] },
            talents: { identitySections: [myStrengthsData[6]] },
            social: { identitySections: [selfManifestationData[6]] },
            karma: { identitySections: [weaknessesData[6]] },
            health: healthSectorData[6],
            forecast: forecastSectorData[6],
            energySource: { identitySections: [energySourceData[6]] },
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
        name: "Колесница",
        archetype: {
            title: "Архетип Седьмой Энергии – Колесница",
            description: "Движение, победа и контроль. Энергия решимости и преодоления препятствий с помощью силы воли и сосредоточенного намерения."
        },
        summary: {
            plus: ['ПОБЕДА', 'ДВИЖЕНИЕ', 'КОНТРОЛЬ'],
            minus: ['АГРЕССИЯ', 'ВЫГОРАНИЕ', 'НЕГИБКОСТЬ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[7]] },
            intellect: { identitySections: [myIntellectData[7]] },
            talents: { identitySections: [myStrengthsData[7]] },
            social: { identitySections: [selfManifestationData[7]] },
            karma: { identitySections: [weaknessesData[7]] },
            health: healthSectorData[7],
            forecast: forecastSectorData[7],
            energySource: { identitySections: [energySourceData[7]] },
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
        name: "Справедливость",
        archetype: {
            title: "Архетип Восьмой Энергии – Справедливость",
            description: "Архетип восьмой энергии — Справедливость. Энергия символизирует принцип баланса, последовательности и закономерности, выражает стремление к равновесию и объективности во всех аспектах жизни. Люди, связанные с этой энергией, ищут справедливости как в своих внутренних конфликтах, так и во взаимодействии с другими."
        },
        summary: {
            plus: ['ЛОГИКА', 'СПРАВЕДЛИВОСТЬ', 'ГЛУБИНА'],
            minus: ['ДИСБАЛАНС', 'ОБМАН', 'ЖЕСТОКОСТЬ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[8]] },
            intellect: { identitySections: [myIntellectData[8]] },
            talents: { identitySections: [myStrengthsData[8]] },
            social: { identitySections: [selfManifestationData[8]] },
            karma: { identitySections: [weaknessesData[8]] },
            health: healthSectorData[8],
            forecast: forecastSectorData[8],
            energySource: { identitySections: [energySourceData[8]] },
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
        name: "Отшельник",
        archetype: {
            title: "Архетип Девятой Энергии – Отшельник",
            description: "Мудрость, уединение и самопознание. Энергия интроспекции и внутреннего руководства. Искатели истины, которые находят мудрость в размышлениях."
        },
        summary: {
            plus: ['МУДРОСТЬ', 'УЕДИНЕНИЕ', 'ГЛУБИНА'],
            minus: ['ИЗОЛЯЦИЯ', 'ЗАМКНУТОСТЬ', 'КРИТИКА']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[9]] },
            intellect: { identitySections: [myIntellectData[9]] },
            talents: { identitySections: [myStrengthsData[9]] },
            social: { identitySections: [selfManifestationData[9]] },
            karma: { identitySections: [weaknessesData[9]] },
            health: healthSectorData[9],
            forecast: forecastSectorData[9],
            energySource: { identitySections: [energySourceData[9]] },
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
        name: "Колесо Фортуны",
        archetype: {
            title: "Архетип Десятой Энергии – Колесо Фортуны",
            description: "Циклы, судьба и изменения. Энергия понимания естественных ритмов жизни и следования за волнами удачи."
        },
        summary: {
            plus: ['УДАЧА', 'ПОТОК', 'АДАПТИВНОСТЬ'],
            minus: ['ПАССИВНОСТЬ', 'ФАТАЛИЗМ', 'БЕЗДЕЙСТВИЕ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[10]] },
            intellect: { identitySections: [myIntellectData[10]] },
            talents: { identitySections: [myStrengthsData[10]] },
            social: { identitySections: [selfManifestationData[10]] },
            karma: { identitySections: [weaknessesData[10]] },
            health: healthSectorData[10],
            forecast: forecastSectorData[10],
            energySource: { identitySections: [energySourceData[10]] },
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
        name: "Сила",
        archetype: {
            title: "Архетип Одиннадцатой Энергии – Сила",
            description: "Внутренняя сила, мужество и терпение. Первобытная мощь, направляемая через сострадание и силу воли."
        },
        summary: {
            plus: ['СИЛА', 'МУЖЕСТВО', 'ТЕРПЕНИЕ'],
            minus: ['ДАВЛЕНИЕ', 'ВЫГОРАНИЕ', 'БИТВЫ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[11]] },
            intellect: { identitySections: [myIntellectData[11]] },
            talents: { identitySections: [myStrengthsData[11]] },
            social: { identitySections: [selfManifestationData[11]] },
            karma: { identitySections: [weaknessesData[11]] },
            health: healthSectorData[11],
            forecast: forecastSectorData[11],
            energySource: { identitySections: [energySourceData[11]] },
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
        name: "Повешенный",
        archetype: {
            title: "Архетип Двенадцатой Энергии – Повешенный",
            description: "Жертва, пауза и новый взгляд. Энергия смирения и поиска мудрости в необычных ракурсах."
        },
        summary: {
            plus: ['СЛУЖЕНИЕ', 'НОВЫЙ ВЗГЛЯД', 'ДОБРОТА'],
            minus: ['ЖЕРТВЕННОСТЬ', 'ЗАСТОЙ', 'РOЛЬ ЖЕРТВЫ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[12]] },
            intellect: { identitySections: [myIntellectData[12]] },
            talents: { identitySections: [myStrengthsData[12]] },
            social: { identitySections: [selfManifestationData[12]] },
            karma: { identitySections: [weaknessesData[12]] },
            health: healthSectorData[12],
            forecast: forecastSectorData[12],
            energySource: { identitySections: [energySourceData[12]] },
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
        name: "Смерть",
        archetype: {
            title: "Архетип Тринадцатой Энергии – Смерть",
            description: "Трансформация, завершение и новые начинания. Энергия глубоких перемен и отпускания старого."
        },
        summary: {
            plus: ['ПЕРЕРОЖДЕНИЕ', 'ЭКСТРИМ', 'ПЕРЕМЕНЫ'],
            minus: ['РАЗРУШЕНИЕ', 'СТРАХ', 'ХАОС']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[13]] },
            intellect: { identitySections: [myIntellectData[13]] },
            talents: { identitySections: [myStrengthsData[13]] },
            social: { identitySections: [selfManifestationData[13]] },
            karma: { identitySections: [weaknessesData[13]] },
            health: healthSectorData[13],
            forecast: forecastSectorData[13],
            energySource: { identitySections: [energySourceData[13]] },
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
        name: "Умеренность",
        archetype: {
            title: "Архетип Четырнадцатой Энергии – Умеренность",
            description: "Гармония, баланс и терпение. Алхимик, смешивающий противоположные силы в гармоничное целое."
        },
        summary: {
            plus: ['ГАРМОНИЯ', 'БАЛАНС', 'ИСЦЕЛЕНИЕ'],
            minus: ['УМЕРЕННОСТЬ', 'ОСТОРОЖНОСТЬ', 'БЕЗЛИКОСТЬ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[14]] },
            intellect: { identitySections: [myIntellectData[14]] },
            talents: { identitySections: [myStrengthsData[14]] },
            social: { identitySections: [selfManifestationData[14]] },
            karma: { identitySections: [weaknessesData[14]] },
            health: healthSectorData[14],
            forecast: forecastSectorData[14],
            energySource: { identitySections: [energySourceData[14]] },
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
        name: "Дьявол",
        archetype: {
            title: "Архетип Пятнадцатой Энергии – Дьявол",
            description: "Материализм, страсти и теневое «я». Распознавание привязанностей и мощная магнетическая харизма."
        },
        summary: {
            plus: ['МАГНЕТИЗМ', 'БОГАТСТВО', 'СТРАСТЬ'],
            minus: ['ЖАДНОСТЬ', 'ЗАВИСИМОСТЬ', 'КОНТРОЛЬ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[15]] },
            intellect: { identitySections: [myIntellectData[15]] },
            talents: { identitySections: [myStrengthsData[15]] },
            social: { identitySections: [selfManifestationData[15]] },
            karma: { identitySections: [weaknessesData[15]] },
            health: healthSectorData[15],
            forecast: forecastSectorData[15],
            energySource: { identitySections: [energySourceData[15]] },
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
        name: "Башня",
        archetype: {
            title: "Архетип Шестнадцатой Энергии – Башня",
            description: "Внезапные перемены, откровение и разрушение ложных структур. Освобождающие моменты прорыва."
        },
        summary: {
            plus: ['ВОССТАНОВЛЕНИЕ', 'ДУХОВНОСТЬ', 'СИЛА'],
            minus: ['ХАОС', 'РАЗРУШЕНИЕ', 'АГРЕССИЯ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[16]] },
            intellect: { identitySections: [myIntellectData[16]] },
            talents: { identitySections: [myStrengthsData[16]] },
            social: { identitySections: [selfManifestationData[16]] },
            karma: { identitySections: [weaknessesData[16]] },
            health: healthSectorData[16],
            forecast: forecastSectorData[16],
            energySource: { identitySections: [energySourceData[16]] },
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
        name: "Звезда",
        archetype: {
            title: "Архетип Семнадцатой Энергии – Звезда",
            description: "Архетип Семнадцатой Энергии — Звезда. Человек, реализовавший свои таланты, следующий за своими мечтами, сияющий и привлекающий внимание своим творчеством. Энергия является символом надежды, вдохновения и духовного просветления."
        },
        summary: {
            plus: ['ЯРКОСТЬ', 'ТВОРЧЕСТВО', 'ЧУВСТВИТЕЛЬНОСТЬ'],
            minus: ['ТЩЕСЛАВИЕ', 'НЕРИАЛИЗОВАННОСТЬ', 'ИЛЛЮЗИИ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[17]] },
            intellect: { identitySections: [myIntellectData[17]] },
            talents: { identitySections: [myStrengthsData[17]] },
            social: { identitySections: [selfManifestationData[17]] },
            karma: { identitySections: [weaknessesData[17]] },
            health: healthSectorData[17],
            forecast: forecastSectorData[17],
            energySource: { identitySections: [energySourceData[17]] },
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
        name: "Луна",
        archetype: {
            title: "Архетип Восемнадцатой Энергии – Луна",
            description: "Глубокая интуиция, подсознание и сила мысли. Энергия, связанная с притяжением, тайной и мистикой. Люди с этой энергией — прирожденные манифестаторы."
        },
        summary: {
            plus: ['ГЛУБИНА', 'ИНТУИЦИЯ', 'ПРИТЯЖЕНИЕ'],
            minus: ['СТРАХИ', 'НЕГАТИВ', 'ЗАМКНУТОСТЬ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[18]] },
            intellect: { identitySections: [myIntellectData[18]] },
            talents: { identitySections: [myStrengthsData[18]] },
            social: { identitySections: [selfManifestationData[18]] },
            karma: { identitySections: [weaknessesData[18]] },
            health: healthSectorData[18],
            forecast: forecastSectorData[18],
            energySource: { identitySections: [energySourceData[18]] },
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
        name: "Солнце",
        archetype: {
            title: "Архетип Девятнадцатой Энергии – Солнце",
            description: "Энергия успеха, изобилия и радости. Лидер творческого клуба, несущий тепло и свет многим людям одновременно."
        },
        summary: {
            plus: ['МАСШТАБ', 'ДЕЙСТВИЕ', 'ОПТИМИЗМ'],
            minus: ['ЖЕСТКОСТЬ', 'АПАТИЯ', 'ЖАДНОСТЬ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[19]] },
            intellect: { identitySections: [myIntellectData[19]] },
            talents: { identitySections: [myStrengthsData[19]] },
            social: { identitySections: [selfManifestationData[19]] },
            karma: { identitySections: [weaknessesData[19]] },
            health: healthSectorData[19],
            forecast: forecastSectorData[19],
            energySource: { identitySections: [energySourceData[19]] },
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
        name: "Cуд",
        archetype: {
            title: "Архетип Двадцатой Энергии – Суд",
            description: "Пробуждение, обновление и связь с родом. Способность объединять различные аспекты и помогать другим достигать целостности."
        },
        summary: {
            plus: ['ЦЕЛОСТНОСТЬ', 'РОД', 'ЯСНОСТЬ'],
            minus: ['ПОТЕРЯННОСТЬ', 'ГОРДЫНЯ', 'ОСУЖДЕНИЕ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[20]] },
            intellect: { identitySections: [myIntellectData[20]] },
            talents: { identitySections: [myStrengthsData[20]] },
            social: { identitySections: [selfManifestationData[20]] },
            karma: { identitySections: [weaknessesData[20]] },
            health: healthSectorData[20],
            forecast: forecastSectorData[20],
            energySource: { identitySections: [energySourceData[20]] },
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
        name: "Мир",
        archetype: {
            title: "Архетип Двадцать Первой Энергии – Мир",
            description: "Расширение, глобальные цели и миротворчество. Энергия гражданина мира, который ценит свободу и широкие горизонты."
        },
        summary: {
            plus: ['ГЛОБАЛЬНОСТЬ', 'МИР', 'СВОБОДА'],
            minus: ['УЗКОСТЬ', 'КОНФЛИКТ', 'ГРАНИЦЫ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[21]] },
            intellect: { identitySections: [myIntellectData[21]] },
            talents: { identitySections: [myStrengthsData[21]] },
            social: { identitySections: [selfManifestationData[21]] },
            karma: { identitySections: [weaknessesData[21]] },
            health: healthSectorData[21],
            forecast: forecastSectorData[21],
            energySource: { identitySections: [energySourceData[21]] },
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
        name: "Шут",
        archetype: {
            title: "Архетип Двадцать Второй Энергии – Шут",
            description: "Свобода, спонтанность и новые начинания. Энергия человека, свободного от материальных привязанностей, доверяющего потоку жизни."
        },
        summary: {
            plus: ['СВОБОДА', 'РАДОСТЬ', 'СПОНТАННОСТЬ'],
            minus: ['БЕЗРАССУДСТВО', 'ОГРАНИЧЕНИЕ', 'ДОЛГИ']
        },
        sectors: {
            identity: { identitySections: [whoAmIData[22]] },
            intellect: { identitySections: [myIntellectData[22]] },
            talents: { identitySections: [myStrengthsData[22]] },
            social: { identitySections: [selfManifestationData[22]] },
            karma: { identitySections: [weaknessesData[22]] },
            health: healthSectorData[22],
            forecast: forecastSectorData[22],
            energySource: { identitySections: [energySourceData[22]] },
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
