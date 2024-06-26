export const routes = {
  home: "/",
  privacy: "/privacy",
  terms: "/terms",
  about: "/about",
  pricing: "/pricing",

  blog: "/blog",
  blogPostDetail: ({ postId }: { postId: string }) => `/blog/${postId}`,

  changelog: "/changelog",
  changelogReleaseDetail: ({ releaseId }: { releaseId: string }) => `/changelog/${releaseId}`,

  features: "/features",
  featuresBuild: "/features/build",
  featuresFlowSteps: "/features/flow-steps",
  featuresDeliver: "/features/deliver",
  featuresAnalyze: "/features/analyze",
  featuresSecure: "/features/secure",
};
