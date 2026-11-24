"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  Copy,
  Dices,
  Keyboard,
  Minus,
  Plus,
  Shuffle,
  SlidersHorizontal,
} from "lucide-react";
import {
  MAX_ELEMENTS,
  MAX_VALUE,
  MIN_ELEMENTS,
  MIN_VALUE,
  generatePresetArray,
  parseArrayInput,
  type ArrayPreset,
} from "@/lib/quicksort";
import { cn } from "@/lib/utils";

interface CustomArrayInputProps {
  values: number[];
  onApply: (values: number[]) => void;
}

const PRESETS: Array<{ key: ArrayPreset; label: string; icon: typeof Shuffle }> = [
  { key: "random", label: "Acak", icon: Shuffle },
  { key: "sorted", label: "Terurut", icon: ArrowUp },
  { key: "reversed", label: "Terbalik", icon: ArrowDown },
  { key: "duplicates", label: "Duplikat", icon: Copy },
];

export function CustomArrayInput({ values, onApply }: CustomArrayInputProps) {
  const [text, setText] = useState(values.join(", "));
  const [error, setError] = useState<string | null>(null);
  const [count, setCount] = useState(values.length);

  useEffect(() => {
    setText(values.join(", "));
    setCount(values.length);
    setError(null);
  }, [values]);

  const applyText = () => {
    const result = parseArrayInput(text);
    if (result.error || !result.values) {
      setError(result.error ?? "Input tidak valid.");
      return;
    }
    setError(null);
    onApply(result.values);
  };

  const applyPreset = (preset: ArrayPreset) => {
    setError(null);
    onApply(generatePresetArray(preset, count));
  };

  const adjustCount = (delta: number) => {
    setCount((current) =>
      Math.min(MAX_ELEMENTS, Math.max(MIN_ELEMENTS, current + delta)),
    );
  };

  const countFill = ((count - MIN_ELEMENTS) / (MAX_ELEMENTS - MIN_ELEMENTS)) * 100;

  return (
    <div className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
            <SlidersHorizontal className="h-3.5 w-3.5" />
          </span>
          <div>
            <h3 className="text-sm font-semibold text-white">Atur Data</h3>
            <p className="text-[10px] text-slate-500">
              Masukkan angka sendiri atau buat data baru secara instan.
            </p>
          </div>
        </div>
        <span className="text-[10px] text-slate-500">
          {MIN_ELEMENTS}–{MAX_ELEMENTS} angka · nilai {MIN_VALUE}–{MAX_VALUE}
        </span>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1fr)_330px]">
        <div>
          <label
            htmlFor="custom-array"
            className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500"
          >
            Data manual
          </label>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <input
                id="custom-array"
                type="text"
                value={text}
                onChange={(event) => {
                  setText(event.target.value);
                  if (error) setError(null);
                }}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    applyText();
                  }
                }}
                placeholder="38, 27, 43, 3, 9, 82, 10, 55"
                className={cn(
                  "w-full rounded-xl border bg-ink-950/70 py-3 pl-3.5 pr-10 font-mono text-xs text-slate-200 transition-colors placeholder:text-slate-600 focus:outline-none focus:ring-2",
                  error
                    ? "border-rose-500/50 focus:border-rose-400/60 focus:ring-rose-500/30"
                    : "border-white/10 focus:border-violet-400/50 focus:ring-violet-500/30",
                )}
                aria-invalid={error ? true : undefined}
                aria-describedby={error ? "array-error" : "array-hint"}
                spellCheck={false}
              />
              <Keyboard
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-600"
              />
            </div>
            <button
              type="button"
              onClick={applyText}
              className="btn-secondary shrink-0 gap-2 px-4 py-3 text-xs"
            >
              <Check className="h-4 w-4" />
              Terapkan
            </button>
          </div>

          {error ? (
            <p
              id="array-error"
              role="alert"
              className="mt-2 flex items-start gap-1.5 text-[11px] leading-relaxed text-rose-300"
            >
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              {error}
            </p>
          ) : (
            <p id="array-hint" className="mt-2 text-[10px] leading-relaxed text-slate-500">
              Pisahkan angka dengan koma atau spasi. Duplikat diperbolehkan. Tekan Enter untuk
              menerapkan.
            </p>
          )}

          <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                Array aktif
              </span>
              <span className="font-mono text-[10px] text-slate-600">n = {values.length}</span>
            </div>
            <div className="mt-2 flex flex-wrap gap-1">
              {values.map((value, index) => (
                <span
                  key={`${index}-${value}`}
                  className="rounded-md border border-white/[0.06] bg-ink-950/60 px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-slate-400"
                >
                  {value}
                </span>
              ))}
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-slate-600">
              Pivot dipilih dari elemen terakhir setiap subarray.
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
              Jumlah elemen
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => adjustCount(-1)}
                disabled={count <= MIN_ELEMENTS}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Kurangi jumlah elemen"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span className="w-7 text-center font-mono text-sm font-semibold text-violet-200">
                {count}
              </span>
              <button
                type="button"
                onClick={() => adjustCount(1)}
                disabled={count >= MAX_ELEMENTS}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-white/10 bg-white/[0.03] text-slate-400 transition-colors hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Tambah jumlah elemen"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          </div>

          <input
            type="range"
            className="range mt-2.5 w-full"
            min={MIN_ELEMENTS}
            max={MAX_ELEMENTS}
            step={1}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            style={{ "--fill": `${countFill}%` } as CSSProperties}
            aria-label="Jumlah elemen untuk data baru"
          />

          <div className="mt-3 flex items-center gap-2">
            <button
              type="button"
              onClick={() => applyPreset("random")}
              className="btn flex-1 gap-1.5 bg-gradient-to-r from-violet-500 to-indigo-500 px-3 py-2 text-[11px] font-semibold text-white shadow-glow-sm transition hover:from-violet-400 hover:to-indigo-400"
            >
              <Dices className="h-3.5 w-3.5" />
              Acak {count} angka
            </button>
          </div>

          <div className="mt-2 grid grid-cols-3 gap-1.5">
            {PRESETS.filter((preset) => preset.key !== "random").map((preset) => {
              const Icon = preset.icon;
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => applyPreset(preset.key)}
                  className="inline-flex items-center justify-center gap-1 rounded-lg border border-white/[0.08] bg-white/[0.03] px-2 py-1.5 text-[10px] font-medium text-slate-400 transition-colors hover:border-violet-400/30 hover:bg-white/[0.06] hover:text-white"
                  title={`Buat data ${preset.label.toLowerCase()} dengan ${count} elemen`}
                >
                  <Icon className="h-3 w-3" />
                  {preset.label}
                </button>
              );
            })}
          </div>

          <p className="mt-2 text-[9px] leading-relaxed text-slate-600">
            Jumlah elemen dipakai saat membuat data baru. Preset “Terurut” memperlihatkan
            worst case O(n²) untuk strategi pivot elemen terakhir.
          </p>
        </div>
      </div>
    </div>
  );
}
