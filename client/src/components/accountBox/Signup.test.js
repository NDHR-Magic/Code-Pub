import React from "react";
import { cleanup, render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRedux from "react-redux";
import { AccountContext } from "./accountContext";

import SignupForm from "./SignupForm";

describe("Register page", () => {
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
                    <SignupForm />
                </AccountContext.Provider>
            </Router>
        );

        getByText("Already have an account?");
        expect(getByRole("button").textContent).toBe("Sign-Up");
    });

    // test("It calls props.history,push if user info defined", () => {
    //     const switchToSignup = jest.fn();

    //     useSelectorMock.mockReturnValue({
    //         userInfo: true, loading: false, error: false
    //     });

    //     const mockHistory = {
    //         push: jest.fn()
    //     }

    //     const { findByText } = render(
    //         <Router>
    //             <AccountContext.Provider value={switchToSignup}>
    //                 <Loginform history={mockHistory} />
    //             </AccountContext.Provider>
    //         </Router>
    //     );

    //     expect(mockHistory.push).toHaveBeenCalledWith("/");
    // });
});