import { FormData } from "./types";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateField = (
  name: keyof FormData,
  value: string | boolean,
): string => {
  switch (name) {
    case "firstName":
    case "lastName":
      if (!value) return "Required";
      if ((value as string).length < 2) return "Must be at least 2 characters";
      return "";
    case "email":
    case "organizationEmail":
      if (!value) return "Required";
      if (!EMAIL_REGEX.test(value as string)) return "Invalid email format";
      return "";
    case "password":
      if (!value) return "Required";
      if ((value as string).length < 8) return "Must be at least 8 characters";
      return "";
    case "organizationName":
      if (!value) return "Required";
      return "";
    case "terms":
      if (!value) return "You must agree to continue";
      return "";
    default:
      return "";
  }
};
