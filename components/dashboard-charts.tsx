"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { monthlySupport } from "@/lib/analytics-data";

export function DashboardTrendChart() {
  return (
    <div className="chart-box compact-chart">
      <ResponsiveContainer width="100%" height={225}>
        <AreaChart data={monthlySupport} margin={{ top: 10, right: 8, left: -25, bottom: 0 }}>
          <defs><linearGradient id="supportGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6d5bd0" stopOpacity={0.3}/><stop offset="95%" stopColor="#6d5bd0" stopOpacity={0}/></linearGradient></defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#eceaf4" vertical={false} />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#819087", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#819087", fontSize: 12 }} />
          <Tooltip contentStyle={{ border: "none", borderRadius: 12, boxShadow: "0 10px 30px rgba(30,42,36,.12)" }} />
          <Area type="monotone" dataKey="tinggi" name="Dukungan segera" stroke="#6d5bd0" strokeWidth={3} fill="url(#supportGradient)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
