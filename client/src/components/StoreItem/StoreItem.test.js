import React from "react";
import { render } from "@testing-library/react";
import StoreItem from "./index";

import { BrowserRouter as Router } from "react-router-dom";



describe("Store item component", () => {
    test("It should render with props", () => {
        const { getByText, getByRole } = render(
            <Router>
                <StoreItem
                    itemName={"Test name"}
                    itemImg={"Images/Test-src.png"}
                    itemPrice={12.99}
                    itemId={2}
                />
            </Router>);

        getByText("Test name");
        getByText("$12.99");
        const image = getByRole("img");
        expect(image.src).toContain("Images/Test-src.png");
        expect(image.getAttribute("alt")).toBe("Test name");
    });
});