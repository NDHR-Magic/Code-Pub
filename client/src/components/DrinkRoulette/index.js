import React from "react";
import Media from "react-media";
import RouletteWheel from "../RouletteWheel";

const DrinkRoulette = () => {
    const handleOnComplete = (value) => {
        console.log(value);
    };

    return (
        <div>
            <Media queries={{ small: { minWidth: 600 } }}>
                {matches =>
                    matches.small ? (<RouletteWheel baseSize={300} onComplete={handleOnComplete} />) :
                        (<RouletteWheel baseSize={180} onComplete={handleOnComplete} />)
                }
            </Media>
        </div>
    )
}

export default DrinkRoulette;