"use client";

import { useCallback, useEffect, useState } from "react";
import { CheckCircle2, PauseCircle, PlayCircle, Sparkles } from "lucide-react";
import { ArrayBars } from "@/components/ArrayBars";
import { ControlPanel } from "@/components/ControlPanel";
import { CustomArrayInput } from "@/components/CustomArrayInput";
import { Legend } from "@/components/Legend";
import { PseudocodePanel } from "@/components/PseudocodePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { StepExplanation } from "@/components/StepExplanation";
import { PLAYBACK_BASE_DELAY } from "@/lib/constants";
import {
  DEFAULT_ARRAY,
  buildQuickSortTrace,
  type QuickSortTrace,
} from "@/lib/quicksort";
import { cn } from "@/lib/utils";

export function AlgorithmVisualizer() {
  const [sourceValues, setSourceValues] = useState<number[]>(DEFAULT_ARRAY);
  const [trace, setTrace] = useState<QuickSortTrace>(() =>
    buildQuickSortTrace(DEFAULT_ARRAY),
  );
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const steps = trace.steps;
  const currentStep = steps[stepIndex] ?? steps[0];
  const totalSteps = steps.length;
  const lastIndex = Math.max(0, totalSteps - 1);
  const isAtEnd = stepIndex >= lastIndex;

  const handleNext = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((current) => Math.min(lastIndex, current + 1));
  }, [lastIndex]);

  const handlePrev = useCallback(() => {
    setIsPlaying(false);
    setStepIndex((current) => Math.max(0, current - 1));
  }, []);

  const handleReset = useCallback(() => {
    setIsPlaying(false);
    setStepIndex(0);
  }, []);

  const handleSeek = useCallback(
    (next: number) => {
      setStepIndex(Math.max(0, Math.min(lastIndex, Math.round(next))));
    },
    [lastIndex],
  );

  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (isAtEnd) setStepIndex(0);
    setIsPlaying(true);
  }, [isPlaying, isAtEnd]);

  const handleApply = useCallback((nextValues: number[]) => {
    const nextTrace = buildQuickSortTrace(nextValues);
    setSourceValues([...nextValues]);
    setTrace(nextTrace);
    setStepIndex(0);
    setIsPlaying(false);
  }, []);

  // Playback: satu timer per langkah, dibersihkan saat pause / unmount / ganti speed.
  useEffect(() => {
    if (!isPlaying) return;
    if (stepIndex >= totalSteps - 1) {
      setIsPlaying(false);
      return;
    }

    const delay = PLAYBACK_BASE_DELAY / speed;
    const timer = window.setTimeout(() => {
      setStepIndex((current) => Math.min(totalSteps - 1, current + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [isPlaying, stepIndex, speed, totalSteps]);

  // Keyboard shortcut: Spasi untuk play/pause, panah kiri/kanan untuk langkah.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.tagName === "SELECT" ||
          target.isContentEditable)
      ) {
        return;
      }

      // Jangan dobel dengan aktivasi native tombol/link saat menekan Spasi.
      if (event.code === "Space" && target?.closest("button, a")) {
        return;
      }

      // Shortcut hanya aktif saat bagian visualizer terlihat di layar.
      const section = document.getElementById("visualizer");
      if (section) {
        const rect = section.getBoundingClientRect();
        if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        handleTogglePlay();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleTogglePlay, handleNext, handlePrev]);

  if (!currentStep) {
    return null;
  }

  const animationDuration = Math.min(0.5, 0.42 / speed);

  const status = isPlaying
    ? { label: "Berjalan", icon: PlayCircle, className: "text-emerald-300" }
    : isAtEnd
      ? { label: "Selesai", icon: CheckCircle2, className: "text-emerald-300" }
      : stepIndex === 0
        ? { label: "Siap", icon: Sparkles, className: "text-slate-300" }
        : { label: "Dijeda", icon: PauseCircle, className: "text-amber-300" };

  const StatusIcon = status.icon;

  return (
    <section id="visualizer" className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="Visualisasi Interaktif"
            title={
              <>
                Lihat Quick Sort <span className="text-gradient">bekerja</span>
              </>
            }
            description="Jalankan animasi, jeda di tengah proses, lalu telusuri setiap langkah secara maju atau mundur. Semua langkah dihasilkan langsung dari eksekusi algoritma Quick Sort yang sebenarnya."
          />
          <div className="chip shrink-0 border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-200">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Trace algoritma asli
          </div>
        </div>

        <div className="mt-8">
          <CustomArrayInput values={sourceValues} onApply={handleApply} />
        </div>

        <div className="mt-5 grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="card-strong min-w-0 p-4 sm:p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-white">Array Visualizer</h3>
                <p className="mt-0.5 text-[11px] text-slate-500">
                  {sourceValues.length} elemen · pivot = elemen terakhir subarray
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[10px] font-medium",
                    status.className,
                  )}
                >
                  <StatusIcon className="h-3 w-3" />
                  {status.label}
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] text-slate-400">
                  {stepIndex + 1}/{totalSteps}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <ArrayBars
                values={currentStep.values}
                ids={currentStep.ids}
                pivotIndex={currentStep.pivotIndex}
                comparing={currentStep.comparing}
                swapping={currentStep.swapping}
                range={currentStep.range}
                sortedIndices={currentStep.sortedIndices}
                duration={animationDuration}
                isComplete={currentStep.phase === "done"}
              />
            </div>

            <ControlPanel
              stepIndex={stepIndex}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
              isAtEnd={isAtEnd}
              speed={speed}
              onTogglePlay={handleTogglePlay}
              onNext={handleNext}
              onPrev={handlePrev}
              onReset={handleReset}
              onSeek={handleSeek}
              onSpeedChange={setSpeed}
            />
          </div>

          <div className="flex min-w-0 flex-col gap-5">
            <StepExplanation
              step={currentStep}
              stepIndex={stepIndex}
              totalSteps={totalSteps}
              isPlaying={isPlaying}
            />
            <Legend />
          </div>
        </div>

        <PseudocodePanel
          activeLine={currentStep.codeLine}
          className="mt-5"
        />
      </div>
    </section>
  );
}
