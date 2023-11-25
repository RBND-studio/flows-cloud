/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export interface paths {
  "/status": {
    get: operations["AppController_getStatus"];
  };
  "/sdk/flows": {
    get: operations["SdkController_getFlows"];
  };
  "/sdk/events": {
    post: operations["SdkController_createEvent"];
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
  "/organizations/{organizationId}/projects": {
    get: operations["ProjectsController_getProjects"];
  };
  "/projects/{projectId}": {
    get: operations["ProjectsController_getProjectDetail"];
  };
  "/organizations": {
    get: operations["OrganizationsController_getOrganizations"];
  };
}

export type webhooks = Record<string, never>;

export interface components {
  schemas: {
    GetSdkFlowsDto: {
      id: string;
      element?: string;
      steps: Record<string, never>[];
    };
    CreateEventDto: {
      /** Format: date-time */
      eventTime: string;
      type: string;
      userHash?: string;
      flowId: string;
      projectId: string;
      stepIndex?: string;
      stepHash?: string;
      flowHash: string;
    };
    GetFlowsDto: {
      id: string;
      human_id: string;
      human_id_alias: string | null;
      project_id: string;
      name: string;
      flow_type: string;
      description: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    StatBucketDto: {
      /** Format: date-time */
      date: string;
      count: number;
      type: string;
    };
    GetFlowDetailDto: {
      id: string;
      human_id: string;
      human_id_alias: string | null;
      project_id: string;
      name: string;
      flow_type: string;
      description: string;
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
      data: Record<string, never>;
      daily_stats: components["schemas"]["StatBucketDto"][];
    };
    UpdateFlowDto: {
      name?: string;
      description?: string;
      human_id?: string;
      human_id_alias?: string;
      data?: string;
    };
    CreateFlowDto: {
      name: string;
    };
    GetProjectsDto: {
      id: string;
      human_id: string;
      human_id_alias: string | null;
      organization_id: string;
      name: string;
      description: string | null;
      domains: string[];
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
    };
    GetProjectDetailDto: {
      id: string;
      human_id: string;
      human_id_alias: string | null;
      organization_id: string;
      name: string;
      description: string | null;
      domains: string[];
      /** Format: date-time */
      created_at: string;
      /** Format: date-time */
      updated_at: string;
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
  SdkController_getFlows: {
    parameters: {
      query: {
        projectId: string;
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
  SdkController_createEvent: {
    requestBody: {
      content: {
        "application/json": components["schemas"]["CreateEventDto"];
      };
    };
    responses: {
      201: {
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
  OrganizationsController_getOrganizations: {
    responses: {
      200: {
        content: {
          "application/json": components["schemas"]["GetOrganizationsDto"][];
        };
      };
    };
  };
}
