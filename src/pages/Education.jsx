import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

import timeline from "../data/timeline.json";

export default function Education() {
  return (
    <section className="min-h-screen pt-20 pb-40 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-bold font-heading mb-6 tracking-tight text-zinc-900 dark:text-white">
            Academic <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-violet-400 dark:to-indigo-400">Foundation.</span>
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-lg max-w-2xl mx-auto">
            My educational journey, visualized.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {timeline.education.map((edu, index) => (
            <EducationCard key={edu.id} edu={edu} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationCard({ edu, index }) {
  const isFirst = index === 0;

  // Dynamic color mapping based on data or default
  const colorMap = {
    violet: "violet",
    blue: "blue",
    emerald: "emerald",
    default: "zinc"
  };
  const c = colorMap[edu.color] || colorMap.default;

  return (
    <div className={`${isFirst ? "md:col-span-2 h-[400px]" : "h-[350px]"}`}>
      <TiltCard>
        <div className="relative h-full p-8 md:p-10 flex flex-col justify-between z-20">
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <span className={`px-3 py-1 bg-${c}-500/10 text-${c}-600 dark:text-${c}-300 text-xs font-bold uppercase tracking-widest rounded-full border border-${c}-500/20`}>
                {edu.type}
              </span>
              <h3 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white font-heading">
                {edu.title}
              </h3>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {edu.institution}
              </p>
            </div>
            {edu.year && (
              <div className="hidden md:block text-right">
                <div className="text-7xl font-bold text-zinc-900/5 dark:text-white/5 font-heading text-nowrap">{edu.year}</div>
              </div>
            )}
          </div>

          <div className="flex items-end justify-between border-t border-zinc-200 dark:border-white/5 pt-6 mt-4">
            <div className="space-y-4">
              {isFirst && (
                <p className="text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed text-lg hidden md:block">
                  {edu.description}
                </p>
              )}
              <span className="text-zinc-500 text-sm flex items-center gap-2">
                <Calendar className="w-4 h-4" /> {edu.period}
              </span>
            </div>

            <div className="flex flex-col items-end gap-2">
              <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{edu.scoreLabel}</span>
              <div className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white font-heading tracking-tight">
                {edu.score}
              </div>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  )
}

const ROTATION_RANGE = 20;
const HALF_ROTATION_RANGE = ROTATION_RANGE / 2;

const TiltCard = ({ children }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const xSpring = useSpring(x);
  const ySpring = useSpring(y);

  const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

  const handleMouseMove = (e) => {
    if (!ref.current) return [0, 0];

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
    const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

    const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
    const rY = mouseX / width - HALF_ROTATION_RANGE;

    x.set(rX);
    y.set(rY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform,
      }}
      className="relative w-full h-full rounded-3xl bg-white/60 dark:bg-zinc-900/40 border border-zinc-200 dark:border-white/10 overflow-hidden backdrop-blur-md group shadow-lg dark:shadow-none"
    >
      <div
        style={{
          transform: "translateZ(50px)",
          transformStyle: "preserve-3d",
        }}
        className="absolute inset-4 rounded-2xl border border-zinc-200 dark:border-white/5 bg-white/40 dark:bg-black/20 z-10 p-0"
      >
        {children}
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    </motion.div>
  );
};
