declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SUPABASE_URL: string;
      NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
      NEXT_PUBLIC_API_URL: string;
      NEXT_PUBLIC_ENV: string;
      NEXT_PUBLIC_TURNSTILE_SITE_KEY: string;
    }
  }
}

export {};
