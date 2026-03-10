import React, { useState, useContext, useEffect } from 'react'
import InputField from '../../../Components/Input/InputField'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styles from "./index.module.css";
import { UserCredsContext } from '../../../ContextApi/UserCredsContext/UserCredsContext';
import { api_token } from '../../../Utils/Network';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Button, Snackbar } from '@mui/material';
import { checkEmptyObject, checkObjectValues } from '../../../Utils/Utils';


function CreateParent() {
    var check = /^\d{10}$/;
    // var check = "^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$"
    const usernameRegextest = /^[a-z ,.'-]+$/i;
    const emailCheck = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    let navigate = useNavigate();
    const { boardList, gradeList, classList, sectionList } = useContext(UserCredsContext);
    const [userDetail, setUserDetail] = useState({
        first_name: '',
        last_name: '',
        email: '',
        occupation: '',
        relationship_id: '',
        education: '',
        related_to_id: '',
        phone: '',
    });
    const [error, setError] = useState({})
    const [relationship, setRelationShip] = useState([]);
    const [user, setUser] = useState([]);
    const [phones, setPhone] = useState(false);
    const [email, setEmail] = useState(false);
    const [alertDetails, setAlertDetails] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
        message: '',
        errorType: '',
    })
    const { vertical, horizontal } = alertDetails;

    useEffect(() => {
        getRelationship();
    }, []);

    const getRelationship = () => {
        api_token
            .get(`base/v1/relationship/`)
            .then((res) => {
                setRelationShip(res.data.data);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            let result = value.match(check);
            if (result) {
                setError({ ...error, phone: false });
            } else {
                setError({ ...error, phone: true });

            }
        }

        if (name === "email") {
            let result = value.match(emailCheck);
            if (result) {
                setError({ ...error, email: false });
            } else {
                setError({ ...error, email: true });
            }
        }

        if (name === "first_name") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError(prev => ({ ...prev, first_name: false }));
            } else {
                setError(prev => ({ ...prev, first_name: true }));
            }
        }

        if (name === "middle_name") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError({ ...error, middle_name: false });
            } else {
                setError({ ...error, middle_name: true });
            }
        }
        if (name === "last_name") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError({ ...error, last_name: false });
            } else {
                setError({ ...error, last_name: true });
            }
        }

        if (name === "occupation") {
            let result = value.match(usernameRegextest);
            if (result) {
                setError({ ...error, occupation: false });
            } else {
                setError({ ...error, occupation: true });
            }
        }

        if (name === "education") {
            if(value){
                setError({ ...error, education: false });
            }

            // let result = value.match(usernameRegextest);
            // if (result) {
            //     setError({ ...error, education: false });
            // } else {
            //     setError({ ...error, education: true });
            // }
        }
        setUserDetail({
            ...userDetail,
            [name]: value,
        })
    }

    const handleDrop = (e, name) => {
        if (name === "relationship_id") {
            setError({ ...error, relationship_id: false });
        }

        if (name === "related_to_id") {
            setError({ ...error, related_to_id: false });
        }
        setUserDetail({
            ...userDetail,
            [name]: e.target.value,
        })
    }

    const handleChanges = (e) => {
        console.log(e.target.value)
        let value = e.target.value;
        api_token
            .get(`profile/v1/student/?class_of_student=${value}`)
            .then((res) => {
                setUserDetail({ ...userDetail, related_to_id: null })
                setUser(res.data.data);
            })
            .catch(err => console.log(err));
    }

    const submitData = () => {

        const booleanKey = {};

        const checkObj = checkObjectValues(error);

        if (checkObj) {
            for (let key in userDetail) {
                booleanKey[key] = Boolean(!userDetail[key]); // set to true if value is truthy, false otherwise
            }
            setError(booleanKey);
        } else {
            for (let key in error) {
                booleanKey[key] = Boolean(error[key]); // set to true if value is truthy, false otherwise
            }
            setError(booleanKey);
        }

        const { education, ...rest} = userDetail;

        const checkEmpty = checkEmptyObject(rest);


        console.log(checkObj, booleanKey, checkEmpty, "checkBOOL")
        if (checkEmpty && checkObj) {
            const { first_name, last_name, email, ...rest } = userDetail
            let data = {
                user: {
                    first_name: userDetail?.first_name,
                    last_name: userDetail?.last_name,
                    email: userDetail?.email,
                    phone: userDetail?.phone,
                    user_type: 6,
                },
                ...rest
            }

            api_token
            .post(`profile/v1/student_guardian/`, data)
            .then((res) => {
                if(res.data.data){
                    // alert("Data Added Successfully")
                    setAlertDetails({...alertDetails,
                        open: true,
                        message: 'Data Added Successfully',
                        errorType: 'success',
                    })
                    setTimeout(() => {
                        navigate(`/dashboard/parents/${res?.data?.data?.id}`)
                    }, 1000);
                }
            })
            .catch(err => {
                console.log(err)
            })

            console.log(data, "jdfjdhfdjhfjd")
        }else{
            setAlertDetails({...alertDetails,
                open: true,
                message: 'Please Fill in Proper Details',
                errorType: 'error',
            })
        }

    }

    const handleClose = () => {
        setAlertDetails({...alertDetails,
            open: false,
            message: '',
            errorType: '',
        })
    }

    const handleCancel = () => {
        navigate(`/dashboard/account/parents`)
    }

    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" error={error.first_name} name="first_name" label="First Name" width="100%" onChange={handleChange} />
                </div>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" error={error.last_name} name="last_name" label="Last Name" width="100%" onChange={handleChange} />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" error={error.email} name="email" label="Email" width="100%" onChange={handleChange} />
                </div>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" error={error.occupation} name="occupation" label="Occupation" width="100%" onChange={handleChange} />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '20px', width: '230px' }}>
                    <FormControl fullWidth>
                        <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Relationship</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            error={error.relationship_id}
                            // value={userDetail?.relationship_id}
                            name="relationship_id"
                            label="Relationship"
                            onChange={(e) => handleDrop(e, "relationship_id")}
                        >
                            {relationship && relationship.map((v, i) => (<MenuItem value={v?.id}>{v?.title}</MenuItem>))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" name="education" error={error.education} onChange={handleChange} label="Education" width="100%" />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '20px', width: '230px' }}>
                    <FormControl fullWidth>
                        <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Class</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            error={error.class_id}
                            // value={userDetails?.class_id}
                            name="class_id"
                            label="Class"
                            onChange={(e) => handleChanges(e)}
                        >
                            {classList && classList.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
                        </Select>
                    </FormControl>
                </div>

                <div style={{ margin: '20px', width: '230px' }}>
                    <FormControl fullWidth>
                        <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">User</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            error={error.related_to_id}
                            // value={userDetail?.related_to}
                            name="related_to_id"
                            label="User"
                            onChange={(e) => handleDrop(e, "related_to_id")}
                        >
                            {user && user.map((v, i) => (<MenuItem value={v?.user?.id}>{v?.user?.first_name}</MenuItem>))}
                        </Select>
                    </FormControl>
                </div>
            </div>
            <div style={{ margin: '20px', width: '250px' }}>
                <InputField type="number" name="phone" error={error.phone} onChange={handleChange} label="Phone" width="100%" />
            </div>
            <div className={styles.cancelandSubmit}>
                <div className={styles.cancelCon}>
                    {/* <button className={styles.cancelBtn} onClick={() => handleCancel()}>Cancel</button> */}
                    <Button style={{ width: '150px', marginTop: '20px' }} onClick={() => handleCancel()} variant="outlined">Cancel</Button>
                </div>
                <div className={styles.btnCon}>
                    {/* <button className={styles.btn_style} onClick={submitData}>Submit</button> */}
                    <Button onClick={submitData} variant="contained" style={{ width: '150px', marginTop: '20px' }}>Submit</Button>
                </div>
            </div>

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

export default CreateParent