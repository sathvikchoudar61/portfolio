import { motion } from "framer-motion";
import { Mail, MapPin, ArrowUpRight, Copy, Check, Download, FileText, Shield, Folder, File, Image as ImageIcon, X, Maximize2, Minus } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode, SiInstagram, SiTelegram, SiCodeforces, SiCodechef, SiHackerrank, SiSpotify } from "react-icons/si";
import { useState, useEffect } from "react";
import profile from "../data/profile.json";
import documentsData from "../data/documents.json";

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
                    className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                    <div>
                        <div className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                            <MapPin className="w-5 h-5 text-indigo-500" />
                        </div>
                        <h4 className="text-zinc-500 dark:text-zinc-400 text-xs uppercase tracking-wider font-bold mb-1">Based In</h4>
                        <p className="text-zinc-900 dark:text-white font-medium text-lg">{profile.location.split(',')[0]}</p>
                        <p className="text-zinc-500 text-sm">{profile.location.split(',')[1]}</p>
                    </div>

                    <div className="mt-8">
                        <div className="w-full h-32 rounded-xl bg-zinc-200 dark:bg-zinc-800/50 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/78.4867,17.3850,11,0/300x200?access_token=YOUR_TOKEN')] bg-cover bg-center grayscale opacity-50 relative overflow-hidden border border-zinc-300 dark:border-zinc-700/50">
                            {/* Placeholder pattern since no map token */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* 4. TUNER MODULE (Replaces Spotify) */}
                <TunerModule />

                {/* 5. FOLDER MODULE (Replaces Resume) */}
                <FolderModule />

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
                                className="group bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-indigo-500/50 p-4 rounded-2xl flex items-center justify-between hover:bg-zinc-100 dark:hover:bg-zinc-800/50 transition-all cursor-pointer"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-200 dark:bg-zinc-800 group-hover:bg-indigo-500/10 rounded-lg transition-colors">
                                        <Icon className="w-5 h-5 text-zinc-600 dark:text-zinc-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
                                    </div>
                                    <span className="text-zinc-700 dark:text-zinc-300 font-medium text-sm group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{social.platform}</span>
                                </div>
                                <ArrowUpRight className="w-4 h-4 text-zinc-500 dark:text-zinc-600 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
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
            className="md:col-span-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden group select-none shadow-sm dark:shadow-none"
        >
            {/* Dynamic Background Noise */}
            <div
                className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none transition-opacity duration-300 opacity-10 dark:opacity-20"
                style={{ opacity: isLocked ? 0.05 : 0.1 }}
            />
            <div
                className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent transition-opacity duration-500 ${isLocked ? "opacity-100 shadow-[0_0_20px_#6366f1]" : "opacity-20"}`}
            />

            <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">

                {/* Tuner Controls */}
                <div className="flex items-center gap-6 w-full md:w-auto">
                    <div className={`w-14 h-14 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${isLocked ? "border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.3)]" : "border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900"}`}>
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
                            className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-indigo-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                        />
                    </div>
                </div>

                {/* Message Display */}
                <div className="flex-1 text-center">
                    <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-1 uppercase tracking-widest">
                        {isLocked ? `Signal Locked: ${bestMatch.freq} MHz` : "Searching Frequency..."}
                    </p>
                    <h3 className={`text-2xl md:text-3xl font-black font-mono tracking-widest transition-colors duration-300 ${isLocked ? "text-indigo-600 dark:text-white drop-shadow-[0_0_10px_rgba(99,102,241,0.2)] dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" : "text-zinc-300 dark:text-zinc-600 blur-[1px]"}`}>
                        {displayMessage}
                    </h3>
                </div>

                {/* Signal Meter */}
                <div className="hidden md:flex items-end gap-1 h-10 w-24 opacity-80">
                    {[...Array(10)].map((_, i) => (
                        <div
                            key={i}
                            className={`flex-1 rounded-sm transition-all duration-200 ${strength * 10 > i ? (isLocked ? "bg-emerald-500 shadow-[0_0_5px_#10b981]" : "bg-indigo-500") : "bg-zinc-200 dark:bg-zinc-800"}`}
                            style={{ height: `${(i + 1) * 10}%` }}
                        />
                    ))}
                </div>

            </div>

            {/* Presets Footer */}
            <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-white/5 grid grid-cols-2 md:grid-cols-4 gap-3 relative z-10">
                {stations.map((s) => (
                    <button
                        key={s.freq}
                        onClick={() => setTuning(s.freq)}
                        className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all border ${Math.abs(tuning - s.freq) < 0.5
                            ? "bg-emerald-500/10 border-emerald-500 text-emerald-600 dark:text-emerald-400"
                            : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-700 dark:hover:text-zinc-300"
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

const SpotifyCard = () => {
    return (
        <motion.a
            href="https://open.spotify.com/user/your-spotify-id"
            target="_blank"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden group cursor-pointer"
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-green-500/30 transition-all duration-500" />

            <div className="relative z-10 flex items-center justify-between h-full">
                <div className="flex items-center gap-6">
                    <div className="w-20 h-20 rounded-xl bg-zinc-800 relative overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300">
                        {profile.spotify?.albumArt ? (
                            <img
                                src={profile.spotify.albumArt}
                                alt="Album Art"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-900">
                                <SiSpotify className="w-8 h-8 text-green-500" />
                            </div>
                        )}

                        {profile.spotify?.isPlaying && (
                            <div className="absolute bottom-2 right-2 flex gap-0.5">
                                <span className="w-1 h-3 bg-green-500 rounded-full animate-[bounce_1s_infinite]" />
                                <span className="w-1 h-4 bg-green-500 rounded-full animate-[bounce_1.2s_infinite]" />
                                <span className="w-1 h-2 bg-green-500 rounded-full animate-[bounce_0.8s_infinite]" />
                            </div>
                        )}
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <SiSpotify className="w-4 h-4 text-green-500" />
                            <span className="text-[10px] font-bold tracking-wider text-green-500 uppercase">
                                {profile.spotify?.isPlaying ? "Now Playing" : "Spotify"}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-green-500 dark:group-hover:text-green-400 transition-colors">
                            {profile.spotify?.song || "Not Playing"}
                        </h3>
                        <p className="text-zinc-500 text-sm font-medium">
                            {profile.spotify?.artist || "Spotify"}
                        </p>
                    </div>
                </div>

                {/* Progress Bar Visual (Static for now) */}
                <div className="hidden md:flex flex-col gap-2 w-32">
                    <div className="w-full h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                        <div className="w-2/3 h-full bg-green-500 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500 dark:text-zinc-600 font-mono">
                        <span>1:24</span>
                        <span>3:42</span>
                    </div>
                </div>
            </div>
        </motion.a>
    );
};

const FolderModule = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const documents = documentsData || [];
    const filteredDocs = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                onClick={() => setIsOpen(true)}
                className="md:col-span-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center gap-4 group cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
            >
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

                <div className="w-20 h-20 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform duration-300">
                    <Folder className="w-10 h-10 fill-current" />
                </div>

                <div className="text-center relative z-10">
                    <h4 className="font-bold text-lg text-zinc-800 dark:text-zinc-200 group-hover:text-blue-500 transition-colors">Documents</h4>
                    <p className="text-xs text-zinc-500 font-medium">{documentsData?.length || 0} Files • 24MB</p>
                </div>
            </motion.div>

            {/* FILE MANAGER MODAL */}
            {/* CUSTOM FILE MANAGER MODAL */}
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-3xl bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Custom Header */}
                        <div className="h-14 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6 select-none">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Folder className="w-4 h-4 text-blue-500" />
                                <span className="font-medium text-sm text-zinc-600 dark:text-zinc-300">~/public/items</span>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 -mr-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Toolbar */}
                        <div className="h-12 border-b border-zinc-200 dark:border-zinc-800 flex items-center px-6 gap-4 bg-white/50 dark:bg-zinc-900/50">
                            <div className="flex gap-2">
                                <button className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <ArrowUpRight className="w-4 h-4 rotate-180" />
                                </button>
                                <button className="p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-white transition-colors">
                                    <ArrowUpRight className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800" />
                            <div className="flex-1 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 h-8 flex items-center px-3 gap-2 focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all">
                                <span className="text-zinc-400 dark:text-zinc-500"><Folder className="w-3 h-3" /></span>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search assets..."
                                    className="bg-transparent border-none outline-none text-xs text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 dark:placeholder-zinc-600 w-full font-medium"
                                    autoFocus
                                />
                            </div>
                        </div>

                        {/* File Grid */}
                        <div className="flex-1 p-6 overflow-y-auto bg-zinc-50/50 dark:bg-zinc-950/50 custom-scrollbar">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredDocs.map((doc, idx) => (
                                    <a
                                        key={idx}
                                        href={`/${doc.url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 p-3 rounded-xl hover:bg-white dark:hover:bg-zinc-900 border border-transparent hover:border-zinc-200 dark:hover:border-zinc-800 hover:shadow-sm transition-all group/item text-center duration-200"
                                    >
                                        <div className="w-full aspect-square bg-white dark:bg-zinc-900/50 rounded-xl flex items-center justify-center relative border border-zinc-200 dark:border-zinc-800/50 overflow-hidden shadow-sm group-hover/item:shadow-md group-hover/item:border-blue-200 dark:group-hover/item:border-zinc-700 transition-all">
                                            {/* Preview Logic */}
                                            {doc.type === "image" ? (
                                                <img src={`/${doc.url}`} alt={doc.name} className="w-full h-full object-cover opacity-90 group-hover/item:opacity-100 transition-opacity" />
                                            ) : (
                                                <FileText className="w-8 h-8 text-zinc-400 dark:text-zinc-600 group-hover/item:text-blue-500 transition-colors" />
                                            )}
                                        </div>
                                        <div className="w-full">
                                            <p className="text-[11px] font-medium text-zinc-600 dark:text-zinc-400 truncate w-full group-hover/item:text-blue-600 dark:group-hover/item:text-white transition-colors">
                                                {doc.name}
                                            </p>
                                            <p className="text-[10px] text-zinc-400 dark:text-zinc-600 uppercase tracking-wider">{doc.size}</p>
                                        </div>
                                    </a>
                                ))}
                                {filteredDocs.length === 0 && (
                                    <div className="col-span-full flex flex-col items-center justify-center py-10 opacity-50">
                                        <Folder className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-2" />
                                        <p className="text-zinc-400 dark:text-zinc-500 text-sm">No items found</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer Status Bar */}
                        <div className="h-8 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 flex items-center px-6 justify-between select-none">
                            <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                                <span className="text-[10px] text-zinc-500 dark:text-zinc-600 font-medium">Ready</span>
                            </div>
                            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{filteredDocs.length} items</span>
                        </div>

                    </motion.div>
                </div>
            )}
        </>
    );
};

// Deprecated components moved to bottom or removed
// const TunerModule = ... (Removed from render)
// const ResumeCard = ... (Removed from render)
