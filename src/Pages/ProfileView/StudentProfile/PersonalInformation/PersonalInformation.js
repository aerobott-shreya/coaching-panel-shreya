import React, { useState, useEffect } from 'react';
import { api_token } from '../../../../Utils/Network';
import styles from "./index.module.css";
import address from "../../../../Assets/Profile/address.png";
import blood from "../../../../Assets/Profile/blood.png";
import age from "../../../../Assets/Profile/age.png";
import dateofbirth from "../../../../Assets/Profile/dateofbirth.png";
import gender from "../../../../Assets/Profile/gender.png";
import height from "../../../../Assets/Profile/height.png";
import placeofbirth from "../../../../Assets/Profile/placeofbirth.png";
import standard from "../../../../Assets/Profile/standard.png";
import weight from "../../../../Assets/Profile/weight.png";
import { Routes, Route, useParams } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import DialogBox from "../../../../Components/DialogBox/DialogBox";
import Address from "../../../../Assets/Contact/address.png";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const PersonalInformation = ({ access, userState, userId, getData }) => {
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
  const [editId, setEdit] = useState("");
  const [addressClick, setAddressClick] = useState(false);

  console.log(userState,"mneue89879");

  const data = userState?.address?.[0]
  const handeleAdd = (id, info) => {

    console.log(info, "myinfo");

    const { city, country, landmark, line_1, line_2, pincode, state } = info;

    setAddressDetails({
      user: userId,
      city,
      country,
      landmark,
      line_1,
      line_2,
      pincode,
      state
    })


    setEdit(id);
    setAddressClick(true);
  }


  const handleAddressClick = () => {
    setAddressClick(true);
    setAddressDetails({
      user: "",
      line_1: "",
      line_2: "",
      landmark: "",
      city: "",
      state: "",
      pincode: null,
      country: ""
    })

  }

  const handleAddressSubmit = () => {
    // setEdit(false)

    if (editId) {
      // setEdit(true)
      let data = { ...addressDetails, user: userId }
      const canSave = [...Object.values(data)].every(Boolean);

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

      canSave && api_token.post(`profile/v1/address/`, data).
        then((response) => {
          console.log(response.data.data, "response");

          if (response.status === 201) {
            setAddressClick(false)
            getData();
          }

        }).catch((err) => {
          alert("please fill all the details")
        })

      if (!canSave) {
        alert("Please fill all the details")
      }
    }

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



  console.log(access, "accessaccessaccess")

  return (
    <div>


      <div className={styles.mainContainer}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={standard} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Grade</p>
                  <p className={styles.desc} >{userState?.grade?.title}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={blood} />
                </div>

                <div className={styles.InfoCon}>
                  <p className={styles.title}>Blood Group</p>
                  <p className={styles.desc} >{userState?.blood_group}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={age} style={{ height: '35px' }} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Gender</p>
                  <p className={styles.desc} >{(userState?.user?.gender == 1) ? "Male" : (userState?.user?.gender == 2) ? "Female": ""}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={age} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Age</p>
                  <p className={styles.desc} >{userState?.age}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={dateofbirth} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>DOB</p>
                  <p className={styles.desc} >{userState?.dob}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={placeofbirth} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Place Of Birth</p>
                  <p className={styles.desc} >{userState?.place_of_birth}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={height} style={{  height: '32px' }} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Height</p>
                  <p className={styles.desc} >{userState?.height}</p>
                </div>
              </div>
            </Grid>

            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={weight} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Weight</p>
                  <p className={styles.desc} >{userState?.weight}</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div className={styles.addressField}  >

        <div className={styles.AddandeditCon}>
          <p style={{ color: '#216E91', fontWeight: 'bold', fontSize: '25px', marginBottom: '0' }}>Address</p>
          {access?.updateAccess && < AddIcon onClick={handleAddressClick} style={{ color: '#216E91', fontSize: '35px' }} />}
        </div>
        <hr />
        {/* this is the box shadow field*/}
        <div className={styles.boxAddressCon}>

          {

            userState?.address?.map((info, i) => {
              return (

                <div key={i} className={styles.displayEditfield}>
                  <div className={styles.editIconContainer}><EditIcon onClick={(e) => handeleAdd(info.id, info)} className={styles.editIconCon} /> </div>

                  <div style={{ display: 'flex' }}>
                    <div>
                      <img src={Address} alt="images" className={styles.imageHome} />
                    </div>
                    <div>
                      <div><p className={styles.title}>Address {i + 1}</p></div>
                      <div>
                        <div style={{ fontSize: '15px' }}>{`${info?.line_1} ${info?.line_2} `}</div>
                        <div style={{ fontSize: '15px' }}>{`${info?.landmark} `}</div>
                        <div style={{ fontSize: '15px' }}>{`${info?.city}, ${info?.state}, ${info?.pincode} `}</div>
                        <div style={{ fontSize: '15px' }}>{`${info?.country} `}</div>

                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          }

        </div>

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
              value={addressDetails?.pincode}
              name="pincode"
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

    </div>
  )
}

export default PersonalInformation