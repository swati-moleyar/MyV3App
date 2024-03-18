// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";

/* eslint-disable no-undef */

// https://jestjs.io/docs/en/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
// https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const storageValues = {
  oauthToken: "12345",
} as { [k: string]: any };

const localStorageMock = {
  getItem: jest.fn(x => storageValues[x]),
  setItem: jest.fn((x, y) => {
    storageValues[x] = y;
  }),
  removeItem: jest.fn(),
  clear: jest.fn(),
};

Object.defineProperty(window, "localStorage", localStorageMock);
Object.defineProperty(window, "sessionStorage", localStorageMock);

// Hide informational errors (not real errors)
const consoleError = console.error.bind(console);
console.error = (message: any, ...args: any[]) => {
  if (typeof message === "string" && message.startsWith("Error: Not implemented: navigation")) return;
  consoleError(message, ...args);
};

const consoleWarn = console.warn.bind(console);
console.warn = (message: any, ...args: any[]) => {
  if (typeof message === "string" && message.startsWith("[react-ga]")) return;
  consoleWarn(message, ...args);
};
