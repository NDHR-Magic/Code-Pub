import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from "react-router-dom";
import { saveShippingAddress } from '../actions/cartActions.js';
import CheckoutSteps from "../components/CheckoutSteps.js";

const ShippingAddress = (props) => {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!userInfo) {
        props.history.push("/login");
    }

    const [fullName, setFullName] = useState(shippingAddress.fullName)
    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(fullName, address, city, zipCode, country));
        props.history.push('/payment');
    }

    return (
        <div>
            <CheckoutSteps step1 step2 />
            <form className="form-shipping custom-flex" onSubmit={submitHandler}>
                <div>
                    <div>
                        <h1>Shipping Address</h1>
                    </div>
                    <div>
                        <label htmlFor="fullName">Full Name</label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Enter full name"
                            value={fullName}
                            onChange={e => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            id="address"
                            placeholder="Enter address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            id="city"
                            placeholder="Enter city"
                            onChange={e => setCity(e.target.value)}
                            value={city}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="zipCode">Zip Code</label>
                        <input
                            type="text"
                            id="zipCode"
                            placeholder="Enter zip code"
                            onChange={e => setZipCode(e.target.value)}
                            value={zipCode}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            id="country"
                            placeholder="Enter country"
                            onChange={e => setCountry(e.target.value)}
                            value={country}
                            required
                        />
                    </div>
                    <div className="custom-flex">
                        <button className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default withRouter(ShippingAddress);