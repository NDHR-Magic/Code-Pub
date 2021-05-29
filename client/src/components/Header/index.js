import React from "react";
import "./style.css";

function Header(props) {
    return (
        <header
            style={{ backgroundColor: props.bgColor ? props.bgColor : "inherit", color: props.textColor ? props.textColor : "inherit" }}
            className="center-text header">
            {props.children}
        </header>
    )
}

export default Header;