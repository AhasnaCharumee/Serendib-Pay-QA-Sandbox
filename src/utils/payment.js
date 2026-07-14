import { TEST_CARDS } from "./testCards";

export function classify(cardDigits) {
  const match = TEST_CARDS.find((c) => c.number.replace(/\s/g, "") === cardDigits);
  return match || null;
}

export function simulatePayment(cardNumber, data) {
  const testCard = classify(cardNumber.replace(/\s/g, ""));

  // BUG: Not returning a Promise for consistency
  if (!testCard) {
    return {
      success: false,
      status: "UNKNOWN",
      code: 400,
      message: "Test card not found in sandbox",
      timestamp: new Date().toISOString(),
    };
  }

  // Simulate network delay
  const delay = Math.random() * 1000 + 500;

  return new Promise((resolve) => {
    setTimeout(() => {
      let response;

      if (testCard.code === "200") {
        response = {
          success: true,
          status: "APPROVED",
          code: 200,
          transactionId: generateTransactionId(),
          authCode: generateAuthCode(),
          message: "Payment processed successfully",
          amount: data.amount,
          currency: data.currency,
          cardLast4: cardNumber.slice(-4),
          timestamp: new Date().toISOString(),
          responseTime: delay.toFixed(0) + "ms",
        };
      } else if (testCard.code === "402") {
        response = {
          success: false,
          status: "DECLINED",
          code: 402,
          declineReason: extractDeclineReason(testCard.note),
          message: testCard.scenario,
          amount: data.amount,
          currency: data.currency,
          cardLast4: cardNumber.slice(-4),
          timestamp: new Date().toISOString(),
          responseTime: delay.toFixed(0) + "ms",
        };
      } else if (testCard.code === "504") {
        response = {
          success: false,
          status: "TIMEOUT",
          code: 504,
          message: "Request timeout — gateway did not respond in time",
          timestamp: new Date().toISOString(),
          responseTime: "5000+ms",
        };
      } else {
        response = {
          success: false,
          status: "ERROR",
          code: testCard.code,
          message: testCard.scenario,
          errorCode: "PROCESSING_ERROR",
          timestamp: new Date().toISOString(),
          responseTime: delay.toFixed(0) + "ms",
        };
      }

      resolve(response);
    }, delay);
  });
}

function generateTransactionId() {
  return "TXN-" + Date.now() + "-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function generateAuthCode() {
  return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function extractDeclineReason(note) {
  const match = note.match(/decline reason: (\w+)/i);
  // BUG: Returns undefined if match is null, causing undefined in response
  return match ? match[1] : undefined;
}
