'use client';

import { User } from 'firebase/auth';
import SignInButton from 'components/SignInButton';
import SignOutButton from 'components/SignOutButton';
import SignUpButton from 'components/SignUpButton';
import withUser from 'utils/withUser';

export interface IProps {
  user?: User | null;
}

const Buttons: React.FC<IProps> = ({ user }) => {
  if (user) return <SignOutButton />;

  return (
    <>
      <SignInButton />
      <SignUpButton />
    </>
  );
};

export default withUser(Buttons, false);
