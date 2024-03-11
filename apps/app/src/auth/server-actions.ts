"use server";

import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { routes } from "routes";
import { createClient } from "supabase/server";

export const signOut = async (): Promise<void> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  return redirect(routes.login());
};

export const signIn = async (
  formData: FormData,
): Promise<{ error?: { title: string; description: string } }> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const captchaToken = formData.get("captchaToken") as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
    options: { captchaToken },
  });
  if (error) {
    return { error: { title: "Could not authenticate user", description: error.message } };
  }

  return redirect(routes.home);
};

export const resetPassword = async (
  formData: FormData,
): Promise<{ error?: { title: string; description: string } }> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const email = formData.get("email") as string;
  const captchaToken = formData.get("captchaToken") as string;

  const { error } = await supabase.auth.resetPasswordForEmail(email, { captchaToken });

  if (error) {
    return { error: { title: "Could not reset password", description: error.message } };
  }

  return redirect(routes.resetPasswordSuccess({ email }));
};

export const updatePassword = async (
  formData: FormData,
): Promise<{ error?: { title: string; description: string } }> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const password = formData.get("password") as string;

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return { error: { title: "Could not update password", description: error.message } };
  }

  return redirect(routes.home);
};

export const signUp = async (
  formData: FormData,
): Promise<{ error?: { title: string; description: string } }> => {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const captchaToken = formData.get("captchaToken") as string;

  const origin = headers().get("x-forwarded-host");
  const protocol = headers().get("x-forwarded-proto");

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${protocol}://${origin}${routes.authCallback}`,
      captchaToken,
    },
  });

  if (error) {
    return { error: { title: "Could not create user", description: error.message } };
  }

  return redirect(routes.signupSuccess({ email }));
};
