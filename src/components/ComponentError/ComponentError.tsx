'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Box, Button, Typography } from '@mui/material';
import errorPic from 'public/wrench.svg';
import { ADDITION_COLOR } from '../../theme/theme';

function ComponentError({ error }: { error?: Error }): JSX.Element {
  const t = useTranslations();

  return (
    <Box
      sx={{
        backgroundColor: ADDITION_COLOR.backgroundMain,
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1,
      }}
    >
      <Box
        display='flex'
        gap={2}
        flexDirection='column'
        justifyContent='center'
        alignItems='center'
      >
        <Typography variant='h3'>{t('error.message')}</Typography>
        <Image src={errorPic} width={250} alt='error'></Image>
        <Typography variant='h6' pb='30px'>
          {error?.message ? error.message : t('error.description')}
        </Typography>
        <Button
          size='medium'
          variant='contained'
          color='primary'
          sx={{
            ':hover': {
              color: 'white',
            },
          }}
          href='/'
        >
          {t('notfound.link')}
        </Button>
      </Box>
    </Box>
  );
}
export default ComponentError;
