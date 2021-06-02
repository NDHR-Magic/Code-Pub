// Test the About page component in src/pages
import React from 'react';
import { getByText, render, screen } from '@testing-library/react';

import About from "../pages/About";

describe("About us page", () => {
    test("It renders about us info", () => {
        render(<About />);

        screen.getByText("Our Story");
        screen.getByText(/Code Pub was founded by/);
        screen.getByText(/Find us at/);
    });
    test("It renders imgs and has alt text and correct src", () => {
        render(<About />);

        screen.getByAltText("Code");
        const image = screen.getByAltText("Code");
        expect(image.src).toContain('Images/About-us-code.jpeg');
    });
});