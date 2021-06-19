import React from "react";
import { cleanup, render } from "@testing-library/react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import axios from "axios";
import { BrowserRouter as Router } from "react-router-dom";
import Events from "../pages/Events";

jest.mock("axios");

afterEach(() => cleanup());

describe("Event page", () => {
    beforeEach(() => {
        axios.mockReset();
    });

    test("It should render and display list of events", async () => {
        axios.get.mockReturnValue({
            data: [
                { id: 1, title: "Jest Event 1", description: "Jest event for testing", event_date: "Jest date", createdAt: "Now" },
                { id: 2, title: "Jest Event 2", description: "Jest event for testing 2", event_date: "Jest date 2", createdAt: "Now" }
            ]
        });

        const { findByText, queryByText } = render(
            <Router>
                <Events />
            </Router>
        );

        // Before axios call completes and returns, should have no events
        expect(queryByText("No events posted yet.")).toBeInTheDocument();

        // Should have both events after axios call finishes
        await findByText("Jest Event 1");
        findByText("Jest even for testing");
        findByText("Jest event 2");
        findByText("Jest date 2");

        // Should no longer say no events posted
        expect(queryByText("No events posted yet.")).not.toBeInTheDocument();
    });
});