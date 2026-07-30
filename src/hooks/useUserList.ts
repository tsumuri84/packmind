import { useState, useEffect, useCallback } from 'react';
import type { User } from '../types';
import { userService } from '../services/UserService';

interface UseUserListReturn {
  users: User[];
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string | null;
  refetch: () => void;
}

export function useUserList(): UseUserListReturn {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    setErrorMessage(null);
    try {
      const result = await userService.getAll();
      setUsers(result);
    } catch (e) {
      setHasError(true);
      setErrorMessage(e instanceof Error ? e.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, isLoading, hasError, errorMessage, refetch: fetchUsers };
}
