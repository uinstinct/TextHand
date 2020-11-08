import "@testing-library/jest-dom/extend-expect";

jest.requireActual("semantic-ui-react");

const localStorageMock = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
};
global.localStorage = localStorageMock;