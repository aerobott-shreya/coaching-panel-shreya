import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";

import images from "../../../Assets/Profile/profile.png";
import myuserlocation from "../../../Assets/Profile/location.png";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import attendance from "../../../Assets/Profile/attendance.png";
import attendance2 from "../../../Assets/Profile/attendace2.png";

import parent from "../../../Assets/Profile/parent.png";
import personal from "../../../Assets/Profile/personal.png";
import history from "../../../Assets/Profile/history.png";
import performance from "../../../Assets/Profile/performance.png";
import { api_token, base_url, _access_token } from "../../../Utils/Network";
import History from "../StudentProfile/History/History";
import ParentsDetails from "../StudentProfile/ParentsDetails/ParentsDetails";
import Performance from "../StudentProfile/Performance/Performance";
import PersonalInformation from "../TeacherProfile/PersonalInformation/PersonalInformation";
import EditStudent from "./EditStudent/EditStudent";
import CallIcon from "../../../Assets/Profile/call.png";
import Human from "../../../Assets/Profile/human.png";
import Phone from "../../../Assets/Profile/phone.png";
import ProfBlack from "../../../Assets/Profile/ProfessionalBlack.png";
import ProfWhite from "../../../Assets/Profile/ProfessionalWhite.png";
import SpecialBlack from "../../../Assets/Profile/Specialistblack.png";
import SpecialWhite from "../../../Assets/Profile/SpecialistWhite.png";
import Teach from "../../../Assets/Profile/performance.png";
import TeachWhite from "../../../Assets/Profile/performanceWhite.png";
import { useLocation } from "react-router-dom";
import ContactDetails from "./ContactDetails/ContactDetails";
import ProfessionalDetail from "./ProfessionalDetail/ProfessionalDetail";
import Specialization from "./Specialization/Specialization";
import Class from "./Class/Class";
import Attendance from "./Attendance/Attendace";
import { Alert, Button, Snackbar } from "@mui/material";
import DialogBox from "../../../Components/DialogBox/DialogBox";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function TeacherProfile() {
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
  const mainUserdetail = JSON.parse(
    localStorage.getItem("coaching_user_cred_context")
  );

  useEffect(() => {
    getData();
  }, [id, data, editView]);

  console.log(mainUserdetail?.user_state?.first_name, "userState");
  console.log(userId, "id");
  // console.log(location.state.id, "navigateId")
  // console.log(location.state.editView)

  const getData = () => {
    api_token
      .get(`profile/v1/teachers/${id}/`)
      .then((res) => {
        if (res.data.data) {
          console.log(res.data.data, "newdata");

          setUserState(res.data.data);
          setUserId(res.data.data.user.id);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleClick = (id) => {
    setEditView(true);
    setData(id);
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
            alert("Profile Pic updated Successfully");
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

  const handleEditCick = () => {
    setEditView(false);
  };

  useEffect(() => {}, [setEditView]);

  // console.log(userState, "userState")
  const onHandelChanges = () => {
    navigate("/dashboard/account/teacher");
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
              <h1
                style={{ margin: "0px" }}
              >{`${userState?.user?.first_name} ${userState?.user?.last_name}`}</h1>
            </div>
            <div>
              {/* <p className={styles.mr}>{userState?.class_of_student?.title}</p> */}
              <p className={styles.mr}>{userState?.institute_name}</p>
              {/* <div className={styles.mainContainer} style={{ alignItems: 'center' }}>
                <img src={myuserlocation} alt="images" />
                <p className={styles.mr} style={{ marginLeft: '5px' }}>Andheri, Mumbai</p>
              </div> */}
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
          {data == 1 && (
            <div className={styles.editCon}>
              {/* <p onClick={handleEditCick} className={styles.editItem}>Edit</p> */}
              <button
                onClick={handleEditCick}
                // className={(!state?.updateAccess) ? `${styles.not_allowed} ${styles.editItem}` : styles.editItem}
                // disabled={!state.updateAccess}
                className={styles.editItem}
              >
                Edit
              </button>
            </div>
          )}
          {data == 1 && editView && (
            <PersonalInformation
              userState={userState}
              userId={userId}
              getData={getData}
            />
          )}
          {data == 2 && editView && (
            <ContactDetails
              access={state}
              userState={userState}
              userId={userId}
              getData={getData}
            />
          )}
          {data == 3 && editView && (
            <ProfessionalDetail
              access={state}
              userState={userState}
              getData={getData}
            />
          )}
          {data == 4 && editView && <Specialization userState={userState} />}
          {data == 5 && editView && <Class userState={userState} />}
          {data == 6 && editView && <Attendance userState={userState} />}
          {data == 7 && editView && <Performance />}

          {data === 1 && editView === false && (
            <EditStudent
              userState={userState}
              editId={data}
              setEditView={setEditView}
              userId={userId}
            />
          )}
          {/*      {(data === 2 && editView === false) && <EditStudent userState={userState} editId={data}  userId={userId}  />} */}
        </div>
      </div>

      <DialogBox
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        display={false}
      >
        {UploadImage()}
      </DialogBox>

      {/* <Snackbar>
        <Alert
      </Snackbar> */}
    </div>
  );
}

export default TeacherProfile;

const sideBar = [
  {
    icon: personal,
    id: 1,
    title: "Personal Details",
    icons: Human,
  },
  {
    icon: CallIcon,
    id: 2,
    title: "Contact Details",
    icons: Phone,
  },
  {
    icon: ProfBlack,
    id: 3,
    title: "Professional Details",
    icons: ProfWhite,
  },
  // {
  //   icon: SpecialBlack,
  //   id: 4,
  //   title: 'Specialisation Subjects',
  //   icons: SpecialWhite
  // },

  // {
  //   icon: Teach,
  //   id: 5,
  //   title: 'I Teach',
  //   icons: TeachWhite
  // },
  // {
  //   icon: attendance,
  //   id: 6,
  //   title: 'Attendance',
  //   icons: attendance2
  // },
  // {
  //   icon: performance,
  //   id: 7,
  //   title: 'Performance',
  //   icons: TeachWhite
  // },
];
