import { loginBodySchema, registerBodySchema } from "@saas-dashboard/contracts";
import z from "zod";

export const loginFormSchema = loginBodySchema;

export const registerFormSchema = registerBodySchema;

export type LoginFormValues = z.infer<typeof loginFormSchema>;
export type RegisterFormValues = z.infer<typeof registerFormSchema>;
