import React, { useEffect, useState } from "react";
import { party } from "../utils/EventsAPI"
import Event from "../components/Events";

function Events() {
    const [events, setEvents] = useState([])
    useEffect(() => {
        const getEvent = async () => {
            const { data } = await party()
            setEvents(data);
        }
        getEvent();

    }, [])

    return (
        <div className="eventContainer">
            {events.length > 0 ? (
                events.map((event) => (
                    <Event
                        id={event.id}
                        key={event.id}
                        title={event.title}
                        desc={event.description}
                        dateEvent={event.event_date}
                        dateCreated={event.createdAt}
                    />
                ))
            ) : (
                <h1 className="center-text mt-3">No events posted yet.</h1>
            )}
        </div>
    )
}

export default Events;