import { createParams } from "lib/create-params";

export const routes = {
  login: (params?: { message?: string }) => `/login${createParams(params)}`,
  authCallback: "/auth/callback",
  signUp: (params?: { message?: string }) => `/signup${createParams(params)}`,
  signupSuccess: ({ email }: { email: string }) => `/signup/success?email=${email}`,
  resetPassword: `/reset-password`,
  resetPasswordSuccess: ({ email }: { email: string }) => `/reset-password/success?email=${email}`,
  resetPasswordNew: `/reset-password/new`,
  verifyError: ({ message }: { message: string }) => `/verify/error?message=${message}`,

  home: "/",

  welcome: "/welcome",
  welcomeAcceptInvite: "/welcome/accept-invite",
  welcomeOrganization: (params: { organizationId: string }) => `/welcome/${params.organizationId}`,
  welcomeOrganizationProject: (params: { organizationId: string; projectId: string }) =>
    `/welcome/${params.organizationId}/${params.projectId}`,
  userSettings: (params: { userId: string }) => `/user/${params.userId}/settings`,
  organization: (params: { organizationId: string }) => `/org/${params.organizationId}`,
  organizationSettings: (params: { organizationId: string }) =>
    `/org/${params.organizationId}/settings`,

  project: (params: { projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}`,
  projectTemplate: (params: { projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}/template`,
  projectSettings: (params: { projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}/settings`,
  projectGettingStarted: (params: { projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}/getting-started`,

  flow: (params: { flowId: string; projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}/flow/${params.flowId}`,
  flowAnalytics: (params: {
    flowId: string;
    projectId: string;
    organizationId: string;
    category?: string;
  }) =>
    `/org/${params.organizationId}/project/${params.projectId}/flow/${
      params.flowId
    }/analytics${createParams({ category: params.category })}`,
  flowVersions: (params: {
    flowId: string;
    projectId: string;
    organizationId: string;
    versionId?: string;
  }) =>
    `/org/${params.organizationId}/project/${params.projectId}/flow/${params.flowId}/versions${
      params.versionId ? `/${params.versionId}` : ""
    }`,
  flowSettings: (params: { flowId: string; projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}/flow/${params.flowId}/settings`,
  flowEdit: (params: { flowId: string; projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}/flow/${params.flowId}/edit`,
};
