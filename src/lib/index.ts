export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.ratelimitr.com/v1";
import { useCallback } from "react";
import axios, { AxiosRequestConfig } from "axios";

export function getAuthHeader() {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("ratelimitr_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function apiRequest<T>(
  endpoint: string,
  options: AxiosRequestConfig & { body?: string } = {},
): Promise<T> {
  const { body, ...axiosOptions } = options;
  try {
    const res = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      ...axiosOptions,
      ...(body ? { data: body } : {}),
    });

    return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      if (err.response?.status === 401) {
        localStorage.removeItem("ratelimitr_token");
        localStorage.removeItem("ratelimitr_user");
        if (typeof window !== "undefined") {
          window.location.href = "/auth/login";
        }
      }
      throw new Error(
        err.response?.data?.message || err.message || "API request failed",
      );
    }
    throw err;
  }
}
import { useState, useEffect } from "react";

export function useApi<T>(
  endpoint: string,
  params?: Record<string, any>,
  deps: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = params
        ? `?${new URLSearchParams(params).toString()}`
        : "";
      const res = await apiRequest<T>(`${endpoint}${queryParams}`);
      setData(res);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint, JSON.stringify(params), ...deps]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
