export type MockLogtailService = ReturnType<typeof getMockLogtailService>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- needed for the inferred type
export const getMockLogtailService = () => ({
  logtail: {
    info: jest.fn(),
    error: jest.fn(),
  },
});
