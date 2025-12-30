import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import certificatesData from "../data/certificates.json";
import {
  Folder,
  FolderOpen,
  FileCode,
  ExternalLink,
  Search,
  Cpu,
  Shield,
  Database,
  Terminal,
  ChevronRight,
  Maximize2,
  X,
  Star
} from "lucide-react";

// Helper to determine folder based on issuer/content
const getFolder = (cert) => {
  const i = cert.issuer.toLowerCase();

  if (i.includes("ibm")) return "IBM";
  if (i.includes("google")) return "Google";
  if (i.includes("microsoft")) return "Microsoft";
  if (i.includes("mongo")) return "Databases";
  if (i.includes("aws") || i.includes("cloud")) return "Cloud";
  if (i.includes("forage") || i.includes("accenture") || i.includes("bcg")) return "Simulations";
  if (i.includes("coursera") || i.includes("udemy")) return "Courseware";
  if (i.includes("university") || i.includes("iit") || i.includes("nptel")) return "Academic";

  return "Miscellaneous";
};

// Map folders to icons
const FolderIcons = {
  "All": Folder,
  "Starred": Star,
  "IBM": Cpu,
  "Databases": Database,
  "Simulations": Terminal,
  "Courseware": FileCode,
  "Academic": Shield,
  "Miscellaneous": Folder
};

// Variants for container stagger
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: 0.2 }
  }
};

export default function Certificates() {
  const [selectedFolder, setSelectedFolder] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCert, setSelectedCert] = useState(null);

  // Process data to groups
  const { folders, filteredCerts } = useMemo(() => {
    const groups = { "All": [], "Starred": [] };

    certificatesData.forEach(cert => {
      groups["All"].push(cert);

      // Check for starred
      if (cert.starred) {
        groups["Starred"].push(cert);
      }

      const folder = getFolder(cert);
      if (!groups[folder]) groups[folder] = [];
      groups[folder].push(cert);
    });

    // Sort All files to show starred first
    groups["All"].sort((a, b) => (b.starred ? 1 : 0) - (a.starred ? 1 : 0));

    const activeCerts = groups[selectedFolder] || [];
    const filtered = activeCerts.filter(c =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return {
      // Filter out Starred from the dynamic folders list since we manually place it
      folders: Object.keys(groups).filter(k => k !== "All" && k !== "Starred").sort(),
      filteredCerts: filtered
    };
  }, [selectedFolder, searchQuery]);

  return (
    <section className="min-h-screen pt-24 pb-20 px-4 md:px-8 max-w-7xl mx-auto flex flex-col h-screen">
      {/* OS HEADER */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6 bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/10 p-4 rounded-2xl backdrop-blur-md shadow-sm dark:shadow-none"
      >
        <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-sm font-mono overflow-hidden whitespace-nowrap">
          <span className="text-zinc-400 dark:text-zinc-600">root</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-zinc-400 dark:text-zinc-600">certificates</span>
          <ChevronRight className="w-4 h-4" />
          <AnimatePresence mode="wait">
            <motion.span
              key={selectedFolder}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="text-indigo-600 dark:text-indigo-400 font-bold"
            >
              {selectedFolder.toLowerCase()}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 dark:text-zinc-500" />
          <input
            type="text"
            placeholder="Search protocol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-800 dark:text-white focus:outline-none focus:border-indigo-500 transition-colors shadow-sm dark:shadow-none"
          />
        </div>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-6 flex-1 min-h-0">

        {/* SIDEBAR */}
        <motion.div
          className="w-full md:w-64 shrink-0 flex flex-col gap-2 overflow-y-auto pr-2"
        >
          <SidebarItem
            name="All Files"
            count={certificatesData.length}
            active={selectedFolder === "All"}
            icon={Folder}
            onClick={() => setSelectedFolder("All")}
          />

          <SidebarItem
            name="Starred"
            count={certificatesData.filter(c => c.starred).length}
            active={selectedFolder === "Starred"}
            icon={Star}
            onClick={() => setSelectedFolder("Starred")}
            className={selectedFolder === "Starred" ? "text-yellow-500" : ""}
          />

          <div className="h-px bg-zinc-200 dark:bg-white/5 my-2 mx-4" />

          <div className="text-xs font-bold text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-4 mb-2">Drive C:</div>

          {folders.map(folder => {
            const Icon = FolderIcons[folder] || Folder;
            return (
              <SidebarItem
                key={folder}
                name={folder}
                count={certificatesData.filter(c => getFolder(c) === folder).length}
                active={selectedFolder === folder}
                icon={Icon}
                onClick={() => setSelectedFolder(folder)}
              />
            );
          })}
        </motion.div>

        {/* MAIN GRID */}
        <div className="flex-1 bg-white/40 dark:bg-zinc-900/30 border border-zinc-200 dark:border-white/5 rounded-3xl p-6 overflow-y-auto min-h-[500px] relative shadow-inner dark:shadow-none">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedFolder}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10"
          >
            {filteredCerts.map((cert) => (
              <CertCard
                key={cert.title}
                cert={cert}
                onClick={() => setSelectedCert(cert)}
              />
            ))}
          </motion.div>

          {filteredCerts.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
              <FolderOpen className="w-16 h-16 mb-4 opacity-20" />
              <p>No data cartridges found.</p>
            </div>
          )}
        </div>
      </div>

      {/* IMAGE PREVIEW MODAL */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 dark:bg-black/80 backdrop-blur-xl"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              layoutId={`cert-card-${selectedCert.title}`}
              className="relative max-w-4xl w-full max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-zinc-200 dark:border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2 h-full">
                {/* Image Side */}
                <div className="bg-zinc-100 dark:bg-black/50 p-8 flex items-center justify-center">
                  <motion.img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="w-full h-auto rounded-lg shadow-lg object-contain max-h-[70vh]"
                    layoutId={`cert-image-${selectedCert.title}`}
                  />
                </div>

                {/* Info Side */}
                <div className="p-8 flex flex-col justify-center h-full bg-white dark:bg-zinc-900">
                  <h2 className="text-3xl font-bold font-heading mb-2 text-zinc-900 dark:text-white flex items-center gap-2">
                    {selectedCert.title}
                    {selectedCert.starred && <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />}
                  </h2>
                  <p className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-6">
                    {selectedCert.issuer}
                  </p>

                  <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-3 text-zinc-500 dark:text-zinc-400">
                      <Folder className="w-5 h-5" />
                      <span>Issued: {selectedCert.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCert.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-full text-sm text-zinc-600 dark:text-zinc-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {selectedCert.verifyLink && (
                    <a
                      href={selectedCert.verifyLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all transform hover:scale-105"
                    >
                      Verify Credential <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

function SidebarItem({ name, count, active, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-left transition-all group ${active
        ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-500/20 shadow-sm"
        : "hover:bg-zinc-100 dark:hover:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border border-transparent"
        }`}
    >
      <div className="flex items-center gap-3">
        <Icon className={`w-4 h-4 ${active ? (name === "Starred" ? "text-yellow-500 fill-yellow-500" : "text-indigo-600 dark:text-indigo-400") : "text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300"}`} />
        <span className="font-medium text-sm">{name}</span>
      </div>
      <span className="text-xs font-mono bg-zinc-200 dark:bg-white/5 px-1.5 py-0.5 rounded text-zinc-500 group-hover:bg-zinc-300 dark:group-hover:bg-white/10 transition-colors">
        {count}
      </span>
    </button>
  );
}

function CertCard({ cert, onClick }) {
  return (
    <motion.div
      layoutId={`cert-card-${cert.title}`}
      variants={itemVariants}
      onClick={onClick}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group relative bg-white dark:bg-black/40 border border-zinc-200 dark:border-white/10 hover:border-indigo-500/30 rounded-xl overflow-hidden backdrop-blur-sm flex flex-col shadow-sm dark:shadow-none cursor-pointer transition-colors duration-300"
    >
      {/* Image Preview Window */}
      <div className="h-32 bg-zinc-100 dark:bg-white/5 overflow-hidden relative">
        <motion.img
          src={cert.image}
          alt={cert.title}
          layoutId={`cert-image-${cert.title}`}
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />

        <div className="absolute top-2 right-2 flex gap-1">
          {cert.starred && (
            <div className="bg-black/50 backdrop-blur-sm p-1.5 rounded-full text-yellow-500">
              <Star className="w-3 h-3 fill-yellow-500" />
            </div>
          )}
        </div>

        <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-black/50 backdrop-blur-sm p-2 rounded-full text-white">
            <Maximize2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col">
        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-1 leading-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-200 transition-colors flex items-center gap-2">
          {cert.title}
        </h3>
        <p className="text-xs font-mono text-zinc-500 mb-4 uppercase tracking-wide">
          {cert.issuer} • {cert.date}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {cert.tags.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] uppercase font-bold px-2 py-1 bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 rounded border border-zinc-200 dark:border-white/5">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
