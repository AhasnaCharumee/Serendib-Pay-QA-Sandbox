import React from "react";
import { AlertCircle } from "lucide-react";

export function PaymentForm({
  formData,
  errors,
  onFormChange,
  onSubmit,
  isLoading,
  selectedCard,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFormChange(name, value);
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, "");
    if (value.length > 19) value = value.slice(0, 19);
    value = value.replace(/(\d{4})/g, "$1 ").trim();
    onFormChange("number", value);
  };

  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    // BUG: Allows invalid months (13, 00) and years (00, 99) without validation
    if (value.length >= 2) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }
    onFormChange("expiry", value);
  };

  const handleCVVChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 4);
    onFormChange("cvv", value);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    // BUG: Allows multiple decimal points (e.g., "10.50.25")
    // BUG: Doesn't prevent leading zeros or scientific notation
    onFormChange("amount", value);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {/* Cardholder Name */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Cardholder Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="John Doe"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
        {errors.name && (
          <div className="flex items-center gap-2 mt-1 text-red-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            {errors.name}
          </div>
        )}
      </div>

      {/* Card Number */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Card Number
          {selectedCard && (
            <span className="ml-2 text-xs text-slate-400">
              ({selectedCard.scenario})
            </span>
          )}
        </label>
        <input
          type="text"
          name="number"
          value={formData.number}
          onChange={handleCardNumberChange}
          placeholder="4242 4242 4242 4242"
          disabled={isLoading}
          maxLength="19"
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 font-mono"
        />
        {errors.number && (
          <div className="flex items-center gap-2 mt-1 text-red-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            {errors.number}
          </div>
        )}
      </div>

      {/* Expiry and CVV */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            Expiry (MM/YY)
          </label>
          <input
            type="text"
            name="expiry"
            value={formData.expiry}
            onChange={handleExpiryChange}
            placeholder="12/25"
            disabled={isLoading}
            maxLength="5"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 font-mono"
          />
          {errors.expiry && (
            <div className="flex items-center gap-2 mt-1 text-red-400 text-xs">
              <AlertCircle className="w-3 h-3" />
              {errors.expiry}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">
            CVV
          </label>
          <input
            type="text"
            name="cvv"
            value={formData.cvv}
            onChange={handleCVVChange}
            placeholder="123"
            disabled={isLoading}
            maxLength="4"
            className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 font-mono"
          />
          {errors.cvv && (
            <div className="flex items-center gap-2 mt-1 text-red-400 text-xs">
              <AlertCircle className="w-3 h-3" />
              {errors.cvv}
            </div>
          )}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Amount (LKR)
        </label>
        <input
          type="text"
          name="amount"
          value={formData.amount}
          onChange={handleAmountChange}
          placeholder="4500"
          disabled={isLoading}
          className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:border-blue-500 disabled:opacity-50 font-mono"
        />
        {errors.amount && (
          <div className="flex items-center gap-2 mt-1 text-red-400 text-xs">
            <AlertCircle className="w-3 h-3" />
            {errors.amount}
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processing..." : "Process Payment"}
      </button>
    </form>
  );
}
