import React, { useState, useEffect } from 'react'
import styles from "./index.module.css"
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import Calendar from "react-calendar";
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import {
  CircularProgressbar,
  CircularProgressbarWithChildren,
  buildStyles
} from "react-circular-progressbar";
import 'react-circular-progressbar/dist/styles.css';
import { color } from '@mui/system';
import { DesktopDateRangePicker } from '@mui/x-date-pickers-pro/DesktopDateRangePicker';
import Box from '@mui/material/Box';
import moment from 'moment';
import { api_token } from '../../../../Utils/Network';
import 'react-calendar/dist/Calendar.css';

const Attendance = ({ userState }) => {
  const percentage = 66;
  // const [datevalue, setValue] = useState(dayjs('2014-08-18T21:11:54'));
  // const [value, onChange] = useState(new Date());
  const [value, setValue] = React.useState([dayjs().startOf('month'), dayjs().endOf('month')]);
  const [presentDates, setPresent] = useState([]);
  const [absentDates, setAbsentDate] = useState([]);
  const [currentDate, setCurrentDate] = useState({});


  const handleChange = (newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let start = moment(value[0]?.$d).format('YYYY-MM-DD');
    let end = moment(value[1]?.$d).format('YYYY-MM-DD');
    getData(start, end)
    getStudentStatus(start, end)

  }, [value]);

  const getStudentStatus = (first, last) => {
    api_token
      .get(`calendar/v1/student_attendance_report/?start=${first}&end=${last}&student_id=${userState?.user?.id}`)
      .then((res) => {
        console.log(res.data.data);
        if(res.data.data){
          const datas = res.data.data;
          setCurrentDate(datas);
        }
        
      })
      .catch(err => console.log(err))
  }

  const getData = (first, last) => [
    api_token
      .get(`calendar/v1/student_attendance/?from_date=${first}&to_date=${last}&user=${userState?.user?.id}`)
      .then((res) => {
        console.log(res.data.data);
        const dataArray = res.data.data;
        // const statusTrueArray = dataArray.filter((item) => item.status === true);

        const statusTrueArray = dataArray.filter(item => item.status === true).map(item => item.date);
        const statusFalseArray = dataArray.filter(item => item.status === false).map(item => item.date);
        setPresent(statusTrueArray);
        setAbsentDate(statusFalseArray);
      })
      .catch(err => console.log(err))
  ]


  // Assume these are the dates that are present and absent
  // const presentDates = ['2023-02-14', '2023-02-16'];
  // const absentDates = ['2023-02-15'];

  const tileContent = ({ date, view }) => {
    // Check if the current date is present or absent
    if (presentDates.includes(date.toISOString().slice(0, 10))) {
      return <div className={styles.present_date}></div>;
    } else if (absentDates.includes(date.toISOString().slice(0, 10))) {
      return <div className={styles.absent_date}></div>;
    }
  };


  


  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.dateContainer}>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: 'Start Date', end: 'End Date' }}
          >
            <DesktopDateRangePicker
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField {...startProps}
                  />
                  <Box sx={{ mx: 2 }}> to </Box>
                  <TextField {...endProps} 
                
                  />
                  
                </React.Fragment>
              )}
           
         
            />
          </LocalizationProvider>


        </div>



        <div className={styles.progressContainer}>
          <div style={{ width: 150, height: 150, color: "green" }} >
            <CircularProgressbar styles={buildStyles({
              textColor: "black",
              pathColor: "green",
              // trailColor: "gold"
            })} value={currentDate?.percentile || 0} text={`${Math.floor(currentDate?.percentile || 0)}%`} />
          </div>


          <div>
            <div className={styles.infoCon}>
              <p className={styles.nos}>{currentDate?.total_days || 0}</p>
              <p className={styles.text}>Total School Days</p>
            </div>
            <div className={styles.infoCon}>
              <p className={styles.nos}>{currentDate?.present || 0}</p>
              <p className={styles.text}>Total Present Days</p>
            </div>

            <div className={styles.infoCon}>
              <p className={styles.nos}>{currentDate?.absent || 0}</p>
              <p className={styles.text}>Total Absent Days</p>
            </div>
          </div>

        </div>


        <div className={styles.calendarCon}>
          <div style={{ marginTop: "20px", width: '80%' }}>
            <Calendar
              // className={styles.reactCalender}
              // onChange={onChange}
              style={{width: '100%'}}
              value={value}
              tileContent={tileContent}
            // tileClassName={tileClassName}
            />
          </div>
        </div>
      </div>
    </div>


  )
}

export default Attendance