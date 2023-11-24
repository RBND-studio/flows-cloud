/* eslint-disable */
export default async () => {
    const t = {
        ["./flows/flows.dto"]: await import("./flows/flows.dto"),
        ["./organizations/organizations.dto"]: await import("./organizations/organizations.dto"),
        ["./projects/projects.dto"]: await import("./projects/projects.dto"),
        ["./sdk/sdk.dto"]: await import("./sdk/sdk.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./flows/flows.dto"), { "GetFlowsDto": { id: { required: true, type: () => String }, human_id: { required: true, type: () => String }, human_id_alias: { required: true, type: () => String, nullable: true }, project_id: { required: true, type: () => String }, name: { required: true, type: () => String }, flow_type: { required: true, type: () => String }, description: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } }, "StatBucketDto": { date: { required: true, type: () => Date }, count: { required: true, type: () => Number }, type: { required: true, type: () => String } }, "GetFlowDetailDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, project_id: { required: true, type: () => String }, flow_type: { required: true, type: () => String }, human_id: { required: true, type: () => String }, human_id_alias: { required: true, type: () => String, nullable: true }, data: { required: true, type: () => Object }, daily_stats: { required: true, type: () => [t["./flows/flows.dto"].StatBucketDto] } }, "UpdateFlowDto": {}, "CompleteUpdateFlowDto": { name: { required: true, type: () => String }, description: { required: true, type: () => String }, human_id: { required: true, type: () => String }, human_id_alias: { required: true, type: () => String }, data: { required: true, type: () => String } } }], [import("./organizations/organizations.dto"), { "GetOrganizationsDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } } }], [import("./projects/projects.dto"), { "GetProjectsDto": { id: { required: true, type: () => String }, human_id: { required: true, type: () => String }, human_id_alias: { required: true, type: () => String, nullable: true }, organization_id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, domains: { required: true, type: () => [String] }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } } }], [import("./sdk/sdk.dto"), { "GetSdkFlowsDto": { id: { required: true, type: () => String }, element: { required: false, type: () => String }, steps: { required: true, type: () => [Object] } }, "CreateEventDto": { eventTime: { required: true, type: () => Date }, type: { required: true, type: () => String }, userHash: { required: false, type: () => String }, flowId: { required: true, type: () => String }, projectId: { required: true, type: () => String }, stepIndex: { required: false, type: () => String }, stepHash: { required: false, type: () => String }, flowHash: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getStatus": { type: Boolean } } }], [import("./flows/flows.controller"), { "FlowsControllers": { "getFlows": { type: [t["./flows/flows.dto"].GetFlowsDto] }, "getFlowDetail": { type: t["./flows/flows.dto"].GetFlowDetailDto }, "updateFlow": {} } }], [import("./organizations/organizations.controller"), { "OrganizationsController": { "getOrganizations": { type: [t["./organizations/organizations.dto"].GetOrganizationsDto] } } }], [import("./projects/projects.controller"), { "ProjectsController": { "getProjects": { type: [t["./projects/projects.dto"].GetProjectsDto] } } }], [import("./sdk/sdk.controller"), { "SdkController": { "getFlows": { type: [t["./sdk/sdk.dto"].GetSdkFlowsDto] }, "createEvent": {} } }]] } };
};