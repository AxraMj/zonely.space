import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Footer } from '../Footer';
import { BrowserRouter } from 'react-router-dom';

// Mock window.location.href
const mockAssign = vi.fn();
Object.defineProperty(window, 'location', {
  value: { href: mockAssign },
  writable: true
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

describe('Footer Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const renderFooter = () => {
    return render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );
  };

  it('renders without crashing', () => {
    renderFooter();
    expect(screen.getByText(/your all-in-one platform/i)).toBeDefined();
  });

  it('renders all tool links', () => {
    renderFooter();
    const timeConverter = screen.getByRole('button', { name: 'Time Converter' });
    const worldClock = screen.getByRole('button', { name: 'World Clock' });
    const currencyConverter = screen.getByRole('button', { name: 'Currency Converter' });
    const meetingPlanner = screen.getByRole('button', { name: 'Meeting Planner' });

    expect(timeConverter).toBeDefined();
    expect(worldClock).toBeDefined();
    expect(currencyConverter).toBeDefined();
    expect(meetingPlanner).toBeDefined();
  });

  it('renders all legal links', () => {
    renderFooter();
    const privacyPolicy = screen.getByRole('button', { name: 'Privacy Policy' });
    const termsOfService = screen.getByRole('button', { name: 'Terms of Service' });
    const cookiePolicy = screen.getByRole('button', { name: 'Cookie Policy' });

    expect(privacyPolicy).toBeDefined();
    expect(termsOfService).toBeDefined();
    expect(cookiePolicy).toBeDefined();
  });

  it('renders support section', () => {
    renderFooter();
    const contactUs = screen.getByRole('button', { name: /contact us/i });
    const helpCenter = screen.getByRole('button', { name: 'Help Center' });

    expect(contactUs).toBeDefined();
    expect(helpCenter).toBeDefined();
  });

  it('renders social media links', () => {
    renderFooter();
    const linkedin = screen.getByRole('link', { name: /linkedin/i });
    const telegram = screen.getByRole('link', { name: /telegram/i });

    expect(linkedin).toBeDefined();
    expect(telegram).toBeDefined();
  });

  it('handles email click', () => {
    renderFooter();
    const emailButton = screen.getByRole('button', { name: /contact us/i });
    fireEvent.click(emailButton);
    expect(window.location.href).toBe('mailto:support@zonely.space');
  });

  it('handles tool navigation', async () => {
    // Mock getElementById
    const mockElement = document.createElement('div');
    const getElementByIdSpy = vi.spyOn(document, 'getElementById');
    getElementByIdSpy.mockReturnValue(mockElement);

    renderFooter();
    const timeConverterButton = screen.getByRole('button', { name: 'Time Converter' });
    fireEvent.click(timeConverterButton);
    
    // Advance timers
    await vi.runAllTimersAsync();
    
    // Now check if scrollIntoView was called
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('renders copyright notice', () => {
    renderFooter();
    expect(screen.getByText(/© 2025 zonely\.space\. all rights reserved\./i)).toBeDefined();
  });

  it('renders made with love message', () => {
    renderFooter();
    const container = screen.getByText(/made with/i).parentElement;
    expect(container).toHaveTextContent(/for global productivity/i);
  });
}); 