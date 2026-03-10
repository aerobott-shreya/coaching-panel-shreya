import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { api_token } from '../../Utils/Network';
// import ContentPptTopic from '../ContentPptTopic/ContentPptTopic';
import Carousel from "react-multi-carousel";
import CostomButton from './CostomButton';
import styles from './index.module.css';
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

function ContentPPTchapterSlides() {
  // const location = useLocation();
  const navigate = useNavigate();
  const { pptID } = useParams();
  // const { subtopic } = location.state;
  const [activeSlide, setActiveSlide] = useState(0);
  const [pptData, setPPTData] = useState([]);

  console.log(pptID, "ContentPPTchapterSlides");

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const handelBack = () => {
    navigate(-1)
  }

  const handleSlideChange = (index) => {
    setActiveSlide(index);
  };

  // api call

  const getAllpptData = (id) => {
    api_token
      // .get(`/content/v1/chapter_wise_ppts/?ppt=${id}&page_size=200`)
      .get(`content/v2/chapter_wise_ppts?chapter=${id}&page_size=200`)
      .then((res) => {
        console.log(res?.data?.data, "getAllpptData");
        setPPTData(res?.data?.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    getAllpptData(pptID);
  }, [pptID])

  return (
    <>
      <div>
        <h2 style={{display:"flex", alignItems:'center' , cursor:"pointer"}} onClick={handelBack}><ArrowBackIosNewIcon className={styles.arrows} /> Back</h2>

        <CostomButton
          cardsPerSlide={1}
          images={pptData}
          showThumbs={true}
          imageKey="thumbnail"
          arrows={true}
          showIndicators={false}
        >
          {pptData.map((item, index) => {
            let type = item.is_file;
            return (
              <div
                style={{
                  width: "45vw",
                  margin: "auto",
                }}
              >
                {type === 1 && (
                  <img  src={item.url} style={{ width: "100%" , borderRadius:"10px"}} />
                )}
                {type === 2 && (
                  <video
                    controls={true}
                    autoPlay={false}
                    muted={false}
                    loop
                    style={{ width: "100%" , borderRadius:"10px"}}
                  >
                    <source src={item?.url} type="video/mp4" />
                  </video>
                )}
              </div>
            );
          })}
        </CostomButton>
      </div>

    </>
  )
}

export default ContentPPTchapterSlides

