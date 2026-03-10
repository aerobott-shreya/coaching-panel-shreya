import React, { useContext, useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ContentSubjectSelection from "../ContentSubjectSelection/ContentSubjectSelection";
import ContentAssignment from "../ContentAssignments/ContentAssignments";
import ContentVideos from "../ContentVideos/ContentVideos";
import ContentTest from "../ContentTest/ContentTest";
import ContentMindMap from "../ContentMindMap/ContentMindMap";
import ContentEbook from "../ContentEbook/ContentEbook";
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import { useNavigate, useLocation } from "react-router-dom";
import { checkEmptyObject } from "../../Utils/Utils";
import ContentAssignmentDashboard from "../ContentAssignmentDashboard/ContentAssignmentDashboard";
import ContentVideoDashboard from "../ContentVideoDashboard/ContentVideoDashboard";
import ContentTestDashboard from "../ContentTestDashboard/ContentTestDashboard";
import Contentppt from "../ContentPPT/Contentppt";
import styles from "./index.module.css";
import EditIcon from '@mui/icons-material/Edit';
import ContentQADashboard from "../ContentQADashboard/ContentQADashboard";
import ContentLessonPlans from "../ContentLessonPlans/ContentLessonPlans";
import { api_token } from "../../Utils/Network";
import ContentPPTRouter from "../ContentPPT/ContentPPTRouter";
import ContentDIYSDashboard from "../ContentDIYSDashboard/ContentDIYSDashboard";
// import ContentPPTRouter from "../ContentPPT/ContentPPTRouter";

function ContentManagement(props) {
  let location = useLocation();
  let navigate = useNavigate();
  const [courseList, setCourseList] = useState([]);
  console.log("locationinmgmt", location.state == null);
  const { boardList, gradeList, classList, subjectList, content_selection, setContent, userState, setUserState } = useContext(UserCredsContext);

  const checkConst = checkEmptyObject(content_selection);
  const [boardType, setBoardType] = useState({
    board: null,
    grdlist: null,
    subjectlist: null,
    courselist: null,
  });

  useEffect(() => {
    if(checkConst){
      let brd = boardList?.findIndex((vals) => {
        return vals.id == content_selection?.board
      } );
      let grdLst = gradeList?.findIndex((vals) => { return vals.id == content_selection?.grade});
      let sublist = subjectList?.findIndex((vals) => {return vals.id == content_selection?.course});
      let curlist = courseList?.findIndex((vals) => { return vals.id == content_selection?.course});
    
      setBoardType({
        board: brd,
        grdlist: grdLst,
        subjectlist: sublist,
        courselist: curlist,
      })
      }

  }, [checkConst]);
 
  const checkForSelection = () => {
    // content_selection.board = null;
    // content_selection.grade = null;
    // content_selection.subject = null;
    content_selection.course = null;

    setContent(content_selection);
    navigate(`/dashboard/content/select`)
  }
 
  const getCoureseforshow = () =>{
    api_token
    .get(`content/panel/course/`)
    .then((res) => {
      console.log(res.data.data, "DDDDddd")
      setCourseList(res.data.data);
    })
    .catch(err => console.log(err))
  }
  useEffect(() =>{
    getCoureseforshow()
  },[])
  
  console.log(courseList, content_selection,"content_selection_1")
  return (
    <>

    { checkConst ? 
        <div className={styles.content}>
          {/* <p className={styles.boards}>{boardList[boardType.board]?.title}</p> */}
          {/* <p className={styles.boards}>{gradeList[boardType.grdlist]?.title}</p> */}
          <p className={styles.boards}>{courseList[boardType.courselist]?.title}</p>
          <EditIcon className={styles.editIcon} onClick={() => checkForSelection()}/>
        </div> : <p style={{ fontSize:"25px" }} >Content Management</p>  }
     
      <Routes>
        {/* <Route exact strict path="yourroute" element={<YourPage />} /> */}

        {checkConst ? <>{
          components.map((v,i) => {
            return <Route exact strict path={v.url} element={<v.comp access={props}/>} />
          })
        }</>: <Route exact strict path="/select" element={<ContentSubjectSelection />} />
        }
      </Routes>
    </>
  );
}

export default ContentManagement;


const components = [{
  id: 1,
  url: "/videos/*",
  comp: ContentVideoDashboard
},
{
  id: 2,
  url: "/ppt/*",
  // comp: ContentAssignment
  // comp: Contentppt
  comp: ContentPPTRouter,
},
{
  id: 3,
  url: "/assignment/*",
  // comp: ContentAssignment
  comp: ContentAssignmentDashboard
},
{
  id: 4,
  url: "/test/*",
  comp: ContentTestDashboard
  // comp: ContentTest
},
{
  id: 5,
  url: "/mindmap",
  comp: ContentMindMap
},
{
  id: 6,
  url: "/ebooks",
  comp: ContentEbook
},
{
  id: 7,
  url: "/qa/*",
  comp: ContentQADashboard
},
{
  id: 8,
  url: "/doityourself/*",
  comp: ContentDIYSDashboard
},
{
  id: 6,
  url: "/lesson-plan",
  comp: ContentLessonPlans
},
];

const boardArray = [
  { id: 1, title: "ICSC" },
  { id: 2, title: "CBSC" },
  { id: 3, title: "International" },
];

const values = [
  {
    id: 1,
    title: "Physics",
    //   icons: Physics,
    bgColor: "#C204FB",
    bgColor1: "#7900FF",
  },
  {
    id: 2,
    title: "Chemistry",
    //   icons: Chemistry,
    bgColor: "#4AB1F9",
    bgColor1: "#1877E5",
  },
  {
    id: 3,
    title: "Biology",
    //   icons: Biology,
    bgColor: "#FC6A71",
    bgColor1: "#F5377D",
  },
  {
    id: 4,
    title: "Maths",
    //   icons: Maths,
    bgColor: "#60D66B",
    bgColor1: "#45A735",
  },
  {
    id: 5,
    title: "Chemistry",
    //   icons: Chemistry,
    bgColor: "#4AB1F9",
    bgColor1: "#1877E5",
  },
  {
    id: 6,
    title: "Biology",
    //   icons: Biology,
    bgColor: "#FC6A71",
    bgColor1: "#F5377D",
  },
  {
    id: 7,
    title: "Maths",
    //   icons: Maths,
    bgColor: "#60D66B",
    bgColor1: "#45A735",
  },
];

const gradeList = [
  {
    id: 1,
    title: "Grade VI",
    color: "#FB7D5B",
  },
  {
    id: 2,
    title: "Grade VII",
    color: "#FB7D5B",
  },
  {
    id: 1,
    title: "Grade VIII",
    color: "#4CBC9A",
  },
  {
    id: 1,
    title: "Grade IX",
    color: "#303972",
  },
  {
    id: 1,
    title: "Grade X",
    color: "#FCC43E",
  },
];
