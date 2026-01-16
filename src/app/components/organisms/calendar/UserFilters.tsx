"use client";

import { CalendarUser } from "@/app/types/calendar";
import Badge from "@/app/components/atoms/Badge";

interface UserFiltersProps {
  users: CalendarUser[];
  selectedUsers: string[];
  onUserToggle: (userId: string) => void;
  onViewAll: () => void;
}

const UserFilters = ({
  users,
  selectedUsers,
  onUserToggle,
  onViewAll,
}: UserFiltersProps) => {
  return (
    <div className="flex items-center justify-center lg:justify-start gap-4 flex-wrap">
      {users.map((user) => {
        const isSelected = selectedUsers.includes(user.id);
        const color = user.color as "purple" | "blue" | "pink" | "orange";
        const variant = isSelected ? "fill" : "outline";

        return (
          <Badge
            key={user.id}
            onClick={() => onUserToggle(user.id)}
            text={user.name}
            color={color}
            variant={variant}
            size="sm"
          />
        );
      })}
      <Badge
        text="Voir tout le monde"
        color="green"
        variant={selectedUsers.length === 0 ? "fill" : "outline"}
        size="sm"
        className="text-xs"
        onClick={onViewAll}
      />
    </div>
  );
};

export default UserFilters;
