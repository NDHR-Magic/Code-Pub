import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getProduct } from '../actions/productActions';
import Button from "../components/Button";
import LoadingScreen from "../components/LoadingScreen";
import MessageBox from "../components/MessageBox";

const ProductDetails = (props) => {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails;
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    return (
        <div className="row">
            {loading ? (
                <LoadingScreen />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="product-details-container row">
                    <div className="col-5">
                        {product.image[1] === "/" ? (
                            <img src={`../${product.image}`} alt={product.name} />
                        ) : (
                            <img src={`${product.image}`} alt={product.name} />
                        )}
                    </div>

                    <div className="product-details col-3 mx-2">
                        <ul>
                            <li>
                                <h1>{product.name}</h1>
                            </li>
                            <li>
                                Rating TODO
                            </li>
                            <li>
                                Price: ${product.price}
                            </li>
                            <li>
                                Description:
                                <p>{product.description}</p>
                            </li>
                        </ul>
                    </div>
                    <div className="product-action col-3">
                        <div className="card card-body">
                            <ul>
                                <li>
                                    <div className="custom-row">
                                        <div>Price</div>
                                        <div className="price">${product.price}</div>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom-row">
                                        <div>Status</div>
                                        <div>
                                            {product.amount_in_stock > 0 ? (
                                                <span className="success">In Stock :)</span>
                                            ) : (
                                                <span className="danger">Unavailable :(</span>
                                            )}
                                        </div>
                                    </div>
                                </li>
                                <li>
                                    <div className="custom-row">
                                        <div>Quantity</div>
                                        <div>{product.amount_in_stock} left in stock!</div>
                                    </div>
                                </li>
                                <li>
                                    <Button>Add to Cart</Button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default ProductDetails;