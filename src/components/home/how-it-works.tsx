import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HowItWorks() {
  const steps = [
    {
      label: "Create a key",
      body: "Generate an API key for each customer or service. Assign scopes — read, write, or admin — and optionally set an expiration date.",
    },
    {
      label: "Choose a strategy",
      body: "Pick the algorithm that matches your traffic shape. Apply it at the key level, the tenant level, or globally. Override it per key anytime.",
    },
    {
      label: "Watch the data",
      body: "Every decision flows into analytics automatically. Filter by key, endpoint, status, or time range. Spot patterns before they become incidents.",
    },
  ];

  return (
    <section className="bg-[#1A1A2E] py-28">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-20">
          <p className="text-[12px] text-white/25 uppercase tracking-[0.1em] mb-5">
            How it works
          </p>
          <h2 className="font-bold text-white text-[48px] leading-[1] tracking-[-0.03em]">
            Three steps.
            <br />
            <span className="text-white/30">That's it.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-px bg-white/10">
          {steps.map((s, i) => (
            <div key={s.label} className="bg-[#1A1A2E] p-10">
              <div className="text-[11px] text-white/20 font-mono tracking-[0.1em] mb-8">
                0{i + 1}
              </div>
              <h3 className="text-white font-semibold text-[22px] tracking-[-0.02em] leading-[1.2] mb-4">
                {s.label}
              </h3>
              <p className="text-white/40 text-[14px] leading-[1.65] tracking-[-0.01em]">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-[#E8A838] text-[#1A1A2E] font-semibold px-6 py-3.5 rounded-full hover:bg-[#d4962a] transition-colors text-[14px] tracking-[-0.01em]"
          >
            Start for free
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-[14px] text-white/40 hover:text-white/70 transition-colors tracking-[-0.01em]"
          >
            Read the docs
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}
