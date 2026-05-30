"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { brand, heroSlides } from "@/lib/content";
import { SlotImage } from "./SlotImage";

export function Hero() {
  const [idx, setIdx] = useState(0);
  const count = heroSlides.length;

  // auto-advance carousel
  useEffect(() => {
    if (count <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), 6000);
    return () => clearInterval(t);
  }, [count]);

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* ---------- Background image carousel ---------- */}
      <div className="absolute inset-0">
        <AnimatePresence mode="sync">
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
            className="absolute inset-0"
          >
            <SlotImage
              src={heroSlides[idx].src}
              alt={heroSlides[idx].alt}
              caption={heroSlides[idx].caption}
              className="h-full w-full"
            />
          </motion.div>
        </AnimatePresence>

        {/* readability overlays — keep text crisp over any photo */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/70 to-ink/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />
      </div>

      {/* atmospheric glow + sound rings (kept, layered above image) */}
      <div className="glow-jade pointer-events-none absolute -right-40 top-1/4 h-[60rem] w-[60rem]" />
      <div className="pointer-events-none absolute right-[-10%] top-1/2 hidden -translate-y-1/2 lg:right-[6%] lg:block">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-jade/20"
            style={{
              width: `${10 + i * 7}rem`,
              height: `${10 + i * 7}rem`,
              left: `${-(5 + i * 3.5)}rem`,
              top: `${-(5 + i * 3.5)}rem`,
            }}
            animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.08, 0.3] }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.4,
            }}
          />
        ))}
      </div>

      {/* ---------- Foreground content ---------- */}
      <div className="relative mx-auto w-full max-w-7xl px-6 pt-32 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="eyebrow mb-8 text-jade"
        >
          AfterTone Hospitality Lab · {brand.year}
        </motion.p>

        <h1 className="font-serif-tc text-4xl font-500 leading-[1.3] text-sand sm:text-5xl lg:text-7xl">
          <Line text={brand.heroLine1} delay={0.35} />
          <Line text={brand.heroLine2} delay={0.5} />
          <motion.span
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-3 block text-jade-soft"
          >
            {brand.heroAccent}
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
          className="my-10 h-px w-40 origin-left bg-gradient-to-r from-jade to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05 }}
          className="max-w-xl text-base italic leading-relaxed text-sand/80 sm:text-lg"
        >
          {brand.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => {
              const container = document.getElementById("snap-container");
              const target = document.getElementById("philosophy");
              if (!container || !target) return;
              const start = container.scrollTop;
              const dist = target.offsetTop - start;
              const duration = 650;
              const startTime = performance.now();
              function ease(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
              function step(now: number) {
                const p = Math.min((now - startTime) / duration, 1);
                container!.scrollTop = start + dist * ease(p);
                if (p < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            }}
            className="group inline-flex items-center gap-2 rounded-full bg-jade px-7 py-3.5 text-sm font-500 text-ink transition-all hover:gap-3 hover:bg-jade-soft cursor-pointer"
          >
            探索餘韻體驗
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </button>
          <button
            onClick={() => {
              const container = document.getElementById("snap-container");
              const target = document.getElementById("cases");
              if (!container || !target) return;
              const start = container.scrollTop;
              const end = target.offsetTop;
              const dist = end - start;
              const duration = 650;
              const startTime = performance.now();
              function ease(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
              function step(now: number) {
                const p = Math.min((now - startTime) / duration, 1);
                container!.scrollTop = start + dist * ease(p);
                if (p < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            }}
            className="inline-flex items-center gap-2 rounded-full border border-sand/20 px-7 py-3.5 text-sm text-sand transition-all hover:border-jade hover:text-jade-soft"
          >
            案例分享
          </button>
        </motion.div>

        {/* caption + carousel controls */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-16 flex items-center gap-5"
        >
          <div className="flex gap-2.5">
            {heroSlides.map((s, i) => (
              <button
                key={i}
                aria-label={`切換至第 ${i + 1} 張`}
                onClick={() => setIdx(i)}
                className="group relative h-2 overflow-hidden rounded-full bg-sand/20 transition-all"
                style={{ width: i === idx ? "2.5rem" : "0.9rem" }}
              >
                {i === idx && (
                  <motion.span
                    key={idx}
                    className="absolute inset-0 origin-left bg-jade"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: "linear" }}
                  />
                )}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.span
              key={idx}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.4 }}
              className="text-sm tracking-wide text-sand-dim"
            >
              {heroSlides[idx].caption}
            </motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.7 }}
          className="mt-6 text-sm tracking-wide text-sand-dim/70"
        >
          {brand.subtitle}
        </motion.p>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <button
          aria-label="捲動至下一區塊"
          onClick={() => {
            const container = document.getElementById("snap-container");
            if (!container) return;
            const sections = container.querySelectorAll<HTMLElement>("main > section");
            if (sections.length > 1) {
              const target = sections[1].offsetTop;
              const start = container.scrollTop;
              const dist = target - start;
              const duration = 650;
              const startTime = performance.now();
              function ease(t: number) { return t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; }
              function step(now: number) {
                const p = Math.min((now - startTime) / duration, 1);
                container!.scrollTop = start + dist * ease(p);
                if (p < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            }
          }}
          className="cursor-pointer"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="flex h-10 w-6 items-start justify-center rounded-full border border-sand/25 pt-2"
          >
            <span className="h-2 w-px bg-jade" />
          </motion.div>
        </button>
      </motion.div>
    </section>
  );
}

function Line({ text, delay }: { text: string; delay: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className="block"
    >
      {text}
    </motion.span>
  );
}
