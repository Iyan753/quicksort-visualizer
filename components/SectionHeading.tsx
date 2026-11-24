import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div
      className={`flex flex-col gap-3 ${isCenter ? "items-center text-center" : "items-start"} ${className}`}
    >
      <span className="section-label">{eyebrow}</span>
      <h2 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className={`max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base ${isCenter ? "mx-auto" : ""}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
