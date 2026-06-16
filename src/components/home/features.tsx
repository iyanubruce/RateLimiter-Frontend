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

export default function Features() {
  return (
    <section
      id="features"
      className="bg-[#F7F5F0] border-t border-[#1A1A2E]/10"
    >
      <div className="max-w-[1200px] mx-auto px-8">
        {/* Section header */}
        <div className="py-12 md:py-20 border-b border-[#1A1A2E]/10 flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-0">
          <h2 className="font-bold text-[#1A1A2E] text-[36px] md:text-[48px] leading-[1] tracking-[-0.03em]">
            Built for
            <br />
            production.
          </h2>
          <p className="text-[15px] text-[#1A1A2E]/45 max-w-[300px] leading-[1.65] tracking-[-0.01em]">
            Everything you need to enforce rate limits reliably across your
            entire API surface.
          </p>
        </div>

        {/* Feature rows */}
        <div className="divide-y divide-[#1A1A2E]/10">
          {features.map((f, i) => (
            <div
              key={f.number}
              className="grid grid-cols-[auto_1fr] md:grid-cols-[80px_1fr_1fr] items-baseline md:items-start gap-x-4 md:gap-8 gap-y-3 md:gap-y-0 py-8 group hover:bg-[#1A1A2E]/[0.015] -mx-8 px-8 transition-colors"
            >
              <span className="font-mono text-[12px] text-[#1A1A2E]/25 pt-0 md:pt-0.5 tracking-[0.05em]">
                {f.number}
              </span>
              <h3 className="font-semibold text-[#1A1A2E] text-[17px] tracking-[-0.02em] leading-[1.3]">
                {f.title}
              </h3>
              <p className="col-span-2 md:col-span-1 md:col-start-3 text-[14px] text-[#1A1A2E]/50 leading-[1.65] tracking-[-0.01em]">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
