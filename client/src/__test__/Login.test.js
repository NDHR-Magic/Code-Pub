import React from "react";
import { cleanup, render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import * as reactRedux from "react-redux";

import Login from "../pages/Login";
HTMLCanvasElement.prototype.getContext = jest.fn();

const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
const dummyDispatch = jest.fn();

beforeEach(() => {
    useSelectorMock.mockClear();
    useDispatchMock.mockClear();

    useDispatchMock.mockReturnValue(dummyDispatch);
    useSelectorMock.mockReturnValue({
        userInfo: true, error: false, loading: false
    });
})
afterEach(cleanup);

describe("Login page", () => {
    test("It should render", () => {
        console.log = jest.fn();
        console.error = jest.fn();
        render(
            <Router>
                <Login />
            </Router>
        );
    });
});