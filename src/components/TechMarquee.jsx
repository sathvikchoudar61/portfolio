import { motion } from "framer-motion";

const technologies = [
    "React", "Next.js", "TypeScript", "Node.js", "Python",
    "Tailwind CSS", "Framer Motion", "PostgreSQL", "MongoDB",
    "Docker", "AWS", "Git", "Figma", "Redux", "GraphQL"
];

export default function TechMarquee() {
    return (
        <div className="w-full overflow-hidden py-10 bg-transparent relative z-10">
            {/* Seamless fading using Mask Image - works on any background */}
            <div
                className="flex"
                style={{
                    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)"
                }}
            >
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="flex gap-8 px-4 whitespace-nowrap"
                >
                    {/* Duplicate list to create seamless loop */}
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <span
                            key={index}
                            className="text-4xl md:text-6xl font-bold text-zinc-900/5 dark:text-zinc-400/10 uppercase tracking-tighter"
                        >
                            {tech}
                        </span>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
