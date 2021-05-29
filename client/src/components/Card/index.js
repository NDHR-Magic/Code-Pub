import React from "react";

const Card = (props) => {
    const noNull = [];
    for (const ingredient of props.ingredients) {
        if (ingredient) {
            noNull.push(ingredient);
        }
    }
    const ingredientStr = noNull.join(", ");

    return (
        <div className="custom-card">
            <div style={{ background: props.headerBg ? props.headerBg : "#ffb6c1", color: props.headerColor ? props.headerColor : "#111" }} className="custom-card-header">
                <img src={props.img} alt={props.name} />
            </div>
            <div style={{ background: props.bodyBg ? props.bodyBg : "#fff", color: props.bodyColor ? props.bodyColor : "#111" }} className="custom-card-body">
                <h2 className="center-text">{props.name}</h2>
                <h3 className="center-text">Ingredients</h3>
                <p className="center-text">{ingredientStr}</p>
                <h3 className="center-text">Instructions</h3>
                <p>{props.instructions}</p>
            </div>
        </div>
    )
}

export default Card;