import React, { useEffect } from "react";
import Filter from "../components/Filter";
import StoreItem from "../components/StoreItem";
import LoadingScreen from "../components/LoadingScreen";
import MessageBox from "../components/MessageBox";
import { useSelector, useDispatch } from "react-redux";
import { getAllProducts } from "../actions/productActions";

function Store() {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.productList)
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch])

    return (
        <div className="store">
            <div className="container">
                <div className="row mb-5 p-5">
                    {loading ? (
                        <LoadingScreen />
                    ) : error ? (
                        <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        products.map((product) => (
                            <StoreItem
                                key={product.id}
                                itemId={product.id}
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