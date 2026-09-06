import type { Metadata } from "next";
import { createClient } from "@/prismicio";
import * as prismic from "@prismicio/client";
import GalleryGrid, { GalleryItem, EventDisplayItem } from "./GalleryGrid";

export const metadata: Metadata = {
  title: "Events & Gallery | Cochin University Students' Union 2025–26",
  description:
    "Explore Cochin University Students' Union (CUSU) event showcases, hallmark campus initiatives, cultural celebrations, and visual media archives.",
};

export const revalidate = 60;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

function formatDate(dateString: string | null) {
  if (!dateString) return "";
  return dateFormatter.format(new Date(dateString));
}

function formatDateRange(startDate: string | null, endDate: string | null) {
  const start = formatDate(startDate);
  const end = formatDate(endDate);
  if (!start) return "";
  if (!end) return start;
  return `${start} — ${end}`;
}

type GalleryPageProps = {
  searchParams?: Promise<{ view?: string }>;
};

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const client = createClient();
  const resolvedParams = searchParams ? await searchParams : undefined;
  const initialTab = resolvedParams?.view === "photos" ? "photos" : "events";

  const galleryItems: GalleryItem[] = [];
  let displayEvents: EventDisplayItem[] = [];

  try {
    // 1. Fetch all events for the Events Showcase
    const rawEvents = await client.getAllByType("event").catch(() => []);

    const chronologicalEvents = [...rawEvents].sort((a, b) => {
      const dateA = a.data.date
        ? new Date(a.data.date).getTime()
        : Number.MAX_SAFE_INTEGER;
      const dateB = b.data.date
        ? new Date(b.data.date).getTime()
        : Number.MAX_SAFE_INTEGER;
      return dateA - dateB;
    });

    const numberedEvents = chronologicalEvents.map((event, index) => ({
      event,
      index: index + 1,
    }));

    displayEvents = [...numberedEvents].reverse().map(({ event, index }) => ({
      id: event.id,
      uid: event.uid,
      index,
      dateRange: formatDateRange(event.data.date, event.data.end_date),
      name: event.data.name,
      nameText: prismic.asText(event.data.name) || `Event Showcase #${index}`,
      descriptionText: prismic.asText(event.data.description) || "",
      coverImage: event.data.cover_image,
    }));

    // 2. Fetch images from Prismic "achievement" for Photo Moments
    const achievementDoc = await client.getSingle("achievement").catch(() => null);
    if (achievementDoc?.data?.achievementimage) {
      achievementDoc.data.achievementimage.forEach((item, idx) => {
        if (prismic.isFilled.image(item.image)) {
          const categories: GalleryItem["category"][] = [
            "Union Events",
            "Campus Activities",
            "Cultural Events",
            "Student Gatherings",
          ];
          const category = categories[idx % categories.length];

          galleryItems.push({
            id: `achievement-${idx}`,
            url: item.image.url,
            title: item.image.alt || `Campus Highlight #${String(idx + 1).padStart(2, "0")}`,
            category,
          });
        }
      });
    }

    // 3. Include event cover images into Photo Moments
    rawEvents.forEach((event, idx) => {
      if (prismic.isFilled.image(event.data.cover_image)) {
        const eventName = prismic.asText(event.data.name) || `Event Showcase #${idx + 1}`;
        galleryItems.push({
          id: `event-${event.id}`,
          url: event.data.cover_image.url,
          title: eventName,
          category: "Union Events",
          date: event.data.date
            ? new Date(event.data.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })
            : undefined,
        });
      }
    });
  } catch (err) {
    console.error("Failed to load Events & Gallery data:", err);
  }

  // Fallback placeholder items if Prismic has no images yet
  if (galleryItems.length === 0) {
    galleryItems.push(
      {
        id: "placeholder-1",
        url: "/cusu.png",
        title: "Union Executive Council 2025–26",
        category: "Union Events",
      },
      {
        id: "placeholder-2",
        url: "/cusu.png",
        title: "Campus Cultural Assembly",
        category: "Cultural Events",
      },
      {
        id: "placeholder-3",
        url: "/cusu.png",
        title: "Student Activity Forum",
        category: "Campus Activities",
      },
      {
        id: "placeholder-4",
        url: "/cusu.png",
        title: "Student Community Gathering",
        category: "Student Gatherings",
      }
    );
  }

  return (
    <section className="relative min-h-screen w-full bg-[#fafafc] dark:bg-[#050507] text-neutral-900 dark:text-gray-200 antialiased overflow-x-hidden py-16 sm:py-20 lg:py-28 transition-colors duration-300">
      {/* Structural Accents & Ambient Red Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-red-600/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />

      {/* Global Fluid Container */}
      <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-16 xl:px-24 2xl:px-32">
        {/* Header Section */}
        <div className="mb-12 text-center relative z-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-red-600 dark:text-red-400 backdrop-blur-md shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]">
            ✨ Events Timeline &amp; Visual Archives
          </div>

          <h1 className="mt-4 text-4xl sm:text-6xl font-black uppercase leading-none tracking-tight text-neutral-900 dark:text-white">
            EVENTS &amp; GALLERY
          </h1>

          <p className="mx-auto mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal dark:font-light leading-relaxed max-w-2xl">
            Explore Cochin University Students&apos; Union event showcases, hallmark campus initiatives, cultural celebrations, and visual media archives.
          </p>
        </div>

        {/* Gallery Interactive Grid with Dual-View Switcher */}
        <GalleryGrid
          items={galleryItems}
          events={displayEvents}
          initialTab={initialTab}
        />
      </div>
    </section>
  );
}
