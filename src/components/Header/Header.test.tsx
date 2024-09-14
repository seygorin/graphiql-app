import type { ImageProps } from 'next/image';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ROUTES from '../../shared/types/types';
import Header from './Header';

vi.mock('../../theme/theme', () => ({
  default: {
    breakpoints: {
      down: () => () => false,
    },
  },
  ADDITION_COLOR: {
    headerHeight: '80px',
    backgroundMain: '#ffffff',
    borderFooter: '#000000',
  },
}));

vi.mock('next/image', () => ({
  default: (props: ImageProps) => <div data-testid='next-image' {...props} />,
}));

vi.mock('@mui/material', () => {
  const actual = vi.importActual('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(() => false),
    Container: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div data-testid='mui-container' {...props}>
        {children}
      </div>
    ),
    Box: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div data-testid='mui-box' {...props}>
        {children}
      </div>
    ),
    Stack: ({ children, ...props }: React.ComponentProps<'div'>) => (
      <div data-testid='mui-stack' {...props}>
        {children}
      </div>
    ),
  };
});

vi.mock('./Avatar', () => ({
  default: () => <div data-testid='avatar'>Avatar</div>,
}));

vi.mock('./SelectLanguage', () => ({
  default: () => <div data-testid='select-language'>SelectLanguage</div>,
}));

vi.mock('./Buttons', () => ({
  default: () => <div data-testid='buttons'>Buttons</div>,
}));

vi.mock('./FadeMenu', () => ({
  default: () => <div data-testid='fade-menu'>FadeMenu</div>,
}));

describe('Header', () => {
  it('renders the logo correctly', () => {
    render(<Header />);
    const logoImage = screen.getByTestId('next-image');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('alt', 'logoRsSchool');
    expect(logoImage).toHaveAttribute('src', '/public/logo-rsschool3.png');
  });

  it('renders the link to the main page', () => {
    render(<Header />);
    const homeLink = screen.getByRole('link');
    expect(homeLink).toHaveAttribute('href', ROUTES.MAIN_PAGE);
  });

  it('renders the Avatar component', () => {
    render(<Header />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders the SelectLanguage component on large screens', () => {
    render(<Header />);
    expect(screen.getByTestId('select-language')).toBeInTheDocument();
  });

  it('renders the Buttons component on large screens', () => {
    render(<Header />);
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
  });

  it('does not render FadeMenu on large screens', () => {
    render(<Header />);
    expect(screen.queryByTestId('fade-menu')).not.toBeInTheDocument();
  });
});
