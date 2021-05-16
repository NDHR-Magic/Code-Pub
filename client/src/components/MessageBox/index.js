import React from 'react';
import "./style.css"

const MessageBox = (props) => {
    return (
        <div className={`message-box alert alert-${props.variant || 'info'}`}>
            {props.children}
        </div>
    );
};

export default MessageBox;