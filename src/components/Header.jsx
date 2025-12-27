import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { usePlayground } from "../context/PlaygroundContext";
import { Moon, Sun, Rocket, SprayCan } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isZeroGravity, setIsZeroGravity, isGraffitiMode, setIsGraffitiMode } = usePlayground();

  return (
    <header className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
      <Link to="/" className="pointer-events-auto">
        <h1 className="text-2xl font-heading font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-white/60">
          Sathvik
        </h1>
      </Link>

      <div className="flex items-center gap-3 pointer-events-auto">


        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors backdrop-blur-md dark:bg-black/20 dark:border-white/5"
        >
          {theme === "dark" ? <Sun className="w-5 h-5 text-yellow-300" /> : <Moon className="w-5 h-5 text-indigo-400" />}
        </button>
      </div>
    </header>
  );
}
