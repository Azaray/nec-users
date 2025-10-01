// __tests__/context/users-context.test.tsx

import React from "react";
import { renderHook, act } from "@testing-library/react";
import { UsersProvider, useUsers } from "@/lib/context/users-context";

describe("UsersContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <UsersProvider>{children}</UsersProvider>
  );

  it("provides initial users", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    expect(result.current.users).toBeDefined();
    expect(Array.isArray(result.current.users)).toBe(true);
  });

  it("adds a new user with all properties", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    const initialCount = result.current.users.length;

    act(() => {
      result.current.addUser({
        fullName: "Jane Smith",
        age: 30,
        country: "Canada",
        interests: ["sports", "music"],
      });
    });

    expect(result.current.users.length).toBe(initialCount + 1);

    const newUser = result.current.users[0];
    expect(newUser.fullName).toBe("Jane Smith");
    expect(newUser.age).toBe(30);
    expect(newUser.country).toBe("Canada");
    expect(newUser.interests).toEqual(["sports", "music"]);
  });

  it("generates unique ID for new user", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    let userId: string;

    act(() => {
      const newUser = result.current.addUser({
        fullName: "Test User",
        age: 25,
        country: "United States",
        interests: ["sports"],
      });
      userId = newUser.id;
    });

    expect(userId!).toBeDefined();
    expect(typeof userId!).toBe("string");
    expect(userId!.length).toBeGreaterThan(0);
  });

  it("sets createdAt date for new user", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    const beforeAdd = new Date();

    act(() => {
      result.current.addUser({
        fullName: "Test User",
        age: 25,
        country: "United States",
        interests: ["sports"],
      });
    });

    const afterAdd = new Date();
    const newUser = result.current.users[0];

    expect(newUser.createdAt).toBeInstanceOf(Date);
    expect(newUser.createdAt.getTime()).toBeGreaterThanOrEqual(
      beforeAdd.getTime()
    );
    expect(newUser.createdAt.getTime()).toBeLessThanOrEqual(afterAdd.getTime());
  });

  it("gets user by ID", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    let userId: string;

    act(() => {
      const newUser = result.current.addUser({
        fullName: "Test User",
        age: 25,
        country: "United States",
        interests: ["sports"],
      });
      userId = newUser.id;
    });

    const foundUser = result.current.getUserById(userId!);

    expect(foundUser).toBeDefined();
    expect(foundUser?.fullName).toBe("Test User");
  });

  it("returns undefined for non-existent user ID", () => {
    const { result } = renderHook(() => useUsers(), { wrapper });

    const foundUser = result.current.getUserById("non-existent-id");

    expect(foundUser).toBeUndefined();
  });

  it("throws error when used outside provider", () => {
    // Suppress console.error for this test
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    expect(() => {
      renderHook(() => useUsers());
    }).toThrow("useUsers must be used within a UsersProvider");

    consoleSpy.mockRestore();
  });
});
