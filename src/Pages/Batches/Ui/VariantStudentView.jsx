import React from "react";
import { AddOutlined, ArrowBackSharp } from "@material-ui/icons";

import styles from "../index.module.css";

export default function VariantStudentView({
  variantSelected  =  {},
  studentList = [],
  setStudentSelected = () => {},
  setAddStudentPopup = () => {},
  goBack = () => {},
}) {
  return (
    <div className={styles.mainContent}>
      <div className={styles.stud_attend_title}>
        {/* {false ? (
          <Button variant="text" style={{ fontSize: "1.2rem" }}>
            Cancel
          </Button>
        ) : ( */}
        <h2 className={styles.variantTitle}>
          <ArrowBackSharp onClick={goBack} className={styles.goBack} />
          {variantSelected.title}
        </h2>
        {/* )} */}
        <AddOutlined
          onClick={() => setAddStudentPopup(true)}
          className={styles.addStudent}
        />
      </div>
      <div className={styles.stud_attend_title}>
        <h2 className={styles.variantTitle}>Total number of students</h2>
        <h3 className={styles.studentsLength}>{studentList.length} Student</h3>
      </div>
      <div className={styles.studentContainer}>
        {studentList.map((stdnt) => (
          <div
            key={stdnt.id}
            onClick={() => setStudentSelected(stdnt)}
            className={styles.student}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
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
          </div>
        ))}
      </div>
    </div>
  );
}
