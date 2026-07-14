import React from "react";
import { BarChart3 } from "lucide-react";

export function StatsPanel({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <BarChart3 className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 uppercase">Total Tests</span>
        </div>
        <span className="text-2xl font-bold text-slate-200">{stats.total}</span>
      </div>

      <div className="p-4 bg-emerald-900 rounded-lg border border-emerald-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-4 rounded-full bg-emerald-500"></span>
          <span className="text-xs text-emerald-300 uppercase">Successful</span>
        </div>
        <span className="text-2xl font-bold text-emerald-300">
          {stats.successful}
        </span>
      </div>

      <div className="p-4 bg-red-900 rounded-lg border border-red-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-4 rounded-full bg-red-500"></span>
          <span className="text-xs text-red-300 uppercase">Failed</span>
        </div>
        <span className="text-2xl font-bold text-red-300">{stats.failed}</span>
      </div>

      <div className="p-4 bg-blue-900 rounded-lg border border-blue-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-4 h-4 rounded-full bg-blue-500"></span>
          <span className="text-xs text-blue-300 uppercase">Success Rate</span>
        </div>
        <span className="text-2xl font-bold text-blue-300">
          {stats.successRate}%
        </span>
      </div>
    </div>
  );
}
