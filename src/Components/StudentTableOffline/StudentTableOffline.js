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
import StudentsDetailsDrawer from "../StudentsTable/StudentsDetailsDrawer";
import { TestEditDialogOffline } from "./TestEditDialogOffline";
import { ap, api_token } from "../../Utils/Network";
import OfflineResultPop from "./OfflineResultPop";

const StudentsTableOffline = ({ data, instituteListProps, ...props }) => {
  const { gradeList, instituteList } = useContext(UserCredsContext);
  console.log("ggggg", instituteList);
  console.log("dataA", data);
  const [state, setState] = React.useState(false);
  const [selectedStudent, setSelectedStudent] = React.useState({});

  const [open, setOpen] = React.useState(false);

  const handleCareerCounselling = (userId) => {
    api_token
      .get(
        `/counseling/career/report/career_counselling_report/?user_id=${userId}`
      )
      .then((response) => {
        console.log("pdfResponse", response);
        window.open(response.data.data.file);
        // window.open(response.data.data.pdf)
      })
      .catch((err) => {
        alert("Error! Report does not exist");
      });
  };

  const toggleDrawer = (anchor, open, student) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setSelectedStudent(student);

    setState(open);
  };

  const editTestAptitude = () => {};

  console.log("selectedstudent", selectedStudent);

  return (
    <>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {rowHead.map((item, i) => {
                  return (
                    <TableCell
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
                console.log("GGGGGGoffline", item);
                return (
                  <TableRow
                    key={i}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={toggleDrawer("right", true, item)}
                      sx={{ cursor: "pointer" }}
                    >
                      {item?.user_detail?.id}
                    </TableCell>
                    <TableCell
                      component="th"
                      scope="row"
                      onClick={toggleDrawer("right", true, item)}
                      sx={{ cursor: "pointer" }}
                    >
                      {item?.user_detail?.first_name +
                        " " +
                        item?.user_detail?.last_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {item?.institute}

                      {/* {
                        instituteList[
                          instituteList.findIndex(
                            (element) => element?.id == item?.institute
                          )
                        ]?.name
                      } */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {/* {
                        gradeList[
                          gradeList.findIndex(
                            (element) => element.id == item.grade
                          )
                        ]?.title
                      } */}
                      {item?.grade}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        {item.offline_aptitude_test_attempted ? (
                          <>
                            {/* <Button
                              variant="outlined"
                              size="small"
                              onClick={editTestAptitude}
                            >
                              Edit

                            </Button> */}

                            <TestEditDialogOffline
                              test_type="aptitude"
                              userId={item?.user_detail?.id}
                            />
                            {/* <Button variant="outlined" size="small" onClick={()=>viewOfflineResult("aptitude" , item?.user_detail?.id)}>
                              Download
                            </Button> */}
                            <OfflineResultPop
                              type="aptitude"
                              id={item?.user_detail?.id}
                            />
                          </>
                        ) : (
                          "Test not given"
                        )}

                        {/* <CustomDialogBox
                          type={1}
                          test={item.aptitude}
                          user={item}
                         
                          disabled={item.aptitude === "pending" ? true : false}
                        /> */}
                      </div>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          gap: "10px",
                          justifyContent: "center",
                        }}
                      >
                        {item.offline_interest_test_attempted ? (
                          <>
                            {/* <Button
                              variant="outlined"
                              size="small"
                              onClick={editTestAptitude}
                            >
                              Edit

                            </Button> */}

                            <TestEditDialogOffline
                              test_type="interest"
                              userId={item?.user_detail?.id}
                            />
                            <OfflineResultPop
                              type="interest"
                              id={item?.user_detail?.id}
                            />
                          </>
                        ) : (
                          "Test not given"
                        )}
                      </div>

                      {/* <CustomDialogBox
                        type={2}
                        test={item.interest}
                        user={item}
                        // color={item.interest ? "#000000" : "#118a8a"}
                        // backgroundColor={item.interest == true ? "#04b521" : ""}
                        disabled={item.interest == "pending" ? true : false}
                      /> */}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <CustomDialogBox
                        type={3}
                        test={item.academics}
                        user={item}
                        disabled={item.academics ? false : true}
                      />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "none", minWidth: "115px" }}
                        onClick={() =>
                          handleCareerCounselling(item.user_detail.id)
                        }
                      >
                        View Report
                      </Button>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "none", minWidth: "115px" }}
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
        selectedStudent={selectedStudent}
      />
    </>
  );
};

export default StudentsTableOffline;

const rowHead = [
  "Unique ID",
  "Student Name",
  "School",
  "Class",
  "Aptitute",
  "Interest",
  "Academics",
  "Career Counselling",
  "Mindgraph",
];
