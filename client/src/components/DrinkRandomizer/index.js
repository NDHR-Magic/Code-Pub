import React, { useState } from "react";
import Header from "../Header";
import Button from "../Button";
import Drink from "../Drink";
import "./style.css";
import searchDrink from "../../utils/CocktailApi";

const DrinkRandomizer = () => {
    const placeHolder = async (e) => {
        e.preventDefault();



        const data = await searchDrink();
        const drinks = data.data.drinks;
        const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
        console.log(randomDrink);
    }

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
                    <Button onClickEvent={placeHolder}>Get random drink!</Button>
                </div>
            </form>

            <Drink

            />
        </div>
    )
}

export default DrinkRandomizer;