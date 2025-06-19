import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TimeConverter } from '../TimeConverter';

describe('TimeConverter Component', () => {
  beforeEach(() => {
    // Mock the Date object to return a fixed time
    const mockDate = new Date('2024-01-01T12:00:00Z');
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders without crashing', () => {
    render(<TimeConverter />);
    expect(screen.getByText(/time converter/i)).toBeDefined();
  });

  it('renders location selectors', () => {
    render(<TimeConverter />);
    expect(screen.getByText('From')).toBeDefined();
    expect(screen.getByText('To')).toBeDefined();
    expect(screen.getAllByText('Select location')).toHaveLength(2);
  });

  it('renders time input', () => {
    render(<TimeConverter />);
    const timeInput = screen.getByLabelText(/time to convert/i);
    expect(timeInput).toBeDefined();
  });

  it('initializes with current time', () => {
    render(<TimeConverter />);
    const timeInput = screen.getByLabelText(/time to convert/i) as HTMLInputElement;
    expect(timeInput.value).toBe('12:00');
  });

  it('allows time input changes', () => {
    render(<TimeConverter />);
    const timeInput = screen.getByLabelText(/time to convert/i) as HTMLInputElement;
    fireEvent.change(timeInput, { target: { value: '15:30' } });
    expect(timeInput.value).toBe('15:30');
  });

  it('shows location search when clicking selectors', () => {
    render(<TimeConverter />);
    const [fromButton, toButton] = screen.getAllByText('Select location');
    
    fireEvent.click(fromButton);
    expect(screen.getByPlaceholderText('Search locations...')).toBeDefined();
    
    // Close the first popover by clicking outside
    fireEvent.click(document.body);
    
    fireEvent.click(toButton);
    expect(screen.getByPlaceholderText('Search locations...')).toBeDefined();
  });
}); 