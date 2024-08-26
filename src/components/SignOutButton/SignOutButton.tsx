import { useTranslations } from 'next-intl';
import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';
import { User } from 'firebase/auth';
import stringAvatar from 'utils/getStringAvatar';
import { signOutUser } from '../../lib/auth';

interface IProps {
  user?: User;
  name?: string | null | undefined;
}

const SignOutButton: React.FC<IProps> = ({ user, name }) => {
  const t = useTranslations();

  return (
    <Stack direction="row" spacing={2} divider={<Divider orientation="vertical" flexItem />}>
      <Avatar
        {...stringAvatar(name || user?.displayName || user?.email)}
        sx={{ bgcolor: deepOrange[500] }}
      />
      <Button
        size="medium"
        variant="contained"
        color="secondary"
        onClick={signOutUser}
        endIcon={<LogoutIcon />}
      >
        {t('header.logout')}
      </Button>
    </Stack>
  );
};

export default SignOutButton;
