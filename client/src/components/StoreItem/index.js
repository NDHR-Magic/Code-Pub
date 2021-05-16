import React from 'react';
import Button from "../Button";

function StoreItem({ itemName, itemImg, itemPrice }) {
    const addToCart = (e) => {
        e.preventDefault();
        console.log("todo asshole. take a hike.")
    }

    return (
        <div className="col-lg-4 col-sm-6">
            <div className="card">
                <div className="card-header">
                    <h1 className="fs-3 center-text">{itemName}</h1>
                </div>
                <div className="card-body">
                    <img src={itemImg} alt={itemName}></img>
                    <h3>{`$${itemPrice}`}</h3>
                </div>
            </div>
        </div>
    )

}

export default StoreItem;