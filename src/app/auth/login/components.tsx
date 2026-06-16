import { AlertCircle, X, Link } from "lucide-react";

function ErrorBanner({
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

// ─── LEFT PANEL (BRANDING) ────────────────────────────────────────────────────

function BrandPanel() {
  return (
    <div className="hidden lg:flex w-[480px] shrink-0 bg-[#1A1A2E] flex-col justify-between p-12 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8A838]/[0.03] to-transparent pointer-events-none" />

      <div className="relative z-10">
        <Link
          href="/"
          className="font-semibold text-[#F7F5F0] tracking-[-0.02em] text-[15px] mb-16 block"
        >
          Ratelimitr
        </Link>

        <h2 className="font-bold text-[#F7F5F0] text-[44px] leading-[0.95] tracking-[-0.04em] mb-6">
          Welcome
          <br />
          back to
          <br />
          <span className="text-[#E8A838]">RateLimitr.</span>
        </h2>

        <p className="text-[15px] text-white/40 leading-[1.65] max-w-[340px] tracking-[-0.01em]">
          Your API protection dashboard is ready. Monitor traffic, manage keys,
          and view real-time analytics.
        </p>
      </div>

      <div className="relative z-10 space-y-8">
        <div className="border-t border-white/10 pt-6">
          <div className="font-bold text-[#F7F5F0] text-[24px] tracking-[-0.03em] leading-none mb-1">
            99.98%
          </div>
          <div className="text-[12px] text-white/30 tracking-[-0.01em]">
            platform uptime this month
          </div>
        </div>
      </div>
    </div>
  );
}

export { BrandPanel, ErrorBanner };
