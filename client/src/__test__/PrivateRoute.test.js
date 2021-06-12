import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import * as reactRedux from "react-redux";

import PrivateRoute from "../components/PrivateRoute";

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
                <PrivateRoute path="/" component={dummyComponent} />
                <Route path="/login" component={testLogin} />
            </Router>
        );

        getByText("This is the login page");
        expect(queryByText("This is a dummy component")).not.toBeInTheDocument();
    });

    test("It should call render component if logged in", () => {
        useSelectorMock.mockReturnValue({
            userInfo: true
        });

        const { getByText } = render(
            <Router>
                <PrivateRoute path="/" component={dummyComponent} />
                <Route path="/login" component={testLogin} />
            </Router>
        )
        getByText("This is a dummy component");
    });
});