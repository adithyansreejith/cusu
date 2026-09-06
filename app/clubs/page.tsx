import type { Metadata } from "next";
import Image from "next/image";
import * as prismic from "@prismicio/client";
import { createClient } from "@/prismicio";

export const metadata: Metadata = {
  title: "Clubs & Organizations | Cochin University Students' Union 2025–26",
  description:
    "Explore university clubs, student organizations, cultural collectives, and activity forums across Cochin University.",
};

export const revalidate = 60;

export default async function ClubsPage() {
  const client = createClient();
  const rawClubs = await client.getAllByType("community").catch(() => []);

  // Format clubs data consistently
  const clubs = rawClubs.map((doc, idx) => {
    const title =
      typeof doc.data.title === "string"
        ? doc.data.title
        : prismic.asText(doc.data.title) || `Club #${String(idx + 1).padStart(2, "0")}`;

    const description = prismic.asText(doc.data.description) || "";
    const poc = doc.data.poc !== null && doc.data.poc !== undefined ? String(doc.data.poc) : "";
    const groupName = prismic.asText(doc.data.name) || "";
    const link = prismic.isFilled.link(doc.data.link) ? doc.data.link.url ?? null : null;
    const image = prismic.isFilled.image(doc.data.image) ? doc.data.image.url ?? null : null;

    return {
      id: doc.id,
      index: idx + 1,
      title,
      description,
      poc,
      groupName,
      link,
      image,
    };
  });

  return (
    <section className="relative min-h-screen w-full bg-[#fafafc] dark:bg-[#050507] text-neutral-900 dark:text-gray-200 antialiased overflow-x-hidden py-20 lg:py-32 transition-colors duration-300">
      {/* Structural Accents & Ambient Red Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-red-600/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />

      {/* Global Fluid Wrapper - exactly matches Petitions page */}
      <div className="w-full px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32 max-w-[1920px] mx-auto">
        {/* Header Section */}
        <div className="mb-20 text-center relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-red-600 dark:text-red-400 backdrop-blur-md shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]">
            👥 Campus Collectives
          </div>
          <h1 className="mt-4 text-4xl font-black tracking-tight text-neutral-900 dark:text-white sm:text-6xl uppercase leading-none">
            CLUBS &amp; ORGANIZATIONS
          </h1>
          <p className="mx-auto mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal dark:font-light leading-relaxed max-w-xl">
            Explore university clubs, student organizations, cultural collectives, and activity forums across Cochin University
          </p>
        </div>

        {/* Master Responsive Grid Matrix */}
        {clubs.length === 0 ? (
          <div className="max-w-xl mx-auto rounded-3xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 p-12 text-center shadow-md">
            <h3 className="text-xl font-bold text-neutral-900 dark:text-white">
              No clubs or student organizations found
            </h3>
            <p className="mt-2 text-sm text-neutral-600 dark:text-zinc-400">
              Publish a club or student organization from Prismic to display it here.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10 items-stretch">
            {clubs.map((club) => {
              const displayIndex = String(club.index).padStart(2, "0");

              return (
                <article
                  key={club.id}
                  className="group flex flex-col relative overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-md shadow-md dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] transition-all duration-500 ease-out hover:-translate-y-2 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-xl dark:hover:shadow-[0_30px_60px_-10px_rgba(239,68,68,0.12)]"
                >
                  {/* Glossy Upper Edge Bevel Rule */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent opacity-100 transition-opacity duration-500" />

                  {/* Image Showcase Box */}
                  <div className="relative aspect-square overflow-hidden bg-neutral-100 dark:bg-zinc-950 border-b border-neutral-200/80 dark:border-zinc-800">
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent opacity-100 pointer-events-none z-10" />

                    {club.image ? (
                      <Image
                        src={club.image}
                        alt={club.title}
                        fill
                        className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] filter brightness-[0.95] dark:brightness-[0.9] group-hover:brightness-100"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-zinc-950 text-6xl font-black text-red-600 dark:text-red-400">
                        {club.title.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* Floating Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="rounded-md bg-white/95 dark:bg-zinc-950/90 border border-neutral-200 dark:border-zinc-800 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 backdrop-blur-md shadow-md">
                        COLLECTIVE #{displayIndex}
                      </span>
                    </div>
                  </div>

                  {/* Content Track Body */}
                  <div className="flex flex-1 flex-col p-6 sm:p-8 justify-between space-y-6">
                    <div className="space-y-3">
                      <h3 className="text-xl font-bold tracking-tight text-neutral-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2 uppercase">
                        {club.title}
                      </h3>

                      {club.description && (
                        <p className="line-clamp-3 text-sm leading-relaxed text-neutral-600 dark:text-zinc-300 font-normal">
                          {club.description}
                        </p>
                      )}

                      {club.poc && (
                        <div className="mt-4 rounded-xl border border-neutral-200 dark:border-zinc-800 bg-neutral-100/80 dark:bg-zinc-950/70 p-3.5">
                          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                            Point of Contact
                          </p>
                          <p className="mt-1 text-xs font-semibold text-neutral-900 dark:text-zinc-200">
                            {club.poc} {club.groupName ? `— ${club.groupName}` : ""}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Clean CTA Footer Layer - exactly like Petitions */}
                    <div className="pt-4 border-t border-neutral-200/80 dark:border-zinc-800">
                      {club.link ? (
                        <a
                          href={club.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-900 group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400 transition-colors duration-300"
                        >
                          <span>Join Club / Organization</span>
                          <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1 text-red-600 dark:text-red-400">
                            →
                          </span>
                        </a>
                      ) : (
                        <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">
                          Campus Activity Forum
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
