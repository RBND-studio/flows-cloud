import dayjs from "dayjs";

export const productCheckoutLink =
  "https://flows-sh.lemonsqueezy.com/buy/d3152f1d-7628-4b62-9362-ffa7747d1345";
export const stageProductCheckoutLink =
  "https://flows-sh.lemonsqueezy.com/buy/a0e9623e-02a2-459c-80f2-d0dc6c5ba081";

export const FREE_LIMIT = 1000;
export const FREE_RENEWAL_DATE = dayjs().add(1, "month").set("date", 1).toDate();

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
