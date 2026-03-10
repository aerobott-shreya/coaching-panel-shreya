import React from 'react';
import styles from "./index.module.css";
import blood from "../../../../Assets/Profile/blood.png";
import age from "../../../../Assets/Profile/age.png";
import dateofbirth from "../../../../Assets/Profile/dateofbirth.png";
import gender from "../../../../Assets/Profile/gender.png";
import height from "../../../../Assets/Profile/height.png";
import placeofbirth from "../../../../Assets/Profile/placeofbirth.png";
import standard from "../../../../Assets/Profile/standard.png";
import weight from "../../../../Assets/Profile/weight.png";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const StudentDetail = ({ userState, studentState }) => {

  const { gender, grade, dob, user, roll_number } = studentState[0];

  console.log(userState, "userState")
  return (
    <div style={{ marginTop: '70px' }}>
      <div className={styles.mainContainer}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={standard} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Student Name</p>
                  <p className={styles.desc} >{userState?.related_to.first_name} {" "}{userState?.related_to.last_name} </p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={height} style={{ width: '20px', height: '32px' }} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Phone</p>
                  <p className={styles.desc} >{user?.phone}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={height} style={{ width: '20px', height: '32px' }} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Gender</p>
                  <p className={styles.desc} >{gender === 1 && "Male" || gender === 2 && "Female"}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={height} style={{ width: '20px', height: '32px' }} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Grade</p>
                  <p className={styles.desc} >{grade?.title}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={weight} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Email</p>
                  <p className={styles.desc} >{studentState[0]?.user?.email}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={weight} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Date of birth</p>
                  <p className={styles.desc} >{dob}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={weight} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Roll Number</p>
                  <p className={styles.desc} >{roll_number}</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>





















      </div>




    </div>
  )
}

export default StudentDetail