import React from "react";
import "./style.css";


const MenuDrinks = (props) => {

    return (
        <div className="drinkDiv">
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                        <img src={props.img} alt="drinkitems"></img></div>
                    <div className="flip-card-back">
                        <h1>{props.name}</h1>
                        <p>{props.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MenuDrinks;