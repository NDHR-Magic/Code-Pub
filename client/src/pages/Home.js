import React from "react";
import Header from "../components/Header";
import Carousel from "../components/Carousel";

function Home() {
    return (
        <div className="home">
            <Header><img src='./Images/codePubLogo.png' height='150' width='250' alt="Code Pub logo"></img></Header>
            <div className="featuredEvent">
                <h2 className="center-text">Featured Event</h2>
            </div>
            <div className="aboutText center-text">
                <p className='fs-4'>
                    At {'{CodePub}'}, we <span className='vsCodeLightBlue'>believe</span> that the mental acuity of <span className=''>our patrons is </span> of the upmost <span className='vsCodePurple'>importance!</span> For that reason, we have imbued our <span className=''>menu items</span> with ingredients that are  <span className='vsCodeLightYellow'>sure to increase</span> the coding prowess of any <span className=''>web savy individual</span> who
                 partakes <span className='vsCodeDarkBlue'>at our establishment.</span> For first timers at {'{CodePub}'}, we highly <span className=''>recommend our most</span> famous item, the React Burger. <span className=''>And for those</span> of you who <span className=''>enjoy coding</span> under the guise of a little <span className='vsCodeOrange'>Balmer's Peak,</span> we recommend the <span className=''>Royal Flush</span> shot served in our <a className='text-decoration-none reactShotGlass' href='/store/2'>React shot glass</a> readily available in our store for<span className='vsCodeLightPurple'> $12.99.</span>
                </p>
            </div>

            <p className="center-text event-text">Happy Hour everyday from 2-5pm!</p>


            <Carousel />

        </div>
    )
}

export default Home;