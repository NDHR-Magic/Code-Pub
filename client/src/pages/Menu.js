import React from "react";
import MenuFood from "../components/MenuFood";
import MenuDrink from "../components/MenuDrinks";


function Menu() {
    const [menuSelection, setMenuSelection] = React.useState(MenuFood);

    return (
        <div>
            <title className="titleMenu">
                Menu
            </title>
            <div className="changeMenu col">See Drink Options
            <input id="radioSelect" type="radio"></input>
            </div>
            {menuSelection}
        </div >
    )
}

export default Menu;