import axios from "axios";

export const getFood = async () => {
    return await axios("/api/food");
};

export const getDrinks = async () => {
    return await axios("/api/drinks");
};