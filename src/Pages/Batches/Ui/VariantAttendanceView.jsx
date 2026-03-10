import React from "react";
import { Button } from "@material-ui/core";
import { ArrowBackSharp } from "@material-ui/icons";
import { FaDownload, FaFilePdf } from "react-icons/fa";

import styles from "../index.module.css";
import SwitchComponent from "../../../Component/Switch";

export default function VariantAttendanceView({
  studentList = [],
  variantSelected = {},
  submitAttendance = () => {},
  attendanceMarkedList = [],
  setAttendanceMarkedList = () => {},
  setStudentSelected = () => {},
  attendanceDates = [],
  attendanceSelectedDate = "",
  setAttendanceSelectedDate = () => {},
  getAttendance = () => {},
  getStudentAttendanceReport = () => {},
  goBack = () => {},
}) {
  return (
    <div className={styles.mainContent}>
      <div className={styles.stud_attend_title}>
        {false ? (
          <Button variant="text" style={{ fontSize: "1.2rem" }}>
            Cancel
          </Button>
        ) : (
          <h2 className={styles.variantTitle}>
            <ArrowBackSharp onClick={goBack} className={styles.goBack} />
            {variantSelected.title}
          </h2>
        )}
        <div style={{ marginRight: "5%", display: "flex" }}>
          <Button
            color="primary"
            onClick={() => getStudentAttendanceReport()}
            variant="contained"
            style={{
              textTransform: "none",
              // padding: "0.4rem 2.2rem",
              marginRight: "5%",
            }}
            startIcon={<FaFilePdf />}
            // disabled={attendanceDates.length < 1}
          >
            Attendance
          </Button>
          <Button
            color="primary"
            onClick={() => submitAttendance(attendanceSelectedDate.slice(5))}
            disabled={attendanceMarkedList.includes(0)}
            variant="contained"
            style={{ textTransform: "none", padding: "0.4rem 2.2rem" }}
          >
            Submit
          </Button>
        </div>
      </div>
      <div className={styles.attendanceDates}>
        {attendanceDates.map((d) => (
          <div
            key={d}
            className={styles.attendanceDate}
            onClick={() => (
              getAttendance(d.slice(5)), setAttendanceSelectedDate(d)
            )}
          >
            <div className={styles.attendanceDay}>{d.slice(0, 3)}</div>
            <div
              style={
                attendanceSelectedDate === d
                  ? { backgroundColor: "#ee9435" }
                  : {}
              }
              className={styles.attendanceDateText}
            >
              {parseInt(d.slice(3, 5))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ paddingRight: "6%" }} className={styles.stud_attend_title}>
        <h2 className={styles.variantTitle}>Mark All Present</h2>
        <SwitchComponent
          checked={
            attendanceMarkedList.length >=
            studentList.map((std) => (std = std.id)).length
          }
          onChange={(e, v) =>
            setAttendanceMarkedList(
              v ? studentList.map((std) => (std = std.id)) : []
            )
          }
        />
      </div>
      <div className={styles.studentContainer}>
        {studentList.map((stdnt) => (
          <div key={stdnt.id} className={styles.student}>
            <div
              onClick={() => setStudentSelected(stdnt)}
              style={{ display: "flex", alignItems: "center", width: "90%" }}
            >
              <img className={styles.stdntImg} alt="" src={stdnt.avatar_url} />
              <div
                style={{ width: "auto" }}
                className={styles.batchTextContainer}
              >
                <h4 className={styles.batchTitle}>{stdnt.complete_name}</h4>
                <p className={styles.batchText}>
                  {stdnt.phone} <br />
                  {stdnt.email}
                </p>
              </div>
            </div>
            <div>
              <SwitchComponent
                checked={attendanceMarkedList.includes(stdnt.id)}
                onChange={(e, v) => {
                  if (v)
                    setAttendanceMarkedList([
                      ...attendanceMarkedList,
                      stdnt.id,
                    ]);
                  else
                    setAttendanceMarkedList(
                      attendanceMarkedList.filter(
                        (atndId) => atndId !== stdnt.id
                      )
                    );
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
