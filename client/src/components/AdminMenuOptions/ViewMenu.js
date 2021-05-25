import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItems } from '../../actions/menuActions';
import Loading from "../LoadingScreen";
import MessageBox from "../MessageBox";
import "./style.css";

const View = () => {
    const dispatch = useDispatch();
    const menuList = useSelector(state => state.menuList);
    const { loading, error, menu } = menuList;

    useEffect(() => {
        if (!localStorage.getItem("menuList")) {
            dispatch(getAllMenuItems());
        }
    }, [dispatch]);

    return (
        <div className="menu-list">
            {/* Food */}
            <h2 className="center-text">Food Items</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Image
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? (<Loading />)
                        : error
                            ? (<MessageBox variant="danger">{error}</MessageBox>)
                            : (
                                menu && (
                                    menu.food.map(foodItem => (
                                        <tr key={foodItem.id}>
                                            <td>{foodItem.id}</td>
                                            <td>{foodItem.name}</td>
                                            <td>${foodItem.price}</td>
                                            <td>{foodItem.description}</td>
                                            <td><img className="small-img" src={foodItem.image} alt={foodItem.name} /></td>
                                        </tr>
                                    ))
                                )
                            )}
                </tbody>
            </table>

            {/* Drinks */}
            <h2 className="center-text mt-5">Drink Items</h2>
            <table className="table mb-3 pb-3">
                <thead>
                    <tr>
                        <th>
                            ID
                        </th>
                        <th>
                            Name
                        </th>
                        <th>
                            Price
                        </th>
                        <th>
                            Description
                        </th>
                        <th>
                            Image
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {loading
                        ? (<Loading />)
                        : error
                            ? (<MessageBox variant="danger">{error}</MessageBox>)
                            : (
                                menu && (
                                    menu.drink.map(drinkItem => (
                                        <tr key={drinkItem.id}>
                                            <td>{drinkItem.id}</td>
                                            <td>{drinkItem.name}</td>
                                            <td>${drinkItem.price ? drinkItem.price : " Not listed"}</td>
                                            <td>{drinkItem.description}</td>
                                            <td><img className="small-img" src={drinkItem.image} alt={drinkItem.name} /></td>
                                        </tr>
                                    ))
                                )
                            )}
                </tbody>
            </table>
        </div>
    );
};

export default View;