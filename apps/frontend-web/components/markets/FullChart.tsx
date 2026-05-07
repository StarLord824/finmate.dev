"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { useId } from "react";
import type { HistoryPoint } from "@/lib/types";
import type { ReactElement } from "react";

interface FullChartProps {
  points: HistoryPoint[];
  isPositive: boolean;
  range: string;
}

function formatTick(t: number, range: string): string {
  if (range === "1d") return format(new Date(t), "HH:mm");
  if (range === "1w") return format(new Date(t), "EEE HH:mm");
  return format(new Date(t), "MMM d");
}

function tickCount(range: string): number {
  if (range === "1d") return 6;
  if (range === "1w") return 5;
  return 8;
}

export function FullChart({ points, isPositive, range }: FullChartProps): ReactElement {
  const uid = useId();
  const color = isPositive ? "#10b981" : "#ef4444";
  const fillId = `fill-${isPositive ? "green" : "red"}-${uid}`;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <AreaChart data={points} margin={{ top: 8, right: 16, bottom: 0, left: 8 }}>
        <defs>
          <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.15} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e8f2ff" />
        <XAxis
          dataKey="t"
          tickFormatter={(v) => formatTick(v as number, range)}
          tickCount={tickCount(range)}
          tick={{ fontSize: 11, fill: "#4a6890" }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 11, fill: "#4a6890" }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v: number) =>
            v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toFixed(2)
          }
          width={60}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const point = payload[0]?.payload as HistoryPoint;
            return (
              <div className="bg-white border border-[#c8ddf5] rounded-xl px-3 py-2 shadow-lg text-xs">
                <p className="text-[#4a6890] mb-0.5">
                  {format(new Date(point.t), "MMM d, yyyy HH:mm")}
                </p>
                <p className="font-bold text-[#003366] font-mono text-sm">
                  {(point.c).toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            );
          }}
        />
        <Area
          type="monotone"
          dataKey="c"
          stroke={color}
          strokeWidth={2}
          fill={`url(#${fillId})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
