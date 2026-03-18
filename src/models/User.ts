export interface IUser {
  id: string;
  username: string;
  password: string;
  createdAt: Date;
}

export const users: IUser[] = [
  {
    id: "1",
    username: "testuser",
    password: "password123",
    createdAt: new Date(),
  },
];