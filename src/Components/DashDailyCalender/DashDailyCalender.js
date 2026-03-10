import React, { useEffect, useState } from "react";
import styles from "./daily.module.css";
import schoolLogo from "../../Assets/schoologo.png";
import maths from "../../Assets/maths.png";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { api_token } from "../../Utils/Network";
import moment from 'moment';
import { getCurrentDateTime } from "../../Utils/Utils";

const DashDailyCalender = () => {
  let navigate = useNavigate();
  const [dailyClass, setDailyClass] = useState([]);
  const [currenctDate, setCurrentDate] = useState(getCurrentDateTime());

  useEffect(() => {
    const { month, year } = currenctDate;
    getDailyClasses(month, year);
  }, []);

  const getDailyClasses = (month, year) => {
    api_token
      .get(`calendar/v1/events?event_type=2&month=${month + 1}&year=${year}`)
      .then((res) => {
        if (res.data.data) {
          let resdata = res.data.data;
          let demo = resdata.splice(0, 3);
          setDailyClass(demo);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleRedirect = () => {
    navigate(`/dashboard/calendar/daily-classes`);
  };

  const handleData = (data) => {
    navigate(`/dashboard/content/select`, {state: {data}})
  }

  console.log(dailyClass, "DailyClass");
  return (
    <>
      <div className={styles.dailyCalender}>
        <div className={styles.titleBar}>
          <span style={{ fontSize: "32px" }}>Daily Classes</span>
          <Button variant="outlined" onClick={handleRedirect}>
            View All
          </Button>
        </div>

        <div className={styles.dailyCardBox}>
          {dailyClass && dailyClass.map((v, i) => (
            <div className={styles.dailyCard} onClick={() => handleData(v)}>
              <div>
                {(v?.subject?.icon) ?
                  <img src={v?.subject?.icon} alt="logo" width={50} />
                  : <img src={schoolLogo} alt="logo" width={50} />}
              </div>
              <div className={styles.cardDescription}>
                <span className={styles.font20}>{v?.title}</span>

                <span style={{ color: "#B3B3B3" }}>{moment(v?.commence, 'HH:mm:ss').format('h:mm A')}, {parseInt(moment.duration(v.total_time, 'seconds').asMinutes())} min </span>
              </div>
            </div>))}
        </div>
      </div>
    </>
  );
};

export default DashDailyCalender;
