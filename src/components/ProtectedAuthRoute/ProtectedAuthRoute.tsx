import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from 'components/Loader';
import { auth } from '../../lib/firebase';
import ROUTES from '../../shared/types/types';

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) router.push(ROUTES.MAIN_PAGE);
  }, [user, loading, router]);

  if (loading) {
    return <Loader />;
  }

  return <div>{!user ? children : null}</div>;
};

export default ProtectedAuthRoute;
