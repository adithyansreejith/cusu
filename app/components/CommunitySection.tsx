"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Users, GraduationCap, Music, Drama, Globe, ArrowUpRight } from "lucide-react";

// Types
interface CommunityItem {
  id: string;
  title: string;
  description: string;
  link: string;
  iconName: string;
}

// JSON Data inside component (or move to a separate JSON file)
const communityData: CommunityItem[] = [
  {
    id: "ug-info",
    title: "UNIVERSITY INFORMATION (UG)",
    description: "Official portal for undergraduate announcements, academic updates, examination schedules, and administrative support.",
    link: "https://dsu.edu.in/ug-info",
    iconName: "GraduationCap",
  },
  {
    id: "dance-club",
    title: "DANCE CLUB",
    description: "Express rhythm and passion. Join our contemporary, hip-hop, and classical dance squads for inter-college fests and workshops.",
    link: "https://dsu.edu.in/clubs/dance",
    iconName: "Music",
  },
  {
    id: "theatre-club",
    title: "THEATRE CLUB",
    description: "Step into the spotlight. Explore stage acting, street plays, scriptwriting, and dramatic production behind the scenes.",
    link: "https://dsu.edu.in/clubs/theatre",
    iconName: "Drama",
  },
  {
    id: "international-community",
    title: "INTERNATIONAL COMMUNITY",
    description: "A home away from home for global students. Cultural exchange, cross-border networking, and international student assistance.",
    link: "https://dsu.edu.in/international",
    iconName: "Globe",
  },
];

// Helper to render dynamic icons safely
const renderIcon = (name: string) => {
  switch (name) {
    case "GraduationCap":
      return <GraduationCap className="w-5 h-5 text-neutral-300" />;
    case "Music":
      return <Music className="w-5 h-5 text-neutral-300" />;
    case "Drama":
      return <Drama className="w-5 h-5 text-neutral-300" />;
    case "Globe":
      return <Globe className="w-5 h-5 text-neutral-300" />;
    default:
      return <Users className="w-5 h-5 text-neutral-300" />;
  }
};

// Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function CommunitySection() {
  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 text-neutral-100 overflow-hidden selection:bg-white/20">
      {/* Background Glow Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-neutral-800 bg-neutral-900/60 backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-neutral-400">
            <Users className="w-4 h-4 text-neutral-300" />
            Connect & Engage
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-linear-to-br from-white via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            CAMPUS COMMUNITIES & CLUBS
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-light leading-relaxed max-w-2xl mx-auto">
            Discover student bodies, academic societies, and cultural forums. Join a community to collaborate, practice, and grow.
          </p>
        </motion.div>

        {/* Communities Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {communityData.map((item) => (
            <motion.div key={item.id} variants={fadeInUp} className="group relative">
              {/* Outer Ambient Hover Glow */}
              <div className="absolute -inset-0.5 rounded-[22px] bg-linear-to-r from-neutral-800 via-neutral-700 to-neutral-800 opacity-0 group-hover:opacity-100 blur-md transition duration-300 pointer-events-none" />

              {/* Outer Border Box */}
              <div className="relative h-full rounded-[22px] border border-neutral-800/80 bg-neutral-900/40 p-2 shadow-xl backdrop-blur-md">
                {/* Inner Content Card */}
                <div className="h-full rounded-2xl border border-neutral-800 bg-neutral-950 p-6 flex flex-col justify-between space-y-6 transition duration-300 group-hover:border-neutral-700">
                  
                  <div className="space-y-4">
                    {/* Title Row with Badge Icon */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="p-2.5 rounded-xl border border-neutral-800 bg-neutral-900/80 text-white">
                        {renderIcon(item.iconName)}
                      </div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-neutral-500 uppercase">
                        Active Group
                      </span>
                    </div>

                    {/* Community Title */}
                    <h3 className="text-lg font-bold tracking-wide text-neutral-100 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-neutral-400 font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Action Link Button */}
                  <div className="pt-2">
                    <Link
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-200 hover:text-white transition-colors duration-200 group/link"
                    >
                      <span>Explore Community</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  </div>

                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}