import React from 'react';
import { Link } from "react-router-dom";

function StoreItem({ itemName, itemImg, itemPrice, itemId }) {

    return (
        <div className="col-lg-4 col-sm-6">
            <Link to={`/store/${itemId}`} >
                <div className="card bg-dark storeCard">
                    <div className="card-header">
                        <h1 className="fs-3 center-text vsCodeLightBlue">{itemName}</h1>
                    </div>
                    <div className="card-body">
                        <img src={itemImg} alt={itemName}></img>
                        <h3 className='vsCodeGreen'>{`$${itemPrice}`}</h3>
                    </div>
                </div>
            </Link>
        </div>
    )

}

export default StoreItem;