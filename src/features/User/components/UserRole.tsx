"use client";

import { Badge } from "@/components/ui/badge";

interface UserRoleProps {
  roles: string[];
}

export default function UserRole({ roles }: UserRoleProps) {
  if (!roles || roles.length === 0) {
    return null;
  }

  const getRoleInfo = () => {
    if (roles.includes("ROLE_ADMIN")) {
      return { label: "Admin", color: "red" };
    }
    if (roles.includes("ROLE_MODERATEUR")) {
      return { label: "Moder", color: "blue" };
    }
    if (roles.includes("ROLE_USER")) {
      return { label: "Member", color: "green" };
    }
    return { label: "Unknown", color: "gray" };
  };

  const { label, color } = getRoleInfo();

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Badge variant="default" style={{ color }}>
        {label}
      </Badge>
    </div>
  );
}
