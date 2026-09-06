"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  currentAlpha: number;
  pulseSpeed: number;
  pulse: number;
  speedY: number;
  speedX: number;
  swayFactor: number;
  swayOffset: number;
  colorDark: string;
  colorLight: string;
}

export default function RedParticles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let isDark = document.documentElement.classList.contains("dark");

    const observer = new MutationObserver(() => {
      isDark = document.documentElement.classList.contains("dark");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Subtle red and crimson shades for dark mode
    const darkColors = [
      "239, 68, 68",   // Tailwind red-500
      "220, 38, 38",   // Tailwind red-600
      "244, 63, 94",   // Tailwind rose-500
      "185, 28, 28",   // Tailwind red-700
      "252, 165, 165", // Tailwind red-300
    ];

    // Slightly deeper rose and ruby shades for light mode visibility
    const lightColors = [
      "225, 29, 72",   // Tailwind rose-600
      "220, 38, 38",   // Tailwind red-600
      "190, 18, 60",   // Tailwind rose-700
      "244, 63, 94",   // Tailwind rose-500
      "185, 28, 28",   // Tailwind red-700
    ];

    const particleCount = Math.min(Math.floor((width * height) / 26000), 55);
    const particles: Particle[] = [];

    for (let i = 0; i < particleCount; i++) {
      const baseAlpha = Math.random() * 0.22 + 0.12; // 0.12 - 0.34
      const colorIndex = Math.floor(Math.random() * darkColors.length);

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.8, // 0.8px - 2.3px
        baseAlpha,
        currentAlpha: baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulse: Math.random() * Math.PI * 2,
        speedY: -(Math.random() * 0.25 + 0.1), // Gentle upward drift
        speedX: (Math.random() - 0.5) * 0.12,
        swayFactor: Math.random() * 0.4 + 0.2,
        swayOffset: Math.random() * Math.PI * 2,
        colorDark: darkColors[colorIndex],
        colorLight: lightColors[colorIndex],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Update positions
        p.y += p.speedY;
        p.x += p.speedX + Math.sin(time + p.swayOffset) * p.swayFactor * 0.2;

        // Pulse alpha
        p.pulse += p.pulseSpeed;
        p.currentAlpha = p.baseAlpha + Math.sin(p.pulse) * 0.08;
        if (p.currentAlpha < 0.05) p.currentAlpha = 0.05;

        // Wrap around boundaries
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Color selection based on active theme
        const color = isDark ? p.colorDark : p.colorLight;
        const alphaMultiplier = isDark ? 1 : 1.15;
        const finalAlpha = Math.min(p.currentAlpha * alphaMultiplier, 0.45);

        // Render particle with subtle soft glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${finalAlpha})`;
        ctx.shadowBlur = isDark ? 6 : 4;
        ctx.shadowColor = `rgba(${color}, ${finalAlpha * 0.7})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1] w-full h-full opacity-80"
    />
  );
}
