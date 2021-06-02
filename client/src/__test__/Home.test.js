// Test the Home page component in src/pages
import React from 'react';
import { getByText, render, screen } from '@testing-library/react';

import Home from "../pages/Home";

describe("Home page", () => {
    test("It renders welcoming text", () => {
        render(<Home />);

        expect(document.querySelector("h2").textContent).toBe("Featured Event");
    });
});