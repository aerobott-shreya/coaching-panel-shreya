import React, { useState, useContext } from 'react';
import styles from "./index.module.css"
import moment from "moment";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import InputField from '../../../../../Components/Input/InputField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { UserCredsContext } from '../../../../../ContextApi/UserCredsContext/UserCredsContext';
import { api_token } from '../../../../../Utils/Network';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { checkEmptyObject, checkObjectValues } from '../../../../../Utils/Utils';
import { Alert, Snackbar } from '@mui/material';


const Student = ({ setData, setNewlyCreatedUser }) => {
    let navigate = useNavigate();
    var check = /^\d{10}$/;
    // var check = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
    const usernameRegextest = /^[a-z ,.'-]+$/i;
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const [checknumber, setchecknumber] = useState(false);
    const [checkemail, setcheckEmail] = useState(false);
    const [checkfirstname, setcheckFirstName] = useState(false)
    const { boardList, gradeList, classList, sectionList } = useContext(UserCredsContext);
    const [userDetails, setUserDetails] = useState({
        first_name: "",
        middle_name: "",
        last_name: "",
        roll_number: "",
        dob: moment(new Date()).format('YYYY-MM-DD'),
        place_of_birth: "",
        gender: "",
        blood_group: "",
        height: "",
        weight: "",
        class_id: "",
        phone: "",
        email: "",
        board_id: "",
    });
    const [error, setError] = useState({})
    const [alertDetails, setAlertDetails] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: '',
        errorType: '',
    })
    const { vertical, horizontal } = alertDetails;

    console.log(userDetails.board)


    const handleChanges = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            let result = value.match(check);
            if (result) {
                setError({...error, phone: false});
            } else {
                setError({...error, phone: true});

            }
        }

        if (name === "email") {
            let result = value.match(emailCheck);
            if (result) {
                setError({...error, email: false});
            } else {
                setError({...error, email: true});
            }
        }

        if (name === "first_name") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError(prev => ({ ...prev, first_name: false}));
            } else {
                setError(prev => ({ ...prev, first_name: true}));
            }
        }

        if (name === "middle_name") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError({...error, middle_name: false});
            } else {
                setError({...error, middle_name: true});
            }
        }
        if (name === "last_name") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError({...error, last_name: false});
            } else {
                setError({...error, last_name: true});
            }
        }

        if (name === "place_of_birth") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError({...error, place_of_birth: false});
            } else {
                setError({...error, place_of_birth: true});
            }
        }



        setUserDetails(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    console.log(userDetails, "userdetails")

    const change = (v) => {
        console.log(v.title, "datas")
        setUserDetails(prevData => ({
            ...prevData,
            class_id: v?.title
        }))
    }


    const handleDate = (date) => {
        let dateString = moment(date.$d).format('YYYY-MM-DD');
        setUserDetails(prev => ({ ...prev, dob: dateString }))
    }

    const handleUserDetailSubmit = (e) => {
        e.preventDefault();

        const { gender, blood_group, height, weight, dob, class_id, board_id, ...rest } = userDetails;

        const booleanKey = {};

        const checkObj = checkObjectValues(error);
        
        if(checkObj){
            for (let key in rest) {
                booleanKey[key] = Boolean(!rest[key]); // set to true if value is truthy, false otherwise
            }
            setError(booleanKey);
        }else{
            for (let key in error) {
                booleanKey[key] = Boolean(error[key]); // set to true if value is truthy, false otherwise
            }
            setError(booleanKey);
        }
        
        const checkEmpty = checkEmptyObject(rest);

        console.log(checkObj,booleanKey,checkEmpty, "checkBOOL")
        if (checkEmpty && checkObj) {
        const newObj = {
            user: {
                first_name: userDetails.first_name,
                last_name: userDetails.last_name,
                middle_name: userDetails.middle_name,
                phone: userDetails.phone,
                email: userDetails.email,
                user_type: 1,
            },
            roll_number: userDetails?.roll_number,
            dob: userDetails.dob,
            place_of_birth: userDetails.place_of_birth,
            gender: userDetails.gender,
            blood_group: userDetails.blood_group,
            height: userDetails.height,
            weight: userDetails.weight,
            class_id: userDetails?.class_id,
            // board_id: userDetails?.board_id,
            grade_id: userDetails?.grade_id,
        }

        let data = { ...newObj }
        console.log(data, "datas")

        api_token
            .post(`profile/v1/student/`, data).
            then((res) => {
                if (res.status === 201) {
                    setAlertDetails({...alertDetails,
                        open: true,
                        message: "User Created Successfully Please add Parent's Details",
                        errorType: 'success'
                    })
                    console.log(res.data)
                    setData(2);
                    setNewlyCreatedUser(res.data)
                }
            }).catch(err => {
                console.log(err)
            })
        }
        else{
            setAlertDetails({...alertDetails,
                open: true,
                message: "Please Enter Valid Details",
                errorType: 'error'
            })
        }
    }


    const handleCancel = () => {
        navigate(`/dashboard/account/student`);
    }

    const handleClose = () => {
        setAlertDetails({...alertDetails,
            open: false,
            message: '',
            errorType: '',
        })
    }

    return (
        <div>
            <form onSubmit={(e) => handleUserDetailSubmit(e)}  >
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%' }}
                                label="First Name"
                                value={userDetails?.first_name}
                                name="first_name"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={error?.first_name}
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Middle Name"
                                value={userDetails?.middle_name}
                                placeholder="Middle Name"
                                name="middle_name"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"
                                error={error?.middle_name}
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Last Name"
                                value={userDetails?.last_name}
                                placeholder="Last Name"
                                name="last_name"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"
                                error={error?.last_name}
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Roll Number"
                                value={userDetails?.roll_number}
                                placeholder="Roll Number"
                                name="roll_number"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="number"
                                error={error?.roll_number}
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <MobileDatePicker
                                    label="DOB"
                                    inputFormat="MM/DD/YYYY"
                                    style={{ background: 'white', width: "100%", marginTop: '15px' }}
                                    name="dob"
                                    value={userDetails?.dob}
                                    onChange={(date) => handleDate(date)}
                                    renderInput={(params) => <TextField {...params} style={{ width: '100%' }} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Place Of Birth"
                                value={userDetails?.place_of_birth
                                }
                                error={error?.place_of_birth}
                                placeholder="Place Of Birth"
                                name="place_of_birth"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"

                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <FormControl
                                sx={{
                                    width: "100%"

                                }}


                            >
                                <InputLabel id="demo-simple-select-label" className={`${styles.fontNormal}`}>Gender</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userDetails?.gender}
                                    name="gender"
                                    label="Gender"
                                    onChange={(e) => handleChanges(e)}
                                >
                                    <MenuItem value="1" className={`${styles.fontNormal} font-regular`}>Male</MenuItem>
                                    <MenuItem value="2" className={`${styles.fontNormal} font-regular`}  >Female</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <FormControl sx={{
                                width: "100%"
                            }}>
                                <InputLabel id="demo-simple-select-label" className={`${styles.fontNormal} font-regular`}>Blood Group</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userDetails?.blood_group}
                                    name="blood_group"
                                    label="Blood Group"
                                    onChange={(e) => handleChanges(e)}
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
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Weight in Kg"
                                value={userDetails?.weight}
                                placeholder="weight"
                                name="weight"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="number"
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Height"
                                value={userDetails?.height}
                                placeholder="Height"
                                name="height"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <FormControl sx={{
                                width: "100%"
                            }}>
                                <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Class</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userDetails?.class_id}
                                    name="class_id"
                                    label="Class"
                                    onChange={(e) => handleChanges(e)}
                                >
                                    {gradeList && gradeList.map((v, i) => (<MenuItem value={v.id} onClick={() => change(v)}>{v.title}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Phone"
                                value={userDetails?.phone}
                                placeholder="Phone"
                                name="phone"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={error?.phone}
                                inputProps={{ maxLength: 10 }}

                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <TextField
                                style={{ background: 'white', width: '100%'  }}
                                label="Email"
                                value={userDetails?.email}
                                placeholder="Email"
                                name="email"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={error?.email}
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <FormControl sx={{
                                width: "100%"
                            }}>
                                <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Board</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userDetails.board_id}
                                    name="board_id"
                                    label="Board"
                                    onChange={(e) => handleChanges(e)}
                                >
                                    {boardList && boardList.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <div className={styles.mainContainer}>

                    <div className={styles.cancelandSubmit}>
                        <div className={styles.cancelCon}>
                            <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button>
                        </div>


                        <div className={styles.btnCon}>
                            <button type='submit' className={styles.btn_style}>Submit</button>
                        </div>
                    </div>
                </div>
            </form>

            <Snackbar 
                    anchorOrigin={{ vertical, horizontal }}
                    open={alertDetails.open}
                    onClose={handleClose}
                    autoHideDuration={6000}>
                    
                        <Alert severity={alertDetails.errorType} sx={{ width: '100%' }}>
                            {alertDetails.message}
                        </Alert>
                    </Snackbar>

        </div>
    )
}

export default Student