'use client';

import React from 'react';
import ProtectedAuthRoute from 'components/ProtectedAuthRoute/ProtectedAuthRoute';
import SignInForm from 'components/SigInForm/SigInForm';
import { AuthProvider } from 'hooks/useAuth';

const SignInPage = () => {
  return (
    <AuthProvider>
      <ProtectedAuthRoute>
        <SignInForm />
      </ProtectedAuthRoute>
    </AuthProvider>
  );
};

export default SignInPage;
