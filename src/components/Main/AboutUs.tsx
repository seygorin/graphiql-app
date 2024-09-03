// 'use client';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import avatarThree from 'public/ava3.jpg';
import avatarOne from 'public/avatar_two.jpg';
import avatarTwo from 'public/avatar_two.jpg';
import s from './About.module.scss';

const AboutUs: React.FC = () => {
  const t = useTranslations();

  return (
    <Box className={s.wrapper} textAlign='center'>
      <Typography variant='h3' pt='110px' pb='28px'>
        {t('aboutUs.titleTeam')}
      </Typography>

      <Box className={s.cards}>
        <Box className={clsx(s.devs, s.dev1)}>
          <Image src={avatarOne} alt='developer avatar' className={s.img} />
          <Box className={s.cards_info}>
            <Typography variant='h4'>{t('aboutUs.name1')}</Typography>
            <Typography variant='body1'>{t('aboutUs.dev1')}</Typography>
          </Box>
        </Box>
        <Box className={clsx(s.devs, s.dev2)}>
          <Image src={avatarTwo} alt='developer avatar' className={s.img} />
          <Box className={s.cards_info}>
            <Typography variant='h4'>{t('aboutUs.name2')}</Typography>
            <Typography variant='body1'>{t('aboutUs.dev2')}</Typography>
          </Box>
        </Box>
        <Box className={clsx(s.devs, s.dev3)}>
          <Image src={avatarThree} alt='developer avatar' className={s.img} />
          <Box className={s.cards_info}>
            <Typography variant='h4'>{t('aboutUs.name3')}</Typography>
            <Typography variant='body1'>{t('aboutUs.dev3')}</Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant='h3' pt='110px' pb='28px'>
        {t('aboutUs.titleProject')}
      </Typography>
      <Typography variant='body1' px='14px' color='text.secondary'>
        {t('aboutUs.project')}
      </Typography>
      <Typography variant='h3' pt='110px' pb='28px'>
        {t('aboutUs.titleCourse')}
      </Typography>
      <Typography variant='body1' pb='110px' px='14px' color='text.secondary'>
        {t('aboutUs.course')}
      </Typography>
    </Box>
  );
};

export default AboutUs;
