interface UserInfoFieldProps {
  label: string;
  value: string | number;
}

export function UserInfoField({ label, value }: UserInfoFieldProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
      <p className="text-lg">{value}</p>
    </div>
  );
}