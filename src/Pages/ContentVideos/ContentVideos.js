import React, { useEffect, useState, useContext } from "react";
import styles from "./Videos.module.css";
import videoImg from "../../Assets/Videos/videoImg.png";
import Ed from "../../Assets/ContentMangement/mindmap/Ed5.png";
import cnm from "../../Assets/ContentMangement/mindmap/cnm.png";
import Edit from "../../Assets/ContentMangement/mindmap/edit.png";
import Delete from "../../Assets/ContentMangement/mindmap/delete.png";

import videoDecimal from "../../Assets/ContentMangement/mindmap/Decimal.png";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import CustomProgress from "../../Components/CustomProgress/CustomProgress";
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import { useNavigate, useLocation, createSearchParams } from "react-router-dom";
import { api_token, base_url, _access_token } from "../../Utils/Network";
import DrawerComp from "../../Components/DrawerComp/DrawerComp";
import { Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import InputField from "../../Components/Input/InputField";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import DialogBox from "../../Components/DialogBox/DialogBox";
import BoxShadow from "../../Components/BoxShadow/BoxShadow";
import MySnackBar from "../../Components/MySnackBar/MySnackBar";
import Files from "../../File/videos.xlsx";


const ContentVideos = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const [open, setOpen] = useState(false);
  const { content_selection } = useContext(UserCredsContext);
  const [chapterFilter, setChpFilter] = useState(null);
  const [getVideo, setVideo] = useState([]);
  const [file, setFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [submitValue, setSubmitValue] = useState({
    id: "",
    subject_id: content_selection.subject,
    board_id: content_selection.board,
    grade_id: content_selection.grade,
    course: content_selection.course,
    language_id: 1,
    chapter_id: null,
    topic: "",
    provider: 1,
    encoded_video: "",
    title: "",
    description: "",
  })
  console.log("location", location.state);

  useEffect(() => {
    getVideoData();
  }, [])

  const handleRedirect = (info) => {
    console.log(info, "redirect");
    navigate("/dashboard/content/videos/videoPlayer",
      {
        state: info
      });
  };

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };



  const openVideo = () => {
    setSubmitValue({
      id: "",
      subject_id: content_selection.subject,
      board_id: content_selection.board,
      grade_id: content_selection.grade,
      course: content_selection.course,
      language_id: 1,
      chapter_id: null,
      topic: "",
      provider: 1,
      encoded_video: "",
      // title: "",
      description: "",
    })
    setFile(null);
    // setChpFilter(null);
    setOpen(true);
  }

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setSubmitValue({ ...submitValue, [name]: value });
    if (name == "chapter_id") {
      let chp = getVideo.findIndex((x) => { return x.id == value })
      setChpFilter(chp)
  }
  }

  const getVideoData = () => {
    api_token
      // .get(`cms/v1/chapter_videos/?board=${content_selection.board}&grade=${content_selection.grade}&subject=${content_selection.subject}`)
      .get(`content/v1/chapter_wise_videos/?course=${content_selection.course}&grade=${content_selection.grade}`)
      .then((res) => {
        setVideo(res.data.data);
      })
      .catch((err) => console.log(err))
  }

  const newData = (data) => {
    console.log(data, "Datassssssss")
    const { id, language_id, provider, encoded_video, description, subject: subject_id, chapter: chapter_id, topic, board: board_id } = data;
    setSubmitValue({ id, language_id, provider, subject_id, chapter_id, encoded_video, description, topic, board_id });
    let chp = getVideo.findIndex((x) => { return x.id == chapter_id })
    setChpFilter(chp)
    setOpen(true);
  }


  const openBulk = () => {
    setOpenDialog(true);
  }


  const SubmitFile = async () => {

    let data = {
      file: file,
    }
    const formData = new FormData();
    if (data.file) formData.append('file', data.file)
    try {

      await axios({
        method: "Post",
        url: `${base_url}/external/v1/sync/video/`,
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: { 'Authorization': `Bearer ${_access_token}` },
      })
        .then(response => {
          // setLoading(false)
          console.log(response, "rRRRRRRR")
          if (response.status === 200 || response.status === 201) {
            if (response.data.data) {
              alert("Video Bulk Data Uploaded Successfully")
              setFile(null);
              setOpenDialog(false);
              getVideoData();
            }
          }
        })
        .catch(error => {
          console.log(error, 'error');
        })
    } catch (error) {
      console.log(error);
    }
  }



  const submitData = async () => {
    console.log(submitValue, file)

    let data = {
      ...submitValue,
      videos: file
    }
    const formData = new FormData();

    console.log(...formData, "FormData")

    if (data.topic) formData.append("topic", data.topic);
    if (data.title) formData.append("title", data.title);
    if (true) formData.append("index", 1);
    // if (data.encoded_video) formData.append("encoded_video", data.encoded_video);
    if (data.chapter_id) formData.append("chapter_id", data.chapter_id);
    // if (data.language_id) formData.append("language_id", data.language_id);
    if (data.grade_id) formData.append("grade_id", data.grade_id);
    if (data.subject_id) formData.append("subject_id", data.subject_id);
    if (data.board_id) formData.append("board_id", data.board_id);
    if (data.course) formData.append("course", data.course);
    if (data.videos) formData.append('file', data.videos);
    if (data.description) formData.append("description", data.description);

    if (data.id === "") {
      try {

        await axios({
          method: "Post",
          url: `${base_url}content/videos/`,
          data: formData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } },
          headers: { 'Authorization': `Bearer ${_access_token}` },
        })
          .then(response => {
            // setLoading(false)
            if (response.data.data) {
              alert("Video Added Successfully")
              setSubmitValue({
                subject_id: content_selection.subject,
                board_id: content_selection.board,
                grade_id: content_selection.grade,
    course: content_selection.course,

                chapter_id: null,
                topic: "",
                provider: 1,
                encoded_video: "",
                title: "",
                description: "",
                id: null,
              });
              setFile(null);
              setOpen(false);
              getVideoData();
            }
          })
          .catch(error => {
            console.log(error, 'error');
          })
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await axios({
          method: "Patch",
          url: `${base_url}content/videos/${data.id}/`,
          data: formData,
          config: { headers: { 'Content-Type': 'multipart/form-data' } },
          headers: { 'Authorization': `Bearer ${_access_token}` },
        })
          .then(response => {
            // setLoading(false)
            if (response.data.data) {

              alert("Video Updated Successfully")
              // MySnackBar(true, "Video Updated Successfully", "success")
              setSubmitValue({
                subject_id: content_selection.subject,
                board_id: content_selection.board,
                grade_id: content_selection.grade,
    course: content_selection.course,
                
                chapter_id: null,
                topic: "",
                provider: 1,
                encoded_video: "",
                title: "",
                description: "",
                id: null,
              });
              setFile(null);
              setOpen(false);
              getVideoData();
            }
          })
          .catch(error => {
            console.log(error, 'error');
          })
      } catch (error) {
        console.log(error);
      }
    }
  }

  console.log(getVideo, "getVideo")
  return (
    <div>
      <div className={styles.Container}>
        {/* <div className={styles.headerTitle}>
          <h3 className={styles.title}>ICSE | </h3>
          <h3 className={styles.title}>Physics |</h3>
          <h3 className={styles.title}>Grade VI</h3>
        </div> */}

        <div>
          <div className={styles.head}>Activity Videos</div>
        </div>

        {/* <div className={styles.buttonCon}>
          <button
            className={styles.uploadVideo}
            style={{ backgroundColor: "#216E91" }}
            onClick={openVideo}
          >
            Upload Video
          </button>
          <button className={styles.bulkUpload} onClick={() => openBulk()}>Bulk Upload</button>
        </div>   hide in ui for now */}

        {getVideo && getVideo.map((v, i) => (
          <div className={styles.videoContainer}>
            <span className={styles.videoTitle}>Chapter {`${i + 1}. ${v.title}`}</span>

            <Carousel responsive={responsive} swipeable={true}>
              {v.videos.map((info, index) => (
                <div style={{ position: 'relative', width: '95%', margin: '20px',}}>
                  <EditIcon style={{ position: 'absolute', bottom: '20px', right: '13px', zIndex: '999', fontSize: '30px', padding: '3px', background: 'white', borderRadius: '50%', display:"none" }} onClick={() => newData(info)} />

                  <div key={info} className={styles.cardMain} onClick={() => handleRedirect(info)} style={{backgroundImage: `url(${info.thumbnail})`}}>
                    {/* {info.thumbnail ? <img src={info.thumbnail} alt="image" className={styles.imgCard} /> : <img src={videoImg} alt="image" className={styles.imgCard} />} */}
                    {/* <img src={info.icons} alt="image" className={styles.imgLogo} /> */}
                    <div className={styles.customProgress}>
                      <div className={styles.topics}>{info.topic}</div>
                      {/* <CustomProgress value={30} /> */}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>))}

      </div>


      <div >
        <DrawerComp open={open} onClose={() => setOpen(false)} anchor="right">
          <div className={styles.BooksContainer} style={{ padding: '20px' }}>
            <div style={{ fontSize: '19px', marginBottom: '10px' }}>Add Video</div>
            <div style={{ marginBottom: '20px' }}>

              <InputField
                label="Topic Name"
                width="300px"
                value={submitValue?.topic}
                name="topic"
                onChange={handleData}
              />
            </div>
            {/* <div style={{ marginBottom: '20px' }}>

              <InputField
                label="Encoded Url"
                width="300px"
                value={submitValue?.encoded_video}
                name="encoded_video"
                onChange={handleData}
              />
            </div> */}
            {/* <div style={{ marginBottom: '20px' }}>

              <InputField
                label="Title"
                width="300px"
                value={submitValue?.title}
                name="title"
                onChange={handleData}
              />
            </div> */}
            <div style={{ marginBottom: '20px' }}>

              <InputField
                label="Description"
                width="300px"
                multiline
                rows="3"
                value={submitValue?.description || ""}
                name="description"
                onChange={handleData}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <FormControl fullWidth style={{ width: '300px' }}>

                <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={getVideo[chapterFilter]?.id}
                  label="Chapter"
                  name='chapter_id'
                  onChange={handleData}
                >
                  {getVideo && getVideo.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
                </Select>
              </FormControl>
            </div>
            <div>
              <div>Select file</div>
              <input
                type="file"
                accept='file/*'
                onChange={handleChange}
              />
            </div>
            <div>
              <Button className={styles.btns}
                variant="contained"
                onClick={() => submitData()}
              >Add</Button>
            </div>

          </div>
        </DrawerComp>


      </div>

      <div>
        <DialogBox open={openDialog} onClose={() => setOpenDialog(false)} dataSend={() => SubmitFile()}>
          <div>
            <h3>Upload File</h3>
            <p>Get Sample File here
              <a href={Files} download> Click to download</a>
            </p>
            <input type="file" accept='file/*' onChange={handleChange} />
          </div>
        </DialogBox>

      </div>
    </div>
  );
};

export default ContentVideos;


const videoData = [
  {
    id: 1,
    image: videoImg,
    icons: Ed,
  },
  {
    id: 2,
    image: videoImg,
    icons: cnm,
  },
  {
    id: 3,
    image: videoImg,
    icons: Ed,
  },
  {
    id: 4,
    image: videoImg,
    icons: cnm,
  },
]
