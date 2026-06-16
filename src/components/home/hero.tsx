import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

function RatePulseViz() {
  const algorithms = [
    {
      name: "Fixed window",
      desc: "Hard reset every interval",
      bars: [100, 100, 100, 100, 0, 100, 100, 100, 65, 0, 100],
      color: "#1A1A2E",
    },
    {
      name: "Token bucket",
      desc: "Smooth burst absorption",
      bars: [100, 85, 72, 60, 78, 90, 75, 62, 55, 70, 85],
      color: "#E8A838",
    },
    {
      name: "Leaky bucket",
      desc: "Constant output rate",
      bars: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
      color: "#1A1A2E",
    },
    {
      name: "Sliding window",
      desc: "Proportional time weighting",
      bars: [80, 85, 90, 88, 85, 82, 86, 89, 87, 84, 83],
      color: "#1A1A2E",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-[11px] text-[#1A1A2E]/30 uppercase tracking-[0.1em] mb-2">
        Algorithm patterns
      </div>
      {algorithms.map((algo, ai) => (
        <div key={algo.name}>
          <div className="flex items-baseline justify-between mb-2.5">
            <span className="text-[13px] font-medium text-[#1A1A2E] tracking-[-0.01em]">
              {algo.name}
            </span>
            <span className="text-[11px] text-[#1A1A2E]/35 tracking-[-0.01em]">
              {algo.desc}
            </span>
          </div>
          <div className="flex items-end gap-[3px] h-10">
            {algo.bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm transition-all"
                style={{
                  height: `${h}%`,
                  backgroundColor:
                    ai === 1 ? "#E8A838" : h === 0 ? "#1A1A2E/10" : "#1A1A2E",
                  opacity: h === 0 ? 0.1 : ai === 0 && i % 5 === 4 ? 0.15 : 1,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="pt-15 min-h-screen bg-[#F7F5F0] flex flex-col">
      {/* Top band — eyebrow */}
      <div className="border-b border-[#1A1A2E]/10">
        <div className="max-w-300 mx-auto px-8 py-3 flex items-center justify-between">
          <span className="text-[12px] text-[#1A1A2E]/40 tracking-[0.08em] uppercase">
            Rate limiting infrastructure
          </span>
          <span className="text-[12px] text-[#1A1A2E]/40 tracking-[0.08em] uppercase">
            v2.4 — Generally available
          </span>
        </div>
      </div>

      {/* Main hero content */}
      <div className="flex-1 max-w-[1200px] mx-auto px-8 w-full grid lg:grid-cols-[1fr_420px] gap-0 items-stretch">
        {/* Left — headline */}
        <div className="flex flex-col justify-between py-16 lg:pr-20 border-r border-[#1A1A2E]/10">
          <div>
            <h1
              className="font-bold text-[#1A1A2E] leading-[0.88] tracking-[-0.04em] mb-10"
              style={{ fontSize: "clamp(64px, 9vw, 116px)" }}
            >
              Protect
              <br />
              every
              <br />
              endpoint.
            </h1>

            <p className="text-[#1A1A2E]/50 text-[17px] leading-[1.6] max-w-[440px] tracking-[-0.01em]">
              Four rate limiting strategies that adapt to any traffic pattern.
              Real-time analytics on every decision. Plan-based quota
              enforcement that scales with your business.
            </p>
          </div>

          <div className="flex items-end justify-between mt-16">
            <div className="flex items-center gap-3">
              <Link
                href="/auth/register"
                className="inline-flex items-center gap-2 bg-[#E8A838] text-[#1A1A2E] font-semibold px-6 py-3.5 rounded-full hover:bg-[#d4962a] transition-colors text-[14px] tracking-[-0.01em]"
              >
                Start for free
                <ArrowRight className="w-4 h-4" strokeWidth={2} />
              </Link>
              <Link
                href="/docs"
                className="inline-flex items-center gap-1.5 text-[14px] text-[#1A1A2E]/50 hover:text-[#1A1A2E] transition-colors tracking-[-0.01em] py-3.5 px-2"
              >
                Read the docs
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>

            <p className="text-[12px] text-[#1A1A2E]/30 tracking-[-0.01em] text-right hidden lg:block">
              No credit card required.
              <br />
              Free tier available.
            </p>
          </div>
        </div>

        {/* Right — signal visualization */}
        <div className="flex flex-col justify-center py-16 lg:pl-12">
          <RatePulseViz />

          <div className="mt-10 grid grid-cols-2 gap-px bg-[#1A1A2E]/10">
            {[
              { value: "14B+", label: "requests handled" },
              { value: "<1ms", label: "p99 latency" },
              { value: "4", label: "strategies" },
              { value: "99.98%", label: "uptime" },
            ].map((s) => (
              <div key={s.label} className="bg-[#F7F5F0] p-5">
                <div className="font-bold text-[#1A1A2E] text-[28px] tracking-[-0.03em] leading-none mb-1">
                  {s.value}
                </div>
                <div className="text-[12px] text-[#1A1A2E]/40 tracking-[-0.01em]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
