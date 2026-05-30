"use client";

import { motion } from "motion/react";
import { haijingPageData as d } from "@/lib/haijing-case-data";
import ZoomableImage from "./ZoomableImage";

/* ─── Reveal animation wrapper ─── */
function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section wrapper ─── */
function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`border-b border-jade/8 py-16 lg:py-24 ${className}`}>
      <div className="mx-auto max-w-6xl px-6 lg:px-10">{children}</div>
    </section>
  );
}

/* ─── 小標 ─── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-500 uppercase tracking-[0.2em] text-jade">{children}</p>;
}

/* ─── 折線圖：觀光人潮 / 搜尋熱度（支援多條折線）─── */
type ChartItem = { year: string; value: number; label?: string };
type ExtraSeries = { color: string; values: number[] };

/** 將 "2022/7" 格式轉為 "2022/Q3" 季標籤 */
function toQuarterLabel(yearStr: string): string {
  const parts = yearStr.split("/");
  if (parts.length !== 2) return yearStr;
  const month = parseInt(parts[1], 10);
  const q = month <= 3 ? "Q1" : month <= 6 ? "Q2" : month <= 9 ? "Q3" : "Q4";
  return `${parts[0]}/${q}`;
}

function TourismLineChart({
  data,
  extraSeries = [],
  height = 260,
  yLabel,
  xTickEvery = 1,
}: {
  data: ChartItem[];
  extraSeries?: ExtraSeries[];
  height?: number;
  yLabel?: string;
  /** X 軸每隔幾個資料點顯示一個刻度（預設 1=每點都顯示） */
  xTickEvery?: number;
}) {
  const W = 900;
  const H = height;
  const PAD = { top: 32, right: 24, bottom: 56, left: 48 };
  const chartW = W - PAD.left - PAD.right;
  const chartH = H - PAD.top - PAD.bottom;

  // 合併所有系列取 maxVal
  const allVals = [
    ...data.map((d) => d.value),
    ...extraSeries.flatMap((s) => s.values),
  ];
  const maxVal = Math.max(...allVals);
  const minVal = 0;

  const xStep = chartW / (data.length - 1);
  const toX = (i: number) => PAD.left + i * xStep;
  const toY = (v: number) => PAD.top + chartH - ((v - minVal) / (maxVal - minVal)) * chartH;

  const makePolyline = (values: number[]) =>
    values.map((v, i) => `${toX(i)},${toY(v)}`).join(" ");

  const areaPath = [
    `M ${toX(0)},${toY(data[0].value)}`,
    ...data.map((d, i) => `L ${toX(i)},${toY(d.value)}`),
    `L ${toX(data.length - 1)},${PAD.top + chartH}`,
    `L ${toX(0)},${PAD.top + chartH}`,
    "Z",
  ].join(" ");

  // Y 軸刻度：取 5 個均等格線
  const yTicks = Array.from({ length: 5 }, (_, i) => Math.round((maxVal / 4) * i));
  const isSearchIndex = yLabel === "搜尋指數";

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full max-w-full"
      aria-label={yLabel ?? "折線圖"}
    >
      <defs>
        <linearGradient id="lineAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5a9e7c" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#5a9e7c" stopOpacity="0.03" />
        </linearGradient>
      </defs>

      {/* Y 軸格線 */}
      {yTicks.map((v) => (
        <g key={v}>
          <line
            x1={PAD.left} y1={toY(v)}
            x2={PAD.left + chartW} y2={toY(v)}
            stroke="#5a9e7c" strokeOpacity="0.12" strokeDasharray="4 4"
          />
          <text x={PAD.left - 6} y={toY(v) + 4} textAnchor="end" fontSize="10" fill="#9ab8a4" opacity="0.7">
            {isSearchIndex ? v : `${v}萬`}
          </text>
        </g>
      ))}

      {/* Area fill (主系列) */}
      {extraSeries.length === 0 && <path d={areaPath} fill="url(#lineAreaGrad)" />}

      {/* 主系列折線 */}
      <polyline
        points={makePolyline(data.map((d) => d.value))}
        fill="none"
        stroke="#5a9e7c"
        strokeWidth="2.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* 額外系列折線 */}
      {extraSeries.map((s, si) => (
        <polyline
          key={si}
          points={makePolyline(s.values)}
          fill="none"
          stroke={s.color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray={si === 0 ? "none" : si === 1 ? "6 3" : "2 4"}
        />
      ))}

      {/* X 軸標籤 + 資料點 */}
      {data.map((item, i) => {
        const x = toX(i);
        const y = toY(item.value);
        const isHighlight = !!item.label;
        // xTickEvery > 1 時，只在符合間隔的索引顯示刻度（或峰值點也顯示）
        const showTick = xTickEvery <= 1 || i % xTickEvery === 0;
        const tickLabel = xTickEvery > 1 ? toQuarterLabel(item.year) : item.year;
        return (
          <g key={item.year}>
            <circle cx={x} cy={y} r={isHighlight ? 5 : 3} fill={isHighlight ? "#f0c97c" : "#5a9e7c"} />
            {(!isSearchIndex || item.label) && (
              <text
                x={x} y={y - 10}
                textAnchor="middle" fontSize="9.5"
                fill={isHighlight ? "#f0c97c" : "#9ab8a4"}
                opacity="0.9"
              >
                {item.label ?? `${item.value}萬`}
              </text>
            )}
            {showTick && (
              <text
                x={x} y={PAD.top + chartH + 18}
                textAnchor="middle" fontSize={xTickEvery > 1 ? "9" : (data.length > 16 ? "8" : "10")}
                fill="#9ab8a4" opacity="0.7"
                transform={`rotate(-35 ${x} ${PAD.top + chartH + 18})`}
              >
                {tickLabel}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/* ════════════════════════════════════════════ */
export function HaijingCasePage() {
  return (
    <article>
      {/* ─── Hero / Cover ─── */}
      <section className="relative flex min-h-[70vh] flex-col items-center justify-center text-center">
        {/* Background image */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/cases/haijing-exterior.jpg"
            alt="墾丁海境渡假民宿"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/40 to-ink" />
        </div>
        <div className="relative z-10">
          <Reveal>
            <p className="eyebrow text-jade">{d.cover.eyebrow}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h1 className="mt-4 font-serif-tc text-4xl font-600 text-sand sm:text-5xl lg:text-6xl">
              {d.cover.title}
            </h1>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="mt-4 text-lg text-sand-dim">{d.cover.subtitle}</p>
          </Reveal>
          <Reveal delay={0.6}>
            <div className="mt-6 flex items-center gap-3 text-sm text-sand-dim/60">
              <span>{d.intro.date}</span>
              <span>·</span>
              <span>{d.intro.name}</span>
              <span>·</span>
              <span>{d.intro.subtitle}</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── 輪播圖 ─── */}
      <Section>
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            <img src="/images/cases/haijing-exterior.jpg" alt="海境渡假民宿外觀" className="w-full rounded-xl object-cover aspect-[16/10]" />
            <img src="/images/cases/haijing-room-ocean.jpg" alt="海景雙人房" className="w-full rounded-xl object-cover aspect-[16/10]" />
          </div>
        </Reveal>
      </Section>

      {/* ─── 墾丁市場概況 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>市場概況</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.marketOverview.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {d.marketOverview.items.map((item) => (
              <div key={item} className="rounded-xl border border-jade/15 bg-moss/10 px-6 py-5 text-center">
                <p className="text-base font-500 text-sand">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Section>

      {/* ─── 觀光局數據 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>觀光人潮趨勢</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.tourismData.title}</h2>
          <p className="mt-1 text-sm text-sand-dim">{d.tourismData.subtitle} <span className="text-sand-dim/60">{d.tourismData.unit}</span></p>
          <p className="mt-2 text-sm text-red-400">{d.tourismData.highlight}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <ul className="mt-6 space-y-2">
            {d.tourismData.points.map((p) => (
              <li key={p} className="flex items-baseline gap-2 text-sm text-sand-dim">
                <span className="text-jade">•</span> {p}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 overflow-hidden">
            {/* 折線圖 SVG */}
            <TourismLineChart data={d.tourismData.chartData} />
          </div>
        </Reveal>
      </Section>

      {/* ─── Google 搜尋熱度 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>搜尋熱度</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.googleTrends.title}</h2>
          <p className="mt-1 text-xs text-jade/60">資料來源：Google Trends TW ／ 實際查詢時間 2026-05-30 ／ 相對搜尋指數 0–100</p>
        </Reveal>

        {/* Chart1：五年三區域比較，墾丁峰值標記 */}
        <Reveal delay={0.2}>
          <div className="mt-8 rounded-xl border border-jade/10 bg-moss/5 p-4 sm:p-6 overflow-hidden">
            <h3 className="text-sm font-500 text-sand">{d.googleTrends.chart1.subtitle}</h3>
            <p className="mt-1 text-xs text-sand-dim">{d.googleTrends.chart1.note}</p>
            <div className="mt-3 flex flex-wrap gap-3">
              {d.googleTrends.chart1.series.map((s) => (
                <span key={s.name} className="flex items-center gap-1.5 text-xs text-sand-dim">
                  <span className="inline-block h-2 w-6 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.name}
                </span>
              ))}
            </div>
            <TourismLineChart
              data={d.googleTrends.chart1.labels.map((label, i) => ({
                year: label,
                value: d.googleTrends.chart1.series[0].values[i] ?? 0,
                label: i === d.googleTrends.chart1.peakIndex ? d.googleTrends.chart1.peakLabel : undefined,
              }))}
              extraSeries={d.googleTrends.chart1.series.slice(1).map((s) => ({
                color: s.color,
                values: s.values,
              }))}
              height={320}
              yLabel="搜尋指數"
            />
          </div>
        </Reveal>

        {/* Chart2：墾丁完整走勢單條折線 */}
        <Reveal delay={0.35}>
          <div className="mt-6 rounded-xl border border-jade/10 bg-moss/5 p-4 sm:p-6 overflow-hidden">
            <h3 className="text-sm font-500 text-sand">{d.googleTrends.chart2.subtitle}</h3>
            <p className="mt-1 text-xs text-sand-dim">{d.googleTrends.chart2.note}</p>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-sand-dim">
              <span className="inline-block h-2 w-6 rounded-full" style={{ backgroundColor: d.googleTrends.chart2.color }} />
              墾丁月均搜尋指數（Google Trends TW 實際數據）
            </div>
            <TourismLineChart
              data={d.googleTrends.chart2.data}
              height={280}
              yLabel="搜尋指數"
              xTickEvery={3}
            />
          </div>
        </Reveal>
      </Section>

      {/* ─── 需求指數 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>住宿需求預估</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.demandForecast.title}</h2>
          <p className="mt-2 text-sm text-sand-dim">{d.demandForecast.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {d.demandForecast.regions.map((r) => (
              <div key={r.name} className="rounded-lg border border-jade/15 bg-moss/10 p-4 text-center">
                <p className="text-sm font-500 text-sand">{r.name}</p>
                <p className="mt-1 text-xs text-sand-dim">{r.count}</p>
                <p className="mt-2 font-serif-tc text-xl font-600 text-jade">{r.avg}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-6 rounded-lg border border-red-400/20 bg-red-400/5 p-4 text-center">
            <p className="text-sm text-red-300">{d.demandForecast.peakNote}</p>
            <p className="mt-1 text-2xl font-600 text-sand">{d.demandForecast.peakValue}</p>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-6">
            <h3 className="text-sm font-500 text-sand">{d.demandForecast.marketComparison.subtitle}</h3>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {d.demandForecast.marketComparison.data.map((item) => (
                <div key={item.name} className="rounded-lg border border-jade/10 bg-ink/20 p-4">
                  <p className="text-sm font-500 text-sand">{item.name}</p>
                  <p className="mt-1 text-lg font-600 text-jade">{item.avg}</p>
                  {item.peak && <p className="mt-1 text-xs text-red-300">高峰 {item.peak}</p>}
                </div>
              ))}
            </div>
          </div>
          {/* 簡報原始需求走勢圖 */}
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <ZoomableImage src="/images/cases/demand-forecast-regions-crop.png" alt="區域需求指數" className="w-full rounded-lg border border-jade/5" />
            <ZoomableImage src="/images/cases/demand-forecast-comparison-crop.png" alt="市場需求比較" className="w-full rounded-lg border border-jade/5" />
          </div>
        </Reveal>
      </Section>

      {/* ─── 市場總結 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>市場總結</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.marketSummary.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-6 text-base leading-relaxed text-sand-dim">{d.marketSummary.mainPoint}</p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-6 space-y-2">
            <p className="text-sm font-500 text-sand">在需求面上，消費者行為出現明顯改變</p>
            <ul className="space-y-2">
              {d.marketSummary.changes.map((c) => (
                <li key={c} className="flex items-baseline gap-2 text-sm text-sand-dim">
                  <span className="text-jade">•</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-8 rounded-xl border border-jade/20 bg-jade/5 p-6">
            <p className="text-sm leading-relaxed text-sand">{d.marketSummary.conclusion}</p>
          </div>
        </Reveal>
      </Section>

      {/* ─── 產品研究 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>產品研究</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.productResearch.title}</h2>
          <p className="mt-1 text-sm text-sand-dim">{d.productResearch.subtitle}</p>
          <span className="mt-2 inline-block rounded-full bg-jade/10 px-3 py-1 text-xs text-jade">{d.productResearch.photos}</span>
        </Reveal>
        <Reveal delay={0.2}>
          <h3 className="mt-8 text-base font-500 text-sand">{d.productResearch.reviews.title}</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {d.productResearch.reviews.platforms.map((p) => (
              <div key={p.name} className="rounded-xl border border-jade/15 bg-moss/10 p-5">
                <p className="text-xs text-sand-dim">{p.name}</p>
                <p className="mt-2 font-serif-tc text-2xl font-600 text-sand">{p.score}</p>
                <p className="mt-1 text-xs text-sand-dim">{p.reviews}</p>
                {"location" in p && p.location && (
                  <p className="mt-1 text-xs text-jade/80">{p.location}</p>
                )}
                {"tags" in p && Array.isArray(p.tags) && p.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(p.tags as string[]).map((tag: string) => (
                      <span key={tag} className="rounded-full bg-jade/10 px-2 py-0.5 text-[10px] text-jade-soft">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.25}>
          <h3 className="mt-8 text-sm font-500 text-sand">顧客評語精選</h3>
          <div className="mt-4 space-y-3">
            {d.productResearch.reviews.testimonials.map((t, i) => (
              <div key={i} className="rounded-lg border border-jade/10 bg-ink/30 p-4">
                <div className="flex items-center gap-2 text-xs text-sand-dim/60">
                  {"platform" in t && t.platform && (
                    <span className="rounded bg-jade/20 px-1.5 py-0.5 text-jade-soft font-500">{t.platform}</span>
                  )}
                  <span>{t.date}</span>
                  {t.score && <span className="rounded bg-jade/15 px-1.5 py-0.5 text-jade">{t.score}</span>}
                  {"label" in t && t.label && <span className="text-sand-dim/50">{t.label}</span>}
                  {"author" in t && t.author && <span>— {t.author}</span>}
                </div>
                <p className="mt-2 text-sm text-sand-dim">「{t.text}」</p>
              </div>
            ))}
          </div>
          {/* 簡報原始顧客評語截圖 */}
          <ZoomableImage src="/images/cases/customer-reviews-crop.png" alt="顧客評語截圖" className="mt-6 w-full rounded-lg border border-jade/5" />
        </Reveal>
        <Reveal delay={0.3}>
          <h3 className="mt-8 text-sm font-500 text-sand">影響顧客評分的關鍵因素</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {d.productResearch.reviews.keyFactors.map((f) => (
              <span key={f} className="rounded-full bg-jade/10 px-3 py-1 text-xs text-jade-soft">{f}</span>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-8 rounded-xl border border-jade/10 bg-moss/5 p-6">
            <h3 className="text-sm font-500 text-sand">{d.productResearch.optimization.title}</h3>
            <ol className="mt-4 space-y-2">
              {d.productResearch.optimization.points.map((p, i) => (
                <li key={i} className="flex gap-2 text-sm text-sand-dim">
                  <span className="shrink-0 text-jade">{i + 1}.</span> {p}
                </li>
              ))}
            </ol>
            {/* 簡報原始 OTA 頁面截圖 */}
            <ZoomableImage src="/images/cases/booking-listings-crop.png" alt="OTA 平台頁面截圖" className="mt-6 w-full rounded-lg border border-jade/5" />
          </div>
        </Reveal>
      </Section>

      {/* ─── 市場競爭力 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>房價競爭力</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.competitiveness.title}</h2>
          <p className="mt-2 text-sm text-sand-dim">{d.competitiveness.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {d.competitiveness.benchmarks.map((b) => (
              <div key={b.name} className="rounded-xl border border-jade/15 bg-moss/10 p-5 text-center">
                <p className="text-xs text-sand-dim">{b.name}</p>
                <p className="mt-2 font-serif-tc text-2xl font-600 text-sand">{b.value}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-6 rounded-lg border border-gold/20 bg-gold/5 px-5 py-4 text-center">
            <p className="text-sm text-sand">{d.competitiveness.insight}</p>
          </div>
          {/* 簡報原始房價比較圖表 */}
          <div className="mt-6 space-y-4">
            <ZoomableImage src="/images/cases/price-competition-daily-crop.png" alt="小旺季各日別均價" className="w-full rounded-lg border border-jade/5" />
            <ZoomableImage src="/images/cases/price-competition-range-crop.png" alt="各住宿完整價格區間" className="w-full rounded-lg border border-jade/5" />
            <ZoomableImage src="/images/cases/price-competition-rooms-crop.png" alt="各房型價格區間" className="w-full rounded-lg border border-jade/5" />
          </div>
        </Reveal>
      </Section>

      {/* ─── 現況價格分析 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>價格分析</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.pricingAnalysis.title}</h2>
        </Reveal>
        {d.pricingAnalysis.seasons.map((season, si) => (
          <Reveal key={si} delay={0.2 + si * 0.15}>
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-500 text-jade">{season.season}</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-jade/15 text-left text-sand-dim">
                      <th className="pb-2 pr-4 font-400">房型</th>
                      <th className="pb-2 pr-4 font-400">平日</th>
                      <th className="pb-2 pr-4 font-400">週五</th>
                      <th className="pb-2 pr-4 font-400">週六</th>
                      <th className="pb-2 font-400">連假</th>
                    </tr>
                  </thead>
                  <tbody>
                    {season.rooms.map((r) => (
                      <tr key={r.type} className="border-b border-jade/5">
                        <td className="py-2 font-500 text-sand">{r.type}</td>
                        <td className="py-2 text-sand-dim">${r.weekday.toLocaleString()}</td>
                        <td className="py-2 text-sand-dim">${r.friday.toLocaleString()}</td>
                        <td className="py-2 text-sand-dim">${r.saturday.toLocaleString()}</td>
                        <td className="py-2 text-sand-dim">${r.holiday.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal>
        ))}
        <Reveal delay={0.5}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {d.pricingAnalysis.notes.map((n) => (
              <div key={n.title} className="rounded-lg border border-jade/10 bg-moss/5 p-4">
                <p className="text-sm font-500 text-sand">{n.title}</p>
                <p className="mt-1 text-xs text-sand-dim">{n.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.6}>
          <p className="mt-6 rounded-lg bg-jade/5 px-4 py-3 text-xs leading-relaxed text-sand-dim">
            {d.pricingAnalysis.seasonRule}
          </p>
        </Reveal>
      </Section>

      {/* ─── 客群質變 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>客群洞察</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.audienceShift.title}</h2>
          <p className="mt-2 text-base text-sand-dim">{d.audienceShift.subtitle}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-jade/15 text-left">
                  <th className="pb-2 pr-8 font-500 text-sand-dim">舊客群</th>
                  <th className="pb-2 font-500 text-jade">新客群</th>
                </tr>
              </thead>
              <tbody>
                {d.audienceShift.comparison.map((c) => (
                  <tr key={c.old} className="border-b border-jade/5">
                    <td className="py-3 text-sand-dim/70">{c.old}</td>
                    <td className="py-3 font-500 text-sand">{c.new}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="mt-8 space-y-3">
            <div className="rounded-lg border border-jade/20 bg-jade/5 px-5 py-4">
              <p className="text-sm text-sand">{d.audienceShift.advantage}</p>
            </div>
            <div className="rounded-lg border border-gold/20 bg-gold/5 px-5 py-4">
              <p className="text-sm font-500 text-sand">{d.audienceShift.future}</p>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* ─── 總結建議方向 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>建議方向</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.recommendations.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {d.recommendations.items.map((item) => (
              <div key={item.no} className="rounded-xl border border-jade/15 bg-moss/10 p-5">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif-tc text-lg font-600 text-jade">{item.no}</span>
                  <h3 className="text-sm font-500 text-sand">{item.title}</h3>
                </div>
                <ul className="mt-3 space-y-1">
                  {item.points.map((p) => (
                    <li key={p} className="text-xs text-sand-dim">· {p}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="mt-8 rounded-xl border border-jade/20 bg-jade/5 p-6">
            <p className="text-sm leading-relaxed text-sand">{d.recommendations.conclusion}</p>
          </div>
        </Reveal>
      </Section>

      {/* ─── 旅宿營收整合方案 ─── */}
      <Section>
        <Reveal>
          <SectionLabel>服務方案</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.servicePlan.title}</h2>
          <p className="mt-2 text-sm text-sand-dim">{d.servicePlan.by}</p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {d.servicePlan.team.map((t) => (
              <div key={t.name} className="rounded-lg border border-jade/10 bg-ink/30 p-4">
                <p className="text-sm font-500 text-sand">{t.name}</p>
                <p className="mt-1 text-xs text-sand-dim">{t.role}</p>
                <p className="text-xs text-sand-dim/60">{t.experience}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {d.servicePlan.teamLogos.map((logo) => (
              <span key={logo} className="rounded-full border border-jade/10 bg-moss/5 px-3 py-1 text-[0.65rem] text-sand-dim/60">{logo}</span>
            ))}
          </div>
        </Reveal>
        {d.servicePlan.categories.map((cat, ci) => (
          <Reveal key={ci} delay={0.3 + ci * 0.1}>
            <div className="mt-6 rounded-xl border border-jade/15 bg-moss/5 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-500 text-sand">{cat.category}</h3>
                  <p className="text-xs text-sand-dim">{cat.subtitle}</p>
                </div>
                <span className="shrink-0 rounded-full bg-jade/10 px-3 py-1 text-xs font-500 text-jade">
                  {cat.price}
                </span>
              </div>
              <ul className="mt-4 space-y-1.5">
                {cat.items.map((item) => (
                  <li key={item} className="flex items-baseline gap-2 text-xs text-sand-dim">
                    <span className="text-jade/60">—</span> {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </Section>

      {/* ─── 啟動準備 ─── */}
      <Section className="border-b-0">
        <Reveal>
          <SectionLabel>啟動流程</SectionLabel>
          <h2 className="font-serif-tc text-2xl font-500 text-sand sm:text-3xl">{d.launchPrep.title}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {d.launchPrep.steps.map((step, i) => (
              <div key={i} className="relative rounded-xl border border-jade/15 bg-moss/10 p-5">
                <span className="absolute -top-2 left-4 rounded bg-jade px-2 py-0.5 text-[0.6rem] font-600 text-ink">
                  Step {i + 1}
                </span>
                <h3 className="mt-2 text-sm font-500 text-sand">{step.title}</h3>
                <p className="mt-1 text-xs text-sand-dim">{step.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.5}>
          <div className="mt-12 text-center">
            <a
              href="/#contact"
              className="inline-block rounded-full border border-jade/40 px-8 py-3 text-sm text-jade-soft transition-all hover:bg-jade hover:text-ink"
            >
              開始合作 →
            </a>
          </div>
        </Reveal>
      </Section>
    </article>
  );
}
