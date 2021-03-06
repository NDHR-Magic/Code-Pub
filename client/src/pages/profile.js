import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from "../utils/UserAPI";
import { format_date } from '../helpers/formatDate'

function Profile() {
    const [userState, setUserState] = useState({});
    const userInfoData = useSelector(state => state.userSignin);
    const { userInfo } = userInfoData;

    useEffect(() => {
        const getUser = async () => {
            if (userInfo) {
                const { data } = await getUserById(userInfo.id);
                setUserState(data);
            }
        }
        getUser();
    }, [userInfo]);

    return (
        <>
            {userInfo
                ? (
                    userState && userState.user && (
                        <div className="container-fluid text-center">
                            <h1>{userState.user.username}</h1>
                            <h3>{userState.user.first_name} {userState.user.last_name}</h3>
                            <div className="row">
                                <div className="col">
                                    <h1>Favorite Drinks</h1>
                                    {userState.user.favoriteDrinks.length > 0 ? userState.user.favoriteDrinks.map(drinks => {
                                        return (
                                            <div className="card">
                                                <div className="card-title text-center">
                                                    {drinks.name}
                                                </div>
                                                <div className="card-body">
                                                    <img src={drinks.image} height="100px" alt={drinks.name} />
                                                    <p>{drinks.description}</p>
                                                </div>
                                            </div>
                                        )
                                    }) : (
                                        <div className="text-center">
                                            User has no favorited drinks.
                                        </div>
                                    )}
                                </div>
                                <div className="col">
                                    <h1>Order History</h1>
                                    {userState.user.orders.length > 0 ? (userState.user.orders.map(order => (
                                        <div className="card">
                                            <div className="card-title text-center">
                                                order #: {order.id}
                                                <br></br>
                                                ordered at: {format_date(order.updatedAt)}
                                                <p>Order total: ${order.total_price}</p>
                                                <div className="card-body">
                                                    <h3>Items Ordered</h3>
                                                    {order.orderItems.map(item => (
                                                        <>
                                                            <img src={item.item.image} height="100px" alt={item.item.name} /> <span>{item.qty} x ${item.item.price}</span>
                                                        </>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    ))) : (
                                        <h2 className="danger">No orders yet!</h2>
                                    )}
                                </div>
                                <div className="col">
                                    <h1>Events Attending</h1>
                                    <h2>{userState.user.first_name} {userState.user.last_name}</h2>
                                    {userState.events.length > 0 ? userState.events.map(data => {
                                        return (
                                            <div>
                                                <div>
                                                    <div>
                                                        <h2>{data.title}</h2>
                                                        <p>Signed up: {format_date(data.createdAt)}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }) : (
                                        <div className="text-center">
                                            Not attending any events.
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                : (
                    <h1 className="text-center">Not logged in</h1>
                )
            }
        </>
    )
}
export default Profile;