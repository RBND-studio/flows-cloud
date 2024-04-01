export type MockLemonSqueezyService = ReturnType<typeof getMockLemonSqueezyService>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- needed for the inferred type
export const getMockLemonSqueezyService = () => ({
  createUsageRecord: jest.fn(),
  getPrice: jest.fn(),
  updateSubscription: jest.fn(),
  cancelSubscription: jest.fn(),
});
