import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "@/lib";
import type { ApiKey, ListApiKeysResponse, CreateKeyInput } from "@/app/dashboard/api-keys/types";

interface ApiKeysState {
  keys: ApiKey[];
  pagination: ListApiKeysResponse["pagination"] | null;
  loading: boolean;
  error: string | null;
  creating: boolean;
  createError: string | null;
}

const initialState: ApiKeysState = {
  keys: [],
  pagination: null,
  loading: false,
  error: null,
  creating: false,
  createError: null,
};

export const fetchApiKeys = createAsyncThunk(
  "apiKeys/fetchAll",
  async (limit: number = 50, { rejectWithValue }) => {
    try {
      const res = await apiRequest<ListApiKeysResponse>("/api-keys/keys", {
        params: { limit },
      });
      return res;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch API keys",
      );
    }
  },
);

export const createApiKey = createAsyncThunk(
  "apiKeys/create",
  async (input: CreateKeyInput, { rejectWithValue }) => {
    try {
      const res = await apiRequest<{ apiKey: string }>("/api-keys/keys", {
        method: "POST",
        body: JSON.stringify(input),
      });
      return res;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to create API key",
      );
    }
  },
);

export const revokeApiKey = createAsyncThunk(
  "apiKeys/revoke",
  async (keyId: string, { rejectWithValue }) => {
    try {
      await apiRequest(`/api-keys/keys/${keyId}`, { method: "DELETE" });
      return keyId;
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to revoke API key",
      );
    }
  },
);

const apiKeysSlice = createSlice({
  name: "apiKeys",
  initialState,
  reducers: {
    clearCreateError(state) {
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiKeys.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchApiKeys.fulfilled, (state, action) => {
        state.loading = false;
        state.keys = action.payload.keys;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchApiKeys.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createApiKey.pending, (state) => {
        state.creating = true;
        state.createError = null;
      })
      .addCase(createApiKey.fulfilled, (state) => {
        state.creating = false;
      })
      .addCase(createApiKey.rejected, (state, action) => {
        state.creating = false;
        state.createError = action.payload as string;
      })
      .addCase(revokeApiKey.fulfilled, (state, action) => {
        state.keys = state.keys.filter((k) => k.id.toString() !== action.payload);
      });
  },
});

export const { clearCreateError } = apiKeysSlice.actions;
export default apiKeysSlice.reducer;
