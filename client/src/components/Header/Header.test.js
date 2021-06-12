import React from "react";
import { render } from "@testing-library/react";

import Header from "./index";

describe("Test header component", () => {
    test("Should render with custom dynamic bg and text colors", () => {
        const { getByText } = render(
            <Header
                bgColor={"pink"}
                textColor={"orange"}
            >
                Test Header
            </Header>);

        getByText("Test Header");
        expect(document.querySelector(".header").style.backgroundColor).toBe("pink");
        expect(document.querySelector(".header").style.color).toBe("orange");
    });
});