import { motion } from "framer-motion";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import projects from "../data/projects.json";

export default function FeaturedProjects() {
    const featured = projects.filter(p => p.featured);

    return (
        <section className="w-full max-w-7xl mx-auto px-6 pb-20 pt-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-heading mb-4">
                        Selected <span className="text-indigo-500">Works</span>
                    </h2>
                    <p className="text-zinc-500 dark:text-zinc-400 max-w-md">
                        A curated selection of projects that demonstrate my technical expertise.
                    </p>
                </motion.div>

                <motion.a
                    href="/projects"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:text-indigo-500 transition-colors"
                >
                    View All Projects
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featured.map((project, index) => (
                    <FeaturedCard key={project.title} project={project} index={index} />
                ))}
            </div>
        </section>
    );
}

function FeaturedCard({ project, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 hover:-translate-y-2"
        >
            {/* Top Banner (Tech Gradient) */}
            <div className="h-2 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

            <div className="p-8 flex flex-col flex-1">
                {/* Category Badge */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.category.map((cat) => (
                        <span key={cat} className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full">
                            {cat}
                        </span>
                    ))}
                </div>

                <h3 className="text-2xl font-bold font-heading text-zinc-900 dark:text-white mb-3 group-hover:text-indigo-500 transition-colors">
                    {project.title}
                </h3>

                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6 line-clamp-3">
                    {project.description}
                </p>

                <div className="mt-auto pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                    <div className="flex gap-4">
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                            title="View Source"
                        >
                            <Github className="w-5 h-5" />
                        </a>
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                                title="Live Demo"
                            >
                                <ExternalLink className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                    <span className="text-xs font-mono text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
                        EXPLORE &rarr;
                    </span>
                </div>
            </div>
        </motion.div>
    );
}
