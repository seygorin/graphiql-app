import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';

const withAuth = <T extends JSX.IntrinsicAttributes>(WrappedComponent: React.FC<T>) => {
  const ComponentWithAuth = (props: T) => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!user) {
        router.replace(`/`); // or change url
      }
    }, [user, router]);

    if (!user) {
      return null; // or a loading spinner
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withAuth;
