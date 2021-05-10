import React from "react";
import "./style.css";

function Header(props) {
    return (
        <header className="center-text">
            {props.children}
        </header>
    )
}

export default Header;