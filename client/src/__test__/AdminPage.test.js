import { act, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import toBeInTheDocument from "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom/cjs/react-router-dom.min";

import Admin from "../pages/Admin";

describe("Admin page", () => {
    test("It renders with options", () => {
        const { getByText } = render(
            <Router><Admin /></Router>
        );

        getByText("View Menu Options");
        getByText("View Orders Options");
        getByText("View Events Options");
        getByText("View Store Options");
    });

    test("Cant select menu options and get a list of different thing to do with the menu or a button to go back.", async () => {
        const { getByText } = render(
            <Router><Admin /></Router>
        );

        const menuSelect = getByText("View Menu Options");

        act(() => {
            userEvent.click(menuSelect);
        });

        // Initial form should be hidden
        await waitFor(() => {
            expect(menuSelect.parentElement.parentElement.parentElement.classList.contains("hidden")).toBe(true);
        });

        getByText("View Menu Items");
        getByText("Add Menu Items");
        getByText("Delete Menu Items");
        getByText("Update Menu Items");
        const goBackBtn = getByText("Go Back");

        // When go back btn is clicked, should go back to main selection
        act(() => {
            userEvent.click(goBackBtn);
        });

        // Initial form should not be hidden
        await waitFor(() => {
            expect(getByText("View Menu Options").parentElement.parentElement.parentElement.classList.contains("hidden")).toBe(false);
        });
    });
});