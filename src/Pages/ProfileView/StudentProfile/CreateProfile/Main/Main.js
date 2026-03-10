import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Routes, Route, useParams, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { api_token } from "../../../../../Utils/Network";
import { useLocation } from "react-router-dom";
import Student from "../Student/Student";
import Parent from "../Parent/Parent";
import parent from "../Profileassets/parent.png";
import personal from "../Profileassets/personal.png";
import images from "../Profileassets/profile.png";
import userthumb from "../Profileassets/location.png";
import Human from "../Profileassets/human.png";
import Parents from "../Profileassets/parentsWhite.png";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

function Main() {
  const [data, setData] = useState(1);
  // let editView =  true;
  const [editView, setEditView] = useState(true);
  const [userId, setUserId] = useState("");
  const [userState, setUserState] = useState({});
  var { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [newlyCreatedUser, setNewlyCreatedUser] = useState();

  let userCurrentLocation = location?.state?.newuser;

  useEffect(() => {}, [id, data, editView]);

  console.log(data, "id");
  const handleClick = (id) => {
    setData(id);
  };

  const handleEditCick = () => {
    setEditView(false);
  };

  useEffect(() => {}, [setEditView]);

  // console.log(userState, "userState")
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
            <img className={styles.profileImg} src={images} />
            <div className={styles.camera}>
              <CameraAltOutlinedIcon style={{ cursor: "pointer" }} />
            </div>
          </div>
          <div>
            <div>
              {/* <h1>{`${userState?.user?.first_name} ${userState?.user?.last_name}`}</h1> */}
            </div>
            <div>
              <p className={styles.mr}>{userState?.class_of_student?.title}</p>

              <div
                className={styles.mainContainer}
                style={{ alignItems: "center" }}
              >
                <img src={userthumb} alt="images" />
                {/* <p className={styles.mr} style={{ marginLeft: '5px' }}>Andheri, Mumbai</p> */}
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
                      <img
                        src={info?.id == data ? info.icons : info.icon}
                        className={`${styles.defaultIcons} ${
                          info?.id == data ? styles.activeButton : ""
                        }`}
                      />
                    </div>
                    <div>
                      <p
                        className={` ${
                          info?.id == data ? styles.activeButton : ""
                        }`}
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
            <Student
              setData={setData}
              setNewlyCreatedUser={setNewlyCreatedUser}
              userCurrentLocation={userCurrentLocation}
            />
          )}

          {newlyCreatedUser && data == 2 && (
            <Parent
              newlyCreatedUser={newlyCreatedUser}
              userCurrentLocation={userCurrentLocation}
            />
          )}
          {data == 2 && !newlyCreatedUser && (
            <p>Please Create the User First</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Main;

const sideBar = [
  {
    icon: personal,
    id: 1,
    title: "Personal Information",
    icons: Human,
  },
  {
    icon: parent,
    id: 2,
    title: "Parent Details",
    icons: Parents,
  },
];
