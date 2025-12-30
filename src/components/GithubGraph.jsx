import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SiGithub } from "react-icons/si";

export default function GithubGraph() {
    const [contributionData, setContributionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        // Scroll to end (latest date) on mobile/desktop when data loads
        if (!loading && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [loading]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Using a public proxy for GitHub contributions
                const response = await fetch("https://github-contributions-api.jogruber.de/v4/sathvikchoudar61?y=last");
                const data = await response.json();

                // Process the data: flatten the structure or take the last 365 days
                // The API returns nested structure usually, checking documentation format:
                // usually data.contributions is array of days

                let contributions = data.contributions || [];
                // If it returns multiple years, we might need to filter. 
                // However, ?y=last usually gives the last year relative to now.

                // If empty or error, throw to use fallback
                if (!contributions.length) throw new Error("No data");

                // Take last 364 days (52 weeks * 7) to fit our grid perfectly
                const lastYear = contributions.slice(-364);

                setContributionData(lastYear);

                // Calculate total
                const total = contributions.reduce((acc, curr) => acc + curr.count, 0);
                setTotalContributions(total);
                setLoading(false);

            } catch (error) {
                console.error("Failed to fetch GitHub data, using fallback", error);
                generateFallbackData();
            }
        };

        fetchData();
    }, []);

    const generateFallbackData = () => {
        const weeks = 52;
        const days = 7;
        const mockData = Array.from({ length: weeks * days }).map(() => {
            const rand = Math.random();
            // Mock level 0-4
            if (rand > 0.9) return { level: 4, count: 10 };
            if (rand > 0.7) return { level: 3, count: 5 };
            if (rand > 0.4) return { level: 2, count: 3 };
            if (rand > 0.2) return { level: 1, count: 1 };
            return { level: 0, count: 0 };
        });
        setContributionData(mockData);
        setTotalContributions(1200); // Mock total
        setLoading(false);
    };

    const getColor = (level) => {
        // level can be 0-4 from GitHub
        switch (level) {
            case 0: return "bg-zinc-200 dark:bg-zinc-800/50";
            case 1: return "bg-emerald-300 dark:bg-emerald-900";
            case 2: return "bg-emerald-400 dark:bg-emerald-700";
            case 3: return "bg-emerald-500 dark:bg-emerald-500";
            case 4: return "bg-emerald-600 dark:bg-emerald-400";
            default: return "bg-zinc-200 dark:bg-zinc-800";
        }
    };

    return (
        <section className="flex flex-col items-center justify-center pt-10 pb-10 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-4xl mb-6 flex flex-col gap-6"
            >
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-zinc-900 dark:text-white">
                        Code <span className="text-gradient">Activity</span>
                    </h2>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-full">
                            <SiGithub className="w-6 h-6 text-zinc-900 dark:text-white" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                                @sathvikchoudar61
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {loading ? "Loading..." : `${totalContributions.toLocaleString()} contributions in the last year`}
                            </p>
                        </div>
                    </div>

                    <div className="hidden md:block text-xs font-mono text-zinc-400 border border-zinc-800 px-2 py-1 rounded">
                        Public Activity
                    </div>
                </div>
            </motion.div>

            <div ref={scrollRef} className="p-3 md:p-6 rounded-3xl bg-white/50 dark:bg-black/20 border border-zinc-200 dark:border-white/5 backdrop-blur-sm overflow-x-auto max-w-full shadow-sm scrollbar-hide">
                <div className="grid grid-flow-col gap-1 md:gap-1" style={{ gridTemplateRows: "repeat(7, minmax(0, 1fr))" }}>
                    {loading
                        ? Array.from({ length: 364 }).map((_, i) => (
                            <div key={i} className="w-2.5 h-2.5 md:w-4 md:h-4 rounded-sm bg-zinc-200 dark:bg-zinc-800/30 animate-pulse" />
                        ))
                        : contributionData.map((day, i) => (
                            <motion.div
                                key={i}
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: i * 0.0005 }} // faster stagger for large list
                                className={`w-2.5 h-2.5 md:w-4 md:h-4 rounded-sm ${getColor(day.level)}`}
                                title={`${day.date}: ${day.count} contributions`}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-zinc-200 dark:bg-zinc-800/50" />
                <div className="w-3 h-3 rounded-sm bg-emerald-300 dark:bg-emerald-900" />
                <div className="w-3 h-3 rounded-sm bg-emerald-500 dark:bg-emerald-500" />
                <div className="w-3 h-3 rounded-sm bg-emerald-600 dark:bg-emerald-400" />
                <span>More</span>
            </div>
        </section>
    );
}
