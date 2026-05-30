"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { caseStudies, marketStatus, modules } from "@/lib/content";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const toneMap: Record<string, string> = {
  live: "border-jade/40 text-jade bg-jade/10",
  done: "border-sand-dim/30 text-sand-dim bg-sand-dim/10",
};

/* ─── ExpandPanel ─── */
function ExpandPanel({
  label,
  hint,
  children,
}: {
  label: string;
  hint: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-jade/15 bg-ink/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-jade/5"
      >
        <div>
          <span className="text-sm font-500 text-sand">{label}</span>
          <span className="ml-3 text-xs text-sand-dim">{hint}</span>
        </div>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          className="text-jade text-sm"
        >
          ▼
        </motion.span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Market Content ─── */
function MarketContent() {
  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-sand-dim">
        {marketStatus.note}
      </p>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-jade/10 text-left text-sand-dim">
            <th className="pb-2 pr-4 font-400">年度</th>
            <th className="pb-2 pr-4 font-400">住房率</th>
            <th className="pb-2 pr-4 font-400">均價</th>
            <th className="pb-2 font-400">YoY</th>
          </tr>
        </thead>
        <tbody>
          {marketStatus.rows.map((r) => (
            <tr key={r.year} className="border-b border-jade/5">
              <td className="py-2 font-500 text-sand">{r.year}</td>
              <td className="py-2 text-sand-dim">{r.occ}</td>
              <td className="py-2 text-sand-dim">{r.adr}</td>
              <td className="py-2 text-sand">{r.yoy}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="text-xs text-sand-dim/60">
        {marketStatus.summary.period}住房率 {marketStatus.summary.occDrop}、均價 {marketStatus.summary.adrDrop}
      </p>
    </div>
  );
}

/* ─── Modules Content ─── */
function ModulesContent() {
  return (
    <div className="grid gap-3 sm:grid-cols-5">
      {modules.map((m) => (
        <div
          key={m.key}
          className="rounded-lg border border-jade/15 bg-ink/20 p-3"
        >
          <div
            className="mb-2 inline-block rounded px-2 py-0.5 text-xs font-600 text-white"
            style={{ background: m.accent }}
          >
            {m.key}
          </div>
          <p className="text-sm font-500 text-sand">{m.title}</p>
          <ul className="mt-2 space-y-1">
            {m.items.map((item) => (
              <li key={item} className="text-xs text-sand-dim">
                · {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/* ─── 海境完整案例展開 ─── */
/* ─── 主元件 ─── */
export function CasesPreview() {
  const haijing = caseStudies.find((c) => c.slug === "kenting-haijing");

  return (
    <section
      id="cases"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-ink py-20"
    >
      <div className="glow-jade absolute -left-40 top-1/3 h-[44rem] w-[44rem] opacity-50" />

      <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Case Studies · 合作案例"
          title="實地驗證的餘韻策略"
          sub=""
        />

        {/* 海境卡片 */}
        {haijing && (
          <Reveal delay={0.5}>
            <div className="mt-10 rounded-2xl border border-jade/25 bg-moss/20 overflow-hidden">
              {/* Cover image */}
              <div className="relative h-48 w-full bg-gradient-to-br from-pine to-moss lg:h-56">
                <img
                  src={haijing.cover}
                  alt={haijing.name}
                  className="h-full w-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                <div className="absolute bottom-4 left-6 right-6">
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[0.65rem] tracking-wide ${toneMap[haijing.statusTone] ?? toneMap.done}`}
                    >
                      {haijing.status}
                    </span>
                    <span className="text-xs text-sand/80">{haijing.location}</span>
                    <span className="text-xs text-sand/80">·</span>
                    <span className="text-xs text-sand/80">{haijing.category}</span>
                  </div>
                  <h3 className="mt-2 font-serif-tc text-2xl font-500 text-sand">
                    {haijing.name}
                  </h3>
                </div>
              </div>

              <div className="p-6 lg:p-8">
                <p className="text-sm leading-relaxed text-sand-dim">
                  {haijing.summary}
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <a
                    href="/cases/haijing"
                    className="rounded-full border border-jade/30 px-4 py-1.5 text-xs text-jade-soft transition-all hover:bg-jade hover:text-ink"
                  >
                    查看完整案例 →
                  </a>
                </div>

              {/* 展開：市場數據與體驗計畫 */}
              <div className="mt-4 space-y-3">
                <ExpandPanel label="Phase 1 · 市場現況" hint="住房率與均價趨勢">
                  <MarketContent />
                </ExpandPanel>
                <ExpandPanel label="Phase 2 · 海境生活體驗計畫" hint="五大模組 A–E">
                  <ModulesContent />
                </ExpandPanel>
              </div>

              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
