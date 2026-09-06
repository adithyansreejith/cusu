"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Calendar, X, Maximize2, ArrowRight } from "lucide-react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import type { RichTextField, ImageField } from "@prismicio/client";

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  category: "Union Events" | "Campus Activities" | "Cultural Events" | "Student Gatherings";
  date?: string;
}

export interface EventDisplayItem {
  id: string;
  uid: string;
  index: number;
  dateRange: string;
  name: RichTextField;
  nameText?: string;
  descriptionText: string;
  coverImage: ImageField;
}

interface GalleryGridProps {
  items: GalleryItem[];
  events: EventDisplayItem[];
  initialTab?: "events" | "photos";
}

const CATEGORIES = [
  "All Moments",
  "Union Events",
  "Campus Activities",
  "Cultural Events",
  "Student Gatherings",
] as const;

export default function GalleryGrid({ items, events, initialTab = "events" }: GalleryGridProps) {
  const [activeTab, setActiveTab] = useState<"events" | "photos">(initialTab);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Moments");
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  const filteredItems =
    selectedCategory === "All Moments"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-10">
      {/* Top Toggle Switcher: Events Showcase vs Photo Moments */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1.5 rounded-2xl bg-neutral-200/70 dark:bg-neutral-900/90 border border-neutral-300/80 dark:border-zinc-800 shadow-inner backdrop-blur-md">
          <button
            onClick={() => setActiveTab("events")}
            type="button"
            aria-pressed={activeTab === "events"}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "events"
                ? "bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.35)] scale-[1.02]"
                : "text-neutral-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Events Showcase</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                activeTab === "events"
                  ? "bg-white/25 text-white"
                  : "bg-neutral-300/80 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300"
              }`}
            >
              {events.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("photos")}
            type="button"
            aria-pressed={activeTab === "photos"}
            className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
              activeTab === "photos"
                ? "bg-gradient-to-r from-red-600 via-red-500 to-rose-600 text-white shadow-[0_4px_20px_rgba(220,38,38,0.35)] scale-[1.02]"
                : "text-neutral-600 dark:text-zinc-400 hover:text-red-600 dark:hover:text-red-400"
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Photo Moments</span>
            <span
              className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${
                activeTab === "photos"
                  ? "bg-white/25 text-white"
                  : "bg-neutral-300/80 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300"
              }`}
            >
              {items.length}
            </span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          TAB 1: EVENTS SHOWCASE
      ========================================================================= */}
      {activeTab === "events" && (
        <div className="space-y-8">
          {events.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-12 text-center">
              <Calendar className="w-8 h-8 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                No events published yet
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Check back soon for new event announcements and union programs.
              </p>
            </div>
          ) : (
            <div className="grid items-stretch gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
              {events.map((event) => {
                const displayIndex = String(event.index).padStart(2, "0");

                return (
                  <article
                    key={event.id}
                    className="group relative flex flex-col overflow-hidden rounded-3xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-md dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-xl dark:hover:shadow-[0_30px_60px_-10px_rgba(239,68,68,0.12)]"
                  >
                    {/* Top Bevel Line */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />

                    {/* Image Box */}
                    <div className="relative aspect-[4/5] overflow-hidden border-b border-neutral-200/80 dark:border-zinc-800 bg-neutral-100 dark:bg-zinc-950">
                      {/* Reflection */}
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent" />

                      <PrismicNextImage
                        field={event.coverImage}
                        fallbackAlt=""
                        loading="lazy"
                        className="h-full w-full object-cover brightness-[0.95] dark:brightness-[0.88] filter transition-transform duration-1000 ease-out group-hover:scale-[1.03] group-hover:brightness-100"
                      />

                      {/* Index Badge */}
                      <div className="absolute left-4 top-4 z-20">
                        <span className="rounded-md border border-neutral-200/90 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/90 px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 shadow-md backdrop-blur-md">
                          INDEX #{displayIndex}
                        </span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="flex flex-1 flex-col justify-between space-y-6 p-6 sm:p-8">
                      <div className="space-y-3">
                        {/* Start Date — End Date */}
                        {event.dateRange && (
                          <time className="block text-xs font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                            {event.dateRange}
                          </time>
                        )}

                        {/* Event Name */}
                        <h3 className="line-clamp-2 text-xl font-bold uppercase tracking-tight text-neutral-900 group-hover:text-red-600 dark:text-white dark:group-hover:text-red-400 transition-colors duration-300">
                          {event.nameText || (typeof event.name === "string" ? event.name : "Event Showcase")}
                        </h3>

                        {/* Description */}
                        <p className="line-clamp-3 text-sm font-normal leading-relaxed text-neutral-600 dark:text-zinc-300">
                          {event.descriptionText}
                        </p>
                      </div>

                      {/* CTA Link */}
                      <div className="border-t border-neutral-200/80 dark:border-zinc-800 pt-4">
                        <Link
                          href={`/events/${event.uid}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-neutral-900 group-hover:text-red-600 dark:text-zinc-100 dark:group-hover:text-red-400 transition-colors duration-300"
                        >
                          <span>Explore Showcase</span>
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
          )}
        </div>
      )}

      {/* =========================================================================
          TAB 2: PHOTO MOMENTS
      ========================================================================= */}
      {activeTab === "photos" && (
        <div className="space-y-8">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  type="button"
                  className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-red-600 to-rose-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.25)] scale-105"
                      : "bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 text-neutral-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 hover:border-red-500/40 dark:hover:border-red-500/40 hover:bg-neutral-100 dark:hover:bg-zinc-800 shadow-xs"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Photo Moments Grid Matrix */}
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-white/10 bg-white/50 dark:bg-white/[0.02] p-12 text-center">
              <Camera className="w-8 h-8 text-neutral-400 dark:text-neutral-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                No images in this category yet
              </h3>
              <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
                Gallery moments will be updated as new union and campus activities take place.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item, idx) => {
                const displayIndex = String(idx + 1).padStart(2, "0");

                return (
                  <article
                    key={item.id}
                    onClick={() => setActiveImage(item)}
                    className="group relative flex flex-col overflow-hidden rounded-2xl border border-neutral-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-md dark:shadow-[0_20px_50px_-10px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-2 hover:border-red-500/40 dark:hover:border-red-500/40 hover:shadow-xl dark:hover:shadow-[0_30px_60px_-10px_rgba(239,68,68,0.12)] cursor-pointer"
                  >
                    {/* Top Bevel Rule */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent z-10" />

                    {/* Image Showcase Container */}
                    <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-zinc-950">
                      {/* Reflection Flare Layer */}
                      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/[0.05] to-transparent" />

                      <Image
                        src={item.url}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="h-full w-full object-cover brightness-[0.95] dark:brightness-[0.9] filter transition-transform duration-700 ease-out group-hover:scale-105 group-hover:brightness-100"
                      />

                      {/* Top Floating Badge */}
                      <div className="absolute left-3 top-3 z-20">
                        <span className="rounded-md border border-neutral-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/90 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-red-600 dark:text-red-400 backdrop-blur-md shadow-md">
                          #{displayIndex}
                        </span>
                      </div>

                      {/* Hover Overlay Button */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex items-center gap-1.5 rounded-full bg-black/70 border border-white/20 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-md">
                          <Maximize2 className="w-3.5 h-3.5 text-red-400" />
                          <span>View Full Image</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Caption Footer */}
                    <div className="p-4 flex flex-col justify-between space-y-2 border-t border-neutral-200/80 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                          {item.category}
                        </span>
                        {item.date && (
                          <span className="text-[10px] font-mono text-neutral-500 dark:text-zinc-400">
                            {item.date}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm font-bold uppercase text-neutral-900 dark:text-white tracking-tight line-clamp-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors duration-300">
                        {item.title}
                      </h4>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Lightbox Modal */}
      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
          onClick={() => setActiveImage(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-950 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-neutral-900/60">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-red-500/10 border border-red-500/20 px-2.5 py-0.5 text-[10px] font-mono uppercase text-red-400 font-bold">
                  {activeImage.category}
                </span>
                <h3 className="text-sm font-semibold text-white truncate max-w-md">
                  {activeImage.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveImage(null)}
                className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Image Display */}
            <div className="relative w-full h-[65vh] sm:h-[75vh] bg-neutral-900 flex items-center justify-center">
              <Image
                src={activeImage.url}
                alt={activeImage.title}
                fill
                sizes="100vw"
                className="object-contain p-2"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
