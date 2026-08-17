import React, { useState } from 'react';
import { MatrixValues } from '@/core/calc';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { EnergyChip } from './EnergyChip';
import { EnergyDetailModal } from './EnergyDetailModal';
import { useLanguage } from '@/contexts/LanguageContext';
import { useUser } from '@/hooks/useUser';
import { toast } from 'sonner';
import { SubscriptionModal } from './ui/SubscriptionModal';
import { User, Activity, Sparkles, TrendingUp, Brain, Target, TrendingDown, Zap, DollarSign, Heart, Activity as ActivityIcon, Calendar, Lock } from 'lucide-react';
import { energies as energiesEn } from '@/content/energies.en';
import { energies as energiesRu } from '@/content/energies.ru';

interface AvatarIdentitySectionsProps {
    matrix: MatrixValues;
}

export const AvatarIdentitySections: React.FC<AvatarIdentitySectionsProps> = ({ matrix }) => {
    const { language } = useLanguage();
    const { isPremium } = useUser();
    const [selectedEnergy, setSelectedEnergy] = useState<number | null>(null);
    const [activeSector, setActiveSector] = useState<string | undefined>(undefined);
    const [activeTitle, setActiveTitle] = useState<string | undefined>(undefined);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubModalOpen, setIsSubModalOpen] = useState(false);

    const handleEnergyClick = (energyNumber: number, sector?: string, title?: string, isLocked?: boolean) => {
        if (isLocked) {
            setIsSubModalOpen(true);
            return;
        }
        setSelectedEnergy(energyNumber);
        setActiveSector(sector);
        setActiveTitle(title);
        setIsModalOpen(true);
    };

    const content = {
        en: {
            title: 'My Avatar: Identity Insights',
            subtitle: 'Discover your energetic blueprint based on your Matrix of Destiny',
            identity: 'Identity',
            identityDesc: 'Your core energy defining who you are at the deepest level',
            whoAmI: 'Who am I?',
            whoAmIDesc: 'Your life purpose and mission in this world',
            strengths: 'My Strengths',
            strengthsDesc: 'Talents and positive qualities you naturally possess',
            intellect: 'My Intellect',
            intellectDesc: 'How your mind works and processes information',
            selfManifestation: 'Self-Manifestation',
            selfManifestationDesc: 'Your path of personal growth and development',
            weaknesses: 'My Weaknesses',
            weaknessesDesc: 'Shadow aspects and challenges to work through',
            energySource: 'My Energy Source',
            energySourceDesc: 'What fuels your life force and vitality',
            finances: 'Finances',
            financesDesc: 'Your relationship with money and material abundance',
            relationships: 'Romantic Relationships',
            relationshipsDesc: 'How you love and connect in intimate partnerships',
            chakraHealth: 'Chakra Health',
            chakraHealthDesc: 'Energy centers and their physical manifestations',
            yearEnergies: 'Energies of the Year',
            yearEnergiesDesc: 'Influential energies for your current life cycle'
        },
        ru: {
            title: 'Мой Аватар: Инсайты Личности',
            subtitle: 'Откройте свой энергетический план на основе Матрицы Судьбы',
            identity: 'Идентичность',
            identityDesc: 'Ваша основная энергия, определяющая, кто вы на самом глубоком уровне',
            whoAmI: 'Кто я?',
            whoAmIDesc: 'Ваша жизненная цель и миссия в этом мире',
            strengths: 'Мои Сильные Стороны',
            strengthsDesc: 'Таланты и положительные качества, которыми вы обладаете',
            intellect: 'Мой Интеллект',
            intellectDesc: 'Как работает ваш разум и обрабатывает информацию',
            selfManifestation: 'Самопроявление',
            selfManifestationDesc: 'Ваш путь личностного роста и развития',
            weaknesses: 'Мои Слабости',
            weaknessesDesc: 'Теневые аспекты и вызовы для проработки',
            energySource: 'Мой Источник Энергии',
            energySourceDesc: 'Что питает вашу жизненную силу и витальность',
            finances: 'Финансы',
            financesDesc: 'Ваше отношение к деньгам и материальному изобилию',
            relationships: 'Романтические Отношения',
            relationshipsDesc: 'Как вы любите и связываетесь в интимных отношениях',
            chakraHealth: 'Здоровье Чакр',
            chakraHealthDesc: 'Энергетические центры и их физические проявления',
            yearEnergies: 'Энергии Года',
            yearEnergiesDesc: 'Влиятельные энергии вашего текущего жизненного цикла'
        }
    };

    const t = content[language];
    const energies = language === 'ru' ? energiesRu : energiesEn;

    const currentYear = new Date().getFullYear();

    // Calculate year energy - sum digits of current year and reduce to 1-22
    const calculateYearEnergy = (year: number): number => {
        let sum = year.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        while (sum > 22) {
            sum = sum.toString().split('').reduce((acc, digit) => acc + parseInt(digit), 0);
        }
        return sum === 0 ? 22 : sum;
    };

    const yearEnergy = calculateYearEnergy(currentYear);

    const sections = [
        {
            id: 'identity',
            icon: User,
            title: t.identity,
            description: t.identityDesc,
            energies: [matrix.center] // Center/heart of the matrix
        },
        {
            id: 'who-am-i',
            icon: Sparkles,
            title: t.whoAmI,
            description: t.whoAmIDesc,
            energies: [matrix.top, matrix.bottom] // Purpose-related
        },
        {
            id: 'strengths',
            icon: TrendingUp,
            title: t.strengths,
            description: t.strengthsDesc,
            energies: [matrix.a, matrix.b, matrix.e] // Talents triangle
        },
        {
            id: 'intellect',
            icon: Brain,
            title: t.intellect,
            description: t.intellectDesc,
            energies: [matrix.a2, matrix.b2] // Mental/intellectual energies
        },
        {
            id: 'self-manifestation',
            icon: Target,
            title: t.selfManifestation,
            description: t.selfManifestationDesc,
            energies: [matrix.left, matrix.a, matrix.a1, matrix.a2] // Personal growth path
        },
        {
            id: 'weaknesses',
            icon: TrendingDown,
            title: t.weaknesses,
            description: t.weaknessesDesc,
            energies: [matrix.c, matrix.d] // Shadow/karmic energies
        },
        {
            id: 'energy-source',
            icon: Zap,
            title: t.energySource,
            description: t.energySourceDesc,
            energies: [matrix.y, matrix.o] // Life force energies
        },
        {
            id: 'finances',
            icon: DollarSign,
            title: t.finances,
            description: t.financesDesc,
            energies: [matrix.money, matrix.f] // Money channel
        },
        {
            id: 'relationships',
            icon: Heart,
            title: t.relationships,
            description: t.relationshipsDesc,
            energies: [matrix.love, matrix.g] // Love channel
        },
        {
            id: 'year-energies',
            icon: Calendar,
            title: t.yearEnergies,
            description: t.yearEnergiesDesc + ` (${currentYear})`,
            energies: [yearEnergy, matrix.right] // Current year + year from birth
        }
    ];

    const premiumSections = ['intellect', 'self-manifestation', 'weaknesses', 'energy-source', 'who-am-i'];

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                        <User className="w-6 h-6" />
                        {t.title}
                    </CardTitle>
                    <CardDescription>{t.subtitle}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Accordion type="multiple" className="w-full space-y-2">
                        {sections.map((section) => {
                            const isLocked = !isPremium && premiumSections.includes(section.id);
                            return (
                                <AccordionItem
                                    key={section.id}
                                    value={isLocked ? "locked" : section.id}
                                    className={`rounded-xl border border-border dark:border-white/20 bg-muted/30 dark:bg-white/5 backdrop-blur-xl px-4 ${isLocked ? 'opacity-75 cursor-not-allowed' : ''}`}
                                >
                                    <AccordionTrigger
                                        className={`hover:no-underline py-4 ${isLocked ? 'cursor-not-allowed opacity-80' : ''}`}
                                        onClick={(e) => {
                                            if (isLocked) {
                                                e.preventDefault();
                                                setIsSubModalOpen(true);
                                            }
                                        }}
                                    >
                                        <div className="flex items-start gap-3 text-left flex-1">
                                            <section.icon className="w-5 h-5 mt-0.5 text-primary shrink-0" />
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h3 className="text-lg font-semibold text-foreground">
                                                        {section.title}
                                                    </h3>
                                                    {isLocked && <Lock className="w-4 h-4 text-primary" />}
                                                </div>
                                                <p className="text-sm text-muted-foreground mt-1">
                                                    {section.description}
                                                </p>
                                            </div>
                                        </div>
                                    </AccordionTrigger>
                                    <AccordionContent className="pb-4 pt-2">
                                        <div className="flex flex-wrap gap-2 ml-0 sm:ml-8 mt-2">
                                            {/* Remove duplicates and show unique energies */}
                                            {[...new Set(section.energies)].map((energy) => (
                                                <EnergyChip
                                                    key={energy}
                                                    energyNumber={energy}
                                                    onClick={() => handleEnergyClick(
                                                        energy, 
                                                        section.id === 'identity' || section.id === 'who-am-i' ? 'identity' : 
                                                        section.id === 'strengths' ? 'talents' :
                                                        section.id === 'intellect' ? 'intellect' :
                                                        section.id === 'self-manifestation' ? 'social' :
                                                        section.id === 'weaknesses' ? 'karma' :
                                                        section.id === 'energy-source' ? 'energySource' :
                                                        undefined, 
                                                        section.title, 
                                                        isLocked
                                                    )}
                                                    size="md"
                                                    showName
                                                />
                                            ))}
                                        </div>

                                        {/* YouTube Videos for Section Energies */}
                                        <div className="grid grid-cols-1 gap-4 ml-0 sm:ml-8 mt-4">
                                            {[...new Set(section.energies)].map((energyNumber) => {
                                                const energy = energies[energyNumber];
                                                if (!energy?.videoUrl) return null;
                                                return (
                                                    <div key={`video-${energyNumber}`} className="rounded-xl overflow-hidden aspect-video border bg-muted/30 shadow-sm max-w-md">
                                                        <iframe
                                                            width="100%"
                                                            height="100%"
                                                            src={energy.videoUrl}
                                                            title={`${energy.name} explanation`}
                                                            frameBorder="0"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                            allowFullScreen
                                                            className="w-full h-full"
                                                        ></iframe>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            );
                        })}
                    </Accordion>
                </CardContent>
            </Card>

            <EnergyDetailModal
                energyNumber={selectedEnergy}
                sector={activeSector as any}
                categoryLabel={activeTitle}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

            <SubscriptionModal
                isOpen={isSubModalOpen}
                onClose={() => setIsSubModalOpen(false)}
            />
        </>
    );
};
