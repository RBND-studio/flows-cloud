/* eslint-disable turbo/no-undeclared-env-vars -- not needed */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export const PRODUCTION = process.env.NEXT_PUBLIC_ENV === "prod";
