'use client';

import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { User, onIdTokenChanged } from 'firebase/auth';
import { LanguageType } from 'i18n/settings';
import { signOutUser } from '../lib/auth';
import { auth } from '../lib/firebase';

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
}

const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);
  const router = useRouter();
  const tokenTimerIDRef = useRef<NodeJS.Timeout | number | undefined>();
  const pathname = usePathname();
  const lng = pathname.split('/')[1] as LanguageType;

  useEffect(() => {
    async function initializeUser(currentUser: User | null) {
      if (currentUser) {
        const { expirationTime } = await currentUser.getIdTokenResult();
        const sessionDuration = new Date(expirationTime).getTime() - Date.now();

        tokenTimerIDRef.current = setTimeout(() => {
          signOutUser();
          router.push(`/${lng}`);
        }, sessionDuration);

        setUser({ ...currentUser });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
        // router.replace(`/${lng}`) // change link later (del)
      }
      setIsUserInfoLoading(false);
    }

    // const unsubscribe = onAuthStateChanged(auth, initializeUser);
    const unsubscribe = onIdTokenChanged(auth, initializeUser);
    return () => {
      unsubscribe();
      if (tokenTimerIDRef.current) {
        clearTimeout(tokenTimerIDRef.current);
      }
    };
  }, [router, lng]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      isLoggedIn,
    }),
    [user, isLoggedIn],
  );

  return (
    <AuthContext.Provider value={value}>{!isUserInfoLoading && children}</AuthContext.Provider>
  );
}
