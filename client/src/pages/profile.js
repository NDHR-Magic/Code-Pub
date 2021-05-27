import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserById } from "../utils/UserAPI";




function Profile() {
    const [userState, setUserState] = useState({});

    const userInfoData = useSelector(state => state.userSignin);
    const { userInfo } = userInfoData;

    useEffect(() => {
        const getUser = async () => {
            if (userInfo) {
                const { data } = await getUserById(userInfo.id);
                setUserState(data);
                console.log(data);
            }
        }

        getUser();
    }, []);

    return (
        <>
            {userState.id && userInfo && userInfo.token
                ? (
                    <div className="container-fluid text-center">
                        <h1>{userState.username}</h1>
                        <h3>{userState.first_name} {userState.last_name}</h3>
                        <div className="row">
                            <div className="col">
                            <h2>Favorite Drinks</h2>
                            </div>
                            <div className="col">
                                <h2>Order History</h2>
                            </div>
                        </div>
                    </div>
              
                )
                : (
                    <h1 className="text-center">Not logged in</h1> 
                )
            }
        </>
    )
}
export default Profile;