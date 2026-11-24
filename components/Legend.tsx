import { Palette } from "lucide-react";
import { LEGEND_ITEMS } from "@/lib/constants";

export function Legend() {
  return (
    <div className="card p-5">
      <div className="flex items-center gap-2">
        <Palette className="h-4 w-4 text-violet-300" />
        <h3 className="text-sm font-semibold text-white">Keterangan Warna</h3>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5">
        {LEGEND_ITEMS.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span className={`h-2 w-2 shrink-0 rounded-full ${item.className}`} />
            <span className="text-[11px] text-slate-400">{item.label}</span>
          </div>
        ))}
      </div>
      <p className="mt-4 border-t border-white/[0.06] pt-3 text-[10px] leading-relaxed text-slate-500">
        Angka di atas bar adalah nilai elemen, sedangkan angka di bawah bar adalah indeks
        posisinya di dalam array.
      </p>
    </div>
  );
}
