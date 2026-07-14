import React from "react";
import { CreditCard, Zap } from "lucide-react";

export function Header() {
  return (
    <div className="border-b border-slate-700 bg-slate-900 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                Serendib Pay QA Sandbox
              </h1>
              <p className="text-sm text-slate-400">
                Payment Gateway Testing & Validation Tool
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Zap className="w-4 h-4" />
            <span>v2.0 - Enhanced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
