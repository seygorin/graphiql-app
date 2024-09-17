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
    devRole: {},
  },
}));

describe('AboutUs', () => {
  it('renders AboutUs component', () => {
    render(<AboutUs />);
    expect(screen.getByText('titleTeam')).toBeInTheDocument();
  });

  it('renders three developer cards', () => {
    render(<AboutUs />);
    const cards = screen.getAllByTestId('next-image');
    expect(cards).toHaveLength(3);
  });

  it('renders developer names, descriptions, and roles', () => {
    render(<AboutUs />);
    expect(screen.getByText('name1')).toBeInTheDocument();
    expect(screen.getByText('dev1')).toBeInTheDocument();
    expect(screen.getByText('role1')).toBeInTheDocument();
    expect(screen.getByText('name2')).toBeInTheDocument();
    expect(screen.getByText('dev2')).toBeInTheDocument();
    expect(screen.getByText('role2')).toBeInTheDocument();
    expect(screen.getByText('name3')).toBeInTheDocument();
    expect(screen.getByText('dev3')).toBeInTheDocument();
    expect(screen.getByText('role3')).toBeInTheDocument();
  });

  it('renders project title and description', () => {
    render(<AboutUs />);
    expect(screen.getByText('titleProject')).toBeInTheDocument();
    expect(screen.getByText('project')).toBeInTheDocument();
  });

  it('renders course title and description', () => {
    render(<AboutUs />);
    expect(screen.getByText('titleCourse')).toBeInTheDocument();
    expect(screen.getByText('course')).toBeInTheDocument();
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
