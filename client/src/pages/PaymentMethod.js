import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from "react-router-dom";
import { savePaymentMethod } from '../actions/cartActions.js';
import CheckoutSteps from "../components/CheckoutSteps.js";

const PaymentMethod = (props) => {
    const dispatch = useDispatch();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    // If user does not have a shipping address yet, redirect to shipping.
    if (!shippingAddress.address) {
        props.history.push("/shipping");
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form className="form-payment custom-flex" onSubmit={submitHandler}>
                <div>
                    <div>
                        <h1 className="center-text">Payment Method</h1>
                    </div>
                    <div>
                        <div className="center-text">
                            <input type="radio" id="paypal" value="PayPal" name="paymentMethod"
                                required
                                checked={paymentMethod === "PayPal"}
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="paypal">PayPal</label>
                        </div>
                        <div className="center-text">
                            <input type="radio" id="stripe" value="Stripe" name="paymentMethod"
                                required
                                checked={paymentMethod === "Stripe"}
                                onChange={e => setPaymentMethod(e.target.value)}
                            />
                            <label htmlFor="stripe">Stripe</label>
                        </div>
                    </div>
                    <div className="custom-flex">
                        <button className="btn btn-primary" type="submit">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default withRouter(PaymentMethod);