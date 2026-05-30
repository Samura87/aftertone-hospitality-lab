"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { nav, brand } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false); // true = navbar is over a light bg → use dark text
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const homeBase = pathname === "/" ? "" : "/";

  useEffect(() => {
    const container = document.getElementById("snap-container");
    const target = container || document.documentElement;
    const getScroll = () => container ? container.scrollTop : window.scrollY;

    const onScroll = () => {
      setScrolled(getScroll() > 40);
      // Detect if navbar overlaps a light section
      const navMid = 32;
      const scrollTop = getScroll();
      const checkPoint = scrollTop + navMid;
      const lightSections = document.querySelectorAll<HTMLElement>("[data-theme='light']");
      let isLight = false;
      lightSections.forEach((s) => {
        const top = s.offsetTop;
        const bottom = top + s.offsetHeight;
        if (checkPoint >= top && checkPoint < bottom) isLight = true;
      });
      setDark(isLight);
    };
    onScroll();

    if (container) {
      container.addEventListener("scroll", onScroll, { passive: true });
      return () => container.removeEventListener("scroll", onScroll);
    } else {
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  const textBase = dark ? "text-ink" : "text-sand";
  const textDim = dark ? "text-ink/60" : "text-sand-dim";
  const textAccent = dark ? "text-moss" : "text-jade";
  const textAccentSoft = dark ? "text-moss" : "text-jade-soft";
  const borderAccent = dark ? "border-moss/40" : "border-jade/40";
  const hoverBg = dark ? "hover:bg-moss hover:text-sand" : "hover:bg-jade hover:text-ink";
  const barColor = dark ? "bg-ink" : "bg-sand";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? dark
            ? "bg-sand/90 backdrop-blur-md border-b border-ink/10 py-3"
            : "bg-ink/85 backdrop-blur-md border-b border-jade/15 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="/" className="group flex items-baseline gap-2">
          <span className={`font-serif-tc text-lg font-600 tracking-wide transition-colors duration-500 ${textBase}`}>
            After<span className={`transition-colors duration-500 ${textAccent}`}>Tone</span>
          </span>
          <span className={`hidden text-[0.62rem] tracking-[0.28em] transition-colors duration-500 sm:inline ${textDim}`}>
            HOSPITALITY LAB
          </span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <li key={n.id} className="relative group">
              {n.id === "cases" ? (
                <>
                  <a
                    href={`${homeBase}#${n.id}`}
                    className={`relative text-sm transition-colors duration-500 hover:opacity-100 ${textDim} hover:${textBase}`}
                  >
                    {n.label}
                    <span className={`hint-underline absolute -bottom-1.5 left-0 h-px transition-[width,opacity] duration-300 ${dark ? "bg-moss" : "bg-jade"}`} />
                  </a>
                  {/* dropdown */}
                  <div className={`pointer-events-none absolute left-1/2 top-full -translate-x-1/2 rounded-lg border px-4 py-3 opacity-0 shadow-lg backdrop-blur-md transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100 ${dark ? "border-ink/20 bg-sand/95" : "border-jade/20 bg-ink/95"}`} style={{ marginTop: 0, paddingTop: "12px" }}>
                    <a
                      href="/cases/haijing"
                      className={`block whitespace-nowrap text-xs transition-colors ${dark ? "text-ink/80 hover:text-moss" : "text-sand-dim hover:text-jade"}`}
                    >
                      墾丁海境案例
                    </a>
                  </div>
                </>
              ) : (
                <a
                  href={n.href ?? `${homeBase}#${n.id}`}
                  className={`relative text-sm transition-colors duration-500 hover:opacity-100 ${textDim} hover:${textBase}`}
                >
                  {n.label}
                  <span className={`absolute -bottom-1.5 left-0 h-px w-0 transition-all duration-300 ${dark ? "bg-moss" : "bg-jade"}`} />
                </a>
              )}
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className={`hidden rounded-full border px-5 py-2 text-sm transition-all duration-500 md:inline-block ${borderAccent} ${textAccentSoft} ${hoverBg}`}
        >
          開始合作
        </a>

        <button
          aria-label="選單"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-6 transition-all duration-500 ${barColor} ${open ? "translate-y-[7px] rotate-45" : ""}`}
          />
          <span className={`h-px w-6 transition-all duration-500 ${barColor} ${open ? "opacity-0" : ""}`} />
          <span
            className={`h-px w-6 transition-all duration-500 ${barColor} ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
          />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className={`overflow-hidden md:hidden ${dark ? "bg-sand/95" : "bg-ink/95"} backdrop-blur-lg`}
          >
            <ul className="flex flex-col gap-5 px-6 py-6">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    href={n.href ?? `${homeBase}#${n.id}`}
                    onClick={() => setOpen(false)}
                    className={`text-base transition-colors ${textDim}`}
                  >
                    {n.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className={`inline-block rounded-full border px-5 py-2.5 text-sm ${borderAccent} ${textAccentSoft}`}
                >
                  開始合作
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
