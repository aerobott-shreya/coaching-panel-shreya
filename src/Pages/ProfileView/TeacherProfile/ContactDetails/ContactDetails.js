import React, { useState } from 'react'
import styles from "./index.module.css";
import Mail from "../../../../Assets/Contact/email.png";
import Address from "../../../../Assets/Contact/address.png";
import Phone from "../../../../Assets/Contact/phone.png";
import AddIcon from '@mui/icons-material/Add';
import DialogBox from "../../../../Components/DialogBox/DialogBox";
import TextField from '@mui/material/TextField';
import { api_token } from '../../../../Utils/Network';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function ContactDetails({ access, userState, userId, getData = () => { } }) {
    const [addressDetails, setAddressDetails] = useState({
        user: "",
        line_1: "",
        line_2: "",
        landmark: "",
        city: "",
        state: "",
        zipcode: null,
        country: ""
    });
    const [addressClick, setAddressClick] = useState(false);
    const [editId, setEdit] = useState("");
    
    const handeleAdd = (id, info) => {

        console.log(info, "myinfo");

        const { city, country, landmark, line_1, line_2, zipcode, state } = info;

        setAddressDetails({
            user: userId,
            city,
            country,
            landmark,
            line_1,
            line_2,
            zipcode,
            state
        })

        setEdit(id);
        setAddressClick(true);
    }

    const handleAddressClick = () => {
        setEdit("");
        setAddressClick(true);
        setAddressDetails({
            user: "",
            line_1: "",
            line_2: "",
            landmark: "",
            city: "",
            state: "",
            zipcode: null,
            country: ""
        })

    }


    const closeData = () => {
        // debugger;
        setAddressClick(false)
    }

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setAddressDetails(prevData => ({
            ...prevData,
            [name]: value
        }))
    }


    const handleAddressSubmit = () => {
        // debugger;
        // setEdit(false)

        if (editId) {
            // setEdit(true)
            let data = { ...addressDetails, user: userId }
            const canSave = [...Object.values(data)].every(Boolean);

            console.log(data, editId, "EditData")

            canSave && api_token.patch(`profile/v1/address/${editId}/`, data).
                then((response) => {
                    console.log(response.data, "mynewresponse")
                    if (response.status === 200) {
                        setAddressClick(false);
                        getData();
                        setEdit("")
                    }

                }).catch(err => {
                    alert("please fill all the fields")
                })

            if (!canSave) {
                alert("please fill all the details")
            }

        } else {
            let data = { ...addressDetails, user: userId }
            const { user, ...otherProps } = data;
            const canSave = [...Object.values(otherProps)].every(Boolean);

            console.log(data, "EditData")
            canSave && api_token.post(`profile/v1/address/`, data).
                then((response) => {
                    console.log(response.data.data, "response");

                    if (response.status === 201) {
                        setAddressClick(false)
                        getData();
                    }

                }).catch((err) => {
                    alert("please fill all the details")
                    console.log(err,"err");
                })

            if (!canSave) {
                alert("Please fill all the details")
            }
        }

    }

    return (
        <>
            <div className={styles.mainContainer} >

                <Grid container spacing={{ xs: 2, md: 2 }} columns={{ xs: 4, sm: 12, md: 24, lg: 12 }}>
                    <Grid item xs={2} sm={6} md={12} lg={4} >
                        <div className={styles.teacherMain} style={{display: 'flex'}}>
                            <div>
                                <img src={Mail} alt="images" className={styles.image} />
                            </div>
                            <div>
                                <div><p className={styles.title}>Mail ID</p></div>
                                <div style={{ wordBreak: 'break-all', fontSize: '13px'}}>{userState?.user?.email || "----"}</div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={2} sm={6} md={12} lg={4}>
                        <div className={styles.teacherMain} style={{display: 'flex'}}>
                            <div>
                                <img src={Phone} alt="images" className={styles.image} style={{ width: '30px' }} />
                            </div>
                            <div>
                                <div><p className={styles.title}>Phone No</p></div>
                                <div style={{ wordBreak: 'break-all', fontSize: '13px'}}>{userState?.user?.phone || "----"}</div>
                            </div>
                        </div>
                    </Grid>
                </Grid>



            </div>

            <div className={styles.AddandeditCon}>
                <p style={{color: '#216E91', fontSize: '20px', fontWeight: 'bold'}}>Address</p>
                {access?.updateAccess && <AddIcon onClick={handleAddressClick} style={{color: '#216E91', fontSize: '36px'}} />}
            </div>
            <hr />
            {/* <div className={styles.mainContainer}> */}
            <div>
                {(userState.address.length < 0) ? <div className={styles.teacherMain}>
                    <div>
                        <img src={Address} alt="images" className={styles.image} />
                    </div>
                    <div>
                        <div><p className={styles.title}>Address</p></div>
                        <div>No Address</div>
                    </div>
                </div>

                    :
                    <>
                        <Box sx={{ flexGrow: 1 }}>
                            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
                                {userState.address.map((v, i) => (
                                    <Grid item xs={2} sm={4} md={6} lg={4} key={i}>
                                        <div className={styles.teacherMain}>
                                            <div className={styles.editIconContainer} style={{textAlign: 'right'}}>{access?.updateAccess && <EditIcon onClick={(e) => handeleAdd(v.id, v)} className={styles.editIconCon} /> }</div>
                                            <div className={styles.innerMainBox}>
                                                <div>
                                                    <img src={Address} alt="images" className={styles.image} style={{width: '30px'}} />
                                                </div>
                                                <div>
                                                    <div><p className={styles.title}>Address {i + 1}</p></div>
                                                    <div>
                                                        <div style={{ fontSize: '12px', textTransform: 'capitalize', color: '#7e7e7e' }}>{`${v?.line_1} ${v?.line_2} `}</div>
                                                        <div style={{ fontSize: '12px', textTransform: 'capitalize', color: '#7e7e7e' }}>{`${v?.landmark} `}</div>
                                                        <div style={{ fontSize: '12px', textTransform: 'capitalize', color: '#7e7e7e' }}>{`${v?.city}, ${v?.state}, ${v?.zipcode} `}</div>
                                                        <div style={{ fontSize: '12px', textTransform: 'capitalize', color: '#7e7e7e' }}>{`${v?.country} `}</div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </>

                }
            </div>

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
                            value={addressDetails?.zipcode}
                            name="zipcode"
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

        </>
    )
}

export default ContactDetails