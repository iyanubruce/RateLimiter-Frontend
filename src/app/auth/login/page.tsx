"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, X, Loader2 } from "lucide-react";
import { FormData } from "./types";
import { validateField } from "./helpers";
import { InputField } from "@/components/input-field";
import { BrandPanel, ErrorBanner } from "./components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login, clearError } from "@/store/slices/authSlice";

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading: authLoading, error: authError } = useAppSelector(
    (state) => state.auth,
  );
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("ratelimitr_token");
    const user = localStorage.getItem("ratelimitr_user");
    if (token && user) {
      router.replace("/dashboard");
    } else {
      setCheckingAuth(false);
    }
  }, [router]);

  if (checkingAuth) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name as keyof FormData]) {
      const error = validateField(name as keyof FormData, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (name: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    const newTouched: Partial<Record<keyof FormData, boolean>> = {};

    (Object.keys(formData) as (keyof FormData)[]).forEach((key) => {
      newTouched[key] = true;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setTouched(newTouched);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (!validateAll()) return;

    const result = await dispatch(
      login({ email: formData.email, password: formData.password }),
    );
    if (login.fulfilled.match(result)) {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      {/* Left branding panel */}
      <BrandPanel />

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile logo */}
          <div className="lg:hidden mb-10">
            <Link
              href="/"
              className="font-semibold text-[#1A1A2E] tracking-[-0.02em] text-[15px]"
            >
              Ratelimitr
            </Link>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <p className="text-[12px] text-[#1A1A2E]/30 uppercase tracking-[0.1em] mb-4">
              Sign in
            </p>
            <h1 className="font-bold text-[#1A1A2E] text-[32px] leading-[1] tracking-[-0.03em] mb-3">
              Welcome back
            </h1>
            <p className="text-[15px] text-[#1A1A2E]/45 tracking-[-0.01em]">
              Enter your credentials to access your account.
            </p>
          </div>

          {/* API Error Banner */}
          {authError && (
            <ErrorBanner
              message={authError}
              onClose={() => dispatch(clearError())}
            />
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
            suppressHydrationWarning
          >
            {/* Email */}
            <InputField
              label="Email"
              name="email"
              type="email"
              placeholder="jane@company.com"
              value={formData.email}
              error={errors.email || ""}
              touched={!!touched.email}
              onChange={handleChange}
              onBlur={() => handleBlur("email")}
              disabled={authLoading}
            />

            {/* Password */}
            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              error={errors.password || ""}
              touched={!!touched.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              disabled={authLoading}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-2 text-[#1A1A2E]/30 hover:text-[#1A1A2E]/60 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" strokeWidth={2} />
                  ) : (
                    <Eye className="w-4 h-4" strokeWidth={2} />
                  )}
                </button>
              }
            />

            {/* Forgot password link */}
            {/* <div className="flex justify-end -mt-2">
              <Link
                href="/auth/forgot-password"
                className="text-[13px] text-[#1A1A2E]/50 hover:text-[#1A1A2E] transition-colors tracking-[-0.01em] underline underline-offset-2 decoration-[#1A1A2E]/20 hover:decoration-[#1A1A2E]/50"
              >
                Forgot password?
              </Link>
            </div> */}

            {/* Submit button */}
            <button
              type="submit"
              disabled={authLoading}
              className={`w-full h-12 bg-[#1A1A2E] text-[#F7F5F0] font-semibold rounded-full text-[14px] tracking-[-0.01em] transition-all flex items-center justify-center gap-2 mt-8
                ${
                  authLoading
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#2d2d4e]"
                }`}
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#1A1A2E]/10" />
            <span className="text-[12px] text-[#1A1A2E]/30 uppercase tracking-[0.1em]">
              or
            </span>
            <div className="flex-1 h-px bg-[#1A1A2E]/10" />
          </div>

          {/* Guest login button */}
          <button
            type="button"
            disabled={authLoading}
            onClick={async () => {
              dispatch(clearError());
              const result = await dispatch(
                login({ email: "guest@example.com", password: "Password123@" }),
              );
              if (login.fulfilled.match(result)) {
                router.push("/dashboard");
              }
            }}
            className={`w-full h-10 border border-[#1A1A2E]/15 text-[#1A1A2E]/60 font-medium rounded-full text-[13px] tracking-[-0.01em] transition-all flex items-center justify-center gap-2
              ${
                authLoading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:bg-[#1A1A2E]/5 hover:border-[#1A1A2E]/25 hover:text-[#1A1A2E]/80"
              }`}
          >
            Sign in as guest
          </button>

          {/* Sign up link */}
          <p className="text-[13px] text-[#1A1A2E]/45 text-center mt-8 tracking-[-0.01em]">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-[#1A1A2E] font-medium hover:text-[#1A1A2E]/70 transition-colors underline underline-offset-2 decoration-[#1A1A2E]/20 hover:decoration-[#1A1A2E]/50"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
