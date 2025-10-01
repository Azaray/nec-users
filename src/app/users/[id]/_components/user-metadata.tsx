interface UserMetadataProps {
  createdAt: Date;
}

export function UserMetadata({ createdAt }: UserMetadataProps) {
  return (
    <div className="pt-4 border-t">
      <p className="text-sm text-gray-500">
        Created: {createdAt.toLocaleDateString()}
      </p>
    </div>
  );
}