import React from "react";
import { useParams, useLocation } from "react-router-dom";

function Cart(props) {
    const { productId } = useParams();
    const { search } = useLocation();
    const searchParams = new URLSearchParams(search);
    const qty = searchParams.get('qty');

    return (
        <div>
            <h1>Cart page</h1>
            <p>
                ADD TO CART : ProductID: {productId} Qty: {qty ? qty : 1}
            </p>
        </div>
    )
}

export default Cart;