import * as react from "react";
import { cleanup, screen, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import axios from "axios";

import Profile from "../pages/profile";

jest.mock("axios");
console.error = jest.fn();

describe("Profile page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');

    beforeEach(() => {
        useSelectorMock.mockReset();
        useSelectorMock.mockReturnValue({ userInfo: { username: "Jest username" } });
    })
    afterEach(cleanup);

    test("It should render and display userData and render no orders if user has none as well as no favorite drinks if no favorite drinks", async () => {
        axios.get.mockReturnValue({
            data: {
                id: 1, user: {
                    username: "Jest username", first_name: "Jest", last_name: "Test",
                    favoriteDrinks: [],
                    orders: [],
                },
                events: []
            }
        });

        const { findByText, getByText, getAllByText } = render(
            <Router><Profile /></Router>
        );

        expect(useSelectorMock).toHaveBeenCalled();

        // User info
        await findByText("Jest username");
        getAllByText("Jest Test");
        // Drink info
        getByText("User has no favorited drinks.");
        // Orders (none should exist)
        getByText("No orders yet!");
        // Events. Should mention attending none
        getByText("Not attending any events.");
    });

    test("Should render drinks if user has a favorite drink list", async () => {
        axios.get.mockReturnValue({
            data: {
                id: 1, user: {
                    username: "Jest username", first_name: "Jest", last_name: "Test",
                    favoriteDrinks: [{ id: 1, name: "Jest Drink", description: "Jest desc" }],
                    orders: [],
                },
                events: []
            }
        });

        const { findByText, getByText, getAllByText, queryByText } = render(
            <Router><Profile /></Router>
        );

        expect(useSelectorMock).toHaveBeenCalled();

        // User info
        await findByText("Jest username");
        getAllByText("Jest Test");

        // Drinks
        expect(queryByText("User has no favorited drinks.")).not.toBeInTheDocument();
        getByText("Jest Drink");
        getByText("Jest desc");

        // Orders
        getByText("No orders yet!");
    });

    test("It should display order info if exists", async () => {
        axios.get.mockReturnValue({
            data: {
                id: 1, user: {
                    username: "Jest username", first_name: "Jest", last_name: "Test",
                    favoriteDrinks: [],
                    orders: [{
                        id: 1, updatedAt: Date.now, orderItems: [
                            { qty: 2, item: { name: "Jest shot glass", price: 9.99, image: "Image" } },
                            { qty: 3, item: { name: "Jest T-shirt", price: 20.99, image: "Image2" } }
                        ]
                    }],
                },
                events: []
            }
        });

        const { getAllByText, getByAltText, queryByText, findByAltText } = render(
            <Router><Profile /></Router>
        );

        expect(useSelectorMock).toHaveBeenCalled();

        expect(queryByText("No orders yet!")).not.toBeInTheDocument();

        await findByAltText("Jest shot glass");
        getByAltText("Jest T-shirt");
        getAllByText("2 x $9.99");
        getAllByText("3 x $20.99");
    });

    test("It should list events signed up for", async () => {
        axios.get.mockReturnValue({
            data: {
                id: 1, user: {
                    username: "Jest username", first_name: "Jest", last_name: "Test",
                    favoriteDrinks: [],
                    orders: [],
                },
                events: [{ title: "Jest event 1", createdAt: Date.now }, { title: "Jest event 2" }]
            }
        });

        const { queryByText, findByText, getByText } = render(
            <Router><Profile /></Router>
        );

        await findByText("Jest event 1");
        getByText("Jest event 2");
        expect(queryByText("Not attending any events.")).not.toBeInTheDocument();
    });
});