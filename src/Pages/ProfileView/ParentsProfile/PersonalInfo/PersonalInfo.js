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

const PersonalInfo = ({ userState }) => {




  return (
    <div>

      <div className={styles.mainContainer}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 8, lg: 12 }}>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={standard} style={{width: '36px'}}/>
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>Education</p>
                  <p className={styles.desc} >{userState?.education}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={blood} />
                </div>

                <div className={styles.InfoCon}>
                  <p className={styles.title}>Occupation</p>
                  <p className={styles.desc} >{userState?.occupation}</p>
                </div>
              </div>
            </Grid>
            <Grid item xs={2} sm={2} md={4}>
              <div className={styles.rightInfocon}>
                <div className={styles.imageCon}>
                  <img className={styles.mainImage} src={gender} style={{ width: '16px', height: '35px' }} />
                </div>
                <div className={styles.InfoCon}>
                  <p className={styles.title}>relationship</p>
                  <p className={styles.desc} >{userState?.relationship?.title}</p>
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
                  <p className={styles.desc} >{userState?.related_to?.phone}</p>
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
                  <p className={styles.desc} >{userState?.user?.email}</p>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>











      </div>

    </div>
  )
}

export default PersonalInfo