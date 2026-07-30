import React from 'react';
import type { User } from '../types';

interface UserCardProps {
  user: User;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps): JSX.Element {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-gray-900">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-gray-500">{user.email}</p>
          <span className="mt-1 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            {user.role}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(user.id)}
            className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(user.id)}
            className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
