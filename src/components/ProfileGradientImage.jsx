import { motion } from "framer-motion";

export default function ProfileGradientImage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className="
        relative
        w-[300px] md:w-[340px]
        h-[420px]
        rounded-2xl
        overflow-hidden
        shadow-[0_0_60px_rgba(139,94,52,0.35)]
      "
    >
      {/* IMAGE */}
      <img
        src="/profile.jpg"
        alt="Profile"
        className="w-full h-full object-cover"
      />

      {/* GRADIENT REVEAL MASK */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-r
          from-transparent
          via-black/10
          to-black
        "
        style={{
          maskImage:
            "linear-gradient(to right, black 55%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, black 55%, transparent 100%)"
        }}
      />

      {/* SOFT EDGE GLOW */}
      <div className="
        absolute inset-0
        bg-gradient-to-r
        from-transparent
        to-brown/40
        pointer-events-none
      " />

      {/* GLASS FINISH */}
      <div className="
        absolute inset-0
        bg-white/5
        backdrop-blur-[1px]
        pointer-events-none
      " />
    </motion.div>
  );
}
