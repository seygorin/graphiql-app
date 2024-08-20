import Link from 'next/link';
import { Trans } from 'react-i18next/TransWithoutContext';

import { useTranslation } from 'i18n/hook';
import { LanguageType, languages } from 'i18n/settings';

interface IHeaderProps {
  lng: LanguageType;
}

const Header: React.FC<IHeaderProps> = async ({ lng }) => {
  const { t } = await useTranslation(lng);
  return (
    <header>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from
        <strong>
          <>{{ lng }}</>
        </strong>
        to:{' '}
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
