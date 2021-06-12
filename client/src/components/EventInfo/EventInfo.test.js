import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";

import EventInfo from "./index";

describe("Event info component", () => {
    test("It should render with props passed", () => {
        const { getByText, getByRole } = render(
            <Router>
                <EventInfo
                    title={"Mock event"}
                    desc={"Another jest test"}
                    event_date={1623485073848}
                    message={"Mock message"}
                    numPeople={12}
                    attendees={[{ id: 1, username: "test1" }, { id: 2, username: "test2" }]}
                />
            </Router>
        );

        getByText("Mock event");
        getByText("Another jest test");
        getByText("Mock message");
        getByText("Number of people attending: 12");
        getByText("test1");
        getByText("test2");
    });
});