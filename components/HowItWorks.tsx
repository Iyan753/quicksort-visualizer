import { ArrowRight, GitBranch, Info, Layers, Play, Sparkles } from "lucide-react";
import { PseudocodePanel } from "@/components/PseudocodePanel";
import { SectionHeading } from "@/components/SectionHeading";
import { ALGORITHM_STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <section id="algoritma" className="relative scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Cara Kerja Algoritma"
          title="Empat langkah inti Quick Sort"
          description="Quick Sort memakai strategi divide and conquer: pilih pembatas, bagi data menjadi dua kelompok, lalu selesaikan setiap kelompok dengan cara yang sama. Berikut alur lengkapnya."
        />

        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="grid gap-3 sm:grid-cols-2">
            {ALGORITHM_STEPS.map((step) => (
              <div
                key={step.number}
                className="card group relative overflow-hidden p-5 transition-colors duration-300 hover:border-violet-400/25"
              >
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${step.accent} opacity-40`}
                />
                <div className="relative">
                  <span className="font-mono text-[11px] font-semibold tracking-widest text-slate-500">
                    {step.number}
                  </span>
                  <h3 className="mt-2 text-sm font-semibold text-white">{step.title}</h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-400">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="card border-violet-400/20 bg-violet-500/[0.05] p-5 sm:col-span-2">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 text-violet-300">
                  <GitBranch className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-semibold text-white">
                    Rekursi berhenti pada base case
                  </h3>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-400">
                    Subarray dengan nol atau satu elemen tidak perlu diurutkan lagi. Karena
                    pivot selalu berada di posisi final setelah partisi, setiap pemanggilan
                    rekursif memperkecil masalah — dan proses pasti berhenti.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <PseudocodePanel />

            <div className="card p-4">
              <div className="flex items-start gap-2.5">
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-violet-300" />
                <div>
                  <p className="text-xs font-semibold text-slate-200">
                    Pivot yang dipakai di visualizer
                  </p>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
                    Visualizer ini menggunakan skema <span className="text-slate-300">Lomuto</span>{" "}
                    dengan pivot = elemen terakhir subarray. Skema ini mudah dijelaskan dan
                    cocok untuk pembelajaran, meskipun bukan pilihan tercepat untuk data yang
                    sudah terurut.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="chip !px-2.5 !py-1 text-[10px]">
                      <Layers className="h-3 w-3 text-violet-300" />
                      In-place
                    </span>
                    <span className="chip !px-2.5 !py-1 text-[10px]">
                      <Sparkles className="h-3 w-3 text-violet-300" />
                      Divide &amp; conquer
                    </span>
                    <span className="chip !px-2.5 !py-1 text-[10px]">
                      <GitBranch className="h-3 w-3 text-violet-300" />
                      Rekursif
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#visualizer"
              className="group flex items-center justify-between gap-4 rounded-2xl border border-violet-400/20 bg-gradient-to-r from-violet-500/10 to-indigo-500/5 p-4 transition-colors hover:border-violet-400/40"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-500/20 text-violet-200">
                  <Play className="h-4 w-4 fill-current" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-white">Coba sendiri sekarang</p>
                  <p className="text-[10px] text-slate-500">
                    Jalankan, jeda, dan telusuri langkahnya.
                  </p>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-violet-300 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
