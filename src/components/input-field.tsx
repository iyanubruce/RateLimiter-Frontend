import { AlertCircle } from "lucide-react";
export function InputField({
  label,
  name,
  type = "text",
  placeholder,
  value,
  error,
  touched,
  onChange,
  onBlur,
  disabled,
  rightElement,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  error: string;
  touched: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  disabled: boolean;
  rightElement?: React.ReactNode;
}) {
  const hasError = touched && error;

  return (
    <div>
      <label
        htmlFor={name}
        className="text-[13px] font-medium text-[#1A1A2E]/70 mb-2 block tracking-[-0.01em]"
      >
        {label}
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          aria-invalid={hasError ? "true" : "false"}
          aria-describedby={hasError ? `${name}-error` : undefined}
          className={`w-full h-11 px-4 text-black text-[14px] bg-white rounded-lg border tracking-[-0.01em] transition-all outline-none
            placeholder:text-[#1A1A2E]/25
            disabled:opacity-50 disabled:cursor-not-allowed
            ${rightElement ? "pr-11" : ""}
            ${
              hasError
                ? "border-red-500/40 focus:border-red-500/60 focus:ring-2 focus:ring-red-500/10"
                : "border-[#1A1A2E]/10 focus:border-[#1A1A2E]/30 focus:ring-2 focus:ring-[#1A1A2E]/5"
            }`}
        />
        {rightElement && (
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            {rightElement}
          </div>
        )}
      </div>
      {hasError && (
        <p
          id={`${name}-error`}
          className="text-[12px] text-red-500/80 mt-1.5 flex items-center gap-1 tracking-[-0.01em]"
        >
          <AlertCircle className="w-3 h-3" strokeWidth={2} />
          {error}
        </p>
      )}
    </div>
  );
}
