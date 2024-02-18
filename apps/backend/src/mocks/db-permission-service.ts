export type MockDbPermissionService = ReturnType<typeof getMockDbPermissionService>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type -- needed for the inferred type
export const getMockDbPermissionService = () => ({
  doesUserHaveAccessToOrganization: jest.fn(),
  doesUserHaveAccessToProject: jest.fn(),
  doesUserHaveAccessToFlow: jest.fn(),
  isAllowedOrigin: jest.fn(),
});
