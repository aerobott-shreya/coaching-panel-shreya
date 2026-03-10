import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import images from "../../../Assets/Profile/profile.png";
import myuserlocation from "../../../Assets/Profile/location.png";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import attendance from "../../../Assets/Profile/attendance.png";
import parent from "../../../Assets/Profile/parent.png";
import personal from "../../../Assets/Profile/personal.png";
import history from "../../../Assets/Profile/history.png";
import performance from "../../../Assets/Profile/performance.png";
import { _access_token, api_token, base_url } from "../../../Utils/Network";
import Attendance from "../StudentProfile/Attendance/Attendace";
import History from "../StudentProfile/History/History";
import ParentsDetails from "../StudentProfile/ParentsDetails/ParentsDetails";
import Performance from "../StudentProfile/Performance/Performance";
import PersonalInformation from "../StudentProfile/PersonalInformation/PersonalInformation";
import EditStudent from "./EditStudent/EditStudent";
import { useLocation } from "react-router-dom";
import ContactDetails from "./ContactDetails.js/ContactDetails";
import Phone from "../../../Assets/Profile/phone.png";
import Human from "../../../Assets/Profile/human.png";
import CallIcon from "../../../Assets/Profile/call.png";
import attendance2 from "../../../Assets/Profile/attendace2.png";
import history2 from "../../../Assets/Profile/history2.png";
import parent2 from "../../../Assets/Profile/parent2.png";
import performance2 from "../../../Assets/Profile/performance2.png";
import DialogBox from "../../../Components/DialogBox/DialogBox";
import { Button } from "@mui/material";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function StudentProfile(props) {
  const [data, setData] = useState(1);
  // let editView =  true;
  const [editView, setEditView] = useState(true);
  const [userId, setUserId] = useState("");
  const [userState, setUserState] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [file, setFile] = useState("");
  var { id } = useParams();
  const { location, state } = useLocation();
   const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, [id, data, editView]);

  console.log(userState, "userState");
  console.log(userId, "id");
  console.log(state, "DDDDDDDDDsssssssssss");
  // console.log(location.state.id, "navigateId")
  // console.log(location.state.editView)

  const getData = () => {
    api_token
      .get(`profile/v1/student/${id}/`)
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data, "newdata");

          setUserState(res.data.data);
          setUserId(res.data.data.user.id);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleImage = (event) => {
    setFile(event.target.files[0]);
  };

  const UploadImage = () => {
    return (
      <div>
        <form onSubmit={(e) => submitImage(e)} className="fm_data">
          <div>
            <h3>Upload Profile Image</h3>
          </div>
          <div style={{ margin: "10px 0" }}>
            <input type="file" onChange={handleImage} />
          </div>
          <div>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  };

  const handleClick = (id) => {
    setEditView(true);
    setData(id);
  };

  const handleEditCick = () => {
    setEditView(false);
  };

  const submitImage = async (event, number) => {
    event.preventDefault();
    const formData = new FormData();
    if (file) formData.append("image", file);
    try {
      await axios({
        method: "Post",
        url: `${base_url}/auth/v1/user/${userId}/update_avatar/`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
        headers: { Authorization: `Bearer ${_access_token}` },
      })
        .then((response) => {
          console.log(response.data.data);
          if (response.data.data) {
            setOpenDialog(false);
            getData();
          }
        })
        .catch((error) => {
          console.log(error, "error");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handlePop = () => {
    setOpenDialog(true);
  };

  useEffect(() => {}, [setEditView]);

  console.log(openDialog, "openDialog");
  const onHandelChanges = () => {
    navigate("/dashboard/account/student");
  };
  return (
    <div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={onHandelChanges}
      >
        <ArrowBackIosIcon />
        <p className={styles.backarrowText}>Back</p>
      </div>
      <div className={styles.mainContainer}>
        {/*** Side Bar***/}
        <div className={styles.left}>
          <div className={styles.profileInnerContainer}>
            <img
              className={styles.profileImg}
              src={userState?.user?.avatar ? userState?.user?.avatar : images}
            />
            {state?.updateAccess && (
              <div className={styles.camera}>
                <CameraAltOutlinedIcon
                  style={{ cursor: "pointer" }}
                  onClick={(e) => handlePop()}
                />
              </div>
            )}
          </div>
          <div>
            <div>
              <h1>{`${userState?.user?.first_name} ${userState?.user?.last_name}`}</h1>
            </div>
            <div>
              <p className={styles.mr}>{userState?.class_of_student?.title}</p>
              {/* <p className={styles.mr}>C.N.M School & ND Parekh School</p> */}
              <div
                className={styles.mainContainer}
                style={{ alignItems: "center" }}
              >
                {userState?.address?.[0]?.city && (
                  <>
                    <img
                      src={myuserlocation}
                      alt="images"
                      style={{ marginRight: "10px" }}
                    />
                    <p style={{ margin: "0px" }}>
                      {userState?.address?.[0]?.city}
                    </p>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* left side  */}
          <div>
            {sideBar.map((info) => {
              return (
                <>
                  <div
                    onClick={() => handleClick(info.id)}
                    className={`${styles.BtnContainer} ${
                      info?.id == data ? styles.activeButton : ""
                    }`}
                  >
                    <div className={styles.iconImgCon}>
                      {info?.id == data ? (
                        <img src={info.icons} className={`${styles.images}`} />
                      ) : (
                        <img src={info.icon} className={`${styles.images}`} />
                      )}
                    </div>
                    <div>
                      <p
                        className={` ${
                          info?.id == data ? styles.activeButton : ""
                        }`}
                        style={{ color: "#717070" }}
                      >
                        {info.title}
                      </p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        {/* right side */}

        <div className={styles.right}>
          {(data == 1 || data == 2 || data == 6) && (
            <div className={styles.editCon}>
              {/* <p onClick={handleEditCick} className={styles.editItem}>Edit</p> */}
              <button
                onClick={handleEditCick}
                className={
                  // (!state?.updateAccess)  //Removed Update Access

                  false
                    ? `${styles.not_allowed} ${styles.editItem}`
                    : styles.editItem
                }

                // disabled={!state.updateAccess}
              >
                Edit
              </button>
            </div>
          )}
          {data == 1 && editView && (
            <PersonalInformation
              access={state}
              userState={userState}
              userId={userId}
              getData={getData}
            />
          )}
          {data == 2 && editView && (
            <ParentsDetails
              userState={userState}
              editId={data}
              userId={userId}
              getData={getData}
            />
          )}
          {data == 3 && editView && <Attendance userState={userState} />}
          {data == 4 && editView && <History />}
          {data == 5 && editView && <Performance />}

          {data === 1 && editView === false && (
            <EditStudent
              userState={userState}
              editId={data}
              setEditView={setEditView}
              userId={userId}
              getData={getData}
            />
          )}
          {data === 2 && editView === false && (
            <EditStudent
              userState={userState}
              editId={data}
              setEditView={setEditView}
              userId={userId}
              getData={getData}
            />
          )}
        </div>
      </div>

      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        display={false}
      >
        {UploadImage()}
      </DialogBox>
    </div>
  );
}

export default StudentProfile;

const sideBar = [
  {
    icon: personal,
    id: 1,
    title: "Personal Details",
    icons: Human,
  },
  {
    icon: parent,
    id: 2,
    title: "Parent Details",
    icons: parent2,
  },
  // {
  //     icon: attendance,
  //     id: 3,
  //     title: 'Attendance',
  //     icons: attendance2
  // },
  // {
  //     icon: history,
  //     id: 4,
  //     title: 'History',
  //     icons: history2
  // },
  // {
  //     icon: performance,
  //     id: 5,
  //     title: 'Performance',
  //     icons: performance2
  // },
];
