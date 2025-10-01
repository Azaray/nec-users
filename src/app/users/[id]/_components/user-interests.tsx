import { Badge } from '@/components/ui/badge';

interface UserInterestsProps {
  interests: string[];
}

export function UserInterests({ interests }: UserInterestsProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-2">Interests</h3>
      <div className="flex flex-wrap gap-2">
        {interests.map((interest) => (
          <Badge key={interest} variant="secondary">
            {interest}
          </Badge>
        ))}
      </div>
    </div>
  );
}