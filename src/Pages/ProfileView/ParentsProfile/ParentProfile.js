import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';

import images from "../../../Assets/Profile/profile.png";
import myuserlocation from "../../../Assets/Profile/location.png"
import React, { useState, useEffect } from 'react'
import styles from './index.module.css';
import { Routes, Route, useParams } from 'react-router-dom';
import parent from '../../../Assets/Profile/parent.png';
import personal from '../../../Assets/Profile/personal.png';
import { api_token } from "../../../Utils/Network"
import Attendance from "../StudentProfile/Attendance/Attendace";
import History from "../StudentProfile/History/History";
import Performance from "../StudentProfile/Performance/Performance";
import PersonalInfo from "./PersonalInfo/PersonalInfo";
import StudentDetail from "./StudentDetail/StudentDetail"
import { useLocation } from 'react-router-dom';
import Human from "../../../Assets/Profile/human.png";
import parent2 from "../../../Assets/Profile/parent2.png"
import EditParents from './EditParents';


function ParentProfile() {
    const [data, setData] = useState(1);
    // let editView =  true;
    const [editView, setEditView] = useState(true);
    const [userState, setUserState] = useState();
    const [studentState, setStudentState] = useState({})
    var { id } = useParams();
    const { location, state } = useLocation();


    useEffect(() => {
        getData();
        // getStudentData();
    }, [id, data, editView]);

    console.log(studentState, "studentId")

    const getData = () => {
        api_token
            .get(`profile/v1/student_guardian/${id}`)
            .then((res) => {
                if (res.data.data) {
                    setUserState(res.data.data);
                    getStudentData(res.data.data?.related_to?.id); // Student must get profile id not student Id
                }
            })
            .catch(err => console.log(err));
    }

    const getStudentData = (v) => {
        api_token
            .get(`profile/v1/student/?user=${v}`)
            .then((res) => {
                if (res.data.data) {
                    console.log(res.data.data, "newdata")

                    setStudentState(res.data.data);

                }
            })
            .catch(err => console.log(err));
    }




    const handleClick = (id) => {
        setEditView(true);
        setData(id);
    }




    const handleEditCick = () => {
        setEditView(false)
    }

    useEffect(() => {

    }, [setEditView])

    // console.log(userState, "userState")

    return (
        <div>
            <div className={styles.mainContainer}>

                {/*** Side Bar***/}
                <div className={styles.left} >
                    <div className={styles.profileInnerContainer}>
                        <img className={styles.profileImg} src={images} />
                        <div className={styles.camera}>
                            <CameraAltOutlinedIcon style={{ cursor: 'pointer' }} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h1>{`${userState?.user?.first_name} ${userState?.user?.last_name}`}</h1>
                        </div>
                        <div>
                            <p className={styles.mr}>{userState?.class_of_student?.title}</p>

                            <div className={styles.mainContainer} style={{ alignItems: 'center' }}>
                                {/* <img src={myuserlocation} alt="images" /> */}
                                {/* <p className={styles.mr} style={{ marginLeft: '5px' }}>Andheri, Mumbai</p> */}
                            </div>
                        </div>
                    </div>

                    {/* left side  */}
                    <div>
                        {
                            sideBar.map(info => {
                                return (
                                    <>
                                        <div onClick={() => handleClick(info.id)}
                                            className={`${styles.BtnContainer} ${info?.id == data ? styles.activeButton : ""}`}
                                        >
                                            <div className={styles.iconImgCon}>
                                                {
                                                    (info?.id == data) ?
                                                        <img src={info.icons} className={`${styles.images}`} />
                                                        : <img src={info.icon} className={`${styles.images}`} />
                                                }

                                            </div>
                                            <div>
                                                <p className={` ${info?.id == data ? styles.activeButton : ""}`} >{info.title}</p>
                                            </div>
                                        </div>

                                    </>
                                )
                            })
                        }
                    </div>


                </div>
                {/* right side */}


                <div className={styles.right}>
                    {(data == 1) &&
                        <div className={styles.editCon}>
                            {/* <p onClick={handleEditCick} className={styles.editItem}>Edit</p> */}
                            <button onClick={handleEditCick} className={(!state?.updateAccess) ? `${styles.not_allowed} ${styles.editItem}` : styles.editItem} disabled={!state.updateAccess}>Edit</button>

                        </div>
                    }
                    {(data == 1 && editView) && <PersonalInfo userState={userState} />}
                    {(data == 2 && editView) && <StudentDetail userState={userState} studentState={studentState} />}

                    {(data === 1 && editView === false) && <EditParents userState={userState} editId={data} setEditView={setEditView} />}

                </div>
            </div>
        </div>
    )
}


export default ParentProfile;



const sideBar = [
    {
        icon: personal,
        id: 1,
        title: 'Personal Details',
        icons: Human
    },
    {
        icon: parent,
        id: 2,
        title: 'Student Details',
        icons: parent2
    }
]