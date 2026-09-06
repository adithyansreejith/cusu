import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";

export default async function Achievement() {
  const client = createClient();
  let data = null;

  try {
    data = await client.getSingle("achievement");
  } catch (error) {
    if (error instanceof Error && error.message === "No documents were returned") {
      return null;
    }
    console.error("Failed to fetch achievement data in component:", error);
    return null;
  }

  const images = data?.data?.achievementimage || [];

  if (images.length === 0) return null;

  return (
    <div className="w-full py-8 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800/50 my-4">
      {/* Dynamic Header */}
      {data?.uid && (
        <div className="px-6 mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 capitalize">
              {data.uid.replace(/-/g, " ")}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Swipe to explore our milestones
            </p>
          </div>
          
          {/* Decorative Counter Indicator */}
          <span className="text-xs font-mono font-medium px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
            {images.length} {images.length === 1 ? "Achievement" : "Achievements"}
          </span>
        </div>
      )}

      {/* Premium Horizontal Scroll Container */}
      <div className="flex flex-row overflow-x-auto gap-5 px-6 pb-2 scroll-smooth snap-x snap-mandatory scroll-p-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {images.map((item, index) => {
          if (!item.image) return null;

          return (
            <div 
              key={index} 
              className="group flex-shrink-0 w-64 aspect-[4/5] relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/40 shadow-sm snap-start transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-xl hover:shadow-zinc-200/40 dark:hover:shadow-none"
            >
              {/* The Prismic Image */}
              <PrismicNextImage 
                field={item.image} 
                fallbackAlt="" 
                fill
                sizes="(max-width: 768px) 256px, 256px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Sophisticated UI Gradients & Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Premium Card Counter Badge */}
              <div className="absolute top-3 right-3 bg-white/80 dark:bg-zinc-950/70 backdrop-blur-md px-2 py-0.5 rounded-md text-[10px] font-mono font-bold tracking-wider text-zinc-800 dark:text-zinc-200 shadow-sm">
                {(index + 1).toString().padStart(2, '0')}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}