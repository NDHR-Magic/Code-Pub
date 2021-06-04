import React, { useState } from "react";
import Particles from "react-tsparticles";
import DrinkRandomizer from "../components/DrinkRandomizer";
import DrinkRoulette from "../components/DrinkRoulette";

function Choices(props) {
    return (
        <div className="custom-flex flex-align drinkAppChoices" style={{ display: props.hidden ? "none" : "flex" }}>
            <button onClick={e => props.drinkFunction(e)} className="btn btn-primary">Drink Randomizer</button>
            <button onClick={e => props.rouletteFunction(e)} className="btn btn-primary">Roulette Wheel</button>
        </div >
    )
}

function DrinkApp() {
    const [showComponent, setShowComponent] = useState(false);
    const [component, setComponent] = useState();

    const particlesInit = (main) => {
        // console.log(main);
    }
    const particlesLoaded = container => {
        // console.log(container);
    }

    const drinkFunction = (e) => {
        e.preventDefault();
        setShowComponent(true);

        setComponent("drink");
    }
    const rouletteFunction = (e) => {
        e.preventDefault();
        setShowComponent(true);

        setComponent("roulette");
    }


    return (
        <div className="drinkApp">
            {/* Particles js */}
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                className="particles"
                canvasClassName="particles"
                options={{
                    "background": {
                        "color": {
                            "value": "#333"
                        },
                        "position": "50% 50%",
                        "repeat": "no-repeat",
                        "size": "cover"
                    },
                    "fullScreen": {
                        "enable": true,
                        "zIndex": 1
                    },
                    "interactivity": {
                        "events": {
                            "onClick": {
                                "enable": true,
                                "mode": "repulse"
                            },
                            "onHover": {
                                "enable": true,
                                "mode": "bubble"
                            }
                        },
                        "modes": {
                            "bubble": {
                                "distance": 400,
                                "duration": 0.3,
                                "opacity": 1,
                                "size": 4
                            },
                            "grab": {
                                "distance": 400,
                                "links": {
                                    "opacity": 0.5
                                }
                            }
                        }
                    },
                    "particles": {
                        "links": {
                            "color": {
                                "value": "#ffffff"
                            },
                            "distance": 500,
                            "opacity": 0.4,
                            "width": 2
                        },
                        "move": {
                            "attract": {
                                "rotate": {
                                    "x": 600,
                                    "y": 1200
                                }
                            },
                            "direction": "bottom",
                            "enable": true,
                            "path": {},
                            "outModes": {
                                "bottom": "out",
                                "left": "out",
                                "right": "out",
                                "top": "out"
                            }
                        },
                        "number": {
                            "density": {
                                "enable": true
                            },
                            "value": 400
                        },
                        "opacity": {
                            "random": {
                                "enable": true
                            },
                            "value": {
                                "min": 0.1,
                                "max": 0.5
                            },
                            "animation": {
                                "speed": 1,
                                "minimumValue": 0.1
                            }
                        },
                        "size": {
                            "random": {
                                "enable": true
                            },
                            "value": {
                                "min": 1,
                                "max": 10
                            },
                            "animation": {
                                "speed": 40,
                                "minimumValue": 0.1
                            }
                        }
                    }
                }}
            />
            {/* Show components or choices. If showComponent is true, hide buttons and display selected component */}
            {showComponent ? <Choices hidden={true} /> : <Choices hidden={false} drinkFunction={drinkFunction} rouletteFunction={rouletteFunction} />}
            {/* Show component selected */}
            {(showComponent && component === "drink") ? <DrinkRandomizer /> : ""}
            {(showComponent && component === "roulette") ? <DrinkRoulette /> : ""}
        </div>
    )
}

export default DrinkApp;