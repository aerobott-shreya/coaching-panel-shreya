import React, { useState, useEffect } from 'react';
import { api_token } from '../../../../../Utils/Network';
import styles from "./index.module.css";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

function Contact({ newlyCreatedUser, setData = () => { } }) {

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

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setAddressDetails(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const SubmitData = () => {
        let data = { ...addressDetails, user: newlyCreatedUser?.user?.id };
        const canSave = [...Object.values(data)].every(Boolean);

        canSave && api_token.post(`profile/v1/address/`, data).
            then((response) => {
                if (response.status === 201 || response.status === 200) {
                    setData(3);
                }
            }).catch((err) => {
                alert("please fill all the details")
            })

        if (!canSave) {
            alert("Please fill all the details")
        }
    }

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid item xs={2} sm={4} md={4} >
                        <TextField
                        style={{ background: 'white', width: '100%' }}
                            // value={addressDetails?.line_1}
                            name="line_1"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Address line 1"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <TextField
                        style={{ background: 'white', width: '100%' }}
                            // value={addressDetails?.line_2}
                            name="line_2"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Address line 2"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <TextField
                        style={{ background: 'white', width: '100%' }}
                            // value={addressDetails?.landmark}
                            name="landmark"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Landmark"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <TextField
                        style={{ background: 'white', width: '100%' }}
                            // value={addressDetails?.city}
                            name="city"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="City"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <TextField
                        style={{ background: 'white', width: '100%' }}
                            // value={addressDetails?.state}
                            name="state"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="State"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <TextField
                        style={{ background: 'white', width: '100%' }}
                            // value={addressDetails?.pincode}
                            name="pincode"
                            type="number"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Pincode"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2} sm={4} md={4} >
                        <TextField
                        style={{ background: 'white', width: '100%' }}
                            // value={addressDetails?.country}
                            name="country"
                            onChange={handleAddressChange}
                            className={styles.textField}
                            id="outlined-basic"
                            label="Country"
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </Box>


            <div style={{textAlign: 'right'}}>
                <Button onClick={SubmitData} variant="contained" style={{marginTop: '20px', width: '150px'}} className={styles.btn_style}>Next</Button>
                {/* <button onClick={SubmitData} className={styles.btn_style}>Next</button> */}
            </div>

        </div>
    )
}

export default Contact