import React from "react";
import styled from 'styled-components';
import { AccountBox } from '../components/accountBox';
import Particles from 'react-tsparticles'

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const particlesInit = (main) => {
    console.log(main);
}
const particlesLoaded = container => {
    console.log(container);
}

function Login() {
    return (
        <div>
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

        <AppContainer>
            <AccountBox />
        </AppContainer>
        </div>
    )
};

export default Login;