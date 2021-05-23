import React from 'react';



function Profile() {
    return (
        <div className="Wrapper">
            <div className="left">
                <img src="https://via.placeholder.com/250" alt="user" width="100"></img>
                <h4>User Name</h4>
                <h5>First and Last</h5>
            </div>
            <div className="right">
                <div className="info">
                    <h3> Favorite Drinks</h3>
                    <div className="info-data"></div>
                    <div className='data'>
                    <img src="https://via.placeholder.com/250" alt='drink' width='70'></img>
                    </div>
                </div>
                <div className="meals">
                    <h3>Favorite meals</h3>
                    <div className="favMealsData">
                        <div className="data">
                        <img src="https://via.placeholder.com/250" alt='meal' width='70'></img> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;