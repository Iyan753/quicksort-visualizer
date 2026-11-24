import { Code2 } from "lucide-react";
import { PSEUDOCODE } from "@/lib/quicksort";
import { cn } from "@/lib/utils";

const KEYWORDS = new Set([
  "quickSort",
  "function",
  "if",
  "return",
  "for",
  "to",
  "swap",
]);

function renderLine(line: string) {
  const commentIndex = line.indexOf("//");
  const code = commentIndex >= 0 ? line.slice(0, commentIndex) : line;
  const comment = commentIndex >= 0 ? line.slice(commentIndex) : "";
  const parts = code.split(/(\b(?:quickSort|function|if|return|for|to|swap)\b)/g);

  return (
    <>
      {parts.map((part, index) =>
        KEYWORDS.has(part) ? (
          <span key={index} className="text-fuchsia-300">
            {part}
          </span>
        ) : (
          <span key={index}>{part}</span>
        ),
      )}
      {comment ? <span className="text-slate-600">{comment}</span> : null}
    </>
  );
}

interface PseudocodePanelProps {
  activeLine?: number | null;
  className?: string;
  showHeader?: boolean;
}

export function PseudocodePanel({
  activeLine = null,
  className = "",
  showHeader = true,
}: PseudocodePanelProps) {
  return (
    <div className={cn("card overflow-hidden", className)}>
      {showHeader ? (
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3.5">
          <div className="flex items-center gap-2">
            <Code2 className="h-4 w-4 text-violet-300" />
            <h3 className="text-sm font-semibold text-white">Pseudocode</h3>
          </div>
          <span className="chip border-violet-400/20 bg-violet-400/[0.07] text-[10px] text-violet-200">
            Lomuto partition
          </span>
        </div>
      ) : null}

      <div className="overflow-x-auto p-3 sm:p-4">
        <ol className="min-w-[290px] font-mono text-[11px] leading-[1.9] sm:text-xs">
          {PSEUDOCODE.map((line, index) => {
            const lineNumber = index + 1;
            const isActive = activeLine === lineNumber;
            return (
              <li
                key={lineNumber}
                className={cn(
                  "flex gap-3 rounded-md px-2 transition-colors duration-200",
                  isActive
                    ? "bg-violet-500/15 text-violet-50 ring-1 ring-inset ring-violet-400/30"
                    : "text-slate-400",
                )}
              >
                <span
                  className={cn(
                    "w-4 shrink-0 select-none text-right tabular-nums",
                    isActive ? "text-violet-300" : "text-slate-600",
                  )}
                >
                  {lineNumber}
                </span>
                <span className="whitespace-pre">
                  {renderLine(line)}
                  {isActive ? (
                    <span className="ml-2 inline-block h-3 w-1.5 animate-pulse bg-violet-400/70 align-middle" />
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
