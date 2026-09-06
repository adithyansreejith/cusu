"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Complaints", href: "/complaints" },
  { label: "Events & Gallery", href: "/gallery" },
  { label: "Petitions", href: "/petitions" },
  { label: "Clubs", href: "/clubs" },
  { label: "Members", href: "/members" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href === "/complaints") return pathname.startsWith("/complaints") || pathname.startsWith("/magazine");
    if (href === "/gallery") return pathname.startsWith("/gallery") || pathname.startsWith("/events");
    if (href === "/petitions") return pathname.startsWith("/petitions") || pathname.startsWith("/petition");
    if (href === "/clubs") return pathname.startsWith("/clubs") || pathname.startsWith("/community");
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/80 dark:border-white/10 bg-white/85 dark:bg-zinc-950/75 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo / Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Cochin University Students' Union (CUSU) Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-3">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href);
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

          {/* Mobile Menu Button & Theme Switcher */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-900 hover:text-neutral-900 dark:hover:text-white focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"}`} id="mobile-menu">
        <div className="space-y-1 bg-white dark:bg-zinc-950 px-3 pt-2 pb-4 shadow-xl border-b border-neutral-200 dark:border-white/5">
          {navLinks.map((link) => {
            const isActive = isLinkActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block rounded-md px-3 py-2.5 text-base font-medium transition-colors ${
                  isActive
                    ? "bg-red-500/10 text-red-600 dark:text-red-300 font-semibold border border-red-500/20"
                    : "text-neutral-600 dark:text-zinc-400 hover:bg-neutral-100 dark:hover:bg-zinc-900 hover:text-neutral-900 dark:hover:text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{link.label}</span>
                  {link.href === "/complaints" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}