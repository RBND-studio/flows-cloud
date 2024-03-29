import { z } from "zod";

export const PasswordSchema = z.object({
  password: z.string().min(8),
});

export const SignUpFormSchema = z.object({
  email: z.string().email(),
  password: PasswordSchema,
});
