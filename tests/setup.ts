import '@testing-library/jest-dom';
import React from 'react';
import { vi } from 'vitest';

global.React = React;

const originalError = console.error;
const originalWarn = console.warn;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.error = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: An update to') ||
      args[0].includes('was not wrapped in act') ||
      args[0].includes('Warning: ReactDOM.render is no longer supported'))
  ) {
    return;
  }
  originalError.call(console, ...args);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
console.warn = (...args: any[]) => {
  if (
    typeof args[0] === 'string' &&
    (args[0].includes('Warning: An update to') ||
      args[0].includes('was not wrapped in act'))
  ) {
    return;
  }
  originalWarn.call(console, ...args);
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
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
