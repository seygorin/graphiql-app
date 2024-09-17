'use client';

import Box from '@mui/material/Box';
import { User } from 'firebase/auth';
import SignInButton from 'components/SignInButton';
import SignOutButton from 'components/SignOutButton';
import SignUpButton from 'components/SignUpButton';
import withUser from 'utils/withUser';
import theme from '../../theme/theme';

const STYLES = {
  wrapper: {
    display: 'flex',
    gap: 3,
    [theme.breakpoints.down('md')]: { flexDirection: 'column', alignItem: 'center' },
  },
};

export interface IProps {
  user?: User | null;
}

const Buttons: React.FC<IProps> = ({ user }) => {
  if (user) return <SignOutButton />;

  return (
    <Box sx={STYLES.wrapper}>
      <SignInButton />
      <SignUpButton />
    </Box>
  );
};

export default withUser(Buttons, false);
