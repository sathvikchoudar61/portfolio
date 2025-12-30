import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Mail, Eye, Download } from "lucide-react";
import { SiGithub, SiLinkedin, SiLeetcode, SiCodechef, SiHackerrank, SiCodeforces, SiInstagram, SiTelegram } from "react-icons/si";
import profile from "../data/profile.json";

const iconMap = {
    SiGithub, SiLinkedin, SiLeetcode, SiCodechef, SiHackerrank, SiCodeforces, SiInstagram, SiTelegram
};

export default function Hero() {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 pb-40 overflow-hidden">
            {/* BACKGROUND */}
            <div className="absolute inset-0 z-0">
                {/* Transparent background handled by MainLayout */}
            </div>

            {/* STATUS BADGE */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 mb-8"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/40 dark:bg-zinc-800/40 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-zinc-700 dark:text-zinc-300 uppercase">
                        Open to Work
                    </span>
                </div>
            </motion.div>

            {/* MAIN HEADLINE */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 mb-8"
            >
                <h1 className="text-6xl md:text-8xl font-bold font-heading tracking-tight leading-tight text-zinc-900 dark:text-white">
                    Hi, I'm <br className="md:hidden" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 animate-gradient-x">
                        {profile.name}.
                    </span>
                </h1>
            </motion.div>

            {/* SUBTEXT */}
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="max-w-2xl mx-auto text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10 font-light"
            >
                <span className="font-medium text-zinc-900 dark:text-zinc-200">{profile.role}</span> & <span className="font-medium text-zinc-900 dark:text-zinc-200">{profile.subRole}</span>.
                <br />
                {profile.tagline}
            </motion.p>

            {/* STATS ROW */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="grid grid-cols-3 gap-2 md:gap-12 mb-12 border-y border-zinc-200 dark:border-white/5 py-4 px-2 md:px-6 bg-white/30 dark:bg-black/20 backdrop-blur-sm rounded-2xl w-full max-w-2xl"
            >
                <div>
                    <div className="text-2xl md:text-3xl font-bold font-heading text-zinc-900 dark:text-white">{profile.stats.projects}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Projects</div>
                </div>
                <div>
                    <div className="text-2xl md:text-3xl font-bold font-heading text-zinc-900 dark:text-white">{profile.stats.experience}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Years Exp</div>
                </div>
                <div className="relative group cursor-default">
                    <div className="text-2xl md:text-3xl font-bold font-heading text-zinc-900 dark:text-white">{profile.stats.contributions}</div>
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 font-medium uppercase tracking-wider">Contributions</div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        Driven by caffeine ☕
                    </div>
                </div>
            </motion.div>

            {/* ACTION BUTTONS */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col md:flex-row items-center gap-4 md:gap-6 z-20"
            >
                <div className="flex items-center gap-4">
                    <a
                        href="/projects"
                        className="group relative inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full font-semibold tracking-wide transition-all hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/20 text-sm md:text-base whitespace-nowrap"
                    >
                        View My Work
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    {/* COMPOSITE RESUME BUTTON */}
                    <div className="group relative inline-flex items-center gap-3 px-5 md:px-6 py-3 md:py-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 rounded-full transition-all hover:bg-zinc-50 dark:hover:bg-zinc-700 hover:shadow-lg">
                        <span className="font-semibold tracking-wide">Resume</span>

                        {/* Divider */}
                        <div className="w-px h-5 bg-zinc-300 dark:bg-zinc-600" />

                        <div className="flex items-center gap-3">
                            <a
                                href="/resume.pdf"
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
                                title="View Resume"
                            >
                                <Eye className="w-5 h-5 hover:scale-110 transition-transform" />
                            </a>
                            <a
                                href="/resume.pdf"
                                download="Resume_Sathvik.pdf"
                                className="text-zinc-500 hover:text-indigo-600 dark:text-zinc-400 dark:hover:text-indigo-400 transition-colors"
                                title="Download Resume"
                            >
                                <Download className="w-5 h-5 hover:scale-110 transition-transform" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/5 backdrop-blur-sm">
                    {profile.socials.map((social) => {
                        const Icon = iconMap[social.icon] || Mail;
                        return (
                            <SocialLink key={social.platform} href={social.url} icon={Icon} label={social.platform} />
                        );
                    })}
                    <SocialLink href={`mailto:${profile.email}`} icon={Mail} label="Email" />
                </div>
            </motion.div>
        </section>
    );
}

function SocialLink({ href, icon: Icon, label }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="p-2.5 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all transform hover:scale-110"
            title={label}
        >
            <Icon className="w-5 h-5" />
        </a>
    );
}
