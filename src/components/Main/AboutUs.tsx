// 'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import avatarOne from 'public/ava1.jpg';
import avatarTwo from 'public/ava2.jpg';
import avatarThree from 'public/ava3.jpg';
import { STYLES } from './styles.aboutUs';

const AboutUs: React.FC = () => {
  const t = useTranslations();

  return (
    <Box sx={STYLES.wrapper}>
      <Typography variant='h3' sx={STYLES.title}>
        {t('aboutUs.titleTeam')}
      </Typography>

      <Box sx={STYLES.cards}>
        <Box sx={STYLES.card}>
          <Box sx={STYLES.img}>
            <Image src={avatarOne} alt='developer avatar' width={300} />
          </Box>
          <Box sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('aboutUs.name1')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('aboutUs.dev1')}
            </Typography>
          </Box>
        </Box>

        <Box sx={STYLES.card}>
          <Box sx={STYLES.img}>
            <Image src={avatarTwo} alt='developer avatar' width={300} />
          </Box>
          <Box sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('aboutUs.name2')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('aboutUs.dev2')}
            </Typography>
          </Box>
        </Box>

        <Box sx={STYLES.card}>
          <Box sx={STYLES.img}>
            <Image src={avatarThree} alt='developer avatar' width={300} />
          </Box>
          <Box sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('aboutUs.name3')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('aboutUs.dev3')}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant='h3' sx={STYLES.title}>
        {t('aboutUs.titleProject')}
      </Typography>
      <Typography variant='body1' px={4} color='text.secondary'>
        {t('aboutUs.project')}
      </Typography>
      <Typography variant='h3' sx={STYLES.title}>
        {t('aboutUs.titleCourse')}
      </Typography>
      <Typography variant='body1' pb='110px' px={4} color='text.secondary'>
        {t('aboutUs.course')}
      </Typography>
    </Box>
  );
};

export default AboutUs;
