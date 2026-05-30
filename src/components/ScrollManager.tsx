"use client";

import { useEffect, useState, useRef, useCallback } from "react";

/* ─── 自訂平滑滾動（requestAnimationFrame） ─── */
function smoothScrollTo(
  container: HTMLElement,
  targetTop: number,
  duration = 600,
): Promise<void> {
  return new Promise((resolve) => {
    const startTop = container.scrollTop;
    const distance = targetTop - startTop;
    if (Math.abs(distance) < 2) {
      resolve();
      return;
    }
    const startTime = performance.now();

    function easeInOutCubic(t: number) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);
      container.scrollTop = startTop + distance * eased;
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        resolve();
      }
    }

    requestAnimationFrame(step);
  });
}

/* ─── Snap Controller ─── */
export function SnapController() {
  const isScrolling = useRef(false);
  const currentIdx = useRef(0);

  const getSections = useCallback((): HTMLElement[] => {
    const container = document.getElementById("snap-container");
    if (!container) return [];
    return Array.from(container.querySelectorAll<HTMLElement>("main > section, footer"));
  }, []);

  const scrollToSection = useCallback(
    async (idx: number) => {
      const sections = getSections();
      const container = document.getElementById("snap-container");
      if (!container || !sections[idx]) return;
      if (isScrolling.current) return;
      isScrolling.current = true;
      currentIdx.current = idx;
      await smoothScrollTo(container, sections[idx].offsetTop, 650);
      isScrolling.current = false;
    },
    [getSections],
  );

  useEffect(() => {
    const container = document.getElementById("snap-container");
    if (!container) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isScrolling.current) return;
      const sections = getSections();
      const direction = e.deltaY > 0 ? 1 : -1;
      const next = Math.max(0, Math.min(sections.length - 1, currentIdx.current + direction));
      if (next !== currentIdx.current) {
        scrollToSection(next);
      }
    };

    // keep currentIdx in sync for touch/other scroll
    const onScrollEnd = () => {
      if (isScrolling.current) return;
      const sections = getSections();
      const st = container.scrollTop + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop <= st) {
          currentIdx.current = i;
          break;
        }
      }
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (isScrolling.current) return;
      const sections = getSections();
      let direction = 0;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") direction = 1;
      if (e.key === "ArrowUp" || e.key === "PageUp") direction = -1;
      if (direction === 0) return;
      e.preventDefault();
      const next = Math.max(0, Math.min(sections.length - 1, currentIdx.current + direction));
      if (next !== currentIdx.current) scrollToSection(next);
    };

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("scrollend", onScrollEnd);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("scrollend", onScrollEnd);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [getSections, scrollToSection]);

  return null;
}

/* ─── 回到頂部按鈕 ─── */
export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const container = document.getElementById("snap-container");
    if (!container) return;
    const onScroll = () => setVisible(container.scrollTop > window.innerHeight);
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      aria-label="回到頂部"
      onClick={() => {
        const container = document.getElementById("snap-container");
        if (container) smoothScrollTo(container, 0, 600);
      }}
      className={`fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-jade/30 bg-pine/90 text-jade shadow-lg backdrop-blur transition-all duration-300 hover:bg-jade hover:text-ink ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
      }`}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M10 16V4M10 4l-5 5M10 4l5 5" />
      </svg>
    </button>
  );
}
