import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import * as prismic from "@prismicio/client";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Petitions | Cochin University Students' Union 2025–26",
  description:
    "Review petitions and representations filed by the Cochin University Students' Union to address student issues and welfare concerns.",
};

export const revalidate = 60;

export default async function PetitionsPage() {
  const client = createClient();

  // Fetching all entries of custom type "petition"
  const petitions = await client.getAllByType("petition", {
    orderings: {
      field: "my.petition.number",
      direction: "desc",
    },
  });

  return (
    <section className="relative min-h-screen w-full bg-[#fafafc] dark:bg-[#050507] text-neutral-900 dark:text-gray-200 antialiased overflow-x-hidden py-20 lg:py-32 transition-colors duration-300">
      {/* Structural Accents & Ambient Red Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-red-600/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />

      {/* Global Fluid Wrapper spanning full viewport layout */}
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-red-600 dark:text-red-400 backdrop-blur-md shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]">
            ⚖️ Advocacy Registry
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-6xl uppercase leading-none">
            PETITIONS
          </h1>
          <p className="mx-auto mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal dark:font-light leading-relaxed max-w-xl">
            Review petitions and representations filed by the Cochin University Students&apos; Union to address student issues and welfare concerns
          </p>
        </div>

        {/* Master Responsive Grid Matrix */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 items-stretch">
          {petitions.map((petition) => {
            const detailSummary = prismic.asText(petition.data.petition_issue_details);

            return (
              <article
                key={petition.id}
                className="group flex flex-col relative overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-md shadow-md dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-xl dark:hover:shadow-[0_30px_60px_-10px_rgba(239,68,68,0.12)]"
              >
                {/* Glossy Upper Edge Bevel Rule */}
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-100 transition-opacity duration-500" />

                {/* Image Showcase Box */}
                <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-zinc-950 border-b border-neutral-200/80 dark:border-zinc-800">
                  {/* Reflection Layer */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-100 pointer-events-none z-10" />

                  <PrismicNextImage
                    field={petition.data.image}
                    fallbackAlt=""
                    className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] filter brightness-[0.95] dark:brightness-[0.9] group-hover:brightness-100"
                  />

                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <span className="rounded-md bg-white/95 dark:bg-zinc-950/90 border border-neutral-200 dark:border-zinc-800 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 backdrop-blur-md shadow-md">
                      INDEX #{petition.data.number || "00"}
                    </span>
                  </div>
                </div>

                {/* Content Track Body */}
                <div className="flex flex-1 flex-col p-6 sm:p-8 justify-between space-y-6">
                  <div className="space-y-3">
                    <PrismicRichText
                      field={petition.data.issue_name}
                      components={{
                        heading1: ({ children }: { children: React.ReactNode }) => (
                          <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2 uppercase">
                            {children}
                          </h3>
                        ),
                        heading2: ({ children }: { children: React.ReactNode }) => (
                          <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2 uppercase">
                            {children}
                          </h3>
                        ),
                        heading3: ({ children }: { children: React.ReactNode }) => (
                          <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2 uppercase">
                            {children}
                          </h3>
                        ),
                        paragraph: ({ children }: { children: React.ReactNode }) => (
                          <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2 uppercase">
                            {children}
                          </h3>
                        ),
                      }}
                    />

                    <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-zinc-300 font-normal">
                      {detailSummary}
                    </p>
                  </div>

                  {/* Clean CTA Footer Layer */}
                  <div className="pt-4 border-t border-neutral-200/80 dark:border-zinc-800">
                    <Link
                      href={`/petitions/${petition.uid}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-900 group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400 transition-colors duration-300"
                    >
                      <span>Review Details</span>
                      <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1 text-red-600 dark:text-red-400">
                        →
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
