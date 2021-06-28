import { act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRedux from "react-redux";

import PlaceOrder from "../pages/PlaceOrder";

describe("Place order page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    const dispatchDummy = jest.fn();

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();

        useDispatchMock.mockReturnValue(dispatchDummy);
        useSelectorMock.mockReturnValue({
            paymentMethod: "PayPal",
            cartItems: [{ product: 1, name: "React shot glass", price: 12.99, qty: 2 }],
            shippingAddress: { fullName: "Jest User", address: "123 Jest Rd", city: "Jest", state: "JT" }
        });
    });

    test("It renders with order info", () => {
        const { getByText, getByRole } = render(
            <Router><PlaceOrder /></Router>
        );

        getByText("PayPal");
        getByText("React shot glass");
        // $25.98 since 12.99 x 2 (price x qty)
        getByText("$25.98");
        // Shipping price for < $100 items
        getByText("$10.00");
        // Tax is 0.075 * items price
        getByText(`$${(25.98 * 0.075).toFixed(2)}`);
        // Total price is items + tax + shipping
        getByText("$37.93");

        const orderBtn = getByRole("button");
        expect(orderBtn.disabled).toBe(false);
    });

    test("It renders with empty order items and has disabled order btn", () => {
        useSelectorMock.mockReturnValue({
            paymentMethod: "PayPal",
            cartItems: [],
            shippingAddress: { fullName: "Jest User", address: "123 Jest Rd", city: "Jest", state: "JT" }
        });

        const { getByRole } = render(
            <Router><PlaceOrder /></Router>
        );

        const orderBtn = getByRole("button");
        expect(orderBtn.disabled).toBe(true);
    });

    test("It calls dispatch function for creating order when order btn is clicked", () => {
        const { getByRole } = render(
            <Router><PlaceOrder /></Router>
        );

        const orderBtn = getByRole("button");

        act(() => {
            userEvent.click(orderBtn);
        });

        expect(dispatchDummy).toHaveBeenCalled();
    });
});