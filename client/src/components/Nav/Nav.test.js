import React from "react";
import { cleanup, render } from "@testing-library/react";
import MediaMock from "react-media";
import * as reactRedux from "react-redux";

import Nav from "./index";

jest.mock("react-media", () => {
    return function dummyNav() {
        return (
            <div>This is a test nav</div>
        )
    }
});

describe("Nav component", () => {
    const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
    const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');
    beforeEach(() => {
        useSelectorMock.mockClear();
        useDispatchMock.mockClear();
    })
    afterEach(cleanup);

    // Fails to show content due to react-media
    test("It renders", () => {
        useSelectorMock.mockReturnValue({
            cartItems: ["test"]
        });

        const { getByText } = render(<Nav />);

        getByText("This is a test nav");
    });
});