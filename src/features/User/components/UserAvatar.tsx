"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";

interface UserAvatarProps {
  avatarUrl?: string;
  username: string;
}

export default function UserAvatar({ avatarUrl, username }: UserAvatarProps) {
  const initials = username
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const staticBaseUrl = process.env.NEXT_PUBLIC_STATIC_URL || "";
  const fullAvatarUrl = avatarUrl ? `${staticBaseUrl}${avatarUrl}` : undefined;

  return (
    <Avatar className="w-24 h-24 mb-4">
      {fullAvatarUrl ? (
        <AvatarImage src={fullAvatarUrl} alt={`${username}'s avatar`} />
      ) : null}
      <AvatarFallback>
        {initials || <User className="h-8 w-8" />}
      </AvatarFallback>
    </Avatar>
  );
}
