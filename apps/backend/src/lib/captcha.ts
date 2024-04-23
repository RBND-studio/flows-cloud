import { retry } from "./retry";

export const verifyCaptcha = <T = { success: boolean } | undefined>(
  captchaToken: string,
): Promise<T> =>
  retry(() =>
    fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.BACKEND_CAPTCHA_SECRET}&response=${captchaToken}`,
    ).then((r) => {
      if (!r.ok) throw new Error();
      return r.json() as Promise<T>;
    }),
  );
