import React, { useEffect, useRef } from 'react'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./index.module.css"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import videoSlide from "../../Assets/ContentMangement/ppt/videoSlide.png";
// import videoslide from "../../Assets/ContentMangement/ppt/videoSlide.png"

const CustomPrevArrow = ({ onClick }) => (
  <button className={`${styles.customArrow} ${styles.customPrevArrow}`} onClick={onClick}>
    {/* &#8249; Unicode for left arrow */}
    <ArrowBackIosNewIcon />
  </button>
);

const CustomNextArrow = ({ onClick }) => (
  <button className={`${styles.customArrow} ${styles.customNextArrow}`} onClick={onClick}>
    {/* &#8250; Unicode for right arrow */}
    <ArrowForwardIosIcon/>
  </button>
);

function CostomButton({
  children,
  cardsPerSlide,
  arrows,
  images = [],
  showThumbs = false,
  imageKey = "",
  showIndicators = true,
  centerMode = false,
  infiniteLoop = false,
  autoPlay = false,
}) {

  const carouselRef = useRef(null);
  const renderSlides = () => {
    const slides = React.Children.toArray(children);

    const groupedSlides = [];
    for (let i = 0; i < slides.length; i += cardsPerSlide) {
      groupedSlides.push(slides.slice(i, i + cardsPerSlide));
    }

    return groupedSlides.map((group, index) => (
      <div key={index} className={styles.slideGroup}>
        {group}
      </div>
    ));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      carouselRef.current.decrement(); // Correct method for navigating to the previous slide
    } else if (e.key === 'ArrowRight') {
      carouselRef.current.increment(); // Correct method for navigating to the next slide
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Carousel 
    ref={carouselRef}
    showArrows={true}
    showStatus={false}
    // statusFormatter={(current, total) =><div className={styles.sowstatus}> {`Current slide: ${current} / Total: ${total}`} </div>}
    showIndicators={false}
    infiniteLoop={false}
    dynamicHeight={false}
    
    centerMode={centerMode}
    autoPlay={autoPlay}
    swipeable={true}
    emulateTouch={true}
    // interval={5000}
    renderThumbs={() =>
      showThumbs &&
      images.map((image, index) => (
        <div className={styles.container} style={{position:"relative"}}>
        <img
          key={index}
          src={image?.is_file == 1 ? image?.url : image?.is_file == 2 ? "videoslide" : image[imageKey]}
          alt="piece"
          width="300"
          height="60"
          // style={{ background: "green" , overflow:'auto'}}
          style={{borderRadius:"10px"}}
        />
        <div className={styles.onslidetext}>{index + 1}</div>
        </div>
      ))
    }
    className={styles.mySwiper}
    renderArrowPrev={(onClickHandler, hasPrev, label) =>
      hasPrev && <CustomPrevArrow onClick={onClickHandler} />
    }
    renderArrowNext={(onClickHandler, hasNext, label) =>
      hasNext && <CustomNextArrow onClick={onClickHandler} />
    }
  >
    {renderSlides()}
    </Carousel >
  )
}

export default CostomButton