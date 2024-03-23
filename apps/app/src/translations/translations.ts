export const t = {
  actions: {
    newOrg: "New organization",
    newProject: "New project",
    logout: "Sign out",
    save: "Save",
    remove: "Remove",
    close: "Close",
    delete: "Delete",
    copy: "Copy",
    leave: "Leave",
  },
  settings: {
    theme: "Theme",
    personal: "Personal settings",
  },
  toasts: {
    createOrgSuccess: "Organization created",
    updateOrgSuccess: "Organization updated",
    deleteOrgSuccess: "Organization deleted",
    createProjectSuccess: "Project created",
    updateProjectSuccess: "Project updated",
    deleteProjectSuccess: "Project deleted",
    projectIdCopied: "Project ID copied",
    saveCssVarsSuccess: "CSS variables saved",
    createFlowSuccess: "Flow created",
    updateFlowSuccess: "Flow updated",
    deleteFlowSuccess: "Flow deleted",
    saveTargetingSuccess: "Targeting updated",
    saveFrequencySuccess: "Frequency updated",
    saveLaunchSuccess: "Launch settings updated",
    inviteSent: "Invite sent",
    usersInvited: "Users were invited",
    memberRemoved: "Member removed",
    publishFlowSuccess: "Flow published",
    enableFlowSuccess: "Flow is live",
    disableFlowSuccess: "Flow disabled",

    sendInviteFailed: "Failed to send invite",
    createProjectFailed: "Failed to create project",
    createOrgFailed: "Failed to create organization",
    updateOrgFailed: "Failed to update organization",
    acceptInviteFailed: "Failed to accept invite",
    acceptInviteSuccess: "Invite accepted",
    declineInviteFailed: "Failed to decline invite",
    deleteInviteFailed: "Failed to delete invite",
    deleteInviteSuccess: "Invite deleted",
    saveStepsFailed: "Failed to update steps",
    saveFlowFailed: "Failed to update flow",
    saveTargetingFailed: "Failed to update targeting",
    saveFrequencyFailed: "Failed to update frequency",
    saveLaunchFailed: "Failed to update launch settings",
    deleteFlowFailed: "Failed to delete flow",
    publishFlowFailed: "Failed to publish flow",
    enableFlowFailed: "Failed to enable flow",
    disableFlowFailed: "Failed to disable flow",
    savePreviewUrlFailed: "Failed to save preview URL",
    saveProjectFailed: "Failed to update project",
    deleteProjectFailed: "Failed to delete project",
    saveCssVarsFailed: "Failed to save CSS variables",
    createFlowFailed: "Failed to create flow",
    deleteOrgFailed: "Failed to delete organization",
    removeMemberFailed: "Failed to remove member",
  },
  steps: {
    stepType: {
      tooltip: "Tooltip",
      modal: "Modal",
      wait: "Wait",
    },
    placement: {
      top: "Top",
      right: "Right",
      bottom: "Bottom",
      left: "Left",
      "top-start": "Top start",
      "top-end": "Top end",
      "right-start": "Right start",
      "right-end": "Right end",
      "bottom-start": "Bottom start",
      "bottom-end": "Bottom end",
      "left-start": "Left start",
      "left-end": "Left end",
    },
    stepIdLabel: "Step ID",
    stepIdDescription: "Unique ID of the step. Useful for programmatic control of the flow.",
    targetBranchLabel: "Target branch",
    targetBranchDescription:
      "Which branch to take. Leave empty is there is no fork step after this step.",
    footer: {
      buttonAlignment: {
        left: "Left",
        center: "Center",
        right: "Right",
      },
      variant: {
        href: "Link",
        targetBranch: "Branch",
        next: "Next",
        prev: "Previous",
        cancel: "Cancel",
      },
    },
    wait: {
      variant: {
        submit: "Form submit",
        click: "Click",
        change: "Input change",
      },
    },
  },
  targeting: {
    targeting: "Targeting",
    description:
      "Filter the users that should see this flow. Make sure the selected user properties are sent in your implementation.",
    addGroup: "Add filter group",
    addMatcher: "Add filter",
    group: "All users",
    value: "Value",
    or: "or",
    operator: {
      eq: "Equals",
      ne: "Does not equal",
      gt: "Greater than",
      gte: "Greater than or equal to",
      lt: "Less than",
      lte: "Less than or equal to",
      contains: "Contains",
      notContains: "Does not contain",
      regex: "Regular expression",
    },
    operatorExplanation: {
      eq: "is",
      ne: "is not",
      gt: "is greater than",
      gte: "is greater than or equal to",
      lt: "is less than",
      lte: "is less than or equal to",
      contains: "contains",
      notContains: "does not contain",
      regex: "matches a regular expression",
    },
  },
  frequency: {
    frequency: "Frequency",
    description: "How often should the flow be shown to your users.",
    once: "One time",
    "every-time": "Every time",
  },
  launch: {
    launch: "Launch",
    description:
      "When and where should the flow be shown to your users. Leave empty when launching manually in your codebase.",
    localState: "Local flow launch settings need to be changed in your codebase",
    element: "After clicking on a specified element.",
    location: "After visiting a specified url. Supports regex.",
  },
  analytics: {
    starts: "Starts",
    finishes: "Finishes",
    finishRate: "Finish rate",
    exits: "Exits",
    users: "Unique users",
    values: {
      starts: "start",
      starts_plural: "starts",
      finishes: "finish",
      finishes_plural: "finishes",
      exits: "exit",
      exits_plural: "exits",
      users: "user",
      users_plural: "users",
    },
  },
  project: {
    domains: {
      domains: "Project domains",
      description: "Add the domains from where you want to use this project.",
      localState: "Local project domains need to be changed in your codebase",
      addDomain: "Add domain",
      domainPlaceholder: "example.com",
      invalidDomain: "Invalid domain. Please use https://example.com format.",
    },
    deleteDialog: {
      title: "Delete project",
      description:
        "Are you sure you want to delete this project? All flows and analytics data will be deleted as well.",
      confirm: "Delete project",
    },
  },
  organization: {
    members: {
      title: "Your team",
      description: "There is currently {{count}} member in your organization.",
      description_plural: "There are currently {{count}} members in your organization.",
      addDialog: {
        button: "Invite team member",
        title: "Invite team member",
        description:
          "Enter the email address of the person you want to invite to your organization. All team members have the same permissions (for now).",
        confirm: "Send invite",
      },
    },
    deleteDialog: {
      title: "Delete organization",
      description:
        "Are you sure you want to delete this organization? All projects and flows will be deleted as well.",
      confirm: "Delete organization",
    },
  },
  flow: {
    deleteDialog: {
      title: "Delete flow",
      description: "Are you sure you want to delete this flow?",
      localFlowDescription:
        "Deleting local flow will not stop it from running until you remove it from your codebase. This action just removes the analytics and logs associated with the flow.",
      confirm: "Delete flow",
    },
  },
};
