import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import CustomDialogBox from "../CustomDialogBox/CustomDialogBox";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { useContext } from "react";
import { green } from "@mui/material/colors";
// import AddStudentDrawer from "../AddStudentDrawer/AddStudentDrawer";
import StudentsDetailsDrawer from "./StudentsDetailsDrawer";
import OfflineResultPop from "../StudentTableOffline/OfflineResultPop";
import { TestEditDialogOffline } from "../StudentTableOffline/TestEditDialogOffline";
import { api_token } from "../../Utils/Network";

// import download from "downloadjs";
import DrawerComponent from "../DrawerComp/DrawerComp";
import { useState } from "react";
// import NewStudentDetailsDrawer from "./NewStudentDetailsDrawer";

const StudentsTable = ({ data, instituteListProps, ...props }) => {
  const { gradeList, instituteList } = useContext(UserCredsContext);
  const [openDrawerComponent, setOpenDrawerComponent] = useState(false);

  const [state, setState] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState({});
  const [extraInfoObject, setExtraInfoObject] = React.useState({});

  const [open, setOpen] = React.useState(false);

  // const handleOpenDrawer = ()=>{
  //   console.log("handle drawer");
  //   setOpen(true)

  // }
  const handleCareerCounsellingsMind = (userId) => {
    api_token
      // .get(`counseling/mindgraph/report/mind_grapher_report/?user_id=${userId}`)
      .get(`counseling/mindgraph/report2/mind_grapher_report_by_user?user_id=${userId}`)
      .then((response) => {
        console.log("pdfResponse", response);
        if (response.data.data.file) {
          window.open(response.data.data.file);
        } else {
          alert("Error! Report does not exist");
        }
        // window.open(response.data.data.pdf)
      })
      .catch((err) => {
        alert("Error! Report does not exist");
      });
  };

  const handleCareerCounselling = (userId, reportType) => {
    console.log("ReportType", reportType);

    if (reportType == false) {
      // call online api

      api_token
        .get(
          `counseling/career/report/career_counselling_report/?user_id=${userId}`
        )
        .then((response) => {
          console.log("ONLINECareerReport", response);
          if (response.data.data.file) {
            window.open(response.data.data.file);
          } else {
            alert("Error! Report does not exist");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Error! Report does not exist");
        });
    } else if (reportType == true) {
      api_token
        .get(
          `counseling/career/report/career_counselling_offline_report/?user_id=${userId}`
        )
        .then((response) => {
          console.log("OfflineResport", response);
          if (response.data.data.file) {
            window.open(response.data.data.file);
          } else {
            alert("Error! Report does not exist");
          }
        })
        .catch((err) => {
          alert("Error! Report does not exist");
        });
    }
    // api_token
    //   .get(
    //     `/counseling/career/report/career_counselling_report/?user_id=${userId}`
    //   )
    //   .then((response) => {
    //     console.log("pdfResponse", response);
    //     window.open(response.data.data.file);
    //     // window.open(response.data.data.pdf)
    //   })
    //   .catch((err) => {
    //     alert("Error! Report does not exist");
    //   });
  };

  const toggleDrawer = (anchor, open, student) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSelectedStudent(student);
    setExtraInfoObject(student.student_extra_info[0]);

    setState(open);
  };

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={3}></TableCell>
                <TableCell align="center" colSpan={2} sx={{
                        color: "#032c6b",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}>
                  Alphaguide
                </TableCell>
                <TableCell align="right" colSpan={2}></TableCell>
              </TableRow>
              <TableRow >
                {rowHead.map((item, i) => {
                  return (
                    <TableCell
                    align="center"
                      sx={{
                        color: "#032c6b",
                        fontSize: "18px",
                        fontWeight: "500",
                      }}
                    >
                      {item}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, i) => {
                console.log("ItemStudent", item);
                return (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      // onClick={() => setOpenDrawerComponent(true)}
                      // onClick={toggleDrawer("right", true, item)}
                      sx={{ cursor: "pointer" }}
                    >
                      {item?.user_detail?.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      // onClick={toggleDrawer("right", true, item)}
                      sx={{ cursor: "pointer" }}
                    >
                      {item?.user_detail?.first_name +
                        " " +
                        item?.user_detail?.last_name}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                      {item?.institute}

                      {
                        instituteList[
                          instituteList.findIndex(
                            (element) => element?.id == item?.institute
                          )
                        ]?.name
                      }
                    </TableCell> */}
                    <TableCell component="th" scope="row" align="center">
                      {/* {
                        gradeList[
                          gradeList.findIndex(
                            (element) => element.id == item.grade
                          )
                        ]?.title
                      } */}
                      {item?.grade}
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <div>
                        {item?.offline_aptitude_test_attempted == true ? (
                          <>
                            <div
                              style={{
                                display: "flex",
                                gap: "10px",
                                alignItems: "center",
                              }}
                            >
                              <TestEditDialogOffline
                                test_type="aptitude"
                                userId={item?.user_detail?.id}
                              />

                              <OfflineResultPop
                                type="aptitude"
                                id={item?.user_detail?.id}
                              />
                            </div>
                          </>
                        ) : (
                          <CustomDialogBox
                            type={1}
                            test={item.aptitude}
                            user={item}
                            disabled={
                              item.aptitude === "pending" ? true : false
                            }
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      {item?.offline_interest_test_attempted == true ? (
                        <>
                          <div style={{ display: "flex", gap: "10px" }}>
                            <TestEditDialogOffline
                              test_type="interest"
                              userId={item?.user_detail?.id}
                            />
                            <OfflineResultPop
                              type="interest"
                              id={item?.user_detail?.id}
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <CustomDialogBox
                            type={2}
                            test={item.interest}
                            user={item}
                            // color={item.interest ? "#000000" : "#118a8a"}
                            // backgroundColor={item.interest == true ? "#04b521" : ""}
                            disabled={item.interest == "pending" ? true : false}
                          />
                        </>
                      )}
                    </TableCell>
                    {/* <TableCell component="th" scope="row">
                      <CustomDialogBox
                        type={3}
                        test={item.academics}
                        user={item}
                        disabled={
                          item?.achievement === "pending" ? true : false
                        }
                      />
                    </TableCell> */}
                    <TableCell component="th" scope="row" align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "none", minWidth: "115px" }}
                        onClick={() =>
                          handleCareerCounselling(
                            item?.user_detail.id,
                            item?.offline_career_report
                          )
                        }
                      >
                        View Report
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row" align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "none", minWidth: "115px" }}
                        onClick={() =>
                          handleCareerCounsellingsMind(item.user_detail.id)
                        }
                      >
                        View Report
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <AddStudentDrawer open={open} /> */}
      <StudentsDetailsDrawer
        callbackFunction={toggleDrawer}
        state={state}
        setState={setState}
        selectedStudent={selectedStudent}
        extraInfoObject={extraInfoObject}
      />

      <DrawerComponent
        open={openDrawerComponent}
        anchor={"right"}
        onClose={() => setOpenDrawerComponent((prev) => !prev)}
      >
        {"Component"}
        {/* <NewStudentDetailsDrawer/> */}
      </DrawerComponent>
    </>
  );
};

export default StudentsTable;

const rowHead = [
  "Unique ID",
  "Student Name",
  // "School",
  "Class",
  "Aptitute",
  "Interest",
  // "Academics",
  "Counselling",
  "MindGrapher",
];
