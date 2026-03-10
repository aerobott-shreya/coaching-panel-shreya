import React, { useEffect } from 'react'
import styles from "./index.module.css";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

function Specialization({ userState }) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className={styles.mainSpecial}>


            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 10, lg: 12 }}>

                    {userState?.subject?.map((v, i) => (
                        <Grid item xs={2} sm={4} md={5} lg={4} key={i}>
                            <div className={styles.mainBox}>
                                <div>
                                    <img src={v?.icon} alt="image" className={styles.image} />
                                </div>
                                <div style={{ width: '100px' }}>
                                    <p className={styles.text}>{v?.title}</p>
                                </div>
                            </div>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </div>
    )
}

export default Specialization