import React from "react";
import { Trash2 } from "lucide-react";

const statusColors = {
  APPROVED: "bg-emerald-900 text-emerald-300",
  DECLINED: "bg-red-900 text-red-300",
  ERROR: "bg-amber-900 text-amber-300",
  TIMEOUT: "bg-blue-900 text-blue-300",
};

export function HistoryPanel({ history, onRemove, onClear }) {
  if (history.length === 0) {
    return (
      <div className="text-center text-slate-400 py-8">
        No test results yet.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-slate-200">Test History ({history.length})</h3>
        <button
          onClick={onClear}
          className="text-xs px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-slate-300 transition"
        >
          Clear All
        </button>
      </div>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        {history.map((item) => (
          <div
            key={item.id}
            className="p-3 bg-slate-800 rounded border border-slate-700 flex items-center justify-between group hover:border-slate-600 transition"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium ${
                    statusColors[item.status] || "bg-slate-700 text-slate-300"
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-xs text-slate-400">{item.timestamp}</span>
              </div>
              <p className="text-sm text-slate-300 mt-1 truncate">
                {item.message}
              </p>
              {item.transactionId && (
                <p className="text-xs text-slate-500 truncate">
                  {item.transactionId}
                </p>
              )}
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="ml-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-slate-700 rounded transition"
            >
              <Trash2 className="w-4 h-4 text-slate-400 hover:text-red-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
