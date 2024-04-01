export const pricingTiers = {
  free: {
    price: 0,
    flowsRange: [0, 1000],
  },
  tier1: {
    price: 0.009,
    flowsRange: [1000, 15000],
  },
  tier2: {
    price: 0.0075,
    flowsRange: [15000, 50000],
  },
  tier3: {
    price: 0.005,
    flowsRange: [50000, Infinity],
  },
};
