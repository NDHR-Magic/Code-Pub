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
};

export const createFoodAPI = async (formData, userInfo) => {
    return await fetch("/api/food", {
        method: "POST",
        body: formData,
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
};

export const deleteFoodAPI = async (id, userInfo) => {
    return await axios.delete(`/api/food/${id}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    });
};

export const deleteDrinkAPI = async (id, userInfo) => {
    return await axios.delete(`/api/drinks/${id}`, {
        headers: {
            Authorization: `Bearer ${userInfo.token}`
        }
    })
};