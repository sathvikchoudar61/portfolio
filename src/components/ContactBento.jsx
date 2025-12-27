import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Copy, Check, Download, FileText, Shield } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode, SiInstagram, SiTelegram, SiCodeforces, SiCodechef, SiHackerrank, SiSpotify } from "react-icons/si";
import { useState } from "react";
import profile from "../data/profile.json";

export default function ContactBento() {
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(profile.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const socialIcons = {
        "GitHub": SiGithub,
        "LinkedIn": SiLinkedin,
        "LeetCode": SiLeetcode,
        "Instagram": SiInstagram,
        "Telegram": SiTelegram,
        "CodeForces": SiCodeforces,
        "CodeChef": SiCodechef,
        "HackerRank": SiHackerrank
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* 1. PRIMARY CONTACT CARD (Large) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:col-span-2 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl p-8 text-white relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/20 transition-colors" />

                    <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-medium mb-4">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                </span>
                                Available for work
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold font-heading leading-tight mb-2">
                                Let's build something <br /> amazing together.
                            </h3>
                            <p className="text-indigo-100 max-w-md text-sm md:text-base">
                                Have a project in mind or just want to chat? I'm always open to new ideas and opportunities.
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-3 mt-8">
                            <a
                                href={`mailto:${profile.email}`}
                                className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2"
                            >
                                <Mail className="w-4 h-4" />
                                Send Email
                            </a>
                            <button
                                onClick={handleCopyEmail}
                                className="px-4 py-3 bg-black/20 hover:bg-black/30 text-white rounded-xl font-medium text-sm backdrop-blur-md transition-colors flex items-center gap-2 border border-white/10"
                            >
                                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {copied ? "Copied" : "Copy"}
                            </button>
                        </div>
                    </div>
                </motion.div>

                {/* 2. LOCATION & INFO (Sidebar) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                    <div>
                        <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h4 className="text-zinc-400 text-xs uppercase tracking-wider font-bold mb-1">Based In</h4>
                        <p className="text-white font-medium text-lg">{profile.location.split(',')[0]}</p>
                        <p className="text-zinc-500 text-sm">{profile.location.split(',')[1]}</p>
                    </div>

                    <div className="mt-8">
                        <div className="w-full h-32 rounded-xl bg-zinc-800/50 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.4867,17.3850,11,0/300x200?access_token=YOUR_TOKEN')] bg-cover bg-center grayscale opacity-50 relative overflow-hidden border border-zinc-700/50">
                            {/* Placeholder pattern since no map token */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. INTERACTIVE RADIO TUNER */}
                <TunerModule />

                {/* 5. SECURE RESUME MODULE */}
                <ResumeCard />

                {/* 3. SOCIAL GRID (Bottom) */}
                <div className="md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profile.socials.map((social, idx) => {
                        const Icon = socialIcons[social.platform] || ArrowUpRight;
                        return (
                            <motion.a
                                key={social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.2 + (idx * 0.05) }}
                                className="group bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 p-4 rounded-2xl flex items-center justify-between hover:bg-zinc-800/50 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-800 group-hover:bg-indigo-500/10 rounded-lg transition-colors">
                                        <Icon className="w-5 h-5 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <span className="text-zinc-300 font-medium text-sm group-hover:text-white transition-colors">{social.platform}</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                            </motion.a>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}

// Helper Component for Tuner Logic
function TunerModule() {
    const [tuning, setTuning] = useState(50);

    // Define frequencies and their messages
    const stations = [
        { freq: 88, msg: "READY_TO_COLLABORATE" },
        { freq: 94.5, msg: "HACK_THE_PLANET" },
        { freq: 102, msg: "SYSTEM_ONLINE" },
        { freq: 24, msg: "COFFEE_REQUIRED" }
    ];

    // Find the closest station
    let bestMatch = stations[0];
    let minDist = Infinity;

    stations.forEach(s => {
        const d = Math.abs(tuning - s.freq);
        if (d < minDist) {
            minDist = d;
            bestMatch = s;
        }
    });

    // Calculate signal strength (0 to 1) based on distance to closest station
    const strength = Math.max(0, 1 - minDist / 10);
    const isLocked = strength > 0.95;

    // Decrypt text based on strength
    const message = bestMatch.msg;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#@$%&*";
    const displayMessage = message.split('').map((char, i) => {
        if (strength > 0.9 || (strength > 0.5 && Math.random() < strength)) return char;
        return chars[Math.floor(Math.random() * chars.length)];
    }).join('');

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-zinc-950 border border-zinc-800 rounded-3xl p-6 relative overflow-hidden group select-none"
        >
            {/* Dynamic Background Noise */}
            <div
                className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none transition-opacity duration-300"
                style={{ opacity: 0.2 - (strength * 0.15) }}
            />
            <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-opacity duration-500 ${isLocked ? "opacity-100 shadow-[0_0_20px_#6366f1]" : "opacity-20"}`}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

                {/* Tuner Controls */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isLocked ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-zinc-700 bg-zinc-900"}`}>
                        <div className={`w-3 h-3 rounded-full transition-colors ${isLocked ? "bg-emerald-400 animate-ping" : "bg-red-500/50"}`} />
                    </div>
                    <div className="flex-1 md:w-48">
                        <div className="flex justify-between text-[10px] font-mono text-zinc-500 mb-2 uppercase">
                            <span>Tuning...</span>
                            <span>{tuning.toFixed(1)} MHz</span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="108"
                            value={tuning}
                            onChange={(e) => setTuning(parseFloat(e.target.value))}
                            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        />
                    </div>
                </div>

                {/* Message Display */}
                <div className="flex-1 text-center">
                    <p className="text-xs font-mono text-zinc-500 mb-1 uppercase tracking-widest">
                        {isLocked ? `Signal Locked: ${bestMatch.freq} MHz` : "Searching Frequency..."}
                    </p>
                    <h3 className={`text-2xl md:text-3xl font-black font-mono tracking-widest transition-colors duration-300 ${isLocked ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-zinc-600 blur-[1px]"}`}>
                        {displayMessage}
                    </h3>
                </div>

                {/* Signal Meter */}
                <div className="hidden md:flex items-end gap-1 h-10 w-24 opacity-80">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-sm transition-all duration-200 ${strength * 10 > i ? (isLocked ? "bg-emerald-500 shadow-[0_0_5px_#10b981]" : "bg-indigo-500") : "bg-zinc-800"}`}
                            style={{ height: `${(i + 1) * 10}%` }}
                        />
                    ))}
                </div>

            </div>

            {/* Presets Footer */}
            <div className="mt-6 pt-4 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                {stations.map((s) => (
                    <button
                        key={s.freq}
                        onClick={() => setTuning(s.freq)}
                        className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all border ${Math.abs(tuning - s.freq) < 0.5
                            ? "bg-emerald-500/20 border-emerald-500 text-emerald-400"
                            : "bg-zinc-900/50 border-zinc-800 text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300"
                            }`}
                    >
                        <span className="mr-2 opacity-50">FREQ</span>
                        {s.freq} MHz
                    </button>
                ))}
            </div>
        </motion.div>
    );
}

function ResumeCard() {
    return (
        <motion.a
            href={profile.resumeUrl || "#"}
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between group no-underline"
        >
            {/* Hover Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between relative z-10">
                <div className="w-10 h-10 rounded-xl bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center group-hover:bg-indigo-500 group-hover:scale-110 transition-all duration-300">
                    <FileText className="w-5 h-5 text-zinc-500 dark:text-zinc-400 group-hover:text-white" />
                </div>
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 border border-zinc-300/50 dark:border-zinc-700/50">
                    <Shield className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-mono font-bold text-zinc-500 dark:text-zinc-400 uppercase">Verified</span>
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 mt-2">
                <h3 className="text-xl font-bold text-zinc-800 dark:text-white leading-tight group-hover:text-indigo-500 transition-colors">
                    Curriculum<br />Vitae_2024
                </h3>
            </div>

            {/* Footer / Action */}
            <div className="relative z-10 flex items-center justify-between mt-4">
                <div className="flex flex-col">
                    <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider">File Size</span>
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">2.4 MB</span>
                </div>

                <div className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center group-hover:bg-indigo-500 group-hover:border-indigo-500 transition-all duration-300">
                    <Download className="w-4 h-4 text-zinc-400 group-hover:text-white" />
                </div>
            </div>

            {/* Progress Bar Animation on Hover */}
            <div className="absolute bottom-0 left-0 h-1 bg-indigo-500 w-0 group-hover:w-full transition-all duration-700 ease-out" />
        </motion.a>
    )
}
