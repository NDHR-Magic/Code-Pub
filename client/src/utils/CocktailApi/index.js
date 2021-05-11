import axios from "axios";

const searchDrink = async () => {
    const results = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka");
    return results;
}

export default searchDrink;