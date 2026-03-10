import React, { useEffect, useState, useReducer } from 'react'
import styles from './index.module.css';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import backgroundRect from '../../Assets/Profile/Rectangle.png';
import images from "../../Assets/Profile/profile.png";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Routes, Route, useParams } from 'react-router-dom';
import { api_token } from '../../Utils/Network';
import { Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { USER_DETAILS, USER_ADDRESS, USER_EDUCATION } from '../../Utils/helper';
import InputField from '../../Components/Input/InputField';
import AutoCompleteField from '../../Components/AutoCompleteField/AutoCompleteField';
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import moment from 'moment';
import DrawerComp from '../../Components/DrawerComp/DrawerComp';
import { updateParentReducer } from './updatParentReducer';

function Parents() {

    let { id } = useParams();
    const [userState, setUserState] = useState({});
    const [state, dispatch] = useReducer(updateParentReducer, initialState);


    useEffect(() => {
        getData();
    }, []);


    const getData = () => {
        api_token
            .get(`profile/v1/student_guardian/${id}`)
            .then((res) => {
                if (res.data.data) {
                    setUserState(res.data.data);
                }
            })
            .catch(err => console.log(err));
    }


    const handleDrawerOpen = (value) => {
        dispatch({
            type: "open_popup",
            openData: value,
        })
    }

    const onSubmit = async (e, values) => {
        console.log(e)
    }


    const personalDatas = () => {
        return (
            <div style={{ padding: '20px' }}>
                <div className={`${styles.fontNormal} font-regular`} style={{ marginBottom: '20px', fontWeight: 'bold' }}>Personal Details</div>
                <form onSubmit={(e) => onSubmit(e, "user_Data")} >
                    <div className={styles.personalData}>
                        <div className={styles.marginData}>
                            <InputField
                                style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                                label="First Name"
                                // value={state?.user_Data?.first_name}
                                placeholder="First Name"
                                name="first_name"
                                // onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                                label="Middle Name"
                                // value={state?.user_Data?.middle_name}
                                placeholder="Middle Name"
                                name="middle_name"
                                // onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>
                    </div>
                    <div className={styles.personalData}>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                                label="Last Name"
                                // value={state?.user_Data?.last_name}
                                placeholder="Last Name"
                                name="last_name"
                                // onChange={(e) => handleChanges(e, "user_Data",  "drawer")}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>
                        <div className={`${styles.personalField} ${styles.marginData}`} style={{ marginTop: '-10px' }}>
                            <InputField
                                style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                                label="Occupation"
                                // value={state?.user_Data?.last_name}
                                placeholder="Ocupation"
                                name="occupation"
                                // onChange={(e) => handleChanges(e, "user_Data",  "drawer")}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>
                    </div>
                    <div className={styles.personalData}>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                                label="Education"
                                // value={state?.user_Data?.place_of_birth}
                                placeholder="Education"
                                name="education"
                                // onChange={(e) => handleChanges(e, "user_Data",  "drawer")}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                                label="Relation"
                                // value={state?.user_Data?.place_of_birth}
                                placeholder="Relation"
                                name="relation"
                                // onChange={(e) => handleChanges(e, "user_Data",  "drawer")}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>
                    </div>
                    <button type='submit' className={styles.btn_style}>Submit</button>
                </form>
            </div>
        )
    }

    return (
        <div>
            <div className={styles.containProfile}>
                <div className={styles.container}>
                    <div className={styles.headerWrapper}>
                        <div className={styles.left}>
                            <div className={styles.profileCard}>
                                <img className={styles.familyimg} style={{ height: '300px' }} src={backgroundRect} />

                                {<div className={styles.EditContainer}>
                                    <div style={{ textAlign: 'right', display: 'inline-flex' }}>
                                        <CameraAltOutlinedIcon style={{ cursor: 'pointer' }} />
                                    </div>
                                    <button className={`${styles.editButton} ${styles.fontNormal} font-regular  `}>Change Cover Photo</button>
                                    {/* <MdOutlineModeEditOutline className={styles.iconBtn} /> */}
                                </div>}
                            </div>
                            <div className={styles.profileimgContainer}>
                                <div className={styles.profileInnerContainer}>
                                    {/* <img className={styles.profileImg} src={profilepic} /> */}
                                    {<img className={styles.profileImg} src={images} />}
                                    {<div className={styles.camera}>
                                        <CameraAltOutlinedIcon style={{ cursor: 'pointer' }} />
                                    </div>}
                                </div>
                            </div>

                            <div className={styles.profileUser}>
                                <div className={styles.profileblock}>
                                    <h4 className={`${styles.userName} ${styles.fontNormal} font-regular`} style={{ textTransform: 'capitalize' }}>{`${userState?.user?.first_name} ${userState?.user?.last_name}`}</h4>
                                    <p className={`${styles.userLocation} ${styles.fontNormal} font-regular`}>Andheri, Mumbai </p>
                                </div>
                                {/* <div className={styles.profileblock} style={{ textAlign: 'center' }}>
                            <h6 className={`${styles.userId} ${styles.fontNormal} font-regular`}>Roll No.</h6>
                            <p className={`${styles.userGrey} ${styles.fontNormal} font-regular`}>{userState?.roll_number} </p>
                        </div> */}
                                {/* <div className={styles.profileblock} style={{ textAlign: 'center' }}>
                            <h4 className={`${styles.userId} ${styles.fontNormal}`}>Family Id</h4>
                            <p className={`${styles.userGrey} ${styles.fontNormal}`}></p>
                        </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${styles.containProfile} ${styles.PersonalDetails}`}>
                <div className={styles.personalData}>
                    <p className={`${styles.fontPersonal}  ${styles.fontNormal}`}>Personal Details</p>
                    {<p className={`${styles.edits}  ${styles.fontNormal}`} onClick={() => { handleDrawerOpen(USER_DETAILS); }} style={{ cursor: 'pointer' }}>Edit <EditOutlinedIcon style={{ marginLeft: '10px', fontSize: '18px' }} /></p>}
                </div>
                <div className={styles.personal}>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Occupation</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>{userState?.occupation}</p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Education</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>{userState?.education}</p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}   ${styles.fontNormal}`}>Relation</p>
                        <p className={`${styles.userGrey}    ${styles.fontNormal}`}>{userState?.relationship?.title}</p>
                    </div>
                    {/* <div>
                <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Gender</p>
                <p className={`${styles.userGrey}  ${styles.fontNormal}`}>{(userState?.gender == 1) ? "Male": "Female"}</p>
            </div>
            <div>
                <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Blood Group</p>
                <p className={`${styles.userGrey}  ${styles.fontNormal}`}>{userState?.blood_group}</p>
            </div> */}
                </div>
            </div>

            {/* 
    <div className={`${styles.containProfile} ${styles.PersonalDetails}`}>
        <div className={styles.personalData}>
            <p className={`${styles.fontNormal} font-regular `}>Contact Details</p>
            {<p className={`${styles.edits} ${styles.fontNormal}`}>Edit <EditOutlinedIcon style={{ marginLeft: '10px', fontSize: '18px' }} /></p>}
        </div>
        <div className={`${styles.personal} ${styles.personalWrap}`}>
            <div className={styles.personalBox}>
                <p className={` ${styles.fontNormal}`}>Mail</p>
                <p className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}>{userState?.user?.email}</p>
            </div>
            <div className={styles.personalBox}>
                <p className={` ${styles.fontNormal} `}>Phone Number 1</p>
                <p className={`${styles.userGrey} ${styles.fontNormal} font-regular`}>{userState?.user?.phone}</p>
            </div>
            <div className={styles.personalBox}>
                <p className={`${styles.fontNormal}`}>Address</p>
                <p className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}>{(userState?.address?.length > 0) ? "-": "No address"}</p>
            </div>
            <div className={styles.personalBox} style={{ display: 'flex' }}>
                <div>
                    <p className={`font-semibold   ${styles.fontNormal} `}>Area</p>
                    <p className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}>{(userState?.address?.length > 0) ? "-": "No address"}</p>
                </div>
            </div>
        </div>
    </div> */}

            <DrawerComp open={state.open} onClose={() => dispatch({ type: "close_popup" })} anchor="right">
                {state.openData == USER_DETAILS && personalDatas()}
                {/* {state.openData == USER_ADDRESS && addressData()}
                {state.openData == USER_EDUCATION && educationData()} */}
            </DrawerComp>
        </div>
    )
}

export default Parents


const initialState = {
    user_Data: {
        first_name: "",
        middle_name: "",
        last_name: "",
        dob: "",
        place_of_birth: "",
        roll_number: "",
        age: "",
        gender: "",
        blood_group: "",
    },
    contact_Data: {
        email: "",
        phone: "",
    },
    education_Data: {
        board_id: null,
        grade_id: null,
        class_id: null,
        section_id: null,
    },
    open: false,
}