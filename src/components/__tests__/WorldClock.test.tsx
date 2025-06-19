import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { WorldClock } from '../WorldClock';

describe('WorldClock Component', () => {
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
    render(<WorldClock />);
    expect(screen.getByText(/add country\/city/i)).toBeDefined();
  });

  it('renders default time zones', () => {
    render(<WorldClock />);
    expect(screen.getByText('New York')).toBeDefined();
    expect(screen.getByText('London')).toBeDefined();
    expect(screen.getByText('Tokyo')).toBeDefined();
  });

  it('allows searching for new locations', async () => {
    render(<WorldClock />);
    const searchInput = screen.getByPlaceholderText(/search for any country or city/i);
    fireEvent.change(searchInput, { target: { value: 'paris' } });
    fireEvent.focus(searchInput);
    
    // Wait for the search results to appear
    await vi.waitFor(() => {
      const searchResults = screen.getByRole('listbox');
      expect(searchResults).toBeDefined();
    });
  });

  it('shows search results when input is focused', () => {
    render(<WorldClock />);
    const searchInput = screen.getByPlaceholderText(/search for any country or city/i);
    fireEvent.focus(searchInput);
    expect(screen.getByRole('listbox')).toBeDefined();
  });

  it('allows removing time zones', () => {
    render(<WorldClock />);
    const removeButtons = screen.getAllByRole('button', { name: /remove/i }); // Update to match aria-label
    fireEvent.click(removeButtons[0]); // Click the first remove button
    expect(screen.queryByText('New York')).toBeNull();
  });

  it('displays analog clocks for each time zone', () => {
    render(<WorldClock />);
    // Each time zone should have an analog clock
    // We need to filter out other SVG icons (like the plus icon and search icon)
    const analogClocks = Array.from(document.querySelectorAll('svg')).filter(
      svg => svg.getAttribute('width') === '140' && svg.getAttribute('height') === '140'
    );
    expect(analogClocks.length).toBe(3); // 3 default time zones
  });

  it('displays digital time for each time zone', () => {
    render(<WorldClock />);
    const timeElements = screen.getAllByText(/\d{1,2}:\d{2}:\d{2} [AP]M/);
    expect(timeElements).toHaveLength(3); // 3 default time zones
  });

  it('displays timezone information', () => {
    render(<WorldClock />);
    expect(screen.getByText('America/New York')).toBeDefined();
    expect(screen.getByText('Europe/London')).toBeDefined();
    expect(screen.getByText('Asia/Tokyo')).toBeDefined();
  });
}); 