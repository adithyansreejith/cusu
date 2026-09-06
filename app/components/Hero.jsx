"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaInstagram } from "react-icons/fa";// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-[#fafafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col justify-between overflow-x-hidden selection:bg-red-500/30 selection:text-white transition-colors duration-300">
      {/* Background Subtle Red Glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="pointer-events-none absolute left-1/2 -top-20 h-[500px] w-full max-w-7xl -translate-x-1/2 rounded-full bg-gradient-to-b from-red-600/[0.08] via-rose-950/[0.03] to-transparent blur-[130px]" />

      {/* Main Hero Section (Responsive Grid) */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 flex-1 flex flex-col justify-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Union Members Image Showcase (First on mobile, second on desktop) */}
          <motion.div
            variants={fadeInUp}
            className="order-1 lg:order-2 lg:col-span-6 relative w-full"
          >
            {/* Ambient Red Background Glow */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-red-900/30 via-red-600/20 to-neutral-800/30 dark:from-red-900/40 dark:via-red-600/25 dark:to-neutral-800/40 opacity-60 blur-xl pointer-events-none" />

            {/* Card Frame */}
            <div className="relative group rounded-2xl border border-neutral-200/90 dark:border-neutral-800 hover:border-red-500/40 dark:hover:border-red-500/30 bg-white/90 dark:bg-neutral-900/80 p-2 sm:p-3 overflow-hidden shadow-xl dark:shadow-2xl backdrop-blur-sm transition-colors duration-300">
              <div className="relative aspect-[3/4] sm:aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-100 dark:bg-neutral-950 flex items-center justify-center">

                {/* Image rotated by 270 degrees */}
                <Image
                  src="/union.webp"
                  alt="Cochin University Students' Union Members 2025-26"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain rotate-[270deg] group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  priority
                />
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-3 left-3 right-3 text-xs sm:text-sm font-medium text-neutral-800 dark:text-neutral-200 backdrop-blur-md bg-white/90 dark:bg-neutral-950/75 border border-neutral-200/90 dark:border-white/10 p-2.5 rounded-lg flex justify-between items-center z-10 shadow-sm">
                  <span>Union Executive Members</span>
                  <span className="text-xs text-red-600 dark:text-red-400 font-mono font-semibold">2025–26</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Text Content Block (Second on mobile, first on desktop) */}
          <div className="order-2 lg:order-1 lg:col-span-6 flex flex-col text-left space-y-6">
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-red-600 dark:text-red-400 backdrop-blur-md shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)] w-fit"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
              Official Digital Platform
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent leading-[1.15] sm:leading-[1.15]"
            >
              COCHIN UNIVERSITY STUDENTS&apos; UNION

              <span className="block text-xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 via-rose-600 to-neutral-800 dark:from-red-400 dark:via-rose-300 dark:to-neutral-200 bg-clip-text text-transparent mt-2">
                UNION HUB 2025–26
              </span>

              {/* Contact Links */}
              <div className="mt-5 sm:flex-row items-center justify-center gap-3 sm:gap-6">
                {/* Email */}
                <a
                  href="mailto:cusu@cusat.ac.in"
                  className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                  aria-label="Email Cochin University Students' Union"
                >
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
                  <span>cusu@cusat.ac.in</span>
                </a>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/cusu_official"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm sm:text-base font-medium text-neutral-600 dark:text-neutral-400 hover:text-red-600 dark:hover:text-red-300 transition-colors"
                  aria-label="Follow Cochin University Students' Union on Instagram"
                >
                  <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 dark:text-red-400" />
                  <span>cusu_official</span>
                </a>
              </div>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal dark:font-light leading-relaxed max-w-2xl"
            >
              The Cochin University Students&apos; Union (CUSU) is the official elected student governing body representing students across the departments, schools, and research centers of the university. The Union Hub 2025–26 serves as our central digital platform to foster campus democracy, student welfare, academic representation, and active student participation.
              <br /> <br />
              CUSU actively enlivens campus life through hallmark initiatives such as cultural fests, arts and sports championships, open forums, film screenings, and student clubs. Students can directly voice grievances or submit welfare requests through our Complaint Box, review formal petitions submitted by the union, explore clubs, and stay engaged with upcoming campus events.
            </motion.p>
          </div>
        </motion.div>
      </main>

      {/* 3. Leadership Contact Panel */}

    </div>
  );
}