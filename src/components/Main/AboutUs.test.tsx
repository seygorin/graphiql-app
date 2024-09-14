import type { ImageProps } from 'next/image';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AboutUs from './AboutUs';

const getImageSrc = (src: ImageProps['src']): string => {
  if (typeof src === 'string') {
    return src;
  }
  if (typeof src === 'object' && src !== null) {
    if ('default' in src) {
      return (src.default as { src: string }).src;
    }
    if ('src' in src) {
      return src.src as string;
    }
  }
  return '';
};

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));

vi.mock('next/image', () => ({
  default: ({ src, alt, width, height, ...props }: ImageProps) => {
    return (
      <div
        data-testid='next-image'
        data-src={getImageSrc(src)}
        data-alt={alt}
        data-width={width?.toString()}
        data-height={height?.toString()}
        {...props}
      />
    );
  },
}));

vi.mock('./styles.aboutUs', () => ({
  STYLES: {
    wrapper: {},
    title: {},
    cards: {},
    card: {},
    img: {},
    cardsInfo: {},
    devName: {},
    devText: {},
  },
}));

describe('AboutUs', () => {
  it('renders AboutUs component', () => {
    render(<AboutUs />);
    expect(screen.getByText('aboutUs.titleTeam')).toBeInTheDocument();
  });

  it('renders three developer cards', () => {
    render(<AboutUs />);
    const cards = screen.getAllByTestId('next-image');
    expect(cards).toHaveLength(3);
  });

  it('renders developer names and descriptions', () => {
    render(<AboutUs />);
    expect(screen.getByText('aboutUs.name1')).toBeInTheDocument();
    expect(screen.getByText('aboutUs.dev1')).toBeInTheDocument();
    expect(screen.getByText('aboutUs.name2')).toBeInTheDocument();
    expect(screen.getByText('aboutUs.dev2')).toBeInTheDocument();
    expect(screen.getByText('aboutUs.name3')).toBeInTheDocument();
    expect(screen.getByText('aboutUs.dev3')).toBeInTheDocument();
  });

  it('renders project title and description', () => {
    render(<AboutUs />);
    expect(screen.getByText('aboutUs.titleProject')).toBeInTheDocument();
    expect(screen.getByText('aboutUs.project')).toBeInTheDocument();
  });

  it('renders course title and description', () => {
    render(<AboutUs />);
    expect(screen.getByText('aboutUs.titleCourse')).toBeInTheDocument();
    expect(screen.getByText('aboutUs.course')).toBeInTheDocument();
  });

  it('renders images with correct attributes', () => {
    render(<AboutUs />);
    const images = screen.getAllByTestId('next-image');
    images.forEach((img) => {
      expect(img).toHaveAttribute('data-alt', 'developer avatar');
      expect(img).toHaveAttribute('data-width', '300');
    });
  });
});
