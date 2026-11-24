import { ArrowRight, MousePointerClick, Sparkles } from "lucide-react";

export function FinalCta() {
  return (
    <section className="pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-violet-400/20 bg-gradient-to-br from-violet-600/15 via-ink-900/60 to-indigo-600/10 px-6 py-10 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-violet-500/20 blur-[100px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-indigo-500/15 blur-[100px]"
          />

          <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <span className="section-label">Siap mencoba?</span>
              <h2 className="mt-3 text-balance text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Saatnya melihat sendiri bagaimana Quick Sort mengurutkan data.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Masukkan angka milikmu, atur kecepatan animasi, lalu jelajahi setiap
                perbandingan, pertukaran, dan pemanggilan rekursif secara detail.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a href="#visualizer" className="btn-primary group px-6 py-3.5">
                <MousePointerClick className="h-4 w-4" />
                Buka Visualizer
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a href="#kompleksitas" className="btn-secondary px-6 py-3.5">
                <Sparkles className="h-4 w-4" />
                Baca Kompleksitas
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
