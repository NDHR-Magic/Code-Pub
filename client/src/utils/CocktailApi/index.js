import axios from "axios";

export const searchDrink = async (drinkType) => {
    const results = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkType}`);
    return results;
};

export const searchDrinkInfo = async (drink) => {
    const results = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    return results;
};