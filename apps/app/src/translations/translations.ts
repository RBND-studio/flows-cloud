export const t = {
  actions: {
    newOrg: "New organization",
    newProject: "New project",
    logout: "Sign out",
    save: "Save",
    remove: "Remove",
    close: "Close",
    delete: "Delete",
  },
  settings: {
    theme: "Theme",
  },
  toasts: {
    createOrgSuccess: "Organization created",
    deleteOrgSuccess: "Organization deleted",
    createProjectSuccess: "Project created",
    updateProjectSuccess: "Project updated",
    deleteProjectSuccess: "Project deleted",
    createFlowSuccess: "Flow created",
    updateFlowSuccess: "Flow updated",
    deleteFlowSuccess: "Flow deleted",
    inviteSent: "Invite sent",
    memberRemoved: "Member removed",
    publishFlowSuccess: "Flow published",
    unpublishFlowSuccess: "Flow unpublished",
  },
  targeting: {
    targeting: "Targeting",
    description:
      "Filter the users that should see this flow. Make sure the selected user properties are sent in your implementation.",
    localState: "Local flow targeting settings need to be changed in your codebase",
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
    localState: "Local flow frequency settings need to be changed in your codebase",
    once: "One time",
    "every-time": "Every time",
  },
  project: {
    domains: {
      domains: "Domains",
      description:
        "Add the domains where you want to access flows from this project. For local development, add localhost with port.",
      localState: "Local project domains need to be changed in your codebase",
      addDomain: "Add domain",
      domainPlaceholder: "example.com",
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
};
