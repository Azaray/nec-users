"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { User, CreateUserInput } from "@/lib/types/user";

interface UsersContextType {
  users: User[];
  addUser: (user: CreateUserInput) => User;
  getUserById: (id: string) => User | undefined;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export function UsersProvider({ children }: { children: ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (userData: CreateUserInput): User => {
    const newUser: User = {
      ...userData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    setUsers((prev) => [newUser, ...prev]);
    return newUser;
  };

  const getUserById = (id: string): User | undefined => {
    return users.find((user) => user.id === id);
  };

  return (
    <UsersContext.Provider value={{ users, addUser, getUserById }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UsersProvider");
  }
  return context;
}
