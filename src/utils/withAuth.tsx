import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { LanguageType } from 'i18n/settings';

const withAuth = <P extends Record<string, never>>(WrappedComponent: React.ComponentType<P>) => {
  const ComponentWithAuth = (props: P) => {
    const { user } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const lng = pathname.split('/')[1] as LanguageType;

    useEffect(() => {
      if (!user) {
        router.replace(`/${lng}`); // or change url
      }
    }, [user, lng, router]);

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
