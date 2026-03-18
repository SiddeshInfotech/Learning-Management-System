import { users, IUser } from "../models/User";

export const validateCredentials = (
  username: string,
  password: string
): IUser | null => {
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  return user || null;
};