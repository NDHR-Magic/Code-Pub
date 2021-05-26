import React, { useEffect } from "react";
import MenuFood from "../components/MenuFood";
import MenuDrink from "../components/MenuDrinks";
import MenuAPI, { getFood, getDrinks } from "../utils/MenuAPI";


function Menu() {
    const [drinkSelection, setDrinkSelection] = React.useState(false);
    const [FoodSelection, setFoodSelection] = React.useState([]);
    const [drinkItems, setDrinkItems] = React.useState([]);
    useEffect(() => {
        const getFoodItems = async () => {
            const { data } = await getFood()
            console.log(data)
            setFoodSelection(data)
        }
        const getDrinkItems = async () => {
            const { data } = await getDrinks();
            setDrinkItems(data);
        }
        getFoodItems();
        getDrinkItems();
    }, []);

    const handleMenuChange = (e) => {
        if (document.getElementById("checkboxInput").checked) {
            setDrinkSelection(true);
        } else {
            setDrinkSelection(false);
        }
    }

    return (
        <div className="menuPage">
            <title className="titleMenu vsCodeLightPurple">
                Menu
            </title>
            <div className="changeMenu vsCodeLightYellow">See Drink Options
            <input id="checkboxInput" type="checkbox" onChange={e => handleMenuChange(e)}></input>
            </div>
            {drinkSelection
                ? (<div className="drinkContainer">
                    {drinkItems.map((drink) => (
                        <MenuDrink
                            key={drink.id}
                            id={drink.id}
                            name={drink.name}
                            desc={drink.description}
                            img={drink.image}
                        />
                    ))}</div>)
                : (
                    <div className="foodContainer">
                        {FoodSelection.map((food) => (
                            <MenuFood
                                key={food.id}
                                id={food.id}
                                name={food.name}
                                desc={food.description}
                                img={food.image}
                                price={food.price}
                            />
                        ))}
                    </div>
                )}
        </div>
    )
}

export default Menu;