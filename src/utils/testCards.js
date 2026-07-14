export const TEST_CARDS = [
  {
    number: "4242 4242 4242 4242",
    scenario: "Success",
    code: "200",
    note: "Happy path — payment approved",
    category: "SUCCESS",
  },
  {
    number: "4000 0000 0000 0002",
    scenario: "Card declined",
    code: "402",
    note: "Generic decline",
    category: "DECLINE",
  },
  {
    number: "4000 0000 0000 9995",
    scenario: "Insufficient funds",
    code: "402",
    note: "Decline reason: insufficient_funds",
    category: "DECLINE",
  },
  {
    number: "4000 0000 0000 0069",
    scenario: "Expired card",
    code: "402",
    note: "Decline reason: expired_card",
    category: "DECLINE",
  },
  {
    number: "4000 0000 0000 0127",
    scenario: "Incorrect CVC",
    code: "402",
    note: "Decline reason: incorrect_cvc",
    category: "DECLINE",
  },
  {
    number: "4000 0000 0000 0119",
    scenario: "Processing error",
    code: "500",
    note: "Gateway-side failure",
    category: "ERROR",
  },
  {
    number: "4000 0000 0000 3220",
    scenario: "Requires authentication",
    code: "402",
    note: "Simulated 3-D Secure step-up",
    category: "3DS",
  },
  {
    number: "4000 0000 0000 0044",
    scenario: "Network timeout",
    code: "504",
    note: "Simulated slow gateway response",
    category: "TIMEOUT",
  },
  {
    number: "5555 5555 5555 4444",
    scenario: "MasterCard (Success)",
    code: "200",
    note: "Valid Mastercard transaction",
    category: "SUCCESS",
  },
  {
    number: "3782 822463 10005",
    scenario: "American Express (Success)",
    code: "200",
    note: "Valid Amex transaction",
    category: "SUCCESS",
  },
];

export const PRODUCT = {
  name: "Ceylon Cinnamon Gift Box",
  price: 4500,
  currency: "LKR",
  sku: "CEYLON-CINNAMON-001",
};
