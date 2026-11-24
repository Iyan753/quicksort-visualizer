/**
 * Tipe data untuk sistem pencatatan langkah (step-by-step trace) Quick Sort.
 *
 * Setiap langkah menyimpan snapshot array (values + ids) sehingga UI dapat
 * melakukan time-travel (Next / Previous) tanpa menghitung ulang algoritma.
 */

export type QuickSortPhase =
  | "init"
  | "range"
  | "pivot"
  | "compare"
  | "swap"
  | "place"
  | "sorted"
  | "recurse"
  | "done";

export interface StepStats {
  /** Total perbandingan elemen dengan pivot sampai langkah ini. */
  comparisons: number;
  /** Total pertukaran yang benar-benar terjadi sampai langkah ini. */
  swaps: number;
  /** Kedalaman rekursi saat langkah ini terjadi. */
  depth: number;
}

export interface QuickSortStep {
  /** Nilai array pada langkah ini. */
  values: number[];
  /** Identitas stabil per elemen, dipakai untuk animasi pertukaran. */
  ids: string[];
  /** Indeks pivot aktif (null jika tidak ada). */
  pivotIndex: number | null;
  /** Dua indeks yang sedang dibandingkan: [elemen, pivot]. */
  comparing: [number, number] | null;
  /** Dua indeks yang sedang ditukar. */
  swapping: [number, number] | null;
  /** Batas subarray yang sedang diproses: [low, high]. */
  range: [number, number] | null;
  /** Indeks yang sudah berada di posisi final. */
  sortedIndices: number[];
  phase: QuickSortPhase;
  /** Judul singkat langkah. */
  title: string;
  /** Penjelasan utama yang ditampilkan ke pengguna. */
  description: string;
  /** Penjelasan tambahan / konteks algoritma. */
  detail: string;
  stats: StepStats;
  /** Baris pseudocode yang disorot (1-based), null jika tidak ada. */
  codeLine: number | null;
}

export interface QuickSortTrace {
  steps: QuickSortStep[];
  comparisons: number;
  swaps: number;
  maxDepth: number;
  initial: number[];
  sorted: number[];
}

export interface ArrayValidation {
  values: number[] | null;
  error: string | null;
}

export const MIN_ELEMENTS = 5;
export const MAX_ELEMENTS = 30;
export const MIN_VALUE = 1;
export const MAX_VALUE = 999;

export const DEFAULT_ARRAY: number[] = [38, 27, 43, 3, 9, 82, 10, 55];

export const PSEUDOCODE: string[] = [
  "quickSort(arr, low, high):",
  "  if low >= high: return",
  "  pivot ← arr[high]",
  "  i ← low - 1",
  "  for j ← low to high - 1:",
  "    if arr[j] < pivot:",
  "      i ← i + 1",
  "      swap(arr[i], arr[j])",
  "  swap(arr[i + 1], arr[high])",
  "  p ← i + 1   // pivot terkunci",
  "  quickSort(arr, low, p - 1)",
  "  quickSort(arr, p + 1, high)",
];

/**
 * Menjalankan Quick Sort sungguhan (Lomuto partition, pivot = elemen terakhir)
 * sambil merekam setiap perubahan state ke dalam daftar langkah.
 */
export function buildQuickSortTrace(input: number[]): QuickSortTrace {
  if (input.length === 0) {
    return {
      steps: [],
      comparisons: 0,
      swaps: 0,
      maxDepth: 0,
      initial: [],
      sorted: [],
    };
  }

  const values = [...input];
  const ids = values.map((_, index) => `item-${index}`);
  const steps: QuickSortStep[] = [];
  const sortedSet = new Set<number>();

  let comparisons = 0;
  let swaps = 0;
  let maxDepth = 0;

  const snapshot = (): Pick<QuickSortStep, "values" | "ids" | "sortedIndices"> => ({
    values: [...values],
    ids: [...ids],
    sortedIndices: [...sortedSet].sort((a, b) => a - b),
  });

  const push = (
    step: Omit<QuickSortStep, "values" | "ids" | "sortedIndices" | "stats">,
    depth: number,
  ) => {
    steps.push({
      ...step,
      ...snapshot(),
      stats: { comparisons, swaps, depth },
    });
    if (depth > maxDepth) maxDepth = depth;
  };

  const swapValues = (a: number, b: number) => {
    [values[a], values[b]] = [values[b], values[a]];
    [ids[a], ids[b]] = [ids[b], ids[a]];
  };

  const formatRange = (low: number, high: number) => {
    if (low > high) return "kosong";
    return `[${values.slice(low, high + 1).join(", ")}]`;
  };

  push(
    {
      pivotIndex: null,
      comparing: null,
      swapping: null,
      range: null,
      phase: "init",
      title: "Array awal",
      description: `Array awal berisi ${values.length} elemen: [${values.join(", ")}].`,
      detail:
        "Tekan tombol Mulai untuk menjalankan Quick Sort, atau Next Step untuk melihat satu langkah setiap kali.",
      codeLine: 1,
    },
    0,
  );

  const quickSort = (low: number, high: number, depth: number) => {
    if (low > high) return;

    if (low === high) {
      sortedSet.add(low);
      push(
        {
          pivotIndex: null,
          comparing: null,
          swapping: null,
          range: [low, high],
          phase: "sorted",
          title: "Satu elemen tersisa",
          description: `Subarray indeks ${low} hanya berisi ${values[low]} dan sudah berada di posisi finalnya.`,
          detail: "Kasus dasar (base case): subarray dengan satu elemen tidak perlu diurutkan lagi.",
          codeLine: 2,
        },
        depth,
      );
      return;
    }

    push(
      {
        pivotIndex: null,
        comparing: null,
        swapping: null,
        range: [low, high],
        phase: "range",
        title: "Subarray baru",
        description: `Quick Sort dijalankan pada subarray indeks ${low}–${high} → ${formatRange(low, high)}.`,
        detail:
          "Subarray ini akan dipartisi menjadi dua bagian: elemen lebih kecil dari pivot dan elemen lebih besar atau sama dengan pivot.",
        codeLine: 1,
      },
      depth,
    );

    const pivot = values[high];
    push(
      {
        pivotIndex: high,
        comparing: null,
        swapping: null,
        range: [low, high],
        phase: "pivot",
        title: "Pilih pivot",
        description: `Memilih ${pivot} (indeks ${high}, elemen terakhir subarray) sebagai pivot.`,
        detail:
          "Pivot adalah nilai pembatas. Semua elemen yang lebih kecil akan dipindahkan ke kiri pivot, sisanya ke kanan.",
        codeLine: 3,
      },
      depth,
    );

    let i = low - 1;

    for (let j = low; j < high; j += 1) {
      comparisons += 1;
      const current = values[j];
      const isSmaller = current < pivot;

      push(
        {
          pivotIndex: high,
          comparing: [j, high],
          swapping: null,
          range: [low, high],
          phase: "compare",
          title: "Bandingkan dengan pivot",
          description: `Membandingkan ${current} dengan pivot ${pivot}: ${current} ${
            isSmaller ? "<" : "≥"
          } ${pivot}.`,
          detail: isSmaller
            ? `${current} lebih kecil dari pivot, jadi akan dipindahkan ke kelompok kiri.`
            : `${current} tidak lebih kecil dari pivot, jadi tetap berada di kelompok kanan.`,
          codeLine: 6,
        },
        depth,
      );

      if (isSmaller) {
        i += 1;
        if (i !== j) {
          const a = values[i];
          const b = values[j];
          swapValues(i, j);
          swaps += 1;
          push(
            {
              pivotIndex: high,
              comparing: null,
              swapping: [i, j],
              range: [low, high],
              phase: "swap",
              title: "Tukar posisi",
              description: `Menukar ${a} (indeks ${i}) dengan ${b} (indeks ${j}) agar ${b} masuk ke kelompok kiri.`,
              detail:
                "Pointer i menandai batas kelompok elemen kecil. Setiap pertukaran memperlebar kelompok tersebut satu elemen.",
              codeLine: 8,
            },
            depth,
          );
        }
      }
    }

    const pivotPosition = i + 1;

    if (pivotPosition !== high) {
      const displaced = values[pivotPosition];
      swapValues(pivotPosition, high);
      swaps += 1;
      push(
        {
          pivotIndex: pivotPosition,
          comparing: null,
          swapping: [pivotPosition, high],
          range: [low, high],
          phase: "place",
          title: "Pivot ditempatkan",
          description: `Memindahkan pivot ${pivot} ke posisi finalnya di indeks ${pivotPosition} (menukar dengan ${displaced}).`,
          detail:
            "Setelah pertukaran ini, semua elemen di kiri pivot lebih kecil, dan semua elemen di kanan lebih besar atau sama.",
          codeLine: 9,
        },
        depth,
      );
    } else {
      push(
        {
          pivotIndex: pivotPosition,
          comparing: null,
          swapping: null,
          range: [low, high],
          phase: "place",
          title: "Pivot sudah di tempatnya",
          description: `Pivot ${pivot} sudah berada di posisi finalnya, yaitu indeks ${pivotPosition}.`,
          detail:
            "Tidak perlu pertukaran terakhir karena semua elemen kecil sudah bergeser ke kiri pivot.",
          codeLine: 9,
        },
        depth,
      );
    }

    sortedSet.add(pivotPosition);
    const leftCount = pivotPosition - low;
    const rightCount = high - pivotPosition;

    push(
      {
        pivotIndex: null,
        comparing: null,
        swapping: null,
        range: [low, high],
        phase: "sorted",
        title: "Pivot terkunci",
        description: `Partition selesai. Pivot ${pivot} kini berada di posisi final indeks ${pivotPosition}.`,
        detail: `${leftCount} elemen di kiri (≤ ${pivot}) dan ${rightCount} elemen di kanan (≥ ${pivot}) akan diproses secara rekursif.`,
        codeLine: 10,
      },
      depth,
    );

    const leftLow = low;
    const leftHigh = pivotPosition - 1;
    if (leftLow <= leftHigh) {
      push(
        {
          pivotIndex: null,
          comparing: null,
          swapping: null,
          range: [leftLow, leftHigh],
          phase: "recurse",
          title: "Rekursi kiri",
          description: `Melanjutkan Quick Sort pada subarray kiri: indeks ${leftLow}–${leftHigh} → ${formatRange(leftLow, leftHigh)}.`,
          detail:
            "Subarray kiri berisi elemen yang lebih kecil dari pivot dan akan diurutkan dengan cara yang sama.",
          codeLine: 11,
        },
        depth + 1,
      );
    } else {
      push(
        {
          pivotIndex: null,
          comparing: null,
          swapping: null,
          range: null,
          phase: "recurse",
          title: "Subarray kiri kosong",
          description: "Subarray kiri kosong, jadi tidak ada yang perlu diurutkan di sisi ini.",
          detail: "Rekursi pada subarray kosong langsung berhenti (base case).",
          codeLine: 11,
        },
        depth + 1,
      );
    }

    quickSort(leftLow, leftHigh, depth + 1);

    const rightLow = pivotPosition + 1;
    const rightHigh = high;
    if (rightLow <= rightHigh) {
      push(
        {
          pivotIndex: null,
          comparing: null,
          swapping: null,
          range: [rightLow, rightHigh],
          phase: "recurse",
          title: "Rekursi kanan",
          description: `Melanjutkan Quick Sort pada subarray kanan: indeks ${rightLow}–${rightHigh} → ${formatRange(rightLow, rightHigh)}.`,
          detail:
            "Subarray kanan berisi elemen yang lebih besar atau sama dengan pivot dan diproses setelah subarray kiri selesai.",
          codeLine: 12,
        },
        depth + 1,
      );
    } else {
      push(
        {
          pivotIndex: null,
          comparing: null,
          swapping: null,
          range: null,
          phase: "recurse",
          title: "Subarray kanan kosong",
          description: "Subarray kanan kosong, jadi tidak ada yang perlu diurutkan di sisi ini.",
          detail: "Rekursi pada subarray kosong langsung berhenti (base case).",
          codeLine: 12,
        },
        depth + 1,
      );
    }

    quickSort(rightLow, rightHigh, depth + 1);
  };

  quickSort(0, values.length - 1, 0);

  for (let index = 0; index < values.length; index += 1) sortedSet.add(index);

  push(
    {
      pivotIndex: null,
      comparing: null,
      swapping: null,
      range: null,
      phase: "done",
      title: "Selesai",
      description: `Seluruh array sudah terurut: [${values.join(", ")}].`,
      detail: `Quick Sort selesai dengan ${comparisons} perbandingan dan ${swaps} pertukaran.`,
      codeLine: null,
    },
    0,
  );

  return {
    steps,
    comparisons,
    swaps,
    maxDepth,
    initial: [...input],
    sorted: [...values],
  };
}

/** Validasi dan parsing input angka yang dipisahkan koma atau spasi. */
export function parseArrayInput(raw: string): ArrayValidation {
  const trimmed = raw.trim();

  if (!trimmed) {
    return { values: null, error: "Masukkan minimal 5 angka terlebih dahulu." };
  }

  const tokens = trimmed.split(/[\s,;]+/).filter(Boolean);

  if (tokens.length < MIN_ELEMENTS) {
    return {
      values: null,
      error: `Minimal ${MIN_ELEMENTS} angka. Saat ini baru ${tokens.length} angka.`,
    };
  }

  if (tokens.length > MAX_ELEMENTS) {
    return {
      values: null,
      error: `Maksimal ${MAX_ELEMENTS} angka. Saat ini ${tokens.length} angka.`,
    };
  }

  const values: number[] = [];

  for (const token of tokens) {
    if (!/^-?\d+(\.\d+)?$/.test(token)) {
      return {
        values: null,
        error: `"${token}" bukan angka yang valid. Gunakan bilangan bulat, contoh: 42.`,
      };
    }

    const value = Number(token);

    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      return {
        values: null,
        error: `"${token}" bukan bilangan bulat. Quick Sort di sini menggunakan bilangan bulat.`,
      };
    }

    if (value < MIN_VALUE || value > MAX_VALUE) {
      return {
        values: null,
        error: `Angka ${value} di luar rentang. Gunakan nilai antara ${MIN_VALUE} dan ${MAX_VALUE}.`,
      };
    }

    values.push(value);
  }

  return { values, error: null };
}

/** Membuat array acak berisi nilai unik (Fisher–Yates shuffle). */
export function generateRandomArray(count: number): number[] {
  const size = Math.min(MAX_ELEMENTS, Math.max(MIN_ELEMENTS, Math.round(count)));
  const pool = Array.from({ length: 99 }, (_, index) => index + 1);

  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, size);
}

export type ArrayPreset = "random" | "sorted" | "reversed" | "nearlySorted" | "duplicates";

/** Preset array untuk memperlihatkan karakteristik kasus terbaik / terburuk. */
export function generatePresetArray(preset: ArrayPreset, count: number): number[] {
  const size = Math.min(MAX_ELEMENTS, Math.max(MIN_ELEMENTS, Math.round(count)));

  if (preset === "random") return generateRandomArray(size);

  const base = Array.from({ length: size }, (_, index) =>
    Math.round(4 + (index * 90) / Math.max(1, size - 1)),
  );

  switch (preset) {
    case "sorted":
      return base;
    case "reversed":
      return [...base].reverse();
    case "nearlySorted": {
      const result = [...base];
      if (result.length > 2) {
        const left = Math.floor(result.length * 0.4);
        const right = Math.min(result.length - 1, left + 1);
        [result[left], result[right]] = [result[right], result[left]];
      }
      return result;
    }
    case "duplicates":
      return base.map((value, index) =>
        index % 3 === 0 ? base[Math.floor(base.length / 2)] : value,
      );
    default:
      return base;
  }
}
