"use client";

import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import {
  pillars,
  philosophyLines,
  timeline,
  process,
  modules,
  pricingSimple,
} from "@/lib/content";

/* ---------------- 品牌定位 ---------------- */
export function Philosophy() {
  return (
    <section id="philosophy" className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Phase 2 · 品牌定位"
          title="靜感沉浸式體驗旅宿"
          sub=""
        />

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.no} delay={i + 1}>
              <div className="group relative h-full overflow-hidden rounded-2xl border border-jade/15 bg-moss/30 p-8 transition-all duration-500 hover:border-jade/40 hover:bg-moss/50">
                <div className="absolute right-4 -top-4 font-serif-tc text-8xl font-300 text-jade/10 transition-all duration-500 group-hover:text-jade/20">
                  {p.no}
                </div>
                <h3 className="relative font-serif-tc text-2xl font-500 text-sand">
                  {p.title}
                </h3>
                <div className="my-4 h-px w-10 bg-jade/40" />
                <p className="relative text-sm leading-relaxed text-sand-dim">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 靜感標語 */}
        <div className="mt-20 rounded-2xl bg-gradient-to-r from-pine to-moss/40 px-8 py-12 lg:px-16">
          <div className="flex flex-col items-center justify-center gap-6 text-center md:flex-row md:gap-10">
            {philosophyLines.map((line, i) => (
              <Reveal key={line} delay={i + 1}>
                <p className="font-serif-tc text-lg text-jade-soft md:text-xl">
                  {line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 品牌脈絡時間軸 ---------------- */
export function Timeline() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0" data-theme="light">
      <div className="absolute inset-0 bg-paper" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow="Phase 1 · 品牌脈絡"
          title="三年的種子，今日的根基"
          sub="三年前的「緩慢」，是今日一切的起點。"
        />
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={i + 1}>
              <div className="relative h-full rounded-2xl border border-char/10 bg-white/50 p-8 shadow-sm">
                <div className="flex items-baseline gap-4">
                  <span className="font-serif-tc text-5xl font-300 text-jade">
                    {t.year}
                  </span>
                  <span className="text-lg font-500 text-char">{t.title}</span>
                </div>

                {/* 品牌名（緩慢／獨享）各自帶描述 — 僅 2023 發想階段有 */}
                {t.brands.length > 0 && (
                  <div className="mt-6 space-y-3">
                    {t.brands.map((b) => (
                      <div key={b.name} className="flex items-baseline gap-3">
                        <span className="rounded-full border border-jade/40 bg-jade/5 px-4 py-1 font-serif-tc text-base font-500 text-jade">
                          {b.name}
                        </span>
                        <span className="text-sm text-char/70">{b.desc}</span>
                      </div>
                    ))}
                  </div>
                )}

                <ul className="mt-6 space-y-3">
                  {t.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-char/70"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade" />
                      {item}
                    </li>
                  ))}
                </ul>
                {i === 0 && (
                  <div className="absolute -right-4 top-1/2 hidden -translate-y-1/2 text-3xl text-jade/40 md:block">
                    →
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 六步驟服務流程 ---------------- */
export function Process() {
  return (
    <section id="process" className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0">
      <div className="glow-jade absolute left-1/3 top-0 h-[40rem] w-[40rem] opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="PHASE 1 · 市場及收益顧問服務"
          title="六步驟服務流程"
        />

        {/* 橫向流程標題列 */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-0">
          {process.map((p, i) => (
            <div key={p.no} className="flex items-center">
              <div className="flex h-14 items-center justify-center rounded-lg bg-jade px-5 text-center text-sm font-600 leading-tight text-ink">
                {p.title}
              </div>
              {i < process.length - 1 && (
                <span className="px-1 text-jade/60">▸</span>
              )}
            </div>
          ))}
        </div>

        {/* 各步驟的子項（膠囊式） */}
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {process.map((p, i) => (
            <Reveal key={p.no} delay={i + 1}>
              <div className="flex flex-col items-start gap-3">
                <span className="text-xs font-500 text-jade">
                  {p.no}. {p.title}
                </span>
                <div className="flex flex-wrap gap-2">
                  {p.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-jade/20 bg-pine/50 px-4 py-1.5 text-sm text-sand-dim"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 服務費用 */}
        <Reveal delay={2}>
          <div className="mt-16 border-t border-jade/15 pt-8">
            <p className="mb-5 text-xs font-500 tracking-widest text-sand-dim">
              服務費用
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {pricingSimple.map((p) => (
                <div
                  key={p.title}
                  className="flex items-center justify-between rounded-lg border border-jade/20 bg-jade/5 px-5 py-3"
                >
                  <span className="text-sm font-500 text-sand">{p.title}</span>
                  <span className="text-sm text-jade-soft">
                    {p.price}
                    {p.unit !== "一次性" ? p.unit : " 起"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 五大體驗模組 ---------------- */
export function Modules() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0" id="modules" data-theme="light">
      <div className="absolute inset-0 bg-paper-2" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow="Phase 2 · 海境生活體驗計畫"
          title="五大體驗模組 — 豐盛，但互不打擾"
          sub=""
        />
        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {modules.map((m, i) => (
            <Reveal key={m.key} delay={i + 1}>
              <div className="flex h-full flex-col overflow-hidden rounded-xl border border-char/10 bg-white shadow-sm">
                {/* 彩色標題區 */}
                <div
                  className="px-5 py-4 text-center"
                  style={{ background: m.accent }}
                >
                  <span className="block font-serif-tc text-2xl font-600 text-white">
                    {m.key}
                  </span>
                  <span className="mt-1 block text-sm font-500 text-white/90">
                    {m.title}
                  </span>
                </div>
                {/* 子項目（膠囊列表） */}
                <div className="flex flex-1 flex-col gap-2 p-4">
                  {m.items.map((item) => (
                    <div
                      key={item}
                      className="rounded-lg border border-char/10 bg-white px-4 py-2 text-center text-sm text-char/80"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 執行時程列 */}
        <Reveal delay={2}>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <span className="text-sm font-500 text-char/60">執行時程</span>
            {modules.map((m) => (
              <span
                key={m.key}
                className="rounded-full border px-4 py-1.5 text-xs font-500"
                style={{
                  borderColor: m.accent,
                  color: m.accent,
                }}
              >
                {m.phase}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
