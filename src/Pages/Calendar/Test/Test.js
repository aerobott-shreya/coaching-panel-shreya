import React, { useState, useEffect } from "react";
import CustomCalendar from "../../../Components/CustomCalendar/CustomCalendar";
import { convertCalendarDate, getCurrentDateTime } from "../../../Utils/Utils";
import { api_token } from "../../../Utils/Network";
import { Button } from "@mui/material";
import moment from "moment";

function Test() {
  const [calendarData, setCalendarData] = useState([]);
  const [currenctDate, setCurrentDate] = useState(getCurrentDateTime());
  const [dateTime, setDateTime] = useState();
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

  const getListing = (month, year) => {
    // const { month, year } = dateTime;
    // &month=${month}&year=${year}
    api_token
      .get(`calendar/v1/events?event_type=5&month=${month}&year=${year}`)
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
      <div>
        <Button>Add Test</Button>
      </div>
      <div>
        <CustomCalendar calendarData={calendarData} setDateTime={setDateTime} />
      </div>
    </div>
  );
}

export default Test;
