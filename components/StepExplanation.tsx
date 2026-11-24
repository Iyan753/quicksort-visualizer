"use client";

import { motion } from "framer-motion";
import {
  ArrowLeftRight,
  CheckCircle2,
  GitBranch,
  Layers,
  ListChecks,
  Lock,
  Repeat2,
  Sparkles,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PHASE_META } from "@/lib/constants";
import type { QuickSortPhase, QuickSortStep } from "@/lib/quicksort";
import { cn } from "@/lib/utils";

const PHASE_ICONS: Record<QuickSortPhase, LucideIcon> = {
  init: ListChecks,
  range: Layers,
  pivot: Target,
  compare: ArrowLeftRight,
  swap: Repeat2,
  place: Lock,
  sorted: CheckCircle2,
  recurse: GitBranch,
  done: CheckCircle2,
};

interface StepExplanationProps {
  step: QuickSortStep;
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
}

interface MiniStatProps {
  label: string;
  value: string | number;
  accent?: string;
}

function MiniStat({ label, value, accent = "text-slate-100" }: MiniStatProps) {
  return (
    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
      <p className="text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        {label}
      </p>
      <p className={cn("mt-1 font-mono text-sm font-semibold tabular-nums", accent)}>
        {value}
      </p>
    </div>
  );
}

export function StepExplanation({
  step,
  stepIndex,
  totalSteps,
  isPlaying,
}: StepExplanationProps) {
  const meta = PHASE_META[step.phase];
  const PhaseIcon = PHASE_ICONS[step.phase];
  const progress = totalSteps > 1 ? (stepIndex / (totalSteps - 1)) * 100 : 0;

  return (
    <div className="card-strong flex h-full flex-col p-5">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
            <Sparkles className="h-3.5 w-3.5" />
          </span>
          <h3 className="text-sm font-semibold text-white">Penjelasan Langkah</h3>
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold",
            meta.badge,
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
          {meta.label}
        </span>
      </div>

      <div className="mt-5 flex-1" aria-live="polite">
        <motion.div
          key={stepIndex}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04] text-violet-300">
              <PhaseIcon className="h-4 w-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold leading-snug text-white">{step.title}</p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-slate-300">
                {step.description}
              </p>
            </div>
          </div>

          <p className="mt-4 border-l-2 border-violet-500/40 pl-3 text-[11px] leading-relaxed text-slate-500">
            {step.detail}
          </p>
        </motion.div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <MiniStat label="Perbandingan" value={step.stats.comparisons} accent="text-amber-300" />
        <MiniStat label="Pertukaran" value={step.stats.swaps} accent="text-rose-300" />
        <MiniStat
          label="Kedalaman"
          value={step.stats.depth}
          accent="text-sky-300"
        />
        <MiniStat
          label="Subarray"
          value={step.range ? `${step.range[0]}–${step.range[1]}` : "—"}
          accent="text-indigo-300"
        />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                isPlaying
                  ? "animate-pulse bg-emerald-400"
                  : step.phase === "done"
                    ? "bg-emerald-400"
                    : "bg-slate-500",
              )}
            />
            {isPlaying
              ? "Animasi berjalan"
              : step.phase === "done"
                ? "Visualisasi selesai"
                : "Siap dijelajahi"}
          </span>
          <span className="font-mono">
            {stepIndex + 1} / {totalSteps}
          </span>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
