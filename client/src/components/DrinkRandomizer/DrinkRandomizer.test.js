// Test the Home page component in src/pages
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import DrinkRandomizer from "./index";

describe("Drink randomizer app", () => {
    test("It should render the form and test", () => {
        render(<DrinkRandomizer />);

        screen.getByText("Not sure what to order at the bar?")
        screen.getByRole("combobox");
        screen.getAllByRole("option");
        const img = screen.getByRole("img");
        // Part of the url for mojito img from cocktail db and text
        expect(img.src).toContain("metwgh1606770327.jpg");
        screen.getByText("Mojito");
        screen.getByText(/Muddle mint leaves/);
    });

    test("When button is clicked, it calls a function to query the cocktail db API", () => {
        render(<DrinkRandomizer />);

        // Select gin option of select div and then click button.
        userEvent.selectOptions(screen.getByRole('combobox'), ['gin']);
        userEvent.click(screen.getByText("Get random drink!"));

        expect(screen.getByRole('option', { name: 'Gin' }).selected).toBe(true);
    });
});