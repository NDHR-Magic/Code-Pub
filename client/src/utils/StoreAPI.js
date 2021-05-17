import axios from "axios";

export const getProducts = async () => {
    return await axios("/api/products");
}

export const getProductById = async (id) => {
    return await axios(`/api/products/${id}`);
}