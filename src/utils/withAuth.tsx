import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User, onIdTokenChanged } from 'firebase/auth';
import { signOutUser } from '../lib/auth';
import { auth } from '../lib/firebase';

const withAuth = <T extends JSX.IntrinsicAttributes>(WrappedComponent: React.FC<T>) => {
  const ComponentWithAuth = (props: T) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const tokenTimerIDRef = useRef<NodeJS.Timeout | number | undefined>();

    useEffect(() => {
      async function initializeUser(currentUser: User | null) {
        if (currentUser) {
          const { expirationTime } = await currentUser.getIdTokenResult();
          const sessionDuration = new Date(expirationTime).getTime() - Date.now();

          tokenTimerIDRef.current = setTimeout(() => {
            signOutUser();
            router.push(`/`);
          }, sessionDuration) as NodeJS.Timeout;
        }
      }

      // const unsubscribe = onAuthStateChanged(auth, initializeUser);
      const unsubscribe = onIdTokenChanged(auth, initializeUser);
      return () => {
        unsubscribe();
        if (tokenTimerIDRef.current) {
          clearTimeout(tokenTimerIDRef.current);
        }
      };
    }, [router]);

    useEffect(() => {
      if (!loading && !user) {
        router.replace('/');
      }
    }, [user, loading, router]);

    if (loading) {
      return <div>Loading...</div>; // show a loader
    }

    if (!user) {
      return null; // return null or a placeholder if user is not authenticated
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withAuth;
