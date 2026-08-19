import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiRequest } from "@/lib";
import type {
  OverviewData,
  GetEventsResponse,
  TimeseriesResponse,
  GetTopBlockedResponse,
  PatternsData,
  GetStatusCodesResponse,
  GetEndpointsResponse,
  DateRange,
} from "@/app/dashboard/analytics/types";

interface AnalyticsState {
  overview: OverviewData | null;
  overviewLoading: boolean;
  events: GetEventsResponse | null;
  eventsLoading: boolean;
  timeseries: TimeseriesResponse | null;
  timeseriesLoading: boolean;
  topBlocked: GetTopBlockedResponse | null;
  topBlockedLoading: boolean;
  patterns: PatternsData | null;
  patternsLoading: boolean;
  statusCodes: GetStatusCodesResponse | null;
  statusCodesLoading: boolean;
  endpoints: GetEndpointsResponse | null;
  endpointsLoading: boolean;
  error: string | null;
}

const initialState: AnalyticsState = {
  overview: null,
  overviewLoading: false,
  events: null,
  eventsLoading: false,
  timeseries: null,
  timeseriesLoading: false,
  topBlocked: null,
  topBlockedLoading: false,
  patterns: null,
  patternsLoading: false,
  statusCodes: null,
  statusCodesLoading: false,
  endpoints: null,
  endpointsLoading: false,
  error: null,
};

export const fetchOverview = createAsyncThunk(
  "analytics/fetchOverview",
  async (params: DateRange, { rejectWithValue }) => {
    try {
      return await apiRequest<OverviewData>("/analytics/overview", { params });
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch overview",
      );
    }
  },
);

export const fetchEvents = createAsyncThunk(
  "analytics/fetchEvents",
  async (params: { limit?: number; offset?: number }, { rejectWithValue }) => {
    try {
      return await apiRequest<GetEventsResponse>("/analytics/events", { params });
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch events",
      );
    }
  },
);

export const fetchTimeseries = createAsyncThunk(
  "analytics/fetchTimeseries",
  async (params: DateRange, { rejectWithValue }) => {
    try {
      return await apiRequest<TimeseriesResponse>("/analytics/timeseries", {
        params,
      });
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch timeseries",
      );
    }
  },
);

export const fetchTopBlocked = createAsyncThunk(
  "analytics/fetchTopBlocked",
  async (params: DateRange, { rejectWithValue }) => {
    try {
      return await apiRequest<GetTopBlockedResponse>("/analytics/top-blocked", {
        params,
      });
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch top blocked",
      );
    }
  },
);

export const fetchPatterns = createAsyncThunk(
  "analytics/fetchPatterns",
  async (params: DateRange, { rejectWithValue }) => {
    try {
      return await apiRequest<PatternsData>("/analytics/patterns", { params });
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch patterns",
      );
    }
  },
);

export const fetchStatusCodes = createAsyncThunk(
  "analytics/fetchStatusCodes",
  async (params: DateRange, { rejectWithValue }) => {
    try {
      return await apiRequest<GetStatusCodesResponse>("/analytics/status-codes", {
        params,
      });
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch status codes",
      );
    }
  },
);

export const fetchEndpoints = createAsyncThunk(
  "analytics/fetchEndpoints",
  async (params: DateRange, { rejectWithValue }) => {
    try {
      return await apiRequest<GetEndpointsResponse>("/analytics/endpoints", {
        params,
      });
    } catch (err: unknown) {
      return rejectWithValue(
        err instanceof Error ? err.message : "Failed to fetch endpoints",
      );
    }
  },
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {
    clearAnalyticsError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Overview
      .addCase(fetchOverview.pending, (state) => {
        state.overviewLoading = true;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.overviewLoading = false;
        state.overview = action.payload;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.overviewLoading = false;
        state.error = action.payload as string;
      })
      // Events
      .addCase(fetchEvents.pending, (state) => {
        state.eventsLoading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.eventsLoading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.eventsLoading = false;
        state.error = action.payload as string;
      })
      // Timeseries
      .addCase(fetchTimeseries.pending, (state) => {
        state.timeseriesLoading = true;
      })
      .addCase(fetchTimeseries.fulfilled, (state, action) => {
        state.timeseriesLoading = false;
        state.timeseries = action.payload;
      })
      .addCase(fetchTimeseries.rejected, (state, action) => {
        state.timeseriesLoading = false;
        state.error = action.payload as string;
      })
      // Top Blocked
      .addCase(fetchTopBlocked.pending, (state) => {
        state.topBlockedLoading = true;
      })
      .addCase(fetchTopBlocked.fulfilled, (state, action) => {
        state.topBlockedLoading = false;
        state.topBlocked = action.payload;
      })
      .addCase(fetchTopBlocked.rejected, (state, action) => {
        state.topBlockedLoading = false;
        state.error = action.payload as string;
      })
      // Patterns
      .addCase(fetchPatterns.pending, (state) => {
        state.patternsLoading = true;
      })
      .addCase(fetchPatterns.fulfilled, (state, action) => {
        state.patternsLoading = false;
        state.patterns = action.payload;
      })
      .addCase(fetchPatterns.rejected, (state, action) => {
        state.patternsLoading = false;
        state.error = action.payload as string;
      })
      // Status Codes
      .addCase(fetchStatusCodes.pending, (state) => {
        state.statusCodesLoading = true;
      })
      .addCase(fetchStatusCodes.fulfilled, (state, action) => {
        state.statusCodesLoading = false;
        state.statusCodes = action.payload;
      })
      .addCase(fetchStatusCodes.rejected, (state, action) => {
        state.statusCodesLoading = false;
        state.error = action.payload as string;
      })
      // Endpoints
      .addCase(fetchEndpoints.pending, (state) => {
        state.endpointsLoading = true;
      })
      .addCase(fetchEndpoints.fulfilled, (state, action) => {
        state.endpointsLoading = false;
        state.endpoints = action.payload;
      })
      .addCase(fetchEndpoints.rejected, (state, action) => {
        state.endpointsLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearAnalyticsError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
