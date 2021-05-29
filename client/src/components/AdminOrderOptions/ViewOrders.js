import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrders } from '../../actions/orderActions';
import { format_date } from '../../helpers/formatDate';
import Button from '../Button';
import Loading from "../LoadingScreen";
import MessageBox from "../MessageBox";
import "./style.css";

const ViewOrders = (props) => {
    const dispatch = useDispatch();
    const ordersList = useSelector(state => state.ordersList);
    const { error, loading, orders } = ordersList;

    useEffect(() => {
        dispatch(fetchAllOrders());
    }, [dispatch]);

    return (
        <div className="orders-list">
            <div className="custom-flex py-3">
                <Button onClickEvent={props.goBack}>Go Back</Button>
            </div>
            {loading
                ? (<Loading />)
                : error
                    ? <MessageBox variant="danger">{error}</MessageBox>
                    : orders ? (
                        <>
                            <h1 className="center-text text-light">Orders</h1>
                            <div className="container">
                                {orders.map(order => (
                                    <div className="card my-4" key={order.id}>
                                        <div className="card-header flex-header">
                                            <h2>Order {order.id}</h2><span>Order at: {format_date(order.createdAt)}</span>
                                        </div>
                                        <div className="card-body">
                                            <ul>
                                                <li>
                                                    Updated at: {format_date(order.updatedAt)}
                                                </li>
                                                <li>
                                                    Is Paid? {order.is_paid ? <span className="success">True</span> : <span className="danger">False</span>}
                                                </li>
                                                <li>
                                                    is Delivered? {order.is_delivered ? <span>{order.delivered_at}</span> : <span className="danger">False</span>}
                                                </li>
                                                <li>
                                                    <h3 className="center-text">Address</h3>
                                                    {order.shippingAddress.address}
                                                    , {order.shippingAddress.city}, {order.shippingAddress.state} , {order.shippingAddress.zip_code}
                                                    , {order.shippingAddress.country}
                                                </li>
                                                <li>
                                                    <h3 className="order-h3">Items</h3>
                                                    <ul className="item-ul">
                                                        {order.orderItems.map(item => (
                                                            <li key={item.id}>
                                                                <span className="mx-3">{item.item.name}</span><span><img className="small mx-3" src={item.item.image} alt={item.item.name} /></span><span>{item.qty} x ${item.item.price}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>
                                                <li>
                                                    Total Price: ${order.total_price}
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <h1 className="center-text">No orders found</h1>
                    )}
        </div>
    );
};

export default ViewOrders;