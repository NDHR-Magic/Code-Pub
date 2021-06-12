import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import * as reactRedux from "react-redux";

import AdminRoute from "../components/AdminRoute";

function dummyComponent() {
    return (
        <div>This is a dummy component</div>
    )
}

function testLogin() {
    return (
        <div>This is the login page</div>
    )
}

afterEach(cleanup);

describe("Private route component for wrapping routes", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

    beforeEach(() => {
        useSelectorMock.mockClear();
    });

    test("It should call redirect if not logged in", () => {
        useSelectorMock.mockReturnValue({
            userInfo: false
        });

        const { getByText, queryByText } = render(
            <Router>
                <AdminRoute path="/" component={dummyComponent} />
                <Route path="/login" component={testLogin} />
            </Router>
        );

        getByText("This is the login page");
        expect(queryByText("This is a dummy component")).not.toBeInTheDocument();
    });

    test("It should also redirect to login if login in, but not admin", () => {
        useSelectorMock.mockReturnValue({
            userInfo: { isAdmin: false }
        });

        const { getByText, queryByText } = render(
            <Router>
                <AdminRoute path="/" component={dummyComponent} />
                <Route path="/login" component={testLogin} />
            </Router>
        )
        getByText("This is the login page");
        expect(queryByText("This is a dummy component")).not.toBeInTheDocument();
    });

    test("It should render component if admin", () => {
        useSelectorMock.mockReturnValue({
            userInfo: { isAdmin: true }
        });

        const { getByText, queryByText } = render(
            <Router>
                <AdminRoute path="/" component={dummyComponent} />
                <Route path="/login" component={testLogin} />
            </Router>
        )
        getByText("This is a dummy component");
    });
});