import React, { useEffect, useState, useContext } from "react";
import styles from "./index.module.css";
import videoImg from "../../Assets/ContentMangement/mindmap/number.png";
import videoDecimal from "../../Assets/ContentMangement/mindmap/Decimal.png";
import matrics from "../../Assets/ContentMangement/mindmap/matrix.png";
import edfive from "../../Assets/ContentMangement/mindmap/Ed5.png";
import cnm from "../../Assets/ContentMangement/mindmap/cnm.png";
import Carousel from "react-multi-carousel";
import Tens from "../../Assets/ContentMangement/mindmap/Ten.png";
import "react-multi-carousel/lib/styles.css";
import CustomProgress from "../../Components/CustomProgress/CustomProgress";
import Pdf from "../../pdf/Management Process & Organizational Behavior.pdf";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { api_token, base_url, _access_token } from "../../Utils/Network";
import {
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import DrawerComp from "../../Components/DrawerComp/DrawerComp";
import InputField from "../../Components/Input/InputField";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import DialogBox from "../../Components/DialogBox/DialogBox";
import { Snackbar } from "@material-ui/core";
import Files from "../../File/books.xlsx";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";

function ContentLessonPlans(props) {
  const { content_selection } = useContext(UserCredsContext);
  const [getEbook, setEbook] = useState([]);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [chapterFilter, setChpFilter] = useState(null);
  const [chapterList, setChapterList] = useState([]);
  const [opnePdf, setOpnePdf] = useState(true);
  const [showPdf, setShowPdf] = useState();

  const [zoom, setZoom] = useState(100);
  const [embedKey, setEmbedKey] = useState(0); // Add a key to force reload

  const zoomIn = () => {
    setZoom((prevZoom) => {
      const newZoom = Math.min(prevZoom + 25, 200); // Limit max zoom to 200%
      setEmbedKey((prevKey) => prevKey + 1); // Update key to force reload
      return newZoom;
    });
  };

  const zoomOut = () => {
    setZoom((prevZoom) => {
      const newZoom = Math.max(prevZoom - 25, 50); // Limit min zoom to 50%
      setEmbedKey((prevKey) => prevKey + 1); // Update key to force reload
      return newZoom;
    });
  };
  const [submitValue, setSubmitValue] = useState({
    id: "",
    // subject_id: content_selection.subject,
    // board_id: content_selection.board,
    grade_id: content_selection.grade,
    course: content_selection.course,
    language_id: 1,
    chapter_id: null,
    topic: "",
    provider: 1,
  });
  const [alertDetails, setAlertDetails] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    message: "",
    errorType: "",
  });
  const { vertical, horizontal } = alertDetails;

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

  useEffect(() => {
    getEbookData();
    // getChapters();
  }, []);

  const getEbookData = () => {
    api_token
      .get(
        `content/V1/chapter_wise_lesson_plan/?grade=${content_selection.grade}&course=${content_selection.course}`
      )
      // .get(`content/v1/chapter_wise_books/?board=${content_selection.board}&grade=${content_selection.grade}&subject=${content_selection.subject}`)
      .then((res) => {
        setEbook(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  //   useEffect(() => {
  //     getChapters();
  // }, []);

  // const getChapters = () => {
  //     api_token
  //         .get(`content/v1/chapter_wise_books/?subject=${content_selection.subject}&grade=${content_selection.grade}&board=${content_selection.board}`)
  //         .then((res) => {
  //             setChapterList(res.data.data);
  //         })
  //         .catch((err) => {
  //             console.log(err)
  //         })
  // }
  const newDataOpen = (file) => {
    // if (!file) {
    //   setAlertDetails({
    //     ...alertDetails,
    //     open: true,
    //     vertical: "top",
    //     horizontal: "center",
    //     message: "No File Present",
    //     errorType: "error",
    //   });

    //   return;
    // }
    // window.open(file, "_blank");
    setOpnePdf(!opnePdf);
    setShowPdf(file);
    console.log(file, "newDataOpen");
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setSubmitValue({ ...submitValue, [name]: value });
    if (name == "chapter_id") {
      let chp = getEbook.findIndex((x) => {
        return x.id == value;
      });
      setChpFilter(chp);
    }
  };

  const newData = (data) => {
    console.log(data, "Datassssssss");
    const {
      id,
      language: language_id,
      provider,
      subject: subject_id,
      chapter: chapter_id,
      topic,
      board: board_id,
    } = data;
    setSubmitValue({
      id,
      language_id,
      provider,
      subject_id,
      chapter_id,
      topic,
      board_id,
    });
    let chp = getEbook.findIndex((x) => {
      return x.id == chapter_id;
    });
    setChpFilter(chp);
    setOpen(true);
  };

  const openBulk = () => {
    setOpenDialog(true);
  };

  const SubmitFile = async () => {
    let data = {
      file: file,
    };
    const formData = new FormData();
    if (data.file) formData.append("file", data.file);
    try {
      await axios({
        method: "Post",
        url: `${base_url}/external/v1/sync/books/`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        headers: { Authorization: `Bearer ${_access_token}` },
      })
        .then((response) => {
          // setLoading(false)
          console.log(response, "rRRRRRRR");
          if (response.status === 200 || response.status === 201) {
            if (response.data.data) {
              // alert("EBook Bulk Data Uploaded Successfully")
              setAlertDetails({
                ...alertDetails,
                open: true,
                message: "EBook Bulk Data Uploaded Successfully",
                errorType: "success",
              });
              setFile(null);
              setOpenDialog(false);
              getEbookData();
            }
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setAlertDetails({
      ...alertDetails,
      open: false,
      message: "",
      errorType: "",
    });
  };

  const submitData = async (e) => {
    let data = {
      ...submitValue,
      ebook: file,
    };

    const formData = new FormData();

    if (data.topic) formData.append("topic", data.topic);
    if (data.chapter_id) formData.append("chapter_id", data.chapter_id);
    if (data.language_id) formData.append("language_id", data.language_id);
    if (data.grade_id) formData.append("grade_id", data.grade_id);
    if (data.course) formData.append("course", data.course);
    // if (data.board_id) formData.append("board_id", data.board_id);
    if (data.ebook) formData.append("file", data.ebook);
    if (data.provider) formData.append("provider", data.provider);

    console.log(...formData, "FormData");
    if (data.id === "" || data.id === undefined) {
      try {
        let { id, ...rest } = data;
        let datas = [...Object.values(rest)].every(Boolean);
        if (!datas) {
          setAlertDetails({
            ...alertDetails,
            open: true,
            message: "Please Fill proper details",
            errorType: "error",
          });
          return;
        }

        await axios({
          method: "Post",
          url: `${base_url}content/v1/lesson/plan/`,     /// api need to veryfied for single upload and new bulkuploade aip needed
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
          headers: { Authorization: `Bearer ${_access_token}` },
        })
          .then((response) => {
            // setLoading(false)
            if (response.data.data) {
              // alert("Ebook Added Successfully")
              setAlertDetails({
                ...alertDetails,
                open: true,
                message: "Ebook Added Successfully",
                errorType: "success",
              });
              setSubmitValue({
                subject_id: content_selection.subject,
                board_id: content_selection.board,
                grade_id: content_selection.grade,
                language_id: 1,
                chapter_id: null,
                topic: "",
              });
              setFile(null);
              setOpen(false);
              getEbookData();
            }
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (error) {
        console.log(error);
        setAlertDetails({
          ...alertDetails,
          open: true,
          message: "Error Filling Data",
          errorType: "error",
        });
      }
    } else {
      try {
        await axios({
          method: "Patch",
          url: `${base_url}/content/v1/books/${data.id}/`,
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
          headers: { Authorization: `Bearer ${_access_token}` },
        })
          .then((response) => {
            // setLoading(false)
            if (response.data.data) {
              // alert("Mind Map Added Successfully")
              setAlertDetails({
                ...alertDetails,
                open: true,
                message: "Ebook Updated Successfully",
                errorType: "success",
              });
              setSubmitValue({
                subject_id: content_selection.subject,
                board_id: content_selection.board,
                grade_id: content_selection.grade,
                language_id: 1,
                chapter_id: null,
                topic: "",
              });
              setFile(null);
              setOpen(false);
              getEbookData();
            }
          })
          .catch((error) => {
            console.log(error, "error");
          });
      } catch (error) {
        console.log(error);
        setAlertDetails({
          ...alertDetails,
          open: true,
          message: "Error Filling Data",
          errorType: "error",
        });
      }
    }
  };
  return (
    <div>
      <div className={styles.Ebooks_main}>
        <div className={styles.head}>Lesson Plan</div>
        <div>
          {/* {props?.access?.writeAccess &&  */}
          {/* <Button onClick={() => openBulk()}>Bulk Upload</Button>  hide from ui on insitude panel*/}
          {/* } */}
          {/* {props?.access?.writeAccess &&  */}

          {/* <Button onClick={() => setOpen(true)} >Add Note</Button>    hide from ui on insitude panel */}
          {/* } */}
        </div>
      </div>

      {
        opnePdf ? (
          <div>
        {getEbook &&
          getEbook.map((v, i) => (
            <div>
              <p className={styles.subHead}> Chapter {`${i + 1}. ${v.title}`}</p>
              <div>
                <Carousel
                  swipeable={false}
                  autoPlaySpeed={1000}
                  keyBoardControl={true}
                  responsive={responsive}
                >
                  {v?.books?.map((info, index) => (
                    <div
                      style={{
                        position: "relative",
                        width: "95%",
                        margin: "20px",
                      }}
                    >
                      {props?.access?.updateAccess && (
                        <EditIcon
                          style={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            zIndex: "999",
                            fontSize: "30px",
                            padding: "3px",
                            background: "white",
                            borderRadius: "50%",
                          }}
                          onClick={() => newData(info)}
                        />
                      )}

                      <div
                        key={index}
                        className={styles.cardMind}
                        onClick={() => newDataOpen(info)}
                      >
                        {/* <img src={edfive} alt="images" className={styles.imgLogo} />
                                <div style={{ height: '240px' }}> */}
                        {info.thumbnail ? (
                          <img
                            src={info.thumbnail}
                            alt="image"
                            className={styles.imgCard}
                          />
                        ) : (
                          <img
                            src={videoImg}
                            alt="image"
                            className={styles.imgCard}
                          />
                        )}
                        {/* </div> */}
                        <div>{info.topic}</div>
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>
          ))}
      </div>

        ) : (
          <div>
          <div
            onClick={newDataOpen}
            style={{
              display: "inline-flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            {/* <ArrowBackIcon /> */}
            {/* <img src={backArrowBtn} alt="backarrow" /> */}
            <ArrowBackIosIcon />
            <p className={styles.backarrowText}>Back</p>
            <h4 className={styles.pdfNameabovePdf}>{showPdf.topic}</h4>
          </div>
          <div className={styles}>
          <div className={styles.btnContainers}>
              <Button variant="contained" onClick={zoomOut}>
                {" "}
                <ZoomInIcon />
              </Button>
              <Button variant="contained" onClick={zoomIn}>
                {" "}
                <ZoomOutIcon />
              </Button>
            </div>
            <embed
               key={embedKey} // Use key to force reload
              src={`${showPdf?.file}#zoom=${zoom}&toolbar=0`}
              // src="https://d31j8vyj7gdpxq.cloudfront.net/data/files/content_notes/gess1ps_merged.pdf"
              type="application/pdf"
              frameBorder="0"
              scrolling="auto"
              height="900px"
              width="100%"
              toolbar="0"
              // hidecontrols="1"
            ></embed>
          </div>
        </div>
        )
      }
      

      <div>
        <DrawerComp open={open} onClose={() => setOpen(false)} anchor="right">
          <div className={styles.BooksContainer}>
            <div style={{ fontSize: "19px", marginBottom: "10px" }}>
              Add Ebooks
            </div>
            <div style={{ marginBottom: "20px" }}>
              <InputField
                label="Topic Name"
                width="300px"
                value={submitValue?.topic}
                name="topic"
                onChange={handleData}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <FormControl fullWidth style={{ width: "300px" }}>
                <InputLabel id="demo-simple-select-label">Chapter</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={chapterObj.chapter_id}
                  value={getEbook[chapterFilter]?.id}
                  label="Chapter"
                  name="chapter_id"
                  onChange={handleData}
                >
                  {getEbook &&
                    getEbook.map((v, i) => (
                      <MenuItem value={v.id}>{v.title}</MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <div>Select file</div>
              <input type="file" accept="file/*" onChange={handleChange} />
            </div>
            <div>
              <Button
                className={styles.btns}
                onClick={() => submitData()}
                variant="contained"
              >
                Add
              </Button>
            </div>
          </div>
        </DrawerComp>
      </div>

      <div>
        <DialogBox
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          dataSend={() => SubmitFile()}
        >
          <div>
            <h3>Upload File</h3>
            <p>
              Get Sample File here
              <a href={Files} download>
                {" "}
                Click to download
              </a>
            </p>
            <input type="file" accept="file/*" onChange={handleChange} />
          </div>
        </DialogBox>
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={alertDetails.open}
        style={{ zIndex: 9999 }}
        onClose={handleClose}
        autoHideDuration={6000}
      >
        <Alert severity={alertDetails.errorType} sx={{ width: "100%" }}>
          {alertDetails.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default ContentLessonPlans;
