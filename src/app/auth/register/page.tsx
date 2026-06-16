"use client";
import { InputField } from "@/components/input-field";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  AlertCircle,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";
import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.ratelimitr.com/v1";
import { FormData } from "./types";
import { ErrorBanner } from "@/components/error-banner";
import { validateField } from "./helpers";
import { BrandPanel } from "./components";

export default function SignUpPage() {
  const router = useRouter();
  const [checkingAuth, setCheckingAuth] = useState(true);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    organizationName: "",
    organizationEmail: "",
    terms: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {},
  );
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormData, boolean>>
  >({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Re-validate if field was already touched
    if (touched[name as keyof FormData]) {
      const error = validateField(name as keyof FormData, newValue);
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
    setApiError(null);

    if (!validateAll()) return;

    setIsSubmitting(true);

    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/register`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        organizationName: formData.organizationName,
        organizationEmail: formData.organizationEmail,
      });

      localStorage.setItem("ratelimitr_token", data.token);
      localStorage.setItem("ratelimitr_user", JSON.stringify(data.user));

      router.push("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setApiError(
          err.response?.data?.message ||
            "Failed to create account. Please try again.",
        );
      } else {
        setApiError(
          err instanceof Error ? err.message : "An unexpected error occurred",
        );
      }
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex">
      {/* Left branding panel */}
      <BrandPanel />

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 lg:p-12">
        <div className="w-full max-w-[440px]">
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
              Get started
            </p>
            <h1 className="font-bold text-[#1A1A2E] text-[32px] leading-[1] tracking-[-0.03em] mb-3">
              Create your account
            </h1>
            <p className="text-[15px] text-[#1A1A2E]/45 tracking-[-0.01em]">
              Start protecting your API in minutes.
            </p>
          </div>

          {/* API Error Banner */}
          {apiError && (
            <ErrorBanner message={apiError} onClose={() => setApiError(null)} />
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-5" suppressHydrationWarning>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <InputField
                label="First name"
                name="firstName"
                placeholder="Jane"
                value={formData.firstName}
                error={errors.firstName || ""}
                touched={!!touched.firstName}
                onChange={handleChange}
                onBlur={() => handleBlur("firstName")}
                disabled={isSubmitting}
              />
              <InputField
                label="Last name"
                name="lastName"
                placeholder="Doe"
                value={formData.lastName}
                error={errors.lastName || ""}
                touched={!!touched.lastName}
                onChange={handleChange}
                onBlur={() => handleBlur("lastName")}
                disabled={isSubmitting}
              />
            </div>

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
              disabled={isSubmitting}
            />

            {/* Password */}
            <InputField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Min. 8 characters"
              value={formData.password}
              error={errors.password || ""}
              touched={!!touched.password}
              onChange={handleChange}
              onBlur={() => handleBlur("password")}
              disabled={isSubmitting}
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

            {/* Divider */}
            <div className="pt-3">
              <div className="text-[11px] text-[#1A1A2E]/30 uppercase tracking-[0.1em] mb-4">
                Organization
              </div>
            </div>

            {/* Organization Name */}
            <InputField
              label="Organization name"
              name="organizationName"
              placeholder="Acme Inc."
              value={formData.organizationName}
              error={errors.organizationName || ""}
              touched={!!touched.organizationName}
              onChange={handleChange}
              onBlur={() => handleBlur("organizationName")}
              disabled={isSubmitting}
            />

            {/* Organization Email */}
            <InputField
              label="Organization email"
              name="organizationEmail"
              type="email"
              placeholder="billing@company.com"
              value={formData.organizationEmail}
              error={errors.organizationEmail || ""}
              touched={!!touched.organizationEmail}
              onChange={handleChange}
              onBlur={() => handleBlur("organizationEmail")}
              disabled={isSubmitting}
            />

            {/* Terms checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="terms"
                  checked={formData.terms}
                  onChange={handleChange}
                  onBlur={() => handleBlur("terms")}
                  disabled={isSubmitting}
                  className="sr-only"
                  aria-invalid={
                    touched.terms && errors.terms ? "true" : "false"
                  }
                />
                <div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all
                    ${
                      formData.terms
                        ? "bg-[#1A1A2E] border-[#1A1A2E]"
                        : touched.terms && errors.terms
                          ? "border-red-500/40 bg-white"
                          : "border-[#1A1A2E]/20 bg-white group-hover:border-[#1A1A2E]/40"
                    }
                    ${isSubmitting ? "opacity-50" : ""}`}
                >
                  {formData.terms && (
                    <Check className="w-3 h-3 text-[#F7F5F0]" strokeWidth={3} />
                  )}
                </div>
                <span className="text-[13px] text-[#1A1A2E]/60 leading-relaxed tracking-[-0.01em]">
                  I agree to the{" "}
                  <a
                    href="/terms"
                    className="text-[#1A1A2E] underline underline-offset-2 decoration-[#1A1A2E]/20 hover:decoration-[#1A1A2E]/50 transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="/privacy"
                    className="text-[#1A1A2E] underline underline-offset-2 decoration-[#1A1A2E]/20 hover:decoration-[#1A1A2E]/50 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {touched.terms && errors.terms && (
                <p className="text-[12px] text-red-500/80 mt-1.5 flex items-center gap-1 tracking-[-0.01em] ml-8">
                  <AlertCircle className="w-3 h-3" strokeWidth={2} />
                  {errors.terms}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-12 bg-[#1A1A2E] text-[#F7F5F0] font-semibold rounded-full text-[14px] tracking-[-0.01em] transition-all flex items-center justify-center gap-2 mt-8
                ${
                  isSubmitting
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-[#2d2d4e]"
                }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" strokeWidth={2} />
                  Creating account...
                </>
              ) : (
                <>
                  Create account
                  <ArrowRight className="w-4 h-4" strokeWidth={2} />
                </>
              )}
            </button>
          </form>

          {/* Sign in link */}
          <p className="text-[13px] text-[#1A1A2E]/45 text-center mt-8 tracking-[-0.01em]">
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[#1A1A2E] font-medium hover:text-[#1A1A2E]/70 transition-colors underline underline-offset-2 decoration-[#1A1A2E]/20 hover:decoration-[#1A1A2E]/50"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
