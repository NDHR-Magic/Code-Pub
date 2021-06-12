import React from "react";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import { AccountBox } from "./";
import { expect } from "@jest/globals";

describe("Account login and register container", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    })
    afterEach(cleanup);

    console.error = jest.fn();

    test("It renders and can swap between forms", async () => {
        useSelectorMock.mockReturnValue({
            userInfo: false, loading: false, error: false
        });

        const { getByText, queryByText, getByRole, findByText } = render(
            <Router>
                <AccountBox />
            </Router>
        );

        getByText("Login");
        const button = getByRole("button");
        expect(button.textContent).toBe("Login");
        expect(queryByText("Already have an account?")).not.toBeInTheDocument();

        userEvent.click(getByText("Sign-Up"));

        // wait for form to swap
        await findByText("Sign-In");
        expect(queryByText("Already have an account?")).toBeInTheDocument();
        const newButton = getByRole("button");
        expect(button).not.toBeInTheDocument();
        expect(newButton.textContent).toBe("Sign-Up");
    });
});