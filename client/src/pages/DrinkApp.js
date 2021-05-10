import React, { useState } from "react";
import Button from "../components/Button";

function Choices() {
    return (
        <div className="custom-flex flex-align drinkAppChoices">
            <Button>Drink Randomizer</Button>
            <Button>Roulette Wheel</Button>
        </div>
    )
}

function DrinkApp() {
    const [component, setComponent] = useState("");

    return (
        <div className="drinkApp">
            <Choices />
        </div>
    )
}

export default DrinkApp;