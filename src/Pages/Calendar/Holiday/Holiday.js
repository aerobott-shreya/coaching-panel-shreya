import React, { useState, useEffect } from "react";
import CustomCalendar from "../../../Components/CustomCalendar/CustomCalendar";
import { convertCalendarDate, getCurrentDateTime } from "../../../Utils/Utils";
import { api_token } from "../../../Utils/Network";
import { Button, TextField } from "@mui/material";
import styles from "./index.module.css";
import moment from "moment";
import DrawerComp from "../../../Components/DrawerComp/DrawerComp";

function Holiday() {
  const [calendarData, setCalendarData] = useState([]);
  const [currenctDate, setCurrentDate] = useState(getCurrentDateTime());
  const [dateTime, setDateTime] = useState();
  const [open,setOpen] = useState(false);
  console.log(dateTime, "date");
  useEffect(() => {
    let mnth;
    let yrs;
    if (dateTime) {
      const date = moment(dateTime, "MMM DD YYYY");
      mnth = date.format("M"); // Full month name (e.g., "June")
      yrs = date.format("YYYY"); // 4-digit year (e.g., "2023")
    } else {
      const { month, year } = currenctDate;
      mnth = month + 1;
      yrs = year;
    }
    getListing(mnth, yrs);
  }, [dateTime]);

  const handleClicked = () =>{
    setOpen(!open)
  }
  const getListing = (month, year) => {
    // const { month, year } = dateTime;
    // &month=${month}&year=${year}
    api_token
      .get(`calendar/v1/events?event_type=3&month=${month}&year=${year}`)
      .then((response) => {
        console.log(response);
        const data = convertCalendarDate(response.data.data);
        setCalendarData(data);
      })
      .catch((error) => {});
  };

  console.log(calendarData, "calendarData");
  return (
    <div>
      {/* <div className={styles.mainData}>
        <Button variant="contained" onClick={handleClicked}>Add Holiday</Button>
      </div> */}
      <div>
        <CustomCalendar calendarData={calendarData} setDateTime={setDateTime} />
      </div>
      <div>
        <DrawerComp
          open={open} 
          onClose={() => setOpen(false)} 
          anchor="right"
        >
          <div className={styles.drawerContain}>
            <h2>Add Holidays</h2>
            <div className={styles.textData}>
              <TextField name="title" label="Title"/>
            </div>
            <div className={styles.textData}>
              <TextField name="title" label="Title"/>
            </div>
            <div className={styles.textData}>
              <TextField type="date" style={{width: '100%'}}/>
            </div>
            <div className={styles.textData}>
              <TextField type="date" style={{width: '100%'}}/>
            </div>
          </div>
        </DrawerComp>
      </div>
    </div>
  );
}

export default Holiday;
