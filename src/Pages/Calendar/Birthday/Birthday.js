import React, { useState, useEffect } from "react";
import CustomCalendar from "../../../Components/CustomCalendar/CustomCalendar";
import { convertCalendarDate, getCurrentDateTime } from "../../../Utils/Utils";
import { api_token } from "../../../Utils/Network";
import moment from "moment";

function Birthday() {
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
      .get(`calendar/v1/birthdays`)
      .then((response) => {
        console.log(response);
        // const data = convertCalendarDate(response.data.data.data);
        setCalendarData(response.data.data);
      })
      .catch((error) => {});
  };

  const transformedData = calendarData.map((obj) => {
    return {
      title: obj.name, // Set the name as the title
      dob: obj.dob,
      class: obj.class,
      avatar: obj.avatar,
      user_type: obj.user_type,
      color: "red",
    };
  });

  console.log(transformedData, "calendarDatacalendarD");
  return (
    <div>
      <CustomCalendar calendarData={transformedData} setDateTime={setDateTime}/>
    </div>
  );
}

export default Birthday;
