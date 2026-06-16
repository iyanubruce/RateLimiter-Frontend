import { FormData } from "./types";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateField = (name: keyof FormData, value: string): string => {
  switch (name) {
    case "email":
      if (!value) return "Required";
      if (!EMAIL_REGEX.test(value)) return "Invalid email format";
      return "";
    case "password":
      if (!value) return "Required";
      return "";
    default:
      return "";
  }
};
