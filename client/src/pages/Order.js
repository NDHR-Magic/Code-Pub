import React, { useEffect, useState } from 'react';
import { PayPalButton } from "react-paypal-button-v2";
import { Link, withRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import Loading from "../components/LoadingScreen";
import MessageBox from "../components/MessageBox";
import { detailsOrder, payOrder } from '../actions/orderActions.js';
import { ORDER_PAY_RESET } from '../constants/orderConstants';

const Order = (props) => {
    const dispatch = useDispatch();
    // PayPal standard development kit state
    const [sdkReady, setSdkReady] = useState(false);
    // Order id from params
    const { id } = useParams();

    const orderPay = useSelector(state => state.orderPay);
    const { error: errorPay, success: successPay, loading: loadingPay } = orderPay;

    let userInfoObj = useSelector(state => state.userSignin);
    if (!userInfoObj.userInfo) {
        userInfoObj = { userInfo: { id: 0 } }
    }
    const { userInfo: { id: userId } } = userInfoObj;

    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, order } = orderDetails;

    useEffect(() => {
        // Add paypal script to page
        const addPayPalScript = async () => {
            const { data } = await axios.get("/api/config/paypal");

            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!order || successPay || (order && order.order.id !== parseInt(id))) {
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(detailsOrder(id));
        } else {
            if (!order.order.is_paid) {
                if (!window.paypal) {
                    addPayPalScript();
                } else {
                    setSdkReady(true);
                }
            }
        }

    }, [id, dispatch, sdkReady, order, successPay]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order.order, paymentResult));
    };

    // Check if loading. If not render either error or order
    return loading ? (<Loading />)
        // Check if error and render error. If not render order.
        : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (userId === order.order.user.id) ? (
                <div className="place-order">
                    <h1>Order {order.order.id}</h1>
                    <div className="custom-row top">
                        <div className="custom-col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        {/* Shipping info */}
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.order.shippingAddress.full_name} <br />
                                            <strong>Address:</strong> {order.order.shippingAddress.address},
                                    {order.order.shippingAddress.city}, {order.order.shippingAddress.state} , {order.order.shippingAddress.zip_code}
                                    , {order.order.shippingAddress.country}
                                        </p>
                                        {/* Check if order is delivered or not */}
                                        {order.order.is_delivered ? <MessageBox variant="success">Delivered at {order.order.delivered_at}</MessageBox>
                                            : <MessageBox variant="danger">Not Delivered</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        {/* Payment info */}
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.order.payment_method}
                                        </p>
                                        {/* Check if order is paid or not */}
                                        {order.order.is_paid ? <MessageBox variant="success">Paid at {order.order.paid_at}</MessageBox>
                                            : <MessageBox variant="danger">Not Paid</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {
                                                // Map through ordered items and display price and quantity ordered.
                                                order.order.orderItems.map(item => (
                                                    <li key={item.item.id}>
                                                        <div className="custom-row flex-align">
                                                            <div className="mb-2">
                                                                <img src={`../${item.item.image}`} alt={item.item.name} className="small" />
                                                            </div>
                                                            <div className="min-250 mb-1">
                                                                <Link to={`/store/${item.item.id}`}>{item.item.name}</Link>
                                                            </div>

                                                            <div className="my-1">
                                                                {item.qty} x ${item.item.price} = ${item.qty * parseFloat(item.item.price).toFixed(2)}
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
                                            <div>${parseFloat(order.order.items_price).toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="custom-row">
                                            <div>Shipping</div>
                                            <div>${parseFloat(order.order.shipping_price).toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="custom-row">
                                            <div>Tax</div>
                                            <div>${parseFloat(order.order.tax_price).toFixed(2)}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="custom-row">
                                            <div><strong>Order Total</strong></div>
                                            <div>${parseFloat(order.order.total_price).toFixed(2)}</div>
                                        </div>
                                    </li>
                                    {
                                        // Check if order is paid. If not render PayPal button.
                                        !order.order.is_paid && (
                                            <li>
                                                {!sdkReady
                                                    ? (<Loading />)
                                                    : (
                                                        // PayPal button
                                                        <>
                                                            {errorPay && <MessageBox variant="danger">{errorPay}</MessageBox>}
                                                            {loadingPay && <Loading />}
                                                            <PayPalButton amount={order.order.total_price} onSuccess={successPaymentHandler}></PayPalButton>
                                                        </>
                                                    )}
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (<div className="center-text">Order does not belong to you</div>);
};

export default withRouter(Order);