import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import toBeInTheDocument from "@testing-library/jest-dom";
import * as reactRedux from "react-redux";

import Cart from "../pages/Cart";

describe("Cart page", () => {
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const dummyDispatch = jest.fn();

    beforeEach(() => {
        useSelectorMock.mockReset();
        useDispatchMock.mockReset();
        useDispatchMock.mockReturnValue(dummyDispatch);
    });

    test("It renders", () => {
        useSelectorMock.mockReturnValue({
            cartItems: [{ product: 1, name: "React shot glass", price: 12.99 }]
        });

        const { getByText } = render(
            <Router><Cart /></Router>
        );

        getByText("React shot glass");
        getByText("$12.99");
        getByText("Remove");
        getByText("Checkout");
    });

    test("It renders with an empty cart", () => {
        useSelectorMock.mockReturnValue({
            cartItems: []
        });

        const { getByText } = render(
            <Router><Cart /></Router>
        );

        getByText("Cart is empty.");
        const store = getByText("Go To Store");
        getByText("Subtotal (0 items) : $0.00");
        const btn = getByText("Checkout");

        expect(store.href.includes("/store")).toBe(true);
        expect(btn.disabled).toBe(true);
    });

    test("It calls remove item from cart dispatch when remove btn is clicked", () => {
        useSelectorMock.mockReturnValue({
            cartItems: [{ product: 1, name: "React shot glass", price: 12.99 }]
        });

        const { getByText } = render(
            <Router><Cart /></Router>
        );

        const removeBtn = getByText("Remove");

        userEvent.click(removeBtn);
        expect(dummyDispatch).toHaveBeenCalled();
    });

    test("Expect page to change to shipping after checkout btn is clicked", () => {
        useSelectorMock.mockReturnValue({
            cartItems: [{ product: 1, name: "React shot glass", price: 12.99 }]
        });

        const history = {
            push: jest.fn()
        };

        const { getByText } = render(
            <Router><Cart history={history} /></Router>
        );

        const checkoutBtn = getByText("Checkout");
        expect(checkoutBtn.disabled).toBe(false);

        userEvent.click(checkoutBtn);

        // Check if props.history was called
        setTimeout(() => {
            expect(history.push).toHaveBeenCalled();
            expect(history.push).toHaveBeenCalledWith('/login?redirect=shipping');
        }, 0);
    });
});