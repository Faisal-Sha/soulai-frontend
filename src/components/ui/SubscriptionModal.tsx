import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from '@/contexts/LanguageContext';
import { Lock } from 'lucide-react';

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { language } = useLanguage();

    const content = {
        en: {
            title: "Subscription is required",
            description: "Get unlimited access to all site content by choosing the right rate.",
            button: "Read more"
        },
        ru: {
            title: "Требуется подписка",
            description: "Получите неограниченный доступ ко всему контенту сайта, выбрав подходящий тариф.",
            button: "Подробнее"
        }
    };

    const t = content[language === 'ru' ? 'ru' : 'en'];

    const handleReadMore = () => {
        onClose();
        navigate('/rates');
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-[85vw] sm:max-w-[400px] p-4 sm:p-6 border-primary/20 bg-background/95 backdrop-blur-xl rounded-2xl gap-0">
                <DialogHeader className="flex flex-col items-center gap-1.5 sm:gap-2 pb-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center mb-0.5 sm:mb-1 shrink-0">
                        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    </div>
                    <DialogTitle className="text-base sm:text-lg font-bold text-center tracking-tight">
                        {t.title}
                    </DialogTitle>
                    <DialogDescription className="text-center text-muted-foreground text-[11px] sm:text-sm px-2">
                        {t.description}
                    </DialogDescription>
                </DialogHeader>
                <div className="mt-4 sm:mt-6">
                    <Button
                        onClick={handleReadMore}
                        className="w-full py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest rounded-xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-[1.02]"
                    >
                        {t.button}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};
