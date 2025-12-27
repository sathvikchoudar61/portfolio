import { motion } from "framer-motion";
import ContactBento from "../components/ContactBento";

export default function Contact() {
  return (
    <section className="min-h-screen pt-12 pb-40 px-4 md:px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 tracking-tight text-zinc-900 dark:text-white">
          Get in <span className="text-indigo-500">Touch</span>
        </h2>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg">
          My inbox is always open.
        </p>
      </motion.div>

      <ContactBento />
    </section>
  );
}
