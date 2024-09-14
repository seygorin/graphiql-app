import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Resizer from './Resizer';

describe('Resizer', () => {
  const mockOnMouseDown = vi.fn();
  const theme = createTheme();

  const renderResizer = () => {
    return render(
      <ThemeProvider theme={theme}>
        <Resizer onMouseDown={mockOnMouseDown} />
      </ThemeProvider>,
    );
  };

  it('renders Resizer component', () => {
    renderResizer();
    const resizer = screen.getByTestId('resizer');
    expect(resizer).toBeInTheDocument();
  });

  it('calls onMouseDown when mouse down event occurs', () => {
    renderResizer();
    const resizer = screen.getByTestId('resizer');
    fireEvent.mouseDown(resizer);
    expect(mockOnMouseDown).toHaveBeenCalledTimes(1);
  });

  it('has correct initial styles', () => {
    renderResizer();
    const resizer = screen.getByTestId('resizer');
    expect(resizer).toHaveStyle(`
      width: 8px;
      cursor: col-resize;
    `);
  });
});
