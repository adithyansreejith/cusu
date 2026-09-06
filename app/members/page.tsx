import { createClient } from "@/prismicio";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@prismicio/react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Executive Members | Cochin University Students' Union 2025–26",
    description: "Meet the elected student leaders of Cochin University Students' Union (CUSU) 2025–26.",
};

export const revalidate = 60;

export default async function MembersPage() {
    const client = createClient();

    // Fetching all entries of custom type "Members"
    const members = await client.getAllByType("members", {
        // Using an array of objects allows for multi-level chaining/sorting
        orderings: [
            {
                field: "document.data.position_number",
                direction: "asc",
            },
            // TIE-BREAKER: If position_number matches, sort by oldest creation date first
            {
                field: "document.first_publication_date",
                direction: "asc",
            }
        ],
    });

    return (
        <section className="relative min-h-screen w-full bg-[#fafafc] dark:bg-[#050507] text-neutral-900 dark:text-gray-200 antialiased overflow-x-hidden py-16 sm:py-20 lg:py-28 transition-colors duration-300">
            {/* Structural Accents & Ambient Red Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-red-600/[0.05] via-transparent to-transparent blur-[120px] pointer-events-none rounded-full" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000008_1px,transparent_1px),linear-gradient(to_bottom,#00000008_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808006_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_top,white,transparent_60%)] pointer-events-none" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-14 text-center relative z-10 max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/[0.08] px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-red-600 dark:text-red-400 backdrop-blur-md shadow-[inset_0_1px_0px_rgba(255,255,255,0.05)]">
                        🏛️ Executive Leadership
                    </div>
                    <h1 className="mt-4 text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-neutral-900 dark:text-white uppercase leading-none">
                        UNION MEMBERS
                    </h1>
                    <p className="mx-auto mt-4 text-base sm:text-lg text-neutral-600 dark:text-neutral-400 font-normal dark:font-light leading-relaxed max-w-2xl">
                        Meet the elected representatives of the Cochin University Students&apos; Union.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="group flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-zinc-900/90 border border-neutral-200/90 dark:border-zinc-800 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/40 dark:hover:border-red-500/40 shadow-md dark:shadow-xl hover:shadow-xl dark:hover:shadow-[0_20px_40px_-10px_rgba(239,68,68,0.1)]"
                        >
                            {/* Image Wrapper with Aspect Ratio */}
                            <div className="relative aspect-4/5 w-full overflow-hidden bg-neutral-100 dark:bg-zinc-950">
                                {member.data.image && (
                                    <PrismicNextImage
                                        field={member.data.image}
                                        fallbackAlt=""
                                        className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                                    />
                                )}
                            </div>

                            {/* Content Details */}
                            <div className="flex flex-1 flex-col p-6">
                                <div className="flex-1">
                                    {/* Member Name */}
                                    <PrismicRichText
                                        field={member.data.name}
                                        components={{
                                            heading4: ({ children }) => (
                                                <h4 className="text-lg font-bold tracking-tight text-neutral-900 dark:text-white transition-colors duration-300 group-hover:text-red-600 dark:group-hover:text-red-400 line-clamp-1 uppercase">
                                                    {children}
                                                </h4>
                                            )
                                        }}
                                    />

                                    {/* Member Position */}
                                    <PrismicRichText
                                        field={member.data.position}
                                        components={{
                                            paragraph: ({ children }) => (
                                                <p className="mt-1 text-sm font-semibold tracking-wide text-red-600 dark:text-red-400 uppercase">
                                                    {children}
                                                </p>
                                            )
                                        }}
                                    />
                                </div>

                                {/* Divider line inside the card */}
                                <div className="my-4 border-t border-neutral-200/80 dark:border-zinc-800 group-hover:border-neutral-300 dark:group-hover:border-zinc-700 transition-colors" />

                                {/* Contact Details */}
                                <PrismicRichText
                                    field={member.data.contact_details}
                                    components={{
                                        paragraph: ({ children }) => (
                                            <p className="text-xs text-neutral-600 dark:text-zinc-400 line-clamp-2 hover:text-neutral-900 dark:hover:text-zinc-200 transition-colors">
                                                {children}
                                            </p>
                                        )
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}