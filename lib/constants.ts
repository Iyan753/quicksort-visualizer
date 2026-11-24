import type { QuickSortPhase } from "./quicksort";

export interface PhaseMeta {
  label: string;
  badge: string;
  dot: string;
}

/** Warna dan label untuk setiap fase langkah algoritma. */
export const PHASE_META: Record<QuickSortPhase, PhaseMeta> = {
  init: {
    label: "Inisialisasi",
    badge: "border-slate-400/30 bg-slate-400/10 text-slate-300",
    dot: "bg-slate-400",
  },
  range: {
    label: "Subarray",
    badge: "border-indigo-400/30 bg-indigo-400/10 text-indigo-300",
    dot: "bg-indigo-400",
  },
  pivot: {
    label: "Pilih pivot",
    badge: "border-fuchsia-400/30 bg-fuchsia-400/10 text-fuchsia-300",
    dot: "bg-fuchsia-400",
  },
  compare: {
    label: "Perbandingan",
    badge: "border-amber-400/30 bg-amber-400/10 text-amber-300",
    dot: "bg-amber-400",
  },
  swap: {
    label: "Pertukaran",
    badge: "border-rose-400/30 bg-rose-400/10 text-rose-300",
    dot: "bg-rose-400",
  },
  place: {
    label: "Partisi",
    badge: "border-violet-400/30 bg-violet-400/10 text-violet-300",
    dot: "bg-violet-400",
  },
  sorted: {
    label: "Pivot terkunci",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
  recurse: {
    label: "Rekursi",
    badge: "border-sky-400/30 bg-sky-400/10 text-sky-300",
    dot: "bg-sky-400",
  },
  done: {
    label: "Selesai",
    badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
    dot: "bg-emerald-400",
  },
};

export const LEGEND_ITEMS = [
  { label: "Pivot", className: "bg-fuchsia-400" },
  { label: "Dibandingkan", className: "bg-amber-300" },
  { label: "Ditukar", className: "bg-rose-400" },
  { label: "Sudah terurut", className: "bg-emerald-400" },
  { label: "Subarray aktif", className: "bg-indigo-400" },
  { label: "Belum diproses", className: "bg-slate-600" },
] as const;

export interface ComplexityMetric {
  key: string;
  label: string;
  notation: string;
  tone: "emerald" | "sky" | "rose" | "amber";
  summary: string;
  description: string;
  note: string;
}

export const COMPLEXITY_METRICS: ComplexityMetric[] = [
  {
    key: "best",
    label: "Best Case",
    notation: "O(n log n)",
    tone: "emerald",
    summary: "Pivot selalu membagi array menjadi dua bagian yang hampir sama besar.",
    description:
      "Setiap level rekursi memproses seluruh n elemen, dan kedalaman rekursi hanya sekitar log₂ n. Total pekerjaan menjadi n × log n.",
    note: "Terjadi ketika pivot yang dipilih mendekati median dari subarray.",
  },
  {
    key: "average",
    label: "Average Case",
    notation: "O(n log n)",
    tone: "sky",
    summary: "Pembagian yang tidak selalu sempurna, tetapi tetap seimbang secara statistik.",
    description:
      "Rata-rata, pivot membagi data dengan rasio yang cukup seimbang sehingga kedalaman rekursi tetap logaritmik. Ini adalah performa yang paling sering ditemui di dunia nyata.",
    note: "Quick Sort sangat cepat dalam praktik karena konstanta operasinya kecil dan bekerja in-place.",
  },
  {
    key: "worst",
    label: "Worst Case",
    notation: "O(n²)",
    tone: "rose",
    summary: "Pivot selalu menjadi elemen terkecil atau terbesar, sehingga partisi sangat tidak seimbang.",
    description:
      "Setiap level hanya mengurangi satu elemen, sehingga ada sekitar n level rekursi dan masing-masing memindai O(n) elemen. Totalnya menjadi n × n.",
    note: "Dengan strategi pivot elemen terakhir, kasus terburuk muncul pada array yang sudah terurut atau terurut terbalik.",
  },
  {
    key: "space",
    label: "Space Complexity",
    notation: "O(log n)",
    tone: "amber",
    summary: "Quick Sort bekerja in-place, hanya membutuhkan ruang tambahan untuk stack rekursi.",
    description:
      "Tidak ada array bantu seukuran input. Ruang tambahan berasal dari call stack rekursi: O(log n) bila partisi seimbang, dan O(n) pada kasus terburuk.",
    note: "Implementasi in-place membuat Quick Sort lebih hemat memori dibanding Merge Sort.",
  },
];

export interface AlgorithmStepInfo {
  number: string;
  title: string;
  description: string;
  accent: string;
}

export const ALGORITHM_STEPS: AlgorithmStepInfo[] = [
  {
    number: "01",
    title: "Pilih pivot",
    description:
      "Tentukan satu elemen sebagai pivot. Di visualizer ini, pivot adalah elemen terakhir dari subarray yang sedang diproses.",
    accent: "from-fuchsia-500/15 to-fuchsia-500/0 text-fuchsia-300",
  },
  {
    number: "02",
    title: "Partisi",
    description:
      "Bandingkan setiap elemen dengan pivot. Elemen yang lebih kecil dipindahkan ke kiri, sisanya dibiarkan di kanan.",
    accent: "from-amber-500/15 to-amber-500/0 text-amber-300",
  },
  {
    number: "03",
    title: "Tempatkan pivot",
    description:
      "Setelah semua perbandingan, pivot ditukar ke batas antara kelompok kiri dan kanan. Posisinya kini final.",
    accent: "from-violet-500/15 to-violet-500/0 text-violet-300",
  },
  {
    number: "04",
    title: "Rekursi",
    description:
      "Ulangi langkah yang sama pada subarray kiri dan kanan sampai setiap subarray berisi nol atau satu elemen.",
    accent: "from-sky-500/15 to-sky-500/0 text-sky-300",
  },
];

export const TONE_CLASSES: Record<
  ComplexityMetric["tone"],
  { text: string; iconBg: string; border: string; glow: string }
> = {
  emerald: {
    text: "text-emerald-300",
    iconBg: "bg-emerald-400/10 text-emerald-300 ring-emerald-400/20",
    border: "hover:border-emerald-400/30",
    glow: "from-emerald-500/10",
  },
  sky: {
    text: "text-sky-300",
    iconBg: "bg-sky-400/10 text-sky-300 ring-sky-400/20",
    border: "hover:border-sky-400/30",
    glow: "from-sky-500/10",
  },
  rose: {
    text: "text-rose-300",
    iconBg: "bg-rose-400/10 text-rose-300 ring-rose-400/20",
    border: "hover:border-rose-400/30",
    glow: "from-rose-500/10",
  },
  amber: {
    text: "text-amber-300",
    iconBg: "bg-amber-400/10 text-amber-300 ring-amber-400/20",
    border: "hover:border-amber-400/30",
    glow: "from-amber-500/10",
  },
};

export const PLAYBACK_BASE_DELAY = 1000;
