import React from 'react';

const Event = props => {
    return (
        <div>
            <div className="card mt-4">
                <div className="card-header">
                    {props.title}
                </div>
                <div className="card-body">
                    <p className="card-text">{props.desc}</p>
                </div>
            </div>
        </div>
    )
};

export default Event;