"use client";
import { useState } from "react";
import { useApi } from "@/lib";
import {
  Activity,
  ShieldAlert,
  Percent,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import type { OverviewData, GetEventsResponse } from "./analytics/types";

function toDateString(ts: number) {
  return new Date(ts).toISOString().slice(0, 10);
}

export default function OverviewPage() {
  const now = Date.now();
  const [dateRange, setDateRange] = useState({
    startDate: toDateString(now - 7 * 86400000),
    endDate: toDateString(now),
  });

  const { data: overview, loading: overviewLoading } = useApi<OverviewData>(
    "/analytics/overview",
    dateRange,
  );

  const { data: events, loading: eventsLoading } = useApi<GetEventsResponse>(
    "/analytics/events",
    { limit: 10 },
  );

  console.log(events);

  const metrics = [
    {
      label: "Total Requests",
      value: overview?.totalRequests || "0",
      icon: Activity,
      color: "text-blue-600",
      bg: "bg-blue-600/10",
    },
    {
      label: "Blocked Requests",
      value: overview?.blockedRequests || "0",
      icon: ShieldAlert,
      color: "text-red-600",
      bg: "bg-red-600/10",
    },
    {
      label: "Block Rate",
      value: `${overview?.blockRate || 0}%`,
      icon: Percent,
      color: "text-[#E8A838]",
      bg: "bg-[#E8A838]/10",
    },
    {
      label: "Avg Response Time",
      value: `${overview?.avgResponseTimeMs || 0}ms`,
      icon: Clock,
      color: "text-purple-600",
      bg: "bg-purple-600/10",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-[24px] font-bold text-[#1A1A2E] tracking-[-0.03em]">
          Overview
        </h1>
        <div className="flex items-center gap-2 bg-white border border-[#1A1A2E]/10 rounded-lg p-1">
          <input
            type="date"
            className="text-[13px] bg-transparent outline-none px-2 py-1.5 text-[#1A1A2E]/70"
            value={dateRange.startDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, startDate: e.target.value })
            }
          />
          <span className="text-[#1A1A2E]/30">to</span>
          <input
            type="date"
            className="text-[13px] bg-transparent outline-none px-2 py-1.5 text-[#1A1A2E]/70"
            value={dateRange.endDate}
            onChange={(e) =>
              setDateRange({ ...dateRange, endDate: e.target.value })
            }
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div
            key={m.label}
            className="bg-white border border-[#1A1A2E]/10 rounded-xl p-5 hover:border-[#1A1A2E]/20 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-[13px] text-[#1A1A2E]/50 tracking-[-0.01em]">
                {m.label}
              </span>
              <div
                className={`w-8 h-8 rounded-lg ${m.bg} flex items-center justify-center`}
              >
                <m.icon className={`w-4 h-4 ${m.color}`} strokeWidth={2} />
              </div>
            </div>
            <div className="text-[28px] font-bold text-[#1A1A2E] tracking-[-0.03em] leading-none">
              {overviewLoading ? "..." : m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Events Table */}
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-[#1A1A2E]/10 flex items-center justify-between">
          <h2 className="font-semibold text-[#1A1A2E] tracking-[-0.02em]">
            Recent Events
          </h2>
          <a
            href="/dashboard/analytics"
            className="text-[13px] text-[#1A1A2E]/50 hover:text-[#1A1A2E] flex items-center gap-1 transition-colors"
          >
            View all <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <table className="w-full text-left">
            <thead className="sticky top-0 bg-white">
              <tr className="bg-[#1A1A2E]/[0.02]">
                {[
                  "Time",
                  "Identifier",
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
              {eventsLoading ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-[#1A1A2E]/40"
                  >
                    Loading...
                  </td>
                </tr>
              ) : events?.events?.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-[#1A1A2E]/40"
                  >
                    No events found
                  </td>
                </tr>
              ) : (
                (events?.events || []).map((row, i) => (
                  <tr
                    key={i}
                    className="hover:bg-[#1A1A2E]/[0.01] transition-colors"
                  >
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60 font-mono">
                      {new Date(row.time).toLocaleString()}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E] font-medium">
                      {row.ipAddress}
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                      {row.endpoint}
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-[11px] font-mono bg-[#1A1A2E]/5 px-2 py-1 rounded text-[#1A1A2E]/70">
                        {row.method}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/70">
                      {row.statusCode}
                    </td>
                    <td className="px-6 py-3">
                      <span
                        className={`text-[11px] font-medium px-2 py-1 rounded-full ${row.isBlocked ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}
                      >
                        {row.isBlocked ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[13px] text-[#1A1A2E]/60 font-mono">
                      {row.requestDurationMs}ms
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
