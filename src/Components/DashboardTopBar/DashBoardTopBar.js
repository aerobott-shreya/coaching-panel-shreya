import React, {useState, useEffect} from "react";
import styles from "./dashboardTop.module.css";

const DashBoardTopBar = (props) => {
  return (
    <>
      <div className={styles.topBar}>
        <div className={styles.topBarMain}>
          <div className={styles.card}>
            <span className={`${styles.orangeBold}`}>{props?.count?.students || 0}</span>
            <span className={`${styles.white20}`}>Students</span>
          </div>
          <div className={styles.card}>
            <span className={`${styles.orangeBold}`}>{props?.count?.teachers || 0}</span>
            <span className={`${styles.white20}`}>Teachers</span>
          </div>
          <div className={styles.card}>
            <span className={`${styles.orangeBold}`}>{props?.count?.staff || 0}</span>
            <span className={`${styles.white20}`}>Staff</span>
          </div>
          <div className={styles.card}>
            <span className={`${styles.orangeBold}`}>{props?.count?.open_seats || 0}</span>
            <span className={`${styles.white20}`}>Open Seats</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashBoardTopBar;
