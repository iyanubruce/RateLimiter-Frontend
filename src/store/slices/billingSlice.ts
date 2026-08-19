import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "@/lib";

interface BillingState {
  currentPlan: "free" | "pro" | "enterprise";
  upgrading: string | null;
  error: string | null;
}

const initialState: BillingState = {
  currentPlan: "free",
  upgrading: null,
  error: null,
};

function decodeJWT(token: string) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
}

export const loadPlanFromToken = createAsyncThunk(
  "billing/loadPlan",
  async (_, { rejectWithValue }) => {
    try {
      if (typeof window === "undefined") return "free";
      const token = localStorage.getItem("ratelimitr_token");
      if (!token) return "free";
      const payload = decodeJWT(token);
      return (payload?.plan as "free" | "pro" | "enterprise") || "free";
    } catch {
      return rejectWithValue("Failed to load plan");
    }
  },
);

export const upgradePlan = createAsyncThunk(
  "billing/upgrade",
  async (plan: "pro" | "enterprise", { rejectWithValue }) => {
    try {
      const res = await apiRequest<{ url: string }>("/tenants/upgrade", {
        method: "POST",
        body: JSON.stringify({ plan }),
      });
      return res;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Upgrade failed",
      );
    }
  },
);

const billingSlice = createSlice({
  name: "billing",
  initialState,
  reducers: {
    clearBillingError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadPlanFromToken.fulfilled, (state, action) => {
        state.currentPlan = action.payload;
      })
      .addCase(upgradePlan.pending, (state, action) => {
        state.upgrading = action.meta.arg;
        state.error = null;
      })
      .addCase(upgradePlan.fulfilled, (state) => {
        state.upgrading = null;
      })
      .addCase(upgradePlan.rejected, (state, action) => {
        state.upgrading = null;
        state.error = action.payload as string;
      });
  },
});

export const { clearBillingError } = billingSlice.actions;
export default billingSlice.reducer;
