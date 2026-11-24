import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Database,
  Info,
  Lightbulb,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { COMPLEXITY_METRICS, TONE_CLASSES } from "@/lib/constants";

const METRIC_ICONS: Record<string, LucideIcon> = {
  best: TrendingUp,
  average: Activity,
  worst: TrendingDown,
  space: Database,
};

const IMPLEMENTATION_NOTES = [
  {
    title: "In-place",
    description:
      "Partisi hanya menukar elemen di dalam array yang sama, tanpa membuat array bantu seukuran input.",
  },
  {
    title: "Tidak stabil",
    description:
      "Quick Sort tidak menjamin urutan relatif elemen bernilai sama. Jika stabilitas dibutuhkan, gunakan Merge Sort.",
  },
  {
    title: "Pemilihan pivot",
    description:
      "Pivot elemen terakhir mudah diajarkan, tetapi rentan pada data terurut. Median-of-three atau pivot acak lebih aman.",
  },
  {
    title: "Ruang stack",
    description:
      "Kedalaman rekursi menentukan penggunaan memori: O(log n) saat seimbang, O(n) pada kasus terburuk.",
  },
];

function PivotComparison() {
  const balanced = [18, 27, 42, 55, 64, 88];
  const unbalanced = [10, 20, 30, 40, 50, 60];

  return (
    <div className="mt-5 grid gap-4 sm:grid-cols-2">
      <div className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.03] p-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-300">
          Partisi seimbang
        </p>
        <div className="mt-3 flex h-24 items-end gap-1.5">
          {balanced.map((value, index) => (
            <div
              key={value}
              style={{ height: `${(value / 88) * 100}%` }}
              className={`flex-1 rounded-t ${
                index === 2
                  ? "bg-gradient-to-t from-fuchsia-500 to-fuchsia-300"
                  : index < 2
                    ? "bg-gradient-to-t from-indigo-600 to-indigo-400"
                    : "bg-gradient-to-t from-sky-600 to-sky-400"
              }`}
            />
          ))}
        </div>
        <p className="mt-2.5 text-[10px] leading-relaxed text-slate-400">
          Pivot mendekati median → dua subarray berukuran hampir sama →{" "}
          <span className="font-mono text-emerald-300">O(n log n)</span>.
        </p>
      </div>

      <div className="rounded-xl border border-rose-400/15 bg-rose-400/[0.03] p-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-rose-300">
          Partisi tidak seimbang
        </p>
        <div className="mt-3 flex h-24 items-end gap-1.5">
          {unbalanced.map((value, index) => (
            <div
              key={value}
              style={{ height: `${(value / 60) * 100}%` }}
              className={`flex-1 rounded-t ${
                index === unbalanced.length - 1
                  ? "bg-gradient-to-t from-fuchsia-500 to-fuchsia-300"
                  : "bg-gradient-to-t from-indigo-600 to-indigo-400"
              }`}
            />
          ))}
        </div>
        <p className="mt-2.5 text-[10px] leading-relaxed text-slate-400">
          Pivot = nilai maksimum → hanya satu elemen berkurang per level →{" "}
          <span className="font-mono text-rose-300">O(n²)</span>.
        </p>
      </div>
    </div>
  );
}

export function ComplexityInfo() {
  return (
    <section id="kompleksitas" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Analisis Kompleksitas"
          title="Seberapa cepat Quick Sort?"
          description="Quick Sort adalah salah satu algoritma pengurutan tercepat dalam praktik. Performanya bergantung pada bagaimana pivot membagi data — dan di sinilah kasus terbaik, rata-rata, serta terburuk berasal."
          align="center"
          className="mx-auto max-w-3xl"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {COMPLEXITY_METRICS.map((metric) => {
            const Icon = METRIC_ICONS[metric.key] ?? Activity;
            const tone = TONE_CLASSES[metric.tone];

            return (
              <div
                key={metric.key}
                className={`card group relative overflow-hidden p-5 transition-colors duration-300 ${tone.border}`}
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br ${tone.glow} to-transparent blur-2xl`}
                />
                <div className="relative flex items-start justify-between gap-2">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-xl ring-1 ${tone.iconBg}`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
                    {metric.label}
                  </span>
                </div>

                <p className={`relative mt-4 font-mono text-xl font-bold ${tone.text}`}>
                  {metric.notation}
                </p>
                <p className="relative mt-2 text-[11px] font-medium leading-relaxed text-slate-300">
                  {metric.summary}
                </p>
                <p className="relative mt-2 text-[11px] leading-relaxed text-slate-500">
                  {metric.description}
                </p>

                <p className="relative mt-4 flex items-start gap-1.5 border-t border-white/[0.06] pt-3 text-[10px] leading-relaxed text-slate-500">
                  <Info className="mt-0.5 h-3 w-3 shrink-0 text-slate-600" />
                  {metric.note}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="card p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-500/10 text-rose-300 ring-1 ring-rose-400/20">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-white">
                Kapan worst case O(n²) terjadi?
              </h3>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-400">
              Worst case muncul ketika pivot selalu menjadi elemen terkecil atau terbesar.
              Dengan strategi pivot elemen terakhir, kondisi ini terjadi pada array yang sudah
              terurut atau terurut terbalik. Setiap level rekursi hanya memindahkan satu pivot,
              sehingga kedalaman rekursi menjadi n.
            </p>

            <PivotComparison />

            <div className="mt-4 rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
              <p className="font-mono text-[11px] leading-relaxed text-slate-400">
                Total pekerjaan ≈ n (partisi) × kedalaman rekursi
              </p>
              <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                <span className="chip !px-2 !py-0.5 border-emerald-400/20 bg-emerald-400/[0.06] text-emerald-300">
                  seimbang → log₂ n level
                </span>
                <span className="chip !px-2 !py-0.5 border-rose-400/20 bg-rose-400/[0.06] text-rose-300">
                  tidak seimbang → n level
                </span>
              </div>
            </div>
          </div>

          <div className="card p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-300 ring-1 ring-amber-400/20">
                <Lightbulb className="h-4 w-4" />
              </span>
              <h3 className="text-sm font-semibold text-white">Catatan implementasi</h3>
            </div>

            <ul className="mt-4 space-y-3.5">
              {IMPLEMENTATION_NOTES.map((note) => (
                <li key={note.title} className="flex gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-violet-400/80" />
                  <div>
                    <p className="text-xs font-semibold text-slate-200">{note.title}</p>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">
                      {note.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <a
              href="#visualizer"
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-violet-300 transition-colors hover:text-violet-200"
            >
              Lihat langsung di visualizer
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
