"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Complaints", href: "/complaints" },
  { label: "Events & Gallery", href: "/gallery" },
  { label: "Petitions", href: "/petitions" },
  { label: "Clubs", href: "/clubs" },
  { label: "Members", href: "/members" },
];

const isComplaintsPage = (pathname: string) =>
  pathname.startsWith("/complaints") || pathname.startsWith("/magazine");

const isGalleryPage = (pathname: string) =>
  pathname.startsWith("/gallery") || pathname.startsWith("/events");

const isPetitionsPage = (pathname: string) =>
  pathname.startsWith("/petitions") || pathname.startsWith("/petition");

const isClubsPage = (pathname: string) =>
  pathname.startsWith("/clubs") || pathname.startsWith("/community");

const getActiveState = (href: string, pathname: string) => {
  if (href === "/") return pathname === "/";
  if (href === "/complaints") return isComplaintsPage(pathname);
  if (href === "/gallery") return isGalleryPage(pathname);
  if (href === "/petitions") return isPetitionsPage(pathname);
  if (href === "/clubs") return isClubsPage(pathname);
  return pathname.startsWith(href);
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolledDown, setScrolledDown] = useState(false);
  const scrollPositionRef = useRef(0);
  const navContentRef = useRef<HTMLDivElement>(null);
  const prevPathnameRef = useRef<string | null>(null);

  const activeIndex = useMemo(() => {
    return navItems.findIndex((item) => getActiveState(item.href, pathname));
  }, [pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > scrollPositionRef.current + 50) {
        setScrolledDown(true);
      } else if (currentScrollY < scrollPositionRef.current - 50) {
        setScrolledDown(false);
      }
      scrollPositionRef.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (navContentRef.current && activeIndex > 0 && prevPathnameRef.current !== pathname) {
      const itemElement = navContentRef.current.children[activeIndex] as HTMLElement;
      if (itemElement) {
        const containerWidth = navContentRef.current.offsetWidth;
        const itemPosition = itemElement.offsetLeft;
        const itemWidth = itemElement.offsetWidth;
        const scrollPosition = itemPosition - (containerWidth / 2) + (itemWidth / 2);

        navContentRef.current.scrollTo({
          left: scrollPosition,
          behavior: "smooth",
        });
      }
      prevPathnameRef.current = pathname;
    }
  }, [activeIndex, pathname]);

  const islandHeight = scrolledDown ? "h-12" : "h-14";

  return (
    <>
      {/* Desktop Navigation - unchanged */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/80 dark:border-white/10 bg-white/85 dark:bg-zinc-950/75 backdrop-blur-md transition-all duration-300">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex-shrink-0 py-1.5">
              <Link href="/" className="flex items-center gap-2 group">
                <Image
                  src="/logo-nw.png"
                  alt="Cochin University Students' Union (CUSU) Logo"
                  width={180}
                  height={70}
                  className="h-12 sm:h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:flex md:items-center md:gap-3">
              <div className="flex items-center space-x-1">
                {navItems.map((link) => {
                  const isActive = getActiveState(link.href, pathname);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`relative rounded-full px-3.5 py-1.5 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? "text-neutral-900 dark:text-white bg-neutral-200/70 dark:bg-white/10 shadow-[0_0_15px_rgba(239,68,68,0.15)] border border-red-500/30 font-semibold"
                          : "text-neutral-600 dark:text-zinc-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                      {link.href === "/complaints" && (
                        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      )}
                    </Link>
                  );
                })}
              </div>

              <div className="pl-2 border-l border-neutral-200 dark:border-white/10">
                <ThemeToggle />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Horizontal Dynamic Island */}
      <div
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 md:hidden w-[92vw] max-w-[430px] transition-all duration-300 ${islandHeight}`}
        style={{
          marginTop: "env(safe-area-inset-top, 0px)",
        }}
      >
        <motion.div
          className="rounded-2xl h-full overflow-hidden"
          style={{
            background: scrolledDown
              ? "rgba(8, 8, 10, 0.65)"
              : "rgba(8, 8, 10, 0.72)",
            backdropFilter: scrolledDown
              ? "blur(16px) saturate(140%)"
              : "blur(20px) saturate(150%)",
            WebkitBackdropFilter: scrolledDown
              ? "blur(16px) saturate(140%)"
              : "blur(20px) saturate(150%)",
            border: scrolledDown
              ? "1px solid rgba(220, 30, 45, 0.12)"
              : "1px solid rgba(220, 30, 45, 0.18)",
            boxShadow: scrolledDown
              ? "0 8px 32px rgba(0,0,0,.25), inset 0 1px 0 rgba(255,255,255,.03)"
              : "0 10px 40px rgba(0,0,0,.35), inset 0 1px 0 rgba(255,255,255,.05)",
            borderRadius: "2rem",
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div className="flex items-center h-full px-3">
            {/* Logo Capsule - fixed size */}
            <div className="flex-shrink-0 mr-2 relative">
              <div
                className="relative h-8 w-10 rounded-xl bg-red-900/30"
                style={{
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  border: "1px solid rgba(220, 30, 45, 0.25)",
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,.03), 0 3px 12px rgba(220,30,45,.2)",
                  transition: "all 0.3s ease",
                }}
              >
                <Link href="/" className="flex items-center justify-center h-full">
                  <Image
                    src="/logo-nw.png"
                    alt="CUSU Logo"
                    width={96}
                    height={32}
                    className="h-8 w-auto object-contain transition-all duration-300"
                    priority
                  />
                </Link>
              </div>
              {/* Subtle red glow effect */}
              <div
                className="absolute inset-0 rounded-xl opacity-70"
                style={{
                  background: "radial-gradient(circle at center, rgba(220, 30, 45, 0.15) 0%, transparent 70%)",
                  filter: "blur(8px)",
                  transition: "all 0.3s ease",
                }}
              />
            </div>

            {/* Horizontal Navigation Scroll Container with scroll affordance */}
            <div
              ref={navContentRef}
              className="flex-1 overflow-x-auto scrollbar-hide relative"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                WebkitScrollbar: "display: none",
                scrollSnapType: "x mandatory",
                scrollBehavior: "smooth",
              }}
            >
              <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                  display: none;
                }
              `}</style>
              {/* Left fade indicator */}
              <div
                className="absolute left-0 top-0 bottom-0 w-8 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(to right, rgba(8, 8, 10, 0.85), transparent)",
                }}
              />
              {/* Right fade indicator */}
              <div
                className="absolute right-0 top-0 bottom-0 w-8 pointer-events-none z-10"
                style={{
                  background: "linear-gradient(to left, rgba(8, 8, 10, 0.85), transparent)",
                }}
              />
              
              <div className="flex items-center gap-2 min-w-max px-4 py-1">
                {navItems.map((item) => {
                  const isActive = getActiveState(item.href, pathname);
                  const hasDot = item.href === "/complaints";

                  return (
                    <motion.div
                      key={item.href}
                      initial={false}
                      animate={{
                        scale: isActive ? 1.05 : 1,
                        opacity: isActive ? 1 : 0.85,
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="scroll-snap-align-start"
                    >
                      <Link
                        href={item.href}
                        className={`relative whitespace-nowrap px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                          isActive
                            ? "text-white bg-red-600/90 shadow-[0_0_15px_rgba(220,30,45,0.4)] border border-red-400/50"
                            : "text-neutral-300 dark:text-zinc-400 hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                        }`}
                      >
                        {item.label}
                        {hasDot && (
                          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                        )}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Theme Toggle - compact */}
            <div className="flex-shrink-0 ml-2">
              <ThemeToggle className="w-7 h-7 [&>svg]:w-3.5 [&>svg]:h-3.5" />
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}