import Header from "../components/Header";
import Dock from "../components/Dock";
import CursorGlow from "../components/CursorGlow";
import GraffitiBoard from "../components/GraffitiBoard";
import { usePlayground } from "../context/PlaygroundContext";
import Footer from "../components/Footer";

export default function MainLayout({ children }) {
  const { isGraffitiMode, setIsGraffitiMode } = usePlayground();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 relative overflow-x-hidden">
      {/* Background Gradient spots */}
      {/* Animated Aurora Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vh] bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-300 dark:from-indigo-800 dark:via-purple-900 dark:to-indigo-800 opacity-50 dark:opacity-30 filter blur-[100px] animate-aurora" />
        <div className="absolute top-0 right-0 w-[50vw] h-[50vh] bg-blue-200 dark:bg-blue-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-overlay animate-pulse" />
        <div className="absolute bottom-0 left-0 w-[50vw] h-[50vh] bg-purple-200 dark:bg-purple-900/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-overlay animate-pulse delay-1000" />
      </div>

      <CursorGlow />
      <GraffitiBoard isOpen={isGraffitiMode} onClose={() => setIsGraffitiMode(false)} />

      <Header />

      <main className="relative z-10 w-full min-h-screen flex flex-col">
        {children}
      </main>

      <Footer />

      <Dock />
    </div>
  );
}
