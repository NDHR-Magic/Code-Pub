import React from 'react';

const Label = (props) => {
    return (
        <label className="label-component px-2"
            htmlFor={props.labelFor}
        >{props.children}</label>
    );
};

export default Label;