import React from 'react';
import { useUserList } from '../hooks/useUserList';
import { UserCard } from '../components/UserCard';

export function UsersPage(): JSX.Element {
  const { users, isLoading, hasError, errorMessage, refetch } = useUserList();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-gray-500">Loading users...</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="rounded-lg bg-red-50 p-4">
        <p className="text-sm text-red-600">{errorMessage}</p>
        <button
          onClick={refetch}
          className="mt-2 text-sm font-medium text-red-700 underline"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-xl font-bold text-gray-900">Users</h1>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={(id) => console.log('edit', id)}
            onDelete={(id) => console.log('delete', id)}
          />
        ))}
      </div>
    </div>
  );
}
