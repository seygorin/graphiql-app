import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Typography } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
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
        <Card sx={STYLES.card}>
          <CardMedia sx={STYLES.img}>
            <Image src={avatarOne} alt='developer avatar' width={300} />
          </CardMedia>
          <CardContent sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('aboutUs.name1')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('aboutUs.dev1')}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={STYLES.card}>
          <CardMedia sx={STYLES.img}>
            <Image src={avatarTwo} alt='developer avatar' width={300} />
          </CardMedia>
          <CardContent sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('aboutUs.name2')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('aboutUs.dev2')}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={STYLES.card}>
          <CardMedia sx={STYLES.img}>
            <Image src={avatarThree} alt='developer avatar' width={300} />
          </CardMedia>
          <CardContent sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('aboutUs.name3')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('aboutUs.dev3')}
            </Typography>
          </CardContent>
        </Card>
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
