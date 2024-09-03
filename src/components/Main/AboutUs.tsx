// 'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Stack, Typography } from '@mui/material';
import avatarOne from 'public/avatar_one.jpg';
import avatarThree from 'public/avatar_three.jpg';
import avatarTwo from 'public/avatar_two.jpg';

const AboutUs: React.FC = () => {
  const t = useTranslations();

  return (
    <Box>
      <Typography variant="h5" pt={10} pb="12px">
        {t('aboutUs.titleTeam')}
      </Typography>
      <Stack display="flex" gap={2} flexDirection="row" color="text.secondary">
        <Box
          display="flex"
          gap={2}
          flexDirection="row"
          flex="0 1 32%"
          sx={{ border: 1, borderColor: 'success.light', borderRadius: 2, p: 1.7 }}
        >
          <Image src={avatarOne} alt="developer avatar one" width={30} height={30} />
          <Typography variant="body1">{t('aboutUs.dev1')},</Typography>
        </Box>
        <Box
          display="flex"
          gap={2}
          flexDirection="row"
          flex="0 1 32%"
          sx={{ border: 1, borderColor: 'success.light', borderRadius: 2, p: 1.7 }}
        >
          <Image src={avatarTwo} alt="developer avatar one" width={30} height={30} />
          <Typography variant="body1">{t('aboutUs.dev2')}</Typography>
        </Box>
        <Box
          display="flex"
          gap={2}
          flexDirection="row"
          flex="0 1 32%"
          sx={{ border: 1, borderColor: 'success.light', borderRadius: 2, p: 1.7 }}
        >
          <Image src={avatarThree} alt="developer avatar one" width={30} height={30} />
          <Typography variant="body1">{t('aboutUs.dev3')}</Typography>
        </Box>
      </Stack>
      <Typography variant="h5" pt="30px" pb="12px">
        {t('aboutUs.titleProject')}
      </Typography>
      <Typography variant="body1" color="text.secondary">
        {t('aboutUs.project')}
      </Typography>
      <Typography variant="h5" pt="30px" pb="12px">
        {t('aboutUs.titleCourse')}
      </Typography>
      <Typography variant="body1" pb="50px" color="text.secondary">
        {t('aboutUs.course')}
      </Typography>
    </Box>
  );
};

export default AboutUs;
