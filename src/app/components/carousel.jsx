import React, { useState, useEffect } from 'react';

const Carousel = ({ images, autoSlide = true, autoSlideInterval = 3000 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
    };

    const nextSlide = () => {
        setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
    };

    useEffect(() => {
        if (!autoSlide) return;
        const slideInterval = setInterval(nextSlide, autoSlideInterval);
        return () => clearInterval(slideInterval);
    }, [currentIndex, autoSlide, autoSlideInterval]);

    return (
        <div className="carousel">
            <div className="carousel-inner" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {images.map((img, index) => (
                    <div key={index} className="carousel-item">
                        <img src={img} alt={`Slide ${index}`} className="carousel-image" />
                    </div>
                ))}
            </div>
            <button onClick={prevSlide} className="carousel-button prev">❮</button>
            <button onClick={nextSlide} className="carousel-button next">❯</button>
            <div className="carousel-indicators">
                {images.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`indicator ${currentIndex === idx ? 'active' : ''}`} 
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Carousel;
