import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import AccountMenu from './FadeMenu';

vi.mock('@mui/icons-material/MenuRounded', () => ({
  default: () => <div data-testid='menu-icon' />,
}));

vi.mock('./Buttons', () => ({
  default: () => <div data-testid='buttons' />,
}));

vi.mock('./SelectLanguage', () => ({
  default: () => <div data-testid='select-language' />,
}));

describe('AccountMenu', () => {
  it('renders AccountMenu component', () => {
    render(<AccountMenu />);
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('opens menu when icon button is clicked', () => {
    render(<AccountMenu />);
    const iconButton = screen.getByRole('button');
    fireEvent.click(iconButton);
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders SelectLanguage component in menu', () => {
    render(<AccountMenu />);
    const iconButton = screen.getByRole('button');
    fireEvent.click(iconButton);
    expect(screen.getByTestId('select-language')).toBeInTheDocument();
  });

  it('renders Buttons component in menu', () => {
    render(<AccountMenu />);
    const iconButton = screen.getByRole('button');
    fireEvent.click(iconButton);
    expect(screen.getByTestId('buttons')).toBeInTheDocument();
  });

  it('closes menu when menu item is clicked', () => {
    render(<AccountMenu />);
    const iconButton = screen.getByRole('button');
    fireEvent.click(iconButton);
    const menuItems = screen.getAllByRole('menuitem');
    fireEvent.click(menuItems[0]);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });
});
