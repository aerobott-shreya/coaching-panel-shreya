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
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Alert, Button, Snackbar } from '@mui/material';

const usernameRegextest = /^[a-z ,.'-]+$/i;
const nums = /^-?\d+(\.\d+)?$/i;

const EditStudent = ({ editId, userState, setEditView = () => { }, getData = () => { } }) => {

    const [errorfrMother, setErrorfrMother] = useState({
        firstName: true,
        lastName: true,
        occupation: true

    })
    const [errorfrFather, setErrorfrFather] = useState({
        firstName: true,
        lastName: true,
        occupation: true

    })

    const [errorfrStudent, setErrorfrStudent] = useState({
        firstName: true,
        middleName: true,
        lastName: true,
        roll_number: true,
    })

    const [relation, setRelation] = useState([
        { id: 1, title: "Father" },
        { id: 2, title: "Mother" },
        { id: 3, title: "Brother" },
        { id: 4, title: "Sister" },
        { id: 5, title: "Uncle" },
        { id: 6, title: "Aunt" },
        { id: 7, title: "Niece" },
        { id: 8, title: "Nephew" },
        { id: 9, title: "Cousin" },
        { id: 10, title: "Grandfather" },
        { id: 11, title: "Grandmother" },
        { id: 12, title: "Other" },
    ]);


    let { id } = useParams();
    const { boardList, gradeList, classList, sectionList } = useContext(UserCredsContext);
    const [userDetails, setUserDetails] = useState({
        first_name: userState?.user?.first_name,
        middle_name: userState?.user?.first_name,
        last_name: userState?.user?.last_name,
        dob: userState?.dob,
        place_of_birth: userState?.place_of_birth,
        roll_number: userState?.roll_number,
        // age: userState.age,
        gender: userState.gender == 1 ? "1" : "2",
        blood_group: userState?.blood_group,
        height: userState?.height,
        weight: userState?.weight,
        grade_id: userState?.grade?.id,
        board_id: userState?.board?.id,
        class_id: userState?.class_of_student?.id,
    });
    const [father, setFather] = useState({});
    const [mother, setMother] = useState({});


    // id 1 is for father 
    // id 2 is for mother 
    // parent1 is mother
    const [parent1, setParent1] = useState({
        first_name: "",
        last_name: "",
        occupation: "",
        education: "",
        relationship: null,
    })

    //parent 2 is father
    const [parent2, setParent2] = useState({
        first_name: "",
        last_name: "",
        occupation: "",
        education: "",
        relationship: null,
    })


    const [alertDetails, setAlertDetails] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: '',
        errorType: '',
    })
    const { vertical, horizontal } = alertDetails;

    function guardianDetails() {

        //Guardian is set to default 0 

        setFather(userState?.student_guardian[0]);
            setParent2({
                ...parent2,
                first_name: userState?.student_guardian[0]?.first_name,
                last_name: userState?.student_guardian[0]?.last_name,
                occupation: userState?.student_guardian[0]?.occupation,
                education: userState?.student_guardian[0]?.education,
                relationship: userState?.student_guardian[0]?.relationship,
            })


        // if (userState.student_guardian[0]?.relationship === 1) {
        //     setFather(userState?.student_guardian[0]);
        //     setParent2({
        //         ...parent2,
        //         first_name: userState?.student_guardian[0]?.first_name,
        //         last_name: userState?.student_guardian[0]?.last_name,
        //         occupation: userState?.student_guardian[0]?.occupation,
        //         education: userState?.student_guardian[0]?.education,
        //         relationship: userState?.student_guardian[0]?.relationship,
        //     })
        // } else if (userState?.student_guardian[1]?.relationship === 1) {
        //     setFather(userState?.student_guardian[1]);
        //     setParent2({
        //         ...parent2,
        //         first_name: userState?.student_guardian[1]?.first_name,
        //         last_name: userState?.student_guardian[1]?.last_name,
        //         occupation: userState?.student_guardian[1]?.occupation,
        //         education: userState?.student_guardian[1]?.education,
        //         relationship: userState?.student_guardian[1]?.relationship,
        //     })
        // }


        // if (userState.student_guardian[1]?.relationship === 2) {
        //     setMother(userState?.student_guardian[1])
        //     setParent1({
        //         ...parent1,
        //         first_name: userState?.student_guardian[1]?.first_name,
        //         last_name: userState?.student_guardian[1]?.last_name,
        //         occupation: userState?.student_guardian[1]?.occupation,
        //         education: userState?.student_guardian[1]?.education,
        //         relationship: userState?.student_guardian[1]?.relationship,
        //     })
        // } else if (userState?.student_guardian[0]?.relationship === 2) {
        //     setMother(userState?.student_guardian[0]);
        //     setParent1({
        //         ...parent1,
        //         first_name: userState?.student_guardian[0]?.first_name,
        //         last_name: userState?.student_guardian[0]?.last_name,
        //         occupation: userState?.student_guardian[0]?.occupation,
        //         education: userState?.student_guardian[0]?.education,
        //         relationship: userState?.student_guardian[0]?.relationship,
        //     })
        // }
    }

    console.log(parent1, "PARENT")
    useEffect(() => {
        guardianDetails();

    }, [])

    console.log(gradeList, "gradeListgradeList")


    useEffect(() => {

        if (userState?.student_guardian == []) {
            setParent1(prevData => ({
                ...prevData,
                first_name: "",
                last_name: "",
                occupation: "",
                education: "",
            }))


            setParent2(prevData => ({
                ...prevData,
                first_name: "",
                last_name: "",
                occupation: "",
                education: "",
            }))
        }

    }, [])

    const handleCancel = () => {
        setEditView(true)
    }



    function StudentData() {

        const handleChanges = (e) => {

            let result1 = usernameRegextest.test(userDetails.first_name);
            let result2 = usernameRegextest.test(userDetails.middle_name);
            let result3 = usernameRegextest.test(userDetails.last_name);
            let result4 = nums.test(userDetails.roll_number);

            setErrorfrStudent((prev) => ({
                ...prev,
                firstName: result1,
                middleName: result2,
                lastName: result3,
                roll_number: result4,
            }))


            const { name, value } = e.target;
            setUserDetails(prevData => ({
                ...prevData,
                [name]: value
            }))
        }

        const change = (v) => {
            console.log(v, "datas")
            setUserDetails(prevData => ({
                ...prevData,
                grade_id: v?.grade
            }))
        }


        const handleDate = (date) => {
            let dateString = moment(date.$d).format('YYYY-MM-DD');
            setUserDetails(prev => ({ ...prev, dob: dateString }))
        }

        const handleClose = () => {
            setAlertDetails({
                ...alertDetails,
                open: false,
                message: '',
                errorType: '',
            })
        }

        const handleUserDetailSubmit = (e) => {
            e.preventDefault();
            const newObj = {
                user: {
                    id: +userState?.user?.id,
                    first_name: userDetails.first_name,
                    last_name: userDetails.last_name,
                    middle_name: userDetails.middle_name,
                    gender: userDetails.gender,
                },
                dob: userDetails.dob,
                place_of_birth: userDetails?.place_of_birth,
                roll_number: userDetails?.roll_number,
                // age: userDetails.age,
                // gender: userDetails.gender,
                blood_group: userDetails?.blood_group,
                height: userDetails?.height,
                weight: userDetails.weight,
                grade_id: userDetails?.grade_id,
                class_id: userDetails?.class_id,
                board_id: userDetails?.board_id,

                // section_id: userDetails?.section_id,
            }

            let data = { ...newObj }

            console.log(data, "datas")

            api_token
                .patch(`profile/v1/student/${id}/`, data).
                then((res) => {
                    if (res.status === 200) {
                        // alert("Updated SuccessFully");
                        setAlertDetails({
                            ...alertDetails,
                            open: true,
                            message: "Updated Successfully",
                            errorType: "success"
                        })
                        setTimeout(() => {
                            setEditView(true);
                            getData();
                        }, 1000);

                    }
                }).catch(err => {
                    console.log(err)
                })

            if (userState?.student_guardian == "No registered guardian") {
                api_token.post(``).
                    then((response) => {

                    }).catch(err => {

                    })
            }

        }




        console.log(userState, "userState")




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
                                    size="normal" type="text"
                                    error={!errorfrStudent.firstName}
                                // error={error === "" ? false : true} 
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
                                    error={!errorfrStudent.middleName}
                                // error={error === "" ? false : true} 
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
                                    error={!errorfrStudent.lastName}
                                // error={error === "" ? false : true} 
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} >
                                <TextField
                                    style={{ background: 'white', width: '100%' }}
                                    label="Roll Number"
                                    value={userDetails?.roll_number}
                                    placeholder="Roll Number"
                                    name="roll_number"
                                    onChange={(e) => handleChanges(e, "user_Data", "drawer")}
                                    size="normal" type="number"
                                // error={!errorfrStudent.roll_number}
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
                                // error={error === "" ? false : true} 
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
                                // error={error === "" ? false : true} 
                                />
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} >
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Class</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={userDetails?.grade_id}
                                        // value={16}
                                        name="class_id"
                                        label="Class"
                                        onChange={(e) => handleChanges(e)}
                                    >
                                        {gradeList && gradeList.map((v, i) => (<MenuItem value={v.id} onClick={() => change(v)}>{v.title}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={2} sm={4} md={4} >
                                <FormControl sx={{ width: '100%' }}>
                                    <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Board</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={userDetails.board_id}
                                        name="board_id"
                                        label="Board"
                                        onChange={(e) => handleChanges(e, "education_Data", "drawer")}
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
                                <Button onClick={handleCancel} variant='outlined' style={{ width: '150px' }}>Cancel</Button>
                                {/* <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button> */}
                            </div>


                            <div className={styles.btnCon}>
                                <Button type='submit' variant='contained' style={{ width: '150px' }}>Submit</Button>
                                {/* <button type='submit' className={styles.btn_style}>Submit</button> */}
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



    function addressData() {



        const handleChanges = (e) => {
            const { name, value } = e.target;

            setParent1(prevData => ({
                ...prevData,
                [name]: value
            }))

        }


        const change = (v) => {
            console.log(v);
        }

        const handleChangesTwo = (e) => {
            const { name, value } = e.target;
            setParent2(prevData => ({
                ...prevData,
                [name]: value
            }))
        }
        const handleClose = () => {
            setAlertDetails({
                ...alertDetails,
                open: false,
                message: '',
                errorType: '',
            })
        }
        const handleGuardianSubmit = (e) => {
            e.preventDefault();

            const data = {
                first_name: parent2?.first_name,
                last_name: parent2?.last_name,
                relationship: parent2?.relationship,
                occupation: parent2?.occupation,
                user: userState?.user?.id
            }

            console.log(data, "DDDDDDDDDDDDDDd")

            // const data = [
            //     {
            //         id: father?.id,
            //         user: {
            //             id: father?.user?.id,
            //             first_name: parent2?.first_name,
            //             last_name: parent2?.last_name,

            //         },
            //         relationship_id: 1,
            //         occupation: parent2?.occupation,
            //         related_to_id: userState?.user?.id
            //     },
            //     {
            //         id: mother?.id,
            //         user: {
            //             id: mother?.user?.id,
            //             first_name: parent1?.first_name,
            //             last_name: parent1?.last_name,
            //         },
            //         relationship_id: 2,
            //         related_to_id: userState?.user?.id,
            //         occupation: parent1.occupation,

            //     }
            // ]

            api_token
                .patch(`profile/v1/guardian/${father.id}/`, data).
                then((res) => {
                    setAlertDetails({
                        ...alertDetails,
                        open: true,
                        message: "Updated Successfully",
                        errorType: "success"
                    })
                    setTimeout(() => {
                        setEditView(true);
                        getData();
                    }, 1000);
                }).catch(err => {
                    console.log(err)
                })
        }

        console.log(parent2, "parent2parent2parent2")


        return (
            <>

                <form onSubmit={(e) => handleGuardianSubmit(e)}  >
                    <div className={styles.Container}  >
                        <div className={styles.mainFamilyCon}>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Guardian's First Name"
                                    value={parent2.first_name}
                                    placeholder="Guardian First Name"
                                    name="first_name"
                                    onChange={(e) => handleChangesTwo(e)}
                                    size="normal" type="text"
                                // error={error === "" ? false : true} 
                                />
                            </div>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Guardian Last Name"
                                    value={parent2.last_name}
                                    placeholder="Guardian last name"
                                    name="last_name"
                                    onChange={(e) => handleChangesTwo(e)}
                                    size="normal" type="text"
                                // error={error === "" ? false : true} 
                                />
                            </div>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Guardian's Occupation"
                                    value={parent2.occupation}
                                    placeholder="Occupation"
                                    name="occupation"
                                    onChange={(e) => handleChangesTwo(e)}
                                    size="normal" type="text"
                                // error={error === "" ? false : true} 
                                />
                            </div>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Guardian's Education"
                                    value={parent2?.education}
                                    placeholder="Education"
                                    name="education"
                                    onChange={(e) => handleChangesTwo(e)}
                                    size="normal" type="text"
                                // error={error === "" ? false : true} 
                                />
                            </div>

                            <div className={styles.useraddressDetails}>

                                <FormControl sx={{
                                    width: "100%"
                                }}>
                                    <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Relationship</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={parent2?.relationship}
                                        name="relationship"
                                        label="Relationship"
                                        onChange={(e) => handleChangesTwo(e)}
                                    >
                                        {relation && relation.map((v, i) => (<MenuItem value={v.id}
                                        // onClick={() => change(v)}
                                        >{v.title}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        {/* <div className={styles.mainFamilyCon}>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Father first Name"
                                    value={parent2.first_name}
                                    placeholder="Father Name"
                                    name="first_name"
                                    onChange={(e) => handleChangesTwo(e)}
                                    size="normal" type="text"
                                    error={!errorfrFather.firstName}
                                // error={error === "" ? false : true} 
                                />
                            </div>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Father Last Name"
                                    value={parent2.last_name}
                                    placeholder="last name"
                                    name="last_name"
                                    onChange={(e) => handleChangesTwo(e)}
                                    size="normal" type="text"
                                    error={!errorfrFather.lastName}
                                // error={error === "" ? false : true} 
                                />
                            </div>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Father's Occupation"
                                    value={parent2.occupation}
                                    placeholder="Occupation"
                                    name="occupation"
                                    onChange={(e) => handleChangesTwo(e)}
                                    size="normal" type="text"
                                    error={!errorfrFather.occupation}
                                // error={error === "" ? false : true} 
                                />
                            </div>





                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Mother First Name"
                                    value={parent1.first_name}
                                    placeholder="Mother Name"
                                    name="first_name"
                                    onChange={(e) => handleChanges(e)}
                                    size="normal" type="text"
                                    error={!errorfrMother.firstName}
                                // error={error === "" ? false : true} 
                                />
                            </div>

                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Mother Last Name"
                                    value={parent1.last_name}
                                    placeholder="Mother Last Name"
                                    name="last_name"
                                    onChange={(e) => handleChanges(e)}
                                    size="normal" type="text"
                                    error={!errorfrMother.lastName}
                                // error={error === "" ? false : true} 
                                />
                            </div>
                            <div className={styles.useraddressDetails}>
                                <InputField
                                    style={{ background: 'white', width: "100%" }}
                                    label="Occupation"
                                    value={parent1.occupation}
                                    placeholder="Occupation"
                                    name="occupation"
                                    onChange={(e) => handleChanges(e)}
                                    size="normal" type="text"
                                    error={!errorfrMother.occupation}
                                // error={error === "" ? false : true} 
                                />



                            </div>




                        </div> */}


                        <div className={styles.cancelandSubmit}>
                            <div className={styles.cancelCon}>
                                {/* <button className={styles.cancelBtn} onClick={handleCancel}>Cancel</button> */}
                                <Button variant='outlined' style={{ width: '150px' }} onClick={handleCancel}>Cancel</Button>
                            </div>


                            <div className={styles.btnCon}>
                                {/* <button type='submit' className={styles.btn_style}>Submit</button> */}
                                <Button type='submit' style={{ width: '150px' }} variant="contained">Submit</Button>

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

            </>
        )
    }






    return (
        <>
            {editId == 1 && StudentData()}
            {editId == 2 && addressData()}
        </>
    )
}
const state = {
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
    openData: "",
}


export default EditStudent