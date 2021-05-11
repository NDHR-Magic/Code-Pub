import React from "react";
import "./style.css";

const Footer = (props) => {
    return (
        <footer className="custom-flex flex-align">
            {props.children}
        </footer>
    )
}

export default Footer;