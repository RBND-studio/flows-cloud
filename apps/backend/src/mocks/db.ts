export type MockDB = ReturnType<typeof getMockDB>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- needed for the inferred type
export const getMockDB = () => ({
  query: {
    projects: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    organizations: {
      findFirst: jest.fn(),
    },
    flows: {
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    flowVersions: {
      findMany: jest.fn(),
    },
    userInvite: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    organizationsToUsers: {
      findFirst: jest.fn(),
      findMany: jest.fn(),
    },
    users: {
      findFirst: jest.fn(),
    },
    userMetadata: {
      findFirst: jest.fn(),
    },
  },
  select: jest.fn().mockReturnThis(),
  from: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  groupBy: jest.fn().mockReturnThis(),
  orderBy: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  values: jest.fn().mockReturnThis(),
  returning: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  delete: jest.fn().mockReturnThis(),
  leftJoin: jest.fn().mockReturnThis(),
  fullJoin: jest.fn().mockReturnThis(),
  with: jest.fn().mockReturnThis(),
  $with: jest.fn().mockReturnThis(),
  selectDistinct: jest.fn().mockReturnThis(),
  selectDistinctOn: jest.fn().mockReturnThis(),
  as: jest.fn().mockReturnThis(),
});
