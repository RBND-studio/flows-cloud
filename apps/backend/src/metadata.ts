/* eslint-disable */
export default async () => {
    const t = {
        ["./flows/flows.dto"]: await import("./flows/flows.dto"),
        ["../../../packages/db/src/schema/flow"]: await import("../../../packages/db/src/schema/flow"),
        ["./users/users.dto"]: await import("./users/users.dto"),
        ["./organizations/organizations.dto"]: await import("./organizations/organizations.dto"),
        ["./projects/projects.dto"]: await import("./projects/projects.dto"),
        ["./sdk/sdk.dto"]: await import("./sdk/sdk.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./flows/flows.dto"), { "GetFlowsDto": { id: { required: true, type: () => String }, human_id: { required: true, type: () => String }, human_id_alias: { required: true, type: () => String, nullable: true }, project_id: { required: true, type: () => String }, name: { required: true, type: () => String }, flow_type: { required: true, type: () => Object }, description: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, published_at: { required: true, type: () => Date, nullable: true }, frequency: { required: true, type: () => Object, nullable: true } }, "StatBucketDto": { date: { required: true, type: () => Date }, count: { required: true, type: () => Number }, type: { required: true, type: () => String } }, "GetFlowDetailDto": { data: { required: true, type: () => Object }, daily_stats: { required: true, type: () => [t["./flows/flows.dto"].StatBucketDto] } }, "CompleteUpdateFlowDto": { name: { required: true, type: () => String }, description: { required: true, type: () => String }, human_id: { required: true, type: () => String, minLength: 3, maxLength: 32 }, human_id_alias: { required: true, type: () => String, minLength: 3, maxLength: 32 }, published: { required: true, type: () => Boolean }, data: { required: true, type: () => String }, frequency: { required: true, enum: t["../../../packages/db/src/schema/flow"].FlowFrequencyEnum } }, "UpdateFlowDto": {}, "CreateFlowDto": { name: { required: true, type: () => String, minLength: 3 } }, "GetFlowVersionsDto": { id: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, data: { required: true, type: () => Object } } }], [import("./organizations/organizations.dto"), { "GetOrganizationsDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } }, "GetOrganizationDetailDto": {}, "CreateOrganizationDto": { name: { required: true, type: () => String, minLength: 3 } }, "InviteUserDto": { email: { required: true, type: () => String } }, "GetOrganizationMembersDto": { id: { required: true, type: () => String }, email: { required: true, type: () => String } } }], [import("./projects/projects.dto"), { "GetProjectsDto": { id: { required: true, type: () => String }, human_id: { required: true, type: () => String }, human_id_alias: { required: true, type: () => String, nullable: true }, organization_id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, domains: { required: true, type: () => [String] }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } }, "GetProjectDetailDto": {}, "CreateProjectDto": { name: { required: true, type: () => String, minLength: 3 } }, "UpdateProjectDto": { description: { required: false, type: () => String }, domains: { required: true, type: () => [String] }, human_id: { required: true, type: () => String, minLength: 3, maxLength: 32 }, human_id_alias: { required: false, type: () => String, minLength: 3, maxLength: 32 } } }], [import("./sdk/sdk.dto"), { "GetSdkFlowsDto": { id: { required: true, type: () => String }, frequency: { required: true, type: () => Object, nullable: true }, element: { required: false, type: () => String }, steps: { required: true, type: () => [Object] } }, "CreateEventDto": { eventTime: { required: true, type: () => Date }, type: { required: true, type: () => String }, userHash: { required: false, type: () => String }, flowId: { required: true, type: () => String }, projectId: { required: true, type: () => String }, stepIndex: { required: false, type: () => String }, stepHash: { required: false, type: () => String }, flowHash: { required: true, type: () => String } } }], [import("./users/users.dto"), { "Invite": { id: { required: true, type: () => String }, expires_at: { required: true, type: () => Date }, organizationName: { required: true, type: () => String } }, "GetMeDto": { pendingInvites: { required: true, type: () => [t["./users/users.dto"].Invite] } }, "AcceptInviteResponseDto": { organization_id: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getStatus": { type: Boolean } } }], [import("./flows/flows.controller"), { "FlowsControllers": { "getFlows": { type: [t["./flows/flows.dto"].GetFlowsDto] }, "getFlowDetail": { type: t["./flows/flows.dto"].GetFlowDetailDto }, "updateFlow": { type: t["./flows/flows.dto"].GetFlowDetailDto }, "createFlow": { type: t["./flows/flows.dto"].GetFlowsDto }, "deleteFlow": {}, "getFlowVersions": { type: [t["./flows/flows.dto"].GetFlowVersionsDto] } } }], [import("./organizations/organizations.controller"), { "OrganizationsController": { "getOrganizations": { type: [t["./organizations/organizations.dto"].GetOrganizationsDto] }, "getOrganizationDetail": { type: t["./organizations/organizations.dto"].GetOrganizationDetailDto }, "createOrganization": { type: t["./organizations/organizations.dto"].GetOrganizationDetailDto }, "deleteOrganization": {}, "inviteUser": {}, "removeUser": {}, "getUsers": { type: [t["./organizations/organizations.dto"].GetOrganizationMembersDto] } } }], [import("./projects/projects.controller"), { "ProjectsController": { "getProjects": { type: [t["./projects/projects.dto"].GetProjectsDto] }, "getProjectDetail": { type: t["./projects/projects.dto"].GetProjectDetailDto }, "createProject": { type: t["./projects/projects.dto"].GetProjectDetailDto }, "updateProject": { type: t["./projects/projects.dto"].GetProjectDetailDto }, "deleteProject": {} } }], [import("./sdk/sdk.controller"), { "SdkController": { "getFlows": { type: [t["./sdk/sdk.dto"].GetSdkFlowsDto] }, "createEvent": {} } }], [import("./users/users.controller"), { "UsersController": { "me": { type: t["./users/users.dto"].GetMeDto }, "acceptInvite": { type: t["./users/users.dto"].AcceptInviteResponseDto } } }]] } };
};