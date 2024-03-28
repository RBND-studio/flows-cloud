export type MockOrganizationUsageService = ReturnType<typeof getMockOrganizationUsageService>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- needed for the inferred type
export const getMockOrganizationUsageService = () => ({
  getOrganizationUsage: jest.fn(),
  getOrganizationLimit: jest.fn(),
  getIsOrganizationLimitReachedByProject: jest.fn(),
});
