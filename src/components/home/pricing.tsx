import Link from "next/link";
import { ArrowRight, Check, Minus } from "lucide-react";

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

function Cell({
  value,
  dark = false,
}: {
  value: boolean | string;
  dark?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-4 h-4 text-[#E8A838] mx-auto" strokeWidth={2.5} />
    ) : (
      <Minus
        className={`w-4 h-4 mx-auto ${dark ? "text-white/20" : "text-[#1A1A2E]/20"}`}
        strokeWidth={1.5}
      />
    );
  }
  return (
    <span
      className={`text-[13px] tracking-[-0.01em] ${dark ? "text-white" : "text-[#1A1A2E]"}`}
    >
      {value}
    </span>
  );
}

export default function Pricing() {
  const plans = [
    {
      key: "free",
      name: "Free",
      price: "$0",
      note: "forever",
      highlight: false,
      cta: { label: "Start free", href: "/auth/register", solid: false },
    },
    {
      key: "pro",
      name: "Pro",
      price: "$29",
      note: "/month",
      highlight: true,
      cta: {
        label: "Start Pro trial",
        href: "/auth/register?plan=pro",
        solid: true,
      },
    },
    {
      key: "ent",
      name: "Enterprise",
      price: "Custom",
      note: "",
      highlight: false,
      cta: {
        label: "Talk to us",
        href: "mailto:sales@ratelimitr.io",
        solid: false,
      },
    },
  ];

  return (
    <section
      id="pricing"
      className="bg-[#F7F5F0] py-20 md:py-28 border-t border-[#1A1A2E]/10"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[12px] text-[#1A1A2E]/30 uppercase tracking-[0.1em] mb-5">
              Pricing
            </p>
            <h2 className="font-bold text-[#1A1A2E] text-[36px] md:text-[48px] leading-[1] tracking-[-0.03em]">
              Simple,
              <br />
              transparent.
            </h2>
          </div>
          <p className="text-[14px] text-[#1A1A2E]/45 max-w-[260px] leading-[1.65] tracking-[-0.01em]">
            Start free. Upgrade when you need more strategies or higher volume.
          </p>
        </div>

        <div className="md:hidden flex flex-col gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-2xl ${
                plan.highlight
                  ? "bg-[#1A1A2E] text-white"
                  : "bg-white border border-[#1A1A2E]/10"
              }`}
            >
              <div className="mb-6">
                <div
                  className={`text-[12px] font-medium tracking-[-0.01em] mb-1 ${
                    plan.highlight ? "text-white/40" : "text-[#1A1A2E]/40"
                  }`}
                >
                  {plan.name}
                </div>
                <div
                  className={`flex items-baseline gap-1 ${
                    plan.highlight ? "text-white" : "text-[#1A1A2E]"
                  }`}
                >
                  <span className="font-bold text-[32px] tracking-[-0.04em] leading-none">
                    {plan.price}
                  </span>
                  {plan.note && (
                    <span
                      className={`text-[12px] ${
                        plan.highlight ? "text-white/35" : "text-[#1A1A2E]/35"
                      }`}
                    >
                      {plan.note}
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`divide-y ${plan.highlight ? "divide-white/10" : "divide-[#1A1A2E]/10"} mb-6`}
              >
                {tableFeatures.map((row) => (
                  <div
                    key={row.label}
                    className="py-3 flex items-center justify-between gap-4"
                  >
                    <span
                      className={`text-[13px] ${plan.highlight ? "text-white/60" : "text-[#1A1A2E]/60"} tracking-[-0.01em]`}
                    >
                      {row.label}
                    </span>
                    <Cell
                      value={row[plan.key as keyof typeof row]}
                      dark={plan.highlight}
                    />
                  </div>
                ))}
              </div>

              <Link
                href={plan.cta.href}
                className={`w-full inline-flex items-center justify-center gap-1.5 text-[13px] font-medium rounded-full px-5 py-3 transition-colors ${
                  plan.cta.solid
                    ? "bg-[#E8A838] text-[#1A1A2E] hover:bg-[#d4962a]"
                    : plan.highlight
                      ? "border border-white/20 text-white hover:border-white/50"
                      : "border border-[#1A1A2E]/20 text-[#1A1A2E] hover:border-[#1A1A2E]/50"
                }`}
              >
                {plan.cta.label}
                <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
              </Link>
            </div>
          ))}
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-4 gap-px bg-[#1A1A2E]/10 mb-px">
            <div className="bg-[#F7F5F0] p-6 col-span-1" />
            {plans.map((plan) => (
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

          <div className="grid grid-cols-4 gap-px bg-[#1A1A2E]/10 mt-px">
            <div className="bg-[#F7F5F0] p-6" />
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`p-6 ${plan.highlight ? "bg-[#1A1A2E]" : "bg-[#F7F5F0]"}`}
              >
                <Link
                  href={plan.cta.href}
                  className={`inline-flex items-center gap-1.5 text-[13px] font-medium rounded-full px-5 py-2.5 transition-colors ${
                    plan.cta.solid
                      ? "bg-[#E8A838] text-[#1A1A2E] hover:bg-[#d4962a]"
                      : "border border-[#1A1A2E]/20 text-[#1A1A2E] hover:border-[#1A1A2E]/50"
                  }`}
                >
                  {plan.cta.label}
                  <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
