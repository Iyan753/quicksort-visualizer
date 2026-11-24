"use client";

import { motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  BookOpen,
  Database,
  Layers3,
  MousePointerClick,
  Play,
  Sparkles,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { COMPLEXITY_METRICS, TONE_CLASSES } from "@/lib/constants";

const PREVIEW_VALUES = [42, 18, 64, 30, 88, 12, 55, 26];

const PREVIEW_COLORS = [
  "from-emerald-400 to-teal-600",
  "from-indigo-400 to-violet-600",
  "from-indigo-400 to-violet-600",
  "from-amber-300 to-yellow-500",
  "from-indigo-400 to-violet-600",
  "from-rose-400 to-orange-500",
  "from-indigo-400 to-violet-600",
  "from-fuchsia-400 to-purple-600",
];

const METRIC_ICONS = {
  best: TrendingUp,
  average: Activity,
  worst: TrendingDown,
  space: Database,
} as const;

export function Dashboard() {
  return (
    <section id="dashboard" className="relative scroll-mt-20 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 pb-16 pt-12 sm:px-6 sm:pt-16 lg:px-8 lg:pb-24 lg:pt-20">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="chip border-violet-400/20 bg-violet-400/[0.07] text-violet-200">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-violet-300" />
              </span>
              Algoritma Sorting · Divide &amp; Conquer
            </span>

            <h1 className="mt-5 text-balance text-[2.6rem] font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]">
              <span className="text-gradient">Quick Sort</span>
              <br />
              <span className="text-white">Algorithm Visualizer</span>
            </h1>

            <p className="mt-6 max-w-xl text-balance text-sm leading-relaxed text-slate-400 sm:text-base">
              Pahami cara Quick Sort memilih pivot, mempartisi data, menukar elemen, dan
              berulang secara rekursif — divisualisasikan langkah demi langkah, bukan sekadar
              hasil akhir.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href="#visualizer" className="btn-primary group px-6 py-3.5">
                <Play className="h-4 w-4 fill-current" />
                Mulai Visualisasi
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a href="#algoritma" className="btn-secondary px-6 py-3.5">
                <BookOpen className="h-4 w-4" />
                Pelajari Algoritma
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1.5">
                <Layers3 className="h-3.5 w-3.5 text-violet-400/80" />
                5–30 elemen
              </span>
              <span className="inline-flex items-center gap-1.5">
                <MousePointerClick className="h-3.5 w-3.5 text-violet-400/80" />
                Kontrol step-by-step
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-violet-400/80" />
                Trace algoritma asli
              </span>
            </div>

            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {COMPLEXITY_METRICS.map((metric, index) => {
                const Icon = METRIC_ICONS[metric.key as keyof typeof METRIC_ICONS];
                const tone = TONE_CLASSES[metric.tone];

                return (
                  <motion.div
                    key={metric.key}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.25 + index * 0.07 }}
                    className={`card p-3.5 transition-colors duration-300 ${tone.border}`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider text-slate-500"
                        title={metric.label}
                      >
                        {metric.key === "space" ? "Space" : metric.label}
                      </span>
                      <Icon className={`h-3.5 w-3.5 ${tone.text}`} />
                    </div>
                    <p className={`mt-2 font-mono text-sm font-semibold ${tone.text}`}>
                      {metric.notation}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-tr from-violet-600/20 via-transparent to-indigo-500/10 blur-2xl" />

            <div className="relative card-strong overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3.5">
                <div className="flex items-center gap-1.5" aria-hidden="true">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
                </div>
                <span className="font-mono text-[11px] text-slate-500">quick-sort.trace</span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                  live
                </span>
              </div>

              <div className="px-5 pb-5 pt-6">
                <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-slate-500">
                  <span>Partition · subarray 0–7</span>
                  <span className="font-mono normal-case tracking-normal text-slate-400">
                    langkah 24 / 61
                  </span>
                </div>

                <div className="mt-4 flex h-48 items-end gap-1.5 sm:h-56 sm:gap-2">
                  {PREVIEW_VALUES.map((value, index) => {
                    const height = 22 + (value / 88) * 78;
                    const isPivot = index === PREVIEW_VALUES.length - 1;
                    return (
                      <div key={index} className="flex h-full flex-1 items-end">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{
                            duration: 0.7,
                            delay: 0.3 + index * 0.05,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          className={`flex w-full items-start justify-center rounded-t-md bg-gradient-to-t ${PREVIEW_COLORS[index]} ${
                            isPivot
                              ? "shadow-[0_0_24px_-4px_rgba(232,121,249,0.65)] ring-1 ring-fuchsia-300/50"
                              : "opacity-85"
                          }`}
                          style={{ minHeight: 28 }}
                        >
                          <span className="pt-1 font-mono text-[9px] font-semibold text-white/80 sm:text-[10px]">
                            {value}
                          </span>
                        </motion.div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 flex h-1 items-center justify-between gap-1" aria-hidden="true">
                  {PREVIEW_VALUES.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1 flex-1 rounded-full ${
                        index <= 4 ? "bg-violet-500/70" : "bg-white/10"
                      }`}
                    />
                  ))}
                </div>

                <div className="mt-4 rounded-xl border border-white/[0.06] bg-ink-950/70 p-3 font-mono text-[11px] leading-relaxed text-slate-400">
                  <div>
                    <span className="text-fuchsia-300">pivot</span> ← arr[high]{" "}
                    <span className="text-slate-600">{"// 26"}</span>
                  </div>
                  <div>
                    <span className="text-sky-300">if</span> arr[j] &lt; pivot →{" "}
                    <span className="text-emerald-300">kiri</span>
                    <span className="text-slate-600">, else → kanan</span>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-fuchsia-400" /> Pivot
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-300" /> Dibandingkan
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400" /> Ditukar
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Terurut
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-white/[0.06] pt-3 text-[10px] text-slate-500">
                  <span className="inline-flex items-center gap-1.5">
                    <Layers3 className="h-3 w-3 text-emerald-400/80" />
                    In-place · tanpa array bantu
                  </span>
                  <span className="font-mono text-violet-300">O(log n) space</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
