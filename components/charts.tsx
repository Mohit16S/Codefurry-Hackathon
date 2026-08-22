"use client";

import React, { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from "recharts";
import { radarData, driftedRadarData, timeRangeCharts } from "@/lib/data";

export function DriftChart({
  data,
  danger = false,
  showRanges = true,
}: {
  data: { time: string; similarity: number; latency?: number; safety?: number }[];
  danger?: boolean;
  showRanges?: boolean;
}) {
  const [activeRange, setActiveRange] = useState<"1H" | "6H" | "24H" | "7D" | "30D">("24H");

  const chartData = timeRangeCharts[activeRange] || data;

  return (
    <div className="drift-chart-wrapper">
      {showRanges && (
        <div className="chart-toolbar">
          <div className="time-range-picker">
            {(["1H", "6H", "24H", "7D", "30D"] as const).map((r) => (
              <button
                key={r}
                className={`range-btn ${activeRange === r ? "active" : ""}`}
                onClick={() => setActiveRange(r)}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="chart-legend-inline">
            <span>
              <i className="legend-blue" /> Production Behavior
            </span>
            <span>
              <i className="legend-amber" /> Certified Baseline (&gt;95%)
            </span>
          </div>
        </div>
      )}

      <div className="chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="driftFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={danger ? "#FF2D2D" : "#2196FF"} stopOpacity={0.4} />
                <stop offset="100%" stopColor={danger ? "#FF2D2D" : "#2196FF"} stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#1e2536" vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="time" tick={{ fill: "#737c90", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[50, 100]} tick={{ fill: "#737c90", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "#0e121a",
                border: "1px solid #283144",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "12px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }}
              formatter={(val: any) => [`${val}%`, "Similarity"]}
            />
            <ReferenceLine
              y={95}
              stroke="#DC2626"
              strokeDasharray="5 5"
              label={{ value: "CERTIFIED THRESHOLD (95%)", fill: "#FF5757", fontSize: 9, position: "top" }}
            />
            <Area
              type="monotone"
              dataKey="similarity"
              stroke={danger ? "#FF2D2D" : "#2196FF"}
              strokeWidth={2.5}
              fill="url(#driftFill)"
              animationDuration={800}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export function ModelRadar({
  current = false,
  dual = false,
}: {
  current?: boolean;
  dual?: boolean;
}) {
  if (dual) {
    const combinedData = radarData.map((d, i) => ({
      metric: d.metric,
      certified: d.value,
      production: [68, 58, 48, 65, 59, 62, 91, 55][i],
    }));

    return (
      <div className="radar">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={combinedData}>
            <PolarGrid stroke="#262e40" />
            <PolarAngleAxis dataKey="metric" tick={{ fill: "#8992a6", fontSize: 10 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#566175", fontSize: 8 }} />
            <Radar name="Certified Baseline" dataKey="certified" stroke="#2196FF" fill="#1677FF" fillOpacity={0.25} />
            <Radar name="Current Production" dataKey="production" stroke="#FF2D2D" fill="#FF2D2D" fillOpacity={0.3} />
            <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  const data = current ? driftedRadarData : radarData;

  return (
    <div className="radar">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={data}>
          <PolarGrid stroke="#262e40" />
          <PolarAngleAxis dataKey="metric" tick={{ fill: "#8992a6", fontSize: 10 }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "#566175", fontSize: 8 }} />
          <Radar
            dataKey="value"
            stroke={current ? "#FF2D2D" : "#2196FF"}
            fill={current ? "#FF2D2D" : "#1677FF"}
            fillOpacity={0.28}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
