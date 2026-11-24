"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ArrayBarsProps {
  values: number[];
  ids: string[];
  pivotIndex: number | null;
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  range: [number, number] | null;
  sortedIndices: number[];
  /** Durasi animasi perpindahan bar dalam detik. */
  duration: number;
  /** Semua elemen sudah terurut (langkah terakhir). */
  isComplete: boolean;
}

interface BarStyle {
  gradient: string;
  ring: string;
  glow: string;
  label: string;
}

const IDLE_STYLE: BarStyle = {
  gradient: "from-slate-600/90 to-slate-700/90",
  ring: "ring-1 ring-inset ring-white/5",
  glow: "",
  label: "text-slate-300",
};

const RANGE_STYLE: BarStyle = {
  gradient: "from-indigo-400 to-violet-600",
  ring: "ring-1 ring-inset ring-white/10",
  glow: "",
  label: "text-indigo-100",
};

const SORTED_STYLE: BarStyle = {
  gradient: "from-emerald-400 to-teal-600",
  ring: "ring-1 ring-inset ring-white/15",
  glow: "shadow-[0_0_22px_-8px_rgba(52,211,153,0.75)]",
  label: "text-emerald-50",
};

const COMPARE_STYLE: BarStyle = {
  gradient: "from-amber-300 to-yellow-500",
  ring: "ring-2 ring-amber-200/60",
  glow: "shadow-[0_0_26px_-6px_rgba(251,191,36,0.8)]",
  label: "text-amber-950",
};

const SWAP_STYLE: BarStyle = {
  gradient: "from-rose-400 to-orange-500",
  ring: "ring-2 ring-rose-200/70",
  glow: "shadow-[0_0_30px_-6px_rgba(251,113,133,0.85)]",
  label: "text-rose-950",
};

const PIVOT_STYLE: BarStyle = {
  gradient: "from-fuchsia-400 to-purple-600",
  ring: "ring-2 ring-fuchsia-200/80",
  glow: "shadow-[0_0_30px_-5px_rgba(232,121,249,0.85)]",
  label: "text-fuchsia-50",
};

export function ArrayBars({
  values,
  ids,
  pivotIndex,
  comparing,
  swapping,
  range,
  sortedIndices,
  duration,
  isComplete,
}: ArrayBarsProps) {
  const count = values.length;
  const max = Math.max(...values, 1);
  const sorted = new Set(sortedIndices);
  const cellWidth = 100 / Math.max(1, count);
  const minWidth = Math.max(300, count * 24);
  const showIndices = count <= 24;

  return (
    <div className="relative min-w-0">
      <p className="sr-only">
        Array saat ini: {values.join(", ")}.
        {pivotIndex !== null ? ` Pivot berada di indeks ${pivotIndex}.` : ""}
      </p>

      <div className="w-full min-w-0 overflow-x-auto pb-1">
        <div style={{ minWidth: `${minWidth}px` }}>
          <div className="relative h-[260px] sm:h-[320px]">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />

            {range ? (
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{
                  left: `${range[0] * cellWidth}%`,
                  width: `${(range[1] - range[0] + 1) * cellWidth}%`,
                }}
                transition={{ duration, ease: [0.32, 0.72, 0, 1] }}
                className="absolute inset-y-0 rounded-xl border-x border-indigo-400/20 bg-indigo-500/[0.06]"
              />
            ) : null}

            {values.map((value, index) => {
              const isSwapping = swapping?.includes(index) ?? false;
              const isPivot = pivotIndex === index;
              const isComparing = comparing?.includes(index) ?? false;
              const isSorted = sorted.has(index);
              const inRange =
                range !== null && index >= range[0] && index <= range[1];

              const style = isSwapping
                ? SWAP_STYLE
                : isPivot
                  ? PIVOT_STYLE
                  : isComparing
                    ? COMPARE_STYLE
                    : isSorted
                      ? SORTED_STYLE
                      : inRange
                        ? RANGE_STYLE
                        : IDLE_STYLE;

              const height = 16 + (value / max) * 70;

              return (
                <motion.div
                  key={ids[index] ?? index}
                  initial={false}
                  animate={{ left: `${index * cellWidth}%` }}
                  transition={{ duration, ease: [0.32, 0.72, 0, 1] }}
                  className="absolute bottom-0 top-0"
                  style={{ width: `${cellWidth}%` }}
                >
                  <div className="flex h-full w-full items-end justify-center px-[2px] sm:px-[3px]">
                    <motion.div
                      initial={false}
                      animate={{ height: `${height}%` }}
                      transition={{ duration, ease: [0.32, 0.72, 0, 1] }}
                      className={cn(
                        "relative w-full max-w-[64px] rounded-t-md bg-gradient-to-t transition-[box-shadow,filter] duration-200 sm:max-w-[76px]",
                        style.gradient,
                        style.ring,
                        style.glow,
                        isComplete && "saturate-100",
                      )}
                      title={`Indeks ${index} · nilai ${value}`}
                    >
                      <span
                        className={cn(
                          "absolute inset-x-0 -top-5 text-center font-mono text-[9px] font-semibold tabular-nums sm:text-[10px]",
                          style.label,
                        )}
                      >
                        {value}
                      </span>
                      {isPivot ? (
                        <span
                          aria-hidden="true"
                          className="absolute left-1/2 top-1.5 h-1 w-1 -translate-x-1/2 rounded-full bg-white/90 shadow-[0_0_6px_rgba(255,255,255,0.9)]"
                        />
                      ) : null}
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-2 flex border-t border-white/[0.06] pt-1.5">
            {values.map((_, index) => {
              const isPivot = pivotIndex === index;
              return (
                <span
                  key={`index-${index}`}
                  style={{ width: `${cellWidth}%` }}
                  className={cn(
                    "text-center font-mono text-[9px] tabular-nums",
                    isPivot ? "font-semibold text-fuchsia-300" : "text-slate-600",
                    showIndices ? "" : "opacity-60",
                  )}
                >
                  {index}
                </span>
              );
            })}
          </div>
        </div>
      </div>

      {count > 12 ? (
        <p className="mt-1 text-center text-[10px] text-slate-600 sm:hidden">
          Geser ke samping untuk melihat semua bar →
        </p>
      ) : null}
    </div>
  );
}
