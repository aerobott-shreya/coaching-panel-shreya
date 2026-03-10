import { Button } from "@mui/material";
import React from "react";
import styles from "./pagenot.module.css";
import ed5logo from "../../Assets/ed5logo.png";
import leftCorner from "../../Assets/leftCornerN.png";
import rightCentral from "../../Assets/rightCentralN.png";
import errorBlack from "../../Assets/errorBlack.png";

const PageNotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <img
          src={leftCorner}
          alt="logo"
          style={{ position: "absolute", top: "0px", left: "0px" }}
        />
        <img
          src={rightCentral}
          alt="log"
          style={{ position: "absolute", top: "0px", right: "0px" }}
        />
        <div className={styles.topSection}>
          <div>
            <img src={ed5logo} alt="logo" width={80} />
          </div>
          <div>
            <Button variant="contained"> Login</Button>
          </div>
        </div>
        <div className={styles.middleSection}>
          <div
            className={styles.errorText}
            style={{
              display: "flex",
              flexDirection: "column",
              width: "50%",
              //   border: "1px solid red",
            }}
          >
            <span style={{ fontSize: "50px", fontWeight: "bold" }}>
              404 Error
            </span>
            <span style={{ fontSize: "30px" }}>
              The page you requested could be not be found
            </span>

            <div style={{ marginTop:"50px" }} >
              <Button variant="contained"> Back to home</Button>
            </div>
          </div>
          <div>
            <img src={errorBlack} alt="logo" />
          </div>
        </div>
      </div>
    </>
  );
};

export default PageNotFound;
