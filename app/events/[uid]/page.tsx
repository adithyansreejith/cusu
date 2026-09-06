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

type EventPageProps = {
  params: Promise<{ uid: string }>;
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(date: string | null) {
  if (!date) return null;
  return dateFormatter.format(new Date(date));
}

const getEvent = cache(async (uid: string) => {
  const client = createClient();
  let lastError: unknown;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      return await client.getByUID("event", uid);
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
  const events = await client.getAllByType("event");
  return events.map((event) => ({ uid: event.uid }));
}

export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const { uid } = await params;
  try {
    const event = await getEvent(uid);
    const title = prismic.asText(event.data.name) || "Event";
    const description = prismic.asText(event.data.description);

    return {
      title: `${title} | Cochin University Students' Union`,
      description,
      openGraph: {
        title: `${title} | Cochin University Students' Union`,
        description,
        images: prismic.isFilled.image(event.data.cover_image) ? [event.data.cover_image.url] : [],
      },
    };
  } catch (error) {
    if (error instanceof prismic.NotFoundError) return { title: "Event not found" };
    throw error;
  }
}

export default async function EventDetailPage({ params }: EventPageProps) {
  const { uid } = await params;
  const event = await getEvent(uid);
  const eventDate = formatDate(event.data.date);
  const galleryImages = event.data.images.filter((item) => prismic.isFilled.image(item.image));

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
            href="/gallery"
            className="group inline-flex items-center gap-2.5 rounded-full border border-neutral-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-neutral-700 dark:text-zinc-300 backdrop-blur-md transition-all will-change-transform hover:bg-neutral-100 dark:hover:bg-zinc-800 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/30 shadow-xs"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1">←</span>
            <span>Back to Events & Gallery</span>
          </Link>
          <div className="hidden sm:block text-[10px] uppercase font-bold tracking-[0.3em] text-neutral-400 dark:text-white/30">
            Internal Document // Private Tier
          </div>
        </nav>

        {/* Master Asymmetric Structural Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">

          {/* Left Column: Core Header Details & Meta Layout (Pockets 5-Cols on Desktop) */}
          <header className="lg:col-span-5 lg:sticky lg:top-12 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono tracking-wider">
                {eventDate ? (
                  <time dateTime={event.data.date ?? undefined} className="bg-neutral-100 dark:bg-zinc-900 text-red-600 dark:text-red-400 px-3 py-1.5 rounded-md border border-neutral-200 dark:border-zinc-800 shadow-inner font-medium">
                    {eventDate}
                  </time>
                ) : null}
                {event.data.event_number ? (
                  <span className="rounded-md bg-gradient-to-r from-red-600 to-rose-600 px-3 py-1.5 font-bold text-white shadow-[0_4px_20px_rgba(220,38,38,0.25)] uppercase text-[11px] tracking-tight">
                    INDEX #{event.data.event_number}
                  </span>
                ) : null}
              </div>

              <PrismicRichText
                field={event.data.name}
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
                  paragraph: ({ children }: { children: React.ReactNode }) => (
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
                <div>Format: Experiential Showcase</div>
                <div>Status: Concluded Exhibition</div>
              </div>
            </div>
          </header>

          {/* Right Column: Hero Showcase, Description & Modular Gallery Components (7-Cols) */}
          <div className="lg:col-span-7 space-y-12 xl:space-y-16">

            {/* Primary Glossy Hero Section */}
            {prismic.isFilled.image(event.data.cover_image) ? (
              <div className="relative overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-white/[0.08] bg-neutral-100 dark:bg-neutral-900 shadow-xl dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.1)] group">
                {/* Simulated Glass Reflection Flare Layer */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent opacity-100 pointer-events-none z-10" />

                <div className="absolute -inset-px bg-gradient-to-b from-white/10 to-transparent rounded-2xl opacity-100 pointer-events-none z-20" />

                <PrismicNextImage
                  field={event.data.cover_image}
                  fallbackAlt=""
                  loading="eager"
                  className="h-auto w-full object-cover aspect-[4/5] transition-transform duration-1000 ease-out group-hover:scale-[1.015]"
                />
              </div>
            ) : null}

            {/* Editorial Presentation Content */}
            <div className="relative rounded-2xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-6 sm:p-8 xl:p-10 backdrop-blur-md shadow-md dark:shadow-xl">
              <div className="max-w-none text-base sm:text-lg leading-8 text-neutral-800 dark:text-zinc-200 font-normal space-y-6">
                <PrismicRichText
                  field={event.data.description}
                  components={{
                    paragraph: ({ children }) => <p className="mb-6 last:mb-0 text-neutral-800 dark:text-zinc-200 leading-relaxed">{children}</p>,
                    strong: ({ children }) => (
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

        {/* Media Records Section */}
        {galleryImages.length ? (
          <section className="relative mt-24 pt-16 border-t border-neutral-200/80 dark:border-white/[0.04]">
            {/* Ambient Backlight Zone */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[250px] bg-gradient-to-b from-red-600/[0.03] to-transparent blur-[80px] pointer-events-none rounded-full" />

            {/* Grid Header Track */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 relative z-10">
              <div className="space-y-1.5">
                <div className="text-[10px] uppercase font-mono font-bold tracking-[0.3em] text-red-600 dark:text-red-400/90">
                  Visual Archives
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-900 dark:text-white sm:text-3xl">
                  Media Records Gallery
                </h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-neutral-100 dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 px-3 py-1.5 font-mono text-xs text-neutral-700 dark:text-zinc-300 shadow-inner">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{galleryImages.length} {galleryImages.length === 1 ? 'Certified Frame' : 'Certified Frames'}</span>
              </div>
            </div>

            {/* Responsive Grid */}
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch relative z-10">
              {galleryImages.map((item, index) => (
                <div
                  key={`${item.image.url}-${index}`}
                  className="relative overflow-hidden rounded-xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-md dark:shadow-[0_16px_32px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out group hover:-translate-y-1.5 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-xl dark:hover:shadow-[0_24px_48px_rgba(239,68,68,0.12)] cursor-pointer"
                >
                  {/* Glossy Reflection Accents */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent opacity-100 pointer-events-none z-10" />

                  {/* Image Container */}
                  <div className="overflow-hidden w-full h-full aspect-[4/3] sm:aspect-[1/1] md:aspect-[4/3] xl:aspect-[1/1] 2xl:aspect-[4/5]">
                    <PrismicNextImage
                      field={item.image}
                      fallbackAlt=""
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04] filter brightness-[0.95] dark:brightness-[0.85] contrast-[1.02] dark:contrast-[1.05] group-hover:brightness-100 group-hover:contrast-100"
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : null}

      </div>
    </main>
  );
}