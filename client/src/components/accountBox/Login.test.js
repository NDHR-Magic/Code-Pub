import React from "react";
import { cleanup, render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRedux from "react-redux";
import { AccountContext } from "./accountContext";

import Loginform from "./loginform";

describe("Login page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    })
    afterEach(cleanup);

    console.error = jest.fn();

    test("Renders", () => {
        // Mock switchToSignup from the context provider;
        const switchToSignup = jest.fn();

        useSelectorMock.mockReturnValue({
            userInfo: false, loading: false, error: false
        });


        const { getByText, getByRole } = render(
            <Router>
                <AccountContext.Provider value={switchToSignup}>
                    <Loginform />
                </AccountContext.Provider>
            </Router>
        );

        getByText("Don't have an account?");
        expect(getByRole("button").textContent).toBe("Login");
    });

    // Test the loading
    test("It has loading animation if loading state is true and error if error message", () => {
        // Mock switchToSignup from the context provider;
        const switchToSignup = jest.fn();

        useSelectorMock.mockReturnValue({
            userInfo: false, loading: true, error: "Error"
        });


        const { getByText } = render(
            <Router>
                <AccountContext.Provider value={switchToSignup}>
                    <Loginform />
                </AccountContext.Provider>
            </Router>
        );

        getByText("Loading...");
        getByText("Error");
        expect(document.querySelector(".message-box").classList.contains("alert-danger")).toBe(true);
    });

    // test("It calls props.history,push if user info defined", () => {
    //     const switchToSignup = jest.fn();

    //     useSelectorMock.mockReturnValue({
    //         userInfo: true, loading: false, error: false
    //     });

    //     const effect = jest.spyOn(React, "useEffect");

    //     const mockHistory = {
    //         push: jest.fn()
    //     }

    //     render(
    //         <Router>
    //             <AccountContext.Provider value={switchToSignup}>
    //                 <Loginform history={mockHistory} />
    //             </AccountContext.Provider>
    //         </Router>
    //     );

    //     expect(effect).toHaveBeenCalled();
    //     expect(mockHistory.push).toHaveBeenCalledWith("/");
    // });
});