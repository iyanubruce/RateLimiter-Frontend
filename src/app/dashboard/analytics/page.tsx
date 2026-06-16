"use client";
import { useState } from "react";
import { useApi } from "../layout";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const tabs = [
  "Events",
  "Endpoints",
  "Top Blocked",
  "Status Codes",
  "IP Addresses",
  "Patterns",
] as const;
type Tab = (typeof tabs)[number];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("Events");
  const [filters, setFilters] = useState({
    startDate: "2023-10-01",
    endDate: "2023-10-02",
    interval: "1h",
  });

  const { data: chartData } = useApi<any>("/analytics/timeseries", filters);

  // Mock data for chart visualization if API is empty
  const mockChartData = chartData?.data || [
    { time: "00:00", total: 1200, blocked: 45 },
    { time: "04:00", total: 1800, blocked: 120 },
    { time: "08:00", total: 3400, blocked: 310 },
    { time: "12:00", total: 4100, blocked: 450 },
    { time: "16:00", total: 3800, blocked: 290 },
    { time: "20:00", total: 2100, blocked: 80 },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-[24px] font-bold text-[#1A1A2E] tracking-[-0.03em]">
        Analytics
      </h1>

      {/* Filters */}
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-4 flex flex-wrap items-center gap-3">
        <input
          type="date"
          className="text-[13px] bg-[#F7F5F0] border border-[#1A1A2E]/10 rounded px-3 py-1.5 outline-none"
          value={filters.startDate}
          onChange={(e) =>
            setFilters({ ...filters, startDate: e.target.value })
          }
        />
        <input
          type="date"
          className="text-[13px] bg-[#F7F5F0] border border-[#1A1A2E]/10 rounded px-3 py-1.5 outline-none"
          value={filters.endDate}
          onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
        />
        <select
          className="text-[13px] bg-[#F7F5F0] border border-[#1A1A2E]/10 rounded px-3 py-1.5 outline-none"
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
          className="text-[13px] bg-[#F7F5F0] border border-[#1A1A2E]/10 rounded px-3 py-1.5 outline-none w-48"
        />
      </div>

      {/* Chart */}
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-6">
        <h3 className="text-[14px] font-semibold text-[#1A1A2E] mb-6">
          Traffic Overview
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={mockChartData}>
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
                dataKey="total"
                stackId="1"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.15}
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="blocked"
                stackId="1"
                stroke="#ef4444"
                fill="#ef4444"
                fillOpacity={0.15}
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
            className={`pb-3 text-[14px] font-medium tracking-[-0.01em] transition-colors border-b-2 whitespace-nowrap ${activeTab === tab ? "border-[#1A1A2E] text-[#1A1A2E]" : "border-transparent text-[#1A1A2E]/40 hover:text-[#1A1A2E]/70"}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content Placeholder */}
      <div className="bg-white border border-[#1A1A2E]/10 rounded-xl p-8 text-center">
        <p className="text-[14px] text-[#1A1A2E]/40">
          Displaying{" "}
          <span className="font-medium text-[#1A1A2E]">{activeTab}</span> data.
          (Implement specific table logic per tab using the{" "}
          <code className="bg-[#1A1A2E]/5 px-1 py-0.5 rounded text-[12px]">
            useApi
          </code>{" "}
          hook with endpoints like{" "}
          <code className="bg-[#1A1A2E]/5 px-1 py-0.5 rounded text-[12px]">
            /analytics/{activeTab.toLowerCase().replace(" ", "-")}
          </code>
          )
        </p>
      </div>
    </div>
  );
}
