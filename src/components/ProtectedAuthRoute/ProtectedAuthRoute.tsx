import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/`); // Main page
    }
  }, [router, isLoggedIn]);

  return <div>{!isLoggedIn ? children : null}</div>;
};

export default ProtectedAuthRoute;
