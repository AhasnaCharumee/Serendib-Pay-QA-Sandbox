import React, { useState } from "react";
import { Header } from "./components/Header";
import { PaymentForm } from "./components/PaymentForm";
import { TestCardSelector } from "./components/TestCardSelector";
import { ResponseViewer } from "./components/ResponseViewer";
import { HistoryPanel } from "./components/HistoryPanel";
import { StatsPanel } from "./components/StatsPanel";
import { useTestHistory } from "./hooks/useTestHistory";
import { PRODUCT } from "./utils/testCards";
import {
  validateCardNumber,
  validateExpiry,
  validateCVV,
  validateAmount,
  validateName,
} from "./utils/validation";
import { simulatePayment } from "./utils/payment";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
    amount: String(PRODUCT.price),
  });

  const [selectedCard, setSelectedCard] = useState(null);
  const [errors, setErrors] = useState({});
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("form"); // 'form' or 'history'
  const { history, addResult, clearHistory, removeResult, getStats } =
    useTestHistory();

  const handleFormChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    handleFormChange("number", card.number);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!validateName(formData.name).valid) {
      newErrors.name = validateName(formData.name).message;
    }

    if (!validateCardNumber(formData.number).valid) {
      newErrors.number = validateCardNumber(formData.number).message;
    }

    if (!validateExpiry(formData.expiry).valid) {
      newErrors.expiry = validateExpiry(formData.expiry).message;
    }

    if (!validateCVV(formData.cvv).valid) {
      newErrors.cvv = validateCVV(formData.cvv).message;
    }

    if (!validateAmount(formData.amount, PRODUCT.price).valid) {
      newErrors.amount = validateAmount(formData.amount, PRODUCT.price).message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setResponse(null);

    try {
      const paymentResponse = await simulatePayment(formData.number, {
        amount: formData.amount,
        currency: PRODUCT.currency,
      });

      setResponse(paymentResponse);
      addResult(paymentResponse);
    } catch (err) {
      const errorResponse = {
        success: false,
        status: "ERROR",
        code: 500,
        message: err.message || "An unexpected error occurred",
        timestamp: new Date().toISOString(),
      };
      setResponse(errorResponse);
      addResult(errorResponse);
    } finally {
      setIsLoading(false);
    }
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Overview */}
        <StatsPanel stats={stats} />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2">
            <div className="bg-slate-900 rounded-lg border border-slate-700 p-6">
              {/* Tabs */}
              <div className="flex gap-4 mb-6 border-b border-slate-700 pb-4">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`px-4 py-2 font-medium transition ${
                    activeTab === "form"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Payment Form
                </button>
                <button
                  onClick={() => setActiveTab("history")}
                  className={`px-4 py-2 font-medium transition relative ${
                    activeTab === "history"
                      ? "text-blue-400 border-b-2 border-blue-400"
                      : "text-slate-400 hover:text-slate-300"
                  }`}
                >
                  Test History
                  {history.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {history.length}
                    </span>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "form" ? (
                <div className="space-y-6">
                  {/* Test Card Selector */}
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Quick Select Test Card
                    </label>
                    <TestCardSelector
                      onSelect={handleSelectCard}
                      selectedCard={selectedCard}
                    />
                  </div>

                  {/* Divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 border-t border-slate-700"></div>
                    <span className="text-xs text-slate-500">OR ENTER MANUALLY</span>
                    <div className="flex-1 border-t border-slate-700"></div>
                  </div>

                  {/* Payment Form */}
                  <PaymentForm
                    formData={formData}
                    errors={errors}
                    onFormChange={handleFormChange}
                    onSubmit={handleSubmit}
                    isLoading={isLoading}
                    selectedCard={selectedCard}
                  />

                  {/* Product Info */}
                  <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
                    <h4 className="font-medium text-slate-300 mb-2">
                      Test Product
                    </h4>
                    <div className="space-y-1 text-sm text-slate-400">
                      <div className="flex justify-between">
                        <span>Product:</span>
                        <span className="text-slate-200">{PRODUCT.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>SKU:</span>
                        <span className="text-slate-200">{PRODUCT.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price:</span>
                        <span className="text-slate-200">
                          {PRODUCT.currency} {PRODUCT.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <HistoryPanel
                  history={history}
                  onRemove={removeResult}
                  onClear={clearHistory}
                />
              )}
            </div>
          </div>

          {/* Right Column - Response */}
          <div>
            <div className="sticky top-20">
              <h3 className="text-lg font-semibold text-slate-300 mb-4">
                Payment Response
              </h3>
              <ResponseViewer response={response} isLoading={isLoading} />

              {/* Response Details Info */}
              <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700 text-xs text-slate-400">
                <h4 className="font-medium text-slate-300 mb-2">About This Sandbox</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>All payments are simulated client-side</li>
                  <li>No real transactions are processed</li>
                  <li>Use predefined test cards from the selector</li>
                  <li>Test different payment scenarios and responses</li>
                  <li>Perfect for QA testing and validation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
