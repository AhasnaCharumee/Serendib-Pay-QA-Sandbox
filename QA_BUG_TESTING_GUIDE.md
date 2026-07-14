# Serendib Pay QA Sandbox - Bug Testing Guide

## Overview
This project contains **intentional bugs** for QA testing. Your task is to find and document them!

---

## 🐛 Known Issues to Test

### 1. Card Expiry Validation Bug
**Location:** `src/utils/validation.js` - `validateExpiry()`
- **Issue:** Off-by-one error in expiry date comparison
- **Test Case:** Try entering current month and year (e.g., 07/26 in July 2026)
- **Expected:** Should reject card as expired
- **Actual:** Accepts it as valid ❌

**How to find it:**
```
Name: Test User
Card: 4242 4242 4242 4242
Expiry: 07/26 (current month)
CVV: 123
Amount: 4500
```

---

### 2. Cardholder Name - No Max Length
**Location:** `src/utils/validation.js` - `validateName()`
- **Issue:** No maximum length validation
- **Test Case:** Enter 500+ character name
- **Expected:** Should reject excessively long names
- **Actual:** Accepts it ❌

**How to find it:**
```
Name: [Copy-paste 500+ A's]
Card: 4242 4242 4242 4242
Expiry: 12/28
CVV: 123
Amount: 4500
```

---

### 3. Amount Field - Multiple Decimals Allowed
**Location:** `src/components/PaymentForm.jsx` - `handleAmountChange()`
- **Issue:** Regex doesn't prevent multiple decimal points
- **Test Case:** Type "10.50.25" in amount field
- **Expected:** Should only allow one decimal point
- **Actual:** Accepts "10.50.25" ❌

**How to find it:**
```
Try typing in Amount field: 10.50.25
```

---

### 4. Expiry Input - Invalid Months/Years
**Location:** `src/components/PaymentForm.jsx` - `handleExpiryChange()`
- **Issue:** No validation before format conversion
- **Test Case:** Enter "13/99" or "00/00"
- **Expected:** Should reject invalid month/year combinations
- **Actual:** Accepts and formats to "13/99" ❌

**How to find it:**
```
Try entering: 13/99 in expiry field
Try entering: 00/00 in expiry field
```

---

### 5. Payment Function - Inconsistent Return Type
**Location:** `src/utils/payment.js` - `simulatePayment()`
- **Issue:** Returns plain object instead of Promise for unknown cards
- **Test Case:** Enter card NOT in test list (e.g., 5555 5555 5555 5555)
- **Expected:** Should return Promise for consistency
- **Actual:** Returns object directly, causing async/await errors ❌

**How to find it:**
```
Check browser console for unhandled promise errors
```

---

### 6. CVV - Allows All Zeros
**Location:** `src/utils/validation.js` - `validateCVV()`
- **Test Case:** Enter "0000" or "000" in CVV
- **Expected:** Should reject as invalid/suspicious
- **Actual:** Accepts it as valid ❌

**How to find it:**
```
CVV: 000
CVV: 0000
CVV: 0123 (leading zeros)
```

---

### 7. Decline Reason - Returns Undefined
**Location:** `src/utils/payment.js` - `extractDeclineReason()`
- **Issue:** Falls back to `undefined` instead of "unknown"
- **Test Case:** Use card with decline scenario not matching pattern
- **Expected:** Should show "unknown" in response
- **Actual:** Shows "undefined" ❌

**How to find it:**
```
1. Use test card: 4000 0000 0000 0002
2. Look at response for declineReason
3. Check if it shows "undefined" instead of descriptive text
```

---

### 8. Amount - No Max Limit or Precision Check
**Location:** `src/utils/validation.js` - `validateAmount()`
- **Issue:** Accepts extremely large amounts and no decimal precision
- **Test Case:** Enter "999999999.9999" or "0.0001"
- **Expected:** Should validate max amount and decimal places
- **Actual:** Accepts any large or small number ❌

**How to find it:**
```
Amount: 999999999.99 (should be rejected)
Amount: 0.01 (should be rejected for being too small)
```

---

### 9. Response Viewer - Undefined declineReason Handling
**Location:** `src/components/ResponseViewer.jsx`
- **Issue:** Doesn't check if declineReason is undefined before displaying
- **Test Case:** Trigger a decline response
- **Expected:** Should display "N/A" or handle gracefully
- **Actual:** Shows "undefined" text ❌

**How to find it:**
```
1. Use any declined test card
2. Check Response panel
3. Look for "undefined" in Decline Reason field
```

---

### 10. History Clear - No Confirmation
**Location:** `src/hooks/useTestHistory.js` - `clearHistory()`
- **Issue:** Clears history immediately without confirmation
- **Test Case:** Click "Clear All" button
- **Expected:** Should ask for confirmation
- **Actual:** Clears without warning ❌

**How to find it:**
```
1. Make several test payments
2. Click "Clear All" in History tab
3. History deletes without confirmation
```

---

## 🎯 QA Test Checklist

### Input Validation Tests
- [ ] Expiry date accepts current month (Bug #1)
- [ ] Very long cardholder names accepted (Bug #2)
- [ ] Multiple decimals in amount (Bug #3)
- [ ] Invalid months/years in expiry (Bug #4)
- [ ] CVV with all zeros accepted (Bug #6)
- [ ] Excessive amount values accepted (Bug #8)

### Functional Tests
- [ ] Test with unknown card (Bug #5 - check console)
- [ ] Declined cards show "undefined" decline reason (Bug #7, #9)
- [ ] History clears without confirmation (Bug #10)

### Edge Case Tests
- [ ] Empty fields
- [ ] Special characters in name
- [ ] Negative amounts (-100)
- [ ] Scientific notation (1e10)
- [ ] Very small amounts (0.001)
- [ ] Card with spaces: "4242 4242 4242 4242"
- [ ] Different card types (Visa, MasterCard, Amex)

---

## 📝 How to Document Bugs

When you find a bug, document it as:

```
**Bug Title:** [Clear title]
**Severity:** Critical / High / Medium / Low
**Steps to Reproduce:**
1. 
2. 
3. 

**Expected Result:** 

**Actual Result:** 

**Evidence:** [Screenshot/console log]
```

---

## 🚀 Features Working Correctly

- Test card selector ✅
- Payment form submission ✅
- Stats panel display ✅
- Transaction history logging ✅
- Tab navigation ✅
- Luhn validation (basic) ✅
- Response display (mostly) ⚠️

---

## 💡 Tips for QA Testers

1. **Browser DevTools** - Check console for errors
2. **Network Tab** - Verify no real API calls
3. **Test All Paths** - Try success and failure scenarios
4. **Boundary Testing** - Min/max values
5. **Cross-browser** - Test on Chrome, Firefox, Safari
6. **Mobile** - Test responsive design

---

**Happy Bug Hunting! 🐛🔍**
