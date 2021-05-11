import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";

function Home() {
    return (
        <div className="home">
            <Header><h1>Code Pub</h1></Header>
            <div className="featuredEvent">
                <h2 className="center-text">Featured Event</h2>
                <p className="center-text event-text">Happy Hour 2-5pm</p>
            </div>
            <Carousel />
            <div className="aboutText center-text">
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse veniam praesentium eum rerum debitis vero similique doloremque quam autem cum nemo molestias,
                    beatae officia labore temporibus pariatur incidunt laborum quae! Quas ipsa repellendus assumenda,
                    temporibus illo nisi mollitia modi voluptatum nemo nobis tempore molestiae nulla dignissimos similique culpa nostrum earum!
                </p>
            </div>
        </div>
    )
}

export default Home;