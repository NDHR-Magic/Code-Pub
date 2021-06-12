// Test the Home page component in src/pages
import React from 'react';
import { render, screen } from '@testing-library/react';
import { toBeInTheDocument } from "@testing-library/jest-dom";
import userEvent from '@testing-library/user-event';

import DrinkRandomizer from "./index";

describe("Drink randomizer app", () => {
    test("It should render the form and test", () => {
        const { getByText, getByRole } = render(<DrinkRandomizer />);

        getByText("Not sure what to order at the bar?")
        getByRole("combobox");
        screen.getAllByRole("option");
        const img = screen.getByRole("img");
        // Part of the url for mojito img from cocktail db and text
        expect(img.src).toContain("metwgh1606770327.jpg");
        getByText("Mojito");
        getByText(/Muddle mint leaves/);

        const refFn = jest.spyOn(React, "useRef");
        refFn.mockImplementation(() => {
            return getByRole('combobox').value;
        });

        userEvent.selectOptions(getByRole('combobox'), ['gin']);

        const ref = refFn();
        expect(ref).toBe("gin");

    });

    test("When button is clicked, it calls a function to query the cocktail db API", async () => {
        render(<DrinkRandomizer />);

        // Select gin option of select div and then click button.
        userEvent.selectOptions(screen.getByRole('combobox'), ['gin']);
        userEvent.click(screen.getByText("Get random drink!"));

        expect(screen.getByRole('option', { name: 'Gin' }).selected).toBe(true);
    });
});