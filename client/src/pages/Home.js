import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";

function Home() {
    return (
        <div className="home">
            <Header><h1>Code Pub</h1></Header>
            <div className="featuredEvent">
                <h2 className="center-text">Featured Event</h2>
            </div>
            <div className="aboutText center-text">
                <p className=''>
                    At Code Pub, we believe that the mental acuity of our patrons is of the upmost importance! For that reason, we have imbued our menu items with ingredients that are sure to increase the coding prowess of any web savy individual who partakes at our establishment.
                    For first timers at Code Pub, we highly recommend our most famous item, the React Burger. And for those of you who enjoy coding under the guise of a little Balmer's Peak, we recommend the Royal Flush shot served in our <a className='text-decoration-none text-success reactShotGlass' href='/store/2'>React shot glass</a> readily available in our store for $12.99.
                </p>
            </div>

            <p className="center-text event-text">Happy Hour everyday from 2-5pm!</p>


            <Carousel />
            
        </div>
    )
}

export default Home;