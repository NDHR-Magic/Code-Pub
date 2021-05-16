import React, { useEffect, useState } from 'react';
import { getProductById } from "../utils/StoreAPI";
import { useParams } from "react-router-dom";

const ProductDetails = (props) => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const getProduct = async () => {
            const productInfo = await getProductById(id);
            console.log(productInfo);
        }

        getProduct();
    }, [])

    return (
        <div className="product-details-container row">
            <div className="col-2">
                <img src={"https://via.placeholder.com/150"} />
            </div>

            <div className="product-details col-1">

            </div>
            <div className="product-action col-1">

            </div>
        </div>
    );
};

export default ProductDetails;