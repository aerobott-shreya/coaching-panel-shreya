import { Alert, Button, Checkbox, FormControlLabel } from '@mui/material';
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import InputField from '../../../../../Components/Input/InputField'
import { api_token } from '../../../../../Utils/Network';
import styles from "./index.module.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Snackbar } from '@material-ui/core';
import { checkEmptyObject } from '../../../../../Utils/Utils';

function ProfessionDetail({ newlyCreatedUser }) {
    let navigate = useNavigate();
    const [educationDetail, setEducationDetail] = useState({
        degree: '',
        specialization: '',
        institute: '',
        passing_year: '',
        on_going: false,
    });
    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
        message: '',
        errorType: '',
    });
    const [errors, setError] = useState({});
    const { vertical, horizontal } = state;


    const handleToggle = (e) => {
        setEducationDetail({ ...educationDetail, on_going: e.target.checked })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEducationDetail({ ...educationDetail, [name]: value })
    }

    const submitData = () => {
        let data = { ...educationDetail, user: newlyCreatedUser?.id };

        if (data?.on_going) {
            data.passing_year = '';
        }

        const { passing_year, on_going, ...rest } = data;
        const booleanKey = {};
        for (let key in rest) {
            booleanKey[key] = Boolean(!rest[key]); // set to true if value is truthy, false otherwise
        }
        setError(booleanKey);
        const checkEmpty = checkEmptyObject(rest);
        console.log(newlyCreatedUser?.id,"nfeufhscbsfbwe84687346");

        // setState({
        //     ...state,
        //     open: true,
        //     message: "Teacher Created Successfully",
        //     errorType: "success",
        // })
        console.log(data, checkEmpty, errors, "DDd")
        if (checkEmpty) {
            // api_token
            //     .patch(`profile/v1/teachers/${newlyCreatedUser?.id}/`, { education: [{ ...data }] })
            //     .then((res) => {
            //         if (res.status === 200 || res.status === 201) {
            //             // alert("Teacher Created Successfully");
            //             setState({
            //                 ...state,
            //                 open: true,
            //                 message: "Teacher Created Successfully",
            //                 errorType: "success",
            //             })
            //             setTimeout(() => {
            //                 navigate(`/dashboard/teacherprofile/${newlyCreatedUser?.id}`)
                            
            //             }, 1000);
            //         }
            //     })
            //     .catch(err => {
            //         console.log(err);
            //     })
            api_token
                .post(`profile/v1/education/`, { ...data })
                .then((res) => {
                    if (res.status === 200 || res.status === 201) {
                        // alert("Teacher Created Successfully");
                        setState({
                            ...state,
                            open: true,
                            message: "Teacher Created Successfully",
                            errorType: "success",
                        })
                        setTimeout(() => {
                            navigate(`/dashboard/teacherprofile/${newlyCreatedUser?.id}`)
                            
                        }, 1000);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        } else {
            setState({
                ...state,
                open: true,
                message: "Please Enter Valid Detail",
                errorType: "error",
            })
        }

    }

    const handleClose = () => {
        setState({
            ...state,
            open: false,
            message: '',
            errorType: '',
        })
    }

    return (
        <div style={{ marginLeft: '20px' }}>
            <h2>Add Degree</h2>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 6, md: 6 }}>
                    <Grid item xs={4} sm={6} md={6} >
                        <InputField error={errors?.degree} style={{ width: '350px' }} name="degree" label="Degree" onChange={handleChange} />
                    </Grid>
                    <Grid item xs={4} sm={6} md={6} >
                        <InputField error={errors?.specialization} style={{ width: '350px' }} name="specialization" label="Specialization" onChange={handleChange} />

                    </Grid>
                    <Grid item xs={4} sm={6} md={6} >
                        <InputField error={errors?.institute} style={{ width: '350px' }} name="institute" label="Institute" onChange={handleChange} />

                    </Grid>
                    <Grid item xs={4} sm={6} md={6} >
                        <FormControlLabel control={<Checkbox onChange={handleToggle} />} label="On Going" />

                        {!educationDetail?.on_going && <InputField name="passing_year" label="Passing Year" onChange={handleChange} />}

                    </Grid>
                </Grid>
            </Box>
            <div>
                <Button onClick={submitData} variant="contained" style={{ width: '150px', marginTop: '20px' }}>Submit</Button>
            </div>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.open}
                onClose={handleClose}
            // variant="success"
            >
                <Alert severity={state.errorType}>
                    {state.message}
                </Alert>
            </Snackbar>
        </div>
    )
}

export default ProfessionDetail