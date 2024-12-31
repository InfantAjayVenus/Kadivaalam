import '@testing-library/jest-dom';
import {describe, it, beforeEach, beforeAll} from "vitest";

beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
});