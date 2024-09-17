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
  const t = useTranslations('aboutUs');

  return (
    <Box sx={STYLES.wrapper}>
      <Typography variant='h3' sx={STYLES.title}>
        {t('titleTeam')}
      </Typography>

      <Box sx={STYLES.cards}>
        <Card sx={STYLES.card}>
          <CardMedia sx={STYLES.img}>
            <Image src={avatarOne} alt='developer avatar' width={300} />
          </CardMedia>
          <CardContent sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('name1')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('dev1')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devRole}>
              {t('role1')}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={STYLES.card}>
          <CardMedia sx={STYLES.img}>
            <Image src={avatarTwo} alt='developer avatar' width={300} />
          </CardMedia>
          <CardContent sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('name2')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('dev2')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devRole}>
              {t('role2')}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={STYLES.card}>
          <CardMedia sx={STYLES.img}>
            <Image src={avatarThree} alt='developer avatar' width={300} />
          </CardMedia>
          <CardContent sx={STYLES.cardsInfo}>
            <Typography variant='h4' sx={STYLES.devName}>
              {t('name3')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devText}>
              {t('dev3')}
            </Typography>
            <Typography variant='body1' sx={STYLES.devRole}>
              {t('role3')}
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Typography variant='h3' sx={STYLES.title}>
        {t('titleProject')}
      </Typography>
      <Typography variant='body1' px={4} color='text.secondary'>
        {t('project')}
      </Typography>
      <Typography variant='h3' sx={STYLES.title}>
        {t('titleCourse')}
      </Typography>
      <Typography variant='body1' pb='110px' px={4} color='text.secondary'>
        {t('course')}
      </Typography>
    </Box>
  );
};

export default AboutUs;
