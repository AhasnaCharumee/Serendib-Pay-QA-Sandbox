export function luhnValid(num) {
  const digits = num.replace(/\s/g, "");
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0,
    alt = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = parseInt(digits[i], 10);
    if (alt) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    alt = !alt;
  }
  return sum % 10 === 0;
}

export function validateCardNumber(number) {
  const cleaned = number.replace(/\s/g, "");
  if (!luhnValid(number)) return { valid: false, message: "Invalid Luhn checksum" };
  if (cleaned.length < 13 || cleaned.length > 19) {
    return { valid: false, message: "Card number must be 13-19 digits" };
  }
  return { valid: true };
}

export function validateExpiry(expiry) {
  const [month, year] = expiry.split("/");
  if (!month || !year) return { valid: false, message: "Invalid format (MM/YY)" };
  const m = parseInt(month, 10);
  const y = parseInt(year, 10);
  if (m < 1 || m > 12) return { valid: false, message: "Month must be 01-12" };
  const currentYear = new Date().getFullYear() % 100;
  const currentMonth = new Date().getMonth() + 1;
  // BUG: Off-by-one error - uses < instead of <=
  if (y < currentYear || (y === currentYear && m < currentMonth)) {
    return { valid: false, message: "Card is expired" };
  }
  return { valid: true };
}

export function validateCVV(cvv) {
  // BUG: Allows leading zeros (e.g., "0123") and doesn't validate actual format strictly
  if (!/^\d{3,4}$/.test(cvv)) {
    return { valid: false, message: "CVV must be 3-4 digits" };
  }
  // BUG: No check for all zeros ("0000") or sequential patterns
  return { valid: true };
}

export function validateAmount(amount, minPrice = 0) {
  const num = parseFloat(amount);
  // BUG: NaN check doesn't catch all invalid formats (e.g., ".-1" passes as -1)
  if (isNaN(num) || num <= 0) {
    return { valid: false, message: "Amount must be greater than 0" };
  }
  if (num < minPrice) {
    return { valid: false, message: `Minimum amount is ${minPrice}` };
  }
  // BUG: No check for max limits or decimal precision (e.g., 99999999.99)
  return { valid: true };
}

export function validateName(name) {
  // BUG: Doesn't check for special characters or injection patterns
  if (!name || name.trim().length < 2) {
    return { valid: false, message: "Name must be at least 2 characters" };
  }
  // BUG: No max length check - allows extremely long strings (>1000 chars)
  return { valid: true };
}
