import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AnalogClock } from '../AnalogClock';

describe('AnalogClock Component', () => {
  const defaultProps = {
    timezone: 'UTC'
  };

  it('renders without crashing', () => {
    render(<AnalogClock {...defaultProps} />);
    expect(document.querySelector('svg')).toBeDefined();
  });

  it('renders clock hands', () => {
    render(<AnalogClock {...defaultProps} />);
    expect(document.querySelector('line[stroke-width="4"]')).toBeDefined(); // Hour hand
    expect(document.querySelector('line[stroke-width="3"]')).toBeDefined(); // Minute hand
    expect(document.querySelector('line[stroke="rgb(239 68 68)"]')).toBeDefined(); // Second hand
  });

  it('renders clock numbers by default', () => {
    render(<AnalogClock {...defaultProps} />);
    const numbers = ['12', '3', '6', '9'];
    numbers.forEach(number => {
      expect(screen.getByText(number)).toBeDefined();
    });
  });

  it('respects showNumbers prop', () => {
    render(<AnalogClock {...defaultProps} showNumbers={false} />);
    expect(screen.queryByText('12')).toBeNull();
  });

  it('applies custom size', () => {
    const customSize = 200;
    render(<AnalogClock {...defaultProps} size={customSize} />);
    const svg = document.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe(customSize.toString());
    expect(svg?.getAttribute('height')).toBe(customSize.toString());
  });
}); 