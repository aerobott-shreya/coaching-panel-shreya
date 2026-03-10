import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./offline.module.css";
// import TestBox from "../TestBox/TestBox";
import { useEffect } from "react";
import { api_token, token_api } from "../../Utils/Network";
import { DataSaverOff } from "@mui/icons-material";
// import TestEditDialogBox from "../TestEditDialogBox/TestEditDialogBox";
import viewIcon from "../../Assets/viewR.png";

const OfflineResultPop = ({ type, id, ...props }) => {
  const [view, setView] = React.useState(false);
  const [datas, setDatas] = React.useState({});
  const [breakDown, setBreakDown] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [offlinePdf, setOfflinePdf] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenOfflinePdf = () => {
    console.log("pdddf", offlinePdf);
    if (offlinePdf == null) {
      alert("Pdf not available");
    }
    else{
      window.open(offlinePdf)
    }
  };

  const handleClickOpen = (type, id) => {
    console.log("qwerww", type, id);
    api_token
      .get(`/test/result_view/offline_overall/?test_type=${type}&user=${id}`)
      .then((response) => {
        console.log("offlineOverALlRe", response);
        setDatas(response.data.data);
        setBreakDown(response?.data?.data?.all_question_breakdown);
        setOfflinePdf(response?.data?.data?.pdf);
        setOpen(true);
        setView(true);
      })
      .catch((err) => {
        console.log(err);
        alert("Error in generation report.Please try again");
      });
  };

  const viewResult = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // sx={{
        //   "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
        //     minWidth: "75%",
        //   },
        // }}
        maxWidth="900px"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <div className={styles.font20}>
              <span>
                {/* {user?.user_detail?.first_name +
                    " " +
                    user?.user_detail?.last_name} */}
              </span>
              {/* <span style={{ marginLeft: "10px" }}>12/M</span> */}
            </div>
            <div>
              <span>{/* {user?.school} | {user?.grade} */}</span>
            </div>
            <div>
              <span>Parameter Score Result</span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className={styles.secondBox}>
            <div className={styles.viewResult_box}>
              <div style={{ paddingTop: "45px" }}>
                {/* <div className={styles.detailsfinalTitle}>
                  Hi {datas.full_name},<br /> Your parameters score result is
                  here.
                </div> */}
                {/* <div className={`${styles.detailsfinal} ${styles.small_fonts}`}>No. of Attempts: { datas?.no_of_attempts}</div> */}
                <p className={`${styles.detailsfinal} ${styles.small_fonts}`}>
                  {/* Total Questions: {datas?.total_questions} */}
                  {!datas.total_questions >= 0 &&
                    ` Total Questions: ${datas.total_questions}`}
                </p>

                {/* <p className={`${styles.detailsfinal} ${styles.small_fonts}`}>
                  {datas.correct_answers ?
                    `Correct Answers: ${datas.correct_answers}` :""}
                </p> */}
                <div className={`${styles.detailsfinal} ${styles.small_fonts}`}>
                  {/* Correct Answers: {datas?.correct_answers} */}
                  {!datas.correct_answers >= 0 &&
                    ` Correct Answers: ${datas.correct_answers}`}
                </div>

                <p className={`${styles.detailsfinal} ${styles.small_fonts}`}>
                  {/* Wrong Answers: {datas?.wrong_answers || datas?.no_of_attempts} */}
                  {datas.wrong_answers >= 0 &&
                    ` Wrong Answers: ${datas.wrong_answers}`}
                </p>

                <p className={`${styles.detailsfinal} ${styles.small_fonts}`}>
                  {/* Unattempted Questions: {datas?.unattempted_questions} */}
                  {datas.unattempted_questions >= 0 &&
                    ` Unattempted Questions:  ${datas.unattempted_questions}`}
                </p>

                <p className={`${styles.detailsfinal} ${styles.small_fonts}`}>
                  {/* Average Time Spent per Question: {datas?.avg_time} sec */}
                  {datas.avg_time >= 0 &&
                    `Average Time Spent per Question:  ${datas.avg_time}`}
                </p>

                <p className={`${styles.detailsfinal} ${styles.small_fonts}`}>
                  {/* Total Time Spent: {datas?.total_time} */}
                  {datas.total_time >= 0 &&
                    `Total Time Spent: ${datas.total_time}`}
                </p>
              </div>

              <div>
                {breakDown &&
                  breakDown.map((data, idx) => (
                    <div key={idx} className={styles.res_break}>
                      {data.category_percent_range === null ? (
                        <></>
                      ) : (
                        <div className={styles.res_break_sub}>
                          <p>{data?.breakdown} </p>
                          <p>
                            {data?.category_percent_range?.title}{" "}
                            {data?.percent + "%"}
                          </p>
                        </div>
                      )}
                      <div className={styles.result_bar}>
                        {data.category_percent_range === null ? (
                          <></>
                        ) : (
                          <div
                            style={{
                              width: `${data?.percent}%`,
                              backgroundColor: `${data?.category_percent_range?.color}`,
                              height: "13px",
                              borderBottomLeftRadius: "12px",
                              borderTopLeftRadius: "12px",
                            }}
                          ></div>
                        )}
                        <div className={styles.show_percent}>
                          {/* {data?.category_percentage_breakdown.map(
                              (val, idx) => (
                                <div
                                  style={{
                                    width: `${val.percentage}%`,
                                    height: "13px",
                                    borderRight: "4px solid white",
                                  }}
                                ></div>
                              )
                            )} */}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* <div className={styles.divider}></div> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOpenOfflinePdf}>Download Report</Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <>
      <div>
        {/* <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            minWidth: "115px",
          }}
          onClick={() => handleClickOpen(type, id)}
        >
          View Report
        </Button> */}
        <img
          src={viewIcon}
          alt="view"
          width={20}
          onClick={() => handleClickOpen(type, id)}
          style={{ cursor: "pointer" }}
        />

        {view == true && viewResult()}
      </div>
    </>
  );
};

export default OfflineResultPop;
