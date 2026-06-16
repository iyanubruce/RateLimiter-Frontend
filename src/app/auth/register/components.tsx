import { Check } from "lucide-react";
import Link from "next/link";

export function BrandPanel() {
  const features = [
    "Sub-millisecond decisions",
    "4 rate limit strategies",
    "Real-time analytics",
    "WebSocket live streaming",
  ];

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
          Build APIs that
          <br />
          scale without
          <br />
          <span className="text-[#E8A838]">breaking.</span>
        </h2>

        <p className="text-[15px] text-white/40 leading-[1.65] max-w-[340px] tracking-[-0.01em]">
          Join thousands of teams protecting their APIs with infrastructure that
          stays invisible until it's needed.
        </p>
      </div>

      <div className="relative z-10 space-y-8">
        <ul className="space-y-3">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-[#E8A838]/10 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-[#E8A838]" strokeWidth={3} />
              </div>
              <span className="text-[14px] text-white/60 tracking-[-0.01em]">
                {f}
              </span>
            </li>
          ))}
        </ul>

        <div className="border-t border-white/10 pt-6">
          <div className="font-bold text-[#F7F5F0] text-[24px] tracking-[-0.03em] leading-none mb-1">
            14B+
          </div>
          <div className="text-[12px] text-white/30 tracking-[-0.01em]">
            requests handled across the platform
          </div>
        </div>
      </div>
    </div>
  );
}
