import React, { useState, useEffect } from "react";
import ImageSlide from "../ImageSlide";
import Arrow from "../CarouselArrow";
import "./style.css";

function CarouselDots(props) {
    let active
    if (props.active) active = "active";
    else active = "not-active";

    return (
        <div className={`carousel-dot ${active}`}></div>
    )
}

function Carousel(props) {
    const [imageIndex, setImageIndex] = useState(0);
    const [dots, setDots] = useState([]);

    const imgUrls = ['./Images/JSBeer-min.png', "./Images/Bar-laptop.png", "./Images/bar.png"];


    useEffect(() => {
        const currentDots = []
        for (let i = 0; i < imgUrls.length; i++) {
            currentDots.push(i);
        }

        setDots(currentDots);
    }, [imgUrls.length])

    const previousSlide = () => {
        const lastIndex = imgUrls.length - 1;
        const currentImageIndex = imageIndex;
        const shouldResetIndex = currentImageIndex === 0;
        const index = shouldResetIndex ? lastIndex : currentImageIndex - 1;

        setImageIndex(index);
    }

    const nextSlide = () => {
        const lastIndex = imgUrls.length - 1;
        const currentImageIndex = imageIndex;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index = shouldResetIndex ? 0 : currentImageIndex + 1;

        setImageIndex(index);
    }

    return (
        <div className="carousel">
            <Arrow
                direction="left"
                clickFunction={previousSlide}
                glyph="&#9664;" />

            <ImageSlide url={imgUrls[imageIndex]} />

            <Arrow
                direction="right"
                clickFunction={nextSlide}
                glyph="&#9654;"
            />

            <div className="dot-holder custom-flex">
                {dots.map(dot => (
                    dots.indexOf(dot) === imageIndex ? (
                        <CarouselDots active={true} key={dots.indexOf(dot)} />
                    ) : (
                        <CarouselDots active={false} key={dots.indexOf(dot)} />
                    )
                ))}
            </div>
        </div>
    )
}

export default Carousel;