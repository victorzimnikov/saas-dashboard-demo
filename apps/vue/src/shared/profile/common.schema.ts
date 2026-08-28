import z from "zod";

const userRoleSchema = z.enum(["admin", "user"]);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const userSchema = z.object({
  id: z.string(),
  fullName: z.string(),
  email: z.email(),
  role: userRoleSchema,
});

export type User = z.infer<typeof userSchema>;
export type UserRole = z.infer<typeof userRoleSchema>;
