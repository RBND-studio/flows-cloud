export type MockEmailService = ReturnType<typeof getMockEmailService>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- needed for the inferred type
export const getMockEmailService = () => ({
  createContact: jest.fn(),
  signedUp: jest.fn(),
  sendInvite: jest.fn(),
  sendUsageAlert: jest.fn(),
  joinNewsletter: jest.fn(),
});
