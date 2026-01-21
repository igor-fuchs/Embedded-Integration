import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock of react-i18next
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key: string) => key,
    }),
}));

// Mock IntersectionObserver with callback trigger
class MockIntersectionObserver {
  callback: IntersectionObserverCallback;
  elements: Set<Element> = new Set();

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
    // Trigger callback automatically after a short delay
    setTimeout(() => {
      this.elements.forEach((element) => {
        this.callback(
          [
            {
              isIntersecting: true,
              target: element,
              intersectionRatio: 1,
              boundingClientRect: {} as DOMRectReadOnly,
              intersectionRect: {} as DOMRectReadOnly,
              rootBounds: null,
              time: Date.now(),
            },
          ] as IntersectionObserverEntry[],
          this as unknown as IntersectionObserver
        );
      });
    }, 100);
  }

  observe = vi.fn((element: Element) => {
    this.elements.add(element);
  });

  unobserve = vi.fn((element: Element) => {
    this.elements.delete(element);
  });

  disconnect = vi.fn(() => {
    this.elements.clear();
  });

  takeRecords = vi.fn(() => []);
  root = null;
  rootMargin = '';
  thresholds = [];
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});