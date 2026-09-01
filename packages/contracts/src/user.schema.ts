import z from "zod";

export const userRoleSchema = z.enum(["admin", "user"]);

export const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.email(),
  role: userRoleSchema,
});

export const userWithCredentialsSchema = userSchema.extend({
  password: z.string(),
  username: z.string(),
});

export type User = z.infer<typeof userSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type UserWithCredentials = z.infer<typeof userWithCredentialsSchema>;
