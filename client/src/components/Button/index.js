import React from "react";
import "./style.css";

const Button = (props) => {
    return (
        <button
            onClick={(e) => props.onClickEvent(e, props.args)}
            className="customBtn custom-flex flex-align" style={{
                backgroundColor: props.bg ? props.bg : "#0275d8",
                color: props.text_color ? props.text_color : "#fff"
            }}>{props.children}</button>
    )
}

export default Button;