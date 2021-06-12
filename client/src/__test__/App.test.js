import React from "react";
import { render } from "@testing-library/react";
import * as reactRedux from "react-redux";
import MediaMock from "react-media";

import App from "../App";

jest.mock("react-media");

describe("App", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");
    const useDispatchMock = jest.spyOn(reactRedux, "useDispatch");

    beforeEach(() => {
        useDispatchMock.mockClear();
        useSelectorMock.mockClear();
    });

    test("It should render everything", () => {
        useSelectorMock.mockReturnValue({
            cartItems: [], userInfo: true, error: false, loading: false
        })

        const { getByText } = render(<App />);
        // grab text from home page to check it renders to "/" route
        getByText("Featured Event");
    });
});