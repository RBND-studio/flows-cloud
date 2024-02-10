import { createParams } from "lib/create-params";

export const routes = {
  login: (params?: { message?: string }) => `/login${createParams(params)}`,
  authCallback: "/auth/callback",
  signUp: (params?: { message?: string }) => `/signup${createParams(params)}`,

  home: "/",
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
  flowSteps: (params: { flowId: string; projectId: string; organizationId: string }) =>
    `/org/${params.organizationId}/project/${params.projectId}/flow/${params.flowId}/steps`,
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
};
