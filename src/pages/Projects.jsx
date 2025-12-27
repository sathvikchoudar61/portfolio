import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import projects from "../data/projects.json";
import ProjectCard from "../components/ProjectCard";
import { X, Github, ExternalLink } from "lucide-react";

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("All");
  const selectedProject = projects.find(p => p.title === selectedId);

  return (
    <section className="min-h-screen pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
      <div className="flex flex-col items-center mb-16 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
          Featured <span className="text-gradient">Projects</span>
        </h2>
        <p className="text-muted-foreground max-w-xl">
          A collection of projects exploring performance, design, and scalability.
        </p>
      </div>

      <div className="flex justify-center flex-wrap gap-2 mb-12">
        {["All", ...new Set(projects.flatMap(p => p.category))].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${filter === category
              ? "bg-primary text-white shadow-lg shadow-primary/25 scale-105"
              : "bg-secondary text-muted-foreground hover:bg-secondary/80 hover:text-foreground"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
      >
        <AnimatePresence>
          {projects
            .filter((p) => filter === "All" || p.category?.includes(filter))
            .map((project) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                key={project.title}
              >
                <ProjectCard
                  project={project}
                  layoutId={project.title}
                  onClick={() => setSelectedId(project.title)}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {/* EXPANDED CARD MODAL */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              layoutId={selectedId}
              className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <div className="p-8">
                <button
                  onClick={() => setSelectedId(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
                >
                  <X className="w-5 h-5 text-zinc-300" />
                </button>

                <h3 className="text-3xl font-bold font-heading mb-2 text-white">
                  {selectedProject.title}
                </h3>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tech.split(',').map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary border border-primary/20"
                    >
                      {tech.trim()}
                    </span>
                  ))}
                </div>

                <p className="text-zinc-300 leading-relaxed mb-8 text-lg">
                  {selectedProject.description}
                </p>

                <div className="flex gap-4">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-colors"
                  >
                    <Github className="w-5 h-5" /> Source Code
                  </a>

                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-medium transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
