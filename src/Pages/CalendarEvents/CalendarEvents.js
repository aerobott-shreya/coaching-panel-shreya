import React, { useEffect, useState } from "react";
import CustomCalendar from "../../Components/CustomCalendar/CustomCalendar";
import { api_token } from "../../Utils/Network";
import { convertCalendarDate, getCurrentDateTime } from "../../Utils/Utils";

function CalendarEvents() {
  const [calendarData, setCalendarData] = useState([]);
  const [dateTime, setDateTime] = useState(getCurrentDateTime());
  console.log(dateTime, "date");
  useEffect(() => {
    getListing();
  }, [dateTime]);

  const getListing = () => {
    const { month, year } = dateTime;
    api_token
      .get(`calender/v1/events/?month=${month}&year=${year}`)
      .then((response) => {
        console.log(response);
        const data = convertCalendarDate(response.data.data);
        setCalendarData(data);
      })
      .catch((error) => {});
  };
  return (
    <div>
      <CustomCalendar />
    </div>
  );
}

export default CalendarEvents;
