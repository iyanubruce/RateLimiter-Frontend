"use client";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "/docs" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 max-w-screen z-50 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1A1A2E]/[0.08]">
      <div className="max-w-[1200px] mx-auto px-8 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-[#1A1A2E] tracking-[-0.02em] text-[15px]"
        >
          Ratelimitr
        </Link>

        {/* Desktop Navigation Links (UNCHANGED) */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
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
          {/* Desktop Auth Buttons (Hidden on mobile to prevent duplication) */}
          <div className="hidden md:flex items-center gap-1">
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

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#1A1A2E] rounded-lg hover:bg-[#1A1A2E]/5 transition-colors ml-2"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={2} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={2} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-15 left-0 right-0 bg-[#F7F5F0] border-b border-[#1A1A2E]/8 shadow-lg slide-in-top duration-500 slide-in-top ">
          <div className="max-w-300 mx-auto px-8 py-6 flex flex-col gap-2">
            {/* Nav Links */}
            {navLinks.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-[15px] text-[#1A1A2E]/70 hover:text-[#1A1A2E] transition-colors py-3 px-4 rounded-lg hover:bg-[#1A1A2E]/3"
              >
                {l.label}
              </Link>
            ))}

            <div className="h-px bg-[#1A1A2E]/10 my-4" />

            {/* Auth Buttons */}
            <Link
              href="/auth/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[15px] text-[#1A1A2E]/70 hover:text-[#1A1A2E] transition-colors py-3 px-4 rounded-lg hover:bg-[#1A1A2E]/3"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-[15px] font-medium bg-[#1A1A2E] text-[#F7F5F0] py-3 px-4 rounded-lg text-center hover:bg-[#2d2d4e] transition-colors mt-2"
            >
              Get started
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
