import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { User } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';

const withUser = <T extends { user?: User | null; name?: string | null }>(
  WrappedComponent: React.FC<T>,
) => {
  const ComponentWithAuth = (props: T) => {
    const [user, loading] = useAuthState(auth);
    const [name, setName] = useState<string | null>(null);

    useEffect(() => {
      // if (loading) return;
      // if (!user) return router.push("/");
      const fetchUserName = async () => {
        try {
          const q = query(collection(db, 'users'), where('uid', '==', user?.uid));
          const doc = await getDocs(q);
          const data = doc.docs[0].data();
          setName(data.name);
        } catch (err) {
          console.error(err);
          alert('An error occured while fetching user data');
        }
      };

      if (user) {
        fetchUserName();
      } else {
        setName(null);
      }
    }, [user]);

    if (loading) {
      return <div>Loading...</div>; // show a loader
    }

    if (!user) {
      return <WrappedComponent {...props} user={null} name={null} />; // or a loading spinner
    }

    return <WrappedComponent {...props} user={user} name={name} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withUser;
