import { motion } from "framer-motion";
import { cn } from "../lib/utils";

export default function AuroraBackground({ className, children, ...props }) {
    return (
        <div
            className={cn(
                "relative flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50 transition-colors",
                className
            )}
            {...props}
        >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className={cn(
                        "filter blur-[100px] opacity-50 dark:opacity-30",
                        "absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh]",
                        "bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 dark:from-indigo-800 dark:via-purple-900 dark:to-indigo-800",
                        "animate-aurora"
                    )}
                />
                <div
                    className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-200 dark:bg-blue-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-overlay animate-pulse"
                />
                <div
                    className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-purple-200 dark:bg-purple-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-overlay animate-pulse delay-1000"
                />
            </div>
            <div className="relative z-10 w-full">{children}</div>
        </div>
    );
}
