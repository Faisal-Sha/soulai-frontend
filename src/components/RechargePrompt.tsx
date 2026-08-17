import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Sparkles, MessageSquarePlus } from "lucide-react";

interface RechargePromptProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenRecharge: () => void;
}

export function RechargePrompt({ isOpen, onOpenChange, onOpenRecharge }: RechargePromptProps) {
  const { language } = useLanguage();

  const t = {
    title: language === "ru" ? "Лимит сообщений" : "Message Limit Reached",
    description: language === "ru" 
      ? "Вы использовали все свои бесплатные сообщения. Пополните баланс, чтобы продолжить общение с ИИ." 
      : "You've used all your free messages. Recharge your balance to continue chatting with the AI.",
    rechargeBtn: language === "ru" ? "Пополнить баланс" : "Recharge Balance",
    closeBtn: language === "ru" ? "Закрыть" : "Close",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[350px] p-6 text-center border-primary/20 bg-background/95 backdrop-blur-xl rounded-2xl shadow-xl">
        <div className="flex justify-center mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center ring-4 ring-primary/5">
            <MessageSquarePlus className="w-6 h-6 text-primary" />
          </div>
        </div>
        
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-lg font-bold text-center tracking-tight">
            {t.title}
          </DialogTitle>
          <DialogDescription className="text-center text-xs leading-relaxed opacity-80">
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-2">
          <Button 
            className="w-full h-11 text-sm font-bold shadow-md hover:shadow-lg transition-all rounded-xl active:scale-[0.98]" 
            onClick={() => {
              onOpenChange(false);
              onOpenRecharge();
            }}
          >
            {t.rechargeBtn}
          </Button>
          <Button 
            variant="ghost" 
            className="w-full h-9 text-[11px] text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            {t.closeBtn}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
