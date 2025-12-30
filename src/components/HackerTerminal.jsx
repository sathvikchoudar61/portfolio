import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Send, Command, User, Code, Share2, Briefcase, Trash2, Smile, Flame } from "lucide-react";
import profile from "../data/profile.json";

export default function HackerTerminal() {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([
        { type: "system", content: "Initializing SathvikOS v2.0..." },
        { type: "system", content: "Access Granted. Welcome, Guest." },
        { type: "info", content: "Type 'help' to see available commands." },
    ]);
    const [destruct, setDestruct] = useState(false);
    const [matrixMode, setMatrixMode] = useState(false);
    const inputRef = useRef(null);
    const bottomRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        if (matrixMode) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            if (canvas) {
                canvas.width = canvas.parentElement.offsetWidth;
                canvas.height = canvas.parentElement.offsetHeight;
            }

            const columns = Math.floor(canvas.width / 20);
            const drops = Array(columns).fill(1);

            const draw = () => {
                ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);

                ctx.fillStyle = '#0F0';
                ctx.font = '15px monospace';

                for (let i = 0; i < drops.length; i++) {
                    const text = String.fromCharCode(0x30A0 + Math.random() * 96);
                    ctx.fillText(text, i * 20, drops[i] * 20);

                    if (drops[i] * 20 > canvas.height && Math.random() > 0.975)
                        drops[i] = 0;

                    drops[i]++;
                }
            };

            const interval = setInterval(draw, 33);

            const exitMatrix = () => setMatrixMode(false);
            canvas.addEventListener('click', exitMatrix);

            return () => {
                clearInterval(interval);
                canvas.removeEventListener('click', exitMatrix);
            };
        }
    }, [matrixMode]);

    const commands = {
        help: {
            desc: "List available commands",
            action: () => [
                { type: "success", content: "Available Commands:" },
                { type: "info", content: "  whoami    - Who is Sathvik?" },
                { type: "info", content: "  skills    - View technical capabilities" },
                { type: "info", content: "  projects  - List latest builds" },
                { type: "info", content: "  socials   - Connect methods" },
                { type: "info", content: "  sudo hire - Initiate recruitment protocol" },
                { type: "info", content: "  joke      - Tell a Joke" },
                { type: "info", content: "  matrix    - Enter the Matrix" },
                { type: "info", content: "  clear     - Clear terminal" },
            ],
        },
        matrix: {
            desc: "Enter Matrix",
            action: () => {
                setMatrixMode(true);
                return [{ type: "success", content: "Wake up, Neo..." }];
            }
        },
        whoami: {
            desc: "User Bio",
            action: () => [
                { type: "success", content: `User: ${profile.name}` },
                { type: "white", content: profile.tagline },
                { type: "white", content: `Location: ${profile.location}` },
                { type: "white", content: "Role: Full Stack Developer & Competitive Programmer" },
            ],
        },
        skills: {
            desc: "Tech Stack",
            action: () => [
                { type: "success", content: ">> FE: React, Tailwind, Framer Motion, Next.js" },
                { type: "success", content: ">> BE: Node.js, Express, Java, MongoDB, SQL" },
                { type: "success", content: ">> CP: C++ (STL), Python, Algorithms" },
            ],
        },
        projects: {
            desc: "View Projects",
            action: () => [
                { type: "info", content: "Fetching recent repositories..." },
                { type: "white", content: "1. Portfolio v2 (React/Vite)" },
                { type: "white", content: "2. Quiz App Backend (Java)" },
                { type: "white", content: "3. E-Commerce Dashboard (MERN)" },
                { type: "warning", content: "Type 'sudo hire' to discuss these." }
            ]
        },
        socials: {
            desc: "Connect",
            action: () => profile.socials.map(s => ({ type: "link", content: s.url, label: s.platform }))
        },
        "sudo hire": {
            desc: "Hire Me",
            action: () => {
                window.open(`mailto:${profile.email}`, '_blank');
                return [{ type: "success", content: "Opening mail client..." }];
            }
        },
        joke: {
            desc: "Tell a Joke",
            action: () => {
                const jokes = [
                    "Why do programmers prefer dark mode? Because light attracts bugs.",
                    "How many programmers does it take to change a light bulb? None, that's a hardware problem.",
                    "I would tell you a UDP joke, but you might not get it.",
                    "There are 10 types of people in the world: those who understand binary, and those who don't.",
                    "Algorithm: A word used by programmers when they don't want to explain what they did."
                ];
                const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];
                return [{ type: "white", content: randomJoke }];
            }
        },
        "sudo rm -rf /": {
            desc: "DO NOT RUN",
            action: () => {
                setDestruct(true);
                setTimeout(() => {
                    setDestruct(false);
                    setOutput(prev => [...prev, { type: "success", content: "Just kidding! System safe." }]);
                }, 3000); // 3 seconds of panic
                return [{ type: "error", content: "INITIATING SYSTEM DESTRUCTION..." }];
            }
        },
        clear: {
            desc: "Clear Screen",
            action: () => {
                setOutput([]);
                return [];
            },
        },
    };

    const handleCommand = (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        const newOutput = [...output, { type: "command", content: `> ${input}` }];

        if (commands[cmd]) {
            const result = commands[cmd].action();
            if (cmd !== "clear") {
                result.forEach((line) => newOutput.push(line));
                setOutput(newOutput);
                setUserInteracted(true);
            }
        } else {
            newOutput.push({ type: "error", content: `Command not found: ${cmd}. Type 'help'.` });
            setOutput(newOutput);
        }

        setInput("");
    };

    const [userInteracted, setUserInteracted] = useState(false);
    const isMounted = useRef(false);

    useEffect(() => {
        if (!userInteracted) return;
        bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, [output, userInteracted]);

    // Command Helper Card
    const CommandItem = ({ cmd, desc, icon: Icon }) => (
        <button
            onClick={() => {
                setInput(cmd);
                inputRef.current?.focus();
            }}
            className="flex items-center justify-between w-full p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors group text-left"
        >
            <div className="flex items-center gap-2">
                <span className="p-1.5 rounded bg-zinc-200 dark:bg-zinc-800/50 group-hover:bg-zinc-300 dark:group-hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                    <Icon className="w-3 h-3" />
                </span>
                <span className="font-mono text-sm text-zinc-700 dark:text-zinc-300 group-hover:text-black dark:group-hover:text-white font-medium">{cmd}</span>
            </div>
            <span className="text-xs text-zinc-500 dark:text-zinc-600 group-hover:text-zinc-700 dark:group-hover:text-zinc-500">{desc}</span>
        </button>
    )

    return (
        <section className="w-full max-w-7xl mx-auto px-6 mb-0 pt-20">
            {/* DESTRUCT OVERLAY */}
            {destruct && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-red-600 flex items-center justify-center font-mono text-white text-center p-4"
                >
                    <div>
                        <h1 className="text-6xl md:text-9xl font-black mb-4 animate-pulse">CRITICAL ERROR</h1>
                        <p className="text-2xl md:text-4xl font-bold mb-8">DELETING SYSTEM32...</p>
                        <div className="w-full max-w-2xl bg-black h-4 rounded-full overflow-hidden mx-auto border-2 border-white">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 2.5 }}
                                className="h-full bg-white"
                            />
                        </div>
                        <p className="mt-4 text-xl">Please wait...</p>
                    </div>
                </motion.div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* TERMINAL WINDOW */}
                <div className="lg:col-span-2 h-[500px] bg-[#0c0c0c] rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col font-mono text-sm relative group">
                    {/* MATRIX RAIN CANVAS */}
                    {matrixMode && (
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 z-40 bg-black pointer-events-auto cursor-pointer"
                        />
                    )}
                    {/* Title Bar */}
                    <div className="bg-zinc-900/50 px-4 py-2 border-b border-zinc-800 flex items-center justify-between">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <div className="text-xs text-zinc-500 font-medium flex items-center gap-2">
                            <Terminal className="w-3 h-3" />
                            guest@sathvik:~$
                        </div>
                    </div>

                    {/* Output Area */}
                    <div
                        className="flex-1 p-4 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent"
                        onClick={() => inputRef.current?.focus()}
                    >
                        {output.map((line, i) => (
                            <div
                                key={i}
                                className={`
                    ${line.type === "command" ? "text-zinc-500 mt-4 font-bold" : ""}
                    ${line.type === "system" ? "text-blue-400" : ""}
                    ${line.type === "success" ? "text-green-400" : ""}
                    ${line.type === "error" ? "text-red-400" : ""}
                    ${line.type === "warning" ? "text-yellow-400" : ""}
                    ${line.type === "info" ? "text-zinc-400" : ""}
                    ${line.type === "white" ? "text-zinc-200" : ""}
                    ${line.type === "link" ? "text-blue-400 underline cursor-pointer" : ""}
                `}
                            >
                                {line.type === 'link' ? (
                                    <a href={line.content} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-blue-300">
                                        → {line.label} <span className="text-zinc-600 text-[10px] no-underline">({line.content})</span>
                                    </a>
                                ) : line.content}
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleCommand} className="p-4 bg-zinc-900/10 border-t border-zinc-800/50 flex items-center gap-2">
                        <span className="text-green-500 font-bold">➜</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1 bg-transparent outline-none text-green-400 placeholder-zinc-700 font-medium"
                            placeholder="Type a command..."
                        />
                        <button type="submit" className="text-zinc-600 hover:text-green-400 transition-colors">
                            <Send className="w-4 h-4" />
                        </button>
                    </form>
                </div>

                {/* CHEAT SHEET - RIGHT SIDE */}
                <div className="lg:col-span-1 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 rounded-xl p-6"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/10 rounded-lg">
                                <Command className="w-5 h-5 text-green-600 dark:text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">System Commands</h3>
                                <p className="text-xs text-zinc-500">Click to execute</p>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <CommandItem cmd="whoami" desc="Identify User" icon={User} />
                            <CommandItem cmd="skills" desc="Tech Capabilities" icon={Code} />
                            <CommandItem cmd="projects" desc="Recent Deployments" icon={Briefcase} />
                            <CommandItem cmd="socials" desc="Establish Comms" icon={Share2} />
                            <CommandItem cmd="sudo hire" desc="Priority Access" icon={Terminal} />
                            <CommandItem cmd="joke" desc="Random Humor" icon={Smile} />
                            <CommandItem cmd="matrix" desc="Enter the Matrix" icon={Code} />
                            <div className="h-px bg-zinc-800 my-2" />
                            <CommandItem cmd="sudo rm -rf /" desc="DO NOT RUN" icon={Flame} />
                            <CommandItem cmd="clear" desc="Purge Buffer" icon={Trash2} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10 rounded-xl p-6"
                    >
                        <h4 className="text-sm font-bold text-green-600 dark:text-green-500 mb-2">Tip:</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            You can click on any command in the list above to execute it immediately.
                            For a chat, try running <b>sudo hire</b> to open the mail client.
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
