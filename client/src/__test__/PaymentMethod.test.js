import { render, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import * as reactRedux from "react-redux";

import PaymentMethod from "../pages/PaymentMethod";

describe("Payment method selection page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    const dummyDispatch = jest.fn();

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();

        useDispatchMock.mockReturnValue(dummyDispatch);
        useSelectorMock.mockReturnValue({ shippingAddress: { address: "123 test", city: "Jest" } });
    });

    test("It renders with PayPal option selected by default", () => {
        const { getByRole, getByText } = render(
            <Router><PaymentMethod /></Router>
        );

        getByText("PayPal");
        getByText("Stripe");

        const PayPal = getByRole("radio", { name: "PayPal" });
        const stripe = getByRole("radio", { name: "Stripe" });

        expect(PayPal.checked).toBe(true);
        expect(stripe.checked).toBe(false);
    });

    test("It changes selections and updates value", async () => {
        const { getByRole } = render(
            <Router><PaymentMethod /></Router>
        );

        const PayPal = getByRole("radio", { name: "PayPal" });
        const stripe = getByRole("radio", { name: "Stripe" });

        act(() => {
            userEvent.click(stripe);
        });

        // Wait for event to finish and stripe should be checked instead of paypal
        await waitFor(() => {
            expect(stripe.checked).toBe(true);
            expect(PayPal.checked).toBe(false);
        });
    });

    test("It submits and calls dispatch to save payment method", () => {
        const { getByText } = render(
            <Router><PaymentMethod /></Router>
        );

        const submitBtn = getByText("Submit");

        act(() => {
            userEvent.click(submitBtn);
        });

        expect(dummyDispatch).toHaveBeenCalled();
    });
});