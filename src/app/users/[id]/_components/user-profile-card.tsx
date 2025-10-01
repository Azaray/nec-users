import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User } from '@/lib/types/user';
import { UserInfoField } from './user-info-field';
import { UserInterests } from './user-interests';
import { UserMetadata } from './user-metadata';

interface UserProfileCardProps {
  user: User;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl">{user.fullName}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <UserInfoField label="Age" value={`${user.age} years old`} />
        <UserInfoField label="Country" value={user.country} />
        <UserInterests interests={user.interests} />
        <UserMetadata createdAt={user.createdAt} />
      </CardContent>
    </Card>
  );
}