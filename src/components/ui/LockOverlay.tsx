import React from 'react';
import { Lock } from 'lucide-react';
import { Button } from './button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

interface LockOverlayProps {
    children: React.ReactNode;
    isLocked: boolean;
    message?: string;
    className?: string;
    onClick?: () => void;
}

export const LockOverlay: React.FC<LockOverlayProps> = ({
    children,
    isLocked,
    message,
    className = "",
    onClick
}) => {
    const { language } = useLanguage();

    const t = {
        en: {
            subscribe: 'Subscribe to Unlock',
            premiumContent: 'Premium Content'
        },
        ru: {
            subscribe: 'Подписаться, чтобы разблокировать',
            premiumContent: 'Премиум контент'
        }
    }[language === 'ru' ? 'ru' : 'en'];

    if (!isLocked) return <>{children}</>;

    return (
        <div className={`relative group ${className}`}>
            {/* Blurred Content */}
            <div className="filter blur-md select-none pointer-events-none opacity-50">
                {children}
            </div>

            {/* Overlay */}
            <div
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-black/5 dark:bg-white/5 backdrop-blur-[2px] rounded-3xl transition-all duration-500 ${onClick ? 'cursor-pointer' : ''}`}
                onClick={onClick}
            >
                <div className="p-4 rounded-full bg-primary/20 border border-primary/30 mb-4 shadow-xl animate-pulse">
                    <Lock className="w-8 h-8 text-primary" />
                </div>

                <h4 className="text-lg font-bold text-foreground mb-2">
                    {message || t.premiumContent}
                </h4>

                <Button
                    variant="default"
                    className="mt-2 rounded-full px-6 py-2 h-auto text-sm font-bold uppercase tracking-widest bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
                    onClick={onClick}
                    asChild={!onClick}
                >
                    {onClick ? (
                        t.subscribe
                    ) : (
                        <Link to="/rates">
                            {t.subscribe}
                        </Link>
                    )}
                </Button>
            </div>
        </div>
    );
};
