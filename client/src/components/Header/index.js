import React from "react";
import "./style.css";

function Header(props) {
    return (
        <header className="center-text header">
            {props.children}
        </header>
    )
}

export default Header;