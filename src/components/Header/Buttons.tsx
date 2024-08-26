'use client';

import { User } from 'firebase/auth';
import SignInButton from 'components/SignInButton';
import SignOutButton from 'components/SignOutButton';
import SignUpButton from 'components/SignUpButton';
import withUser from 'utils/withUser';

interface IProps {
  user?: User | null;
  name?: string | null;
}

const Buttons: React.FC<IProps> = ({ user, name }) => {
  if (user) return <SignOutButton user={user} name={name} />;

  return (
    <>
      <SignInButton />
      <SignUpButton />
    </>
  );
};

export default withUser(Buttons);
