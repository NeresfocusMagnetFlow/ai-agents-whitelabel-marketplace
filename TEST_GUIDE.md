# 🧪 Testing Guide - Stripe Integration

## Automated Tests

### Run All Tests
```bash
cd backend
npm test
```

---

## Manual Testing (Recommended)

### 1. Start the Application
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 2. Access the App
Open browser: **http://localhost:3000**

### 3. Create Test Account
- Click "Register"
- Email: `test@example.com`
- Password: `password123`
- Name: `Test User`

### 4. Browse Agents
- See 13 pre-seeded agents
- Categories: Produtividade, Marketing, Vendas, Suporte, Análise
- Prices: R$ 89 to R$ 449

### 5. Test Purchase Flow

#### A. One-Time Purchase
1. Click any agent (e.g., "Email Assistant Pro")
2. Click "Buy Now" (R$ 149.00)
3. Redirects to Stripe Checkout
4. Use test card: **4242 4242 4242 4242**
5. Expiry: Any future date (e.g., 12/25)
6. CVC: Any 3 digits (e.g., 123)
7. Name: Any name
8. Click "Pay"
9. Redirects to success page
10. Check dashboard for license

---

## Stripe Test Cards

### ✅ Successful Payment
```
Card: 4242 4242 4242 4242
Exp: 12/25
CVC: 123
ZIP: 12345
```

### ❌ Card Declined
```
Card: 4000 0000 0000 0002
Result: Generic decline
```

---

## Expected Results

### After Successful Payment:
1. ✅ Redirect to `/payment/success`
2. ✅ Green checkmark displayed
3. ✅ License key generated (format: XXXX-XXXX-XXXX-XXXX)
4. ✅ Email sent with license ()
5. ✅ Transaction created in database
6. ✅ License appears in dashboard