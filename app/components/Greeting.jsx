"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles } from "lucide-react";

export default function WelcomeGreeting() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Automatically close the greeting after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        /* Full-screen backdrop overlay to handle center positioning and background blur */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        >
          {/* Main Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md p-6 rounded-2xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/80 text-neutral-200 overflow-hidden"
          >
            
            {/* Close Button on Top Right */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-500 hover:text-white hover:bg-neutral-800 transition-colors"
              aria-label="Close greeting"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content */}
            <div className="flex items-start gap-4 mt-2 mb-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1.5 pr-6">
                <h4 className="font-semibold text-lg text-white tracking-wide">
                  Welcome to the Portal
                </h4>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  Explore our community hub, access student resources, or connect directly with our leadership team below.
                </p>
              </div>
            </div>

            {/* Animated 5-Second Progress Bar Timer */}
            <div className="absolute bottom-0 left-0 right-0 h-[4px] bg-neutral-800 overflow-hidden">
              <motion.div 
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 5, ease: "linear" }}
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400"
              />
            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}