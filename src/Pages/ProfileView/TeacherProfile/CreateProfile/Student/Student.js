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
import ListItemText from '@mui/material/ListItemText';
import { UserCredsContext } from '../../../../../ContextApi/UserCredsContext/UserCredsContext';
import { api_token } from '../../../../../Utils/Network';
import { checkEmptyObject, checkObjectValues } from '../../../../../Utils/Utils';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import MySnackBar from '../../../../../Components/MySnackBar/MySnackBar';
import { Snackbar } from '@material-ui/core';
import { Alert, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Student = ({ setData, setNewlyCreatedUser }) => {
    const navigate = useNavigate();
    var check = /^\d{10}$/;
    // var check = /^(\+?\d{1,3})?[ -]?\(?\d{3}\)?[ -]?\d{3}[ -]?\d{4}$/;
    const usernameRegextest = /^[a-z ,.'-]+$/i;
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    const { boardList, gradeList, classList, sectionList, subjectList, userState } = useContext(UserCredsContext);
    const [userDetails, setUserDetails] = useState({
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '',
        place_of_birth: '',
        gender: '',
        blood_group: '',
        height: '',
        weight: '',
        classes_id: [],
        subject_id: [],
        phone: '',
        email: '',
    });
    const [error, setError] = useState({
    })
    const [selectedNames, setSelectedNames] = useState([]);
    const [selectSubject, setSelectedSubject] = useState([]);
    const [alertDetails, setAlertDetails] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: '',
        errorType: '',
    })
    const { vertical, horizontal } = alertDetails;

    const handleNameChangeSubject = (event) => {
        console.log(event.target.value)
        setSelectedSubject(event.target.value);
    };

    const handleNameChange = (event) => {
        setSelectedNames(event.target.value);
    };



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

        const { gender, blood_group, height, weight, place_of_birth, dob, classes_id, subject_id, ...rest } = userDetails;

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
                    user_type: 2,
                },
                dob: userDetails.dob,
                place_of_birth: userDetails.place_of_birth,
                gender: userDetails.gender,
                blood_group: userDetails.blood_group,
                height: userDetails.height,
                weight: userDetails.weight,
                // classes_id: selectedNames,
                grade_id: [selectedNames],
                subject_id: [selectSubject],
                institute: userState?.institute?.id
            }

            let data = { ...newObj }
            console.log(data, "checkBOOL")
            api_token
                .post(`profile/v1/teachers/`, data).
                then((res) => {
                    if (res.status === 201 || res.status === 200) {
                        if (res.data.data) {
                            console.log(res.data)
                            setAlertDetails({...alertDetails,
                                open: true,
                                message: "Teacher Detail Created Successfully",
                                errorType: 'success'
                            })
                            setData(2);
                            setNewlyCreatedUser(res.data.data)
                        }
                    }
                }).catch(err => {
                    console.log(err)
                })
        } else {
            // alert("Please Enter Valid Details")
            setAlertDetails({...alertDetails,
                open: true,
                message: "Please Enter Valid Details",
                errorType: 'error'
            })
        }
    }


    const handleCancel = () => {
        navigate(`/dashboard/account/teacher`)
    }

    const handleClose = () => {
        setAlertDetails({...alertDetails,
            open: false,
            message: '',
            errorType: '',
        })
    }
    
    
    console.log(error, "errorrr")

    return (
        <div>
            <form onSubmit={(e) => handleUserDetailSubmit(e)}  >
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={2} sm={4} md={4} >
                            <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="First Name"
                                value={userDetails?.first_name}
                                name="first_name"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={error?.first_name}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="Middle Name"
                                value={userDetails?.middle_name}
                                placeholder="Middle Name"
                                name="middle_name"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"
                                error={error?.middle_name}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="Last Name"
                                value={userDetails?.last_name}
                                placeholder="Last Name"
                                name="last_name"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"
                                error={error?.last_name}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <LocalizationProvider dateAdapter={AdapterDayjs} width="100%">
                                <MobileDatePicker
                                    label="DOB"
                                    inputFormat="MM/DD/YYYY"
                                    style={{ background: 'white', width: "100%", marginTop: '15px' }}
                                    name="dob"
                                    value={userDetails?.dob}
                                    onChange={(date) => handleDate(date)}
                                    renderInput={(params) => <TextField {...params} fullWidth/>}
                                />
                            </LocalizationProvider>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="Place Of Birth"
                                value={userDetails?.place_of_birth
                                }
                                placeholder="Place Of Birth"
                                name="place_of_birth"
                                onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <FormControl
                                sx={{ width: '100%' }}
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
                            <FormControl sx={{ width: '100%' }}>
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
                            <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="Weight in Kg"
                                value={userDetails?.weight}
                                placeholder="weight"
                                name="weight"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="Height"
                                value={userDetails?.height}
                                placeholder="Height"
                                name="height"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                            <FormControl sx={{ width: '100%' }}>
                                <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Class</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    // multiple
                                    value={selectedNames}
                                    onChange={handleNameChange}
                                    label="Class"
                                    // renderValue={(selected) => selected.map((id) => gradeList.find((name) => name.id === id)?.title).join(", ")}
                                >
                                    {gradeList && gradeList.map((name, i) => (
                                        <MenuItem key={name} value={name.id}>
                                            {/* <Checkbox checked={personName.indexOf(name.title) > -1} /> */}
                                            <ListItemText primary={name.title} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <FormControl sx={{ width: '100%' }}>
                                <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Subjects</InputLabel>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    // multiple
                                    value={selectSubject}
                                    onChange={handleNameChangeSubject}
                                    label="Subjects"
                                    // renderValue={(selected) => selected.map((id) => subjectList.find((name) => name.id === id)?.title).join(", ")}
                                >
                                    {subjectList && subjectList.map((name, i) => (
                                        <MenuItem key={name} value={name.id}>
                                            {/* <Checkbox checked={personName.indexOf(name.title) > -1} /> */}
                                            <ListItemText primary={name.title} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="Phone"
                                value={userDetails?.phone}
                                placeholder="Phone"
                                name="phone"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={error?.phone}
                            />
                        </Grid>
                        <Grid item xs={2} sm={4} md={4} >
                        <InputField
                                style={{ background: 'white', width: '100%' }}
                                label="Email"
                                value={userDetails?.email}
                                placeholder="Email"
                                name="email"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={error?.email}
                            />
                        </Grid>
                    </Grid>
                </Box>

                <div className={styles.mainContainer}>
                    <div className={styles.cancelandSubmit}>
                        <div className={styles.cancelCon}>
                            <Button type="button" onClick={handleCancel} style={{ width: '150px'}} variant="outlined">Cancel</Button>
                            {/* <button type="button" className={styles.cancelBtn} onClick={handleCancel}>Cancel</button> */}
                        </div>


                        <div className={styles.btnCon}>
                            <Button type='submit' variant='contained' style={{ width: '150px'}} className={styles.btn_style}>Next</Button>
                            {/* <button type='submit' className={styles.btn_style}>Next</button> */}
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