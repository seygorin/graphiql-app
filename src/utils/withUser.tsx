import { User } from 'firebase/auth';
import { useAuth } from 'hooks/useAuth';

const withUser = <T extends { user?: User | null }>(WrappedComponent: React.FC<T>) => {
  const ComponentWithAuth = (props: T) => {
    const { user } = useAuth();

    if (!user) {
      return <WrappedComponent {...props} user={null} />; // or a loading spinner
    }

    return <WrappedComponent {...props} user={user} />;
  };

  ComponentWithAuth.displayName = `withAuth(${
    WrappedComponent.displayName || WrappedComponent.name || 'Component'
  })`;

  return ComponentWithAuth;
};

export default withUser;
