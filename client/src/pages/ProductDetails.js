import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useParams, withRouter } from "react-router-dom";
import { getProduct } from '../actions/productActions';
import LoadingScreen from "../components/LoadingScreen";
import MessageBox from "../components/MessageBox";

const ProductDetails = (props) => {
    const dispatch = useDispatch();
    const productDetails = useSelector((state) => state.productDetails);
    const [qty, setQty] = useState(1);

    const { loading, error, product } = productDetails;
    const { id } = useParams();

    const addToCartHandler = () => {
        props.history.push(`/cart/${id}?qty=${qty}`);
    }

    useEffect(() => {
        dispatch(getProduct(id));
    }, [dispatch, id]);

    return (
        <div className="row home">
            {loading ? (
                <LoadingScreen />
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="product-details-container container row">
                    <div className="col-lg-5">
                        {product.image[1] === "/" ? (
                            <img src={`../${product.image}`} alt={product.name} />
                        ) : (
                            <img src={`${product.image}`} alt={product.name} />
                        )}
                    </div>

                    <div className="product-details col-lg-3 mx-2">
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
                    <div className="product-action col-lg-3">
                        <div className="card card-body text-dark">
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
                                        <div>Remaining</div>
                                        <div>{product.amount_in_stock} left in stock!</div>
                                    </div>
                                </li>
                                {product.amount_in_stock ? (
                                    <>
                                        <li>
                                            <div className="custom-row">
                                                <div>Quantity</div>
                                                <div>
                                                    <select value={qty} onChange={e => setQty(e.target.value)}>
                                                        {[...Array(product.amount_in_stock).keys()].map(
                                                            i => (
                                                                <option key={i + 1} value={i + 1}>{i + 1}</option>
                                                            )
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </li>
                                        <li className="custom-flex">
                                            <button onClick={e => addToCartHandler(e)} className="btn btn-primary">Add to cart</button>
                                        </li>
                                    </>
                                ) : <></>}
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </div >
    );
};

export default withRouter(ProductDetails);