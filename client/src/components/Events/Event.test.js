import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import Event from "./index";

describe("Event component", () => {
    test("It should render with props", () => {
        const { getByText, getByRole } = render(
            <Router>
                <Event
                    id={1}
                    title={"Mock Event"}
                    desc={"This is a jest test"}
                />
            </Router>
        );

        getByText("Mock Event");
        getByText("This is a jest test");
        expect(getByRole("link").href.includes("/events/1")).toBe(true);
    });
});