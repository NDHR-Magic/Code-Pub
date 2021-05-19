import React, { useEffect } from "react";
import { useParams, useLocation, Link, withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import Button from "../components/Button";

function Cart(props) {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    let qty = searchParams.get('qty');
    // If qty doesnt exist or is falsy, default to 1
    qty = qty ? qty : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        // If product exists, add to cart
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty]);

    // Remove item from cart
    const removeFromCartHandler = (e, product) => {
        e.preventDefault();
        dispatch(removeFromCart(product));
    }

    const checkoutHandler = (e) => {
        e.preventDefault();
        props.history.push('/login?redirect=shipping');
    }

    return (
        <div className="top cart-container row">
            <h1>Shopping Cart</h1>
            <div className="col-lg-8 mx-3">
                {cartItems.length === 0 ? <MessageBox>
                    Cart is empty. <Link to="/store">Go To Store</Link>
                </MessageBox>
                    : (
                        <ul>
                            {
                                cartItems.map(item => (
                                    <li key={item.product}>
                                        <div className="custom-row flex-align">
                                            <div className="mb-2">
                                                <img src={`../${item.image}`} alt={item.name} className="small" />
                                            </div>
                                            <div className="min-250 mb-1">
                                                <Link to={`/store/${item.product}`}>{item.name}</Link>
                                            </div>
                                            <div>
                                                <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.amountInStock).keys()].map(
                                                        i => (
                                                            <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                        )
                                                    )}
                                                </select>
                                            </div>
                                            <div className="my-1">
                                                ${item.price}
                                            </div>
                                            <div>
                                                <Button bg={"crimson"} color={"#fff"} onClickEvent={removeFromCartHandler} args={item.product}>Remove</Button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )}
            </div>
            <div className="col-lg-3">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                Subtotal ({cartItems.reduce((a, c) => a + parseInt(c.qty), 0)} items) : $
                                {parseFloat(cartItems.reduce((a, c) => a + parseFloat(c.price) * parseInt(c.qty), 0)).toFixed(2)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" className="btn btn-primary" onClick={checkoutHandler} disabled={cartItems.length === 0}>
                                Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Cart);