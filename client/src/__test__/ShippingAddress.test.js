import React from "react";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRedux from "react-redux";

import ShippingAddress from "../pages/ShippingAddress";

describe("Shipping address page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    })
    afterEach(cleanup);

    test("Renders", () => {
        useSelectorMock.mockReturnValue({
            userInfo: true, loading: false, error: false, shippingAddress: {
                fullName: "Test Person",
                city: "Test City",
                state: "TS"
            }
        });

        const { getByText, getByRole } = render(
            <Router>
                <ShippingAddress />
            </Router>
        );

        getByText("Shipping Address");
        expect(document.getElementById("fullName").value).toBe("Test Person");
        const selectBox = getByRole("combobox");

        userEvent.selectOptions(selectBox, ["AK"]);

        expect(getByRole("option", { name: "Alaska" }).selected).toBe(true);
    });

    test("Changes states when info entered", () => {
        useSelectorMock.mockReturnValue({
            userInfo: true, loading: false, error: false, shippingAddress: { fullName: "Test Person", }
        });

        const changeCity = jest.fn();
        const handleChange = jest.spyOn(React, "useState");
        handleChange.mockImplementation(city => [city, changeCity]);
        console.error = jest.fn();

        const { getByRole } = render(
            <Router>
                <ShippingAddress />
            </Router>
        );

        const cityBox = getByRole("textbox", { name: "City" });
        userEvent.type(cityBox, "Test city typing");
        expect(city.value).toBe("Test city typing");
    });

    test("It calls dispatch when submitted", () => {
        useSelectorMock.mockReturnValue({
            userInfo: true, loading: false, error: false, shippingAddress: { fullName: "Test Person", }
        });

        const dummyDispatch = jest.fn();
        useDispatchMock.mockReturnValue(dummyDispatch);

        const { getByText, getByRole } = render(
            <Router>
                <ShippingAddress />
            </Router>
        );

        expect(dummyDispatch).not.toHaveBeenCalled();

        userEvent.click(getByText("Submit"));

        expect(dummyDispatch).toHaveBeenCalled();
    });

    // Test works but causes infinite loop on props.history.push due to userInfo always being false
    // test("It calls props.history.push when user not logged in", () => {
    //     useSelectorMock.mockReturnValue({
    //         userInfo: false, loading: false, error: false, shippingAddress: { fullName: "Test Person", }
    //     });

    //     const history = {
    //         push: jest.fn()
    //     }

    //     expect(history.push).not.toHaveBeenCalled();

    //     const { getByText, getByRole } = render(
    //         <Router>
    //             <ShippingAddress history={history} />
    //         </Router>
    //     );

    //     expect(history.push).toHaveBeenCalled();
    // });
});