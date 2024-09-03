import { useTranslations } from 'next-intl';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { User } from 'firebase/auth';
import stringAvatar from 'utils/getStringAvatar';
import { signOutUser } from '../../lib/auth';

interface IProps {
  user?: User;
  name?: string | null | undefined;
}

const SignOutButton: React.FC<IProps> = ({ user, name }) => {
  const t = useTranslations();

  const onClickSignOut = () => {
    signOutUser(t);
  };

  return (
    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <Avatar {...stringAvatar(name || user?.displayName || user?.email)} />
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        onClick={onClickSignOut}
        endIcon={<LogoutIcon />}
        sx={{
          ':hover': {
            color: 'white',
          },
        }}
      >
        {t('header.logout')}
      </Button>
    </Stack>
  );
};

export default SignOutButton;
