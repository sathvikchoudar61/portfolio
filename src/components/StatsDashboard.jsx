import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { SiLeetcode, SiCodechef, SiHackerrank, SiGithub, SiCodeforces } from "react-icons/si";
import { Trophy, Flame, GitPullRequest, Star, Hexagon } from "lucide-react";
import profile from "../data/profile.json";

export default function StatsDashboard() {
    const [stats, setStats] = useState(profile.coding_stats);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Fetch LeetCode Data (using unofficial public proxy)
                const lcRes = await fetch("https://leetcode-stats-api.herokuapp.com/sathvikchoudary61");
                const lcData = await lcRes.json();

                if (lcData.status === "success") {
                    setStats(prev => ({
                        ...prev,
                        leetcode: {
                            solved: lcData.totalSolved,
                            easy: lcData.easySolved,
                            medium: lcData.mediumSolved,
                            hard: lcData.hardSolved,
                            streak: prev.leetcode.streak
                        }
                    }));
                }
            } catch (error) {
                console.error("Failed to fetch live stats", error);
            }
        };

        fetchStats();
    }, []);

    const { leetcode, codechef, hackerrank, github, smartinterviews, codeforces } = stats || {};

    if (!smartinterviews) return null; // Wait for data sync if stale

    return (
        <section className="w-full max-w-7xl mx-auto px-6 pt-5 pb-20">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-12 text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">
                    Coding <span className="text-indigo-500">Analytics</span>
                </h2>
                <p className="text-zinc-500 dark:text-zinc-400">
                    Live metrics from my competitive programming profiles.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                {/* LEETCODE CARD */}
                <DashboardCard
                    title="LeetCode"
                    icon={SiLeetcode}
                    color="text-yellow-500"
                    borderColor="border-yellow-500/20"
                    bgGradient="from-yellow-500/10"
                >
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <div className="text-3xl font-bold text-zinc-800 dark:text-white">{leetcode.solved}</div>
                            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Problems Solved</div>
                        </div>
                        <div className="flex flex-col items-center p-2 bg-yellow-500/10 rounded-lg">
                            <Flame className="w-5 h-5 text-orange-500 mb-1" />
                            <span className="text-xs font-bold text-orange-500">{leetcode.streak} Day</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <ProgressBar label="Easy" value={leetcode.easy} total={leetcode.solved} color="bg-emerald-500" />
                        <ProgressBar label="Medium" value={leetcode.medium} total={leetcode.solved} color="bg-yellow-500" />
                        <ProgressBar label="Hard" value={leetcode.hard} total={leetcode.solved} color="bg-red-500" />
                    </div>
                </DashboardCard>

                {/* CODECHEF CARD */}
                <DashboardCard
                    title="CodeChef"
                    icon={SiCodechef}
                    color="text-amber-700"
                    borderColor="border-amber-700/20"
                    bgGradient="from-amber-700/10"
                >
                    <div className="relative z-10 flex flex-col items-center justify-center py-4">
                        <div className="relative">
                            <Star className="w-24 h-24 text-amber-700/10 absolute -top-2 -left-2" />
                            <div className="text-5xl font-bold text-zinc-900 dark:text-white relative z-10">{codechef.rating}</div>
                        </div>
                        <div className="text-sm font-bold text-amber-600 mt-2">Max Rating: {codechef.highest_rating}</div>

                        <div className="flex items-center gap-2 mt-6">
                            {[...Array(codechef.stars)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                            ))}
                        </div>
                        <div className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 uppercase tracking-widest">
                            Division {codechef.division}
                        </div>
                    </div>
                </DashboardCard>

                {/* HACKERRANK CARD */}
                <DashboardCard
                    title="HackerRank"
                    icon={SiHackerrank}
                    color="text-emerald-500"
                    borderColor="border-emerald-500/20"
                    bgGradient="from-emerald-500/10"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-zinc-500 dark:text-zinc-400">Total Stars</span>
                            <span className="text-xl font-bold text-emerald-500 flex items-center gap-1">
                                {hackerrank.stars} <Star className="w-4 h-4 fill-emerald-500" />
                            </span>
                        </div>
                        <div className="w-full h-px bg-zinc-200 dark:bg-zinc-800" />
                        <div className="grid grid-cols-2 gap-2">
                            {hackerrank.badges.map((badge, i) => (
                                <div key={i} className="bg-zinc-100 dark:bg-zinc-800/50 rounded p-2 flex flex-col items-center text-center gap-2 border border-zinc-200 dark:border-zinc-700/50">
                                    <Trophy className="w-6 h-6 text-yellow-500" />
                                    <span className="text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-400">{badge}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </DashboardCard>

                {/* SMART INTERVIEWS CARD */}
                <DashboardCard
                    title="Smart Interviews"
                    icon={Hexagon}
                    color="text-orange-500"
                    borderColor="border-orange-500/20"
                    bgGradient="from-orange-500/10"
                >
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-3xl font-bold text-zinc-800 dark:text-white">{smartinterviews.solved}</div>
                                <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Solved</div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xl font-bold text-orange-500">{smartinterviews.bees} 🐝</span>
                                <span className="text-xs text-zinc-500 font-bold uppercase">Bees Collected</span>
                            </div>
                        </div>

                        <div className="bg-zinc-100 dark:bg-zinc-800/50 rounded-xl p-3 border border-zinc-200 dark:border-zinc-700/50">
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-zinc-500 dark:text-zinc-400">Accuracy</span>
                                <span className="text-zinc-900 dark:text-white font-bold">{smartinterviews.accuracy}</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: smartinterviews.accuracy }}
                                    className="h-full bg-orange-500"
                                />
                            </div>
                        </div>
                    </div>
                </DashboardCard>

                {/* CODEFORCES CARD */}
                <DashboardCard
                    title="Codeforces"
                    icon={SiCodeforces}
                    color="text-blue-500"
                    borderColor="border-blue-500/20"
                    bgGradient="from-blue-500/10"
                >
                    <div className="flex flex-col items-center justify-center py-6">
                        <div className="text-5xl font-bold text-zinc-900 dark:text-white mb-2">
                            {codeforces?.rating || "N/A"}
                        </div>
                        <div className={`text-sm font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/50 ${codeforces?.rank === "Newbie" ? "text-gray-500 dark:text-gray-400" : "text-blue-500 dark:text-blue-400"
                            }`}>
                            {codeforces?.rank || "Unrated"}
                        </div>
                        <div className="mt-8 grid grid-cols-2 gap-8 w-full">
                            <div className="text-center">
                                <div className="text-xs text-zinc-500 uppercase font-bold">Max Rating</div>
                                <div className="text-lg font-bold text-zinc-800 dark:text-white">{codeforces?.max_rating || "N/A"}</div>
                            </div>
                            <div className="text-center">
                                <div className="text-xs text-zinc-500 uppercase font-bold">Max Rank</div>
                                <div className="text-lg font-bold text-gray-500 dark:text-gray-400">{codeforces?.max_rank || "N/A"}</div>
                            </div>
                        </div>
                    </div>
                </DashboardCard>

                {/* GITHUB CARD */}
                <DashboardCard
                    title="GitHub"
                    icon={SiGithub}
                    color="text-white"
                    borderColor="border-zinc-700"
                    bgGradient="from-zinc-800"
                    className="md:col-span-2 lg:col-span-1"
                >
                    <div className="flex flex-col gap-6 py-2">
                        <StatRow icon={GitPullRequest} label="Pull Requests" value={github.pull_requests} color="text-purple-400" />
                        <StatRow icon={Trophy} label="Earned Stars" value={github.stars_earned} color="text-yellow-400" />

                        <a
                            href="https://github.com/sathvikchoudar61?tab=repositories"
                            target="_blank"
                            rel="noreferrer"
                            className="mt-2 p-4 bg-zinc-100 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 flex items-center justify-between group cursor-pointer hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300">View Repositories</span>
                            <span className="text-lg group-hover:translate-x-1 transition-transform text-zinc-800 dark:text-zinc-200">→</span>
                        </a>
                    </div>
                </DashboardCard>

            </div>
        </section>
    );
}

function DashboardCard({ children, title, icon: Icon, color, borderColor, bgGradient, className = "" }) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className={`relative overflow-hidden bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm border ${borderColor} rounded-3xl p-6 shadow-xl ${className}`}
        >
            <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${bgGradient} to-transparent rounded-full blur-3xl opacity-50 pointer-events-none`} />

            <div className="flex items-center gap-3 mb-6">
                <Icon className={`w-6 h-6 ${color}`} />
                <h3 className="text-lg font-bold font-heading text-zinc-800 dark:text-zinc-100">{title}</h3>
            </div>

            {children}
        </motion.div>
    )
}

function ProgressBar({ label, value, total, color }) {
    const percentage = Math.round((value / total) * 100);
    return (
        <div className="group">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">{label}</span>
                <span className="text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors">{value}</span>
            </div>
            <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full ${color}`}
                />
            </div>
        </div>
    )
}

function StatRow({ icon: Icon, label, value, color }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 ${color} bg-opacity-20`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                </div>
                <span className="text-sm text-zinc-600 dark:text-zinc-400 font-medium">{label}</span>
            </div>
            <span className="text-lg font-bold text-zinc-800 dark:text-white">{value}</span>
        </div>
    )
}
