import React from "react";
import { render } from "@testing-library/react";

import Footer from "./index";

describe("Footer component", () => {
    test("It renders with children text", () => {
        const { getByText } = render(<Footer>Test footer</Footer>)
        getByText("Test footer");
    });
});