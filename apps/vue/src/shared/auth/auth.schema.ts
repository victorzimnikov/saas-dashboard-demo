import z from "zod";

export const registerBodySchema = z.object({
  email: z.email("Email address required!"),
  password: z.string().min(1, "Password required!"),
  fullName: z.string().min(1, "Full Name required!"),
  username: z.string().min(1, "Username required!"),
  privacyAccept: z.boolean().refine((v) => v && "Privacy required!"),
});

export const loginBodySchema = z.object({
  email: z.email("Email address required!"),
  password: z.string().min(1, "Password required!"),
  rememberMe: z.boolean().optional(),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.any(),
});

export const refreshTokenBodySchema = z.object({
  refreshToken: z.string(),
});

export const refreshTokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: z.any(),
});

export type LoginBody = z.infer<typeof loginBodySchema>;
export type RegisterBody = z.infer<typeof registerBodySchema>;
export type LoginResponse = z.infer<typeof loginResponseSchema>;
export type RefreshTokenBody = z.infer<typeof refreshTokenBodySchema>;
export type RefreshTokenResponse = z.infer<typeof refreshTokenResponseSchema>;
