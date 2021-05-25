import React, { useState } from "react";
import { Link } from "react-router-dom";
import Media from "react-media";
import { useSelector, useDispatch } from "react-redux";
import "./style.css";
import { signout } from "../../actions/userActions";

function Nav() {
    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    const [navState, setNavState] = useState("hidden");

    const signoutHandler = () => {
        dispatch(signout());
    }

    return (
        <nav>
            <Media queries={{ small: { maxWidth: 800 } }}>
                {matches =>
                    matches.small ? (
                        <>
                            <div id="small-nav" className="nav-bar flex-between">
                                <div className="nav-left flex-between flex-align">
                                    <h1>Logo</h1>
                                </div>

                                <div className="nav-right flex-end flex-align">
                                    <i onClick={e => setNavState("notHidden")} className="fas small fa-bars"></i>
                                </div>
                            </div>
                            <div className={`nav-page-extended ${navState}`}>
                                <span onClick={e => setNavState("hidden")} className="nav-page-close">X</span>
                                <div>
                                    <ul>
                                        <Link to="/">Home</Link>
                                        <Link to="/menu">Menu</Link>
                                        <Link to="/events">Events</Link>
                                        <Link to="/store">Store</Link>
                                        <Link to="/mixer">Drink App</Link>
                                    </ul>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div id="wide-nav" className="nav-bar flex-between">
                            <div className="nav-left flex-between flex-align">
                                <Link to="/"><img src='./Images/codePubLogo.png' height='75' width='125'></img></Link>
                                <Link to="/menu">Menu</Link>
                                <Link to="/events">Events</Link>
                                <Link to="/store">Store</Link>
                                <Link to="/mixer">Drink App</Link>
                            </div>

                            <div className="nav-right flex-between flex-align">
                                {/* Cart icon */}
                                <div className="cart">
                                    <Link to="/cart"><i className="fas fa-shopping-cart wide"></i></Link>
                                    <div className="cart-count custom-flex flex-align">
                                        {cartItems.length}
                                    </div>
                                </div>
                                {/* Login or profile depending on login status */}
                                {
                                    userInfo ? (
                                        <div className="links">
                                            <Link to="#" className="link custom-flex flex-align">Profile</Link>

                                            <Link to="#signout" className="link" onClick={signoutHandler}>
                                                Sign Out
                                            </Link>

                                        </div>
                                    ) : (
                                        <Link to="/login" className="link custom-flex flex-align">Login</Link>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </Media>
        </nav>
    )
}

export default Nav;