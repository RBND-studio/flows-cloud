declare global {
  namespace NodeJS {
    interface ProcessEnv {
      BACKEND_DATABASE_CONNECTION: string;
      BACKEND_JWT_SECRET: string;
      BACKEND_LOOPS_API_KEY: string;
      BACKEND_APP_URL: string;
      BACKEND_CAPTCHA_SECRET: string;
      BACKEND_SLACK_WEBHOOK_URL: string;
      BACKEND_LEMONSQUEEZY_WEBHOOK_SECRET: string;
      BACKEND_LEMONSQUEEZY_API_KEY: string;
      BACKEND_LEMONSQUEEZY_STORE_ID: string;
      BACKEND_LOGTAIL_TOKEN: string;
    }
  }
}

export {};
