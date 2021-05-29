import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { getOneEvent, addUserAPI } from '../utils/EventsAPI';
import EventInfo from "../components/EventInfo/";

const EventDetails = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const { id } = useParams();

    const [eventInfo, setEventInfo] = useState(false);

    if (!userInfo) {
        props.history.push(`/login?redirect=/events/${id}`);
    }
    const [event, setEvent] = useState()
    useEffect(() => {
        if (userInfo) {
            const getEvent = async () => {
                const { data } = await getOneEvent(id, userInfo)
                console.log(data);
                setEvent(data);
            }
            getEvent();
        }
    }, [userInfo, id]);

    const handleEventAttend = async (e) => {
        e.preventDefault();
        const { data } = await addUserAPI(id, userInfo);
        setEventInfo(data.message);
    }

    return (
        <div className="eventContainer">
            {event
                ? (<EventInfo
                    id={event.event.id}
                    key={event.event.id}
                    title={event.event.title}
                    desc={event.event.description}
                    dateEvent={event.event.event_date}
                    dateCreated={event.event.createdAt}
                    handleEventAttend={handleEventAttend}
                    numPeople={event.numAttendees}
                    attendees={event.attendees}
                    message={eventInfo}
                />)
                : (<div>Event not found</div>)}
        </div>
    );
};

export default withRouter(EventDetails);