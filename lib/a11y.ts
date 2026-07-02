import { useEffect, useCallback } from 'react';
import { KEYBOARD_SHORTCUTS } from '@/lib/constants';

/**
 * Keyboard shortcut handler
 */
export function useKeyboardShortcuts(
  shortcuts: Record<string, () => void>
): void {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        event.target instanceof HTMLSelectElement ||
        (event.target as HTMLElement)?.contentEditable === 'true'
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      const modifier = event.ctrlKey || event.metaKey;

      if (key === KEYBOARD_SHORTCUTS.focusSearch && !modifier) {
        event.preventDefault();
        shortcuts.focusSearch?.();
      } else if (key === KEYBOARD_SHORTCUTS.toggleGrid && !modifier) {
        event.preventDefault();
        shortcuts.toggleGrid?.();
      } else if (key === KEYBOARD_SHORTCUTS.toggleList && !modifier) {
        event.preventDefault();
        shortcuts.toggleList?.();
      } else if (key === KEYBOARD_SHORTCUTS.clearFocus && !modifier) {
        event.preventDefault();
        shortcuts.clearFocus?.();
      } else if (key === KEYBOARD_SHORTCUTS.openMobileMenu && !modifier) {
        event.preventDefault();
        shortcuts.openMobileMenu?.();
      }
    },
    [shortcuts]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}

/**
 * Focus management utilities
 */
export function focusElement(selector: string): void {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.focus();
  }
}

export function focusSearchInput(): void {
  focusElement('[data-testid="search-input"]');
}

export function clearFocus(): void {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur();
  }
}

/**
 * ARIA utilities
 */
export function getAriaLabel(text: string, context?: string): string {
  return context ? `${text} ${context}` : text;
}

export function getAriaDescribedBy(...ids: string[]): string {
  return ids.filter(Boolean).join(' ');
}

/**
 * Screen reader utilities
 */
export function announceToScreenReader(message: string): void {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

/**
 * Focus trap for modals
 */
export function useFocusTrap(isActive: boolean): void {
  useEffect(() => {
    if (!isActive) return;

    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
    };
  }, [isActive]);
}

/**
 * Skip link functionality
 */
export function createSkipLink(targetId: string, text: string): HTMLElement {
  const skipLink = document.createElement('a');
  skipLink.href = `#${targetId}`;
  skipLink.textContent = text;
  skipLink.className = 'skip-link';
  skipLink.setAttribute('data-testid', 'skip-link');

  return skipLink;
}

/**
 * High contrast mode detection
 */
export function useHighContrastMode(): boolean {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-contrast: high)').matches;
}

/**
 * Reduced motion detection
 */
export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Color scheme detection
 */
export function useColorScheme(): 'light' | 'dark' | 'no-preference' {
  if (typeof window === 'undefined') return 'no-preference';

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }

  return 'no-preference';
}

/**
 * Touch device detection
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;

  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Generate unique ID for ARIA relationships
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate ARIA attributes
 */
export function validateAriaAttributes(element: HTMLElement): string[] {
  const errors: string[] = [];

  if (
    element.getAttribute('aria-label') &&
    element.getAttribute('aria-labelledby')
  ) {
    errors.push('Element has both aria-label and aria-labelledby');
  }

  if (element.getAttribute('aria-describedby')) {
    const describedBy = element.getAttribute('aria-describedby');
    const describedElement = document.getElementById(describedBy!);
    if (!describedElement) {
      errors.push(
        `Element referenced by aria-describedby not found: ${describedBy}`
      );
    }
  }

  return errors;
}
