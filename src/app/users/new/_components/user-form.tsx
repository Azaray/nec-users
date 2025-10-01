"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsers } from "@/lib/context/users-context";

const countries = [
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Germany",
  "France",
  "Spain",
  "Italy",
  "Japan",
  "Brazil",
  "India",
  "China",
  "Mexico",
  "South Africa",
  "Netherlands",
  "Sweden",
  "Norway",
  "Denmark",
  "Turkey",
];

const interestOptions = [
  { id: "sports", label: "Sports" },
  { id: "music", label: "Music" },
  { id: "technology", label: "Technology" },
  { id: "travel", label: "Travel" },
  { id: "cooking", label: "Cooking" },
  { id: "reading", label: "Reading" },
  { id: "gaming", label: "Gaming" },
  { id: "art", label: "Art & Design" },
];

export function UserForm() {
  const router = useRouter();
  const { addUser } = useUsers();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    country: "",
    interests: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.age) {
      newErrors.age = "Age is required";
    } else if (parseInt(formData.age) < 18) {
      newErrors.age = "You must be 18 years or older";
    } else if (parseInt(formData.age) > 120) {
      newErrors.age = "Please enter a valid age";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
    }

    if (formData.interests.length === 0) {
      newErrors.interests = "Please select at least one interest";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newUser = addUser({
        fullName: formData.fullName,
        age: parseInt(formData.age),
        country: formData.country,
        interests: formData.interests,
      });
      router.push(`/users/${newUser.id}`);
    }
  };

  const handleInterestChange = (interestId: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests };
    });
    if (errors.interests) {
      setErrors((prev) => ({ ...prev, interests: "" }));
    }
  };

  return (
    <Card className="w-full max-w-2xl shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">User Registration</CardTitle>
        <CardDescription>
          Please fill out all required fields to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => {
                setFormData({ ...formData, fullName: e.target.value });
                if (errors.fullName) setErrors({ ...errors, fullName: "" });
              }}
              className={errors.fullName ? "border-red-500" : ""}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="age">
              Age <span className="text-red-500">*</span>
            </Label>
            <Input
              id="age"
              type="number"
              min="0"
              max="120"
              value={formData.age}
              onChange={(e) => {
                setFormData({ ...formData, age: e.target.value });
                if (errors.age) setErrors({ ...errors, age: "" });
              }}
              className={errors.age ? "border-red-500" : ""}
              placeholder="Enter your age"
            />
            {errors.age && <p className="text-sm text-red-500">{errors.age}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="country">
              Country <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.country}
              onValueChange={(value) => {
                setFormData({ ...formData, country: value });
                if (errors.country) setErrors({ ...errors, country: "" });
              }}
            >
              <SelectTrigger className={errors.country ? "border-red-500" : ""}>
                <SelectValue placeholder="Select your country" />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.country && (
              <p className="text-sm text-red-500">{errors.country}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>
              Interests <span className="text-red-500">*</span>
            </Label>
            <p className="text-sm text-gray-500">
              Select at least one interest
            </p>
            <div className="grid grid-cols-2 gap-4">
              {interestOptions.map((interest) => (
                <div key={interest.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={interest.id}
                    checked={formData.interests.includes(interest.id)}
                    onCheckedChange={() => handleInterestChange(interest.id)}
                  />
                  <Label
                    htmlFor={interest.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {interest.label}
                  </Label>
                </div>
              ))}
            </div>
            {errors.interests && (
              <p className="text-sm text-red-500">{errors.interests}</p>
            )}
          </div>

          <Button onClick={handleSubmit} className="w-full" size="lg">
            Add User
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
