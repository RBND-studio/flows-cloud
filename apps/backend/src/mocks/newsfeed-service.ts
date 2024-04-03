export type MockNewsfeedService = ReturnType<typeof getMockNewsfeedService>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- needed for the inferred type
export const getMockNewsfeedService = () => ({ postMessage: jest.fn() });
