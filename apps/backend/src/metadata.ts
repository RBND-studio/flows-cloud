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
    return { "@nestjs/swagger": { "models": [[import("./flows/flows.dto"), { "GetFlowsDto": { id: { required: true, type: () => String }, human_id: { required: true, type: () => String }, project_id: { required: true, type: () => String }, name: { required: true, type: () => String }, flow_type: { required: true, type: () => Object }, description: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, enabled_at: { required: true, type: () => Date, nullable: true }, preview_url: { required: true, type: () => String, nullable: true } }, "PreviewStatBucketDto": { count: { required: true, type: () => Number }, type: { required: true, type: () => String } }, "FlowVersionDto": { frequency: { required: true, type: () => Object }, userProperties: { required: true, type: () => [[Object]] }, element: { required: false, type: () => String }, location: { required: false, type: () => String }, steps: { required: true, type: () => [Object] } }, "GetFlowDetailDto": { preview_stats: { required: true, type: () => [t["./flows/flows.dto"].PreviewStatBucketDto] }, draftVersion: { required: false, type: () => t["./flows/flows.dto"].FlowVersionDto }, publishedVersion: { required: false, type: () => t["./flows/flows.dto"].FlowVersionDto } }, "CompleteUpdateFlowDto": { name: { required: true, type: () => String }, description: { required: true, type: () => String }, human_id: { required: true, type: () => String, minLength: 3, maxLength: 32 }, enabled: { required: true, type: () => Boolean }, element: { required: true, type: () => String }, location: { required: true, type: () => String }, steps: { required: true, type: () => [Object] }, userProperties: { required: true, type: () => [[Object]] }, frequency: { required: true, enum: t["../../../packages/db/src/schema/flow"].FlowFrequencyEnum }, preview_url: { required: true, type: () => String } }, "UpdateFlowDto": {}, "CreateFlowDto": { name: { required: true, type: () => String, minLength: 3 } }, "GetFlowVersionsDto": { id: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, data: { required: true, type: () => Object }, frequency: { required: true, type: () => Object } }, "StatBucketDto": { date: { required: true, type: () => Date }, count: { required: true, type: () => Number }, type: { required: true, type: () => String } }, "GetFlowAnalyticsDto": { daily_stats: { required: true, type: () => [t["./flows/flows.dto"].StatBucketDto] } } }], [import("./organizations/organizations.dto"), { "GetOrganizationsDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } }, "GetOrganizationDetailDto": {}, "CreateOrganizationDto": { name: { required: true, type: () => String, minLength: 3 } }, "UpdateOrganizationDto": {}, "InviteUserDto": { email: { required: true, type: () => String } }, "GetOrganizationMembersDto": { id: { required: true, type: () => String }, email: { required: true, type: () => String } } }], [import("./projects/projects.dto"), { "GetProjectsDto": { id: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } }, "GetProjectDetailDto": { domains: { required: true, type: () => [String] }, css_vars: { required: false, type: () => String }, css_template: { required: false, type: () => String } }, "CreateProjectDto": { name: { required: true, type: () => String, minLength: 3 } }, "CompleteUpdateProjectDto": { description: { required: true, type: () => String }, domains: { required: true, type: () => [String] }, css_vars: { required: true, type: () => String, nullable: true }, css_template: { required: true, type: () => String, nullable: true } }, "UpdateProjectDto": {} }], [import("./sdk/sdk.dto"), { "GetSdkFlowsDto": { id: { required: true, type: () => String }, frequency: { required: true, type: () => Object, nullable: true }, element: { required: false, type: () => String }, steps: { required: true, type: () => [Object] }, location: { required: false, type: () => String }, userProperties: { required: false, type: () => Object } }, "CreateEventDto": { eventTime: { required: true, type: () => Date }, type: { required: true, type: () => String }, userHash: { required: false, type: () => String }, flowId: { required: true, type: () => String }, projectId: { required: true, type: () => String }, stepIndex: { required: false, type: () => String }, stepHash: { required: false, type: () => String }, flowHash: { required: true, type: () => String } } }], [import("./users/users.dto"), { "Invite": { id: { required: true, type: () => String }, expires_at: { required: true, type: () => Date }, organizationName: { required: true, type: () => String } }, "GetMeDto": { pendingInvites: { required: true, type: () => [t["./users/users.dto"].Invite] } }, "AcceptInviteResponseDto": { organization_id: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getStatus": { type: Boolean } } }], [import("./css/css.controller"), { "CssController": { "getDefaultCssVars": { type: String }, "getDefaultCssTemplate": { type: String } } }], [import("./flows/flows.controller"), { "FlowsControllers": { "getFlows": { type: [t["./flows/flows.dto"].GetFlowsDto] }, "getFlowDetail": { type: t["./flows/flows.dto"].GetFlowDetailDto }, "updateFlow": {}, "publishFlow": {}, "createFlow": { type: t["./flows/flows.dto"].GetFlowsDto }, "deleteFlow": {}, "getFlowVersions": { type: [t["./flows/flows.dto"].GetFlowVersionsDto] }, "getFlowAnalytics": { type: t["./flows/flows.dto"].GetFlowAnalyticsDto } } }], [import("./organizations/organizations.controller"), { "OrganizationsController": { "getOrganizations": { type: [t["./organizations/organizations.dto"].GetOrganizationsDto] }, "getOrganizationDetail": { type: t["./organizations/organizations.dto"].GetOrganizationDetailDto }, "createOrganization": { type: t["./organizations/organizations.dto"].GetOrganizationDetailDto }, "updateOrganization": { type: t["./organizations/organizations.dto"].GetOrganizationDetailDto }, "deleteOrganization": {}, "inviteUser": {}, "removeUser": {}, "getUsers": { type: [t["./organizations/organizations.dto"].GetOrganizationMembersDto] } } }], [import("./projects/projects.controller"), { "ProjectsController": { "getProjects": { type: [t["./projects/projects.dto"].GetProjectsDto] }, "getProjectDetail": { type: t["./projects/projects.dto"].GetProjectDetailDto }, "createProject": { type: t["./projects/projects.dto"].GetProjectsDto }, "updateProject": { type: t["./projects/projects.dto"].GetProjectDetailDto }, "deleteProject": {} } }], [import("./sdk/sdk.controller"), { "SdkController": { "getCss": { type: String }, "getFlows": { type: [t["./sdk/sdk.dto"].GetSdkFlowsDto] }, "getPreviewFlow": { type: t["./sdk/sdk.dto"].GetSdkFlowsDto }, "createEvent": {} } }], [import("./users/users.controller"), { "UsersController": { "me": { type: t["./users/users.dto"].GetMeDto }, "acceptInvite": { type: t["./users/users.dto"].AcceptInviteResponseDto } } }]] } };
};