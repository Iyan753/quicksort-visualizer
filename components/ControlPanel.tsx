"use client";

import type { CSSProperties } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  stepIndex: number;
  totalSteps: number;
  isPlaying: boolean;
  isAtEnd: boolean;
  speed: number;
  onTogglePlay: () => void;
  onNext: () => void;
  onPrev: () => void;
  onReset: () => void;
  onSeek: (step: number) => void;
  onSpeedChange: (speed: number) => void;
}

const MIN_SPEED = 0.5;
const MAX_SPEED = 3;

export function ControlPanel({
  stepIndex,
  totalSteps,
  isPlaying,
  isAtEnd,
  speed,
  onTogglePlay,
  onNext,
  onPrev,
  onReset,
  onSeek,
  onSpeedChange,
}: ControlPanelProps) {
  const lastIndex = Math.max(0, totalSteps - 1);
  const progress = lastIndex === 0 ? 0 : (stepIndex / lastIndex) * 100;
  const speedFill = ((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100;

  const playLabel = isPlaying
    ? "Pause"
    : isAtEnd
      ? "Ulangi"
      : stepIndex > 0
        ? "Lanjutkan"
        : "Mulai";

  return (
    <div className="mt-5 space-y-5">
      <div>
        <div className="flex items-center justify-between text-[11px]">
          <span className="text-slate-500">
            Langkah{" "}
            <span className="font-mono font-semibold text-slate-200">{stepIndex + 1}</span>{" "}
            dari <span className="font-mono text-slate-400">{totalSteps}</span>
          </span>
          <span className="font-mono text-slate-500">{Math.round(progress)}%</span>
        </div>
        <input
          type="range"
          className="range mt-2 w-full"
          min={0}
          max={lastIndex}
          step={1}
          value={stepIndex}
          onChange={(event) => onSeek(Number(event.target.value))}
          style={{ "--fill": `${progress}%` } as CSSProperties}
          aria-label="Geser posisi langkah visualisasi"
        />
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onReset}
            className="btn-ghost gap-2 px-3 py-2.5 text-xs font-semibold"
            title="Reset ke langkah pertama"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <button
            type="button"
            onClick={onPrev}
            disabled={stepIndex === 0}
            className="btn-ghost gap-1.5 px-3 py-2.5 text-xs font-semibold"
            aria-label="Langkah sebelumnya"
            title="Previous step (←)"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden md:inline">Prev Step</span>
          </button>

          <button
            type="button"
            onClick={onTogglePlay}
            className={cn(
              "btn min-w-[7.5rem] px-4 py-2.5 text-xs font-semibold",
              isPlaying
                ? "border border-violet-400/40 bg-violet-500/15 text-violet-100 hover:bg-violet-500/25"
                : "bg-gradient-to-r from-violet-500 to-indigo-500 text-white shadow-glow-sm hover:from-violet-400 hover:to-indigo-400",
            )}
            aria-label={isPlaying ? "Pause visualisasi" : "Jalankan visualisasi"}
            title="Play / Pause (Spasi)"
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
            {playLabel}
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={isAtEnd}
            className="btn-ghost gap-1.5 px-3 py-2.5 text-xs font-semibold"
            aria-label="Langkah berikutnya"
            title="Next step (→)"
          >
            <span className="hidden md:inline">Next Step</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] px-3 py-2 sm:min-w-[220px]">
          <Gauge className="h-4 w-4 shrink-0 text-violet-300" />
          <div className="flex-1">
            <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-slate-500">
              <span>Kecepatan</span>
              <span className="font-mono text-[11px] normal-case tracking-normal text-violet-200">
                {speed.toFixed(2).replace(/\.?0+$/, "")}×
              </span>
            </div>
            <input
              type="range"
              className="range mt-2 w-full"
              min={MIN_SPEED}
              max={MAX_SPEED}
              step={0.25}
              value={speed}
              onChange={(event) => onSpeedChange(Number(event.target.value))}
              style={{ "--fill": `${speedFill}%` } as CSSProperties}
              aria-label="Kecepatan animasi"
            />
          </div>
        </div>
      </div>

      <p className="hidden items-center gap-3 text-[10px] text-slate-600 sm:flex">
        <span className="inline-flex items-center gap-1">
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-slate-400">
            Spasi
          </kbd>
          play / pause
        </span>
        <span className="inline-flex items-center gap-1">
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-slate-400">
            ←
          </kbd>
          <kbd className="rounded border border-white/10 bg-white/[0.04] px-1.5 py-0.5 font-mono text-[9px] text-slate-400">
            →
          </kbd>
          langkah
        </span>
      </p>
    </div>
  );
}
