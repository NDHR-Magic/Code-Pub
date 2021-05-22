import React, { useEffect } from 'react';
import { Link, withRouter, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/LoadingScreen";
import MessageBox from "../components/MessageBox";
import { detailsOrder } from '../actions/orderActions.js';

const Order = (props) => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const orderDetails = useSelector(state => state.orderDetails);
    const { loading, error, order } = orderDetails;
    if (order) {
        console.log(order.order);
    }

    useEffect(() => {
        dispatch(detailsOrder(id));
    }, [id, dispatch]);

    return loading ? (<Loading />)
        : error ? (<MessageBox variant="danger">{error}</MessageBox>)
            : (
                <div className="place-order">
                    <h1>Order {order.order.id}</h1>
                    <div className="custom-row top">
                        <div className="custom-col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2>Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.order.shippingAddress.full_name} <br />
                                            <strong>Address:</strong> {order.order.shippingAddress.address},
                                    {order.order.shippingAddress.city}, {order.order.shippingAddress.state} , {order.order.shippingAddress.zip_code}
                                    , {order.order.shippingAddress.country}
                                        </p>
                                        {order.is_delivered ? <MessageBox variant="success">Delivered at {order.delivered_at}</MessageBox>
                                            : <MessageBox variant="danger">Not Delivered</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.order.payment_method}
                                        </p>
                                        {order.is_paid ? <MessageBox variant="success">Paid at {order.paid_at}</MessageBox>
                                            : <MessageBox variant="danger">Not Paid</MessageBox>}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2>Order Items</h2>
                                        <ul>
                                            {
                                                order.order.orderItems.map(item => (
                                                    <li key={item.product}>
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
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
};

export default withRouter(Order);