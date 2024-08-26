import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }
    if (user) router.push(`/`);
  }, [user, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // show a loader
  }

  return <div>{!user ? children : null}</div>;
};

export default ProtectedAuthRoute;
