import React from "react";
import Header from "../Header";
import Button from "../Button";
import "./style.css";

const DrinkRandomizer = () => {
    return (
        <div className="drink-api">
            <Header><h1>Partying at Home?</h1></Header>

            <form>
                <label htmlFor="alcohol">Choose an alcohol type </label>
                <select name="alcohol" id="alcohol">
                    <option value="tequila">Tequila</option>
                    <option value="rum">Rum</option>
                    <option value="beer">Beer</option>
                </select>
                <div className="custom-flex">
                    <Button>Get random drink!</Button>
                </div>
            </form>
        </div>
    )
}

export default DrinkRandomizer;