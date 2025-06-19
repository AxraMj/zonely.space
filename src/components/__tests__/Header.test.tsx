import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from '../Header';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '../ThemeProvider';

describe('Header Component', () => {
  const renderHeader = () => {
    return render(
      <ThemeProvider>
        <BrowserRouter>
          <Header />
        </BrowserRouter>
      </ThemeProvider>
    );
  };

  it('renders without crashing', () => {
    renderHeader();
    expect(document.body).toBeDefined();
  });

  it('contains navigation links', () => {
    renderHeader();
    expect(screen.getByRole('navigation')).toBeDefined();
  });

  it('contains the logo', () => {
    renderHeader();
    const logo = screen.getByAltText(/zonely/i);
    expect(logo).toBeDefined();
  });
}); 