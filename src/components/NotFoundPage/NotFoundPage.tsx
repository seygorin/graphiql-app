'use client';

import { useTranslations } from 'next-intl';
import { Box, Button, Typography } from '@mui/material';
import { ADDITION_COLOR } from '../../theme/theme';

export default function NotFoundPage() {
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
        <Typography variant='h6'>{t('notfound.messageNotFound')}</Typography>

        <Typography
          variant='h1'
          sx={{
            border: 14,
            pl: '18px',
            pr: '34px',
            fontSize: '14rem',
            fontWeight: '400',
            letterSpacing: '-1.4rem',
            lineHeight: '0.9',
            color: 'text.secondary ',
          }}
        >
          404
        </Typography>

        <Typography variant='h6' pb='30px'>
          {t('notfound.message')}
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
