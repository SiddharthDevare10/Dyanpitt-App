// Discount codes and promotional offers
export const discountCodes = {
  WELCOME10: {
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    description: '10% off for new members',
    minAmount: 500,
    maxDiscount: 500,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 1,
    applicablePlans: ['basic', 'premium', 'elite']
  },
  STUDENT20: {
    code: 'STUDENT20',
    type: 'percentage',
    value: 20,
    description: '20% student discount',
    minAmount: 1000,
    maxDiscount: 1000,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 1,
    applicablePlans: ['basic', 'premium']
  },
  FAMILY15: {
    code: 'FAMILY15',
    type: 'percentage',
    value: 15,
    description: '15% family plan discount',
    minAmount: 2000,
    maxDiscount: 1500,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 1,
    applicablePlans: ['premium', 'elite']
  },
  SAVE500: {
    code: 'SAVE500',
    type: 'fixed',
    value: 500,
    description: 'Flat ₹500 off',
    minAmount: 2000,
    maxDiscount: 500,
    validFrom: '2024-01-01',
    validUntil: '2024-12-31',
    usageLimit: 1,
    applicablePlans: ['basic', 'premium', 'elite']
  }
};

// Seasonal offers
export const seasonalOffers = {
  NEWYEAR2024: {
    code: 'NEWYEAR2024',
    type: 'percentage',
    value: 25,
    description: 'New Year Special - 25% off',
    minAmount: 1500,
    maxDiscount: 2000,
    validFrom: '2024-01-01',
    validUntil: '2024-01-31',
    usageLimit: 1,
    applicablePlans: ['premium', 'elite']
  },
  SUMMER2024: {
    code: 'SUMMER2024',
    type: 'percentage',
    value: 30,
    description: 'Summer Body Special - 30% off',
    minAmount: 2000,
    maxDiscount: 2500,
    validFrom: '2024-04-01',
    validUntil: '2024-06-30',
    usageLimit: 1,
    applicablePlans: ['elite']
  }
};

// Validate discount code
export const validateDiscountCode = (code, planId, amount, userId = null) => {
  const discount = discountCodes[code] || seasonalOffers[code];
  
  if (!discount) {
    return { valid: false, error: 'Invalid discount code' };
  }
  
  // Check if plan is applicable
  if (!discount.applicablePlans.includes(planId)) {
    return { valid: false, error: 'Discount not applicable for this plan' };
  }
  
  // Check minimum amount
  if (amount < discount.minAmount) {
    return { 
      valid: false, 
      error: `Minimum amount of ₹${discount.minAmount} required` 
    };
  }
  
  // Check validity dates
  const now = new Date();
  const validFrom = new Date(discount.validFrom);
  const validUntil = new Date(discount.validUntil);
  
  if (now < validFrom || now > validUntil) {
    return { valid: false, error: 'Discount code has expired' };
  }
  
  return { valid: true, discount };
};

// Calculate discount amount
export const calculateDiscount = (discount, amount) => {
  let discountAmount = 0;
  
  if (discount.type === 'percentage') {
    discountAmount = Math.round((amount * discount.value) / 100);
  } else if (discount.type === 'fixed') {
    discountAmount = discount.value;
  }
  
  // Apply maximum discount limit
  if (discount.maxDiscount && discountAmount > discount.maxDiscount) {
    discountAmount = discount.maxDiscount;
  }
  
  return Math.min(discountAmount, amount);
};

// Get all available discount codes for display
export const getAvailableDiscounts = () => {
  const now = new Date();
  const allDiscounts = { ...discountCodes, ...seasonalOffers };
  
  return Object.values(allDiscounts).filter(discount => {
    const validUntil = new Date(discount.validUntil);
    return now <= validUntil;
  });
};