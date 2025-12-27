import { motion } from "framer-motion";
import GravitySkills from "../components/GravitySkills";

import skills from "../data/skills.json";

const skillsData = skills.categories; // Map new JSON structure to match component logic

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Skills() {
  return (
    <section className="min-h-screen pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4">
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            The tools and technologies I use to build digital products.
          </p>
        </motion.div>

        {/* Static Clean List */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
        >
          {skillsData.map((group) => (
            <motion.div
              key={group.category}
              variants={item}
              className="p-8 rounded-3xl bg-card border border-border/50 hover:border-primary/20 transition-colors backdrop-blur-sm shadow-sm"
            >
              <h3 className="text-xl font-semibold mb-6 text-primary">
                {group.name}
              </h3>
              <div className="flex flex-wrap gap-3">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-secondary text-secondary-foreground border border-border/50 hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Interactive Section Divider */}
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px bg-border flex-1" />
          <span className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">Interactive Playground</span>
          <div className="h-px bg-border flex-1" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <GravitySkills />
        </motion.div>
      </div>
    </section>
  );
}
