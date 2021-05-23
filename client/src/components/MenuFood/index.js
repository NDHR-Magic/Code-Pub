import React from "react";
import "./style.css";


const MenuFood = (props) => {

    return (
        <div className="foodDiv">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={props.img} alt="fooditems"></img></div>
                    <div className="flip-card-back">
                        <h1>{props.name}</h1>
                        <p>{props.desc}</p>
                        <p>{props.price}</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MenuFood;