export interface User {
  id: string;
  fullName: string;
  age: number;
  country: string;
  interests: string[];
  createdAt: Date;
}

export type CreateUserInput = Omit<User, 'id' | 'createdAt'>;
