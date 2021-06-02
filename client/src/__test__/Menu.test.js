import React from "react";
import { render, cleanup, queryByText, findByRole } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import Menu from "../pages/Menu";
import * as API from "../utils/MenuAPI";

afterEach(cleanup);


describe("Menu page", () => {
    test("It should render with food items by default", async () => {
        const foodMock = jest.spyOn(API, "getFood");
        // Mock function that calls axios to get food data from backend.
        foodMock.mockImplementation(() => {
            return Promise.resolve({
                data: [
                    {
                        "id": 1,
                        "name": "React Burger",
                        "image": "./Images/MenuItems/ReactBurger.png",
                        "price": 13.99,
                        "description": "Our delicious React branded burger comes with side of fries and a pickle."
                    },
                    {
                        "id": 2,
                        "name": "Hot wings",
                        "image": "./Images/MenuItems/Wings.jpg",
                        "price": 10.99,
                        "description": "10 wings smothered in our special hot wing sauce."
                    }
                ]
            });
        });

        const { findByText, queryByText } = render(<Menu />);

        await findByText("React Burger");
        expect(queryByText("White Russian")).not.toBeInTheDocument();
    });

    test("If drink menu is selected, render drink options", async () => {
        const foodMock = jest.spyOn(API, "getFood");
        foodMock.mockImplementation(() => {
            return Promise.resolve({
                data: [
                    {
                        "id": 1,
                        "name": "React Burger",
                        "image": "./Images/MenuItems/ReactBurger.png",
                        "price": 13.99,
                        "description": "Our delicious React branded burger comes with side of fries and a pickle."
                    }
                ]
            });
        });

        const drinkMock = jest.spyOn(API, "getDrinks");
        drinkMock.mockImplementation(() => {
            return Promise.resolve({
                data: [
                    {
                        "id": 1,
                        "name": "White Russian",
                        "image": "./Images/MenuItems/chocolate-white-russian-3-1.jpeg",
                        "description": "A classic White Russian made with Vodka, coffee liqueur, and cream."
                    },
                    {
                        "id": 2,
                        "name": "Gibson",
                        "image": "./Images/MenuItems/Gibson.jpg",
                        "description": "Traditional Gibson made with Gin, dry Vermouth and garnished with pickled onion."
                    }
                ]
            });
        });
        const { getByText, findByText, queryByText, getByRole } = render(<Menu />);

        // userEvent to check drink menu
        userEvent.click(getByRole("checkbox"));

        await findByText("White Russian");
        expect(queryByText("React Burger")).not.toBeInTheDocument();

        // Click again to go back to food
        userEvent.click(getByRole("checkbox"));

        getByText("React Burger");
        expect(queryByText("White Russian")).not.toBeInTheDocument();
    });
});