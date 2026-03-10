import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "./dialog.module.css";
// import TestBox from "../TestBox/TestBox";
import { useEffect } from "react";
import { ap, api_token } from "../../Utils/Network";
import { DataSaverOff } from "@mui/icons-material";
import TestEditDialogBox from "../TestEditDialogBox/TestEditDialogBox";

const CustomDialogBox = ({
  user,
  backgroundColor,
  color,
  test,
  type,
  disabled,
  ...props
}) => {
  let viewOverallDisable = false;

  const [aptitudeTest, setAptitudeTest] = React.useState([]);
  const [interestTest, setInterestTest] = React.useState([]);
  const [datas, setDatas] = React.useState({});

  const [open, setOpen] = React.useState(false);
  const [typeView, setTypeView] = React.useState("0");
  const [breakDown, setBreakDown] = React.useState([]);

  const openReport = (result) => {
    // fake pdf call
    // window.open(
    //   "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
    // );

    setDatas(result);
    setBreakDown(result.all_question_breakdown);
    setTypeView(4);
  };

  const handleClickOpen = (type) => {
    console.log("CHEcktype", type);
    if (type == 1) {
      api_token
        .get(
          `/test/result_view/overall/?test_type=aptitude&user=${user?.user_detail?.id}`
        )
        .then((response) => {
          console.log("overall", response);
          response.data.data.pdf
            ? window.open(response.data.data.pdf)
            : alert("Error in generation pdf");
        });
    } else if (type == 2) {
      api_token
      .get(
        `/test/result_view/overall/?test_type=interest&user=${user?.user_detail?.id}`
      )
      .then((response) => {
        console.log("overall", response);
        response.data.data.pdf
          ? window.open(response.data.data.pdf)
          : alert("Error in generation pdf");
      });
    } else if(type==3){
      api_token
      .get(
        `/test/result_view/overall/?test_type=achievement&user=${user?.user_detail?.id}`
      )
      .then((response) => {
        console.log("overall", response);
        response.data.data.pdf
          ? window.open(response.data.data.pdf)
          : alert("Error in generation pdf");
      });

    }
    // api_token
    //   .get(`/counseling/test_result/?user_id=${user?.user_detail?.id}`)
    //   .then((response) => {
    //     console.log("typeinBox", response.data);

    //     response.data.map((data) => {
    //       if (data.TestType === "aptitude") {
    //         setAptitudeTest(data.data);
    //       }
    //       if (data.TestType === "interest") {
    //         setInterestTest(data.data);
    //       }
    //     });

    //     setOpen(true);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleViewOverAllResult = (aptitude) => {
    api_token
      .get(
        `/test/result_view/overall/?test_type=${aptitude}&user=${user?.user_detail?.id}`
      )
      .then((response) => {
        console.log("overall", response);
        response.data.data.pdf
          ? window.open(response.data.data.pdf)
          : alert("Error in generation pdf");
      });
  };

  const handleClose = () => {
    setTypeView(0);
    setOpen(false);
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
                {user?.user_detail?.first_name +
                  " " +
                  user?.user_detail?.last_name}
              </span>
              <span style={{ marginLeft: "10px" }}>12/M</span>
            </div>
            <div>
              <span>
                {user?.school} | {user?.grade}
              </span>
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
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const typeAptitute = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        // sx={{
        //   "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
        //     minWidth: "70%",
        //   },

        // }}
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <div className={styles.font20}>
              <span>
                {user?.user_detail?.first_name +
                  " " +
                  user?.user_detail?.last_name}
              </span>
              <span style={{ marginLeft: "10px" }}>12/M</span>
            </div>
            <div>
              <span>
                {user?.school} | {user?.grade}
              </span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className={styles.divider}></div>

          {aptitudeTest &&
            aptitudeTest.map((test, i) => {
              return (
                <>
                  <div className={styles.testBox}>
                    <div className={styles.testFlex}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <span className={styles.font18}>
                            {test.test_name}
                          </span>
                        </div>

                        {test.test_started ? (
                          <>
                            <span>Test Taken On</span>
                            <span>{test.attempt_date}</span>
                          </>
                        ) : (
                          <>
                            <span>Test Not taken</span>
                          </>
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {/* <Button
                          size="small"
                          variant="outlined"
                          // onClick={() => openReport(test.view_result)}
                        >
                          Edit{" "}
                        </Button> */}

                        <TestEditDialogBox type={"apitude"} editTest={test} />
                        <Button
                          size="small"
                          variant="outlined"
                          onClick={() => openReport(test.view_result)}
                        >
                          View Report
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.divider}></div>
                </>
              );
            })}

          <div className={styles.divider}></div>
          {/* <TestBox />

          <div className={styles.divider}></div>
          <TestBox />
          <div className={styles.divider}></div> */}

          <div className={styles.testBox}>
            <div className={styles.testFlex}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <span className={styles.font18}>Overall Aptitute</span>
                </div>
              </div>
              <div>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleViewOverAllResult("aptitude")}
                >
                  View Overall Report
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const typeInterest = () => {
    return (
      // <Dialog
      //   open={open}
      //   onClose={handleClose}
      //   aria-labelledby="alert-dialog-title"
      //   aria-describedby="alert-dialog-description"
      //   sx={{
      //     "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
      //       minWidth: "650px",
      //     },
      //   }}
      // >
      //   <DialogTitle id="alert-dialog-title">
      //     <div>
      //       <div className={styles.font20}>
      //         <span>
      //           {user?.user_detail?.first_name +
      //             " " +
      //             user?.user_detail?.last_name}
      //         </span>
      //         <span style={{ marginLeft: "10px" }}>12/M</span>
      //       </div>
      //       <div>
      //         <span>
      //           {user?.school} | {user?.grade}
      //         </span>
      //       </div>
      //     </div>
      //   </DialogTitle>

      //   <DialogContent>
      //     <div className={styles.divider}></div>

      //     {test &&
      //       test.map((test, i) => {
      //         return (
      //           <>
      //             <div className={styles.testBox}>
      //               <div className={styles.testFlex}>
      //                 <div style={{ display: "flex", flexDirection: "column" }}>
      //                   <div>
      //                     <span className={styles.font18}>{test.title}</span>
      //                   </div>
      //                   <span>Test Taken On</span>
      //                   <span>4th December 2022, 5:32pm</span>
      //                 </div>
      //                 <div>
      //                   <Button size="small" variant="outlined">
      //                     View Report
      //                   </Button>
      //                 </div>
      //               </div>
      //             </div>

      //             <div className={styles.divider}></div>
      //           </>
      //         );
      //       })}

      //     <div className={styles.divider}></div>
      //     {/* <TestBox />

      //     <div className={styles.divider}></div>
      //     <TestBox />
      //     <div className={styles.divider}></div> */}

      //     <div className={styles.testBox}>
      //       <div className={styles.testFlex}>
      //         <div style={{ display: "flex", flexDirection: "column" }}>
      //           <div>
      //             <span className={styles.font18}>Overall Aptitute</span>
      //           </div>
      //         </div>
      //         <div>
      //           <Button size="small" variant="outlined">
      //             View Report
      //           </Button>
      //         </div>
      //       </div>
      //     </div>
      //   </DialogContent>
      //   <DialogActions>
      //     <Button onClick={handleClose} autoFocus>
      //       Close
      //     </Button>
      //   </DialogActions>
      // </Dialog>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // sx={{
        //   "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
        //     minWidth: "70%",
        //   },
        // }}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <div className={styles.font20}>
              <span>
                {user?.user_detail?.first_name +
                  " " +
                  user?.user_detail?.last_name}
              </span>
              <span style={{ marginLeft: "10px" }}>12/M</span>
            </div>
            <div>
              <span>
                {user?.school ? user?.school + "|" : ""} {user?.grade}
              </span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className={styles.divider}></div>

          {interestTest &&
            interestTest.map((test, i) => {
              if (test.test_started === false) {
                viewOverallDisable = true;
              }

              return (
                <>
                  <div className={styles.testBox}>
                    <div className={styles.testFlex}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <span className={styles.font18}>
                            {test.test_name}
                          </span>
                        </div>

                        {test.test_started ? (
                          <>
                            <span>Test Taken On</span>
                            <span>{test.attempt_date}</span>
                          </>
                        ) : (
                          <>
                            <span>Test Not taken</span>
                          </>
                        )}
                      </div>
                      <div>
                        <Button
                          size="small"
                          variant="outlined"
                          disabled={test.test_started ? false : true}
                          onClick={() => openReport(test.view_result)}
                        >
                          View Report
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.divider}></div>
                </>
              );
            })}

          <div className={styles.divider}></div>
          {/* <TestBox />

        <div className={styles.divider}></div>
        <TestBox />
        <div className={styles.divider}></div> */}

          <div className={styles.testBox}>
            <div className={styles.testFlex}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <span className={styles.font18}>Overall Aptitute</span>
                </div>
              </div>
              <div>
                <Button
                  size="small"
                  variant="outlined"
                  disabled={viewOverallDisable}
                  onClick={() => handleViewOverAllResult("interest")}
                >
                  View Overall Report
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const typeAcademics = () => {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .css-1t1j96h-MuiPaper-root-MuiDialog-paper": {
            minWidth: "70%",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">
          <div>
            <div className={styles.font20}>
              <span>
                {user?.user_detail?.first_name +
                  " " +
                  user?.user_detail?.last_name}
              </span>
              <span style={{ marginLeft: "10px" }}>12/M</span>
            </div>
            <div>
              <span>
                {user?.school} | {user?.grade}
              </span>
            </div>
          </div>
        </DialogTitle>

        <DialogContent>
          <div className={styles.divider}></div>

          {test &&
            test.map((test, i) => {
              return (
                <>
                  <div className={styles.testBox}>
                    <div className={styles.testFlex}>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <div>
                          <span className={styles.font18}>{test.title}</span>
                        </div>
                        <span>Test Taken On</span>
                        <span>4th December 2022, 5:32pm</span>
                      </div>
                      <div>
                        <Button size="small" variant="outlined">
                          View Report
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className={styles.divider}></div>
                </>
              );
            })}

          <div className={styles.divider}></div>
          {/* <TestBox />

          <div className={styles.divider}></div>
          <TestBox />
          <div className={styles.divider}></div> */}

          <div className={styles.testBox}>
            <div className={styles.testFlex}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div>
                  <span className={styles.font18}>Overall Aptitute</span>
                </div>
              </div>
              <div>
                <Button size="small" variant="outlined">
                  View Report
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  useEffect(() => {
    setTypeView("0");
  }, []);

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        sx={{
          textTransform: "none",
          minWidth: "115px",
          backgroundColor: `${
            test === "complete"
              ? "#03AC13 "
              : test === "partially completed"
              ? "#f4c330"
              : ""
          }`,
          color: "#000000",
        }}
        disabled={disabled}
        onClick={() => handleClickOpen(type)}
      >
        View Report
      </Button>

      {/* {type == 1 && typeAptitute()} */}
      {type == 2 && typeInterest()}
      {/* {type == 3 && typeAcademics()}
      {typeView == 4 && viewResult()} */}
    </div>
  );
};

export default CustomDialogBox;

// api_token
// .get(`/counseling/overall_result/?user_id=${id}&test_type=${testtype}`)
