import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { useTranslation } from '../../app/i18n';
import { LanguageType, languages } from '../../app/i18n/settings';

interface IHeaderProps {
  lng: LanguageType;
}

const Header: React.FC<IHeaderProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);
  return (
    <header style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <>{{ lng }}</> to:{' '}
      </Trans>
      {languages
        .filter((l) => lng !== l)
        .map((l, index) => {
          return (
            <span key={l}>
              {index > 0 && ' or '}
              <Link href={`/${l}`}>{l}</Link>
            </span>
          );
        })}
    </header>
  );
};

export default Header;
