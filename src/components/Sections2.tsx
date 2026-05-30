"use client";

import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import {
  esg,
  esgMotto,
  metrics,
  scenarios,
  marketStatus,
  pricing,
  team,
  brand,
} from "@/lib/content";

/* ---------------- ESG ---------------- */
export function ESG() {
  return (
    <section id="esg" className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0">
      <div className="glow-jade absolute right-0 top-1/4 h-[40rem] w-[40rem] opacity-40" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Phase 3 · ESG 永續方向"
          title="不打擾自然，也是一種款待"
        />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {esg.map((e, i) => (
            <Reveal key={e.letter} delay={i + 1}>
              <div className="h-full rounded-2xl border border-jade/15 bg-moss/25 p-8 transition-all duration-500 hover:border-jade/40">
                <div className="flex items-center gap-4">
                  <span
                    className="flex h-14 w-14 items-center justify-center rounded-full font-serif-tc text-2xl font-600 text-white"
                    style={{ background: e.color }}
                  >
                    {e.letter}
                  </span>
                  <div>
                    <p className="text-sm text-sand-dim">{e.label}</p>
                    <p className="font-500 text-sand">{e.sub}</p>
                  </div>
                </div>
                <ul className="mt-6 space-y-3">
                  {e.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-relaxed text-sand-dim"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: e.color }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={2}>
          <p className="mx-auto mt-14 max-w-3xl text-center font-serif-tc text-lg italic leading-relaxed text-jade-soft">
            「{esgMotto}」
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 市場現況 (p03) ---------------- */
export function MarketOverview() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0">
      <div className="absolute inset-0 bg-gradient-to-b from-ink to-pine" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow={marketStatus.eyebrow}
          title={marketStatus.title}
        />
        <div className="mt-14 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* 表格 */}
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-jade/20 text-left text-sand-dim">
                  <th className="pb-3 font-500">年度</th>
                  <th className="pb-3 font-500">住房率</th>
                  <th className="pb-3 font-500">均價（NT$）</th>
                  <th className="pb-3 font-500">YoY 住房率</th>
                </tr>
              </thead>
              <tbody>
                {marketStatus.rows.map((r) => (
                  <tr key={r.year} className="border-b border-sand/5">
                    <td className="py-3 font-500 text-sand">{r.year}</td>
                    <td className="py-3 text-sand-dim">{r.occ}</td>
                    <td className="py-3 text-sand-dim">{r.adr}</td>
                    <td className="py-3 text-sand-dim">{r.yoy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* 右側摘要卡片 */}
          <Reveal delay={1}>
            <div className="flex flex-col gap-4 rounded-2xl border border-jade/20 bg-moss/30 p-6 lg:w-56">
              <div className="text-center">
                <p className="font-serif-tc text-3xl font-600 text-red-400">
                  {marketStatus.summary.occDrop}
                </p>
                <p className="mt-1 text-xs text-sand-dim">
                  住房率（{marketStatus.summary.period}）
                </p>
              </div>
              <div className="border-t border-sand/10 pt-4 text-center">
                <p className="font-serif-tc text-3xl font-600 text-red-400">
                  {marketStatus.summary.adrDrop}
                </p>
                <p className="mt-1 text-xs text-sand-dim">
                  均價（{marketStatus.summary.period}）
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-6 text-right text-xs text-sand-dim/60">
          <span>pp = percentage point（百分點）</span>
        </div>
        <Reveal delay={1}>
          <div className="mt-8 rounded-xl border border-gold/20 bg-gold/5 px-6 py-5 text-sm text-sand-dim">
            {marketStatus.note}
          </div>
        </Reveal>
        <p className="mt-4 text-right text-xs text-sand-dim/40">
          {marketStatus.source}
        </p>
      </div>
    </section>
  );
}

/* ---------------- 數據成效 + 三情境 ---------------- */
export function Metrics() {
  return (
    <section className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0">
      <div className="absolute inset-0 bg-gradient-to-b from-ink to-pine" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="Phase 1 · 收益預測"
          title="AfterTone 介入後的成長預測"
          sub="以 12 間客房 × 365 日試算。我們推薦「穩健情境」，6–9 個月可達成，為本提案預設目標。"
        />

        {/* KPI cards */}
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={i + 1}>
              <div className="rounded-2xl border border-jade/20 bg-moss/30 p-8 text-center">
                <p className="font-serif-tc text-4xl font-600 text-jade-soft lg:text-5xl">
                  {m.value}
                </p>
                <p className="mt-3 text-sm font-500 text-sand">{m.label}</p>
                <p className="mt-1 text-xs text-sand-dim">{m.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Scenarios */}
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {scenarios.map((s, i) => (
            <Reveal key={s.name} delay={i + 1}>
              <div
                className={`relative h-full rounded-2xl border p-7 transition-all duration-400 ${
                  s.star
                    ? "border-jade bg-jade/10 md:-translate-y-3"
                    : "border-sand/10 bg-pine/40"
                }`}
              >
                {s.star && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-jade px-4 py-1 text-xs font-500 text-ink">
                    ★ 推薦預設目標
                  </span>
                )}
                <h3 className="font-serif-tc text-xl font-500 text-sand">
                  {s.name}情境
                </h3>
                <dl className="mt-5 space-y-3 text-sm">
                  <Row k="住房率目標" v={s.occ} extra={s.occUp} />
                  <Row k="均價目標" v={s.adr} extra={s.adrUp} />
                  <Row k="年收益增量" v={s.rev} accent />
                </dl>
                <p className="mt-5 border-t border-sand/10 pt-4 text-xs italic text-sand-dim">
                  {s.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* pp 註解 */}
        <p className="mt-6 text-right text-xs text-sand-dim/50">
          pp = percentage point（百分點），指住房率絕對值的增減幅度。
        </p>
      </div>
    </section>
  );
}

function Row({
  k,
  v,
  extra,
  accent,
}: {
  k: string;
  v: string;
  extra?: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-sand-dim">{k}</dt>
      <dd className={`font-500 ${accent ? "text-jade-soft" : "text-sand"}`}>
        {v}
        {extra && <span className="ml-2 text-xs text-jade">{extra}</span>}
      </dd>
    </div>
  );
}

/* ---------------- 費用方案 ---------------- */
export function Pricing() {
  const allRows = [
    { item: pricing.part1.label, unit: "", price: "", isHeader: true },
    ...pricing.part1.rows.map((r) => ({ ...r, isHeader: false })),
    { item: pricing.part2.label, unit: "", price: "", isHeader: true },
    ...pricing.part2.rows.map((r) => ({ ...r, isHeader: false })),
  ];
  return (
    <section id="pricing" className="relative flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0" data-theme="light">
      <div className="absolute inset-0 bg-paper" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          dark
          eyebrow="合作模式 · 費用總覽"
          title="服務費用說明"
          sub=""
        />

        <Reveal delay={1}>
          <table className="mt-14 w-full text-sm">
            <tbody>
              {allRows.map((r) =>
                r.isHeader ? (
                  <tr key={r.item} className="border-b border-char/15">
                    <td
                      colSpan={3}
                      className="pb-2 pt-8 text-sm font-600 text-char/80"
                    >
                      {r.item}
                    </td>
                  </tr>
                ) : (
                  <tr key={r.item} className="border-b border-char/8">
                    <td className="py-3 text-char/70">{r.item}</td>
                    <td className="py-3 text-center text-char/50">{r.unit}</td>
                    <td className="py-3 text-right font-500 text-char">
                      {r.price}
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        </Reveal>

        <Reveal delay={2}>
          <p className="mt-10 text-xs text-char/50">{pricing.footer}</p>
          <p className="mt-2 text-xs italic text-char/40">{pricing.note}</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 團隊 ---------------- */
export function Team() {
  return (
    <section id="team" className="relative py-28 lg:py-36">
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          eyebrow="顧問團隊"
          title="跨域整合 · 深耕旅宿"
          sub=""
        />
        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {team.map((t, i) => (
            <Reveal key={t.name} delay={i + 1}>
              <div className="group h-full rounded-2xl border border-jade/15 bg-moss/25 p-8 text-center transition-all duration-500 hover:border-jade/40 hover:bg-moss/40">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-jade/30 font-serif-tc text-2xl text-jade transition-colors group-hover:bg-jade group-hover:text-ink">
                  {t.name.slice(-2, -1)}
                </div>
                <h3 className="mt-5 font-serif-tc text-xl font-500 text-sand">
                  {t.name}
                </h3>
                <p className="mt-1 text-sm text-jade-soft">{t.role}</p>
                <p className="mt-3 text-xs leading-relaxed text-sand-dim">
                  {t.skills}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 聯繫 CTA ---------------- */
export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden flex min-h-screen flex-col justify-center py-20 md:h-screen md:min-h-0 md:py-0">
      <div className="absolute inset-0 bg-gradient-to-br from-pine via-ink to-moss" />
      <div className="glow-jade absolute left-1/2 top-1/2 h-[50rem] w-[50rem] -translate-x-1/2 -translate-y-1/2" />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal>
          <p className="eyebrow mb-6 text-jade">開始合作</p>
        </Reveal>
        <Reveal delay={0.5}>
          <h2 className="font-serif-tc text-3xl font-500 leading-snug text-sand sm:text-4xl lg:text-5xl">
            旅行中的美好記憶
            <br />
            只屬於你自己
          </h2>
        </Reveal>
        <Reveal delay={1}>
          <p className="mt-4 font-serif-tc text-2xl font-500 text-jade sm:text-3xl lg:text-4xl">
            餘韻，只有你懂
          </p>
        </Reveal>
        <Reveal delay={1.5}>
          <div className="mt-6 h-px w-16 bg-jade/60" />
        </Reveal>
        <Reveal delay={2}>
          <p className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-sand-dim">
            <span>三年品牌脈絡</span><span className="text-jade/40">×</span>
            <span>市場收益提升</span><span className="text-jade/40">×</span>
            <span>五大體驗模組</span><span className="text-jade/40">×</span>
            <span>ESG 永續方向</span>
          </p>
        </Reveal>
        <Reveal delay={2.5}>
          <p className="mt-4 text-base text-sand-dim">
            AfterTone Hospitality Lab 陪伴海境，走向下一個十年。
          </p>
        </Reveal>

        {/* KPI targets */}
        <Reveal delay={3}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { label: "住房率目標", value: "38%", note: "較現況 +11pp" },
              { label: "均價目標", value: "NT$7,700", note: "較現況 +NT$1,075" },
              { label: "年收益增量", value: "NT$3M+", note: "穩健情境估算" },
            ].map((k) => (
              <div
                key={k.label}
                className="rounded-xl border border-jade/20 bg-moss/20 px-6 py-5 text-center"
              >
                <p className="text-xs font-500 text-jade">{k.label}</p>
                <p className="mt-2 font-serif-tc text-2xl font-600 text-sand lg:text-3xl">{k.value}</p>
                <p className="mt-1 text-xs text-sand-dim">{k.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={3.5}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href={`mailto:${brand.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-jade px-8 py-4 text-sm font-500 text-ink transition-all hover:gap-3 hover:bg-jade-soft"
            >
              {brand.email}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- 頁尾 ---------------- */
export function Footer() {
  return (
    <footer className="border-t border-jade/10 bg-ink py-10">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10">
        {/* Left — brand */}
        <div>
          <p className="font-serif-tc text-lg font-600 text-sand">
            After<span className="text-jade">Tone</span> Hospitality Lab
          </p>
          <p className="mt-1 text-sm text-sand-dim">{brand.nameZh}</p>
          <p className="mt-1 text-xs italic text-sand-dim/60">{brand.tagline}</p>
        </div>

        {/* Center — nav links */}
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-sand-dim">
          <a href="#philosophy" className="transition-colors hover:text-jade">關於我們</a>
          <a href="#process" className="transition-colors hover:text-jade">服務項目</a>
          <a href="#pricing" className="transition-colors hover:text-jade">合作方案</a>
          <a href="#cases" className="transition-colors hover:text-jade">案例分享</a>
          <a href="#contact" className="transition-colors hover:text-jade">聯繫我們</a>
        </nav>

        {/* Right — contact & copyright */}
        <div className="flex flex-col gap-1.5 lg:text-right">
          <a
            href={`mailto:${brand.email}`}
            className="text-sm text-sand-dim transition-colors hover:text-jade"
          >
            {brand.email}
          </a>
          <p className="text-[0.65rem] text-sand-dim/50">
            © {brand.year} 餘是旅宿管理顧問有限公司 AfterTone Hospitality Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
