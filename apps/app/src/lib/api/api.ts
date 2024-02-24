import { createParams } from "lib/create-params";

import { fetcher } from "./fetcher";
import type { components, operations as Operations } from "./schema";
import type { Endpoint } from "./types";

type Schemas = components["schemas"];

export type OrganizationPreview = Schemas["GetOrganizationsDto"];
export type OrganizationDetail = Schemas["GetOrganizationDetailDto"];
export type InviteUser = Schemas["InviteUserDto"];
export type OrganizationUsers = Schemas["GetOrganizationMembersDto"];
export type OrganizationMember = components["schemas"]["OrganizationMemberDto"];
export type OrganizationPendingInvite = components["schemas"]["OrganizationInviteDto"];
export type CreateOrganization = Schemas["CreateOrganizationDto"];
export type ProjectPreview = Schemas["GetProjectsDto"];
export type ProjectDetail = Schemas["GetProjectDetailDto"];
export type UpdateProject = Schemas["UpdateProjectDto"];
export type CreateProject = Schemas["CreateProjectDto"];
export type FlowPreview = Schemas["GetFlowsDto"];
export type FlowDetail = Schemas["GetFlowDetailDto"];
export type FlowAnalyticsRequest =
  Operations["FlowsControllers_getFlowAnalytics"]["parameters"]["query"];
export type FlowAnalytics = Schemas["GetFlowAnalyticsDto"];
export type FlowVersion = Schemas["GetFlowVersionsDto"];
export type UpdateFlow = Schemas["UpdateFlowDto"];
export type CreateFlow = Schemas["CreateFlowDto"];
export type Me = Schemas["GetMeDto"];
export type AcceptInviteResponse = Schemas["AcceptInviteResponseDto"];

export type Api = {
  "/organizations": Endpoint<OrganizationPreview[]>;
  "POST /organizations": Endpoint<OrganizationDetail, [CreateOrganization]>;
  "PATCH /organizations/:organizationId": Endpoint<
    OrganizationDetail,
    [string, CreateOrganization]
  >;
  "/organizations/:organizationId": Endpoint<OrganizationDetail, [string]>;
  "/organizations/:organizationId/users": Endpoint<OrganizationUsers, [string]>;
  "POST /organizations/:organizationId/users": Endpoint<void, [string, InviteUser]>;
  "DELETE /invites/:inviteId": Endpoint<void, [string]>;
  "DELETE /organizations/:organizationId/users/:userId": Endpoint<void, [string, string]>;
  "DELETE /organizations/:organizationId": Endpoint<void, [string]>;
  "/organizations/:organizationId/projects": Endpoint<ProjectPreview[], [string]>;
  "/projects/:projectId": Endpoint<ProjectDetail, [string]>;
  "PATCH /projects/:projectId": Endpoint<ProjectDetail, [string, UpdateProject]>;
  "DELETE /projects/:projectId": Endpoint<void, [string]>;
  "/projects/:projectId/flows": Endpoint<FlowPreview[], [string]>;
  "POST /organizations/:organizationId/projects": Endpoint<ProjectDetail, [string, CreateProject]>;
  "/flows/:flowId": Endpoint<FlowDetail, [string]>;
  "/flows/:flowId/analytics": Endpoint<FlowAnalytics, [string, FlowAnalyticsRequest?]>;
  "/flows/:flowId/versions": Endpoint<FlowVersion[], [string]>;
  "PATCH /flows/:flowId": Endpoint<void, [string, UpdateFlow]>;
  "POST /flows/:flowId/publish": Endpoint<void, [string]>;
  "POST /projects/:projectId/flows": Endpoint<FlowPreview, [string, CreateFlow]>;
  "DELETE /flows/:flowId": Endpoint<void, [string]>;
  "/me": Endpoint<Me>;
  "POST /invites/:inviteId/accept": Endpoint<AcceptInviteResponse, [string]>;
  "POST /invites/:inviteId/decline": Endpoint<void, [string]>;

  "/css/vars": Endpoint<string>;
  "/css/template": Endpoint<string>;
};

export const api: Api = {
  "/organizations": () => fetcher("/organizations"),
  "POST /organizations": (body) => fetcher("/organizations", { method: "POST", body }),
  "PATCH /organizations/:organizationId": (organizationId, body) =>
    fetcher(`/organizations/${organizationId}`, { method: "PATCH", body }),
  "/organizations/:organizationId": (organizationId) => fetcher(`/organizations/${organizationId}`),
  "/organizations/:organizationId/users": (organizationId) =>
    fetcher(`/organizations/${organizationId}/users`),
  "POST /organizations/:organizationId/users": (organizationId, body) =>
    fetcher(`/organizations/${organizationId}/users`, { method: "POST", body }),
  "DELETE /invites/:inviteId": (inviteId) => fetcher(`/invites/${inviteId}`, { method: "DELETE" }),
  "DELETE /organizations/:organizationId/users/:userId": (organizationId, userId) =>
    fetcher(`/organizations/${organizationId}/users/${userId}`, { method: "DELETE" }),
  "DELETE /organizations/:organizationId": (organizationId) =>
    fetcher(`/organizations/${organizationId}`, { method: "DELETE" }),
  "/organizations/:organizationId/projects": (organizationId) =>
    fetcher(`/organizations/${organizationId}/projects`),
  "/projects/:projectId": (projectId) => fetcher(`/projects/${projectId}`),
  "PATCH /projects/:projectId": (projectId, body) =>
    fetcher(`/projects/${projectId}`, { method: "PATCH", body }),
  "DELETE /projects/:projectId": (projectId) =>
    fetcher(`/projects/${projectId}`, { method: "DELETE" }),
  "POST /organizations/:organizationId/projects": (organizationId, body) =>
    fetcher(`/organizations/${organizationId}/projects`, { method: "POST", body }),
  "/projects/:projectId/flows": (projectId) => fetcher(`/projects/${projectId}/flows`),
  "/flows/:flowId": (flowId) => fetcher(`/flows/${flowId}`),
  "/flows/:flowId/analytics": (flowId, request) =>
    fetcher(`/flows/${flowId}/analytics${createParams(request)}`),
  "/flows/:flowId/versions": (flowId) => fetcher(`/flows/${flowId}/versions`),
  "PATCH /flows/:flowId": (flowId, body) => fetcher(`/flows/${flowId}`, { method: "PATCH", body }),
  "POST /flows/:flowId/publish": (flowId) =>
    fetcher(`/flows/${flowId}/publish`, { method: "POST" }),
  "POST /projects/:projectId/flows": (projectId, body) =>
    fetcher(`/projects/${projectId}/flows`, { method: "POST", body }),
  "DELETE /flows/:flowId": (flowId) => fetcher(`/flows/${flowId}`, { method: "DELETE" }),
  "/me": () => fetcher("/me"),
  "POST /invites/:inviteId/accept": (inviteId) =>
    fetcher(`/invites/${inviteId}/accept`, { method: "POST" }),
  "POST /invites/:inviteId/decline": (inviteId) =>
    fetcher(`/invites/${inviteId}/decline`, { method: "POST" }),

  "/css/vars": () => fetcher("/css/vars"),
  "/css/template": () => fetcher("/css/template"),
};
