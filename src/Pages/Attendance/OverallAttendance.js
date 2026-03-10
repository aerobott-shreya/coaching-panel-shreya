import React, { useEffect, useState } from 'react';
import styles from './index.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CustomCircularProgress from '../../Components/CustomCircularProgress/CustomCircularProgress';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import StudentAttendance from './StudentAttendance';
import TeacherAttendance from './TeacherAttendance';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { api_token } from '../../Utils/Network';

function OverallAttendance({type}) {
    const [value, setValue] = React.useState(type);
    const [totalCount, setTotalCount] = useState({});

    useEffect(() => {
        getCountData();
      }, [])
    
      const getCountData = () => {
        api_token
          .get(`/calendar/v1/school_dashboard_attendence/`)
          .then((res) => {
            let data = res.data.data;
            setTotalCount(prev => data);
          })
          .catch(err => {
            console.log(err);
          })
      }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    console.log(totalCount, "SetTotalCount")

    return (
        <div>
            <p style={{ fontSize: '20px', fontWeight: '900' }}>Attendance</p>
            <div style={{ marginBottom: '20px' }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <div className={styles.mainBox}>
                                <div style={{ width: '100px', height: '100px' }}>
                                    <CircularProgressbar styles={buildStyles({
                                        textColor: "black",
                                        pathColor: "#34234D",
                                        width: '600px'
                                    })}
                                        value={totalCount?.todays_attendance?.student_percentile || 0}
                                    />
                                    {/* <CustomCircularProgress value={70} /> */}
                                </div>
                                <div>
                                    <p className={styles.content}>{totalCount?.todays_attendance?.student_percentile || 0}%</p>
                                    <p className={styles.text}>Student</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={styles.mainBox}>
                                <div style={{ width: '100px', height: '100px' }}>
                                    <CircularProgressbar styles={buildStyles({
                                        textColor: "black",
                                        pathColor: "#216E91",
                                    })}
                                        value={totalCount?.todays_attendance?.teacher_percentile || 0}
                                    />
                                </div>
                                <div>
                                    <p className={styles.content}>{totalCount?.todays_attendance?.teacher_percentile || 0}%</p>
                                    <p className={styles.text}>Teacher</p>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div className={styles.mainBox}>
                                <div style={{ width: '100px', height: '100px' }}>
                                <CircularProgressbar styles={buildStyles({
                                    textColor: "black",
                                    pathColor: "#216E91",
                                    strokeWidth: 10,
                                    trailWidth: 5,
                                })}
                                value={totalCount?.todays_attendance?.staff || 0}
                                />
                                </div>
                                <div>
                                    <p className={styles.content}>{totalCount?.todays_attendance?.staff || 0}%</p>
                                    <p className={styles.text}>Staff</p>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>
            </div>


            <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Students" value="1" />
                            <Tab label="Teacher" value="2" />
                            <Tab label="Staff" value="3" />
                        </TabList>
                    </Box>

                    <TabPanel value="1"><StudentAttendance getCountData={getCountData}/></TabPanel>
                    <TabPanel value="2"><TeacherAttendance getCountData={getCountData}/></TabPanel>
                    <TabPanel value="3">Upcoming</TabPanel>
                </TabContext>
            </Box>

        </div>
    )
}

export default OverallAttendance