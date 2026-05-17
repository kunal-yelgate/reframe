import { ExportStatus } from "@/lib/types";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProgressStepperProps {
  file: File | null;
  status: ExportStatus;
}

const STEPS = ["Upload", "Configure", "Export", "Download"];

export default function ProgressStepper({ file, status }: ProgressStepperProps) {
  let activeStep = 0;
  if (!file) {
    activeStep = 0;
  } else if (status === "done") {
    activeStep = 3;
  } else if (status === "loading-engine" || status === "exporting") {
    activeStep = 2;
  } else {
    // idle or error
    activeStep = 1;
  }

  return (
    <div className="w-full mb-12 animate-fade-in px-2" aria-label="Progress steps">
      <ol className="flex items-center w-full relative">
        {STEPS.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;

          return (
            <li
              key={step}
              className={cn(
                "flex items-center",
                index !== STEPS.length - 1 ? "w-full" : ""
              )}
              aria-current={isActive ? "step" : undefined}
            >
              <div className="flex flex-col items-center relative shrink-0">
                <div
                  className={cn(
                    "flex items-center justify-center w-6 h-6 rounded-full border-2 transition-all duration-300",
                    isCompleted
                      ? "bg-film-600 border-film-600 text-white"
                      : isActive
                      ? "border-film-500 bg-[var(--bg)]"
                      : "border-[var(--border)] bg-transparent"
                  )}
                >
                  {isCompleted ? (
                    <Check size={12} strokeWidth={4} />
                  ) : isActive ? (
                    <div className="w-2.5 h-2.5 bg-film-500 rounded-full" />
                  ) : null}
                </div>
                <span
                  className={cn(
                    "text-[10px] sm:text-xs font-heading font-semibold uppercase tracking-widest absolute top-8 whitespace-nowrap transition-colors duration-300",
                    isCompleted || isActive
                      ? "text-[var(--text)]"
                      : "text-[var(--muted)] opacity-60"
                  )}
                >
                  {step}
                </span>
              </div>
              {index !== STEPS.length - 1 && (
                <div
                  className={cn(
                    "flex-1 h-px mx-3 sm:mx-6 transition-all duration-300",
                    isCompleted ? "bg-film-600" : "bg-[var(--border)]"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
