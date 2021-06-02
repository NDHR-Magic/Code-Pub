import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Button from "./index";

describe("Button should fire click events", () => {
    test("it renders and calls on click function", () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button bg="black" textColor="#fff" onClickEvent={e => onClick(e)}>Test Button</Button>);

        userEvent.click(getByText("Test Button"));
        expect(onClick).toBeCalledTimes(1);
        // Check if prop bg changes color of background
        expect(document.querySelector(".customBtn").style.backgroundColor).toBe("black");
        // rgb(255, 255, 255) is same as #fff for checking textColor
        expect(document.querySelector(".customBtn").style.color).toBe("rgb(255, 255, 255)");
    });
});