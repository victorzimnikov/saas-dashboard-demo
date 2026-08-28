import type { UserWithCredentials } from "@/types";

export const USERS: UserWithCredentials[] = [
  {
    id: "1",
    fullName: "Admin Adminov",
    email: "admin@mail.ru",
    role: "admin",
    username: "admin",
    password:
      "pbkdf2-sha256$600000$56XaIySnhZmc5dG8eYOEJg==$vCvsEDrp1ULN36uR6Wk9ZyBOvhf6Cnn7WquRP2lrGzo=", // admin
  },
  {
    id: "2",
    fullName: "User Userov",
    role: "user",
    username: "user",
    email: "user@mail.ru",
    password:
      "pbkdf2-sha256$600000$qO2f639XlbMvvSozsCG8+A==$s7D93zBqDwEu6+mecs/nXe3cOyF26ciUCmPkk0gdPQI=", // user
  },
];
