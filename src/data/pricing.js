// Pricing structure for membership plans
export const pricingPlans = {
  basic: {
    id: 'basic',
    name: 'Basic Plan',
    price: 999,
    duration: 30, // days
    features: [
      'Access to basic gym equipment',
      'Locker facility',
      'Basic fitness consultation'
    ],
    description: 'Perfect for beginners starting their fitness journey'
  },
  premium: {
    id: 'premium',
    name: 'Premium Plan',
    price: 1999,
    duration: 30, // days
    features: [
      'Access to all gym equipment',
      'Personal trainer sessions (2/month)',
      'Nutrition consultation',
      'Locker facility',
      'Group fitness classes'
    ],
    description: 'Comprehensive fitness solution for serious fitness enthusiasts'
  },
  elite: {
    id: 'elite',
    name: 'Elite Plan',
    price: 2999,
    duration: 30, // days
    features: [
      'All Premium features',
      'Unlimited personal trainer sessions',
      'Customized diet plans',
      'Priority booking',
      'Spa and wellness access',
      'Guest passes (2/month)'
    ],
    description: 'Ultimate fitness experience with premium amenities'
  }
};

// Duration-based pricing multipliers
export const durationMultipliers = {
  30: 1.0,    // 1 month - base price
  90: 0.9,    // 3 months - 10% discount
  180: 0.8,   // 6 months - 20% discount
  365: 0.7    // 1 year - 30% discount
};

// Get pricing for a specific plan and duration
export const getPricing = (planId, duration = 30) => {
  const plan = pricingPlans[planId];
  if (!plan) return null;
  
  const multiplier = durationMultipliers[duration] || 1.0;
  const basePrice = plan.price;
  const totalPrice = Math.round(basePrice * multiplier * (duration / 30));
  
  return {
    ...plan,
    duration,
    basePrice,
    multiplier,
    totalPrice,
    savings: duration > 30 ? Math.round(basePrice * (duration / 30) - totalPrice) : 0
  };
};

// Get all available durations
export const getAvailableDurations = () => {
  return Object.keys(durationMultipliers).map(duration => ({
    value: parseInt(duration),
    label: getDurationLabel(parseInt(duration)),
    discount: Math.round((1 - durationMultipliers[duration]) * 100)
  }));
};

// Helper function to get duration label
export const getDurationLabel = (duration) => {
  if (duration === 30) return '1 Month';
  if (duration === 90) return '3 Months';
  if (duration === 180) return '6 Months';
  if (duration === 365) return '1 Year';
  return `${duration} Days`;
};