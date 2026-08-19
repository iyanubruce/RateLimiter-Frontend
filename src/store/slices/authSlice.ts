import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "@/lib";

interface User {
  id?: number;
  firstName: string;
  lastName?: string;
  email?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
      localStorage.setItem("ratelimitr_token", data.token);
      localStorage.setItem("ratelimitr_user", JSON.stringify(data.user));
      return data;
    } catch (err: unknown) {
      return rejectWithValue(
        axios.isAxiosError(err)
          ? err.message || "Invalid email or password"
          : err instanceof Error
            ? err.message
            : "An unexpected error occurred",
      );
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (
    payload: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      organizationName: string;
      organizationEmail: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/register`, payload);
      localStorage.setItem("ratelimitr_token", data.token);
      localStorage.setItem("ratelimitr_user", JSON.stringify(data.user));
      return data;
    } catch (err: unknown) {
      return rejectWithValue(
        axios.isAxiosError(err)
          ? err.response?.data?.message || "Failed to create account"
          : err instanceof Error
            ? err.message
            : "An unexpected error occurred",
      );
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("ratelimitr_token");
      localStorage.removeItem("ratelimitr_user");
    },
    loadFromStorage(state) {
      if (typeof window === "undefined") return;
      const token = localStorage.getItem("ratelimitr_token");
      const userStr = localStorage.getItem("ratelimitr_user");
      if (token && userStr) {
        try {
          state.token = token;
          state.user = JSON.parse(userStr);
        } catch {
          localStorage.removeItem("ratelimitr_token");
          localStorage.removeItem("ratelimitr_user");
        }
      }
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, loadFromStorage, clearError } = authSlice.actions;
export default authSlice.reducer;
