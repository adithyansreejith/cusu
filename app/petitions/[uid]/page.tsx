import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";

import { createClient } from "@/prismicio";

import { cache } from "react";

export const revalidate = 60;
export const dynamicParams = true;

type PetitionPageProps = {
  params: Promise<{ uid: string }>;
};

const getPetition = cache(async (uid: string) => {
  const client = createClient();
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await client.getByUID("petition", uid);
    } catch (error) {
      if (error instanceof prismic.NotFoundError) notFound();
      lastError = error;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 500 * (attempt + 1)));
      }
    }
  }
  throw lastError;
});

export async function generateStaticParams() {
  const client = createClient();
  const petitions = await client.getAllByType("petition");
  return petitions.map((petition) => ({ uid: petition.uid }));
}

export async function generateMetadata({ params }: PetitionPageProps): Promise<Metadata> {
  const { uid } = await params;
  try {
    const petition = await getPetition(uid);
    const title = prismic.asText(petition.data.issue_name) || "Petition Detail";
    const description = prismic.asText(petition.data.petition_issue_details);

    return {
      title: `${title} | Cochin University Students' Union`,
      description,
      openGraph: {
        title: `${title} | Cochin University Students' Union`,
        description,
        images: prismic.isFilled.image(petition.data.image) ? [petition.data.image.url] : [],
      },
    };
  } catch (error) {
    if (error instanceof prismic.NotFoundError) return { title: "Petition not found" };
    throw error;
  }
}

export default async function PetitionDetailPage({ params }: PetitionPageProps) {
  const { uid } = await params;
  const petition = await getPetition(uid);

  return (
    <main className="relative min-h-screen w-full bg-[#fafafc] dark:bg-[#050507] text-neutral-900 dark:text-gray-200 antialiased selection:bg-red-500/30 selection:text-white overflow-x-hidden transition-colors duration-300">
      {/* Structural Accents & Ambient Backlighting */}
      <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-red-600/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-red-600/[0.05] blur-[160px] pointer-events-none rounded-full" />

      {/* Subtle UI Grid Mesh Texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_75%)] pointer-events-none" />

      {/* Global Fluid Wrapper spanning full viewport layout */}
      <div className="w-full px-4 py-8 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">
        {/* Navigation Layer */}
        <nav className="flex items-center justify-between w-full border-b border-neutral-200/80 dark:border-white/[0.04] pb-6 mb-12">
          <Link
            href="/petitions"
            className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-700 dark:text-zinc-300 backdrop-blur-md transition-all will-change-transform hover:bg-neutral-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 shadow-xs"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Back to petitions</span>
          </Link>
          <div className="hidden sm:block text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400 dark:text-white/30">
            Official Registry // Public Advocacy Documentation
          </div>
        </nav>

        {/* Master Asymmetric Structural Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Left Column: Core Header Details & Meta Layout (5-Cols on Desktop) */}
          <header className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-wider">
                <span className="bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-zinc-800 shadow-inner font-medium uppercase text-[10px]">
                  UID: {petition.uid}
                </span>
                {petition.data.number ? (
                  <span className="rounded-md bg-gradient-to-r from-red-600 to-rose-600 px-3 py-1.5 font-bold text-white shadow-[0_4px_20px_rgba(220,38,38,0.25)] uppercase text-[11px] tracking-tight">
                    MANDATE #{petition.data.number}
                  </span>
                ) : null}
              </div>

              <PrismicRichText
                field={petition.data.issue_name}
                components={{
                  heading1: ({ children }: { children: React.ReactNode }) => (
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-5xl xl:text-6xl uppercase font-sans leading-[1.05]">
                      {children}
                    </h1>
                  ),
                  heading2: ({ children }: { children: React.ReactNode }) => (
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-5xl xl:text-6xl uppercase font-sans leading-[1.05]">
                      {children}
                    </h1>
                  ),
                  heading3: ({ children }: { children: React.ReactNode }) => (
                    <h1 className="text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-5xl xl:text-6xl uppercase font-sans leading-[1.05]">
                      {children}
                    </h1>
                  ),
                }}
              />
            </div>

            {/* Injected Separator Card detail */}
            <div className="hidden lg:block border-t border-neutral-200/80 dark:border-zinc-800 pt-8 mt-4">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-500 dark:text-zinc-400 space-y-2">
                <div>Classification: Core Mandate Issue</div>
                <div>Status: Active Review Process</div>
                <div>Authority: Cochin University Students&apos; Union</div>
              </div>
            </div>
          </header>

          {/* Right Column: Hero Showcase & Detailed Rich Text Narrative Component (7-Cols) */}
          <div className="lg:col-span-7 space-y-12 xl:space-y-16">
            {/* Primary Glossy Hero Image Wrapper */}
            {prismic.isFilled.image(petition.data.image) ? (
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-white/[0.08] bg-neutral-100 dark:bg-neutral-900 shadow-xl dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] group">
                {/* Simulated Glass Reflection Flare Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-100 pointer-events-none z-10" />

                <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-100 pointer-events-none z-20" />

                <PrismicNextImage
                  field={petition.data.image}
                  fallbackAlt=""
                  loading="eager"
                  className="h-auto w-full object-cover aspect-[4/5] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                />
              </div>
            ) : null}

            {/* Editorial Narrative Presentation Content Sheet */}
            <div className="relative rounded-2xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 sm:p-8 xl:p-10 backdrop-blur-md shadow-md dark:shadow-xl">
              <div className="max-w-none text-base sm:text-lg leading-8 text-neutral-800 dark:text-zinc-200 font-normal space-y-6">
                <PrismicRichText
                  field={petition.data.petition_issue_details}
                  components={{
                    paragraph: ({ children }: { children: React.ReactNode }) => (
                      <p className="mb-6 last:mb-0 text-neutral-800 dark:text-zinc-200 leading-relaxed">
                        {children}
                      </p>
                    ),
                    strong: ({ children }: { children: React.ReactNode }) => (
                      <strong className="font-semibold text-red-600 dark:text-red-400">
                        {children}
                      </strong>
                    ),
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
