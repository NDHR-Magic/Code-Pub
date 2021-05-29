import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from "../utils/UserAPI";



function Profile() {
    const [userState, setUserState] = useState({});
    const userInfoData = useSelector(state => state.userSignin);
    const { userInfo } = userInfoData;
    console.log(userState);
    useEffect(() => {
        const getUser = async () => {
            if (userInfo) {
                const { data } = await getUserById(userInfo.id);
                setUserState(data);
                console.log(data);
            }
        }

        getUser();
    }, [userInfo]);

    return (
        <>
            { userInfo
                ? (
                userState && userState.user && (
                    <div className="container-fluid text-center">
                        <h1>{userState.user.username}</h1>
                        <h3>{userState.user.first_name} {userState.user.last_name}</h3>
                        <div className="row">
                            <div className="col">
                                <h1>Favorite Drinks</h1>
                                {userState.user.favoriteDrinks.map(drinks => {
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
                                })}
                            </div>
                            <div className="col">
                                <h1>Order History</h1>
                                {userState.user.orders.map(order => (
                                    <div className="card">
                                        <div className="card-title text-center">
                                            order #: {order.id}
                                            <br></br>
                                        ordered at: {order.updatedAt}
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
                                ))}
                            </div>
                            <div className="col">
                                    <h1>Events Attending</h1>
                                    <div>
                                        <div>
                                            <h2>{userState.events[0].description}</h2>
                                            <div>
                                                <p></p>
                                            </div>
                                        </div>
                                    </div>
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