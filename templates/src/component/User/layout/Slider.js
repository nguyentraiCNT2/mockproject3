import React, { useState, useEffect } from 'react';
import '../../../css/ImageSlider.css'; // Import CSS file for styling

const Slider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showControls, setShowControls] = useState(false);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide < 3 ? prevSlide + 1 : 0));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide > 0 ? prevSlide - 1 : 3));
  };

  useEffect(() => {
    // Automatic slide transition every 5 seconds
    const interval = setInterval(nextSlide, 20000);

    return () => clearInterval(interval); // Clear interval when component unmounts
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const handleMouseEnter = () => {
    setShowControls(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
  };

  return (
    <div className="banner">
      <div className="slider" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="slides" style={{ transform: `translateX(${-currentSlide * 100}%)` }}>
          {[1, 2, 3, 4].map((index) => (
            <div className="slide" key={index}>
              <img src={`/images/${index}.png`} alt={`Slide ${index}`} />
            </div>
          ))}
        </div>
        {showControls && (
          <div className="controls">
            <div id="prev" className="control" onClick={prevSlide}>
              &#10094;
            </div>
            <div id="next" className="control2" onClick={nextSlide}>
              &#10095;
            </div>
          </div>
        )}
        <div className="dots">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
