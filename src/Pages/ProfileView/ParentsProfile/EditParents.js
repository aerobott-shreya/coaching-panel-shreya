import React, { useState, useContext, useEffect } from 'react'
import InputField from '../../../Components/Input/InputField'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import styles from "./index.module.css";
import { UserCredsContext } from '../../../ContextApi/UserCredsContext/UserCredsContext';
import { api_token } from '../../../Utils/Network';
import { Alert, Button, Snackbar } from '@mui/material';


function EditParents({ userState, editId, setEditView = () => {} }) {


    const { boardList, gradeList, classList, sectionList } = useContext(UserCredsContext);
    const [userDetail, setUserDetail] = useState({
        id: userState?.id,
        user_id: userState?.user?.id,
        first_name: userState?.user?.first_name,
        last_name: userState?.user?.last_name,
        email: userState?.user?.email,
        occupation: userState?.occupation,
        relationship_id: userState?.relationship?.id,
        education: userState?.education,
        related_to: userState?.related_to?.id,
    });
    const [relationship, setRelationShip] = useState([]);
    const [user, setUser] = useState([]);
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
        setUserDetail({
            ...userDetail,
            [name]: value,
        })
    }

    const handleDrop = (e, name) => {
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
                setUserDetail({ ...userDetail, related_to: null })
                setUser(res.data.data);
            })
            .catch(err => console.log(err));
    }

    const submitData = () => {
        const {first_name, last_name, email, user_id, id, ...rest} = userDetail
        let data = { 
            user: {
                id: userDetail?.user_id,
                first_name: userDetail?.first_name,
                last_name: userDetail?.last_name,
                email: userDetail?.email,
            },
            ...rest
        }

        api_token
        .patch(`profile/v1/student_guardian/${userDetail?.id}/`, data)
        .then((res) => {
            if(res.data.data){
                // alert("Data Updated Successfully")
                setAlertDetails({
                    ...alertDetails,
                    open: true,
                    message: 'Data Updated Successfully',
                    errorType: 'success'

                })
                setTimeout(() => {
                    setEditView(true)
                }, 1000);
            }
        })
        .catch(err => {
            console.log(err)
        })

        console.log(data, "DDDDD")
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


    console.log(userState, editId, "EDITS")
    return (
        <div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" value={userDetail?.first_name} name="first_name" label="First Name" width="100%" onChange={handleChange}/>
                </div>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" value={userDetail?.last_name} name="last_name" label="Last Name" width="100%" onChange={handleChange} />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" name="email" value={userDetail?.email} label="Email" width="100%" onChange={handleChange}/>
                </div>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" name="occupation" value={userDetail?.occupation} label="Occupation" width="100%" onChange={handleChange} />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
                <div style={{ margin: '20px', width: '230px' }}>
                    <FormControl fullWidth>
                        <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Relationship</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={userDetail?.relationship_id}
                            name="relationship_id"
                            label="Relationship"
                            onChange={(e) => handleDrop(e, "relationship_id")}
                        >
                            {relationship && relationship.map((v, i) => (<MenuItem value={v?.id}>{v?.title}</MenuItem>))}
                        </Select>
                    </FormControl>
                </div>
                <div style={{ margin: '20px' }}>
                    <InputField type="text" name="education"  onChange={handleChange} value={userDetail?.education} label="Education" width="100%" />
                </div>
            </div>
            <div style={{ display: 'flex' }}>
            <div style={{ margin: '20px', width: '230px' }}>
                        <FormControl fullWidth>
                            <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Class</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
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
                                value={userDetail?.related_to}
                                name="related_to"
                                label="User"
                                onChange={(e) => handleDrop(e, "related_to")}
                            >
                                {user && user.map((v, i) => (<MenuItem value={v?.user?.id}>{v?.user?.first_name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
            </div>
            <div className={styles.cancelandSubmit}>
                <div className={styles.cancelCon}>
                    {/* <button className={styles.cancelBtn} onClick={() => handleCancel()}>Cancel</button> */}
                    <Button onClick={() => handleCancel()} variant="outlined" style={{marginTop: '20px', width: '150px'}}>Cancel</Button>
                </div>
                <div className={styles.btnCon}>
                    {/* <button className={styles.btn_style} onClick={submitData}>Submit</button> */}
                    <Button variant="contained" onClick={submitData} style={{marginTop: '20px', width: '150px'}}>Submit</Button>
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

export default EditParents