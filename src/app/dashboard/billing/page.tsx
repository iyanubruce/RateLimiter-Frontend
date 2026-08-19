"use client";
import { useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadPlanFromToken, upgradePlan } from "@/store/slices/billingSlice";

export default function BillingPage() {
  const dispatch = useAppDispatch();
  const { currentPlan, upgrading } = useAppSelector((state) => state.billing);

  useEffect(() => {
    dispatch(loadPlanFromToken());
  }, [dispatch]);

  const handleUpgrade = (plan: "pro" | "enterprise") => {
    dispatch(upgradePlan(plan)).then((result) => {
      if (upgradePlan.fulfilled.match(result)) {
        window.location.href = result.payload.url;
      }
    });
  };

  const plans = [
    {
      name: "Free",
      price: "$0",
      note: "forever",
      features: [
        "1,000 requests/mo",
        "1 API key",
        "Fixed window strategy",
        "7 days analytics retention",
        "Community support",
      ],
    },
    {
      name: "Pro",
      price: "$29",
      note: "/month",
      features: [
        "Unlimited requests",
        "25 API keys",
        "All 4 strategies",
        "90 days analytics retention",
        "Email support",
        "Per-key overrides",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      note: "",
      features: [
        "Unlimited everything",
        "Unlimited API keys",
        "Sliding window strategy",
        "Custom retention",
        "Dedicated support",
        "Custom SLA (99.98%)",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[24px] font-bold text-[#1A1A2E] tracking-[-0.03em] mb-2">
          Billing & Plans
        </h1>
        <p className="text-[15px] text-[#1A1A2E]/50">
          Manage your subscription and usage limits.
        </p>
      </div>

      {/* Current Plan Banner */}
      <div className="bg-[#1A1A2E] rounded-xl p-6 text-[#F7F5F0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[12px] text-white/40 uppercase tracking-wider mb-1">
            Current Plan
          </div>
          <div className="text-[28px] font-bold tracking-[-0.03em] capitalize">
            {currentPlan}
          </div>
        </div>
        <div className="text-[14px] text-white/60 max-w-md">
          You are currently on the {currentPlan} plan.{" "}
          {currentPlan === "free"
            ? "Upgrade to unlock advanced strategies and higher limits."
            : "Your account is in good standing."}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = plan.name.toLowerCase() === currentPlan;
          const isEnterprise = plan.name === "Enterprise";

          return (
            <div
              key={plan.name}
              className={`relative rounded-xl border p-6 flex flex-col ${isCurrent ? "bg-[#1A1A2E] border-[#1A1A2E] text-[#F7F5F0]" : "bg-white border-[#1A1A2E]/10 text-[#1A1A2E]"}`}
            >
              {isCurrent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#E8A838] text-[#1A1A2E] text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Current Plan
                </div>
              )}

              <div className="mb-6">
                <div
                  className={`text-[12px] font-medium tracking-[-0.01em] mb-1 ${isCurrent ? "text-white/40" : "text-[#1A1A2E]/40"}`}
                >
                  {plan.name}
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-[32px] tracking-[-0.04em] leading-none">
                    {plan.price}
                  </span>
                  {plan.note && (
                    <span
                      className={`text-[12px] ${isCurrent ? "text-white/35" : "text-[#1A1A2E]/35"}`}
                    >
                      {plan.note}
                    </span>
                  )}
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[13px]">
                    <Check
                      className={`w-4 h-4 shrink-0 mt-0.5 ${isCurrent ? "text-[#E8A838]" : "text-[#1A1A2E]/30"}`}
                      strokeWidth={2.5}
                    />
                    <span
                      className={
                        isCurrent ? "text-white/70" : "text-[#1A1A2E]/60"
                      }
                    >
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                disabled={isCurrent || !!upgrading}
                onClick={() =>
                  handleUpgrade(plan.name.toLowerCase() as "pro" | "enterprise")
                }
                className={`w-full py-2.5 rounded-full text-[14px] font-medium transition-all flex items-center justify-center gap-2 ${
                  isCurrent
                    ? "bg-white/10 text-white/50 cursor-not-allowed"
                    : isEnterprise
                      ? "border border-[#1A1A2E]/20 text-[#1A1A2E] hover:border-[#1A1A2E]/50"
                      : "bg-[#E8A838] text-[#1A1A2E] hover:bg-[#d4962a]"
                }`}
              >
                {upgrading === plan.name.toLowerCase() ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : isCurrent ? (
                  "Current Plan"
                ) : isEnterprise ? (
                  "Contact Sales"
                ) : (
                  "Upgrade"
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
