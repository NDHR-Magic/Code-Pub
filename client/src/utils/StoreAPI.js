import axios from "axios";

const getProducts = async () => {
    const results = await axios("http://localhost:3000/api/products");
    return results;
}

export default getProducts;