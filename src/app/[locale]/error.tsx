'use client';

import ErrorMessage from '../../components/ComponentError/ComponentError';

export default function ErrorError({ error }: { error: Error }) {
  return <ErrorMessage error={error} />;
}
