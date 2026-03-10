import React, { useEffect, useReducer, useState, useContext } from "react";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import backgroundRect from "../../Assets/Profile/Rectangle.png";
import images from "../../Assets/Profile/profile.png";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import styles from "./index.module.css";
import { Routes, Route, useParams } from "react-router-dom";
import { api_token } from "../../Utils/Network";
import { updateTeacherReducer } from "./updateTeacherReducer";
import {
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { USER_DETAILS, USER_ADDRESS, USER_EDUCATION } from "../../Utils/helper";
import InputField from "../../Components/Input/InputField";
import AutoCompleteField from "../../Components/AutoCompleteField/AutoCompleteField";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import moment from "moment";
import DrawerComp from "../../Components/DrawerComp/DrawerComp";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import EditIcon from '@mui/icons-material/Edit';
import DialogBox from "../../Components/DialogBox/DialogBox";
import AddIcon from '@mui/icons-material/Add';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    "Oliver Hansen",
    "Van Henry",
    "April Tucker",
    "Ralph Hubbard",
    "Omar Alexander",
    "Carlos Abbott",
    "Miriam Wagner",
    "Bradley Wilkerson",
    "Virginia Andrews",
    "Kelly Snyder",
];
function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

function TeacherProfileView() {
    let { id } = useParams();
    const [userState, setUserState] = useState({});
    const [state, dispatch] = useReducer(updateTeacherReducer, initialState);
    const { user_Data, education_Data, contact_Data } = state;
    const [open, setOpen] = useState(false);
    const { boardList, gradeList, classList, sectionList } =
        useContext(UserCredsContext);
    const [personName, setPersonName] = React.useState([]);
    const [addressClick, setAddressClick] = useState(false);
    const [studentAddress, setStudentAddress] = useState([]);
    const [userId, setUserId] = useState("");
    // const [edit, setEdit] = useState(false);
    const [editId, setEdit] =  useState("");
    const [addressDetails, setAddressDetails] = useState({
        user: "",
        line_1: "",
        line_2: "",
        landmark: "",
        city: "",
        state: "",
        pincode: null,
        country: ""
    })
    const data = userState?.address?.[0]



//  console.log(userState,"mystate")



    const theme = useTheme();

    useEffect(() => {
        getData();
        // getStudentAddress();

    }, []);


    const handleAddressClick = () => {
        setAddressClick(true);
        setAddressDetails({
            user: "",
            line_1: "",
            line_2: "",
            landmark: "",
            city: "",
            state: "",
            pincode: null,
            country: ""
        })

    }

    const handeleAdd =(id,info) => {
            
          console.log(info,"myinfo");

            const {city,country,landmark,line_1,line_2,pincode,state} = info;

          setAddressDetails({
            user: userId,
            city,
            country,
            landmark,
            line_1,
            line_2,
            pincode,
            state
          })
      

        setEdit(id);
        setAddressClick(true);
    }


    const handleAddressSubmit = () => {
        // setEdit(false)

        if(editId){
        // setEdit(true)
        let data = { ...addressDetails, user: userId }
        const canSave = [...Object.values(data)].every(Boolean);
        console.log(canSave, "canSave")
        canSave && api_token.patch(`profile/v1/address/${editId}/`, data).
            then((response) => {
                console.log(response.data, "mynewresponse")
                  if(response.status === 200){
                    setAddressClick(false);
                    getData();
                    setEdit("")
                  }  

            }).catch(err => {
                alert("please fill all the fields")
            })

            if(!canSave){
                alert("please fill all the details")
            }

        }else {
            let data = { ...addressDetails, user: userId }
            const { user, ...otherProps } = data;
            const canSave = [...Object.values(otherProps)].every(Boolean);
    
            canSave && api_token.post(`profile/v1/address/`, data).
                then((response) => {
                    console.log(response.data.data, "response");
    
                    if (response.status === 201) {
                        setAddressClick(false)
                        getData();
                    }
    
                }).catch((err) => {
                    alert("please fill all the details")
                })

                if(!canSave){
                    alert("Please fill all the details")
                }
        }
     
    }

    // console.log(addressDetails,"addressDetails")
    console.log(userState, "userState")



    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setAddressDetails(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const getData = () => {
        api_token
            .get(`profile/v1/teachers/${id}`)
            .then((res) => {
                if (res.data.data) {
                    setUserState(res.data.data);
                    //    console.log(res.data.data.user.id,"userdetails");
                    // const {user}  = userState;
                    setUserId(res.data.data.user.id);


                }
            })
            .catch((err) => console.log(err));
    };







    const handleDrawerOpen = (value) => {
        dispatch({
            type: "open_popup",
            openData: value,
        });
    };
    console.log(userState, "sunio1122")
    const handleChanges = (e, content, texts) => {
        const { name, value } = e.target;
        let values;

        if (name === "grade_id") {
            setPersonName(
                // On autofill we get a stringified value.
                typeof value === "string" ? value.split(",") : value
            );
            values = {
                ...state[content],

                [name]: personName,
            };
        }

        values = {
            ...state[content],
            [name]: value,
        };

        dispatch({
            type: texts,
            key: content,
            payload: values,
        });
    };
    console.log(state?.education_Data?.grade_id, "mynewgrade");

    const handleDate = (date, _key, _value, type) => {
        let dateString = moment(date.$d).format("YYYY-MM-DD");
        const values = {
            ...state[_key],
            dob: dateString,
        };
        switch (_key) {
            case "user_Data": {
                dispatch({
                    type: type,
                    key: _key,
                    payload: values,
                });
            }
        }
    };

    const getUserData = (data, key) => {
        console.log(data, key, "datas");
        if (key == "User_state") {
            // debugger;
            const { user, place_of_birth, blood_group, gender, dob } = data;
            const values = {
                first_name: user.first_name,
                middle_name: user.middle_name,
                last_name: user.last_name,
                place_of_birth,
                blood_group,
                gender,
                dob,
            };
            dispatch({
                type: "drawer",
                key: "user_Data",
                payload: values,
            });
        } else if (key == "user_contact") {
            const { user } = data;
            const values = {
                email: user.email,
                phone: user.phone,
            };
            dispatch({
                type: "drawer",
                key: "contact_Data",
                payload: values,
            });
        } else if (key == "education_data") {
            const { grade, section, board, class_of_student } = data;
            const data2 = ["Oliver Hansen", "Van Henry", "April Tucker"];

            const value = {
                board_id: board?.id,
                grade_id: data2,
                class_id: class_of_student?.id,
                section_id: section?.id,
            };

            dispatch({
                type: "drawer",
                key: "education_Data",
                payload: value,
            });
            // initialState.education_Data = { ...value };
        }
    };

    const onSubmit = async (e, values) => {
        e.preventDefault();
        let data = {};
        if (values === "user_Data") {
            console.log(user_Data, "USERDATA");
            const { first_name, last_name, middle_name, ...rest } = user_Data;
            let newObj = {
                user: {
                    id: +id,
                    first_name: user_Data.first_name,
                    middle_name: user_Data.middle_name,
                    last_name: user_Data.last_name,
                },
                ...rest,
            };
            data = { ...newObj };
        } else if (values === "contact_Data") {
            let newObj = {};
            if (userState?.user?.phone == contact_Data.phone) {
                newObj = {
                    user: {
                        id: +id,
                        email: contact_Data.email,
                    },
                };
            } else {
                newObj = {
                    user: {
                        id: +id,
                        email: contact_Data.email,
                        phone: contact_Data.phone,
                    },
                };
            }
            data = { ...newObj };
        } else if (values === "education_Data") {
            data = { ...education_Data };
        }

        api_token
            .patch(`profile/v1/teachers/${id}/`, data)
            .then((res) => {
                if (res.data.data) {
                    setUserState(res.data.data);
                    dispatch({
                        type: "close_popup",
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const personalDatas = () => {
        return (
            <div style={{ padding: "20px" }}>
                <div
                    className={`${styles.fontNormal} font-regular`}
                    style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                    Personal Details
                </div>
                <form onSubmit={(e) => onSubmit(e, "user_Data")}>
                    <div className={styles.personalData}>
                        <div className={styles.marginData}>
                            <InputField
                                style={{
                                    background: "white",
                                    width: "100%",
                                    marginBottom: "15px",
                                }}
                                label="First Name"
                                value={state?.user_Data?.first_name}
                                placeholder="First Name"
                                name="first_name"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal"
                                type="text"
                            // error={error === "" ? false : true}
                            />
                        </div>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{
                                    background: "white",
                                    width: "100%",
                                    marginBottom: "15px",
                                }}
                                label="Middle Name"
                                value={state?.user_Data?.middle_name}
                                placeholder="Middle Name"
                                name="middle_name"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal"
                                type="text"
                            // error={error === "" ? false : true}
                            />
                        </div>
                    </div>
                    <div className={styles.personalData}>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{
                                    background: "white",
                                    width: "100%",
                                    marginBottom: "15px",
                                }}
                                label="Last Name"
                                value={state?.user_Data?.last_name}
                                placeholder="Last Name"
                                name="last_name"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal"
                                type="text"
                            // error={error === "" ? false : true}
                            />
                        </div>
                        <div
                            className={`${styles.personalField} ${styles.marginData}`}
                            style={{ marginTop: "-10px" }}
                        >
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    label="DOB"
                                    inputFormat="MM/DD/YYYY"
                                    style={{
                                        background: "white",
                                        width: "100%",
                                        marginTop: "15px",
                                    }}
                                    value={state?.user_Data?.dob}
                                    onChange={(date) =>
                                        handleDate(date, "user_Data", "1", "drawer")
                                    }
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </div>
                    </div>
                    <div className={styles.personalData}>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{
                                    background: "white",
                                    width: "100%",
                                    marginBottom: "15px",
                                }}
                                label="Place Of Birth"
                                value={state?.user_Data?.place_of_birth}
                                placeholder="Place Of Birth"
                                name="place_of_birth"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal"
                                type="text"
                            // error={error === "" ? false : true}
                            />
                        </div>

                        <div
                            className={styles.personalField}
                            style={{ marginTop: "-20px" }}
                        >
                            <FormControl sx={{ m: 1, minWidth: 240 }}>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    className={`${styles.fontNormal}`}
                                >
                                    Gender
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state?.user_Data?.gender}
                                    name="gender"
                                    label="Gender"
                                    onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                >
                                    <MenuItem
                                        value="1"
                                        className={`${styles.fontNormal} font-regular`}
                                    >
                                        Male
                                    </MenuItem>
                                    <MenuItem
                                        value="2"
                                        className={`${styles.fontNormal} font-regular`}
                                    >
                                        Female
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={styles.personalData}>
                        <div
                            className={`${styles.personalField} ${styles.marginData}`}
                            style={{ margin: 0 }}
                        >
                            <FormControl sx={{ m: 1, minWidth: 240 }}>
                                <InputLabel
                                    id="demo-simple-select-label"
                                    className={`${styles.fontNormal} font-regular`}
                                >
                                    Blood Group
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state?.user_Data?.blood_group}
                                    name="blood_group"
                                    label="Blood Group"
                                    onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                >
                                    <MenuItem value="A+">A+</MenuItem>
                                    <MenuItem value="A-">A-</MenuItem>
                                    <MenuItem value="B+">B+</MenuItem>
                                    <MenuItem value="B-">B-</MenuItem>
                                    <MenuItem value="O+">O+</MenuItem>
                                    <MenuItem value="O-">O-</MenuItem>
                                    <MenuItem value="AB+">AB+</MenuItem>
                                    <MenuItem value="AB-">AB-</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <button type="submit" className={styles.btn_style}>
                        Submit
                    </button>
                </form>
            </div>
        );
    };

    const addressData = () => {
        return (
            <div style={{ padding: "20px" }}>
                <div
                    className={` ${styles.fontNormal}`}
                    style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                    Address Details
                </div>
                <form onSubmit={(e) => onSubmit(e, "contact_Data")}>
                    <div className={styles.personalData}>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{
                                    background: "white",
                                    width: "100%",
                                    marginBottom: "15px",
                                }}
                                label="Email"
                                value={state?.contact_Data?.email}
                                placeholder="Email"
                                name="email"
                                onChange={(e) => handleChanges(e, "contact_Data", "drawer")}
                                size="normal"
                                type="text"
                            // error={error === "" ? false : true}
                            />
                        </div>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <InputField
                                style={{
                                    background: "white",
                                    width: "100%",
                                    marginBottom: "15px",
                                }}
                                label="Phone Number"
                                value={state?.contact_Data?.phone}
                                placeholder="Phone Number"
                                name="phone"
                                onChange={(e) => handleChanges(e, "contact_Data", "drawer")}
                                size="normal"
                                type="text"
                            // error={error === "" ? false : true}
                            />
                        </div>
                    </div>
                    <button type="submit" className={styles.btn_style}>
                        Submit
                    </button>
                </form>


                {/*  NEW FILEDS ADDED BY ROCKY   */}

                <div className={styles.addressField}  >
                  
                    <div className={styles.AddandeditCon}>
                    <p>Address</p>
                        < AddIcon onClick={handleAddressClick} />
                    </div>
                    <hr />
                    {/* this is the box shadow field*/}
                    <div className={styles.boxAddressCon}>

                        {

                            userState?.address?.map((info, i) => {
                                return (

                                    <div key={i} className={styles.displayEditfield}>
                                        <div className={styles.editIconContainer}><EditIcon onClick={(e) => handeleAdd(info.id,info)} className={styles.editIconCon} /> </div>

                                        <div className={styles.addressContainer}>
                                            <div><p className={styles.drawerAddressDetails} >{info?.line_1}</p></div>
                                            <div><p className={styles.drawerAddressDetails}>{info?.line_2}</p></div>
                                            <div><p className={styles.drawerAddressDetails}>{info?.landmark} {info?.city}</p> </div>
                                            <div><p className={styles.drawerAddressDetails}>{info.pincode}</p> </div>
                                            <div><p className={styles.drawerAddressDetails}>{info?.state}</p></div>
                                            <div><p className={styles.drawerAddressDetails}>{info?.country}</p></div>
                                          
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>


            </div>
        );
    };

    const closeData = () => {
        // debugger;
        setAddressClick(false)
    }

    const educationData = () => {
        return (
            <div style={{ padding: "20px" }}>
                <div
                    className={` ${styles.fontNormal}`}
                    style={{ marginBottom: "20px", fontWeight: "bold" }}
                >
                    Educational Details
                </div>
                <form onSubmit={(e) => onSubmit(e, "education_Data")}>
                    <div className={styles.personalData}>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel
                                    className={` ${styles.fontNormal} font-regular`}
                                    id="demo-simple-select-label"
                                >
                                    Board
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state?.education_Data?.board_id}
                                    name="board_id"
                                    label="Board"
                                    onChange={(e) => handleChanges(e, "education_Data", "drawer")}
                                >
                                    {boardList &&
                                        boardList.map((v, i) => (
                                            <MenuItem value={v.id}>{v.title}</MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            {/* <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Grade</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state?.education_Data?.grade_id}
                                    // value={professionData?.profession_id}
                                    name="grade_id"
                                    label="Grade"
                                    onChange={(e) => handleChanges(e, "education_Data", "drawer")}
                                >
                                    {gradeList && gradeList.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
                                </Select>
                            </FormControl> */}

                            <FormControl sx={{ m: 1, width: 300 }}>
                                <InputLabel id="demo-multiple-chip-label">Grade</InputLabel>
                                <Select
                                    labelId="demo-multiple-chip-label"
                                    id="demo-multiple-chip"
                                    multiple
                                    //   value={personName}
                                    value={state?.education_Data?.grade_id}
                                    name="grade_id"
                                    onChange={(e) => handleChanges(e, "education_Data", "drawer")}
                                    input={
                                        <OutlinedInput id="select-multiple-chip" label="Chip" />
                                    }
                                    renderValue={(selected) => (
                                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                                            {selected.map((value) => (
                                                <Chip key={value} label={value} />
                                            ))}
                                        </Box>
                                    )}
                                    MenuProps={MenuProps}
                                >
                                    {names.map((name) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                            style={getStyles(name, personName, theme)}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className={styles.personalData}>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel
                                    className={` ${styles.fontNormal} font-regular`}
                                    id="demo-simple-select-label"
                                >
                                    Class
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={state?.education_Data?.class_id}
                                    // value={professionData?.profession_id}
                                    name="class_id"
                                    label="Class"
                                    onChange={(e) => handleChanges(e, "education_Data", "drawer")}
                                >
                                    {classList &&
                                        classList.map((v, i) => (
                                            <MenuItem value={v.id}>{v.title}</MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div className={`${styles.personalField} ${styles.marginData}`}>
                            <FormControl sx={{ m: 1, minWidth: 160 }}>
                                <InputLabel
                                    className={` ${styles.fontNormal} font-regular`}
                                    id="demo-simple-select-label"
                                >
                                    Section
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // multiple
                                    // value={state?.education_Data?.section_id}
                                    // value={professionData?.profession_id}
                                    name="section_id"
                                    label="Section"
                                // onChange={(e) => handleChanges(e, "education_Data", "drawer")}
                                >
                                    {sectionList &&
                                        sectionList.map((v, i) => (
                                            <MenuItem value={v.id}>{v.title}</MenuItem>
                                        ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <button type="submit" className={styles.btn_style}>
                        Submit
                    </button>
                </form>




            </div>
        );
    };

    console.log(sectionList, "BBBBBsectionListB");

    return (
        <div>
            <div className={styles.containProfile}>
                <div className={styles.container}>
                    <div className={styles.headerWrapper}>
                        <div className={styles.left}>
                            <div className={styles.profileCard}>
                                <img
                                    className={styles.familyimg}
                                    style={{ height: "300px" }}
                                    src={backgroundRect}
                                />

                                {
                                    <div className={styles.EditContainer}>
                                        <div style={{ textAlign: "right", display: "inline-flex" }}>
                                            <CameraAltOutlinedIcon style={{ cursor: "pointer" }} />
                                        </div>
                                        <button
                                            className={`${styles.editButton} ${styles.fontNormal} font-regular  `}
                                        >
                                            Change Cover Photo
                                        </button>
                                        {/* <MdOutlineModeEditOutline className={styles.iconBtn} /> */}
                                    </div>
                                }
                            </div>
                            <div className={styles.profileimgContainer}>
                                <div className={styles.profileInnerContainer}>
                                    {/* <img className={styles.profileImg} src={profilepic} /> */}
                                    {<img className={styles.profileImg} src={images} />}
                                    {
                                        <div className={styles.camera}>
                                            <CameraAltOutlinedIcon style={{ cursor: "pointer" }} />
                                        </div>
                                    }
                                </div>
                            </div>

                            <div className={styles.profileUser}>
                                <div className={styles.profileblock}>
                                    <h4
                                        className={`${styles.userName} ${styles.fontNormal} font-regular`}
                                        style={{ textTransform: "capitalize" }}
                                    >{`${userState?.user?.first_name} ${userState?.user?.last_name}`}</h4>
                                    <p
                                        className={`${styles.userLocation} ${styles.fontNormal} font-regular`}
                                    >
                                        Andheri, Mumbai{" "}
                                    </p>
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
                    <p className={`${styles.fontPersonal}  ${styles.fontNormal}`}>
                        Personal Details
                    </p>
                    {
                        <p
                            className={`${styles.edits}  ${styles.fontNormal}`}
                            onClick={() => {
                                handleDrawerOpen(USER_DETAILS);
                                getUserData(userState, "User_state");
                            }}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Edit{" "}
                            <EditOutlinedIcon
                                style={{ marginLeft: "10px", fontSize: "18px" }}
                            />
                        </p>
                    }
                </div>
                <div className={styles.personal}>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>DOB</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>
                            {userState?.dob}
                        </p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>
                            Place of Birth
                        </p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>
                            {userState?.place_of_birth}
                        </p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}   ${styles.fontNormal}`}>Age</p>
                        <p className={`${styles.userGrey}    ${styles.fontNormal}`}>
                            {userState?.age}
                        </p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>Gender</p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>
                            {userState?.gender == 1 ? "Male" : "Female"}
                        </p>
                    </div>
                    <div>
                        <p className={`${styles.fontBold}  ${styles.fontNormal}`}>
                            Blood Group
                        </p>
                        <p className={`${styles.userGrey}  ${styles.fontNormal}`}>
                            {userState?.blood_group}
                        </p>
                    </div>
                </div>
            </div>

            <div className={`${styles.containProfile} ${styles.PersonalDetails}`}>
                <div className={styles.personalData}>
                    <p className={`${styles.fontNormal} font-regular `}>
                        Contact Details
                    </p>
                    {
                        <p
                            className={`${styles.edits} ${styles.fontNormal}`}
                            onClick={() => {
                                handleDrawerOpen(USER_ADDRESS);
                                getUserData(userState, "user_contact");
                            }}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Edit{" "}
                            <EditOutlinedIcon
                                style={{ marginLeft: "10px", fontSize: "18px" }}
                            />
                        </p>
                    }
                </div>
                <div className={`${styles.personal} ${styles.personalWrap}`}>
                    <div className={styles.personalBox}>
                        <p className={` ${styles.fontNormal}`}>Mail</p>
                        <p
                            className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}
                        >
                            {userState?.user?.email}
                        </p>
                    </div>
                    <div className={styles.personalBox}>
                        <p className={` ${styles.fontNormal} `}>Phone Number 1</p>
                        <p
                            className={`${styles.userGrey} ${styles.fontNormal} font-regular`}
                        >
                            {userState?.user?.phone}
                        </p>
                    </div>
                    <div className={styles.personalBox}>
                        <p className={`${styles.fontNormal}`}>Address</p>
                        <p
                            className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}
                        >
                            {
                                data?.line_1
                            }
                            {" "}

                            {
                                data?.line_2
                            }
                            {" "}

                            {
                                data?.landmark
                            }
                            {" "}

                            {
                                data?.city
                            }
                            {" "}
                            {
                                data?.pincode
                            }
                            <div>
                                {
                                    data?.state
                                }
                            </div>
                            <div>
                                {
                                    data?.country
                                }
                            </div>


                        </p>
                    </div>
                    {/* <div className={styles.personalBox} style={{ display: "flex" }}>
                        <div>
                            <p className={`font-semibold   ${styles.fontNormal} `}>Area</p>
                            <p
                                className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}
                            >
                                { }
                            </p>
                        </div>
                    </div> */}
                </div>
            </div>

            <div className={`${styles.containProfile} ${styles.PersonalDetails}`}>
                <div className={styles.personalData}>
                    <p className={`${styles.fontNormal} font-regular `}>
                        Educational Details
                    </p>
                    {
                        <p
                            className={`${styles.edits} ${styles.fontNormal}`}
                            onClick={() => {
                                handleDrawerOpen(USER_EDUCATION);
                                getUserData(userState, "education_data");
                            }}
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            Edit{" "}
                            <EditOutlinedIcon
                                style={{ marginLeft: "10px", fontSize: "18px" }}
                            />
                        </p>
                    }
                </div>
                <div className={`${styles.personal} ${styles.personalWrap}`}>
                    <div className={styles.personalBox}>
                        <p className={` ${styles.fontNormal}`}>Institute</p>
                        {userState?.education && (
                            <p
                                className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}
                            >
                                {userState?.education[0]?.institute}
                            </p>
                        )}
                    </div>

                    <div className={styles.personalBox}>
                        <p className={`${styles.fontNormal}`}>Degree</p>
                        {userState?.education && (
                            <p
                                className={`${styles.userGrey}  ${styles.fontNormal} font-regular`}
                            >
                                {userState?.education[0]?.degree}
                            </p>
                        )}
                    </div>
                    <div className={styles.personalBox}>
                        <p className={` ${styles.fontNormal} `}>Classes</p>
                        {userState?.classes && (
                            <p
                                className={`${styles.userGrey} ${styles.fontNormal} font-regular`}
                            >
                                {userState?.classes.map((v, i) => (
                                    <div>{v.title}</div>
                                ))}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            <DrawerComp
                open={state.open}
                onClose={() => dispatch({ type: "close_popup" })}
                anchor="right"
            >
                {state.openData == USER_DETAILS && personalDatas()}
                {state.openData == USER_ADDRESS && addressData()}
                {state.openData == USER_EDUCATION && educationData()}
            </DrawerComp>

            {/* <div className={styles.textFieldCon} > */}
            <DialogBox open={addressClick} title="Address" onClose={() => closeData()} 
            // dataSend={edit ? handleAddressEdit : handleAddressSubmit}
            dataSend={handleAddressSubmit}
            
            >
                <div className={styles.textField1}>
                    <div>
                        <TextField
                            value={addressDetails?.line_1}
                            name="line_1"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Address line 1"
                            variant="outlined"
                        />
                    </div>
                    <div>

                        <TextField
                            value={addressDetails?.line_2}
                            name="line_2"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Address line 2"
                            variant="outlined"
                        />
                    </div>
                </div>

                <div className={styles.textField2}>
                    <div>
                        <TextField
                            value={addressDetails?.landmark}
                            name="landmark"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Landmark"
                            variant="outlined"
                        />
                    </div>
                    <div>

                        <TextField
                            value={addressDetails?.city}
                            name="city"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="City"
                            variant="outlined"
                        />

                    </div>
                </div>

                <div className={styles.textField3}>
                    <div>

                        <TextField
                            value={addressDetails?.state}
                            name="state"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="State"
                            variant="outlined"
                        />
                    </div>

                    <div>

                        <TextField
                            value={addressDetails?.pincode}
                            name="pincode"
                            type="number"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Pincode"
                            variant="outlined"
                        />

                    </div>
                </div>


                <div className={styles.textField3}>
                    <div>

                        <TextField
                            value={addressDetails?.country}
                            name="country"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                        />

                    </div>
                </div>

            </DialogBox>
            {/* </div> */}
        </div>
    );
}

export default TeacherProfileView;

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
        grade_id: [],
        class_id: null,
        section_id: null,
    },
    open: false,
    openData: "",
};



