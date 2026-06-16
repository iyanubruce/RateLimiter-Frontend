import Link from "next/link";

export default function Footer() {
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
        <div className="grid grid-cols-2 md:grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-y-10 gap-x-8 md:gap-8 mb-16">
          <div className="col-span-2 md:col-span-1">
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

        <div className="border-t border-[#1A1A2E]/10 pt-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
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
