import React, { useState, useContext, useEffect } from "react";
import styles from "./index.module.css";
import universityIcon from "../../Assets/Assignment/universityIcon.png";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AssignmentCard from "../../Components/AssignmentCard/AssignmentCard";
import Vector from "../../Assets/Assignment/Vector.png";
import University from "../../Assets/Assignment/universityIcon.png";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { Button } from "@mui/material";
import { api_token, base_url, _access_token } from "../../Utils/Network";
import { useNavigate } from "react-router-dom";
import DialogBox from "../../Components/DialogBox/DialogBox";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import Files from "../../File/q&aquestions.xlsx";
import testLogo from "../../Assets/brianhaptest-logo.png";
import AsignTable from '../../Components/AsignTable/AsignTable'
import AssignDIYStable from "../../Components/AssignDIYStable/AssignDIYStable";

function ContentDIYS({ access }) {

    let navigate = useNavigate();
    const [testData, setTestData] = useState([]);
    const { content_selection } = useContext(UserCredsContext);
    const [datas, setData] = useState(0);
    const [assignList, setAssignmentList] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [file, setFile] = useState(null);
  
    useEffect(() => {
      getTest();
    }, []);
  
    const getTest = () => {
      api_token
        // .get(`cms/v1/chapter_test_listing/?board=${content_selection.board}&grade=${content_selection.grade}&subject=${content_selection.subject}`)
        // .get(`cms/v1/chapter_test/?board=${content_selection.board}&grade=${content_selection.grade}&subject=${content_selection.subject}&test_format=2`)
        .get(
          `content/v1/chapter_wise_test/?grade=${content_selection.grade}&course=${content_selection.course}&quiz_type=3`
        )
        .then((res) => {
          setTestData(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
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
          url: `${base_url}/external/v1/sync/q_and_a_questions/`,
          data: formData,
          config: { headers: { "Content-Type": "multipart/form-data" } },
          headers: { Authorization: `Bearer ${_access_token}` },
        })
          .then((response) => {
            // setLoading(false)
            console.log(response, "rRRRRRRR");
            if (response.status === 200 || response.status === 201) {
              if (response.data.data) {
                alert("Q&A Bulk Data Uploaded Successfully");
                setFile(null);
                setOpenDialog(false);
                getTest();
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
  
    const handleChange = (e) => {
      setFile(e.target.files[0]);
    };
  
    const viewAssignList = (vals, num) => {
      setAssignmentList(vals?.test);
      setData(num);
    };
  
    const redirectTo = () => {
      navigate("/dashboard/content/doityourself/doityourselfcreateTest"); /// plese change this currently itis copy peasted
    };
  
    const goToCreateAssignment = (vals) => {
      navigate(`/dashboard/content/doityourself/addQuestion/${vals.id}`, { state: vals });
    };
  
    console.log(assignList, "assignList");
  return (
    <div>
      <div className={styles.Container}>
        {/* <div className={styles.headerTitle}>
                <h3 className={styles.title}>ICSE  | </h3>
                <h3  className={styles.title}   >Physics |</h3>
                <h3   className={styles.title} >Grade VI</h3>
            </div>  */}

        <div className={styles.assign_data}>
          <div className={styles.head}>Do It Yourself</div>
          {/* <div className={styles.assignment}>
            <KeyboardArrowLeftIcon className={styles.iconStyles} />
            <p className={styles.iconStyles}> November 2022</p>
            <KeyboardArrowRightIcon className={styles.iconStyles} />
          </div> */}
          <div>
            {access?.writeAccess && (
              <Button onClick={() => openBulk()}>Bulk Upload</Button>
            )}
            {access?.writeAccess && (
              <Button onClick={() => redirectTo()}>Create Q&A</Button>
            )}
          </div>
        </div>

        {datas == 0 && (
          <div className={styles.AssignmentcardCon}>
            {testData &&
              testData.map((v, i) => (
                <div
                  className={styles.container}
                  onClick={() => {
                    v.test.length > 0
                      ? viewAssignList(v, 1)
                      : alert("No Assignment");
                  }}
                >
                  <div
                    className={styles.cardContainer}
                    style={{ justifyContent: "space-between" }}
                  >
                    <div className={styles.cardContainer}>
                      {/* <div className={styles.imageContainer}>
                        {v.test[0]?.thumbnail ? (
                          <img
                            className={styles.mainImage}
                            src={v.test[0]?.thumbnail}
                          />
                        ) : (
                          <img
                            className={styles.mainImage}
                            // src={universityIcon}
                            src={testLogo}
                          />
                        )}
                      </div> */}
                      <div className={styles.infoflexCon}>
                        <div className={styles.infoContainer}>
                          <div>
                            <span className={styles.infoHeader}> {v.title}</span>
                            <p>{v?.school?.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.iconContainer}>
                      <img src={Vector} />
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {datas == 1 && (
          <div>
            <div className={styles.arrowBack} onClick={() => setData(0)}>
              {" "}
              <ArrowBackIosIcon /> Back
            </div>
            <div>
              {assignList.length > 0 &&
                assignList.map((vals, index) => (
                  <div
                    key={index}
                    className={`${styles.subAssignment} ${styles.assignmentList}`}
                  >
                    <div style={{ display: "flex" }}>
                      <div>
                        <img
                          src={vals?.thumbnail ? vals?.thumbnail : testLogo}
                          alt="university"
                          style={{ width: "60px" }}
                        />
                      </div>
                      <div style={{ marginLeft: "20px" }}>
                        <div className={styles.fontTitle}>{vals?.title}</div>
                        <div className={styles.questionData}>
                          <div>Total Marks: {vals?.total_marks}</div>
                          <div>Total Question: {vals?.total_questions}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Button onClick={() => goToCreateAssignment(vals)}>
                        View Assignment
                      </Button>
                    </div>
                  </div>
                ))}
            </div>
            {/* <AsignTable/> */}
            <AssignDIYStable testId={assignList[0]?.id} />















          </div>
        )}
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
    </div>
  )
}

export default ContentDIYS
