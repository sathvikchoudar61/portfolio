import { Github, Linkedin, Mail, Instagram, Send } from "lucide-react";
import { SiLeetcode, SiCodechef, SiHackerrank, SiCodeforces } from "react-icons/si";
import profile from "../data/profile.json";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200 dark:border-white/5 pt-8 pb-32 bg-white/50 dark:bg-black/20 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* BRAND / COPYRIGHT */}
        <div className="text-zinc-600 dark:text-zinc-400 text-xs font-mono flex items-center gap-2">
          <span className="font-bold">{profile.name}</span>
          <span className="text-zinc-400 dark:text-zinc-600">•</span>
          <span>© {currentYear}</span>
        </div>

        {/* COMPACT SOCIALS */}
        <div className="flex items-center gap-4">
          {profile.socials.map((social) => (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="text-zinc-400 hover:text-indigo-500 transition-colors"
              aria-label={social.platform}
            >
              <FooterIcon icon={getSocialIcon(social.platform)} />
            </a>
          ))}
          <div className="w-px h-3 bg-zinc-300 dark:bg-zinc-800 mx-1" />
          <a href={`mailto:${profile.email}`} className="text-zinc-400 hover:text-indigo-500 transition-colors">
            <Mail className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
}

function FooterIcon({ icon: Icon }) {
  if (!Icon) return null;
  return <Icon className="w-4 h-4" />
}

function getSocialIcon(platform) {
  const p = platform.toLowerCase();
  if (p.includes("github")) return Github;
  if (p.includes("linkedin")) return Linkedin;
  if (p.includes("instagram")) return Instagram;
  if (p.includes("telegram")) return Send;
  if (p.includes("leetcode")) return SiLeetcode;
  if (p.includes("codechef")) return SiCodechef;
  if (p.includes("hackerrank")) return SiHackerrank;
  if (p.includes("codeforces")) return SiCodeforces;
  return null;
}
