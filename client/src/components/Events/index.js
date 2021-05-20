import React from 'react';
import { Link } from 'react-router-dom';

const Event = props => {
    return (
        <div>
            <div className="card mt-4">
                <Link to={`/events/${props.id}`}>
                    <div className="card-header">
                        {props.title}
                    </div>
                </Link>
                <div className="card-body">
                    <p className="card-text">{props.desc}</p>
                </div>
            </div>
        </div>
    )
};

export default Event;