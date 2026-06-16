import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCta() {
  return (
    <section className="bg-[#E8A838] py-16 md:py-28">
      <div className="max-w-[1200px] mx-auto px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-0">
        <h2 className="font-bold text-[#1A1A2E] text-[36px] md:text-[56px] leading-[0.95] tracking-[-0.04em]">
          Your API is
          <br />
          ready. Is your
          <br />
          rate limiter?
        </h2>

        <div className="flex flex-col items-start md:items-end gap-5 w-full md:w-auto">
          <Link
            href="/auth/register"
            className="inline-flex items-center justify-center gap-2 bg-[#1A1A2E] text-[#F7F5F0] font-semibold px-7 py-4 rounded-full hover:bg-[#2d2d4e] transition-colors text-[14px] tracking-[-0.01em] w-full md:w-auto"
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
