import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import * as reactRedux from "react-redux";
import axios from "axios";

import EventDetails from "../pages/EventDetails";

jest.mock("axios");
console.error = jest.fn();

describe("Event details page", () => {
    const useSelectorMock = jest.spyOn(reactRedux, "useSelector");

    beforeEach(() => {
        useSelectorMock.mockClear();
    });

    test("It renders with data fetched", async () => {
        axios.get.mockResolvedValue({
            data: {
                message: "Successfully registered",
                event: {
                    id: 1, title: "Jest Event", description: "Jest event description", createdAt: Date.now
                },
                numAttendies: 2,
                attendies: ["User1", "User2"]
            }
        });

        useSelectorMock.mockReturnValue({ userInfo: true });

        const { getByText, findByText } = render(
            <Router>
                <EventDetails />
            </Router>
        );

        await findByText("Jest Event");
        getByText("Jest event description");
        getByText("List of Attendees");
        getByText("Event scheduled: TBD!");
    });

    test("It renders and mentions no event found if event doesnt exist", () => {
        axios.get.mockResolvedValue({ data: false });

        useSelectorMock.mockReturnValue({ userInfo: true });

        const { getByText } = render(
            <Router>
                <EventDetails />
            </Router>
        );

        getByText("Event not found");
    });

    test("Should update attendees and num attendies if you click attend", async () => {
        axios.get.mockResolvedValue({
            data: {
                message: "Successfully registered",
                event: {
                    id: 1, title: "Jest Event", description: "Jest event description", createdAt: Date.now
                },
                numAttendees: 2,
                attendees: [{ id: 1, username: "Jest1" }, { id: 2, username: "Jest2" }]
            }
        });

        axios.post.mockResolvedValue({
            data: {
                message: "Successfully registered"
            }
        });

        useSelectorMock.mockReturnValue({ userInfo: { id: 10, username: "JestUser3" } });

        const { queryByText, getByText, findByText } = render(
            <Router>
                <EventDetails />
            </Router>
        );

        const registerBtn = await findByText("Attend this event!");
        // Get number of people attending. Should be 2 with our mockreturn from axios
        const numAttending = parseInt(getByText("Number of people attending: 2").textContent.split(": ")[1]);
        // Get users
        getByText("Jest1");
        getByText("Jest2");
        expect(queryByText("JestUser3")).not.toBeInTheDocument();

        expect(numAttending).toBe(2);

        // Click the attend button to register for event
        userEvent.click(registerBtn);
        // Expect handleEvent
        expect(axios.post).toHaveBeenCalled();
        // Register message should be on page
        await findByText("Successfully registered");
    });
});