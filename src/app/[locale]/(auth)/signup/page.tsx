'use client';

import React from 'react';
import ProtectedAuthRoute from 'components/ProtectedAuthRoute/ProtectedAuthRoute';
import SignUpForm from 'components/SignUpForm/SignUpForm';
import { AuthProvider } from 'hooks/useAuth';

const SignUpPage = () => {
  return (
    <AuthProvider>
      <ProtectedAuthRoute>
        <SignUpForm />
      </ProtectedAuthRoute>
    </AuthProvider>
  );
};

export default SignUpPage;
