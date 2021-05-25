import React from 'react';
import "./style.css";

const EventInfo = (props) => {

    const handleEventAttend = (e) => {
        e.preventDefault();
        alert("attending");
    }

    return (
        <div>
            <div className="card mt-4 single-event">

                <div className="card-header">
                    <h2>{props.title}</h2>
                </div>

                <div className="card-body">
                    <p className="card-text">{props.desc}</p>
                    <br />
                    <p className="alert-primary event-date">Event scheduled: {props.event_date ? props.event_date : "TBD!"}</p>

                    <div className="custom-flex">
                        <button onClick={e => handleEventAttend(e)} className="btn btn-primary">
                            Attend this event!
                        </button>
                    </div>
                </div>
            </div>
            <div className="card mt-4 single-event" >
                <div className="card-header">
                    <h3>List of Attendies</h3>
                    <h4>Number of people attending: ##</h4>
                </div>
                <div className="card-body">
                    <ul>
                        <li>
                            Example attendee
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;