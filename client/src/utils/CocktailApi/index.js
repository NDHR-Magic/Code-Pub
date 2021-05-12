import axios from "axios";

export default {
    searchDrink: async function (drinkType) {
        const results = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${drinkType}`);
        return results;
    },

    searchDrinkInfo: async function (drink) {
        const results = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        return results;
    }
};