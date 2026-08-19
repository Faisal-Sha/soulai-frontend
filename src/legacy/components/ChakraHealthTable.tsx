import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Layers, Activity, Zap, Scale, Sigma, Sparkles, Info } from 'lucide-react';
import { ChakraIcon } from './ChakraIcon';
import { EnergyDetailModal } from './EnergyDetailModal';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

interface ChakraHealthTableProps {
    matrix: MatrixValues;
    className?: string;
    isCompatibility?: boolean;
}

interface ChakraRow {
    id: string;
    name: string;
    description: string;
    color: string;
    borderColor: string;
    rowBg: string;
    phys: keyof MatrixValues;
    energy: keyof MatrixValues;
    balance: keyof MatrixValues;
    textColor?: string;
    popupContent?: React.ReactNode;
}

export const ChakraHealthTable: React.FC<ChakraHealthTableProps> = ({ matrix, className, isCompatibility = false }) => {
    const { t, language } = useLanguage();
    const [selectedEnergy, setSelectedEnergy] = useState<{ number: number; label: string; color: string } | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, label: string, color: string) => {
        setSelectedEnergy({ number: energyNumber, label, color });
        setIsModalOpen(true);
    };

    const chakraNames = {
        en: {
            sahasrara: { name: 'Sahasrara', desc: 'Connection with the Divine. Top of the head.' },
            ajna: { name: 'Ajna', desc: 'Thinking. Middle part of the head.' },
            vishuddha: { name: 'Vishuddha', desc: 'Expression. Neck.' },
            anahata: { name: 'Anahata', desc: 'Relationships with people. Chest.' },
            manipura: { name: 'Manipura', desc: 'Willpower. Upper abdomen.' },
            svadhisthana: { name: 'Svadhisthana', desc: 'Desires. Lower abdomen.' },
            muladhara: { name: 'Muladhara', desc: 'Safety. Lower part of the body.' }
        },
        ru: {
            sahasrara: { name: 'Сахасрара', desc: 'Связь с Божественным. Верхняя часть головы.' },
            ajna: { name: 'Аджна', desc: 'Мышление. Средняя часть головы.' },
            vishuddha: { name: 'Вишуддха', desc: 'Самовыражение. Шея.' },
            anahata: { name: 'Анахата', desc: 'Отношения с людьми. Грудь.' },
            manipura: { name: 'Манипура', desc: 'Сила воли. Верхняя часть живота.' },
            svadhisthana: { name: 'Свадхистхана', desc: 'Желания. Нижняя часть живота.' },
            muladhara: { name: 'Муладхара', desc: 'Безопасность. Нижняя часть тела.' }
        }
    };

    const tc = chakraNames[language];

    const getPopupContent = (id: string) => {
        if (id === 'sahasrara') {
            return language === 'ru' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">{tc.sahasrara.name}</span>Сахасрара — верхняя точка. Это чакра связи с Божественным, чакра интуиции. В теле расположена в области макушки и получает поток сверху. В плюсе проявляется как «помощь свыше», когда обстоятельства складываются как нужно.</p>
                    <p><span className="font-semibold text-purple-300">Сахасрара отвечает за:</span> интуицию, духовность, связь с божественным.</p>
                    <p><span className="font-semibold text-purple-300">Органы, связанные с этой чакрой:</span> головной мозг, волосы, верхняя часть черепа.</p>
                </div>
            ) : (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">Sahasrara</span>The Sahasrara is the top point. It is the chakra of connection with the Divine - the chakra of intuition. It is located at the crown of the head in the body, and it receives the flow from the above. When this energy is manifested in plus, a person may notice "help from above" in their life, when the circumstances unfold as needed.</p>
                    <p><span className="font-semibold text-purple-300">Sahasrara is responsible for:</span> intuition, spirituality, connection with the divine.</p>
                    <p><span className="font-semibold text-purple-300">Organs associated with this chakra:</span> the brain, hair, upper part of the skull.</p>
                </div>
            );
        }
        if (id === 'ajna') {
            return language === 'ru' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">{tc.ajna.name}</span>Чакра Аджна находится в области «третьего глаза». Для её раскрытия нужно быть открытым новому опыту.</p>
                    <p><span className="font-semibold text-blue-400">Отвечает за:</span> мышление, тип мышления, видение, ограниченность/безграничность, принятие решений, интуицию. Проблемы возникают из‑за ограниченного мышления, нежелания принимать новое и незнакомое.</p>
                    <p><span className="font-semibold text-blue-400">Органы, связанные с этой чакрой:</span> затылочная и височная доли мозга, глаза, уши, нос, лицо, верхняя челюсть, верхние зубы, зрительный нерв, кора головного мозга.</p>
                </div>
            ) : (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">Ajna</span>The Ajna chakra is located in the area of the "third eye." To open it, one must be open to new experiences.</p>
                    <p><span className="font-semibold text-blue-400">It is responsible for:</span> thinking, type of thinking, vision, limitation/unlimitedness, decision-making, intuition. Issues with the Ajna chakra arise from limited thinking, unwillingness to accept the new, the unfamiliar.</p>
                    <p><span className="font-semibold text-blue-400">Organs associated with this chakra:</span> occipital and temporal lobes of the brain, eyes, ears, nose, face, upper jaw, upper teeth, optic nerve, cerebral cortex.</p>
                </div>
            );
        }
        if (id === 'vishuddha') {
            return language === 'ru' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">{tc.vishuddha.name}</span>Вишуддха — самая понятная чакра. Расположена в области горла и щитовидной железы.</p>
                    <p><span className="font-semibold text-cyan-400">Отвечает за:</span> самовыражение — что и как вы говорите; проявленность; молчание/речь (говорите ли вы то, что хотите сказать, или умалчиваете); правду/ложь (говорите ли правду или лжёте). Проблемы часто связаны с невысказанностью, незавершённой или непроявленной речью, а также с ложью.</p>
                    <p><span className="font-semibold text-cyan-400">Органы, связанные с этой чакрой:</span> щитовидная железа, трахея, бронхи, горло, голосовые связки, плечи, руки, шейные позвонки, нижняя челюсть, нижние зубы.</p>
                </div>
            ) : (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">Vishuddha</span>Vissudha is the easiest chakra to understand. It is located in the area of the throat/thyroid gland.</p>
                    <p><span className="font-semibold text-cyan-400">Vissudha is responsible for:</span> self-expression: what and how you speak, overall expression, silence/speech (whether you say what you want to say or remaining silent), truth/falsehood (whether you speak the truth or lie). Problems with Vissudha are often associated with unspoken thoughts, incomplete expression, unmanifested expression, or falsehood.</p>
                    <p><span className="font-semibold text-cyan-400">Organs associated with this chakra:</span> thyroid gland, trachea, bronchi, throat, vocal cords, shoulders, arms, cervical vertebrae, lower jaw, lower teeth.</p>
                </div>
            );
        }
        if (id === 'anahata') {
            return language === 'ru' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">{tc.anahata.name}</span>Сердечная чакра, Анахата, расположена примерно на уровне лёгких и сердца. Отвечает за отношения с людьми и выражение любви: к себе, к миру, к другим.</p>
                    <p><span className="font-semibold text-green-500">Анахата блокируется, когда:</span> нет любви к себе и к другим, когда есть обиды. Поэтому при трудностях в сердечной чакре важно обратить внимание на проявления любви к себе и к окружающему миру.</p>
                    <p><span className="font-semibold text-green-500">Органы, относящиеся к этой чакре:</span> сердце, кровеносная система, органы дыхания, лёгкие, бронхи, грудной отдел позвоночника, рёбра, лопаточная область спины, грудная клетка.</p>
                </div>
            ) : (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">Anahata</span>The Heart Chakra, or Anahata, is located approximately at the level of the lungs/heart. This chakra is responsible for relationships with people and the expression of love: love for oneself, love for the world, love for others.</p>
                    <p><span className="font-semibold text-green-500">Anahata is blocked when:</span> there is a lack of self-love and love for others, when there are grudges. Therefore, when problems arise in the heart chakra, it is necessary to consider the manifestations of love to yourself and to surrounding world.</p>
                    <p><span className="font-semibold text-green-500">Organs that fall within this chakra:</span> heart, circulatory system, respiratory organs, lungs, bronchi, thoracic spine, ribs, scapular region of the back, chest.</p>
                </div>
            );
        }
        if (id === 'manipura') {
            return language === 'ru' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">{tc.manipura.name}</span>В теле расположена в центре, в области солнечного сплетения.</p>
                    <p><span className="font-semibold text-yellow-400">Отвечает за:</span> силу воли, желание проявлять свою волю и влиять. Манипура проявляется, когда воля выражена, а намерение реализовано.</p>
                    <p><span className="font-semibold text-yellow-400">Органы, связанные с этой чакрой:</span> желудочно‑кишечный тракт, органы брюшной полости, поджелудочная железа, селезёнка, печень, жёлчный пузырь, тонкий кишечник.</p>
                </div>
            ) : (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">Manipura</span>In the body, Manipura is located "in the center," in the area of the solar plexus.</p>
                    <p><span className="font-semibold text-yellow-400">Responsible for:</span> willpower, the desire to express one's will, and the desire to influence. Manipura is a more "human" chakra than the previous two. Manipura is manifested when willpower is expressed, not suppressed, and when will/intention is realised.</p>
                    <p><span className="font-semibold text-yellow-400">Organs associated with this chakra:</span> gastrointestinal tract, abdominal organs, pancreas, spleen, liver, gallbladder, small intestine.</p>
                </div>
            );
        }
        if (id === 'svadhisthana') {
            return language === 'ru' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">{tc.svadhisthana.name}</span>В теле расположена в области репродуктивных органов и немного выше (на уровне яичников у женщин и мочевого пузыря у мужчин).</p>
                    <p><span className="font-semibold text-orange-400">Отвечает за:</span> сексуальность, материальные желания, эмоции, развлечения и удовольствие от еды.</p>
                    <p>В матрице находится на входах в канал отношений и финансовый канал, то есть у входа в линию процветания. Это проблемная зона матрицы, так как трудности часто наблюдаются именно в материальной и сексуальной сферах. Деньги и сексуальная энергия — одного типа. Свадхистхана работает корректно, когда у человека всё в порядке с деньгами (может позволить себе желаемое) и с сексуальностью (чувствует себя желанным или желанной).</p>
                    <p><span className="font-semibold text-orange-400">Органы, связанные с этой чакрой:</span> мочеполовая система, нижние конечности, толстый кишечник, предстательная железа у мужчин, поясничный отдел позвоночника.</p>
                </div>
            ) : (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">Svadhisthana</span>In the body, Svadhisthana is located in the area of the reproductive organs and slightly above (at the level of the ovaries in women and the level of the bladder in men).</p>
                    <p><span className="font-semibold text-orange-400">Responsible for:</span> sexuality, material desires, emotions, entertainment, and pleasure from food.</p>
                    <p>In the matrix, Svadhisthana is located at the entry points into the relationship channel and the financial channel, meaning it is located at the entrance to the line of prosperity. It's well reflected that this chakra is in the "problematic zone" of the matrix because issues are often observed in the material and sexual aspects of people's lives. Money and sexual energy are of the same type. Svadhisthana will function correctly when everything is in order for a person with money (can buy what they want) and sexuality (feeling desired or desirable).</p>
                    <p><span className="font-semibold text-orange-400">Organs associated with this chakra:</span> urogenital system, lower limbs, large intestine, prostate gland in men, and the lumbar region of the spinal column.</p>
                </div>
            );
        }
        if (id === 'muladhara') {
            return language === 'ru' ? (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">{tc.muladhara.name}</span>В матрице Муладхара расположена в точках Цели Души и Главного урока. В теле Муладхара находится на уровне таза — если сесть на пол в позе лотоса, эта чакра коснётся земли. Это самая проблемная точка матрицы, самая базовая.</p>
                    <p><span className="font-semibold text-red-500">Отвечает за:</span> заземление: базовые потребности, страхи, выживание, безопасность, нежелание вступать во взаимодействие с миром.</p>
                    <p>Муладхара получает поток снизу, от земли. Проявляется, когда человек чувствует себя в безопасности, когда базовые потребности удовлетворены и реализованы.</p>
                    <p><span className="font-semibold text-red-500">Органы, связанные с этой чакрой:</span> анус, крестец, мочеполовая система.</p>
                </div>
            ) : (
                <div className="space-y-3 text-xs leading-relaxed">
                    <p><span className="font-bold text-base block mb-1">Muladhara</span>In the matrix, the Muladhara is located at the points of the Soul Purpose and the Main Learning Curve. In the body, the Muladhara is located at the level of the pelvis - if you sit on the floor in a lotus position, this chakra will touch the ground. It's the most problematic point in the matrix, the most basic.</p>
                    <p><span className="font-semibold text-red-500">Responsible for:</span> grounding: basic needs, fears, survival, security, reluctance to engage with the world.</p>
                    <p>The Muladhara receives the energy flow from the below, from the earth. It is manifested when a person feels safe, when basic needs are met and realised.</p>
                    <p><span className="font-semibold text-red-500">Organs associated with this chakra:</span> anus, sacrum, urogenital system.</p>
                </div>
            );
        }
        return null;
    };

    const chakras: ChakraRow[] = ([
        {
            id: 'sahasrara',
            name: tc.sahasrara.name,
            description: tc.sahasrara.desc,
            color: 'bg-purple-500',
            borderColor: 'border-purple-500',
            rowBg: 'bg-purple-50 dark:bg-white/5',
            textColor: 'text-purple-700 dark:text-purple-500',
            phys: 'a',
            energy: 'b',
            balance: 'l',
            popupContent: getPopupContent('sahasrara')
        },
        {
            id: 'ajna',
            name: tc.ajna.name,
            description: tc.ajna.desc,
            color: 'bg-blue-600',
            borderColor: 'border-blue-600',
            rowBg: 'bg-blue-50/50 dark:bg-black/20',
            textColor: 'text-blue-800 dark:text-blue-600',
            phys: 'a2',
            energy: 'b2',
            balance: 'l1',
            popupContent: getPopupContent('ajna')
        },
        {
            id: 'vishuddha',
            name: tc.vishuddha.name,
            description: tc.vishuddha.desc,
            color: 'bg-cyan-400',
            borderColor: 'border-cyan-400',
            rowBg: 'bg-cyan-50 dark:bg-white/5',
            textColor: 'text-cyan-700 dark:text-cyan-400',
            phys: 'a1',
            energy: 'b1',
            balance: 'l2',
            popupContent: getPopupContent('vishuddha')
        },
        {
            id: 'anahata',
            name: tc.anahata.name,
            description: tc.anahata.desc,
            color: 'bg-green-500',
            borderColor: 'border-green-500',
            rowBg: 'bg-green-50 dark:bg-black/20',
            textColor: 'text-green-700 dark:text-green-500',
            phys: 'a3',
            energy: 'b3',
            balance: 'l3',
            popupContent: getPopupContent('anahata')
        },
        {
            id: 'manipura',
            name: tc.manipura.name,
            description: tc.manipura.desc,
            color: 'bg-yellow-400',
            borderColor: 'border-yellow-400',
            rowBg: 'bg-amber-50 dark:bg-white/5',
            textColor: 'text-amber-700 dark:text-yellow-400',
            phys: 'e',
            energy: 'e',
            balance: 'l4',
            popupContent: getPopupContent('manipura')
        },
        {
            id: 'svadhisthana',
            name: tc.svadhisthana.name,
            description: tc.svadhisthana.desc,
            color: 'bg-orange-400',
            borderColor: 'border-orange-400',
            rowBg: 'bg-orange-50/50 dark:bg-black/20',
            textColor: 'text-orange-700 dark:text-orange-400',
            phys: 'c1',
            energy: 'd1',
            balance: 'l5',
            popupContent: getPopupContent('svadhisthana')
        },
        {
            id: 'muladhara',
            name: tc.muladhara.name,
            description: tc.muladhara.desc,
            color: 'bg-red-500',
            borderColor: 'border-red-500',
            rowBg: 'bg-red-50 dark:bg-white/5',
            textColor: 'text-red-700 dark:text-red-500',
            phys: 'c',
            energy: 'd',
            balance: 'l6',
            popupContent: getPopupContent('muladhara')
        },
    ] as ChakraRow[]).filter(c => !isCompatibility || c.id !== 'anahata');

    return (
        <div className={cn("w-full h-full animate-fade-in backdrop-blur-md bg-white/70 dark:bg-black/30 rounded-3xl border border-black/10 dark:border-white/20 shadow-xl flex flex-col p-6", className)}>
            <div className="flex flex-col gap-4">
                <div className="space-y-3">
                    {chakras.map((chakra) => (
                        <div key={chakra.id} className={cn("relative group border border-slate-200/50 dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between transition-all hover:bg-white/90 dark:hover:bg-white/10 shadow-sm", chakra.rowBg)}>
                            {/* Chakra Info */}
                            <div className="flex items-center gap-4">
                                <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-white/5 rounded-xl shadow-sm border border-slate-200 dark:border-white/10">
                                    <ChakraIcon id={chakra.id} className={cn("w-6 h-6 drop-shadow-sm", chakra.textColor)} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white/90">{chakra.name}</span>
                                    <span className="text-[10px] sm:text-xs text-slate-500 dark:text-muted-foreground leading-tight max-w-[240px] mb-1">{chakra.description}</span>
                                    {/* Info Icon with HoverCard */}
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <div className="flex items-center gap-1 mt-1 cursor-pointer hover:opacity-100 opacity-60 transition-opacity w-fit">
                                                <Info className="w-3.5 h-3.5 text-muted-foreground" />
                                            </div>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-80 bg-popover text-popover-foreground border border-border p-4 rounded-xl shadow-2xl z-[9999] max-h-80 overflow-y-auto" side="right" align="start" sideOffset={15}>
                                            {chakra.popupContent || (
                                                <div className="text-xs text-muted-foreground italic">
                                                    {t('description') || 'Description'} {t('comingSoon') || 'coming soon...'}
                                                </div>
                                            )}
                                        </HoverCardContent>
                                    </HoverCard>
                                </div>
                            </div>

                            {/* Vertical Values Stack */}
                            <div className="w-full sm:w-[180px] flex flex-col gap-2 border-l border-black/5 dark:border-white/5 pl-0 sm:pl-6 mt-2 sm:mt-0">
                                {/* Physiology */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] sm:text-[10px] uppercase font-medium text-muted-foreground tracking-wider">{t('physiology')}</span>
                                    <div
                                        onClick={() => handleEnergyClick(Number(matrix[chakra.phys]), t('physiology'), '#ef4444')}
                                        className={cn("inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[1.5px] bg-white dark:bg-transparent dark:text-white text-slate-900 font-bold text-[9px] sm:text-[10px] shadow-sm cursor-pointer hover:scale-110 transition-transform", chakra.borderColor)}
                                    >
                                        {matrix[chakra.phys]}
                                    </div>
                                </div>
                                {/* Energy */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] sm:text-[10px] uppercase font-medium text-muted-foreground tracking-wider">{t('energy')}</span>
                                    <div
                                        onClick={() => handleEnergyClick(Number(matrix[chakra.energy]), t('energy'), '#3b82f6')}
                                        className={cn("inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[1.5px] bg-white dark:bg-transparent dark:text-white text-slate-900 font-bold text-[9px] sm:text-[10px] shadow-sm cursor-pointer hover:scale-110 transition-transform", chakra.borderColor)}
                                    >
                                        {matrix[chakra.energy]}
                                    </div>
                                </div>
                                {/* Balance */}
                                <div className="flex items-center justify-between">
                                    <span className="text-[9px] sm:text-[10px] uppercase font-medium text-muted-foreground tracking-wider">{t('balance')}</span>
                                    <div
                                        onClick={() => handleEnergyClick(Number(matrix[chakra.balance]), t('balance'), '#22c55e')}
                                        className={cn("inline-flex items-center justify-center w-5 h-5 sm:w-6 sm:h-6 rounded-full border-[1.5px] bg-white dark:bg-transparent dark:text-white text-slate-900 font-bold text-[9px] sm:text-[10px] shadow-sm cursor-pointer hover:scale-110 transition-transform", chakra.borderColor)}
                                    >
                                        {matrix[chakra.balance]}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Summary Row */}
                    <div className="relative bg-slate-100 dark:bg-white/5 border-2 border-slate-200 dark:border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mt-2 shadow-inner">
                        <div className="flex items-center gap-4">
                            <div className="shrink-0 w-10 h-10 flex items-center justify-center bg-white dark:bg-white/10 rounded-xl shadow-md border border-slate-200 dark:border-transparent">
                                <Sigma className="w-5 h-5 text-foreground/80" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">{t('summary')}</span>
                                <span className="text-[10px] sm:text-xs text-slate-500 dark:text-muted-foreground">{t('totalEnergyField')}</span>
                            </div>
                        </div>

                        <div className="w-full sm:w-[180px] flex flex-col gap-2 border-l border-black/10 dark:border-white/10 pl-0 sm:pl-6 mt-2 sm:mt-0">
                            {/* Phys Total */}
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-foreground/70 tracking-wider">{t('physiology')}</span>
                                <div
                                    onClick={() => handleEnergyClick(Number(matrix.healthPhysTotal), t('physiology'), '#64748b')}
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-slate-500 dark:border-slate-400 bg-white dark:bg-transparent text-slate-900 dark:text-white shadow-md font-bold text-xs cursor-pointer hover:scale-110 transition-transform"
                                >
                                    {matrix.healthPhysTotal}
                                </div>
                            </div>
                            {/* Energy Total */}
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-foreground/70 tracking-wider">{t('energy')}</span>
                                <div
                                    onClick={() => handleEnergyClick(Number(matrix.healthEnergyTotal), t('energy'), '#64748b')}
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-slate-500 dark:border-slate-400 bg-white dark:bg-transparent text-slate-900 dark:text-white shadow-md font-bold text-xs cursor-pointer hover:scale-110 transition-transform"
                                >
                                    {matrix.healthEnergyTotal}
                                </div>
                            </div>
                            {/* Balance Total */}
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-foreground/70 tracking-wider">{t('balance')}</span>
                                <div
                                    onClick={() => handleEnergyClick(Number(matrix.healthBalanceTotal), t('balance'), '#64748b')}
                                    className="inline-flex items-center justify-center w-7 h-7 rounded-full border-2 border-slate-500 dark:border-slate-400 bg-white dark:bg-transparent text-slate-900 dark:text-white shadow-md font-bold text-xs cursor-pointer hover:scale-110 transition-transform"
                                >
                                    {matrix.healthBalanceTotal}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <EnergyDetailModal
                energyNumber={selectedEnergy?.number || null}
                sector="health"
                categoryLabel={selectedEnergy?.label || ''}
                headerColor={selectedEnergy?.color}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};
