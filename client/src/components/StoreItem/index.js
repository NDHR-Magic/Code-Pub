import React from 'react';

function StoreItem (props) {
    return(
        <div className="row mt-4">
            <div className="col-4">
            <div className="card">
                <div className="card-header">
                    <h1 className="fs-2">Item Name</h1>
                </div>
                <div className="card-body">
                    <img src="https://www.loveyourdog.com/wp-content/uploads/2020/04/Chihuahua-Relaxing-Indoors.jpg" height="100" width="100"></img>
                    <h3>$19.99</h3>
                </div>
            </div>
            </div>
        </div>
    )

}

export default StoreItem;