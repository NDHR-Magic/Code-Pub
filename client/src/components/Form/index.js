import React from 'react';
import "./style.css";

const Form = (props) => {
    return (
        <form className="form-component">
            <h3 className="center-text pt-3 pb-0">
                {props.formTitle}
            </h3>
            <hr />
            {props.children}
        </form>
    );
};

export default Form;