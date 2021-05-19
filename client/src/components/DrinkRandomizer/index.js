import React, { useState, useRef } from "react";
import Header from "../Header";
import Button from "../Button";
import Card from "../Card";
import "./style.css";
import { searchDrink, searchDrinkInfo } from "../../utils/CocktailApi";

const DrinkRandomizer = () => {
    const selectRef = useRef();

    const [drink, setDrink] = useState({
        idDrink: "",
        strDrink: "Mojito",
        strDrinkThumb: "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg"
    });

    const [drinkInfo, setDrinkInfo] = useState({
        ingredients: ["2-3 oz Light rum", "Juice of 1 lime", "2 tsp Sugar", "2-4 Mint", "Soda water"],
        instructions: `Muddle mint leaves with sugar and lime juice.
        Add a splash of soda water and fill the glass with cracked ice.
        Pour the rum and top with soda water.
        Garnish and serve with straw.`
    });

    const searchAPI = async (e) => {
        e.preventDefault();

        //Get random drink using selectRef
        const data = await searchDrink(selectRef.current.value);
        const drinks = data.data.drinks;
        const randomDrink = drinks[Math.floor(Math.random() * drinks.length)];
        const { idDrink, strDrink, strDrinkThumb } = randomDrink;

        // Get info for that drink
        const drinkData = await searchDrinkInfo(strDrink);

        // Push all the ingredients into an arr
        const ingredients = [];
        for (const info in drinkData.data.drinks[0]) {
            if (info.includes("Ingredient")) {
                ingredients.push(drinkData.data.drinks[0][info]);
            }
        }

        setDrink({
            idDrink,
            strDrink,
            strDrinkThumb
        });

        setDrinkInfo({
            ingredients: ingredients,
            instructions: drinkData.data.drinks[0].strInstructions
        })
    }

    return (
        <div className="drink-api">
            <Header><h1>Partying at Home?</h1></Header>

            <form>
                <label htmlFor="alcohol">Choose an alcohol type </label>
                <select name="alcohol" id="alcohol" ref={selectRef}>
                    <option value="vodka">Vodka</option>
                    <option value="gin">Gin</option>
                    <option value="brandy">Brandy</option>
                    <option value="bourbon">Bourbon</option>
                    <option value="tequila">Tequila</option>
                    <option value="rum">Rum</option>
                </select>
                <div className="custom-flex">
                    <Button onClickEvent={searchAPI}>Get random drink!</Button>
                </div>
            </form>

            {!drink.idDrink ? <p className="center-text recommendation">Our favorite drink recommendation!</p> : <span></span>}
            <Card
                name={drink.strDrink}
                img={drink.strDrinkThumb}
                ingredients={drinkInfo.ingredients}
                instructions={drinkInfo.instructions}
            />
        </div>
    )
}

export default DrinkRandomizer;