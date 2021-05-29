import React from "react";
import Header from "../components/Header";

function About() {
    return (
        <div className="about-page">
            <Header bgColor={"#111"} textColor={"#fff"}><h1>Our Story</h1></Header>
            <div className="about-container">
                <div className="left">
                    <p className="left-text">Code Pub was founded by five coding bootcamp students. Starting off as a mock, demo site, we decided to continue developing it after graduation till some of us decided to turn it into a reality.
                    Established June 30<sup>th</sup> 2021, Code Pub is a fairly new bar that wants to welcome new patreons to join our community with special deals and events that will be posted every month.
                    </p>
                    <p className="left-text">Code Pub strives to provide a relaxing environemt for people to come together and enjoy a bite to eat or a few drinks,
                    all while incorporating the bar atmosphere with coding!</p>
                </div>
                <div className="right">
                    <img src="https://d6f6d0kpz0gyr.cloudfront.net/uploads/images-archive/Blog/Gifs/coding.gif?mtime=20200914144127&focal=none" alt="placeholder" />
                </div>
            </div>

            <div className="about-container">
                <div className="left">
                    <img src="./Images/About-us-code.jpeg" alt="Code" />
                </div>
                <div className="right">
                    <p className="right-text">
                        Coding competitions monthly with prizes and more! Fun games in the back such as bean bag toss or board games.
                    </p>
                    <p className="right-text">
                        You must be 21 or older to sit at the bar or participate in any alcohol themed activities.
                    </p>
                    <p className="right-text">
                        Find us at 123 Test Avenue, Placeholder, FL, #####, USA
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About;