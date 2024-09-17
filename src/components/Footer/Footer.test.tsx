import type { ImageProps } from 'next/image';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Footer from './Footer';

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: (props: ImageProps) => (
    <div
      data-testid='next-image'
      data-src={props.src?.toString()}
      data-alt={props.alt}
      data-width={props.width}
      data-height={props.height}
    />
  ),
}));

vi.mock('../../styles/genStyles', () => ({
  genStyles: () => ({
    wrapper: {},
    info: {},
    links: {},
    link: {},
    year: {},
  }),
}));

vi.mock('../../theme/theme', () => ({
  default: {
    breakpoints: {
      down: () => {},
    },
  },
  ADDITION_COLOR: {
    footerHeight: '60px',
    backgroundFooter: '#000000',
  },
}));

describe('Footer', () => {
  it('renders footer component', () => {
    render(<Footer />);
    const footerElement = screen.getByRole('contentinfo');
    expect(footerElement).toBeInTheDocument();
  });

  it('renders github links', () => {
    render(<Footer />);
    const intrstngLink = screen.getByRole('link', { name: 'Intrstng' });
    const seygorinLink = screen.getByRole('link', { name: 'seygorin' });
    const ksushaSherLink = screen.getByRole('link', { name: 'KsushaSher' });

    expect(intrstngLink).toHaveAttribute('href', 'https://github.com/intrstng');
    expect(seygorinLink).toHaveAttribute('href', 'https://github.com/seygorin');
    expect(ksushaSherLink).toHaveAttribute('href', 'https://github.com/ksushasher');
  });

  it('renders year text', () => {
    render(<Footer />);
    const yearText = screen.getByText((content) => content.includes('2024'));
    expect(yearText).toBeInTheDocument();
  });
});
