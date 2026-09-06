import type { Metadata } from "next";
import { ShieldCheck, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "Complaint & Suggestion Box | Cochin University Students' Union 2025–26",
  description:
    "Share your concerns, grievances, welfare requests, or suggestions directly with the Cochin University Students' Union. Anonymous submissions supported.",
};

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdmFCR_6XKv2NRVvF6zWu6AoLImTHiX110xQH6ATJ5GrX1OUQ/viewform";

export default function ComplaintsPage() {
  return (
    <section className="relative min-h-screen w-full bg-[#fafafc] dark:bg-[#050507] text-neutral-900 dark:text-gray-200 antialiased overflow-x-hidden py-16 sm:py-20 lg:py-28 transition-colors duration-300">
      {/* Structural Accents & Ambient Red Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-red-600/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-red-600 dark:text-red-400 backdrop-blur-md shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]">
            🛡️ Student Grievance Redressal
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-none">
            Complaint &amp; Suggestion Box
          </h1>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal dark:font-light leading-relaxed max-w-2xl mx-auto">
            Share your concerns, grievances, welfare requests, or suggestions directly with the Cochin University Students&apos; Union.
          </p>

          {/* Privacy notice badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/60 backdrop-blur-md text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 shadow-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>🔒 Anonymous submissions are supported. Personal details are optional.</span>
          </div>
        </div>

        {/* Browser Mockup Container */}
        <div className="overflow-hidden rounded-2xl sm:rounded-3xl border border-neutral-200/90 dark:border-white/[0.08] bg-white dark:bg-slate-900/90 shadow-xl dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.05)] backdrop-blur-md">
          {/* Browser Bar */}
          <div className="flex items-center justify-between gap-2 border-b border-neutral-200 dark:border-white/[0.08] bg-neutral-100/90 dark:bg-slate-950/80 px-4 sm:px-6 py-3.5">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/80" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
              <div className="h-3 w-3 rounded-full bg-green-500/80" />

              <div className="ml-3 hidden sm:flex items-center gap-2 rounded-md bg-white dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06] px-3 py-1 text-xs text-neutral-600 dark:text-slate-400 font-mono">
                <span className="truncate max-w-md">{FORM_URL}</span>
              </div>
            </div>

            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 shadow-xs"
            >
              <span>Open Form in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Responsive Scrollable Form Frame */}
          <div className="h-[75vh] sm:h-[80vh] min-h-[640px] max-h-[1100px] w-full overflow-y-auto bg-white dark:bg-neutral-950">
            <iframe
              src={`${FORM_URL}?embedded=true`}
              title="Cochin University Students' Union Complaint & Suggestion Box"
              className="w-full min-h-[900px] sm:min-h-[1100px] border-0"
              loading="lazy"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
