import axios from "axios";

export const getProducts = async () => {
    const results = await axios("http://localhost:3000/api/products");
    return results;
}

export const getProductById = async (id) => {
    return await axios(`http://localhost:3000/api/products/${id}`);
}