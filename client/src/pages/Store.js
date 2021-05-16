import React, { useEffect, useState } from "react";
import Filter from "../components/Filter";
import StoreItem from "../components/StoreItem";
import { getProducts } from "../utils/StoreAPI.js";
import LoadingScreen from "../components/LoadingScreen";
import MessageBox from "../components/MessageBox";

function Store() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getProductData = async () => {
            try {
                setLoading(true);
                const productData = await getProducts();
                setLoading(false);

                setProducts(productData.data);
            } catch (err) {
                console.log(err);
                setError(err);
            }
        }
        getProductData();
    }, [])

    //    handleSelectChange function here

    return (
        <div className="store">
            <div className="container">
                <div className="filter-container">
                    <Filter></Filter>
                </div>

                <div className="row">
                    {loading ? (
                        <LoadingScreen />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        products.map((product) => (
                            <StoreItem
                                key={product.id}
                                itemName={product.name}
                                itemPrice={product.price}
                                itemImg={product.image}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default Store;