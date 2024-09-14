'use client';

import Avatar from '@mui/material/Avatar';
import { User } from 'firebase/auth';
import stringAvatar from 'utils/getStringAvatar';
import withUser from 'utils/withUser';

export interface IProps {
  user?: User | null;
  name?: string | null | undefined;
}

const AvatarUser: React.FC<IProps> = ({ user, name }) => {
  if (user) return <Avatar {...stringAvatar(name || user?.displayName || user?.email)} />;

  return null;
};
// export default withUser(AvatarUser);
export default withUser(AvatarUser, false);
