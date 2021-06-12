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

    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [state, setState] = useState(shippingAddress.state);
    const [zipCode, setZipCode] = useState(shippingAddress.zipCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress(fullName, address, city, state, zipCode, country));
        props.history.push('/payment');
    }

    const handleSelectChange = (e) => {
        setState(e.target.value);
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
                    {/* List of states */}
                    <div>
                        <label htmlFor="state">State</label>
                        <select id="state" value={state} onChange={(e) => handleSelectChange(e)}>
                            <option value="AL">Alabama</option>
                            <option value="AK">Alaska</option>
                            <option value="AZ">Arizona</option>
                            <option value="AR">Arkansas</option>
                            <option value="CA">California</option>
                            <option value="CO">Colorado</option>
                            <option value="CT">Connecticut</option>
                            <option value="DE">Delaware</option>
                            <option value="DC">District Of Columbia</option>
                            <option value="FL">Florida</option>
                            <option value="GA">Georgia</option>
                            <option value="HI">Hawaii</option>
                            <option value="ID">Idaho</option>
                            <option value="IL">Illinois</option>
                            <option value="IN">Indiana</option>
                            <option value="IA">Iowa</option>
                            <option value="KS">Kansas</option>
                            <option value="KY">Kentucky</option>
                            <option value="LA">Louisiana</option>
                            <option value="ME">Maine</option>
                            <option value="MD">Maryland</option>
                            <option value="MA">Massachusetts</option>
                            <option value="MI">Michigan</option>
                            <option value="MN">Minnesota</option>
                            <option value="MS">Mississippi</option>
                            <option value="MO">Missouri</option>
                            <option value="MT">Montana</option>
                            <option value="NE">Nebraska</option>
                            <option value="NV">Nevada</option>
                            <option value="NH">New Hampshire</option>
                            <option value="NJ">New Jersey</option>
                            <option value="NM">New Mexico</option>
                            <option value="NY">New York</option>
                            <option value="NC">North Carolina</option>
                            <option value="ND">North Dakota</option>
                            <option value="OH">Ohio</option>
                            <option value="OK">Oklahoma</option>
                            <option value="OR">Oregon</option>
                            <option value="PA">Pennsylvania</option>
                            <option value="RI">Rhode Island</option>
                            <option value="SC">South Carolina</option>
                            <option value="SD">South Dakota</option>
                            <option value="TN">Tennessee</option>
                            <option value="TX">Texas</option>
                            <option value="UT">Utah</option>
                            <option value="VT">Vermont</option>
                            <option value="VA">Virginia</option>
                            <option value="WA">Washington</option>
                            <option value="WV">West Virginia</option>
                            <option value="WI">Wisconsin</option>
                            <option value="WY">Wyoming</option>
                        </select>
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