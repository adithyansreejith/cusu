"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import * as prismic from "@prismicio/client";

import { createClient } from "@/prismicio";

interface Community {
  id: string;
  uid: string | null;
  image: string | null;
  title: string;
  description: string;
  name: string;
  poc: string;
  link: string | null;
}

export default function CommunityGrid() {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCommunities() {
      try {
        const client = createClient();

        const documents = await client.getAllByType("community");

        const data: Community[] = documents.map((document) => ({
          id: document.id,

          uid: document.uid ?? null,

          /* ================================
             Image
          ================================= */

          image: prismic.isFilled.image(document.data.image)
            ? document.data.image.url ?? null
            : null,

          /* ================================
             Title
          ================================= */

          title:
            typeof document.data.title === "string"
              ? document.data.title
              : prismic.asText(document.data.title) ||
              "Untitled Community",

          /* ================================
             Description
          ================================= */

          description:
            prismic.asText(document.data.description) || "",

          /* ================================
             WhatsApp Group Name
          ================================= */

          name: prismic.asText(document.data.name) || "",

          /* ================================
             Point of Contact
          ================================= */

          poc:
            document.data.poc !== null &&
              document.data.poc !== undefined
              ? String(document.data.poc)
              : "",

          /* ================================
             WhatsApp / Community Link
          ================================= */

          link: prismic.isFilled.link(document.data.link)
            ? document.data.link.url ?? null
            : null,
        }));

        setCommunities(data);
      } catch (err) {
        console.error("Failed to fetch communities:", err);
        setError("Unable to load communities.");
      } finally {
        setLoading(false);
      }
    }

    fetchCommunities();
  }, []);

  /* ================================
     Loading
  ================================= */

  if (loading) {
    return (
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-96 animate-pulse rounded-2xl bg-neutral-200/60 dark:bg-white/[0.03] border border-neutral-200 dark:border-white/[0.06]"
            />
          ))}
        </div>
      </div>
    );
  }

  /* ================================
     Error
  ================================= */

  if (error) {
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-red-500/20 bg-red-50 dark:bg-red-950/20 p-8 text-center backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">
            Unable to load clubs
          </h2>

          <p className="mt-2 text-sm text-red-700/80 dark:text-red-300/80">{error}</p>
        </div>
      </div>
    );
  }

  /* ================================
     Empty
  ================================= */

  if (communities.length === 0) {
    return (
      <div className="w-full">
        <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-12 text-center">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            No clubs or student organizations found
          </h2>

          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Publish a club or student organization from Prismic to display it here.
          </p>
        </div>
      </div>
    );
  }

  /* ================================
     Main UI
  ================================= */

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {communities.map((community) => (
          <article
            key={community.id}
            className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 backdrop-blur-md shadow-md dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-xl dark:hover:shadow-[0_30px_60px_-10px_rgba(239,68,68,0.12)]"
          >
            {/* ================================
                Club / Organization Image
            ================================= */}

            <div className="relative h-52 w-full overflow-hidden bg-neutral-100 dark:bg-zinc-950 border-b border-neutral-200/80 dark:border-zinc-800">
              {community.image ? (
                <Image
                  src={community.image}
                  alt={community.name || community.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-neutral-100 dark:bg-zinc-950 text-5xl font-bold text-red-600 dark:text-red-400">
                  {community.title?.charAt(0)?.toUpperCase() || "C"}
                </div>
              )}
            </div>

            <div className="flex flex-1 flex-col p-6">
              {/* Club Title */}
              <h2 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400">
                {community.title}
              </h2>

              {/* Description */}
              {community.description && (
                <p className="mt-3 text-sm leading-6 text-neutral-600 dark:text-zinc-300 font-normal line-clamp-3">
                  {community.description}
                </p>
              )}

              {/* POC */}
              {community.poc && (
                <div className="mt-5 rounded-xl border border-neutral-200 dark:border-zinc-800 bg-neutral-100/80 dark:bg-zinc-950/70 p-4">
                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    Point of Contact
                  </p>

                  <p className="mt-1 text-sm font-medium text-neutral-900 dark:text-zinc-200">
                    {community.poc} {community.name ? `— ${community.name}` : ""}
                  </p>
                </div>
              )}

              {/* Link */}
              <div className="mt-auto pt-6 border-t border-neutral-200/80 dark:border-zinc-800">
                {community.link ? (
                  <Link
                    href={community.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-900 group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400 transition-colors duration-300"
                  >
                    <span>Join Club / Organization</span>
                    <span className="inline-block transition-transform duration-300 transform group-hover:translate-x-1 text-red-600 dark:text-red-400">
                      →
                    </span>
                  </Link>
                ) : (
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-neutral-400 dark:text-zinc-600">
                    Campus Activity Forum
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}