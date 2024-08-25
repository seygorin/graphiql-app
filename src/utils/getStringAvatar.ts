const stringToColor = (string: string) => {
  let color = '#';
  let hash = 0;
  let i;
  for (i = 0; i < string.length; i += 1) {
    // eslint-disable-next-line no-bitwise
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }
  for (i = 0; i < 3; i += 1) {
    // eslint-disable-next-line no-bitwise
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  return color;
};

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
