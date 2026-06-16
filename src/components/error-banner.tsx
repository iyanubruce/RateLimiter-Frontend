import { AlertCircle, X } from "lucide-react";

export function ErrorBanner({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="mb-6 flex items-start gap-3 bg-red-500/[0.06] border border-red-500/20 rounded-lg p-4 animate-in fade-in slide-in-from-top-2 duration-300">
      <AlertCircle
        className="w-4 h-4 text-red-500/70 shrink-0 mt-0.5"
        strokeWidth={2}
      />
      <p className="text-[13px] text-red-600/80 leading-relaxed flex-1 tracking-[-0.01em]">
        {message}
      </p>
      <button
        type="button"
        onClick={onClose}
        className="text-red-500/40 hover:text-red-500/70 transition-colors shrink-0"
        aria-label="Dismiss error"
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
}
