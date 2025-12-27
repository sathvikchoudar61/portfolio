import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiGithub, SiLinkedin, SiLeetcode } from "react-icons/si";
import { Mail, Radio, Wifi, ExternalLink } from "lucide-react";

const STATIONS = [
    {
        freq: 92.4,
        label: "GitHub FM",
        icon: SiGithub,
        title: "Code Repository",
        desc: "Browse 15+ Projects & Source Code",
        link: "https://github.com/sathvikchoudar61",
        color: "text-white"
    },
    {
        freq: 96.8,
        label: "LinkedIn St.",
        icon: SiLinkedin,
        title: "Professional Network",
        desc: "Connect for Opportunities",
        link: "https://linkedin.com/in/sathvik-choudary-a73249286/",
        color: "text-blue-400"
    },
    {
        freq: 101.2,
        label: "LeetCode Hz",
        icon: SiLeetcode,
        title: "Problem Solving",
        desc: "View Coding Challenges & Stats",
        link: "https://leetcode.com/u/sathvikchoudary61/",
        color: "text-yellow-500"
    },
    {
        freq: 105.5,
        label: "Mail Wave",
        icon: Mail,
        title: "Direct Contact",
        desc: "sathvikchoudary61@gmail.com",
        link: "mailto:sathvikchoudary61@gmail.com",
        color: "text-red-400"
    }
];

export default function SignalTuner() {
    const [frequency, setFrequency] = useState(88.0);
    const [activeStation, setActiveStation] = useState(null);
    const [signalStrength, setSignalStrength] = useState(0); // 0 (static) to 1 (clear)

    // Bandwidth for signal locking (+/- 0.8 MHz)
    const BANDWIDTH = 0.8;

    useEffect(() => {
        let bestSignal = 0;
        let currentStation = null;

        STATIONS.forEach(station => {
            const distance = Math.abs(frequency - station.freq);
            if (distance < BANDWIDTH) {
                // Calculate signal strength (1.0 at center, 0.0 at edge)
                const strength = 1 - (distance / BANDWIDTH);
                if (strength > bestSignal) {
                    bestSignal = strength;
                    currentStation = station;
                }
            }
        });

        setSignalStrength(bestSignal);

        // Only lock on if signal is strong enough (> 0.2)
        setActiveStation(bestSignal > 0.1 ? currentStation : null);
    }, [frequency]);

    // Generate ticks for the ruler
    const ticks = Array.from({ length: 41 }, (_, i) => 88 + i * 0.5);

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-8">

            {/* CRT SCREEN */}
            <div className="relative aspect-video bg-zinc-950 rounded-3xl overflow-hidden border-4 border-zinc-800 shadow-2xl mb-8 group">
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none z-50 rounded-2xl" />

                {/* Scanlines */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none z-40 bg-repeat" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent bg-[length:100%_4px] pointer-events-none z-40" />

                {/* STATIC NOISE LAYER */}
                <motion.div
                    className="absolute inset-0 z-30 pointer-events-none"
                    animate={{ opacity: Math.max(0.05, 1 - signalStrength) }}
                >
                    {/* Using a high-contrast noise pattern or SVG for static */}
                    <div className="w-full h-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/Noise_tv.gif')] bg-cover opacity-20 mix-blend-screen" />
                    <div className="w-full h-full absolute inset-0 bg-zinc-900 mix-blend-overlay" />
                </motion.div>

                {/* CONTENT DISPLAY */}
                <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <AnimatePresence mode="wait">
                        {activeStation && signalStrength > 0.4 ? (
                            <motion.div
                                key={activeStation.label}
                                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    filter: `blur(${(1 - signalStrength) * 10}px)`
                                }}
                                exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
                                className="flex flex-col items-center gap-4"
                            >
                                <activeStation.icon className={`w-20 h-20 ${activeStation.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]`} />
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-bold font-heading text-white mb-2 tracking-tight">
                                        {activeStation.title}
                                    </h2>
                                    <p className="text-indigo-300 text-lg font-mono">{activeStation.desc}</p>
                                </div>

                                <motion.a
                                    href={activeStation.link}
                                    target="_blank"
                                    rel="noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="mt-6 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full text-white font-bold flex items-center gap-2 backdrop-blur-md transition-all"
                                >
                                    Connect Signal <ExternalLink className="w-4 h-4" />
                                </motion.a>
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center text-zinc-600">
                                <Radio className="w-16 h-16 mb-4 animate-pulse opacity-20" />
                                <h3 className="text-xl font-mono uppercase tracking-[0.2em]">Searching Frequency...</h3>
                                <p className="text-xs mt-2 opacity-50">Drag slider below to tune</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                {/* SIGNAL STRENGTH INDICATOR */}
                <div className="absolute top-4 right-4 z-40 flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Signal</span>
                    <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(bar => (
                            <motion.div
                                key={bar}
                                className={`w-1 h-3 rounded-full ${signalStrength * 5 >= bar ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" : "bg-zinc-800"}`}
                                animate={{ height: signalStrength * 5 >= bar ? [12, 16, 12] : 12 }}
                                transition={{ repeat: Infinity, duration: 1.5, delay: bar * 0.1 }}
                            />
                        ))}
                    </div>
                </div>

                <div className="absolute top-4 left-4 z-40 text-emerald-500 font-mono text-sm shadow-black drop-shadow-md">
                    {frequency.toFixed(1)} MHz
                </div>
            </div>

            {/* TUNER CONTROLS */}
            <div className="relative h-24 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center px-4 md:px-8 shadow-inner select-none">

                {/* SCALE MARKINGS */}
                <div className="absolute inset-x-8 top-0 h-full flex justify-between pointer-events-none opacity-50">
                    {ticks.map((tick, i) => (
                        <div key={tick} className="flex flex-col justify-end h-3/4 items-center">
                            <div className={`w-0.5 ${i % 10 === 0 ? "h-4 bg-zinc-400" : i % 5 === 0 ? "h-3 bg-zinc-600" : "h-2 bg-zinc-700"}`} />
                            {i % 10 === 0 && (
                                <span className="text-[10px] text-zinc-500 font-mono mt-2 transform -translate-x-1/2 absolute bottom-2">
                                    {Math.floor(tick)}
                                </span>
                            )}
                        </div>
                    ))}
                </div>

                {/* STATION MARKERS (Little dots on the scale) */}
                <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-2 pointer-events-none">
                    {STATIONS.map((s, i) => {
                        const percent = ((s.freq - 88) / (108 - 88)) * 100;
                        return (
                            <div
                                key={s.label}
                                className="absolute w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)] -translate-x-1/2 -translate-y-1/2 top-1/2"
                                style={{ left: `${percent}%` }}
                            />
                        );
                    })}
                </div>

                {/* SLIDER */}
                <input
                    type="range"
                    min="88"
                    max="108"
                    step="0.1"
                    value={frequency}
                    onChange={(e) => setFrequency(parseFloat(e.target.value))}
                    className="w-full relative z-20 opacity-0 cursor-ew-resize h-full"
                />

                {/* CUSTOM NEEDLE (Follows Input) */}
                <motion.div
                    className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_15px_rgba(239,68,68,1)] z-10 pointer-events-none"
                    style={{
                        left: `calc(${((frequency - 88) / (108 - 88)) * 100}% + 2rem)`, // +2rem accounts for padding
                        translateX: "-50%"
                    }}
                />
            </div>

            <div className="mt-8 text-center">
                <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">
                    Drag the red needle to locate transmission
                </p>
            </div>
        </div>
    );
}
