import React, { useEffect } from 'react';
import { Link, withRouter } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CheckoutSteps from "../components/CheckoutSteps.js";
import { createOrder } from '../actions/orderActions.js';
import { ORDER_CREATE_RESET } from '../constants/orderConstants.js';
import Loading from "../components/LoadingScreen";
import MessageBox from "../components/MessageBox";

const PlaceOrder = (props) => {
    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart)
    // Check if payment option was selected
    if (!cart.paymentMethod) {
        props.history.push('/');
    }

    // Grab order from redux store
    const orderCreate = useSelector(state => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order.id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [success, order, props.history, dispatch]);


    const toPriceFixed = num => {
        return Number(num.toFixed(2));
    }

    cart.itemsPrice = toPriceFixed(
        // use reduce method to get total price of cart items
        cart.cartItems.reduce((a, c) => a + c.qty * parseFloat(c.price).toFixed(2), 0)
    );

    cart.shippingPrice = cart.itemsPrice > 100 ? toPriceFixed(0) : toPriceFixed(10);
    cart.taxPrice = toPriceFixed(0.075 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const placeOrderHandler = (e) => {
        e.preventDefault();
        dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
    }

    return (
        <div className="place-order">
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="custom-row top">
                <div className="custom-col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong> {cart.shippingAddress.address},
                                    {cart.shippingAddress.city}, {cart.shippingAddress.state} , {cart.shippingAddress.zipCode}
                                    , {cart.shippingAddress.country}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map(item => (
                                            <li key={item.product}>
                                                <div className="custom-row flex-align">
                                                    <div className="mb-2">
                                                        <img src={`../${item.image}`} alt={item.name} className="small" />
                                                    </div>
                                                    <div className="min-250 mb-1">
                                                        <Link to={`/store/${item.product}`}>{item.name}</Link>
                                                    </div>

                                                    <div className="my-1">
                                                        {item.qty} x ${item.price} = ${item.qty * parseFloat(item.price).toFixed(2)}
                                                    </div>

                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="custom-col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className="custom-row">
                                    <div>Items</div>
                                    <div>${cart.itemsPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="custom-row">
                                    <div>Shipping</div>
                                    <div>${cart.shippingPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="custom-row">
                                    <div>Tax</div>
                                    <div>${cart.taxPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li>
                                <div className="custom-row">
                                    <div><strong>Order Total</strong></div>
                                    <div>${cart.totalPrice.toFixed(2)}</div>
                                </div>
                            </li>
                            <li className="custom-flex">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={e => placeOrderHandler(e)}
                                    disabled={cart.cartItems.length === 0}
                                >Place Order</button>
                            </li>
                            {/* See if loading or error */}
                            {loading && <Loading />}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(PlaceOrder);