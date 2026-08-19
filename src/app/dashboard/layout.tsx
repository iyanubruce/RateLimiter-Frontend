"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  KeyRound,
  BarChart3,
  CreditCard,
  LogOut,
  FileText,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loadFromStorage, logout } from "@/store/slices/authSlice";

const navLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/api-keys", label: "API Keys", icon: KeyRound },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/billing", label: "Billing", icon: CreditCard },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  useEffect(() => {
    const userData = localStorage.getItem("ratelimitr_user");
    if (!userData) {
      router.push("/auth/login");
    }
  }, [router, user]);

  const handleSignOut = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen text-black bg-[#F7F5F0] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-[240px] bg-[#1A1A2E] transform transition-transform duration-300 md:translate-x-0 md:static md:shrink-0 ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-full flex flex-col">
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <Link
              href="/"
              className="font-semibold text-[#F7F5F0] tracking-[-0.02em] text-[15px]"
            >
              Ratelimitr
            </Link>
            <button
              className="md:hidden ml-auto text-white/50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 py-6 px-3 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] tracking-[-0.01em] transition-colors ${
                    isActive
                      ? "bg-[#E8A838]/10 text-[#E8A838] font-medium"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <link.icon className="w-4 h-4" strokeWidth={2} />
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#1A1A2E]/10 flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <button
            className="md:hidden text-[#1A1A2E]"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="ml-auto relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 text-[14px] text-[#1A1A2E]/70 hover:text-[#1A1A2E] transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-[#1A1A2E] text-[#F7F5F0] flex items-center justify-center font-semibold text-[12px]">
                {user?.firstName?.[0] || "U"}
              </div>
              <span className="hidden sm:block">
                {user?.firstName || "User"}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {showUserMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowUserMenu(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-[#1A1A2E]/10 py-1 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <a
                    href="/docs"
                    className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#1A1A2E]/70 hover:bg-[#1A1A2E]/[0.03] hover:text-[#1A1A2E] transition-colors"
                  >
                    <FileText className="w-4 h-4" /> Docs
                  </a>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2 text-[13px] text-red-600/80 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
