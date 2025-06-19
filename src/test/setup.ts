import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Mock localStorage
const store = new Map();
const localStorageMock = {
  getItem: vi.fn((key) => store.get(key) || null),
  setItem: vi.fn((key, value) => store.set(key, value)),
  clear: vi.fn(() => store.clear()),
  removeItem: vi.fn((key) => store.delete(key)),
  key: vi.fn((index) => Array.from(store.keys())[index] || null),
  get length() { return store.size; },
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock ResizeObserver
class ResizeObserverMock {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.ResizeObserver = ResizeObserverMock;

// Mock window.resizeTo
window.resizeTo = vi.fn();

// Mock window.scrollTo
window.scrollTo = vi.fn();

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
  store.clear();
  vi.clearAllMocks();
}); 