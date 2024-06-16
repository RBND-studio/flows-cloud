"use client";

import { useFetch } from "hooks/use-fetch";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { routes } from "routes";

export const WelcomeRedirect = (): null => {
  const { data } = useFetch("/me");
  const router = useRouter();

  useEffect(() => {
    if (!data) return;
    if (!data.finished_welcome) router.replace(routes.welcomeSubscribe);
  }, [data, router]);

  return null;
};
