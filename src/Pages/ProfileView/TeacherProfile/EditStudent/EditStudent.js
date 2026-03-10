import React, { useState, useEffect, useContext } from 'react'
import styles from "./index.module.css";
import TextField from '@mui/material/TextField';
import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Routes, Route, useParams } from 'react-router-dom';
import InputField from '../../../../Components/Input/InputField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { api_token } from '../../../../Utils/Network';
import { UserCredsContext } from '../../../../ContextApi/UserCredsContext/UserCredsContext';
import moment from 'moment';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Alert, Button, Snackbar } from '@mui/material';

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



const EditStudent = ({ editId, userState, setEditView = () => { } }) => {

    let { id } = useParams();
    const { boardList, gradeList, classList, sectionList, subjectList } = useContext(UserCredsContext);
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
    });
    const [alertDetails, setAlertDetails] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: '',
        errorType: '',
    })
    const { vertical, horizontal } = alertDetails;


    function StudentData() {
        const [selectedNames, setSelectedNames] = useState([]);
        const [selectSubject, setSelectedSubject] = useState([]);

        useEffect(() => {
            // debugger;
            console.log(userState, "SSSSSSSSSS")
            // const classList = userState?.classes.map((v, i) => v.id);
            const subjectList = userState?.subject.map((v, i) => v.id);

            const classList = userState?.grade.map((v, i) => v.id);
            // const subjectList = userState?.subject?.id;
            setSelectedNames(classList);
            setSelectedSubject(subjectList);

            const { dob, place_of_birth, blood_group, height, weight, classes, subject } = userState;
            const { first_name, last_name, middle_name,gender } = userState?.user;



            setUserDetails({ dob, place_of_birth, gender, blood_group, height, weight, first_name, last_name, middle_name })

        }, []);

        const handleNameChangeSubject = (event) => {
            console.log(event.target.value)
            setSelectedSubject(event.target.value);
        };

        const handleNameChange = (event) => {
            setSelectedNames(event.target.value);
        };

        const handleChanges = (e) => {
            const { name, value } = e.target;
            setUserDetails(prevData => ({
                ...prevData,
                [name]: value
            }))
        }


        const handleDate = (date) => {
            let dateString = moment(date.$d).format('YYYY-MM-DD');
            setUserDetails(prev => ({ ...prev, dob: dateString }))
        }

        const handleUserDetailSubmit = (e) => {
            e.preventDefault();
            const { subject_id, first_name, last_name, middle_name, classes_id, gender,...rest } = userDetails

            const newObj = {
                user: {
                    id: userState?.user?.id,
                    first_name: userDetails?.first_name,
                    last_name: userDetails?.last_name,
                    middle_name: userDetails?.middle_name,
                    gender: userDetails?.gender,
                },
                classes_id: selectedNames,
                subject_id: selectSubject,
                ...rest
            }


            console.log(newObj, "newObj")

            api_token
                .patch(`profile/v1/teachers/${userState?.id}/`, newObj).
                then((res) => {
                    if (res.status === 200) {
                        setAlertDetails({
                            ...alertDetails,
                            open: true,
                            message: "Updated Successfully",
                            errorType: "success"
                        })
                        // getData();
                        setTimeout(() => {
                            setEditView(true)
                        }, 2000);
                    }
                }).catch(err => {
                    console.log(err)
                    setAlertDetails({
                        ...alertDetails,
                        open: true,
                        message: "Error Updating Data",
                        errorType: "error"
                    })
                })
        }

        const handleCancel = () => {
            setEditView(true)
        }


        const handleClose = () => {
            setAlertDetails({...alertDetails,
                open: false,
                message: '',
                errorType: '',
            })
        }
        console.log(userDetails, "userDetails")




        return (
            <div className >
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
                                    // size="normal" 
                                    type="text"
                                // error={error === "" ? false : true} 
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <InputField
                                    style={{ background: 'white', width: '100%' }}
                                    
                                    label="Middle Name"
                                    value={userDetails?.middle_name}
                                    placeholder="Middle Name"
                                    name="middle_name"
                                    onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                    // size="normal" 
                                    type="text"
                                // error={error === "" ? false : true} 
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <InputField
                                    style={{ background: 'white', width: '100%' }}

                                    label="Last Name"
                                    
                                    value={userDetails?.last_name}
                                    placeholder="Last Name"
                                    name="last_name"
                                    onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                    // size="normal" 
                                    type="text"
                                // error={error === "" ? false : true} 
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>

                                <LocalizationProvider dateAdapter={AdapterDayjs} >
                                    <MobileDatePicker

                                        label="DOB"
                                        inputFormat="MM/DD/YYYY"
                                        style={{ background: 'white', width: "100%", marginTop: '15px' }}
                                        name="dob"
                                        value={userDetails?.dob}
                                        onChange={(date) => handleDate(date)}
                                        renderInput={(params) => <TextField {...params} style={{width: '100%'}}/>}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <InputField
                                    style={{ background: 'white', width: '100%' }}
                                    label="Place Of Birth"
                                    value={userDetails?.place_of_birth}
                                    placeholder="Place Of Birth"
                                    name="place_of_birth"
                                    onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                    size="normal" type="text"
                                // error={error === "" ? false : true} 
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <FormControl
                                    sx={{ width: '100%' }}


                                >
                                    <InputLabel id="demo-simple-select-label" className={`${styles.fontNormal}`}>Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={`${userDetails?.gender}`}
                                        name="gender"
                                        label="Gender"
                                        onChange={(e) => handleChanges(e)}
                                    >
                                        <MenuItem value="1" className={`${styles.fontNormal} font-regular`}>Male</MenuItem>
                                        <MenuItem value="2" className={`${styles.fontNormal} font-regular`}  >Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
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
                            <Grid item xs={2} sm={4} md={4}>
                                <InputField
                                    style={{ background: 'white', width: '100%' }}
                                    label="Weight in Kg"
                                    value={userDetails?.weight}
                                    placeholder="weight"
                                    name="weight"
                                    onChange={(e) => handleChanges(e)}
                                    size="normal" type="text"
                                // error={error === "" ? false : true} 
                                />

                            </Grid>
                            <Grid item xs={2} sm={4} md={4}>
                                <InputField
                                    style={{ background: 'white', width: '100%' }}
                                    label="Height"
                                    value={userDetails?.height}
                                    placeholder="Height"
                                    name="height"
                                    sx={{ width: '100%' }}
                                    onChange={(e) => handleChanges(e)}
                                    size="normal" type="text"
                                // error={error === "" ? false : true} 
                                />
                            </Grid>

                            <Grid item xs={2} sm={4} md={4}>
                                <FormControl sx={{ width: '100%' }} style={{ marginRight: '10px' }}>
                                    <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        // multiple
                                        value={selectedNames}
                                        onChange={handleNameChange}

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
                            <Grid item xs={2} sm={4} md={4}>
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Subjects</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        // multiple
                                        value={selectSubject}
                                        onChange={handleNameChangeSubject}
                                        // renderValue={() }
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
                        </Grid>
                    </Box>
                    <div className={styles.mainContainer}>
                        <div className={styles.firstContainer}>

                        </div>

                        <div className={styles.cancelandSubmit}>
                            <div className={styles.cancelCon}>
                            <Button onClick={handleCancel} variant='outlined' style={{width: '150px'}}>Cancel</Button>

                                {/* <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button> */}
                            </div>


                            <div className={styles.btnCon}>
                                {/* <button type='submit' className={styles.btn_style}>Submit</button> */}
                                <Button type='submit' variant='contained' style={{width: '150px'}}>Submit</Button>
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

    return (
        <>
            {editId == 1 && StudentData()}
            {/* {editId == 2 && addressData()} */}
        </>
    )
}

export default EditStudent