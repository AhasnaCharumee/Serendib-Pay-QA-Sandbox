import React from "react";
import {
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
} from "lucide-react";

const iconMap = {
  APPROVED: <CheckCircle2 className="w-4 h-4" />,
  DECLINED: <XCircle className="w-4 h-4" />,
  ERROR: <AlertTriangle className="w-4 h-4" />,
  TIMEOUT: <Clock className="w-4 h-4" />,
  UNKNOWN: <ShieldAlert className="w-4 h-4" />,
};

const statusColors = {
  APPROVED: {
    bg: "bg-emerald-900",
    text: "text-emerald-300",
    border: "border-emerald-700",
  },
  DECLINED: {
    bg: "bg-red-900",
    text: "text-red-300",
    border: "border-red-700",
  },
  ERROR: {
    bg: "bg-amber-900",
    text: "text-amber-300",
    border: "border-amber-700",
  },
  TIMEOUT: {
    bg: "bg-blue-900",
    text: "text-blue-300",
    border: "border-blue-700",
  },
  UNKNOWN: {
    bg: "bg-purple-900",
    text: "text-purple-300",
    border: "border-purple-700",
  },
};

export function ResponseViewer({ response, isLoading }) {
  if (!response) {
    return (
      <div className="p-6 bg-slate-800 rounded-lg border border-slate-700 text-center text-slate-400">
        No response yet. Submit a test payment to see results.
      </div>
    );
  }

  // BUG: Doesn't handle cases where response.declineReason is undefined
  if (isLoading) {
    return (
      <div className="p-6 bg-slate-800 rounded-lg border border-slate-700">
        <div className="flex items-center gap-3">
          <div className="animate-spin">
            <Clock className="w-5 h-5 text-blue-400" />
          </div>
          <span className="text-slate-300">Processing payment...</span>
        </div>
      </div>
    );
  }

  const status = response.status || "UNKNOWN";
  const colors = statusColors[status] || statusColors.UNKNOWN;
  const icon = iconMap[status] || iconMap.UNKNOWN;

  return (
    <div className={`p-6 rounded-lg border ${colors.bg} ${colors.border}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={colors.text}>{icon}</span>
        <h3 className={`font-semibold ${colors.text}`}>{status}</h3>
        <span className="ml-auto text-xs text-slate-400">{response.code}</span>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Message:</span>
          <span className="text-slate-300">{response.message}</span>
        </div>

        {response.transactionId && (
          <div className="flex justify-between">
            <span className="text-slate-400">Transaction ID:</span>
            <code className="text-slate-300 text-xs">{response.transactionId}</code>
          </div>
        )}

        {response.authCode && (
          <div className="flex justify-between">
            <span className="text-slate-400">Auth Code:</span>
            <code className="text-slate-300">{response.authCode}</code>
          </div>
        )}

        {response.declineReason && (
          <div className="flex justify-between">
            <span className="text-slate-400">Decline Reason:</span>
            <span className="text-slate-300">{response.declineReason}</span>
          </div>
        )}

        {response.cardLast4 && (
          <div className="flex justify-between">
            <span className="text-slate-400">Card:</span>
            <span className="text-slate-300">•••• {response.cardLast4}</span>
          </div>
        )}

        {response.amount && (
          <div className="flex justify-between">
            <span className="text-slate-400">Amount:</span>
            <span className="text-slate-300">
              {response.currency} {response.amount}
            </span>
          </div>
        )}

        {response.responseTime && (
          <div className="flex justify-between">
            <span className="text-slate-400">Response Time:</span>
            <span className="text-slate-300">{response.responseTime}</span>
          </div>
        )}

        {response.timestamp && (
          <div className="flex justify-between">
            <span className="text-slate-400">Timestamp:</span>
            <span className="text-slate-300 text-xs">{response.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
}
