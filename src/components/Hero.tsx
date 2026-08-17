import { useState, useEffect } from "react";
import { Sparkles, User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from "@/contexts/LanguageContext";
import { validateDOB, validateDateInput } from "@/lib/dateValidation";
import { toast } from "sonner";
import { CalculatorFeatures } from "./CalculatorFeatures";
import { CalculatorHowItWorks } from "./CalculatorHowItWorks";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { format, parse, isValid } from "date-fns";
import { cn } from "@/lib/utils";

interface HeroProps {
    onCalculate: (data: { date: string; name: string; gender: "male" | "female" }) => void;
    userName?: string | null;
    isHomePage?: boolean;
}

export function Hero({ onCalculate, userName, isHomePage = false }: HeroProps) {
    const { language, t } = useLanguage();
    const [date, setDate] = useState("");
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [name, setName] = useState("");
    const [gender, setGender] = useState<"male" | "female">("male");
    const [dateError, setDateError] = useState<string | null>(null);

    // Sync selectedDate when date string changes manually (if it's a full valid date)
    useEffect(() => {
        if (date.length === 10) {
            const parsedDate = parse(date, "dd/MM/yyyy", new Date());
            if (isValid(parsedDate)) {
                setSelectedDate(parsedDate);
            }
        }
    }, [date]);

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        // Allow backspace/deletion by checking if length decreased
        if (value.length < date.length) {
            setDate(value);
            setDateError(null);
            if (value.length < 10) setSelectedDate(undefined);
            return;
        }

        let numericValue = value.replace(/\D/g, "");
        let formattedValue = "";

        if (numericValue.length >= 2) formattedValue = numericValue.slice(0, 2) + "/" + numericValue.slice(2);
        else formattedValue = numericValue;

        if (numericValue.length >= 5) formattedValue = formattedValue.slice(0, 5) + "/" + formattedValue.slice(5);
        if (formattedValue.length > 10) formattedValue = formattedValue.slice(0, 10);

        setDate(formattedValue);

        // Validate date input in real-time
        const validation = validateDateInput(formattedValue);
        setDateError(validation.error || null);
    };

    const handleCalendarSelect = (d: Date | undefined) => {
        if (d) {
            setSelectedDate(d);
            const formatted = format(d, "dd/MM/yyyy");
            setDate(formatted);
            setDateError(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validate the date before submitting
        const validation = validateDOB(date);

        if (!validation.isValid) {
            setDateError(validation.error || "Invalid date");
            toast.error(validation.error || "Please enter a valid date");
            return;
        }

        if (date.length === 10) {
            setDateError(null);
            onCalculate({ date, name, gender });
        }
    };

    return (
        <section className="relative pt-2 pb-16 overflow-hidden max-w-full">
            {/* Background Elements - Subtler */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20 dark:opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-2 sm:px-4">
                {/* Centered Header */}
                <div className="text-center max-w-3xl mx-auto mb-4 sm:mb-6 px-2 animate-in slide-in-from-top duration-700">
                    {isHomePage && userName && (
                        <div className="mb-12 mt-0 flex flex-col items-center justify-center animate-in fade-in slide-in-from-top-4 duration-1000 relative">
                            {/* Subtle Glow like About page */}
                            <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full -z-10" />
                            
                            <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] text-primary uppercase mb-2 sm:mb-3">
                                {language === 'ru' ? 'ДОБРО ПОЖАЛОВАТЬ' : 'WELCOME'}
                            </span>
                            <h2 className="text-xl sm:text-3xl font-serif font-semibold text-foreground tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/70">
                                {userName}
                            </h2>
                            <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mt-4 sm:mt-6" />
                        </div>
                    )}
                    <h1 className="text-2xl sm:text-3xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 via-purple-800 to-gray-900 dark:from-white dark:via-purple-300 dark:to-white bg-clip-text text-transparent leading-tight break-words">
                        {language === "ru" ? "Матрица Судьбы" : "Unlock Your Soul's Matrix"}
                    </h1>
                    <p className="mt-2 text-muted-foreground text-sm sm:text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
                        {language === "ru"
                            ? "Персональный расчет энергий по дате рождения. Узнайте свой путь."
                            : "A personalized map of your energies based on ancient numerology. Discover your true potential today."}
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 items-start max-w-5xl mx-auto">
                    {/* Left Column: Features & How it Works */}
                    <div className="order-2 lg:order-1 h-full animate-in slide-in-from-left duration-700 delay-100 overflow-hidden">
                        <div className="bg-background/40 backdrop-blur-sm rounded-[2rem] p-4 sm:p-8 border border-border/20 shadow-lg h-full flex flex-col justify-between gap-8 overflow-hidden">
                            <CalculatorFeatures />
                            <CalculatorHowItWorks />
                        </div>
                    </div>

                    {/* Right Column: Calculator Form */}
                    <div className="order-1 lg:order-2 w-full max-w-md mx-auto relative animate-in slide-in-from-right duration-700 delay-100">
                        {/* Decorative Glow behind form */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-[2.5rem] blur-xl opacity-50" />

                        <form
                            onSubmit={handleSubmit}
                            className="relative bg-background/80 backdrop-blur-xl p-6 sm:p-8 rounded-[2rem] border border-border/10 shadow-2xl flex flex-col gap-4 sm:gap-6 h-full overflow-hidden"
                        >
                            {/* Header */}
                            <div className="text-center space-y-1 mb-2">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {language === 'ru' ? 'Расчет Матрицы' : 'Calculate Matrix'}
                                </h3>
                            </div>

                            {/* Name Input */}
                            <div className="space-y-1.5 text-left">
                                <Label htmlFor="heroName" className="text-xs uppercase tracking-wider text-muted-foreground font-bold ml-1">
                                    {language === 'ru' ? 'Имя' : 'Name'}
                                </Label>
                                <div className="relative group focus-within:ring-2 ring-primary/20 rounded-xl transition-all">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <Input
                                        id="heroName"
                                        type="text"
                                        placeholder={language === 'ru' ? 'Ваше имя' : 'Your name'}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="h-12 pl-12 bg-background/50 border border-border/10 rounded-xl focus-visible:ring-0 focus-visible:border-primary transition-all font-medium text-base shadow-sm placeholder:text-muted-foreground/50"
                                    />
                                </div>
                            </div>

                            {/* Gender Selection */}
                            <div className="space-y-1.5 text-left">
                                <div className="relative p-1 bg-muted/50 rounded-xl flex border border-border/50 h-12 items-center">
                                    {/* Sliding Background */}
                                    <div
                                        className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-background rounded-lg shadow-md border border-border transition-all duration-300 ease-out ${gender === 'male' ? 'left-1' : 'left-[calc(50%+2px)]'
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setGender("male")}
                                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1 rounded-lg transition-colors duration-300 ${gender === 'male'
                                            ? 'text-foreground font-bold'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <span className="text-lg">♂</span>
                                        <span className="text-sm font-bold">{language === 'ru' ? 'Мужской' : 'Male'}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setGender("female")}
                                        className={`relative z-10 flex-1 flex items-center justify-center gap-2 py-1 rounded-lg transition-colors duration-300 ${gender === 'female'
                                            ? 'text-foreground font-bold'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                    >
                                        <span className="text-lg">♀</span>
                                        <span className="text-sm font-bold">{language === 'ru' ? 'Женский' : 'Female'}</span>
                                    </button>
                                </div>
                            </div>

                            {/* Date Input */}
                            <div className="space-y-1.5 text-left">
                                <Label htmlFor="heroDate" className="text-xs uppercase tracking-wider text-slate-900 dark:text-muted-foreground font-bold ml-1">
                                    {language === 'ru' ? 'Дата рождения' : 'Date of Birth'}
                                </Label>
                                <div className="relative group focus-within:ring-2 ring-primary/20 rounded-xl transition-all h-12">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <button
                                                type="button"
                                                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/70 hover:text-primary transition-colors z-20"
                                            >
                                                <Calendar className="w-5 h-5" />
                                            </button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 z-[100]" align="start">
                                            <CalendarPicker
                                                mode="single"
                                                selected={selectedDate}
                                                onSelect={handleCalendarSelect}
                                                disabled={(date) =>
                                                    date > new Date() || date < new Date("1900-01-01")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <Input
                                        id="heroDate"
                                        type="text"
                                        placeholder="DD/MM/YYYY"
                                        value={date}
                                        onChange={handleDateChange}
                                        className={cn(
                                            "h-12 pl-12 bg-background/50 border rounded-xl focus-visible:ring-0 transition-all font-medium text-base shadow-sm placeholder:text-muted-foreground/50 tracking-wider w-full",
                                            dateError
                                                ? 'border-red-500 focus-visible:border-red-500'
                                                : 'border-border/10 focus-visible:border-primary'
                                        )}
                                        maxLength={10}
                                    />
                                    {dateError && (
                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-red-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                        </div>
                                    )}
                                </div>
                                {dateError && (
                                    <p className="text-xs text-red-500 ml-1 font-medium">{dateError}</p>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                size="default"
                                disabled={!!dateError || date.length < 10}
                                className="w-full h-11 sm:h-12 mt-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-sm hover:shadow-md transition-all duration-300 active:scale-[0.98] font-bold text-xs sm:text-sm tracking-widest uppercase"
                            >
                                {t("calculateButton")}
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
