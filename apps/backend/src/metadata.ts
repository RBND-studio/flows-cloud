/* eslint-disable */
export default async () => {
    const t = {
        ["./flows/flows.dto"]: await import("./flows/flows.dto"),
        ["../../../packages/db/src/schema/flow"]: await import("../../../packages/db/src/schema/flow"),
        ["./organizations/organizations.dto"]: await import("./organizations/organizations.dto"),
        ["./users/users.dto"]: await import("./users/users.dto"),
        ["./projects/projects.dto"]: await import("./projects/projects.dto"),
        ["./sdk/sdk.dto"]: await import("./sdk/sdk.dto")
    };
    return { "@nestjs/swagger": { "models": [[import("./flows/flows.dto"), { "GetFlowBase": { id: { required: true, type: () => String }, human_id: { required: true, type: () => String }, project_id: { required: true, type: () => String }, name: { required: true, type: () => String }, flow_type: { required: true, type: () => Object }, description: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, enabled_at: { required: true, type: () => Date, nullable: true }, preview_url: { required: true, type: () => String, nullable: true } }, "GetFlowsDto": { start_count: { required: true, type: () => Number } }, "PreviewStatBucketDto": { count: { required: true, type: () => Number }, type: { required: true, type: () => String } }, "FlowVersionDto": { frequency: { required: true, type: () => Object }, userProperties: { required: true, type: () => [[Object]] }, clickElement: { required: false, type: () => String }, location: { required: false, type: () => String }, steps: { required: true, type: () => [Object] }, published_at: { required: false, type: () => Date } }, "GetFlowDetailDto": { preview_stats: { required: true, type: () => [t["./flows/flows.dto"].PreviewStatBucketDto] }, draftVersion: { required: false, type: () => t["./flows/flows.dto"].FlowVersionDto }, publishedVersion: { required: false, type: () => t["./flows/flows.dto"].FlowVersionDto } }, "CompleteUpdateFlowDto": { name: { required: true, type: () => String }, description: { required: true, type: () => String }, human_id: { required: true, type: () => String, minLength: 3, maxLength: 32 }, enabled: { required: true, type: () => Boolean }, clickElement: { required: true, type: () => String }, location: { required: true, type: () => String }, steps: { required: true, type: () => [Object] }, userProperties: { required: true, type: () => [[Object]] }, frequency: { required: true, enum: t["../../../packages/db/src/schema/flow"].FlowFrequencyEnum }, preview_url: { required: true, type: () => String } }, "UpdateFlowDto": {}, "CreateFlowDto": { name: { required: true, type: () => String } }, "GetFlowVersionsDto": { id: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, data: { required: true, type: () => Object }, frequency: { required: true, type: () => Object } }, "StatBucketDto": { date: { required: true, type: () => Date }, count: { required: true, type: () => Number }, type: { required: true, type: () => String } }, "GetFlowAnalyticsDto": { daily_stats: { required: true, type: () => [t["./flows/flows.dto"].StatBucketDto] } } }], [import("./organizations/organizations.dto"), { "GetOrganizationsDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, members_count: { required: false, type: () => Number } }, "GetOrganizationSubscriptionDto": { id: { required: true, type: () => String }, name: { required: true, type: () => String }, status: { required: true, type: () => String }, status_formatted: { required: true, type: () => String }, email: { required: true, type: () => String }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, renews_at: { required: true, type: () => Date }, ends_at: { required: false, type: () => Date, nullable: true }, is_paused: { required: true, type: () => Boolean }, price_tiers: { required: true, type: () => [t["./organizations/organizations.dto"].SubscriptionPriceTierDto] } }, "GetOrganizationDetailDto": { usage: { required: true, type: () => Number }, limit: { required: true, type: () => Number }, estimated_price: { required: false, type: () => Number }, subscription: { required: false, type: () => t["./organizations/organizations.dto"].GetOrganizationSubscriptionDto } }, "CreateOrganizationDto": { name: { required: true, type: () => String, minLength: 3 } }, "CompleteUpdateOrganizationDto": { start_limit: { required: true, type: () => Number } }, "UpdateOrganizationDto": {}, "InviteUserDto": { email: { required: true, type: () => String } }, "OrganizationMemberDto": { id: { required: true, type: () => String }, email: { required: true, type: () => String } }, "OrganizationInviteDto": { id: { required: true, type: () => String }, email: { required: true, type: () => String }, expires_at: { required: true, type: () => Date } }, "GetOrganizationMembersDto": { members: { required: true, type: () => [t["./organizations/organizations.dto"].OrganizationMemberDto] }, pending_invites: { required: true, type: () => [t["./organizations/organizations.dto"].OrganizationInviteDto] } }, "GetSubscriptionDetailDto": { customer_portal_url: { required: true, type: () => String }, update_payment_method: { required: true, type: () => String } }, "SubscriptionPriceTierDto": { last_unit: { required: true, type: () => String }, unit_price_decimal: { required: true, type: () => String, nullable: true } }, "GetOrganizationInvoiceDto": { id: { required: true, type: () => String }, status_formatted: { required: true, type: () => String }, invoice_url: { required: false, type: () => String, nullable: true }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date }, total_formatted: { required: true, type: () => String }, subtotal_formatted: { required: true, type: () => String }, discount_total_formatted: { required: true, type: () => String }, tax_formatted: { required: true, type: () => String }, refunded_at: { required: false, type: () => Date, nullable: true } } }], [import("./projects/projects.dto"), { "GetProjectsDto": { id: { required: true, type: () => String }, organization_id: { required: true, type: () => String }, name: { required: true, type: () => String }, description: { required: true, type: () => String, nullable: true }, created_at: { required: true, type: () => Date }, updated_at: { required: true, type: () => Date } }, "GetProjectDetailDto": { domains: { required: true, type: () => [String] }, css_vars: { required: false, type: () => String, nullable: true }, css_template: { required: false, type: () => String, nullable: true } }, "CreateProjectDto": { name: { required: true, type: () => String }, domains: { required: false, type: () => [String] } }, "CompleteUpdateProjectDto": { description: { required: true, type: () => String }, domains: { required: true, type: () => [String] }, css_vars: { required: true, type: () => String, nullable: true }, css_template: { required: true, type: () => String, nullable: true } }, "UpdateProjectDto": {} }], [import("./sdk/sdk.dto"), { "GetSdkFlowsDto": { id: { required: true, type: () => String }, frequency: { required: true, type: () => Object, nullable: true }, clickElement: { required: false, type: () => String }, steps: { required: true, type: () => [Object] }, location: { required: false, type: () => String }, userProperties: { required: false, type: () => Object }, _incompleteSteps: { required: false, type: () => Boolean } }, "CreateEventDto": { eventTime: { required: true, type: () => Date }, userHash: { required: false, type: () => String }, flowId: { required: true, type: () => String }, projectId: { required: true, type: () => String }, stepIndex: { required: false, type: () => String }, stepHash: { required: false, type: () => String }, flowHash: { required: true, type: () => String }, sdkVersion: { required: true, type: () => String }, targetElement: { required: false, type: () => String }, location: { required: true, type: () => String }, type: { required: true, type: () => Object } }, "CreateEventResponseDto": { id: { required: true, type: () => String } } }], [import("./users/users.dto"), { "Invite": { id: { required: true, type: () => String }, expires_at: { required: true, type: () => Date }, organization_name: { required: true, type: () => String } }, "GetMeDto": { pendingInvites: { required: true, type: () => [t["./users/users.dto"].Invite] }, role: { required: true, type: () => Object }, hasPassword: { required: true, type: () => Boolean } }, "AcceptInviteResponseDto": { organization_id: { required: true, type: () => String } }, "JoinWaitlistDto": { email: { required: true, type: () => String }, captcha_token: { required: true, type: () => String } } }]], "controllers": [[import("./app.controller"), { "AppController": { "getStatus": { type: Boolean } } }], [import("./billing/billing.controller"), { "BillingController": { "handleLemonSqueezyWebhook": {} } }], [import("./css/css.controller"), { "CssController": { "getDefaultCssVars": { type: String }, "getDefaultCssTemplate": { type: String } } }], [import("./flows/flows.controller"), { "FlowsController": { "getFlows": { type: [t["./flows/flows.dto"].GetFlowsDto] }, "getFlowDetail": { type: t["./flows/flows.dto"].GetFlowDetailDto }, "updateFlow": {}, "publishFlow": {}, "createFlow": { type: t["./flows/flows.dto"].GetFlowsDto }, "deleteFlow": {}, "getFlowVersions": { type: [t["./flows/flows.dto"].GetFlowVersionsDto] }, "getFlowAnalytics": { type: t["./flows/flows.dto"].GetFlowAnalyticsDto } } }], [import("./organizations/organizations.controller"), { "OrganizationsController": { "getOrganizations": { type: [t["./organizations/organizations.dto"].GetOrganizationsDto] }, "getOrganizationDetail": { type: t["./organizations/organizations.dto"].GetOrganizationDetailDto }, "createOrganization": { type: t["./organizations/organizations.dto"].GetOrganizationsDto }, "updateOrganization": { type: t["./organizations/organizations.dto"].GetOrganizationsDto }, "deleteOrganization": {}, "inviteUser": {}, "leaveOrganization": {}, "removeUser": {}, "removeInvite": {}, "getUsers": { type: t["./organizations/organizations.dto"].GetOrganizationMembersDto }, "getSubscription": { type: t["./organizations/organizations.dto"].GetSubscriptionDetailDto }, "cancelSubscription": {}, "getInvoices": { type: [t["./organizations/organizations.dto"].GetOrganizationInvoiceDto] } } }], [import("./projects/projects.controller"), { "ProjectsController": { "getProjects": { type: [t["./projects/projects.dto"].GetProjectsDto] }, "getProjectDetail": { type: t["./projects/projects.dto"].GetProjectDetailDto }, "createProject": { type: t["./projects/projects.dto"].GetProjectsDto }, "updateProject": { type: t["./projects/projects.dto"].GetProjectDetailDto }, "deleteProject": {} } }], [import("./sdk/sdk.controller"), { "SdkController": { "getCss": { type: String }, "getFlows": { type: [t["./sdk/sdk.dto"].GetSdkFlowsDto] }, "getPreviewFlow": { type: t["./sdk/sdk.dto"].GetSdkFlowsDto }, "getFlowDetail": { type: t["./sdk/sdk.dto"].GetSdkFlowsDto }, "createEvent": { type: t["./sdk/sdk.dto"].CreateEventResponseDto }, "deleteEvent": {} } }], [import("./users/users.controller"), { "UsersController": { "me": { type: t["./users/users.dto"].GetMeDto }, "acceptInvite": { type: t["./users/users.dto"].AcceptInviteResponseDto }, "declineInvite": {}, "joinWaitlist": {}, "deleteAccount": {}, "deleteIdentity": {} } }]] } };
};