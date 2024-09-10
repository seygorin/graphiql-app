import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import logo from 'public/logo-rsschool3.png';
import ROUTES from '../../shared/types/types';
import Header from './Header';

vi.mock('next/image', () => ({
  default: ({
    src,
    width,
    height,
    alt,
  }: {
    src: string;
    width: number;
    height: number;
    alt: string;
  }) => <img src={src} width={width} height={height} alt={alt} />,
}));

vi.mock('next/link', () => ({
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

vi.mock('./Buttons', () => ({
  default: () => <div>Buttons</div>,
}));

vi.mock('./SelectLanguage', () => ({
  default: () => <div>SelectLanguage</div>,
}));

vi.mock('./Header.module.scss', () => ({
  default: {
    header_wrapper: 'header_wrapper',
    header: 'header',
  },
}));

describe('Header', () => {
  test('renders the logo and links correctly', () => {
    render(<Header />);
    const logoImage = screen.getByAltText('logoRsSchool');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('src', logo);
    expect(logoImage).toHaveAttribute('width', '110');
    expect(logoImage).toHaveAttribute('height', '40');

    const link = screen.getByRole('link', { name: 'logoRsSchool' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', ROUTES.MAIN_PAGE);
    expect(screen.getByText('SelectLanguage')).toBeInTheDocument();
    expect(screen.getByText('Buttons')).toBeInTheDocument();
  });
});
