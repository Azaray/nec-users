"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsers } from "@/lib/context/users-context";
import { Plus } from "lucide-react";

function EmptyState() {
  return (
    <Card>
      <CardContent className="py-12 text-center">
        <p className="text-gray-500 mb-4">No users found</p>
        <Button asChild>
          <Link href="/users/new">Create your first user</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function UserCard({ user }: { user: any }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-xl">{user.fullName}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Age:</span> {user.age}
          </p>
          <p>
            <span className="font-medium">Country:</span> {user.country}
          </p>
          <p>
            <span className="font-medium">Interests:</span>{" "}
            {user.interests.join(", ")}
          </p>
        </div>
        <Button asChild className="w-full mt-4" variant="outline">
          <Link href={`/users/${user.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
}

function UsersGrid({ users }: { users: any[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}

function PageHeader() {
  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold">Users</h1>
      <Button asChild>
        <Link href="/users/new">
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Link>
      </Button>
    </div>
  );
}

export default function UsersPage() {
  const { users } = useUsers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-8 px-4">
        <PageHeader />

        {users.length === 0 && <EmptyState />}
        {users.length > 0 && <UsersGrid users={users} />}
      </div>
    </div>
  );
}
