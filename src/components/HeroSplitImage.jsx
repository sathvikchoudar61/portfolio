import { motion } from "framer-motion";

export default function HeroSplitImage() {
  return (
    <div className="relative w-[300px] md:w-[340px] h-[420px]">

      {/* BASE IMAGE */}
      <img
        src="/profile.jpg"
        alt="Profile"
        className="absolute inset-0 w-full h-full object-cover rounded-2xl"
      />

      {/* TOP SLICE */}
      <motion.div
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9 }}
        className="absolute inset-0"
        style={{ clipPath: "polygon(0 0,100% 0,100% 33%,0 33%)" }}
      >
        <img src="/profile.jpg" className="w-full h-full object-cover rounded-2xl" />
      </motion.div>

      {/* MIDDLE SLICE */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.15 }}
        className="absolute inset-0"
        style={{ clipPath: "polygon(0 33%,100% 33%,100% 66%,0 66%)" }}
      >
        <img src="/profile.jpg" className="w-full h-full object-cover rounded-2xl" />
      </motion.div>

      {/* BOTTOM SLICE */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.3 }}
        className="absolute inset-0"
        style={{ clipPath: "polygon(0 66%,100% 66%,100% 100%,0 100%)" }}
      >
        <img src="/profile.jpg" className="w-full h-full object-cover rounded-2xl" />
      </motion.div>

      {/* GLASS OVERLAY */}
      <div className="absolute inset-0 rounded-2xl bg-white/5 backdrop-blur-sm" />
    </div>
  );
}
