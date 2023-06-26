import "@testing-library/jest-dom/extend-expect";

import { server } from "./mocks/server";

jest.mock("swiper/css", jest.fn());

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  server.resetHandlers();
  jest.clearAllMocks();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
