import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import { LanguageType } from 'i18n/settings';

const ProtectedAuthRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const pathname = usePathname();
  const lng = pathname.split('/')[1] as LanguageType;

  useEffect(() => {
    if (isLoggedIn) {
      router.push(`/${lng}`); // Main page
    }
  }, [router, lng, isLoggedIn]);

  return <div>{!isLoggedIn ? children : null}</div>;
};

export default ProtectedAuthRoute;
