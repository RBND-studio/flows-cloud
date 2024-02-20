/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/status": {
    get: operations["AppController_getStatus"];
  };
  "/sdk/css": {
    get: operations["SdkController_getCss"];
  };
  "/sdk/flows": {
    get: operations["SdkController_getFlows"];
  };
  "/sdk/flows/{flowId}/draft": {
    get: operations["SdkController_getPreviewFlow"];
  };
  "/sdk/flows/{flowId}": {
    get: operations["SdkController_getFlowDetail"];
  };
  "/sdk/events": {
    post: operations["SdkController_createEvent"];
  };
  "/sdk/events/{eventId}": {
    delete: operations["SdkController_deleteEvent"];
  };
  "/projects/{projectId}/flows": {
    get: operations["FlowsControllers_getFlows"];
    post: operations["FlowsControllers_createFlow"];
  };
  "/flows/{flowId}": {
    get: operations["FlowsControllers_getFlowDetail"];
    delete: operations["FlowsControllers_deleteFlow"];
    patch: operations["FlowsControllers_updateFlow"];
  };
  "/flows/{flowId}/publish": {
    post: operations["FlowsControllers_publishFlow"];
  };
  "/flows/{flowId}/versions": {
    get: operations["FlowsControllers_getFlowVersions"];
  };
  "/flows/{flowId}/analytics": {
    get: operations["FlowsControllers_getFlowAnalytics"];
  };
  "/organizations/{organizationId}/projects": {
    get: operations["ProjectsController_getProjects"];
    post: operations["ProjectsController_createProject"];
  };
  "/projects/{projectId}": {
    get: operations["ProjectsController_getProjectDetail"];
    delete: operations["ProjectsController_deleteProject"];
    patch: operations["ProjectsController_updateProject"];
  };
  "/organizations": {
    get: operations["OrganizationsController_getOrganizations"];
    post: operations["OrganizationsController_createOrganization"];
  };
  "/organizations/{organizationId}": {
    get: operations["OrganizationsController_getOrganizationDetail"];
    delete: operations["OrganizationsController_deleteOrganization"];
    patch: operations["OrganizationsController_updateOrganization"];
  };
  "/organizations/{organizationId}/users": {
    get: operations["OrganizationsController_getUsers"];
    post: operations["OrganizationsController_inviteUser"];
  };
  "/organizations/{organizationId}/users/{userId}": {
    delete: operations["OrganizationsController_removeUser"];
  };
  "/me": {
    get: operations["UsersController_me"];
  };
  "/invites/{inviteId}/accept": {
    post: operations["UsersController_acceptInvite"];
  };
  "/waitlist": {
    post: operations["UsersController_joinWaitlist"];
  };
  "/css/vars": {
    get: operations["CssController_getDefaultCssVars"];
  };
  "/css/template": {
    get: operations["CssController_getDefaultCssTemplate"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    GetSdkFlowsDto: {
      /** @enum {string|null} */
      frequency?: "once" | "every-time" | null;
      id: string;
      clickElement?: string;
      steps: Record<string, never>[];
      location?: string;
      userProperties?: Record<string, never>;
      _incompleteSteps?: boolean;
    };
    CreateEventDto: {
      /** @enum {string} */
      type: "startFlow" | "nextStep" | "prevStep" | "tooltipError" | "cancelFlow";
      /** Format: date-time */
      eventTime: string;
      userHash?: string;
      flowId: string;
      projectId: string;
      stepIndex?: string;
      stepHash?: string;
      flowHash: string;
      sdkVersion: string;
      targetElement?: string;
      location: string;
    };
    CreateEventResponseDto: {
      id: string;
    };
    GetFlowsDto: {
      /** @enum {string} */
      flow_type: "cloud" | "local";
      start_count: number;
      id: string;
      human_id: string;
      project_id: string;
      name: string;
      description: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      /** Format: date-time */
      enabled_at: string | null;
      preview_url: string | null;
    };
    PreviewStatBucketDto: {
      count: number;
      type: string;
    };
    FlowVersionDto: {
      /** @enum {string} */
      frequency: "once" | "every-time";
      userProperties: Record<string, never>[][];
      clickElement?: string;
      location?: string;
      steps: Record<string, never>[];
    };
    GetFlowDetailDto: {
      /** @enum {string} */
      flow_type: "cloud" | "local";
      preview_stats: components["schemas"]["PreviewStatBucketDto"][];
      draftVersion?: components["schemas"]["FlowVersionDto"];
      publishedVersion?: components["schemas"]["FlowVersionDto"];
      id: string;
      human_id: string;
      project_id: string;
      name: string;
      description: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      /** Format: date-time */
      enabled_at: string | null;
      preview_url: string | null;
    };
    UpdateFlowDto: {
      userProperties?: unknown[][];
      name?: string;
      description?: string;
      human_id?: string;
      enabled?: boolean;
      clickElement?: string;
      location?: string;
      steps?: Record<string, never>[];
      /** @enum {string} */
      frequency?: "once" | "every-time";
      preview_url?: string;
    };
    CreateFlowDto: {
      name: string;
    };
    GetFlowVersionsDto: {
      /** @enum {string} */
      frequency: "once" | "every-time";
      id: string;
      /** Format: date-time */
      created_at: string;
      data: Record<string, never>;
    };
    StatBucketDto: {
      /** Format: date-time */
      date: string;
      count: number;
      type: string;
    };
    GetFlowAnalyticsDto: {
      daily_stats: components["schemas"]["StatBucketDto"][];
    };
    GetProjectsDto: {
      id: string;
      organization_id: string;
      name: string;
      description: string | null;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    GetProjectDetailDto: {
      id: string;
      organization_id: string;
      name: string;
      description: string | null;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      domains: string[];
      css_vars?: string;
      css_template?: string;
    };
    CreateProjectDto: {
      name: string;
      domains?: string[];
    };
    UpdateProjectDto: {
      name?: string;
      domains?: string[];
      description?: string;
      css_vars?: string | null;
      css_template?: string | null;
    };
    GetOrganizationsDto: {
      id: string;
      name: string;
      description: string | null;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    GetOrganizationDetailDto: {
      id: string;
      name: string;
      description: string | null;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    CreateOrganizationDto: {
      name: string;
    };
    UpdateOrganizationDto: {
      name?: string;
    };
    InviteUserDto: {
      email: string;
    };
    GetOrganizationMembersDto: {
      id: string;
      email: string;
    };
    Invite: {
      id: string;
      /** Format: date-time */
      expires_at: string;
      organizationName: string;
    };
    GetMeDto: {
      /** @enum {string} */
      role: "admin" | "user";
      pendingInvites: components["schemas"]["Invite"][];
    };
    AcceptInviteResponseDto: {
      organization_id: string;
    };
    JoinWaitlistDto: {
      email: string;
      captchaToken: string;
    };
  };
  responses: never;
  parameters: never;
  requestBodies: never;
  headers: never;
  pathItems: never;
}

export type $defs = Record<string, never>;

export type external = Record<string, never>;

export interface operations {

  AppController_getStatus: {
    responses: {
      200: {
        content: {
          "application/json": boolean;
        };
      };
    };
  };
  SdkController_getCss: {
    parameters: {
      query: {
        projectId: string;
        v: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  SdkController_getFlows: {
    parameters: {
      query: {
        projectId: string;
        userHash?: string;
      };
      header: {
        origin: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetSdkFlowsDto"][];
        };
      };
    };
  };
  SdkController_getPreviewFlow: {
    parameters: {
      query: {
        projectId: string;
      };
      header: {
        origin: string;
      };
      path: {
        flowId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetSdkFlowsDto"];
        };
      };
    };
  };
  SdkController_getFlowDetail: {
    parameters: {
      query: {
        projectId: string;
      };
      header: {
        origin: string;
      };
      path: {
        flowId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetSdkFlowsDto"];
        };
      };
    };
  };
  SdkController_createEvent: {
    parameters: {
      header: {
        origin: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateEventDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["CreateEventResponseDto"];
        };
      };
    };
  };
  SdkController_deleteEvent: {
    parameters: {
      header: {
        origin: string;
      };
      path: {
        eventId: string;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  FlowsControllers_getFlows: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetFlowsDto"][];
        };
      };
    };
  };
  FlowsControllers_createFlow: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateFlowDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["GetFlowsDto"];
        };
      };
    };
  };
  FlowsControllers_getFlowDetail: {
    parameters: {
      path: {
        flowId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetFlowDetailDto"];
        };
      };
    };
  };
  FlowsControllers_deleteFlow: {
    parameters: {
      path: {
        flowId: string;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  FlowsControllers_updateFlow: {
    parameters: {
      path: {
        flowId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateFlowDto"];
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  FlowsControllers_publishFlow: {
    parameters: {
      path: {
        flowId: string;
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  FlowsControllers_getFlowVersions: {
    parameters: {
      path: {
        flowId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetFlowVersionsDto"][];
        };
      };
    };
  };
  FlowsControllers_getFlowAnalytics: {
    parameters: {
      query?: {
        startDate?: string;
        endDate?: string;
      };
      path: {
        flowId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetFlowAnalyticsDto"];
        };
      };
    };
  };
  ProjectsController_getProjects: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetProjectsDto"][];
        };
      };
    };
  };
  ProjectsController_createProject: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateProjectDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["GetProjectsDto"];
        };
      };
    };
  };
  ProjectsController_getProjectDetail: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetProjectDetailDto"];
        };
      };
    };
  };
  ProjectsController_deleteProject: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  ProjectsController_updateProject: {
    parameters: {
      path: {
        projectId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateProjectDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetProjectDetailDto"];
        };
      };
    };
  };
  OrganizationsController_getOrganizations: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetOrganizationsDto"][];
        };
      };
    };
  };
  OrganizationsController_createOrganization: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateOrganizationDto"];
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["GetOrganizationDetailDto"];
        };
      };
    };
  };
  OrganizationsController_getOrganizationDetail: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetOrganizationDetailDto"];
        };
      };
    };
  };
  OrganizationsController_deleteOrganization: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  OrganizationsController_updateOrganization: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["UpdateOrganizationDto"];
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetOrganizationDetailDto"];
        };
      };
    };
  };
  OrganizationsController_getUsers: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetOrganizationMembersDto"][];
        };
      };
    };
  };
  OrganizationsController_inviteUser: {
    parameters: {
      path: {
        organizationId: string;
      };
    };
    requestBody: {
      content: {
        "application/json": components["schemas"]["InviteUserDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  OrganizationsController_removeUser: {
    parameters: {
      path: {
        organizationId: string;
        userId: string;
      };
    };
    responses: {
      200: {
        content: never;
      };
    };
  };
  UsersController_me: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetMeDto"];
        };
      };
    };
  };
  UsersController_acceptInvite: {
    parameters: {
      path: {
        inviteId: string;
      };
    };
    responses: {
      201: {
        content: {
          "application/json": components["schemas"]["AcceptInviteResponseDto"];
        };
      };
    };
  };
  UsersController_joinWaitlist: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["JoinWaitlistDto"];
      };
    };
    responses: {
      201: {
        content: never;
      };
    };
  };
  CssController_getDefaultCssVars: {
    responses: {
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
  CssController_getDefaultCssTemplate: {
    responses: {
      200: {
        content: {
          "application/json": string;
        };
      };
    };
  };
}
