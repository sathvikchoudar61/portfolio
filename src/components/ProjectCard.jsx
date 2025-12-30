import { motion } from "framer-motion";
import { ArrowUpRight, Github, Code2, Terminal, Globe, Smartphone, Monitor } from "lucide-react";

export default function ProjectCard({ project, onClick, layoutId }) {
    // Dynamic Icon Selection
    const getProjectIcon = () => {
        const cats = project.category.join(" ");
        if (cats.includes("Frontend") || cats.includes("React")) return <Globe className="w-6 h-6 text-primary" />;
        if (cats.includes("Backend") || cats.includes("Java") || cats.includes("Node")) return <Terminal className="w-6 h-6 text-primary" />;
        if (cats.includes("Desktop") || cats.includes("Python")) return <Monitor className="w-6 h-6 text-primary" />;
        if (cats.includes("Mobile")) return <Smartphone className="w-6 h-6 text-primary" />;
        return <Code2 className="w-6 h-6 text-primary" />;
    };

    return (
        <motion.div
            layoutId={layoutId}
            onClick={onClick}
            initial={{}}
            whileHover={{ y: -5 }}
            className="group cursor-pointer relative flex flex-col justify-between overflow-hidden rounded-3xl bg-card border border-border/50 p-6 hover:border-primary/50 transition-colors shadow-sm"
        >
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-full bg-secondary group-hover:bg-primary/20 transition-colors">
                        {getProjectIcon()}
                    </div>
                    <ArrowUpRight className="text-muted-foreground group-hover:text-primary transition-colors" />
                </div>

                <h3 className="text-2xl font-bold font-heading mb-2 text-card-foreground group-hover:text-primary transition-colors">
                    {project.title}
                </h3>

                <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
                    {project.description}
                </p>
            </div>

            <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.split(',').map((tech, i) => (
                    <span
                        key={i}
                        className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border/50"
                    >
                        {tech.trim()}
                    </span>
                ))}
            </div>

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </motion.div>
    );
}
