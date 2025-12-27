import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  GraduationCap,
  FolderGit2,
  Cpu,
  Award,
  Mail
} from "lucide-react";
import { cn } from "../lib/utils";

const links = [
  { name: "Home", icon: Home, path: "/" },
  { name: "Education", icon: GraduationCap, path: "/education" },
  { name: "Projects", icon: FolderGit2, path: "/projects" },
  { name: "Skills", icon: Cpu, path: "/skills" },
  { name: "Certificates", icon: Award, path: "/certificates" },
  { name: "Contact", icon: Mail, path: "/contact" },
];

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const location = useLocation();

  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex h-16 items-end gap-4 rounded-2xl border border-black/5 bg-white/50 px-4 pb-3 backdrop-blur-md dark:border-white/10 dark:bg-black/80"
    >
      {links.map((link) => (
        <DockIcon
          key={link.name}
          mouseX={mouseX}
          icon={link.icon}
          path={link.path}
          active={location.pathname === link.path}
          external={link.external}
        />
      ))}
    </motion.div>
  );
}

function DockIcon({ mouseX, icon: Icon, path, active, external }) {
  const ref = useRef(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const Wrapper = external ? 'a' : Link;
  const props = external ? { href: path, target: "_blank", rel: "noreferrer" } : { to: path };

  return (
    <Wrapper {...props}>
      <motion.div
        ref={ref}
        style={{ width }}
        className={cn(
          "aspect-square w-10 rounded-full flex items-center justify-center transition-colors",
          active ? "bg-primary text-white" : "bg-black/5 dark:bg-white/10 text-zinc-600 dark:text-white hover:bg-black/10 dark:hover:bg-white/20"
        )}
      >
        <Icon className="w-5 h-5" />
      </motion.div>
    </Wrapper>
  );
}
