import PALETTE from '../shared/consts/palette';

function stringToColor(string: string): string {
  const colorIndex = string.length % PALETTE.length;
  return PALETTE[colorIndex];
}

const stringAvatar = (name?: string | null) => {
  if (!name) return { sx: { bgcolor: stringToColor('Anonym') }, children: '' };
  const nameArray = name.split(' ');
  const initials =
    nameArray.length === 1 ? nameArray[0][0] : `${nameArray[0][0]}${nameArray[1][0]}`;
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: initials,
  };
};

export default stringAvatar;
