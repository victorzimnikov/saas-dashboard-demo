import type { User } from "@/profile";

export type UserWithCredentials = User & { password: string; username: string };
