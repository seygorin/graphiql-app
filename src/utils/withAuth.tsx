import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User, onIdTokenChanged } from 'firebase/auth';
import Loader from 'components/Loader';
import { signOutUser } from '../lib/auth';
import { auth } from '../lib/firebase';
import ROUTES from '../shared/types/types';

const withAuth = <T extends JSX.IntrinsicAttributes>(WrappedComponent: React.FC<T>) => {
  const ComponentWithAuth = (props: T) => {
    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const tokenTimerIDRef = useRef<NodeJS.Timeout | number | undefined>();
    const t = useTranslations();

    useEffect(() => {
      async function initializeUser(currentUser: User | null) {
        if (currentUser) {
          const { expirationTime } = await currentUser.getIdTokenResult();
          const sessionDuration = new Date(expirationTime).getTime() - Date.now();

          tokenTimerIDRef.current = setTimeout(() => {
            signOutUser(t, t('auth.error.token'));
            router.push(ROUTES.MAIN_PAGE);
          }, sessionDuration) as NodeJS.Timeout;
        }
      }

      const unsubscribe = onIdTokenChanged(auth, initializeUser);
      // const unsubscribe = onAuthStateChanged(auth, initializeUser);
      return () => {
        unsubscribe();
        if (tokenTimerIDRef.current) {
          clearTimeout(tokenTimerIDRef.current);
        }
      };
    }, [router, t]);

    useEffect(() => {
      if (!loading && !user) {
        router.replace(ROUTES.MAIN_PAGE);
      }
    }, [user, loading, router]);

    if (loading) {
      return <Loader />;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withAuth;
