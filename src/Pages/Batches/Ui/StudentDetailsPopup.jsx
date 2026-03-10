import React from "react";
import { Dialog } from "@material-ui/core";

import styles from "../index.module.css";

const StudentDetailsPopup = ({
  studentSelected = {},
  setStudentSelected = () => {},
  getStudentAttendanceReport = () => {},
}) => (
  <Dialog
    onClose={() => setStudentSelected({})}
    aria-labelledby="student details popup"
    open
    // maxWidth="md"
    fullWidth
  >
    <div className={styles.studentDetails}>
      <h2>Student Details</h2>
      {false ? (
        <object
          style={{ height: "80%", width: "96%", marginLeft: "2%" }}
          // data={attendanceReportPdf}
          type="application/pdf"
        >
          <iframe
            style={{ height: "80%", width: "96%", marginLeft: "2%" }}
            // src={attendanceReportPdf}
          ></iframe>
        </object>
      ) : (
        <div style={{ padding: "0 6%" }}>
          <h3 className={styles.variantDetailsHeader}>STUDENT PROFILE</h3>
          <div className={styles.batchDetails}>
            <div className={styles.batchType}>
              <h4>First Name</h4>
              <h4>Last Name</h4>
              <h4>Phone</h4>
              <h4>Email</h4>
            </div>
            <div
              style={{ textAlign: "right", color: "#313e6c" }}
              className={styles.batchData}
            >
              <h4>{studentSelected.first_name}</h4>
              <h4>{studentSelected.last_name}</h4>
              <h4>{studentSelected.phone}</h4>
              <h4>{studentSelected.email}</h4>
            </div>
          </div>
          <h3 className={styles.variantDetailsHeader}>ACADEMIC INFORMATION</h3>
          <div className={styles.batchDetails}>
            <div className={styles.batchType}>
              <h4>Board</h4>
              <h4>Grade</h4>
            </div>
            <div
              style={{ textAlign: "right", color: "#313e6c" }}
              className={styles.batchData}
            >
              <h4>{studentSelected.profile?.board?.title}</h4>
              <h4>{studentSelected.profile?.grade?.title}</h4>
            </div>
          </div>
          <br />
          {/* <h3 className={styles.variantDetailsHeader}>ADDRESS</h3> */}
          <div className={styles.batchDetails}>
            <div className={styles.batchType}>
              <h4>Address</h4>
            </div>
            <div
              style={{ textAlign: "right", color: "#313e6c" }}
              className={styles.batchData}
            >
              {studentSelected.address?.length > 0 && (
                <h4>
                  {studentSelected.address[0].line_1}{" "}
                  {studentSelected.address[0].line_2}{" "}
                  {studentSelected.address[0].landmark}{" "}
                  {studentSelected.address[0].city +
                    " - " +
                    studentSelected.address[0].zipcode}{" "}
                  {studentSelected.address[0].state}{" "}
                  {studentSelected.address[0].country}
                </h4>
              )}
            </div>
          </div>
          <div className={styles.viewAttendance}>
            <h3
              onClick={() => getStudentAttendanceReport(studentSelected.id)}
              style={{ cursor: "pointer", width: "max-content" }}
            >
              View Attendance
            </h3>
          </div>
        </div>
      )}
    </div>
  </Dialog>
);

export default StudentDetailsPopup;
