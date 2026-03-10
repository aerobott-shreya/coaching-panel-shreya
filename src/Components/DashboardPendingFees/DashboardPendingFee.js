import React, { useState, useEffect } from "react";
import styles from "./pendingfees.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import pendings from "../../Assets/pending.png";
import { Button } from "@mui/material";
import { api_token } from "../../Utils/Network";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const DashboardPendingFee = () => {
  // debugger
  let navigate = useNavigate();
  const [pending, setPending] = useState([]);


  useEffect(() => {
    getPending();
  }, []);

  const RedirectFee = () => {
    navigate('/dashboard/fees/feelist')
  }

  const getPending = () => {
    api_token
      .get(`payment/v1/student_fees/?page_size=3`)
      .then((res) => {
        if (res.data.data) {
          setPending(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <>
      <div className={styles.pendingFees}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "32px" }}>Pending Fees</span>
          <Button variant="outlined" onClick={() => RedirectFee()}>
            View All
          </Button>
        </div>
        <div style={{ marginTop: "15px" }}>

          {pending && pending.map((student, idx) => {
            return (
              <div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: '5px 0',
                  }}
                >
                  <div className={styles.imagesContainer}>
                    {(!!student?.user?.avatar) ? <img src={student?.user?.avatar} alt="images" className={styles.images} /> : <img src={pendings} alt="images" className={styles.images} />}

                  </div>
                  <div className={styles.font22} style={{ color: "#474646", marginLeft: "8px", minWidth: "40%", height: "auto" }} >{student?.user?.first_name + " " + student?.user?.last_name}</div>
                  <div className={styles.font22} style={{ color: "#474646", marginLeft: "8px" }}>{student?.user?.profile?.class_of_student?.title}</div>
                  <div className={styles.font22} style={{ color: "#216E91", marginLeft: "8px" }} >{student?.next_fee_amount}/-</div>
                </div>
                <div className={styles.divider}></div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DashboardPendingFee;

const pendingFeesStatic = [
  {
    id: "123AB84",
    first_name: "Yogin",
    last_name: "Patil",
    grade: "VII A",
    feesPending: "22,456",
  },
  {
    id: "123AB84",
    first_name: "Rocky",
    last_name: "Rawlo",
    grade: "VII A",
    feesPending: "22,456",
  },
  {
    id: "123AB84",
    first_name: "Prasad",
    last_name: "Tandel",
    grade: "VII A",
    feesPending: "22,456",
  },
  {
    id: "123AB84",
    first_name: "Sandesh",
    last_name: "Sakhare",
    grade: "VII A",
    feesPending: "22,456",
  },
  {
    id: "123AB84",
    first_name: "Abhijeet",
    last_name: "Patel",
    grade: "VII A",
    feesPending: "22,456",
  },
];
