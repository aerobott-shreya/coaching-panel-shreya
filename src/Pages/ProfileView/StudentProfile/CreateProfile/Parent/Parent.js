import React, { useState } from 'react';
import InputField from '../../../../../Components/Input/InputField';
import styles from "./index.module.css"
import { api_token } from '../../../../../Utils/Network';
import { Navigate, useNavigate } from 'react-router-dom';
import { InputLabel, Select, Snackbar } from '@material-ui/core';
import { Alert, Autocomplete, Box, FormControl, Grid, MenuItem, TextField } from '@mui/material';

const Parent = ({ newlyCreatedUser, userCurrentLocation }) => {

    console.log(newlyCreatedUser, "newlycreateduser");
    const { data } = newlyCreatedUser;
    var check = /^\d{10}$/;
    // var check = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
    const usernameRegextest = /^[a-z ,.'-]+$/i;
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let navigate = useNavigate();
    const [fatherMobile, setFatherMobile] = useState(false);
    const [MotherMobile, setMotherMobile] = useState(false);
    const [fatherEmail, setFatherEmail] = useState(false);
    const [MotherEmail, setMotherEmail] = useState(false);
    const [alertDetails, setAlertDetails] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: '',
        errorType: '',
    })
    const { vertical, horizontal } = alertDetails;


    //Parents Type

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

    // parent1 is mother
    const [parent1, setParent1] = useState({
        first_name: "",
        last_name: "",
        occupation: "",
        phone: "",
        email: "",
        education: ""
    })

    //parent 2 is father
    const [parent2, setParent2] = useState({
        first_name: "",
        last_name: "",
        occupation: "",
        phone: "",
        email: "",
        education: ""
    })


    function clearallFields() {
        setParent1((prev) => (
            {
                ...prev,
                first_name: "",
                last_name: "",
                occupation: "",
                phone: "",
                email: "",
                education: ""

            }))

        setParent2((prev) => (
            {
                ...prev,
                first_name: "",
                last_name: "",
                occupation: "",
                phone: "",
                email: "",
                education: ""
            }))

    }
    // id 1 is for father 
    // id 2 is for mother 

    console.log(parent1, "parent1")

    const handleChanges = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            let result = value.match(check);
            if (result) {
                setMotherMobile(false);
            } else {
                setMotherMobile(true);

            }
        }

        if (name === "email") {
            let result = value.match(emailCheck);
            if (result) {
                setMotherEmail(false);
            } else {
                setMotherEmail(true);
            }
        }

        setParent1(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const change = (v) => {
        console.log(v, "Values")
        setParent2(prevData => ({
            ...prevData,
            relationship: v.id
        }))
    }

    const handleChangesTwo = (e) => {
        const { name, value } = e.target;

        if (name === "phone") {
            let result = value.match(check);
            if (result) {
                setFatherMobile(false);
            } else {
                setFatherMobile(true);
            }
        }

        if (name === "email") {
            let result = value.match(emailCheck);
            if (result) {
                setFatherEmail(false);
            } else {
                setFatherEmail(true);
            }
        }


        setParent2(prevData => ({
            ...prevData,
            [name]: value
        }))

    }


    const handleGuardianSubmit = (e) => {
        e.preventDefault();

        // if (parent1.phone == "") {
        //     setMotherMobile(true);
        // }

        if (parent2.phone == "") {
            setFatherMobile(true);
        }

        if (!fatherMobile) {
            const sendData =
            {

                first_name: parent2.first_name,
                last_name: parent2.last_name,
                phone: parent2.phone,
                email: parent2.email,
                // user_type: 6,
                user: data?.user?.id,
                relationship: parent2.relationship,
                occupation: parent2.occupation,
                education: parent2.education
            }

            console.log(sendData, "Dataaaaaaaaaaaaa")

            api_token
                .post(`/profile/v1/guardian/`, sendData).
                then((res) => {
                    console.log(res.data);
                    // alert("Parents details added successfully");
                    setAlertDetails({
                        ...alertDetails,
                        open: true,
                        message: 'User Created Successfully',
                        errorType: 'success',
                    })
                    clearallFields();
                    setTimeout(() => {
                        navigate(`/dashboard/profile/${data?.id}`)
                    }, 2000);
                }).catch(err => {
                    console.log(err)
                })
        } else {
            setAlertDetails({
                ...alertDetails,
                open: true,
                message: 'Please Fill in Proper Details',
                errorType: 'error',
            })
        }

        // if (!fatherMobile && !MotherMobile) {
        //     const sendData = [
        //         {
        //             user: {
        //                 first_name: parent1.first_name,
        //                 last_name: parent1.last_name,
        //                 phone: parent1.phone,
        //                 email: parent1.email,
        //                 user_type: 6
        //             },
        //             related_to_id: data?.user?.id,
        //             relationship_id: 2,
        //             occupation: parent1.occupation,
        //             education: parent1.education
        //         },
        //         {
        //             user: {
        //                 first_name: parent2.first_name,
        //                 last_name: parent2.last_name,
        //                 email: parent2.email,
        //                 phone: parent2.phone,
        //                 user_type: 6
        //             },
        //             related_to_id: data?.user?.id,
        //             relationship_id: 1,
        //             occupation: parent2.occupation,
        //             education: parent2.education,
        //         }

        //     ]

        //     api_token
        //         .post(`/profile/v1/guardian/`, sendData).
        //         then((res) => {
        //             console.log(res.data);
        //             // alert("Parents details added successfully");
        //             setAlertDetails({
        //                 ...alertDetails,
        //                 open: true,
        //                 message: 'User Created Successfully',
        //                 errorType: 'success',
        //             })
        //             clearallFields();
        //             setTimeout(() => {
        //                 navigate(`/dashboard/profile/${data?.id}`)
        //             }, 2000);
        //         }).catch(err => {
        //             console.log(err)
        //         })
        // } else {
        //     setAlertDetails({
        //         ...alertDetails,
        //         open: true,
        //         message: 'Please Fill in Proper Details',
        //         errorType: 'error',
        //     })
        // }

    }

    const handleClose = () => {
        setAlertDetails({
            ...alertDetails,
            open: false,
            message: '',
            errorType: '',
        })
    }


    return (
        <>

            <form onSubmit={(e) => handleGuardianSubmit(e)}  >
                <div className={styles.Container}  >
                    
                    <div className={styles.mainFamilyCon}>

                        <div className={styles.useraddressDetails}>
                            <TextField
                                style={{ background: 'white', width: "100%" }}
                                label="Guardian's First Name"
                                value={parent2.first_name}
                                placeholder="Guardian First Name"
                                name="first_name"
                                onChange={(e) => handleChangesTwo(e)}
                                size="lg" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>

                        <div className={styles.useraddressDetails}>
                            <TextField
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
                            <TextField
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
                            <TextField
                            id="standard-full-width"
                                style={{ background: 'white', width: "100%" }}
                                label="Guardian's Phone"
                                value={parent2.phone}
                                placeholder="Guardian's Phone"
                                name="phone"
                                onChange={(e) => handleChangesTwo(e)}
                                size="normal" type="text"
                                error={fatherMobile}
                            // error={error === "" ? false : true} 
                            />
                        </div>

                        <div className={styles.useraddressDetails}>
                            <TextField
                            id="outlined-basic"
                                style={{ background: 'white', width: "100%" }}
                                label="Guardian's Email"
                                value={parent2.email}
                                placeholder="Email"
                                name="email"
                                onChange={(e) => handleChangesTwo(e)}
                                size="normal" type="text"
                                error={fatherEmail}
                            // error={error === "" ? false : true} 
                            />
                        </div>

                        <div className={styles.useraddressDetails}>
                            <TextField
                                style={{ background: 'white', width: "100%" }}
                                label="Guardian's Education"
                                value={parent2.education}
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
                                    // variant='outline'
                                     variant="outlined"
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={userDetails?.class_id}
                                    name="class_id"
                                    label="Relationship"
                                    onChange={(e) => handleChanges(e)}
                                >
                                    {relation && relation.map((v, i) => (<MenuItem value={v.id} onClick={() => change(v)}>{v.title}</MenuItem>))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>


                    {/*----------Previous Data------*/}

                    {/* <div className={styles.mainFamilyCon}>

                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label="Father First Name"
                                value={parent2.first_name}
                                placeholder="Father First Name"
                                name="first_name"
                                onChange={(e) => handleChangesTwo(e)}
                                size="normal" type="text"
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
                            // error={error === "" ? false : true} 
                            />
                        </div>

                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label="Father's Phone"
                                value={parent2.phone}
                                placeholder="Father's Phone"
                                name="phone"
                                onChange={(e) => handleChangesTwo(e)}
                                size="normal" type="text"
                                error={fatherMobile}
                            // error={error === "" ? false : true} 
                            />
                        </div>

                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label="Father's Email"
                                value={parent2.email}
                                placeholder="Email"
                                name="email"
                                onChange={(e) => handleChangesTwo(e)}
                                size="normal" type="text"
                                error={fatherEmail}
                            // error={error === "" ? false : true} 
                            />
                        </div>

                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label="Father's Education"
                                value={parent2.education}
                                placeholder="Education"
                                name="education"
                                onChange={(e) => handleChangesTwo(e)}
                                size="normal" type="text"
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
                            // error={error === "" ? false : true} 
                            />
                        </div>

                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label="Mother's Phone"
                                value={parent1.phone}
                                placeholder="Mother Phone"
                                name="phone"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={MotherMobile}
                            // error={error === "" ? false : true} 
                            />
                        </div>


                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label="Mother's Email"
                                value={parent1.email}
                                placeholder="Mother Email"
                                name="email"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                                error={MotherEmail}
                            // error={error === "" ? false : true} 
                            />
                        </div>
                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label=" Mother's Occupation"
                                value={parent1.occupation}
                                placeholder="Occupation"
                                name="occupation"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>


                        <div className={styles.useraddressDetails}>
                            <InputField
                                style={{ background: 'white', width: "100%" }}
                                label="Mother's Education"
                                value={parent1.education}
                                placeholder="Education"
                                name="education"
                                onChange={(e) => handleChanges(e)}
                                size="normal" type="text"
                            // error={error === "" ? false : true} 
                            />
                        </div>

                    </div> */}



                </div>
                <div className={styles.cancelandSubmit}>
                    <div className={styles.cancelCon}>
                        <button className={styles.cancelBtn}>Cancel</button>
                    </div>
                    <div className={styles.btnCon}>
                        <button type='submit' className={styles.btn_style}>Submit</button>
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


export default Parent