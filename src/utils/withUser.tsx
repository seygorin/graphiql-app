import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Loader from 'components/Loader';
import { errorNotifyMessage } from 'utils/notifyMessage';
import { auth, db } from '../lib/firebase';

const withUser = <T extends { user?: User | null; name?: string | null }>(
  WrappedComponent: React.FC<T>,
  loader: boolean = true,
) => {
  const ComponentWithAuth = (props: T) => {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState<string | null>(null);
    const t = useTranslations();

    useEffect(() => {
      const fetchUserName = async () => {
        try {
          const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          errorNotifyMessage(t('auth.error.database'));
        }
      };
      if (user) {
        fetchUserName();
      } else {
        setName(null);
      }
    }, [user, t]);

    if (loader && loading) {
      return <Loader />;
    }

    if (!loader && loading) {
      return null;
    }

    if (!user) {
      return <WrappedComponent {...props} user={null} name={null} />;
    }

    return <WrappedComponent {...props} user={user} name={name} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withUser;
