"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { MessageSquareWarning, ArrowRight } from "lucide-react";

// Animation Variants matching site convention
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

export default function ComplaintCallout() {
  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-[#fafafc] dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 overflow-hidden selection:bg-red-500/30 selection:text-white transition-colors duration-300">
      {/* Background Subtle Red Glow & Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-[300px] bg-red-600/[0.06] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-red-500/30 bg-red-500/[0.08] backdrop-blur-sm text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-400">
              <MessageSquareWarning className="w-4 h-4 text-red-600 dark:text-red-400" />
              Student Grievance Redressal
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-linear-to-br from-neutral-950 via-neutral-800 to-red-700 dark:from-white dark:via-neutral-200 dark:to-red-200/80 bg-clip-text text-transparent">
              COMPLAINT &amp; SUGGESTION BOX
            </h2>

            <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-normal dark:font-light leading-relaxed max-w-2xl mx-auto">
              Share your concerns, grievances, welfare requests, or suggestions directly with the Cochin University Students&apos; Union. Your voice helps us build a better campus.
            </p>
          </motion.div>

          {/* Callout Card */}
          <motion.div variants={fadeInUp} className="relative">
            {/* Ambient Outer Red Glow */}
            <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-red-600/15 via-rose-500/10 to-neutral-400/15 dark:from-red-950/60 dark:via-red-800/30 dark:to-neutral-900/60 opacity-60 blur-xl pointer-events-none" />

            {/* Outer Frame */}
            <div className="relative rounded-[28px] border border-red-500/25 dark:border-red-500/20 bg-white/80 dark:bg-neutral-900/50 p-4 sm:p-6 shadow-xl dark:shadow-2xl backdrop-blur-md">
              {/* Inner Card Container */}
              <div className="relative rounded-2xl border border-neutral-200/80 dark:border-white/[0.06] bg-white dark:bg-neutral-950 p-6 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
                
                {/* Left Information Content */}
                <div className="space-y-5 text-left max-w-xl">
                  <div className="space-y-2">
                    <span className="text-xs font-mono uppercase tracking-widest text-red-600 dark:text-red-400 font-bold">
                      CUSU // 2025–26
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white tracking-tight">
                      We are here to listen and take action
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed font-normal dark:font-light">
                      Submissions are routed directly to the student union executive council. Personal details are completely optional, ensuring total confidentiality and peace of mind.
                    </p>
                  </div>
                </div>

                {/* Right CTA Button */}
                <div className="w-full lg:w-auto flex flex-col items-center sm:items-end shrink-0">
                  <Link
                    href="/complaints"
                    className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 via-red-500 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white font-bold text-sm shadow-[0_10px_30px_rgba(220,38,38,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_15px_40px_rgba(220,38,38,0.5)]"
                  >
                    <span>Open Complaint &amp; Suggestion Box</span>
                    <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>

                  <span className="text-[11px] text-neutral-500 dark:text-neutral-500 font-mono mt-2.5">
                    Redirects to the official grievance form
                  </span>
                </div>

              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
