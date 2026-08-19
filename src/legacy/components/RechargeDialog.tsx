import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, DollarSign, Wallet } from "lucide-react";
import { toast } from "sonner";

interface RechargeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentBalance?: number;
}

export function RechargeDialog({ isOpen, onOpenChange, currentBalance = 0 }: RechargeDialogProps) {
  const { language } = useLanguage();
  const [amount, setAmount] = useState<string>("5");
  const [isLoading, setIsLoading] = useState(false);

  const handleRecharge = async () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount < 5) {
      toast.error(language === "ru" ? "Минимальная сумма пополнения $5" : "Minimum recharge amount is $5");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("create-checkout-session", {
        body: {
          mode: "payment",
          amount: Math.round(numAmount * 100), // convert to cents
          language: language === "ru" ? "ru" : "en",
          siteUrl: window.location.origin,
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error: any) {
      console.error("Recharge error:", error);
      toast.error(error.message || (language === "ru" ? "Ошибка при создании платежа" : "Error creating payment"));
    } finally {
      setIsLoading(false);
    }
  };

  const t = {
    title: language === "ru" ? "Пополнение баланса" : "Recharge Balance",
    description: language === "ru" 
      ? "Пополните свой баланс, чтобы продолжить общение с ИИ-помощником. Каждое сообщение стоит $0.15." 
      : "Top up your balance to continue chatting with the AI assistant. Each message costs $0.15.",
    amountLabel: language === "ru" ? "Сумма пополнения ($)" : "Recharge Amount ($)",
    minAmount: language === "ru" ? "Минимум $5.00" : "Minimum $5.00",
    currentBalance: language === "ru" ? "Текущий баланс" : "Current Balance",
    rechargeBtn: language === "ru" ? "Пополнить через Stripe" : "Recharge via Stripe",
    processing: language === "ru" ? "Обработка..." : "Processing...",
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border border-border">
            <span className="text-sm font-medium">{t.currentBalance}</span>
            <span className="text-lg font-bold text-primary">${currentBalance.toFixed(2)}</span>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="amount">{t.amountLabel}</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="amount"
                type="number"
                min="5"
                step="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-9"
                placeholder="5.00"
              />
            </div>
            <p className="text-[10px] text-muted-foreground">{t.minAmount}</p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["5", "10", "20"].map((val) => (
              <Button
                key={val}
                variant="outline"
                size="sm"
                onClick={() => setAmount(val)}
                className={amount === val ? "border-primary bg-primary/5" : ""}
              >
                ${val}
              </Button>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button className="w-full" onClick={handleRecharge} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t.processing}
              </>
            ) : (
              t.rechargeBtn
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
