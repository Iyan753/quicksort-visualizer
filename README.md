# Quick Sort Algorithm Visualizer

Website edukasi interaktif untuk memahami cara kerja algoritma **Quick Sort** langkah demi langkah. Setiap perbandingan, pertukaran, pemilihan pivot, dan pemanggilan rekursif dihasilkan dari eksekusi algoritma Quick Sort yang sebenarnya — bukan animasi statis atau data tiruan.

![Preview dashboard](docs/preview.png)

![Visualisasi pertukaran](docs/visualizer.png)

## ✨ Fitur

- **Dashboard modern** dengan ringkasan algoritma dan kompleksitas waktu/ruang.
- **Visualisasi bar interaktif** dengan warna berbeda untuk pivot, elemen yang dibandingkan, elemen yang ditukar, subarray aktif, dan elemen yang sudah terurut.
- **Kontrol lengkap**: Mulai, Pause, Next Step, Previous Step, Reset, scrubber langkah, dan pengatur kecepatan animasi (0.5×–3×).
- **Penjelasan otomatis per langkah** dalam bahasa Indonesia, lengkap dengan statistik perbandingan, pertukaran, kedalaman rekursi, dan subarray aktif.
- **Pseudocode tersorot** yang mengikuti langkah algoritma saat ini.
- **Input manual** dengan validasi, **data acak**, serta preset **Terurut**, **Terbalik**, dan **Duplikat**.
- **Panel kompleksitas** Best/Average/Worst/Space beserta penjelasan dan ilustrasi partisi seimbang vs tidak seimbang.
- **Responsive** untuk desktop, tablet, dan smartphone. Dark mode sebagai tema utama.
- **Shortcut keyboard**: `Spasi` untuk play/pause, `←` / `→` untuk langkah sebelumnya/berikutnya.
- Animasi halus dengan Framer Motion, ikon Lucide React, dan tipografi Inter + JetBrains Mono.

## 🧰 Teknologi

| Teknologi | Kegunaan |
| --- | --- |
| [Next.js 15](https://nextjs.org/) (App Router) | Framework utama |
| [React 19](https://react.dev/) + TypeScript | Komponen UI dan type safety |
| [Tailwind CSS 3](https://tailwindcss.com/) | Styling dan design system |
| [Framer Motion](https://www.framer.com/motion/) | Animasi bar, panel, dan transisi |
| [Lucide React](https://lucide.dev/) | Ikon |
| [Fontsource](https://fontsource.org/) | Font Inter & JetBrains Mono (lokal, tanpa request eksternal) |

## 🚀 Instalasi

**Prasyarat:** Node.js 20 atau lebih baru, serta npm.

```bash
# 1. Install dependencies
npm install

# 2. Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build production

```bash
npm run build
npm start
```

### Pemeriksaan kualitas kode

```bash
npm run typecheck   # TypeScript strict check
npm run lint        # ESLint (next/core-web-vitals)
npm run build       # Production build
```

> Catatan: Next.js 15 menampilkan peringatan bahwa `next lint` akan dipindahkan ke ESLint CLI pada Next.js 16. Perintah tersebut tetap berjalan normal di project ini.

## 🕹️ Cara Menggunakan

1. Atur data melalui panel **Atur Data**:
   - Ketik angka manual (5–30 bilangan bulat, nilai 1–999), lalu tekan **Terapkan** atau `Enter`.
   - Gunakan slider **Jumlah elemen**, lalu klik **Acak** untuk membuat data acak.
   - Gunakan preset **Terurut**, **Terbalik**, atau **Duplikat** untuk mengeksplorasi kasus tertentu.
2. Tekan **Mulai** untuk menjalankan animasi.
3. Gunakan **Pause**, **Prev Step**, **Next Step**, atau geser **scrubber** untuk menjelajahi langkah secara bebas.
4. Atur **Kecepatan** animasi antara 0.5× hingga 3×.
5. Baca panel **Penjelasan Langkah**, **Keterangan Warna**, dan **Pseudocode** yang berubah otomatis.
6. Tekan **Reset** untuk kembali ke langkah pertama.

### Aturan validasi input

- Minimal **5** dan maksimal **30** angka.
- Setiap angka harus berupa **bilangan bulat** antara **1** dan **999**.
- Pemisah boleh berupa koma, spasi, atau titik koma.
- Nilai duplikat diperbolehkan.
- Pesan error ditampilkan langsung di bawah input tanpa menghentikan visualisasi yang sedang berjalan.

## 🧠 Cara Kerja Quick Sort

Quick Sort adalah algoritma **divide and conquer** yang bekerja secara **in-place**:

1. **Pilih pivot** — pada project ini pivot adalah elemen terakhir dari subarray (`arr[high]`).
2. **Partisi (skema Lomuto)** — bandingkan setiap elemen dengan pivot. Elemen yang lebih kecil dipindahkan ke kelompok kiri; elemen yang lebih besar atau sama tetap di kanan.
3. **Tempatkan pivot** — tukar pivot ke batas antara kedua kelompok. Setelah langkah ini, posisi pivot sudah final.
4. **Rekursi** — ulangi proses pada subarray kiri dan kanan. Rekursi berhenti ketika subarray berisi nol atau satu elemen.

### Pseudocode yang diimplementasikan

```text
quickSort(arr, low, high):
  if low >= high: return
  pivot ← arr[high]
  i ← low - 1
  for j ← low to high - 1:
    if arr[j] < pivot:
      i ← i + 1
      swap(arr[i], arr[j])
  swap(arr[i + 1], arr[high])
  p ← i + 1   // pivot terkunci
  quickSort(arr, low, p - 1)
  quickSort(arr, p + 1, high)
```

Implementasi TypeScript berada di [`lib/quicksort.ts`](lib/quicksort.ts) pada fungsi `buildQuickSortTrace`.

## 📊 Kompleksitas

| Kasus | Kompleksitas | Penjelasan |
| --- | --- | --- |
| **Best Case** | `O(n log n)` | Pivot selalu membagi array menjadi dua bagian yang hampir sama besar. Kedalaman rekursi ≈ log₂ n dan setiap level memproses n elemen. |
| **Average Case** | `O(n log n)` | Pembagian tidak selalu sempurna, tetapi secara statistik tetap seimbang. Ini performa yang paling umum ditemui. |
| **Worst Case** | `O(n²)` | Pivot selalu menjadi elemen terkecil/terbesar. Setiap level hanya mengurangi satu elemen, sehingga ada ≈ n level rekursi. |
| **Space** | `O(log n)` | Quick Sort bekerja in-place. Ruang tambahan hanya untuk call stack rekursi: `O(log n)` bila partisi seimbang dan `O(n)` pada kasus terburuk. |

> Dengan strategi pivot elemen terakhir, kasus terburuk terjadi pada data yang **sudah terurut** atau **terurut terbalik**. Coba preset **Terurut** di visualizer untuk melihat jumlah langkahnya membesar.

## 🏗️ Arsitektur

Logika algoritma dipisahkan sepenuhnya dari komponen UI.

```text
.
├── app/
│   ├── globals.css          # Design tokens, utility, styling slider
│   ├── icon.svg             # Favicon
│   ├── layout.tsx           # Root layout, metadata, font, background
│   └── page.tsx             # Komposisi seluruh section
├── components/
│   ├── AlgorithmVisualizer.tsx  # State playback, timer, keyboard, komposisi
│   ├── ArrayBars.tsx            # Bar animasi + warna state
│   ├── ComplexityInfo.tsx       # Panel kompleksitas + ilustrasi partisi
│   ├── ControlPanel.tsx         # Play/pause/step/reset/speed/scrubber
│   ├── CustomArrayInput.tsx     # Input manual, validasi, random, preset
│   ├── Dashboard.tsx            # Hero, CTA, ringkasan kompleksitas
│   ├── FinalCta.tsx             # Ajakan mencoba di akhir halaman
│   ├── Footer.tsx
│   ├── HowItWorks.tsx           # Empat langkah inti + pseudocode
│   ├── Legend.tsx               # Keterangan warna
│   ├── Navbar.tsx               # Navigasi sticky + menu mobile
│   ├── PseudocodePanel.tsx      # Pseudocode dengan baris aktif
│   ├── SectionHeading.tsx
│   └── StepExplanation.tsx      # Penjelasan + statistik per langkah
├── lib/
│   ├── constants.ts         # Metadata fase, kompleksitas, konten edukasi
│   ├── quicksort.ts         # Algoritma asli + trace + validasi + generator data
│   └── utils.ts             # Helper className
├── docs/                    # Screenshot untuk README
├── .eslintrc.json
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

### Sistem pencatatan langkah (step trace)

`buildQuickSortTrace(input)` menjalankan Quick Sort sungguhan pada salinan array. Setiap kali state berubah, fungsi `push()` menyimpan **snapshot immutable**:

```ts
interface QuickSortStep {
  values: number[];          // nilai array pada langkah ini
  ids: string[];             // identitas stabil untuk animasi pertukaran
  pivotIndex: number | null;
  comparing: [number, number] | null;
  swapping: [number, number] | null;
  range: [number, number] | null;
  sortedIndices: number[];
  phase: "init" | "range" | "pivot" | "compare" | "swap" | "place" | "sorted" | "recurse" | "done";
  title: string;
  description: string;
  detail: string;
  stats: { comparisons: number; swaps: number; depth: number };
  codeLine: number | null;
}
```

Konsekuensinya:

- **Next/Previous Step** hanya mengubah `stepIndex` — tidak ada perhitungan ulang, sehingga urutan selalu konsisten.
- **Pause/Resume** aman karena playback memakai satu timer per langkah yang selalu dibersihkan saat pause, ganti kecepatan, atau unmount.
- **Animasi pertukaran** menggunakan `id` stabil per elemen, sehingga Framer Motion menganimasikan bar yang sama berpindah posisi, bukan sekadar mengganti nilai.
- **Penjelasan dan pseudocode** berasal dari langkah yang sama, jadi selalu sinkron dengan visualisasi.

## ✅ Verifikasi

Project ini telah diverifikasi dengan:

- `npm run typecheck` — tanpa error TypeScript.
- `npm run lint` — tanpa warning/error ESLint.
- `npm run build` — build production berhasil.
- Pengujian browser (Chrome, Playwright):
  - Play, pause, resume, next, previous, reset, dan seek berjalan sesuai urutan.
  - Input valid/invalid, data acak, preset, serta batas 5–30 elemen.
  - Hasil akhir selalu terurut untuk array acak, array berisi duplikat, dan 30 elemen.
  - Layout desktop, tablet, dan mobile tanpa overflow horizontal.
  - Tidak ada error di console browser.

## 📝 Catatan Implementasi

- Skema partisi yang dipakai adalah **Lomuto** dengan pivot elemen terakhir. Skema ini dipilih karena paling mudah dijelaskan secara visual.
- Quick Sort **tidak stabil** (unstable): urutan relatif elemen bernilai sama tidak dijamin.
- Untuk data yang sudah terurut, strategi pivot terakhir menghasilkan `O(n²)`. Di dunia nyata, pivot acak atau **median-of-three** biasanya digunakan untuk mengurangi risiko ini.
- Seluruh angka, langkah, dan statistik dihasilkan secara dinamis dari algoritma; tidak ada data simulasi statis.

---

Dibuat untuk membantu mahasiswa dan pemula memahami algoritma Quick Sort secara visual dan interaktif.
