import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export function UserNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto py-8 px-4">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-gray-500 mb-4">User not found</p>
            <Button asChild>
              <Link href="/users">Back to Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}