'use client';

import React from 'react';
import ProtectedAuthRoute from 'components/ProtectedAuthRoute/ProtectedAuthRoute';
import SignInForm from 'components/SigInForm/SigInForm';

const SignInPage = () => {
  return (
    <ProtectedAuthRoute>
      <SignInForm />
    </ProtectedAuthRoute>
  );
};

export default SignInPage;
