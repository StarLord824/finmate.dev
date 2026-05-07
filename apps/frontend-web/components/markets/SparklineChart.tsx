"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  Tooltip,
  YAxis,
} from "recharts";
import type { HistoryPoint } from "@/lib/types";
import type { ReactElement } from "react";

interface SparklineChartProps {
  points: HistoryPoint[];
  isPositive: boolean;
  height?: number;
}

export function SparklineChart({
  points,
  isPositive,
  height = 40,
}: SparklineChartProps): ReactElement {
  const color = isPositive ? "#10b981" : "#ef4444";

  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={points} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
        <YAxis domain={["auto", "auto"]} hide />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null;
            const val = payload[0]?.value as number;
            return (
              <div className="bg-white border border-[#c8ddf5] rounded-lg px-2 py-1 text-xs font-mono text-[#003366] shadow-md">
                {val?.toFixed(2)}
              </div>
            );
          }}
        />
        <Line
          type="monotone"
          dataKey="c"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
