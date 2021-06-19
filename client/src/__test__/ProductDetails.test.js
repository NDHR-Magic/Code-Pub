import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { cleanup, render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import * as reactRedux from "react-redux";

import ProductDetails from "../pages/ProductDetails";

describe("Product details page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");
    const dummyDispatch = jest.fn();

    beforeEach(() => {
        useSelectorMock.mockReset();
        useDispatchMock.mockReset();
        dummyDispatch.mockClear();

        useDispatchMock.mockReturnValue(dummyDispatch);
    });

    test("It should render, dispatch event for product details, load while waiting", () => {
        useSelectorMock.mockReturnValue({
            loading: true, error: false, product: false
        });

        const { getByText } = render(
            <Router>
                <ProductDetails />
            </Router>
        );

        getByText("Loading...");
        expect(dummyDispatch).toHaveBeenCalled();
    });

    test("It should render, dispatch event for product details, and show error when failed", () => {
        useSelectorMock.mockReturnValue({
            loading: false, error: "Jest error", product: false
        });

        const { getByText } = render(
            <Router>
                <ProductDetails />
            </Router>
        );

        expect(dummyDispatch).toHaveBeenCalled();
        getByText("Jest error");
        expect(getByText("Jest error").classList.contains("alert-danger")).toBe(true);
    });

    test("It should render, dispatch event for product details, and show data on success. Should show unavailable if none in stock and no button", () => {
        useSelectorMock.mockReturnValue({
            loading: false, error: false, product: { name: "Jest shot glass", price: 99.99, amount_in_stock: 0, image: "/" }
        });

        const { getByText, queryByText } = render(
            <Router>
                <ProductDetails />
            </Router>
        );

        expect(dummyDispatch).toHaveBeenCalled();
        getByText("Jest shot glass");
        getByText("Unavailable :(");
        getByText("0 left in stock!");
        expect(queryByText("Add to cart")).not.toBeInTheDocument();
    });

    test("It should render, dispatch event for product details, and show data on success. Show add to cart button if in stock", () => {
        useSelectorMock.mockReturnValue({
            loading: false, error: false, product: { name: "Jest shot glass", price: 99.99, amount_in_stock: 55, image: "/" }
        });

        const { getByText, queryByText } = render(
            <Router>
                <ProductDetails />
            </Router>
        );

        expect(dummyDispatch).toHaveBeenCalled();
        getByText("Jest shot glass");
        expect(queryByText("Unavailable :(")).not.toBeInTheDocument();
        getByText("55 left in stock!");
        expect(queryByText("Add to cart")).toBeInTheDocument();
    });

    test("Should change qty when select option is changed", () => {
        useSelectorMock.mockReturnValue({
            loading: false, error: false, product: { name: "Jest shot glass", price: 99.99, amount_in_stock: 5, image: "/" }
        });

        const { getByRole } = render(
            <Router>
                <ProductDetails />
            </Router>
        );

        const select = getByRole("combobox");
        expect(select.value).toBe("1");

        // User selects option 4
        userEvent.selectOptions(select, ["4"]);
        expect(select.value).toBe("4");
    });
});