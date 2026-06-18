"use client";
import { useState, useMemo } from "react";
import { useApi } from "@/lib";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface timeseriesData {
  time: string;
  totalRequests: string;
  blockedRequests: string;
  avgDuration: string;
}

interface GetTimeSeriesDataResponse {
  interval: string;
  buckets: number;
  timeseries: timeseriesData[];
}

interface AnalyticsEvent {
  time: string;
  tenantId: string;
  apiKeyId: number;
  ipAddress: string;
  endpoint: string;
  method: string;
  userAgent: string;
  statusCode: number;
  requestDurationMs: number;
  responseSize: number;
  isBlocked: boolean;
  remainingQuota: number;
}

interface GetEventsResponse {
  events: AnalyticsEvent[];
  total: number;
  limit: number;
  offset: number;
}

interface TopBlockedItem {
  ipAddress: string;
  endpoint: string;
  blockCount: string;
  firstBlock: string;
  lastBlock: string;
}

interface GetTopBlockedResponse {
  topBlocked: TopBlockedItem[];
}

interface PatternsData {
  totalUniqueIps: number;
  suspiciousPatterns: Array<{
    ipAddress: string;
    blockRate: number;
    totalRequests: number;
    reason: string;
  }>;
  burstPatterns: Array<{
    ipAddress: string;
    endpointsHit: number;
    blockRate: number;
    timeWindow: string;
  }>;
  topTalkers: Array<{
    ipAddress: string;
    totalRequests: number;
    blockedRequests: number;
    blockRate: number;
    avgDuration: number;
  }>;
}

interface StatusCodeData {
  statusCode: number;
  count: number;
  blocked: number;
}

interface GetStatusCodesResponse {
  statusCodes: StatusCodeData[];
}

interface EndpointData {
  endpoint: string;
  method: string;
  totalRequests: number;
  blockedRequests: number;
  blockRate: number;
  avgDuration: number;
}

interface GetEndpointsResponse {
  endpoints: EndpointData[];
}

const tabs = [
  "Events",
  "Endpoints",
  "Top Blocked",
  "Status Codes",
  "Patterns",
] as const;

type Tab = (typeof tabs)[number];

function toDateString(ts: number) {
  return new Date(ts).toISOString().slice(0, 10);
}

function formatDateTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function formatTime(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

const INTERVAL_SECONDS: Record<string, number> = {
  "1m": 60,
  "5m": 300,
  "1h": 3600,
  "1d": 86400,
};

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Events");
  const now = Date.now();
  const [filters, setFilters] = useState({
    startDate: toDateString(now - 7 * 86400000),
    endDate: toDateString(now),
    interval: "1h",
  });

  const [eventsPage, setEventsPage] = useState(0);
  const eventsLimit = 20;

  const { data: chartData } = useApi<GetTimeSeriesDataResponse>(
    "/analytics/timeseries",
    filters,
  );

  const { data: eventsData, loading: eventsLoading } =
    useApi<GetEventsResponse>("/analytics/events", {
      limit: eventsLimit,
      offset: eventsPage * eventsLimit,
    });

  const { data: topBlockedData, loading: topBlockedLoading } =
    useApi<GetTopBlockedResponse>("/analytics/top-blocked", filters);

  const { data: patternsData, loading: patternsLoading } = useApi<PatternsData>(
    "/analytics/patterns",
    filters,
  );

  const { data: statusCodesData, loading: statusCodesLoading } =
    useApi<GetStatusCodesResponse>("/analytics/status-codes", filters);

  const { data: endpointsData, loading: endpointsLoading } =
    useApi<GetEndpointsResponse>("/analytics/endpoints", filters);

  const chartDataWithRps = useMemo(() => {
    const intervalSeconds = INTERVAL_SECONDS[filters.interval] || 3600;
    return chartData?.timeseries?.map((point) => ({
      ...point,
      requestsPerSecond: Number(point.totalRequests) / intervalSeconds,
    }));
  }, [chartData, filters.interval]);

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-bold text-[#1A1A2E] tracking-[-0.03em]">
        Analytics
      </h1>

      {/* Filters */}
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-4 flex flex-wrap items-center gap-3">
        <input
          type="date"
          className="text-[13px] text-black bg-[#F7F5F0] border border-[#1A1A2E]/10 rounded px-3 py-1.5 outline-none"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />
        <input
          type="date"
          className="text-[13px] text-black bg-[#F7F5F0] border border-[#1A1A2E]/10 rounded px-3 py-1.5 outline-none"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        <select
          className="text-[13px] text-black bg-[#F7F5F0] border border-[#1A1A2E]/10 rounded px-2 py-1.5 outline-none"
          value={filters.interval}
          onChange={(e) => setFilters({ ...filters, interval: e.target.value })}
        >
          <option value="1m">1 Minute</option>
          <option value="5m">5 Minutes</option>
          <option value="1h">1 Hour</option>
          <option value="1d">1 Day</option>
        </select>
        <div className="flex-1" />
        <input
          placeholder="Filter by endpoint..."
          className="text-[13px] bg-[#F7F5F0] border text-black border-[#1A1A2E]/10 rounded px-3 py-1.5 outline-none w-48"
        />
      </div>

      {/* Chart */}
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-6">
        <h3 className="text-[14px] font-semibold text-[#1A1A2E] mb-6">
          Traffic Overview
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartDataWithRps}>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#1A1A2E"
                strokeOpacity={0.05}
              />
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#1A1A2E", opacity: 0.5 }}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12, fill: "#1A1A2E", opacity: 0.5 }}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "1px solid rgba(26,26,46,0.1)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                }}
              />
              <Area
                type="monotone"
                dataKey="totalRequests"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="blockedRequests"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="requestsPerSecond"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[#1A1A2E]/10 flex gap-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-[14px] font-medium tracking-[-0.01em] transition-colors border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? "border-[#1A1A2E] text-[#1A1A2E]"
                : "border-transparent text-[#1A1A2E]/40 hover:text-[#1A1A2E]/70"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Events" && (
        <EventsTable
          data={eventsData}
          loading={eventsLoading}
          page={eventsPage}
          onPageChange={setEventsPage}
          limit={eventsLimit}
        />
      )}

      {activeTab === "Endpoints" && (
        <EndpointsTable data={endpointsData} loading={endpointsLoading} />
      )}

      {activeTab === "Top Blocked" && (
        <TopBlockedTable data={topBlockedData} loading={topBlockedLoading} />
      )}

      {activeTab === "Status Codes" && (
        <StatusCodesTable data={statusCodesData} loading={statusCodesLoading} />
      )}

      {activeTab === "Patterns" && (
        <PatternsTable data={patternsData} loading={patternsLoading} />
      )}
    </div>
  );
}

// Events Table
function EventsTable({
  data,
  loading,
  page,
  onPageChange,
  limit,
}: {
  data: GetEventsResponse | null;
  loading: boolean;
  page: number;
  onPageChange: (page: number) => void;
  limit: number;
}) {
  const totalPages = data ? Math.ceil(data.total / limit) : 0;

  return (
    <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#1A1A2E]/[0.02]">
              {[
                "Time",
                "IP Address",
                "Endpoint",
                "Method",
                "Status",
                "Blocked",
                "Duration",
              ].map((h) => (
                <th
                  key={h}
                  className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A2E]/5">
            {loading ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  Loading...
                </td>
              </tr>
            ) : !data?.events?.length ? (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  No events found
                </td>
              </tr>
            ) : (
              data.events.map((event, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                >
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60 font-mono">
                    {formatTime(event.time)}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E] font-medium">
                    {event.ipAddress}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                    {event.endpoint}
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-[11px] font-mono bg-[#1A1A2E]/5 px-2 py-1 rounded text-[#1A1A2E]/70">
                      {event.method}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                    {event.statusCode}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-[11px] font-medium px-2 py-1 rounded-full ${
                        event.isBlocked
                          ? "bg-red-100 text-red-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {event.isBlocked ? "Yes" : "No"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60 font-mono">
                    {event.requestDurationMs}ms
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-[#1A1A2E]/10 flex items-center justify-between">
          <div className="text-[13px] text-[#1A1A2E]/50">
            Page {page + 1} of {totalPages}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => onPageChange(page - 1)}
              disabled={page === 0}
              className="p-2 rounded-lg border border-[#1A1A2E]/10 text-[#1A1A2E]/50 hover:bg-[#1A1A2E]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onPageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className="p-2 rounded-lg border border-[#1A1A2E]/10 text-[#1A1A2E]/50 hover:bg-[#1A1A2E]/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// Endpoints Table
function EndpointsTable({
  data,
  loading,
}: {
  data: GetEndpointsResponse | null;
  loading: boolean;
}) {
  return (
    <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#1A1A2E]/[0.02]">
              {[
                "Endpoint",
                "Method",
                "Total Requests",
                "Blocked",
                "Block Rate",
                "Avg Duration",
              ].map((h) => (
                <th
                  key={h}
                  className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A2E]/5">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  Loading...
                </td>
              </tr>
            ) : !data?.endpoints?.length ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  No endpoints found
                </td>
              </tr>
            ) : (
              data.endpoints.map((endpoint, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                >
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E] font-medium">
                    {endpoint.endpoint}
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-[11px] font-mono bg-[#1A1A2E]/5 px-2 py-1 rounded text-[#1A1A2E]/70">
                      {endpoint.method}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                    {endpoint.totalRequests.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                    {endpoint.blockedRequests.toLocaleString()}
                  </td>
                  <td className="px-6 py-3">
                    <span
                      className={`text-[13px] font-medium ${
                        endpoint.blockRate > 50
                          ? "text-red-600"
                          : endpoint.blockRate > 20
                            ? "text-[#E8A838]"
                            : "text-green-600"
                      }`}
                    >
                      {endpoint.blockRate}%
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60 font-mono">
                    {Math.round(endpoint.avgDuration)}ms
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Top Blocked Table
function TopBlockedTable({
  data,
  loading,
}: {
  data: GetTopBlockedResponse | null;
  loading: boolean;
}) {
  return (
    <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#1A1A2E]/[0.02]">
              {[
                "IP Address",
                "Endpoint",
                "Block Count",
                "First Block",
                "Last Block",
              ].map((h) => (
                <th
                  key={h}
                  className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A2E]/5">
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  Loading...
                </td>
              </tr>
            ) : !data?.topBlocked?.length ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  No blocked IPs found
                </td>
              </tr>
            ) : (
              data.topBlocked.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                >
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E] font-medium font-mono">
                    {item.ipAddress}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                    {item.endpoint}
                  </td>
                  <td className="px-6 py-3">
                    <span className="text-[13px] font-semibold text-red-600 bg-red-50 px-2 py-1 rounded">
                      {item.blockCount}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60">
                    {formatDateTime(item.firstBlock)}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60">
                    {formatDateTime(item.lastBlock)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Status Codes Table
function StatusCodesTable({
  data,
  loading,
}: {
  data: GetStatusCodesResponse | null;
  loading: boolean;
}) {
  return (
    <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#1A1A2E]/[0.02]">
              {["Status Code", "Count", "Blocked"].map((h) => (
                <th
                  key={h}
                  className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1A1A2E]/5">
            {loading ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  Loading...
                </td>
              </tr>
            ) : !data?.statusCodes?.length ? (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-[#1A1A2E]/40"
                >
                  No status codes found
                </td>
              </tr>
            ) : (
              data.statusCodes.map((item, i) => (
                <tr
                  key={i}
                  className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                >
                  <td className="px-6 py-3">
                    <span
                      className={`text-[13px] font-mono font-semibold px-2 py-1 rounded ${
                        item.statusCode >= 400
                          ? "bg-red-50 text-red-700"
                          : item.statusCode >= 300
                            ? "bg-[#E8A838]/10 text-[#E8A838]"
                            : "bg-green-50 text-green-700"
                      }`}
                    >
                      {item.statusCode}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                    {item.count.toLocaleString()}
                  </td>
                  <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                    {item.blocked.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Patterns Table
function PatternsTable({
  data,
  loading,
}: {
  data: PatternsData | null;
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-8 text-center text-[#1A1A2E]/40">
        Loading...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-8 text-center text-[#1A1A2E]/40">
        No pattern data found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-6">
        <div className="text-[13px] text-[#1A1A2E]/50 mb-2">
          Total Unique IPs
        </div>
        <div className="text-[32px] font-bold text-[#1A1A2E] tracking-[-0.03em]">
          {data.totalUniqueIps.toLocaleString()}
        </div>
      </div>

      {/* Suspicious Patterns */}
      {data.suspiciousPatterns.length > 0 && (
        <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1A1A2E]/10">
            <h3 className="font-semibold text-[#1A1A2E] tracking-[-0.02em]">
              Suspicious IPs
            </h3>
            <p className="text-[13px] text-[#1A1A2E]/50 mt-1">
              IPs with block rate &gt; 50% and &gt; 100 requests
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1A1A2E]/[0.02]">
                  {["IP Address", "Total Requests", "Block Rate", "Reason"].map(
                    (h) => (
                      <th
                        key={h}
                        className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A2E]/5">
                {data.suspiciousPatterns.map((pattern, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                  >
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E] font-medium font-mono">
                      {pattern.ipAddress}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                      {pattern.totalRequests.toLocaleString()}
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-[13px] font-semibold text-red-600">
                        {pattern.blockRate}%
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60">
                      {pattern.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Burst Patterns */}
      {data.burstPatterns.length > 0 && (
        <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1A1A2E]/10">
            <h3 className="font-semibold text-[#1A1A2E] tracking-[-0.02em]">
              Burst Patterns
            </h3>
            <p className="text-[13px] text-[#1A1A2E]/50 mt-1">
              IPs hitting 20+ endpoints with &gt; 20% block rate
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1A1A2E]/[0.02]">
                  {[
                    "IP Address",
                    "Endpoints Hit",
                    "Block Rate",
                    "Time Window",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A2E]/5">
                {data.burstPatterns.map((pattern, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                  >
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E] font-medium font-mono">
                      {pattern.ipAddress}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                      {pattern.endpointsHit}
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-[13px] font-semibold text-[#E8A838]">
                        {pattern.blockRate}%
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60">
                      {pattern.timeWindow}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Top Talkers */}
      {data.topTalkers.length > 0 && (
        <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#1A1A2E]/10">
            <h3 className="font-semibold text-[#1A1A2E] tracking-[-0.02em]">
              Top Talkers
            </h3>
            <p className="text-[13px] text-[#1A1A2E]/50 mt-1">
              Highest volume IP addresses
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#1A1A2E]/[0.02]">
                  {[
                    "IP Address",
                    "Total Requests",
                    "Blocked",
                    "Block Rate",
                    "Avg Duration",
                  ].map((h) => (
                    <th
                      key={h}
                      className="text-[11px] font-medium text-[#1A1A2E]/40 uppercase tracking-wider px-6 py-3"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A1A2E]/5">
                {data.topTalkers.map((talker, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                  >
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E] font-medium font-mono">
                      {talker.ipAddress}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                      {talker.totalRequests}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                      {talker.blockedRequests}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-[13px] font-medium ${
                          talker.blockRate > 50
                            ? "text-red-600"
                            : talker.blockRate > 20
                              ? "text-[#E8A838]"
                              : "text-green-600"
                        }`}
                      >
                        {talker.blockRate}%
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60 font-mono">
                      {Math.round(talker.avgDuration)}ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {data.suspiciousPatterns.length === 0 &&
        data.burstPatterns.length === 0 &&
        data.topTalkers.length === 0 && (
          <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-8 text-center text-[#1A1A2E]/40">
            No suspicious patterns detected
          </div>
        )}
    </div>
  );
}
