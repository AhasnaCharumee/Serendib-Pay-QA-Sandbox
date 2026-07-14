import React from "react";
import { CreditCard, Info } from "lucide-react";
import { TEST_CARDS } from "../utils/testCards";

export function TestCardSelector({ onSelect, selectedCard }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-3 bg-slate-700 hover:bg-slate-600 rounded-lg border border-slate-600 text-left text-slate-200 flex items-center justify-between transition"
      >
        <span className="flex items-center gap-2">
          <CreditCard className="w-4 h-4" />
          {selectedCard
            ? selectedCard.scenario
            : "Select a test card..."}
        </span>
        <span className={`text-xs text-slate-400 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-600 rounded-lg shadow-lg z-10 max-h-80 overflow-y-auto">
          {TEST_CARDS.map((card) => (
            <button
              key={card.number}
              onClick={() => {
                onSelect(card);
                setOpen(false);
              }}
              className="w-full p-3 text-left hover:bg-slate-700 border-b border-slate-700 last:border-b-0 transition"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="font-medium text-slate-200">
                    {card.scenario}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {card.number}
                  </div>
                  <div className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    {card.note}
                  </div>
                </div>
                <span
                  className={`text-xs font-mono px-2 py-1 rounded ml-2 flex-shrink-0 ${
                    card.code === "200"
                      ? "bg-emerald-900 text-emerald-300"
                      : card.code === "402"
                        ? "bg-red-900 text-red-300"
                        : "bg-amber-900 text-amber-300"
                  }`}
                >
                  {card.code}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
