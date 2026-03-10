import React, { useState, useContext, useEffect } from "react";
import styles from "./index.module.css";
import Physics from "../../Assets/ContentMangement/selection/physics.png";
import Chemistry from "../../Assets/ContentMangement/selection/chemistry.png";
import Maths from "../../Assets/ContentMangement/selection/maths.png";
import Biology from "../../Assets/ContentMangement/selection/biology.png";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import { useLocation, useNavigate } from "react-router-dom";
import { checkEmptyObject } from "../../Utils/Utils";
import { api_token } from "../../Utils/Network";

function ContentSubjectSelection() {
  const [boardColor, setSelectedColor] = useState("");
  const [courseColor, setSelectedcourseColor] = useState("");
  const [subjectSelect, setSubjectSelect] = useState("");
  const [courseList, setCourseList] = useState([]);
  let { state } = useLocation();
  const { boardList, gradeList, classList, subjectList, content_selection, setContent, urls } = useContext(UserCredsContext);
  const navigate = useNavigate();
  console.log(state, "ContentSubjectSelection");

  useEffect(() => {
    if (state) {
      // content_selection.board = state?.data?.chapter?.board?.id;
      // content_selection.subject = state?.data?.subject?.id;
      content_selection.grade = state?.data?.chapter?.grade?.id;
      setContent(content_selection)
      // navigate(`/dashboard/content/ppt`, { state: { board: state?.data?.chapter?.board?.id, subject: state?.data?.subject?.id, grade: state?.data?.chapter?.grade?.id } })
      navigate(`/dashboard/content/ppt/view`, { state: { grade: state?.data?.chapter?.grade?.id } })
    
    }
  }, [state])

  const selectBoard = (v) => {
    console.log("value", v);
    let value = v;
    content_selection.board = value;
    setContent(content_selection);
    setSelectedColor(value);
  };

  const selectSubject = (value) => {
    let data = value;
    content_selection.subject = data;
    setContent(content_selection)
    setSelectedColor(content_selection);
    setSubjectSelect(data);
    let datas = {
      board: content_selection?.board,
      subject: data,
      grade: content_selection?.grade,
    }

    let values = checkEmptyObject(datas)
    if(values){
      navigate(urls, {
        state: { board: content_selection?.board, subject: data, grade: content_selection?.grade },
      });
    }
  };

  const setCourse = (courseId) => {
    content_selection.course = courseId;
    setContent(content_selection);
    setSelectedColor(content_selection);
    console.log(urls, "0987hgggggf");

    var newUrl = '';
    if( urls.includes("ebooks") || urls.includes("test") || urls.includes("videos") || urls.includes("lesson-plan") || urls.includes("qa") || urls.includes("doityourself")){
      newUrl = urls;
      console.log(newUrl, "newurlscreate");
    }else if(urls.includes("ppt")){
      newUrl = '/dashboard/content/ppt/view'
      console.log(newUrl, "newurlscreate");
    }
    // if (urls.some(u => u.includes("ebooks") || u.includes("test") || u.includes("videos"))) {
    //   newUrl = urls
    //   console.log(newUrl, "newurlscreate");
    // } else if (urls.some(u => u.includes("ppt"))) {
    //   newUrl = '/dashboard/content/ppt/view';
    //   console.log(newUrl, "newurlscreate");
    // }
    console.log(newUrl, "newurlscreate");
      navigate(newUrl, {
        // state: { board: content_selection?.board, subject: subjectSelect, grade: gradeId },
        state: { grade: content_selection.grade, course: courseId },
      });
  }
 useEffect(() => {
  if(content_selection?.grade){
    SendToVideo(content_selection?.grade)
  }
 }, [content_selection?.grade])
  const SendToVideo = (gradeId) => {
    content_selection.grade = gradeId;
    setContent(content_selection);
    setSelectedColor(content_selection);
    console.log(boardColor, subjectSelect, gradeId, urls, "DDDDDDDDDDDDDDDDDDDDd")
    // navigate("/dashboard/content/videos/videoslist", {
    //   state: { board: boardColor, subject: subjectSelect, grade: gradeId },
    // });
    let data = {
      board: content_selection?.board,
      subject: subjectSelect,
      grade: gradeId,
    }

    api_token
    .get(`content/panel/course/?grade=${gradeId}`)
    .then((res) => {
      console.log(res.data.data, "DDDDddd")
      setCourseList(res.data.data);
    })
    .catch(err => console.log(err))

    // let value = checkEmptyObject(data)
    // if(!gradeId){
    //   navigate(urls, {
    //     // state: { board: content_selection?.board, subject: subjectSelect, grade: gradeId },
    //     state: { grade: gradeId },
    //   });
    // }
  };

  const canSave = checkEmptyObject(content_selection)
  console.log(content_selection, canSave, state, urls, "content_selection");
  return (
    <div>
      <div>
        {/* <p className={styles.fontData}>Board</p>
        <div className={`${styles.boardMain} ${styles.widthContainer}`} style={{ justifyContent: 'flex-start' }}>
          {boardList.map((v, i) => (
            <div
              key={v.id}
              className={`${styles.boardContainer} ${content_selection.board === v.id ? styles.boardContainerBg : ""
                }`}

              onClick={() => selectBoard(v.id)}
            >
              {" "}
              {v.title}
            </div>
          ))}
        </div> */}
        <div className={styles.boardMain} style={{ flexWrap: "nowrap" }}>
          {/* <div className={styles.boxSize} style={{ margin: "20px" }}>
            <p className={styles.fontData}>Select Subject</p>
            <div className={styles.boardMain}>
              {subjectList.map((v, i) => (
                <div
                  className={`${styles.subjectBox} ${content_selection.subject == v.id ? styles.scaleSub : ""
                    }`}
                  style={{
                    backgroundImage: `linear-gradient(to left, ${v.light_colour}, ${v.dark_colour})`,
                  }}
                  onClick={() => selectSubject(v.id)}
                >
                  <p style={{ margin: "10px" }}>{v.title}</p>
                  <img src={v.icon} className={styles.subjectCss} />
                </div>
              ))}
            </div>
          </div> */}
          <div className={styles.boxSize} style={{ margin: "20px" }}>
            <p className={styles.fontData}>Select Grade</p>
            <div className={styles.boxGradeList}>
              {gradeList?.map((v, i) => (
                <div
                  key={i}
                  className={`${styles.flexData} ${styles.gradeList} ${content_selection.grade === v.id ? styles.boardContainerBg : ""
                }`}
                  onClick={() => SendToVideo(v.id)}
                >
                  <div className={`${styles.flexData} `}>
                    <div
                      className={`${styles.gradeCircle}`}
                      style={{ backgroundColor: v.color }}
                    ></div>
                    <div>{v.title}</div>
                  </div>
                  <div>
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.boxSize} style={{ margin: "20px" }}>
            <p className={styles.fontData}>Select Course</p>
            <div className={styles.boxGradeList}>
              {(courseList.length > 0) ?  courseList.map((v, i) => (
                <div
                  key={i}
                  className={`${styles.flexData} ${styles.gradeList} ${content_selection.course === v.id ? styles.boardContainerBg : ""
                }`}
                  onClick={() => setCourse(v.id)}
                >
                  <div className={`${styles.flexData} `}>
                    <div
                      className={`${styles.gradeCircle}`}
                      style={{ backgroundColor: v.color }}
                    ></div>
                    <div>{v.title}</div>
                  </div>
                  <div>
                    <ArrowForwardIosIcon />
                  </div>
                </div>
              )):
              <p>No Courses</p>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContentSubjectSelection;

const values = [
  {
    id: 1,
    title: "Physics",
    icons: Physics,
    bgColor: "#C204FB",
    bgColor1: "#7900FF",
  },
  {
    id: 2,
    title: "Chemistry",
    icons: Chemistry,
    bgColor: "#4AB1F9",
    bgColor1: "#1877E5",
  },
  {
    id: 3,
    title: "Biology",
    icons: Biology,
    bgColor: "#FC6A71",
    bgColor1: "#F5377D",
  },
  {
    id: 4,
    title: "Maths",
    icons: Maths,
    bgColor: "#60D66B",
    bgColor1: "#45A735",
  },
  {
    id: 5,
    title: "Chemistry",
    icons: Chemistry,
    bgColor: "#4AB1F9",
    bgColor1: "#1877E5",
  },
  {
    id: 6,
    title: "Biology",
    icons: Biology,
    bgColor: "#FC6A71",
    bgColor1: "#F5377D",
  },
  {
    id: 7,
    title: "Maths",
    icons: Maths,
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
