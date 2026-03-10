import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./Assignments.module.css";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AssignmentCard from "../../Components/AssignmentCard/AssignmentCard";
import University from "../../Assets/Assignment/universityIcon.png";
import { Button } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import ContentCreateAssignment from "../ContentCreateAssignment/ContentCreateAssignment";
import { api_token, base_url, _access_token } from "../../Utils/Network";
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import DialogBox from "../../Components/DialogBox/DialogBox";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import axios from "axios";
import Files from "../../File/q&aquestions.xlsx";

const ContentAssignments = ({access}) => {
  let navigate = useNavigate();
  const [listAssignment, setListAssignment] = useState([]);
  const { content_selection } = useContext(UserCredsContext);
  const [datas, setData] = useState(0);
  const [assignList, setAssignmentList] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState(null);


  useEffect(() => {
    getAssignmentData();
  }, [])


  const redirectTo = () => {
    navigate('/dashboard/content/assignment/createAssignment')
  }

  const goToCreateAssignment = (vals) => {
    navigate(`/dashboard/content/assignment/addQuestion/${vals.id}`, {state: vals})
  }

  const viewAssignList = (vals, num) => {
    setAssignmentList(vals?.assignment);
    setData(num);
  }

  const getAssignmentData = () => {
    api_token
      // .get(`cms/v1/chapter_assignment/?board=${content_selection.board}&grade=${content_selection.grade}&subject=${content_selection.subject}`)
      .get(
        `content/v1/chapter_wise_test/?grade=${content_selection.grade}&course=${content_selection.course}&quiz_type=2`
      )
      .then((res) => {
        setListAssignment(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
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
        url: `${base_url}/external/v1/sync/assignment/`,
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
        headers: { 'Authorization': `Bearer ${_access_token}` },
      })
        .then(response => {
          // setLoading(false)
          console.log(response, "rRRRRRRR")
          if (response.status === 200 || response.status === 201) {
            if (response.data.data) {
              alert("Assignment Bulk Data Uploaded Successfully")
              setFile(null);
              setOpenDialog(false);
              getAssignmentData();
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

  const handleChange = e => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div className={styles.Container}>
        {/* <div className={styles.headerTitle}>
                <h3 className={styles.title}>ICSE  | </h3>
                <h3  className={styles.title}   >Physics |</h3>
                <h3   className={styles.title} >Grade VI</h3>
            </div>  */}
        <div className={styles.head}>Assignment</div>
        <div className={styles.assign_data}>
          {/* <div className={styles.assignment}>
            <KeyboardArrowLeftIcon className={styles.iconStyles} />
            <p className={styles.iconStyles}> November 2022</p>
            <KeyboardArrowRightIcon className={styles.iconStyles} />
          </div> */}
          <div>
          {access?.writeAccess &&  <Button onClick={() => openBulk()}>Bulk Upload</Button>}
            {access?.writeAccess && <Button onClick={() => redirectTo()}>Create Assignment</Button>}
          </div>
        </div>

        {(datas == 0) && <div className={styles.AssignmentcardCon}>
          {listAssignment && listAssignment.map((value, index) => (
            <div onClick={() => {(value.assignment.length > 0) ? viewAssignList(value, 1): alert("No Assignment")}}>
              <AssignmentCard value={value} />
            </div>
          
          ))}
        </div>
        }
        {datas == 1 && <div>
          <div className={styles.arrowBack} onClick={() => setData(0)}> <ArrowBackIosIcon /> Back</div>

          {
            assignList.length > 0 && assignList.map((vals, index) => (
              <div key={index} className={`${styles.subAssignment} ${styles.assignmentList}`}>
                <div style={{display: 'flex'}}>
                  <div>
                    <img src={University} alt="university" />
                  </div>
                  <div style={{ marginLeft: '20px'}}>
                    <div className={styles.fontTitle}>{vals.title}</div>
                    <div className={styles.questionData}>
                      <div >Total Marks: {vals?.total_marks}</div>
                      <div>Total Question: {vals?.total_questions || 0}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <Button onClick={() => goToCreateAssignment(vals)}>View Assignment</Button>
                </div>
              </div>
            ))
          }

        </div>
        }
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

export default ContentAssignments;
