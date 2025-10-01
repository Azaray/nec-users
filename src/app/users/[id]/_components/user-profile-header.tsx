import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export function UserProfileHeader() {
  return (
    <Button asChild variant="ghost" className="mb-6">
      <Link href="/users">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Users
      </Link>
    </Button>
  );
}