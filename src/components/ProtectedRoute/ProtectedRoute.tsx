import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [router, isLoggedIn]);

  return <div>{isLoggedIn ? children : null}</div>;
};

export default ProtectedRoute;
