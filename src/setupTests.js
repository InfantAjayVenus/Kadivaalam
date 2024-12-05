import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {describe, it, beforeEach, beforeAll} from "vitest";

beforeAll(() => {
    global.ResizeObserver = class ResizeObserver {
        observe() {}
        unobserve() {}
        disconnect() {}
    }
});