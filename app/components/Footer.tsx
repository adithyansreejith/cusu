import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-neutral-200/90 dark:border-neutral-800 bg-[#fafafc] dark:bg-neutral-950 text-neutral-800 dark:text-neutral-100 overflow-hidden transition-colors duration-300">
      {/* Background Subtle Glow Grid matching the theme */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#1f1f1f_1px,transparent_1px),linear-gradient(to_bottom,#1f1f1f_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-12 lg:py-16">
        
        {/* Footer Content */}
        <div className="flex flex-col items-center justify-center gap-4 text-center max-w-2xl mx-auto">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-red-500/30 bg-red-500/[0.08] text-xs font-semibold uppercase tracking-wider text-red-600 dark:text-red-300 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
            COCHIN UNIVERSITY STUDENTS&apos; UNION 2025–26
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-linear-to-br from-neutral-950 via-neutral-800 to-neutral-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
            Thank You for Visiting
          </h3>

          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 font-normal dark:font-light">
            Stay connected with the Cochin University Students&apos; Union Digital Hub for the latest
            updates, events, petitions, clubs, and student welfare initiatives.
          </p>

        </div>

        {/* Divider with Center Ambient Accent */}
        <div className="relative my-10 flex items-center justify-center">
          <div className="h-px w-full bg-linear-to-r from-transparent via-neutral-300 dark:via-neutral-800 to-transparent" />
          <div className="absolute h-1 w-24 bg-linear-to-r from-transparent via-red-500/40 to-transparent blur-xs" />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-center text-xs sm:text-sm text-neutral-600 dark:text-neutral-500 md:flex-row">

          <p>© {new Date().getFullYear()} COCHIN UNIVERSITY STUDENTS&apos; UNION 2025–26. All rights reserved.</p>

          <p className="text-neutral-600 dark:text-neutral-400">
            Designed &amp; Developed by{" "}
            <Link
              href="https://www.instagram.com/browzess"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-neutral-900 dark:text-white transition-colors duration-300 hover:text-red-600 dark:hover:text-neutral-300 underline underline-offset-4 decoration-neutral-300 dark:decoration-neutral-700 hover:decoration-red-600 dark:hover:decoration-white"
            >
              Browzess
            </Link>
          </p>

        </div>
      </div>
    </footer>
  );
}