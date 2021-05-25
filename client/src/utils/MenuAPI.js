import axios from "axios";

export const getFood = async () => {
    return await axios("/api/food");
};

export const getDrinks = async () => {
    return await axios("/api/drinks");
};

export const createDrinkAPI = async (formData, userInfo) => {
    return await fetch("/api/drinks", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
}