import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRedux from "react-redux";

import Store from "../pages/Store";

describe("Store page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    const dummyDispatch = jest.fn();

    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();

        useDispatchMock.mockReturnValue(dummyDispatch);
    })
    afterEach(cleanup);

    test("It renders", () => {
        useSelectorMock.mockReturnValue({
            loading: false, error: false, products: [
                {
                    id: 1,
                    name: "Test product 1",
                    price: 9.99,
                    image: "test-src"
                },
                {
                    id: 2,
                    name: "Test product 2",
                    price: 19.99,
                    image: "test-src2"
                }
            ]
        });

        expect(dummyDispatch).not.toHaveBeenCalled();

        const { getByText, getByRole } = render(
            <Router>
                <Store />
            </Router>
        );

        getByText("Test product 1");
        getByText("Test product 2");

        const img1 = getByRole("img", { name: "Test product 1" });
        expect(img1.src.includes("test-src")).toBe(true);

        const link1 = getByRole("link", { name: "Test product 1 Test product 1 $9.99" });
        const link2 = getByRole("link", { name: "Test product 2 Test product 2 $19.99" });
        expect(link1.href.includes("/store/1")).toBe(true);
        expect(link2.href.includes("/store/2")).toBe(true);

        expect(dummyDispatch).toHaveBeenCalled();
    });

    test("It shows loading animation", () => {
        useSelectorMock.mockReturnValue({
            loading: true, error: false, products: []
        });

        const { getByText } = render(
            <Router>
                <Store />
            </Router>
        );

        getByText("Loading...");
    });

    test("It shows error messages", () => {
        useSelectorMock.mockReturnValue({
            loading: false, error: "Test error, no network", products: []
        });

        const { getByText } = render(
            <Router>
                <Store />
            </Router>
        );

        getByText("Test error, no network");
    });
});