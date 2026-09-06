import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { isFilled } from "@prismicio/client";

export default async function UpcomingEvent() {
  const client = createClient();

  let document;
  try {
    document = await client.getSingle("upcoming_event");
  } catch (error) {
    if (error instanceof Error && error.message === "No documents were returned") {
      return null;
    }
    console.error("Failed to fetch upcoming_event:", error);
    return null;
  }

  const images = document.data.upcomingeventimage?.filter((item) =>
    isFilled.image(item.image)
  ) ?? [];

  if (!images.length) return null;

  return (
    <section className="w-full py-8 my-4 rounded-2xl border border-zinc-100 bg-zinc-50/50 dark:border-zinc-800/50 dark:bg-zinc-900/30">
      {document.uid && (
        <div className="mb-6 flex items-center justify-between px-6">
          <div>
            <h3 className="text-xl font-bold capitalize tracking-tight text-zinc-900 dark:text-zinc-50">
              {document.uid.replace(/-/g, " ")}
            </h3>

            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
              Swipe to explore our upcoming events
            </p>
          </div>

          <span className="rounded-full bg-zinc-100 px-2.5 py-1 font-mono text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {images.length} Event{images.length > 1 ? "s" : ""}
          </span>
        </div>
      )}

      <div className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {images.map((item, index) => (
          <div
            key={`${item.image.url}-${index}`}
            className="group relative w-64 aspect-[4/5] shrink-0 snap-start overflow-hidden rounded-2xl border border-zinc-200/60 bg-zinc-100 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-xl dark:border-zinc-700/40 dark:bg-zinc-800"
          >
            <PrismicNextImage
              field={item.image}
              fallbackAlt=""
              fill
              sizes="256px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-black/10 opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

            <div className="absolute right-3 top-3 rounded-md bg-white/80 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-zinc-800 shadow-sm backdrop-blur-md dark:bg-zinc-950/70 dark:text-zinc-200">
              {(index + 1).toString().padStart(2, "0")}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}