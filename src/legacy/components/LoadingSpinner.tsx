import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    text?: string;
    className?: string;
}

export function LoadingSpinner({ size = "md", text, className }: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: "w-6 h-6",
        md: "w-10 h-10",
        lg: "w-16 h-16",
        xl: "w-24 h-24",
    };

    return (
        <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
            {/* Animated spinner with SoulPlus AI theme */}
            <div className="relative">
                {/* Outer rotating circle */}
                <div className={cn(
                    sizeClasses[size],
                    "rounded-full border-4 border-primary/20 border-t-primary animate-spin"
                )} />

                {/* Inner pulsing circle */}
                <div className={cn(
                    "absolute inset-0 m-auto rounded-full bg-primary/30 animate-pulse",
                    size === "sm" && "w-2 h-2",
                    size === "md" && "w-3 h-3",
                    size === "lg" && "w-5 h-5",
                    size === "xl" && "w-8 h-8"
                )} />
            </div>

            {text && (
                <p className="text-sm text-muted-foreground animate-pulse">
                    {text}
                </p>
            )}
        </div>
    );
}

export function PageLoader({ text = "Loading..." }: { text?: string }) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
            <LoadingSpinner size="xl" text={text} />
        </div>
    );
}
