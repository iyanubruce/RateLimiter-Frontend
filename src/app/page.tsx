import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, Check, Minus } from "lucide-react";

export const metadata: Metadata = {
  title: "RateLimitr — Protect every endpoint.",
  description:
    "Rate limiting infrastructure that stays invisible until it's needed. Four strategies, real-time analytics, plan-based quotas.",
};

// ─── NAVBAR ────────────────────────────────────────────────────────────────────

function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1A1A2E]/[0.08]">
      <div className="max-w-[1200px] mx-auto px-8 h-[60px] flex items-center justify-between">
        <Link
          href="/"
          className="font-semibold text-[#1A1A2E] tracking-[-0.02em] text-[15px]"
        >
          Ratelimitr
        </Link>

        <div className="hidden md:flex items-center gap-10">
          {[
            { label: "Features", href: "#features" },
            { label: "Pricing", href: "#pricing" },
            { label: "Docs", href: "/docs" },
          ].map((l) => (
            <Link
              key={l.label}
              href={l.href}
              className="text-[13px] text-[#1A1A2E]/50 hover:text-[#1A1A2E] transition-colors tracking-[-0.01em]"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <Link
            href="/auth/login"
            className="text-[13px] text-[#1A1A2E]/50 hover:text-[#1A1A2E] transition-colors px-4 py-2 tracking-[-0.01em]"
          >
            Sign in
          </Link>
          <Link
            href="/auth/register"
            className="text-[13px] font-medium bg-[#1A1A2E] text-[#F7F5F0] px-4 py-2 rounded-full hover:bg-[#2d2d4e] transition-colors tracking-[-0.01em]"
          >
            Get started
          </Link>
        </div>
      </div>
    </nav>
  );
}

// ─── HERO ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="pt-[60px] min-h-screen bg-[#F7F5F0] flex flex-col">
      {/* Top band — eyebrow */}
      <div className="border-b border-[#1A1A2E]/10">
        <div className="max-w-[1200px] mx-auto px-8 py-3 flex items-center justify-between">
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

// ─── RATE PULSE VISUALIZATION ──────────────────────────────────────────────────

function RatePulseViz() {
  // Visual representation of 4 algorithm "shapes" — abstract, not code
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

// ─── FEATURES ──────────────────────────────────────────────────────────────────

const features = [
  {
    number: "01",
    title: "Four strategies, one API",
    body: "Fixed window, token bucket, leaky bucket, sliding window — each tuned for different traffic shapes. Switch between them without changing your integration.",
  },
  {
    number: "02",
    title: "Sub-millisecond decisions",
    body: "Every allow or deny is computed atomically. The fast path adds under 1ms to your request cycle, even under sustained traffic spikes.",
  },
  {
    number: "03",
    title: "Real-time analytics",
    body: "Every decision lands in an analytics store the moment it's made. Query allow/block rates, top endpoints, and traffic patterns live — no waiting for batch jobs.",
  },
  {
    number: "04",
    title: "Per-key overrides",
    body: "Your enterprise customers need higher limits. Grant them with a single API call. Overrides stack cleanly on top of your plan defaults without any code changes.",
  },
  {
    number: "05",
    title: "Scoped API keys",
    body: "Issue read-only, write, or admin keys to your customers. Revoke any key instantly. Set expiration dates that enforce themselves.",
  },
  {
    number: "06",
    title: "Live traffic streaming",
    body: "Subscribe to a WebSocket stream for any key or tenant and watch decisions arrive in real time. Build monitoring dashboards that actually reflect right now.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="bg-[#F7F5F0] border-t border-[#1A1A2E]/10"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Section header */}
        <div className="py-20 border-b border-[#1A1A2E]/10 flex items-end justify-between">
          <h2 className="font-bold text-[#1A1A2E] text-[48px] leading-[1] tracking-[-0.03em]">
            Built for
            <br />
            production.
          </h2>
          <p className="text-[15px] text-[#1A1A2E]/45 max-w-[300px] leading-[1.65] tracking-[-0.01em] mb-1">
            Everything you need to enforce rate limits reliably across your
            entire API surface.
          </p>
        </div>

        {/* Feature rows */}
        <div className="divide-y divide-[#1A1A2E]/10">
          {features.map((f, i) => (
            <div
              key={f.number}
              className="grid grid-cols-[80px_1fr_1fr] gap-8 py-8 group hover:bg-[#1A1A2E]/[0.015] -mx-8 px-8 transition-colors"
            >
              <span className="font-mono text-[12px] text-[#1A1A2E]/25 pt-0.5 tracking-[0.05em]">
                {f.number}
              </span>
              <h3 className="font-semibold text-[#1A1A2E] text-[17px] tracking-[-0.02em] leading-[1.3]">
                {f.title}
              </h3>
              <p className="text-[14px] text-[#1A1A2E]/50 leading-[1.65] tracking-[-0.01em]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── HOW IT WORKS ──────────────────────────────────────────────────────────────

function HowItWorks() {
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

// ─── PRICING ───────────────────────────────────────────────────────────────────

const tableFeatures = [
  {
    label: "Monthly requests",
    free: "1,000",
    pro: "Unlimited",
    ent: "Unlimited",
  },
  { label: "API keys", free: "1", pro: "25", ent: "Unlimited" },
  { label: "Fixed window", free: true, pro: true, ent: true },
  { label: "Token bucket", free: false, pro: true, ent: true },
  { label: "Leaky bucket", free: false, pro: true, ent: true },
  { label: "Sliding window", free: false, pro: false, ent: true },
  { label: "Per-key overrides", free: false, pro: true, ent: true },
  {
    label: "Analytics retention",
    free: "7 days",
    pro: "90 days",
    ent: "Custom",
  },
  { label: "WebSocket streaming", free: false, pro: true, ent: true },
  { label: "SLA", free: "—", pro: "99.9%", ent: "99.98%" },
  { label: "Support", free: "Community", pro: "Email", ent: "Dedicated" },
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 text-[#E8A838] mx-auto" strokeWidth={2.5} />
    ) : (
      <Minus className="w-4 h-4 text-[#1A1A2E]/20 mx-auto" strokeWidth={1.5} />
    );
  }
  return (
    <span className="text-[13px] text-[#1A1A2E] tracking-[-0.01em]">
      {value}
    </span>
  );
}

function Pricing() {
  return (
    <section
      id="pricing"
      className="bg-[#F7F5F0] py-28 border-t border-[#1A1A2E]/10"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-16 flex items-end justify-between">
          <div>
            <p className="text-[12px] text-[#1A1A2E]/30 uppercase tracking-[0.1em] mb-5">
              Pricing
            </p>
            <h2 className="font-bold text-[#1A1A2E] text-[48px] leading-[1] tracking-[-0.03em]">
              Simple,
              <br />
              transparent.
            </h2>
          </div>
          <p className="text-[14px] text-[#1A1A2E]/45 max-w-[260px] leading-[1.65] tracking-[-0.01em] mb-1">
            Start free. Upgrade when you need more strategies or higher volume.
          </p>
        </div>

        {/* Pricing header cards */}
        <div className="grid grid-cols-4 gap-px bg-[#1A1A2E]/10 mb-px">
          <div className="bg-[#F7F5F0] p-6 col-span-1" />
          {[
            { name: "Free", price: "$0", note: "forever" },
            { name: "Pro", price: "$29", note: "/month", highlight: true },
            { name: "Enterprise", price: "Custom", note: "" },
          ].map((plan) => (
            <div
              key={plan.name}
              className={`p-6 ${plan.highlight ? "bg-[#1A1A2E]" : "bg-[#F7F5F0]"}`}
            >
              <div
                className={`text-[12px] font-medium tracking-[-0.01em] mb-1 ${plan.highlight ? "text-white/40" : "text-[#1A1A2E]/40"}`}
              >
                {plan.name}
              </div>
              <div
                className={`flex items-baseline gap-1 ${plan.highlight ? "text-white" : "text-[#1A1A2E]"}`}
              >
                <span className="font-bold text-[32px] tracking-[-0.04em] leading-none">
                  {plan.price}
                </span>
                {plan.note && (
                  <span
                    className={`text-[12px] ${plan.highlight ? "text-white/35" : "text-[#1A1A2E]/35"}`}
                  >
                    {plan.note}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Feature rows */}
        <div className="divide-y divide-[#1A1A2E]/[0.08]">
          {tableFeatures.map((row) => (
            <div key={row.label} className="grid grid-cols-4 gap-px">
              <div className="py-4 text-[13px] text-[#1A1A2E]/50 tracking-[-0.01em]">
                {row.label}
              </div>
              <div className="py-4 text-center flex items-center justify-center">
                <Cell value={row.free} />
              </div>
              <div className="py-4 text-center flex items-center justify-center bg-[#1A1A2E]/[0.025]">
                <Cell value={row.pro} />
              </div>
              <div className="py-4 text-center flex items-center justify-center">
                <Cell value={row.ent} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA row */}
        <div className="grid grid-cols-4 gap-px bg-[#1A1A2E]/10 mt-px">
          <div className="bg-[#F7F5F0] p-6" />
          {[
            { label: "Start free", href: "/auth/register", solid: false },
            {
              label: "Start Pro trial",
              href: "/auth/register?plan=pro",
              solid: true,
            },
            {
              label: "Talk to us",
              href: "mailto:sales@ratelimitr.io",
              solid: false,
            },
          ].map((cta) => (
            <div
              key={cta.label}
              className={`p-6 ${cta.solid ? "bg-[#1A1A2E]" : "bg-[#F7F5F0]"}`}
            >
              <Link
                href={cta.href}
                className={`inline-flex items-center gap-1.5 text-[13px] font-medium rounded-full px-5 py-2.5 transition-colors ${
                  cta.solid
                    ? "bg-[#E8A838] text-[#1A1A2E] hover:bg-[#d4962a]"
                    : "border border-[#1A1A2E]/20 text-[#1A1A2E] hover:border-[#1A1A2E]/50"
                }`}
              >
                {cta.label}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FINAL CTA ─────────────────────────────────────────────────────────────────

function FinalCta() {
  return (
    <section className="bg-[#E8A838] py-28">
      <div className="max-w-[1200px] mx-auto px-8 flex items-center justify-between">
        <h2 className="font-bold text-[#1A1A2E] text-[56px] leading-[0.95] tracking-[-0.04em]">
          Your API is
          <br />
          ready. Is your
          <br />
          rate limiter?
        </h2>

        <div className="flex flex-col items-end gap-5">
          <Link
            href="/auth/register"
            className="inline-flex items-center gap-2 bg-[#1A1A2E] text-[#F7F5F0] font-semibold px-7 py-4 rounded-full hover:bg-[#2d2d4e] transition-colors text-[14px] tracking-[-0.01em]"
          >
            Create free account
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </Link>
          <p className="text-[12px] text-[#1A1A2E]/45 tracking-[-0.01em]">
            Free tier. No card required.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ────────────────────────────────────────────────────────────────────

function Footer() {
  const cols = [
    {
      heading: "Product",
      links: [
        { label: "Features", href: "#features" },
        { label: "Pricing", href: "#pricing" },
        { label: "Changelog", href: "/changelog" },
        { label: "Status", href: "/status" },
      ],
    },
    {
      heading: "Docs",
      links: [
        { label: "Getting started", href: "/docs" },
        { label: "API reference", href: "/docs/api" },
        { label: "SDKs", href: "/docs/sdks" },
        { label: "Examples", href: "/docs/examples" },
      ],
    },
    {
      heading: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Blog", href: "/blog" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      heading: "Legal",
      links: [
        { label: "Privacy", href: "/privacy" },
        { label: "Terms", href: "/terms" },
        { label: "Security", href: "/security" },
      ],
    },
  ];

  return (
    <footer className="bg-[#F7F5F0] border-t border-[#1A1A2E]/10 pt-16 pb-10">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-8 mb-16">
          <div>
            <span className="font-semibold text-[#1A1A2E] tracking-[-0.02em] text-[15px] block mb-4">
              Ratelimitr
            </span>
            <p className="text-[13px] text-[#1A1A2E]/40 leading-[1.7] max-w-[220px] tracking-[-0.01em]">
              Rate limiting infrastructure for APIs that can't afford downtime.
            </p>
          </div>
          {cols.map((col) => (
            <div key={col.heading}>
              <div className="text-[11px] text-[#1A1A2E]/30 uppercase tracking-[0.1em] mb-4">
                {col.heading}
              </div>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link
                      href={l.href}
                      className="text-[13px] text-[#1A1A2E]/45 hover:text-[#1A1A2E] transition-colors tracking-[-0.01em]"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#1A1A2E]/10 pt-8 flex items-center justify-between">
          <span className="text-[12px] text-[#1A1A2E]/30 tracking-[-0.01em]">
            © 2026 Ratelimitr, Inc.
          </span>
          <span className="text-[12px] text-[#1A1A2E]/25 tracking-[-0.01em]">
            SOC 2 · GDPR · ISO 27001
          </span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ──────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F7F5F0] antialiased">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Pricing />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
