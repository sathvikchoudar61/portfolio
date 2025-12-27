import Hero from "../components/Hero";
import TechMarquee from "../components/TechMarquee";
import GithubGraph from "../components/GithubGraph";
import LeetCodeGraph from "../components/LeetCodeGraph";
import StatsDashboard from "../components/StatsDashboard";
import FeaturedProjects from "../components/FeaturedProjects";
import HackerTerminal from "../components/HackerTerminal";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Hero />
      <div className="relative z-10 -mt-32 pb-20 space-y-12">
        <TechMarquee />
        <GithubGraph />
        <LeetCodeGraph />
        <StatsDashboard />
        <HackerTerminal />
        <FeaturedProjects />
      </div>
    </>
  );
}
