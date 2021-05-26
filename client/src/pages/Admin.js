import React, { useState } from 'react';
import { withRouter } from "react-router-dom";
import Button from "../components/Button";
import ViewMenu from "../components/AdminMenuOptions/ViewMenu";
import AddMenu from '../components/AdminMenuOptions/AddMenu';
import DeleteMenu from '../components/AdminMenuOptions/DeleteMenu';
import ViewOrders from '../components/AdminOrderOptions/ViewOrders';

const Admin = () => {
    const [hiddenState, setHiddenState] = useState("");
    const [optionSelected, setOptionSelected] = useState("");
    const [menuOption, setMenuOption] = useState("");
    const [orderOption, setOrderOptions] = useState("");

    const HandleOptionSelect = (e, option) => {
        e.preventDefault();
        setHiddenState("hidden");
        setOptionSelected(option);
    };

    const handleGoBack = (e) => {
        e.preventDefault();
        setHiddenState("");
        setOptionSelected("");
        setMenuOption("");
        setOrderOptions("");
    };

    const handleMenuOptions = (e, option) => {
        e.preventDefault();
        setMenuOption(option);
    };

    const handleOrderOptions = (e, option) => {
        e.preventDefault();
        setOrderOptions(option);
    }

    return (
        <div className="adminPage">
            {/* Default choices for what to access. If any selected, list hides and renders different option container */}
            <div className={`admin-options ${hiddenState}`}>
                <ul>
                    <li>
                        <button className="admin-btn" onClick={e => HandleOptionSelect(e, "menu")}>View Menu Options</button>
                    </li>
                    <li>
                        <button className="admin-btn" onClick={e => HandleOptionSelect(e, "order")}>View Orders Options</button>
                    </li>
                    <li>
                        <button className="admin-btn" onClick={e => HandleOptionSelect(e, "events")}>View Events Options</button>
                    </li>
                    <li>
                        <button className="admin-btn" onClick={e => HandleOptionSelect(e, "store")}>View Store Options</button>
                    </li>
                </ul>
            </div>
            {/* If view menu options selected, show menu choices */}
            {optionSelected === "menu" && !menuOption && (
                <div className="admin-options">
                    <div>
                        <ul>
                            <li>
                                <button className="admin-btn" onClick={e => handleMenuOptions(e, "ViewMenu")}>View Menu Items</button>
                            </li>
                            <li>
                                <button className="admin-btn" onClick={e => handleMenuOptions(e, "AddMenu")}> Add Menu Items</button>
                            </li>
                            <li>
                                <button className="admin-btn" onClick={e => handleMenuOptions(e, "DeleteMenu")}> Delete Menu Items</button>
                            </li>
                            <li>
                                <button className="admin-btn" onClick={e => handleMenuOptions(e, "UpdateMenu")}> Update Menu Items</button>
                            </li>
                        </ul>
                        {/* Button takes you back to initial choices */}
                        <div className="custom-flex flex-align mt-3">
                            <Button onClickEvent={handleGoBack}>Go Back</Button>
                        </div>
                    </div>
                </div>
            )}
            {/* If view order options selected, show order choices */}
            {optionSelected === "order" && !orderOption && (
                <div className="admin-options">
                    <div>
                        <ul>
                            <li>
                                <button className="admin-btn" onClick={e => handleOrderOptions(e, "ViewOrders")}>View Orders</button>
                            </li>
                            <li>
                                <button className="admin-btn" onClick={e => handleOrderOptions(e, "DeleteOrder")}> Delete Order?</button>
                            </li>
                            <li>
                                <button className="admin-btn" onClick={e => handleOrderOptions(e, "UpdateOrder")}> Update Order</button>
                            </li>
                            <li>
                                <button className="admin-btn" onClick={e => handleOrderOptions(e, "RefundOrder")}> Refund?</button>
                            </li>
                        </ul>
                        {/* Button takes you back to initial choices */}
                        <div className="custom-flex flex-align mt-3">
                            <Button onClickEvent={handleGoBack}>Go Back</Button>
                        </div>
                    </div>
                </div>
            )}
            {/* If View Menu Items selected show ViewMenu */}
            {optionSelected === "menu" && menuOption === "ViewMenu" && (
                <ViewMenu goBack={handleGoBack} />
            )}
            {/* Add menu Items */}
            {optionSelected === "menu" && menuOption === "AddMenu" && (
                <AddMenu goBack={handleGoBack} />
            )}
            {/* Delete menu items */}
            {optionSelected === "menu" && menuOption === "DeleteMenu" && (
                <DeleteMenu goBack={handleGoBack} />
            )}
            {/* View orders */}
            {optionSelected === "order" && orderOption === "ViewOrders" && (
                <ViewOrders goBack={handleGoBack} />
            )}

        </div>
    );
};

export default withRouter(Admin);