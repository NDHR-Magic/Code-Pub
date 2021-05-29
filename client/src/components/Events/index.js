import React from 'react';
import { Link } from 'react-router-dom';
import "./style.css";

const Event = props => {
    return (
        <div className='eventContainer'>
            <div className="card mb-5 bg-dark">
                <Link to={`/events/${props.id}`}>
                    <div className="card-header text-white">
                        <h2>{props.title}</h2>
                    </div>
                </Link>
                <div className="card-body p-5 text-white">
                    <p className="card-text">{props.desc}</p>
                </div>
            </div>
        </div>
    )
};

export default Event;