import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getAllMenuItems } from '../../actions/menuActions';
import Button from '../Button';
import Loading from "../LoadingScreen";
import MessageBox from "../MessageBox";

const DeleteMenu = (props) => {
    const dispatch = useDispatch();
    const menuList = useSelector(state => state.menuList);
    const { loading, error, menu } = menuList;

    useEffect(() => {
        dispatch(getAllMenuItems());
    }, [dispatch]);

    const handleDelete = (e, type) => {
        e.preventDefault();
        console.log(parseInt(e.target.getAttribute("data-menuID")));
        console.log(type);
    }

    return (
        <div className="menu-list">
            <div className="custom-flex py-3">
                <Button onClickEvent={props.goBack}>Go Back</Button>
            </div>
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
                            Delete?
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
                                            <td><button
                                                data-menuID={foodItem.id}
                                                className="btn btn-danger"
                                                onClick={e => handleDelete(e, "food")}
                                            >Delete</button></td>
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
                            Delete?
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
                                            <td><button
                                                data-menuID={drinkItem.id}
                                                className="btn btn-danger"
                                                onClick={e => handleDelete(e, "drink")}
                                            >Delete</button></td>
                                        </tr>
                                    ))
                                )
                            )}
                </tbody>
            </table>
        </div>
    );
};

export default DeleteMenu;