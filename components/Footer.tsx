import { Github, Heart, Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.07] bg-ink-950/60">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white shadow-glow-sm">
            <Zap className="h-[18px] w-[18px]" strokeWidth={2.4} />
          </span>
          <div>
            <p className="text-sm font-semibold text-white">Quick Sort Algorithm Visualizer</p>
            <p className="mt-1 max-w-md text-xs leading-relaxed text-slate-500">
              Media pembelajaran interaktif untuk algoritma dan struktur data. Dibangun dengan
              Next.js, TypeScript, Tailwind CSS, dan Framer Motion.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:gap-5">
          <span className="inline-flex items-center gap-1.5">
            <Heart className="h-3.5 w-3.5 text-rose-400/80" />
            Untuk mahasiswa &amp; pemula
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Github className="h-3.5 w-3.5" />
            Open source learning project
          </span>
          <a href="#dashboard" className="font-medium text-slate-400 transition-colors hover:text-violet-300">
            Kembali ke atas ↑
          </a>
        </div>
      </div>
      <div className="border-t border-white/[0.05] py-4 text-center text-[11px] text-slate-600">
        © {new Date().getFullYear()} Quick Sort Visualizer · Dibuat untuk presentasi tugas kuliah.
      </div>
    </footer>
  );
}
