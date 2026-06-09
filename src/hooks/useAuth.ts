'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
  picture: string | null;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    api
      .get<User>('/auth/me')
      .then(setUser)
      .catch(() => router.push('/login'))
      .finally(() => setLoading(false));
  }, []);

  const logout = async () => {
    await api.post('/auth/logout');
    router.push('/login');
  };

  return { user, loading, logout };
}
