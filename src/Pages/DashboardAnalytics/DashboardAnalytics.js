import React, { useEffect } from "react";
import styles from "./analytics.module.css";
import DashboardChart from "../../Components/DashboardChart/DashboardChart";
import DashBoardTopBar from "../../Components/DashboardTopBar/DashBoardTopBar";

import DashboardPendingFee from "../../Components/DashboardPendingFees/DashboardPendingFee";
import DashDailyCalender from "../../Components/DashDailyCalender/DashDailyCalender";
import Calendar from "react-calendar";
import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import BoxShadow from "../../Components/BoxShadow/BoxShadow";
import { api_token } from "../../Utils/Network";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function DashboardAnalytics(props) {
  const [value, onChange] = useState(new Date());
  const [totalCount, setTotalCount] = useState({});
  const [birthdaysData, setbirthdaysData] = useState([]);

  let navigate = useNavigate();
  const handleRedirect = () => {
    navigate(`/dashboard/attendance/students`);
  };

  const handleBirthData = () => {
    navigate(`/dashboard/calendar/birthdays`);
  }

  useEffect(() => {
    getCountData();
    getBirthDays();
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

  const getBirthDays = () => {
    api_token
    .get(`calendar/v1/birthdays`)
    .then((res) => {
      let data = res.data.data;
      let demo = data.splice(0, 6);
      setbirthdaysData(demo);
    })
    .catch(err => {
      console.log(err)
    })
  }

  // const students = [
  //   { name: "Present", value: totalCount?.todays_attendance?.student_percentile, fill: "#FB7D5B" },
  //   { name: "Absent", value: 100 - totalCount?.todays_attendance?.student_percentile },
  // ];

  // const teachers = [
  //   { name: "Present", value: totalCount?.todays_attendance?.teacher_percentile, fill: "#FCC43E" },
  //   { name: "Absent", value: 100 - totalCount?.todays_attendance?.teacher_percentile },
  // ];

  // const staff = [
  //   { name: "Present", value: totalCount?.todays_attendance?.staff, fill: "#303972" },
  //   { name: "Absent", value: 100 - totalCount?.todays_attendance?.staff },
  // ];


  console.log(totalCount, "totalCounttotalCount")
  return (
    <>
      <div className={styles.container}>
        <div style={{ marginBottom: "30px" }}>
          <DashBoardTopBar count={totalCount?.total_resource} />
        </div>
        <div className={styles.analyticsHeader} style={{ width: '100%' }}>
          <div className={styles.flexDiv}>
            <BoxShadow>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: "32px" }}>Todays Attendance</span>
                <Button variant="outlined" onClick={handleRedirect}>
                  View All
                </Button>
              </div>
              <div className={styles.chartMain}>
                <DashboardChart
                // students={30}
                // teachers={20}
                // staff={10}
                  students={students}
                  teachers={teachers}
                  staff={staff}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  // border: "1px solid black",
                }}
              >
                <div className={styles.flexIndex}>
                  <div
                    className={styles.label}
                    style={{ backgroundColor: "#303972" }}
                  ></div>
                  <div style={{ marginLeft: "5px" }}>
                    Staff &#40;{staff?.[0]?.value}&#37;&#41;
                  </div>
                </div>
                <div className={styles.flexIndex}>
                  <div
                    className={styles.label}
                    style={{ backgroundColor: "#FCC43E" }}
                  ></div>
                  <div style={{ marginLeft: "5px" }}>
                    Teachers &#40;{teachers?.[0]?.value}&#37;&#41;
                  </div>
                </div>
                <div className={styles.flexIndex}>
                  <div
                    className={styles.label}
                    style={{ backgroundColor: "#FB7D5B" }}
                  ></div>
                  <div style={{ marginLeft: "5px" }}>
                    Students &#40;{students?.[0]?.value}&#37;&#41;
                  </div>
                </div>
              </div>
            </BoxShadow>
          </div>
          <div className={styles.flexDiv}>
            <BoxShadow>
              <DashDailyCalender />
            </BoxShadow>
          </div>
          <div className={styles.flexDiv}>
            <BoxShadow>
              <DashboardPendingFee />
            </BoxShadow>
          </div>
          <div className={styles.flexDiv}>
            <BoxShadow>
              <div className={styles.eventCalender}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: "32px" }}>Birthdays Today</span>
                  <Button variant="outlined" onClick={handleBirthData}>
                    View All
                  </Button>
                </div>

                <div className={styles.nameData}>
                  {
                    birthdaysData.map((v, i) => (
                      <div className={styles.birthDayBox}>
                        {
                          (v.avatar) ? <img src={v.avatar} alt="image" className={styles.imgAvt}/> :
                          <AccountCircleIcon className={styles.imgAvt}/>
                        }
                        
                        <p style={{margin: '5px 0'}}>{v.name}</p>
                        <p style={{margin: '5px 0'}}>{v.class}</p>
                      </div>
                    ))
                  }
                </div>

              </div>
            </BoxShadow>
          </div>
        </div>


      </div>
    </>
  );
}

export default DashboardAnalytics;

const students = [
  { name: "Present", value: 12, fill: "#FB7D5B" },
  { name: "Absent", value: 100 - 88 },
];

const teachers = [
  { name: "Present", value: 60, fill: "#FCC43E" },
  { name: "Absent", value: 40 },
];

const staff = [
  { name: "Present", value: 30, fill: "#303972" },
  { name: "Absent", value: 70 },
];
