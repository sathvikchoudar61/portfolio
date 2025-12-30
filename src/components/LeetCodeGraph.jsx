import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { SiLeetcode } from "react-icons/si";

export default function LeetCodeGraph() {
    const [contributionData, setContributionData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalContributions, setTotalContributions] = useState(0);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (!loading && scrollRef.current) {
            scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
        }
    }, [loading]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch LeetCode Data
                const lcRes = await fetch("https://leetcode-stats-api.herokuapp.com/sathvikchoudary61");
                const lcData = await lcRes.json();

                if (lcData.status === "success" && lcData.submissionCalendar) {
                    const calendar = lcData.submissionCalendar; // { timestamp: count }

                    // Parse calendar
                    const countMap = {};
                    let total = 0;
                    Object.keys(calendar).forEach(ts => {
                        // Ensure timestamp is treated correctly (seconds vs ms)
                        const date = new Date(parseInt(ts) * 1000);
                        const dateKey = date.toISOString().split('T')[0];
                        countMap[dateKey] = (countMap[dateKey] || 0) + calendar[ts];
                        total += calendar[ts];
                    });

                    setTotalContributions(total);

                    // Generate last 364 days (52 weeks)
                    const lastYear = [];
                    const today = new Date();
                    // Align to end of week or just pure days? 
                    // GitHub Graph usually ends on current day or week.
                    // Let's go back 364 days from today.

                    for (let i = 0; i < 364; i++) {
                        const d = new Date(today);
                        d.setDate(today.getDate() - (363 - i)); // 0 = 363 days ago, 363 = today
                        const dateKey = d.toISOString().split('T')[0];
                        const count = countMap[dateKey] || 0;

                        // Determine Level (0-4) mimicking GitHub
                        let level = 0;
                        if (count > 0) level = 1;
                        if (count > 2) level = 2;
                        if (count > 5) level = 3;
                        if (count > 8) level = 4;

                        lastYear.push({ date: dateKey, count, level });
                    }

                    setContributionData(lastYear);
                    setLoading(false);
                } else {
                    throw new Error("No calendar data");
                }

            } catch (error) {
                console.error("Failed to fetch LeetCode data", error);
                setContributionData(generateFallbackData());
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const generateFallbackData = () => {
        return Array.from({ length: 364 }).map(() => ({ level: 0, count: 0, date: "" }));
    };

    const getColor = (level) => {
        switch (level) {
            case 0: return "bg-zinc-200 dark:bg-zinc-800/50";
            case 1: return "bg-yellow-300 dark:bg-yellow-900";
            case 2: return "bg-yellow-400 dark:bg-yellow-700";
            case 3: return "bg-yellow-500 dark:bg-yellow-500";
            case 4: return "bg-yellow-600 dark:bg-yellow-400";
            default: return "bg-zinc-200 dark:bg-zinc-800/50";
        }
    };

    return (
        <section className="flex flex-col items-center justify-center pt-0 pb-5 px-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="w-full max-w-4xl mb-6 flex flex-col gap-6"
            >
                <div className="text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-heading text-zinc-900 dark:text-white">
                        LeetCode <span className="text-yellow-500">Activity</span>
                    </h2>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-full">
                            <SiLeetcode className="w-6 h-6 text-yellow-500" />
                        </div>
                        <div className="text-left">
                            <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                                @sathvikchoudary61
                            </h2>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {loading ? "Loading..." : `${totalContributions.toLocaleString()} submissions in the last year`}
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
                                transition={{ delay: i * 0.0005 }}
                                className={`w-2.5 h-2.5 md:w-4 md:h-4 rounded-sm ${getColor(day.level)}`}
                                title={`${day.date}: ${day.count} submissions`}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="mt-8 flex items-center gap-2 text-sm text-zinc-500">
                <span>Less</span>
                <div className="w-3 h-3 rounded-sm bg-zinc-200 dark:bg-zinc-800/50" />
                <div className="w-3 h-3 rounded-sm bg-yellow-300 dark:bg-yellow-900" />
                <div className="w-3 h-3 rounded-sm bg-yellow-500 dark:bg-yellow-500" />
                <div className="w-3 h-3 rounded-sm bg-yellow-600 dark:bg-yellow-400" />
                <span>More</span>
            </div>
        </section>
    );
}
