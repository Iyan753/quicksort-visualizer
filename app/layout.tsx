import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Quick Sort Algorithm Visualizer",
  description:
    "Website edukasi interaktif untuk memahami cara kerja algoritma Quick Sort: pivot, partisi, pertukaran, dan rekursi divisualisasikan langkah demi langkah.",
  keywords: [
    "quick sort",
    "algoritma",
    "struktur data",
    "visualisasi",
    "edukasi",
    "sorting",
  ],
  authors: [{ name: "Quick Sort Visualizer" }],
};

export const viewport: Viewport = {
  themeColor: "#05050b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen font-sans">
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid opacity-60" />
          <div className="absolute -top-40 left-1/2 h-[520px] w-[720px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[140px]" />
          <div className="absolute right-[-10%] top-[30%] h-[380px] w-[380px] rounded-full bg-indigo-500/[0.07] blur-[120px]" />
          <div className="absolute bottom-[-10%] left-[-5%] h-[420px] w-[420px] rounded-full bg-fuchsia-500/[0.06] blur-[130px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
