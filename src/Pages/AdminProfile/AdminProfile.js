import React, { useEffect, useState, useContext, useReducer } from 'react'
import styles from './index.module.css';
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';
import backgroundRect from '../../Assets/Profile/Rectangle.png';
import images from "../../Assets/Profile/profile.png";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Routes, Route, useParams } from 'react-router-dom';
import { _access_token, api_token, base_url } from '../../Utils/Network';
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import DrawerComp from '../../Components/DrawerComp/DrawerComp';
import InputField from '../../Components/Input/InputField';
import { USER_DETAILS } from '../../Utils/helper';
import { adminUsereducer } from "./adminUsereducer";
import DialogBox from '../../Components/DialogBox/DialogBox';
import { Button } from '@mui/material';
import axios from 'axios';

function AdminProfile() {

    const { userState, setUsers } = useContext(UserCredsContext);
    const [openDialog, setOpenDialog] = useState(false);
    const [state, dispatch] = useReducer(adminUsereducer, initialState);
    const [file, setFile] = useState('');
    const [view, setView] = useState(null);


    useEffect(() => {
        console.log({ ...state.contact_Data }, "SSTa")

        let { address, area, description, phone, since, tag_line, title } = userState?.school_profile;
        let data = {
            address, area, description, phone, since, tag_line, title
        }

        dispatch({
            type: "set_Contact",
            payload: { ...state?.contact_Data, email: userState?.email }
        })

        dispatch({
            type: "set_data",
            payload: data,
        })
    }, [])

    const UploadImage = () => {
        return (
            <div>
                <form
                    onSubmit={(e) => submitImage(e)}
                    className="fm_data">
                    <div><h3>Upload Profile Image</h3></div>
                    <div style={{ margin: '10px 0' }}>
                        <input type="file"
                            onChange={handleImage}
                        />
                    </div>
                    <div>
                        <Button variant='contained' type='submit'>Submit</Button>
                    </div>
                </form>
            </div>
        )
    }

    const handleImage = (event) => {
        setFile(event.target.files[0])
    }

    const submitImage = async (event, number) => {
        event.preventDefault();
        const formData = new FormData();
        if(view == 1){
            if (file) formData.append('logo', file);
        } else if (view == 2){
            if (file) formData.append('banner', file);
        }
        try {
            await axios({
                method: "Patch",
                url: `${base_url}/auth/v1/user/update_school_detail/`,
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } },
                headers: { 'Authorization': `Bearer ${_access_token}` },
            })
                .then(response => {
                    console.log(response.data.data)
                    if (response.data.data) {
                        alert("Profile Pic Updated")
                        setOpenDialog(false)
                        setUsers(response.data.data)
                        setFile('')
                    }
                })
                .catch(error => {
                    console.log(error, 'error');
                })
        } catch (error) {
            console.log(error);
        }
    }

    const personalDatas = () => {
        return (
            <div style={{ padding: '20px' }}>
                <div className={`${styles.fontNormal} font-regular`} style={{ marginBottom: '20px', fontWeight: 'bold' }}>School Details</div>
                {/* <form  > */}
                <div className={styles.personalData}>
                    <div className={styles.marginData}>
                        <InputField
                            style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                            label="Title"
                            value={state?.user_Data?.title}
                            placeholder="Title"
                            name="title"
                            onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                            size="normal" type="text"
                        // error={error === "" ? false : true} 
                        />
                    </div>
                    <div className={`${styles.personalField} ${styles.marginData}`}>
                        <InputField
                            style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                            label="Tag Line"
                            value={state?.user_Data?.tag_line}
                            placeholder="Tag Line"
                            name="tag_line"
                            onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                            size="normal" type="text"
                        // error={error === "" ? false : true} 
                        />
                    </div>
                </div>
                <div className={styles.personalData}>
                    <div className={`${styles.personalField} ${styles.marginData}`}>
                        <InputField
                            style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                            label="Email"
                            value={state?.contact_Data?.email}
                            placeholder="Email"
                            name="email"
                            onChange={(e) => handleChanges(e, "contact_Data", "contents")}
                            size="normal" type="email"
                        // error={error === "" ? false : true} 
                        />
                    </div>
                    <div className={`${styles.personalField} ${styles.marginData}`} style={{ marginTop: '-10px' }}>
                        <InputField
                            style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                            label="Phone"
                            value={state?.user_Data?.phone}
                            placeholder="Phone"
                            name="phone"
                            onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                            size="normal" type="text"
                        // error={error === "" ? false : true} 
                        />
                    </div>
                </div>
                <div className={styles.personalData}>
                    <div className={`${styles.personalField} ${styles.marginData}`}>
                        <InputField
                            style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                            label="Area"
                            value={state?.user_Data?.area}
                            placeholder="Area"
                            name="area"
                            onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                            size="normal" type="text"
                        // error={error === "" ? false : true} 
                        />
                    </div>
                    <div className={`${styles.personalField} ${styles.marginData}`}>
                        <InputField
                            style={{ background: 'white', width: "100%", marginBottom: '15px' }}
                            label="Since"
                            value={state?.user_Data?.since}
                            placeholder="Since"
                            name="since"
                            onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                            size="normal" type="text"
                        // error={error === "" ? false : true} 
                        />
                    </div>
                </div>
                <button className={styles.btn_style} onClick={(e) => onSubmit(e, "user_Data")}>Submit</button>
                {/* </form> */}
            </div>
        )
    }


    const handlePop = (val) => {
        setView(val)
        setOpenDialog(true)
    }

    const handleChanges = (e, content, texts) => {
        const { name, value } = e.target;
        let values;

        values = {
            ...state[content],
            [name]: value,
        };

        dispatch({
            type: texts,
            key: content,
            payload: values,
        });
    }


    const handleDrawerOpen = (value) => {
        dispatch({
            type: "open_popup",
            openData: value,
        })
    }

    const onSubmit = () => {

        console.log(state, userState)
        let data = state?.user_Data;
        for (let key in data) {
            if (data.hasOwnProperty(key) && data[key] === "") {
                delete data[key];
            }
        }

        api_token
            .patch(`auth/v1/user/update_school_detail/`, { ...data })
            .then((res) => {
                console.log(res)
                if (res.status == 201) {
                    alert("Profile Updated")
                    dispatch({ type: "close_popup" })
                    setUsers(res.data.data)
                }
            })
            .catch(err => console.log(err))

    }

    console.log(userState, state, "userData")
    return (
        <div>
            <div className={styles.containProfile}>
                <div className={styles.container}>
                    <div className={styles.headerWrapper}>
                        <div className={styles.left}>
                            <div className={styles.profileCard}>
                                <img className={styles.familyimg} style={{ height: '300px' }} src={userState?.school_profile?.banner} />

                                {<div className={styles.EditContainer} onClick={() => handlePop(2)}>
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
                                    {<img className={styles.profileImg} src={userState?.school_profile?.logo} />}
                                    {<div className={styles.camera}>
                                        <CameraAltOutlinedIcon style={{ cursor: 'pointer' }} onClick={() => handlePop(1)} />
                                    </div>}
                                </div>
                            </div>

                            <div className={styles.profileUser}>
                                <div className={styles.profileblock}>
                                    <h4 className={`${styles.userName} ${styles.fontNormal} font-regular`} style={{ textTransform: 'capitalize' }}>{userState?.username}</h4>
                                    <p className={`${styles.userLocation} ${styles.fontNormal} font-regular`}>{userState?.school_profile?.area}, Since {userState?.school_profile?.since} </p>
                                </div>
                                {/* <div className={styles.profileblock} style={{ textAlign: 'center' }}>
                                    <h6 className={`${styles.userId} ${styles.fontNormal} font-regular`}>Roll No.</h6>
                                    <p className={`${styles.userGrey} ${styles.fontNormal} font-regular`}> </p>
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
                    <p className={`${styles.fontPersonal}  ${styles.fontNormal}`}>School Details</p>
                    {<p className={`${styles.edits}  ${styles.fontNormal}`} onClick={() => { handleDrawerOpen(USER_DETAILS); }} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>Edit <EditOutlinedIcon style={{ marginLeft: '10px', fontSize: '18px' }} /></p>}
                </div>
                <div className={styles.personal}>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Title</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>{userState?.school_profile?.title}</p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Description</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>{userState?.school_profile?.description}</p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}   ${styles.fontNormal}`}>Phone</p>
                        <p className={`${styles.userGrey}    ${styles.fontNormal}`}>{userState?.phone}</p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Tag Line</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>{userState?.school_profile?.tag_line}</p>
                    </div>
                </div>
            </div>


            {/* <div className={`${styles.containProfile} ${styles.PersonalDetails}`}>
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

            {/* <div className={`${styles.containProfile} ${styles.PersonalDetails}`}>
                <div className={styles.personalData}>
                    <p className={`${styles.fontNormal} font-regular `}>Educational Details</p>
                    {<p className={`${styles.edits} ${styles.fontNormal}`}>Edit <EditOutlinedIcon style={{ marginLeft: '10px', fontSize: '18px' }} /></p>}
                </div>
                <div className={`${styles.personal} ${styles.personalWrap}`}>
                    <div className={styles.personalBox}>
                        <p className={` ${styles.fontNormal}`}>Board</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}>{userState?.board?.title}</p>
                    </div>

                    <div className={styles.personalBox}>
                        <p className={`${styles.fontNormal}`}>Class</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}>{userState?.grade?.title}</p>
                    </div>
                    <div className={styles.personalBox}>
                        <p className={` ${styles.fontNormal} `}>Section</p>
                        <p className={`${styles.userGrey} ${styles.fontNormal} font-regular`}>{userState?.section?.title}</p>
                    </div>
                </div>
            </div> */}

            <DrawerComp open={state.open} onClose={() => dispatch({ type: "close_popup" })} anchor="right">
                {state.openData == USER_DETAILS && personalDatas()}
                {/* {state.openData == USER_ADDRESS && addressData()}
                {state.openData == USER_EDUCATION && educationData()} */}
            </DrawerComp>

            <DialogBox open={openDialog} onClose={() => { setOpenDialog(false) }} display={false}>
                {UploadImage()}
            </DialogBox>
        </div>
    )
}

export default AdminProfile

const initialState = {
    user_Data: {
        phone: "",
        email: "",
        tag_line: "",
        title: "",
        since: "",
        area: ""
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