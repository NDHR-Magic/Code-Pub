import React from 'react';
import "./style.css";

const EventInfo = (props) => {

    const handleEventAttend = (e) => {
        e.preventDefault();
        alert("attending");
    }

    return (
        <div className='eventContainer p-5'>
            <div className="card mb-5 single-event bg-dark text-white">

                <div className="card-header">
                    <h2>{props.title}</h2>
                </div>

                <div className="card-body">
                    <p className="card-text">{props.desc}</p>
                    <br />
                    <p className="alert-primary event-date">Event scheduled: {props.event_date ? props.event_date : "TBD!"}</p>

                    <div className="custom-flex">
                        <button onClick={e => props.handleEventAttend(e)} className="btn btn-primary">
                            Attend this event!
                        </button>
                    </div>
                    <div className="custom-flex">{props.meesage ? props.message : ""}</div>
                </div>
            </div>
            <div className="card mt-5 single-event bg-dark text-white" >
                <div className="card-header">
                    <h3>List of Attendees</h3>
                    <h4>Number of people attending: {props.numPeople}</h4>
                </div>
                <div className="card-body">
                    <ul>
                        <li>
                            {props.attendees && props.numPeople > 0 
                            ? (props.attendees.map((attendee) => (
                            <p>{attendee.username}</p>
                                )))
                                :<div>No one is attending just yet!</div>
                        }
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EventInfo;