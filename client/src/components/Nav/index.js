import React from "react";
import { Link } from "react-router-dom";
import Media from "react-media";
import "./style.css";

function Nav() {
    return (
        <nav>
            <Media queries={{ small: { maxWidth: 800 } }}>
                {matches =>
                    matches.small ? (
                        <div id="small-nav" className="nav-bar flex-between">
                            <div className="nav-left flex-between flex-align">
                                <h1>Logo</h1>
                            </div>

                            <div className="nav-right flex-end flex-align">
                                <i className="fas small fa-bars"></i>
                            </div>
                        </div>
                    ) : (
                        <div id="wide-nav" className="nav-bar flex-between">
                            <div className="nav-left flex-between flex-align">
                                <Link to="/"><h1>Logo</h1></Link>
                                <Link to="/menu">Menu</Link>
                                <Link to="/events">Events</Link>
                                <Link to="/store">Store</Link>
                                <Link to="/mixer">Drink App</Link>
                            </div>

                            <div className="nav-right flex-between flex-align">
                                <Link to="/login" className="nav-link custom-flex flex-align">Login</Link>
                                <div className="cart">
                                    <Link to="/cart"><i className="fas fa-shopping-cart wide"></i></Link>
                                    <div className="cart-count custom-flex flex-align">0</div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Media>
        </nav>
    )
}

export default Nav;