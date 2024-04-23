export type UserType = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  bio: string;
  institution: string;
  role: "admin" | "user";
};
