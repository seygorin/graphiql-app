'use client';

import ErrorMessage from 'components/ComponentError';

export default function ErrorError({ error }: { error: Error }) {
  return <ErrorMessage error={error} />;
}
