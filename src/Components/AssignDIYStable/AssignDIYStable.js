import React, { useContext, useEffect, useState } from "react";
import { api_token, base_url } from "../../Utils/Network";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { useLocation } from "react-router-dom";
import TableComp from "../TableComp/TableComp";
import dwIcon from "../../Assets/dwIcon.png";
import formEdit from "../../Assets/formEdit.png";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@material-ui/core/Typography";
import styles from "./index.module.css";
import { Button, TextField } from "@mui/material";

function AssignDIYStable({testId}) {
    const { userState, content_selection } = useContext(UserCredsContext);
    const { state } = useLocation();
    const [profile, setProfile] = useState("Student");
    const [dataModel, setDataModel] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [maxPage, setMaxPage] = useState(0);
    const [content, setContent] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterObj, setFilterObj] = useState({
      // courseId: content_selection.course, // test is basically course
      // grade: content_selection.grade,
      // institute: userState?.institute?.id,
    });
  
    const [openPaperChecker, setOpnePaperChecker] = useState(false);
    const [onestudentData, setOneStudentData] = useState();
    const [marks, setMarks] = useState([]);
  
    useEffect(() => {
      // getAssignStudents(state?.id, userState?.institute?.id);
      setFilterObj({});
      getProfile();
    }, [testId]);
  
    const getProfile = (paramObj = { ...filterObj }) => {
      api_token
        .get(
          `profile/v1/student/?grade=${content_selection.grade}&course_id=${content_selection.course}&test=${testId}`,
          { params: { ...paramObj } }
        )
        .then((res) => {
          let arr = [];
          let datas = res.data.data;
          datas.map((v, i) => {
            let val = {
              id: v.id,
              userID: v?.user?.id,
              test_id: v?.selfdoit_answer[0]?.id,
              // rollno: v.roll_number,
              name: `${v?.user?.first_name} ${v?.user?.last_name}`,
              test: v?.selfdoit_answer[0]?.test,
              // board: v?.board?.title || "",
              class: v?.grade?.title || "",
              is_purchased_course: v?.is_purchased_course,
              // grade: v?.grade?.title || "",
              // section: v?.section?.title,
              // downloadSubmission: dwIcon,
  
              // edit:    formEdit,
              score: `${v?.selfdoit_answer[0]?.marks_obtained || 0}  / ${
                v?.selfdoit_answer[0]?.test?.total_marks || 0
              } `,
              checkingStatus: v?.selfdoit_answer[0]?.checking_status,
              examStatus: v?.selfdoit_answer[0]?.is_submited || "pending",
              file: v?.selfdoit_answer[0]?.answer_file,
            };
            arr.push(val);
          });
  
          if (res.data.max_pages) {
            setMaxPage(res.data.max_pages);
          }
  
          if (res.data.page) {
            setCurrentPage(res.data.page);
          }
          if (res.data.count) {
            setPageSize(res.data.count);
          }
  
          setDataModel(arr);
          setContent([
            {
              field: "id",
              headerName: "Roll no",
              width: 100,
              sortable: false,
              headerClassName: styles.tableHeader,
            },
            // { field: 'rollno', headerName: 'Roll no', flex: 1 },
            {
              field: "name",
              headerName: "Name",
              flex: 1,
              headerClassName: styles.tableHeader,
            },
            {
              field: "score",
              headerName: "Score",
              flex: 1,
              headerClassName: styles.tableHeader,
            },
            // { field: 'board', headerName: 'Board', flex: 1 },
            {
              field: "checkingStatus",
              headerName: "Checking Status",
              headerClassName: styles.tableHeader,
              flex: 1,
              renderCell: (params) => {
                let color = "black"; // default color
                if (params.value === false) {
                  return <span className={styles.done}>Done</span>;
                } else if (params.value === "Pending") {
                  <span className={styles.pending}>Pending</span>;
                } else if (params.value === true) {
                  return (
                    <span
                      onClick={() => handalepassdata(params)}
                      className={styles.check}
                    >
                      Check Now
                    </span>
                  );
                }
                // return <span className={`${styles}`} style={{ color }}>{params.value}</span>;
              },
            },
            {
              field: "examStatus",
              headerName: "Exam Status",
              flex: 1,
              headerClassName: styles.tableHeader,
              renderCell: (params) => {
                console.log(params, "renderCell");
                let color = "black"; // default color
                if (params.value === true) {
                  return <span className={styles.Submitted}>Submitted</span>;
                } else if (params.value === false || " ") {
                  return <span className={styles.not}>Not Submitted</span>;
                }
              },
            },
            {
              field: "downloadSubmission ",
              headerName: "Download Submission ",
              flex: 1,
              headerClassName: styles.tableHeader,
              renderCell: (params) => {
                // console.log(params, "handleDownloadefile");
                return (
                  <div onClick={() => handleDownloadefile(params)}>
                    <img src={dwIcon} />{" "}
                  </div>
                );
              },
            },
            // { field: 'edit', headerName: 'Edit', flex: 1 ,renderCell: (params) => { return(<img src={formEdit} />)} },
          ]);
        })
  
        .catch((err) => console.log(err));
    };
  
    const handalepassdata = (data) => {
      console.log(data?.row?.test?.questions, "handalepassdata");
      setOneStudentData(data?.row);
      setOpnePaperChecker(true);
    };
  
    // const handleDownloadefile = (f) => {
    //   console.log(f, "handleDownloadefile");
    //   // window.open(f.row.file, "_blank")
    //   if (f?.row?.file === undefined) return;
    //   try {
    //     // debugger;
    //     // const response = await axios.get(base_urlf?.row?.file);
    //     const newbase = "https://prod-api.brainhap.com";
    //     const excelUrl = f?.row?.file;
    //     const link = document.createElement("a");
    //     link.href = newbase + excelUrl;
    //     link.setAttribute("download", `${Date.now()}.zip`);
    //     document.body.appendChild(link);
    //     link.click();
    //   } catch (error) {
    //     console.error("Error exporting the file", error);
    //   }
    // };
  
    const handleDownloadefile = (f) => {
      console.log(f, "handleDownloadefile");
    
      if (f?.row?.file === undefined) {
        console.error("Missing file URL. Cannot initiate download.");
        return alert(`File Not Submitted`); // Handle the error gracefully, e.g., display a user-friendly message
      }
    
      const fileUrl = f.row.file; // Extract the file URL
      const fileName = `${Date.now()}.${getFileExtension(fileUrl)}`; // Generate a unique filename with extension
    
      try {
        // Option 1: Leverage browser's built-in download functionality (preferred):
        const link = document.createElement("a");
        link.href = fileUrl;
        link.setAttribute("download", fileName);
        link.target = "_blank"; // Open the download in a new tab
    
        // Simulate a click to trigger the download (ensure element is detached first):
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    
      } catch (error) {
        console.error("Error initiating download:", error);
        // Handle other potential errors gracefully
    
      } finally {
        // Optional: Perform cleanup or post-download actions (e.g., remove temporary elements)
      }
    };
  
    function getFileExtension(url) {
      // Refined logic for robust extension extraction
      const parts = url.split('.');
      return parts.length > 1 ? parts[parts.length - 1] : "";
    }

    const pageChange = (value) => {
      // debugger;
      let obj = filterObj;
      obj.page = value;
      getProfile(obj);
    };
  
    const handledata = (id, data) => {
      console.log(id, data, "tablepapercheck");
      // setOneStudentData(data?.row);
      // setOpnePaperChecker(true);
    };
  
    const handleClosepaperChecker = () => {
      setOpnePaperChecker(false);
      setMarks([]);
    };
  
    const handelMarkinput = (e, id, data) => {
      const value = e.target.value;
      console.log(data, "handelMarkinput");
      // if (!isNaN(value)) {
      //   setMarks({
      //     ...marks,
      //     [id]: {
      //       student_answer:onestudentData?.test_id,
      //       question : data?.id,
      //       marks_obtained: +value,
      //     },
      //   });
      if (!isNaN(value) && value <= quest[id].maxMarks) {
        setMarks((prevMarks) => [
          ...prevMarks.filter((mark) => mark.question !== data?.id),
          {
            student_answer: onestudentData?.test_id,
            question: data?.id,
            marks_obtained: +value,
          },
        ]);
      }
    };
    const totalMaxMarks = quest.reduce((sum, q) => sum + q.maxMarks, 0);
    // const totalMarks = Object.values(marks?.marks_obtained).reduce((sum, mark) => sum + Number(mark), 0);
    // let totalMarks = marks.reduce((sum, mark) => sum + mark.marks_obtained, 0);
  
    // let totalMarks = 0;
  
    // for (let key in marks) {
    //     if (marks.hasOwnProperty(key)) {
    //         totalMarks += marks[key].marks_obtained;
    //     }
    // }
  
    let totalMarks = marks.reduce((sum, mark) => sum + mark.marks_obtained, 0);
  
    console.log("Total max marks:", totalMaxMarks);
    console.log("Total marks obtained:", totalMarks);
  
    // Helper function to get the marks obtained for a specific question
    const getMarkByQuestionId = (questionId) => {
      const mark = marks.find((mark) => mark.question === questionId);
      return mark ? mark.marks_obtained : "";
    };


    const validateMarks = () => {
        return onestudentData?.test?.questions.every((question) => {
          const mark = marks.find((mark) => mark.question === question.id);
          return mark && mark.marks_obtained !== "";
        });
      };
  
    console.log(marks, onestudentData?.test_id, "teachermarks");
    const handelSubmitMarks = () => {
        if (!validateMarks()) {
            alert("Please fill in all the marks fields before submitting.");
            return;
          }
      api_token
        .post(`content/selfdoitquestion-marks/`, marks)
        .then((res) => {
          console.log(res?.data);
          setOpnePaperChecker(false);
          setMarks([]);
          getProfile();
        })
        .catch((err) => {
          console.log(err);
        });
    };
  return (
    <>
      <div>
        <TableComp
          handledata={(id, data) => handledata(id, data)}
          rows={dataModel}
          columns={content}
          currentPage={currentPage}
          profile={profile}
          maxPage={maxPage}
          pageSize={pageSize}
          pageChange={pageChange}
        />
      </div>

      <Dialog
        open={openPaperChecker}
        onClose={handleClosepaperChecker}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
        maxWidth="lg"
      >
        <div className={styles.CloseBtn} onClick={handleClosepaperChecker}>
          <CloseIcon />
        </div>

        <div className={styles.studentinfo}>
          <div className={styles.detailsbox}>
            <p>
              Name :- <strong>{onestudentData?.name} </strong>
            </p>
            <p>
              Roll No :- <strong>{onestudentData?.id} </strong>
            </p>
            <p>
              Class :- <strong>{onestudentData?.class} </strong>
            </p>
            <p>
              Type :- <strong>Do it Yourself</strong>
            </p>
          </div>
          <div className={styles.marksbox}>
            <h3>Marks</h3>
            <h3>
              {totalMarks}/{onestudentData?.test?.total_marks}
            </h3>
          </div>
          <div className={styles.statusbox}>
            <h3>Checking Status</h3>
            <h3 className={styles.pending}>pending</h3>
          </div>
        </div>

        <div className={styles.markstable}>
          <table>
            <thead className={styles.heading}>
              <td>Question Number</td>
              <td>Total Marks</td>
              <td>Max Marks</td>
            </thead>
            {onestudentData?.test?.questions?.map((v, i) => {
              return (
                <tbody>
                  <td className={styles.questionbody}>
                    <div dangerouslySetInnerHTML={{ __html: v?.title }}></div>
                  </td>
                  <td className={styles.marksbody}>
                    <TextField
                      id="standard-basic"
                      // value={marks[i]?.marks_obtained || ""}
                      value={getMarkByQuestionId(v.id)}
                      variant="filled"
                      onChange={(e) => handelMarkinput(e, i, v)}
                      inputProps={{ max: v?.positive_marks }}
                    />{" "}
                  </td>
                  <td className={styles.qmarksbody}>{v?.positive_marks}</td>
                </tbody>
              );
            })}
            <tfoot>
              <td style={{ textAlign: "right" }}>Total Marks</td>
              <td style={{ textAlign: "center" }}>{totalMarks}</td>
              <td style={{ textAlign: "center" }}>
                {onestudentData?.test?.total_marks}
              </td>
            </tfoot>
          </table>
          <div className={styles.submitbuton}>
            <Button
              size="small"
              variant="contained"
              onClick={handelSubmitMarks}
              className={styles.finishbtn}
            >
              Finish Checking
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default AssignDIYStable


const quest = [
    {
      id: 1,
      quest: " What is your name?",
      maxMarks: 10,
    },
    {
      id: 1,
      quest: " What is your name?",
      maxMarks: 15,
    },
    {
      id: 1,
      quest: " What is your name?",
      maxMarks: 10,
    },
  ];
  