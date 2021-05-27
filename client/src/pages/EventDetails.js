import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { getOneEvent } from '../utils/EventsAPI';
import EventInfo from "../components/EventInfo/";

const EventDetails = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const { id } = useParams();

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
    }, [userInfo, id])


    return (
        <div>
            {event
                ? (<EventInfo
                    id={event.id}
                    key={event.id}
                    title={event.title}
                    desc={event.description}
                    dateEvent={event.event_date}
                    dateCreated={event.createdAt}
                />)
                : (<div>Event not found</div>)}

        </div>
    );
};

export default withRouter(EventDetails);

//