import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { CookieConsent } from '../CookieConsent';

describe('CookieConsent Component', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('does not show consent banner initially', () => {
    render(<CookieConsent />);
    expect(screen.queryByText('Cookie Consent')).toBeNull();
  });

  it('shows consent banner after delay', async () => {
    render(<CookieConsent />);
    
    // Fast-forward time by 2 seconds
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(screen.getByText('Cookie Consent')).toBeDefined();
  });

  it('can accept cookies', async () => {
    render(<CookieConsent />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    const acceptButton = screen.getByText('Accept');
    fireEvent.click(acceptButton);
    
    // Banner should be hidden
    expect(screen.queryByText('Cookie Consent')).toBeNull();
    
    // LocalStorage should be updated
    expect(localStorage.getItem('cookie-consent')).toBe('accepted');
  });

  it('can reject cookies', async () => {
    render(<CookieConsent />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    const rejectButton = screen.getByText('Reject');
    fireEvent.click(rejectButton);
    
    // Banner should be hidden
    expect(screen.queryByText('Cookie Consent')).toBeNull();
    
    // LocalStorage should be updated
    expect(localStorage.getItem('cookie-consent')).toBe('rejected');
  });

  it('can dismiss banner without making a choice', async () => {
    render(<CookieConsent />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    const closeButton = screen.getByRole('button', { name: '' }); // The X button has no accessible name
    fireEvent.click(closeButton);
    
    // Banner should be hidden
    expect(screen.queryByText('Cookie Consent')).toBeNull();
    
    // LocalStorage should not be updated
    expect(localStorage.getItem('cookie-consent')).toBeNull();
  });

  it('does not show banner if consent was previously given', () => {
    localStorage.setItem('cookie-consent', 'accepted');
    render(<CookieConsent />);
    
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    
    expect(screen.queryByText('Cookie Consent')).toBeNull();
  });
}); 