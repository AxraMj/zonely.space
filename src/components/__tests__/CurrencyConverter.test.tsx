import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { CurrencyConverter } from '../CurrencyConverter';

describe('CurrencyConverter Component', () => {
  it('renders without crashing', () => {
    render(<CurrencyConverter />);
    expect(screen.getByText(/currency converter/i)).toBeDefined();
  });

  it('contains input fields and currency selectors', () => {
    render(<CurrencyConverter />);
    expect(screen.getByPlaceholderText(/enter amount/i)).toBeDefined();
    expect(screen.getByText('From')).toBeDefined();
    expect(screen.getByText('To')).toBeDefined();
  });

  it('allows user to enter amount', () => {
    render(<CurrencyConverter />);
    const amountInput = screen.getByPlaceholderText(/enter amount/i) as HTMLInputElement;
    fireEvent.change(amountInput, { target: { value: '100' } });
    expect(amountInput.value).toBe('100');
  });

  it('displays initial currency values', () => {
    render(<CurrencyConverter />);
    expect(screen.getByText(/USD - US Dollar/i)).toBeDefined();
    expect(screen.getByText(/EUR - Euro/i)).toBeDefined();
  });

  it('displays exchange rate information', () => {
    render(<CurrencyConverter />);
    expect(screen.getByText('2025 Live exchange rates')).toBeDefined();
  });
}); 