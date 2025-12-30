import { motion, AnimatePresence } from "framer-motion";

export default function CertificateModal({ cert, onClose }) {
  if (!cert) return null;

  return (
    <AnimatePresence>
      {/* OVERLAY */}
      <motion.div
        className="
          fixed inset-0 z-40
          bg-black/60 backdrop-blur-sm
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* MODAL WRAPPER (RESPECT HEADER) */}
      <motion.div
        className="
          fixed inset-x-0 top-[72px] bottom-6
          z-50
          flex justify-center
          overflow-y-auto
          px-4
        "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {/* MODAL */}
        <div
          className="
            relative
            w-full max-w-2xl
            bg-white/10 backdrop-blur-xl
            border border-white/20
            rounded-2xl
            p-6 md:p-8
            text-white
            shadow-[0_0_45px_rgba(139,94,52,0.35)]
            my-auto
          "
          onClick={(e) => e.stopPropagation()}
        >
          {/* CLOSE */}
          <button
            onClick={onClose}
            className="
              absolute top-4 right-4
              text-gray-300 hover:text-white
              text-xl
            "
          >
            ✕
          </button>

          {/* HEADER */}
          <div className="mb-5">
            <h3 className="text-2xl font-semibold">
              {cert.title}
            </h3>
            <p className="text-zinc-400 mt-1">
              {cert.issuer} · {cert.date}
            </p>
          </div>

          {/* IMAGE CARD */}
          <div className="bg-white rounded-xl p-3 mb-6">
            <img
              src={cert.image}
              alt={cert.title}
              className="
                w-full
                max-h-[420px]
                object-contain
                rounded-lg
              "
            />
          </div>

          {/* TAGS */}
          <div className="flex flex-wrap gap-2 mb-4">
            {cert.tags.map((tag) => (
              <span
                key={tag}
                className="
                  px-3 py-1 text-xs
                  rounded-full
                  bg-white/15
                  border border-white/20
                  text-gray-200
                "
              >
                {tag}
              </span>
            ))}
          </div>

          {/* LINK */}
          {cert.verifyLink && (
            <a
              href={cert.verifyLink}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-400 hover:underline text-sm"
            >
              View Credential →
            </a>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
