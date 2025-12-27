import { useTheme } from "../context/ThemeContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-24 px-6 md:px-20 flex items-center justify-between bg-white/80 dark:bg-black/60 backdrop-blur-md">
      <h1 className="text-xl font-semibold">Sathvik</h1>

      <div className="flex items-center gap-6">
        {/* your nav links here */}

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="
            px-4 py-2 rounded-xl
            bg-white/20 dark:bg-white/10
            border border-white/20
            text-sm
            hover:shadow-[0_0_12px_rgba(139,94,52,0.4)]
          "
        >
          {theme === "dark" ? "☀ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
}
