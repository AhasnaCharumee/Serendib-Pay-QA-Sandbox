import { useState, useCallback } from "react";

export function useTestHistory() {
  const [history, setHistory] = useState([]);

  const addResult = useCallback((result) => {
    setHistory((prev) => [
      {
        ...result,
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  }, []);

  const clearHistory = useCallback(() => {
    // BUG: Doesn't validate that history is actually cleared properly
    // BUG: No confirmation or undo mechanism
    setHistory([]);
  }, []);

  const removeResult = useCallback((id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const getStats = useCallback(() => {
    const total = history.length;
    const successful = history.filter((h) => h.success).length;
    const failed = total - successful;
    return {
      total,
      successful,
      failed,
      successRate: total > 0 ? ((successful / total) * 100).toFixed(1) : 0,
    };
  }, [history]);

  return {
    history,
    addResult,
    clearHistory,
    removeResult,
    getStats,
  };
}
