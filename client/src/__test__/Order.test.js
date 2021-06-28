import { getByRole, render } from "@testing-library/react";
import toBeInTheDocument from "@testing-library/jest-dom";
import * as routerDom from "react-router-dom";
import * as reactRedux from "react-redux";

import Order from "../pages/Order";

describe("Order page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    const dispatchDummy = jest.fn();

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();

        useDispatchMock.mockReturnValue(dispatchDummy);
        useSelectorMock.mockReturnValue({
            error: false, loading: false, order: {
                order: {
                    id: 1,
                    userInfo: { id: 0 },
                    user: { id: 0 }, shippingAddress: {
                        fullName: "Jest User", address: "123 Jest Rd"
                    },
                    is_delivered: false,
                    payment_method: "PayPal",
                    is_paid: false,
                    orderItems: [{ qty: 2, item: { id: 1, name: "React shot glass", price: 12.99, image: "imageURL" } }],
                    items_price: 25.98,
                    shipping_price: 10.00,
                    tax_price: 1.00,
                    total_price: 36.98
                }
            }
        });
    });

    test("It renders with order info", () => {
        const { getByText, getByAltText } = render(
            <routerDom.BrowserRouter><Order /></routerDom.BrowserRouter>
        );

        getByText("PayPal");
        getByText("React shot glass");
        getByText("$25.98");
        getByText("$10.00");
        getByText("$1.00");
        getByText("$36.98");
        const image = getByAltText("React shot glass");
        const delivered = getByText("Not Delivered")
        const paid = getByText("Not Paid");
    });

    test("Renders error message that order isnt yours if userId doesnt match order user id", () => {
        useSelectorMock.mockReturnValue({
            error: false, loading: false, order: {
                order: {
                    id: 1,
                    userInfo: { id: 2 },
                    user: { id: 1 }, shippingAddress: {
                        fullName: "Jest User", address: "123 Jest Rd"
                    },
                    payment_method: "PayPal"
                }
            }
        });

        const { getByText, queryByText } = render(
            <routerDom.BrowserRouter><Order /></routerDom.BrowserRouter>
        );

        getByText("Order does not belong to you");
        expect(queryByText("PayPal")).not.toBeInTheDocument();
    });

    test("It shows loading", () => {
        useSelectorMock.mockReturnValue({
            error: false, loading: true, order: {
                order: {
                    id: 1,
                    user: { id: 0 }
                },
                userInfo: { id: 0 }
            }
        });

        const { getByText } = render(
            <routerDom.BrowserRouter><Order /></routerDom.BrowserRouter>
        );

        getByText("Loading...");
    });

    test("It shows error messages", () => {
        useSelectorMock.mockReturnValue({
            error: "Jest Error", loading: false, order: {
                order: {
                    id: 1,
                    user: { id: 0 }
                },
                userInfo: { id: 0 }
            }
        });

        const { getByText } = render(
            <routerDom.BrowserRouter><Order /></routerDom.BrowserRouter>
        );

        const error = getByText("Jest Error");
        expect(error.classList.contains("alert-danger")).toBe(true);
    });

    test("Updates if paid and delivered", () => {
        useSelectorMock.mockReturnValue({
            error: false, loading: false, order: {
                order: {
                    id: 1,
                    userInfo: { id: 0 },
                    user: { id: 0 }, shippingAddress: {
                        fullName: "Jest User", address: "123 Jest Rd"
                    },
                    is_delivered: true,
                    delivered_at: "delivery location",
                    payment_method: "PayPal",
                    is_paid: true,
                    paid_at: "123",
                    orderItems: [{ qty: 2, item: { id: 1, name: "React shot glass", price: 12.99, image: "imageURL" } }],
                    items_price: 25.98,
                    shipping_price: 10.00,
                    tax_price: 1.00,
                    total_price: 36.98
                }
            }
        });

        const { getByText } = render(
            <routerDom.BrowserRouter><Order /></routerDom.BrowserRouter>
        );

        getByText("Paid at 123");
        getByText("Delivered at delivery location");
    });

    // Test if dispatch for order is called (it should be due to no order id existing from useParams)
    test("It should dispatch for order if not found or doesnt match param id", () => {
        const { getByText } = render(
            <routerDom.BrowserRouter><Order /></routerDom.BrowserRouter>
        );

        expect(dispatchDummy).toHaveBeenCalled();
    });
});