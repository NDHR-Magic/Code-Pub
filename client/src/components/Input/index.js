import React from 'react';

const Input = (props) => {
    return (
        <input className="input-component"
            type={props.type}
            id={props.inputID}
            name={props.inputName}
            placeholder={props.placeholder}
        />
    );
};

export default Input;