import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toBeInTheDocument } from "@testing-library/jest-dom";

import DrinkApp from "../pages/DrinkApp";
import MockedDrinkRoulette from "../components/DrinkRoulette";

// Mock out the child component due to media elementss that should not be tested in drinkApp.
jest.mock("../components/DrinkRoulette", () => {
    return function DrinkRouletteDummy() {
        return (
            <div>
                <h1>Drink Wheel</h1>
                <button>spin</button>
            </div>
        )
    }
});

// Mock cavnas getContext function
HTMLCanvasElement.prototype.getContext = jest.fn();

describe("DrinkApp page", () => {
    test("It should render and buttons should be present", () => {
        const { getByText } = render(<DrinkApp />);

        getByText("Drink Randomizer");
        getByText("Roulette Wheel");
    });

    test("It should change components to drinkRandomizer on button clicks", () => {
        const { getByText } = render(<DrinkApp />);
        // Container should be flex
        expect(document.querySelector(".drinkAppChoices").style.display).toBe("flex");
        expect(document.querySelector(".drinkAppChoices").style.display).not.toBe("none");

        userEvent.click(getByText("Drink Randomizer"));
        // After clicking, container display should be none, not flex.
        expect(document.querySelector(".drinkAppChoices").style.display).toBe("none");
        expect(document.querySelector(".drinkAppChoices").style.display).not.toBe("flex");

        // Should show the words on drinkRandomizer component
        getByText("Mojito");
        getByText("Not sure what to order at the bar?");
    });

    test("It should change components to drinkRoullete on button clicks", () => {
        const { getByText } = render(<DrinkApp />);
        const DrinkRoulette = jest.fn();
        // Container should be flex
        expect(document.querySelector(".drinkAppChoices").style.display).toBe("flex");
        expect(document.querySelector(".drinkAppChoices").style.display).not.toBe("none");

        userEvent.click(getByText("Roulette Wheel"));
        // After clicking, container display should be none, not flex.
        expect(document.querySelector(".drinkAppChoices").style.display).toBe("none");
        expect(document.querySelector(".drinkAppChoices").style.display).not.toBe("flex");

        // Should show the words on drinkRandomizer component
        getByText("spin");
    });
});