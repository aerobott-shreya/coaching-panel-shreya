import React, { useContext, useEffect, useState } from "react";
import styles from "./index.module.css";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { api_open, api_token } from "../../Utils/Network";
import courseimg from "../../Assets/couresshow.png";
// import courseimg from "../../Assets/NewSubjectIcon/robotics icon.png"
import CustomPieChart from "../../Components/CustomPieChart/CustomPieChart";
import ReportCircularProgress from "../../Components/ReportCircularProgress/ReportCircularProgress";
import ReportProgress from "../../Components/ReportCircularProgress/ReportProgress";
import CustomSimpleBarChart from "../../Components/CustomSimpleBarChart/CustomSimpleBarChart";
import { useParams } from "react-router-dom";
// import ReportPage from"../../Components/CustomPieChart"

function ReportPage() {
  const { gradeList, subjectList, userState } = useContext(UserCredsContext);
  console.log(userState?.institute?.id, subjectList, "reportsubjectlist");
  //   const instituteID = userState?.institute?.id;
  const instituteID = userState?.institute?.id;
  const [courseList, setCourseList] = useState([]);
  const [courseActive, setCourseActive] = useState("");
  const [sectionActive, setSectionActive] = useState();
  const [mainData, setMainData] = useState();
  const [lowP, setLowP] = useState();
  const [avgP, setAvgP] = useState();
  const [highP, setHighP] = useState();
  const { id } = useParams();
  console.log(id, "getCourseList");

  const getCourseList = (cid) => {
    api_token
      // .get(`/content/v1/course/listing/`)
      .get(`content/panel/course/?grade=${cid}`)
      .then((res) => {
        setCourseList(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (id) {
      getCourseList(id);
    }
  }, [id]);

  const handelSelectCource = (c_id, s_id) => {
    // console.log(id, "cou21212");
    setCourseActive(c_id);
    setSectionActive(s_id);
    if (s_id && c_id) {
      api_open
        .get(
          `content/overoll/performance/?institute_id=${instituteID}&course_id=${c_id}&section_id=${s_id}`
        )
        .then((res) => {
          //   console.log(res?.data?.data?.sections, "cou21212");
          setMainData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });

      api_token
        .get(
          `content/v1/student/performers/?performers=1&institute_id=${instituteID}&course_id=${c_id}&section_id=${s_id}`
        )
        .then((res) => {
          console.log(res?.data?.data, "performers");
          setLowP(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
      api_token
        .get(
          `content/v1/student/performers/?performers=2&institute_id=${instituteID}&course_id=${c_id}&section_id=${s_id}`
        )
        .then((res) => {
          console.log(res?.data?.data, "performerssetAvgP");
          setAvgP(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
      api_token
        .get(
          `content/v1/student/performers/?performers=3&institute_id=${instituteID}&course_id=${c_id}&section_id=${s_id}`
        )
        .then((res) => {
          console.log(res?.data?.data, "performerssetHighP");
          setHighP(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (c_id) {
      api_open
        .get(
          `content/overoll/performance/?institute_id=${instituteID}&course_id=${c_id}`
        )
        .then((res) => {
          //   console.log(res?.data?.data?.sections, "cou21212");
          setMainData(res?.data?.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // console.log(mainData?.length , "newdtashdjshdgsdnjdfndnfc");

  //   const modifiedData = {
  //     mainData: Object.values(mainData?.class_performance?.data)
  // };

  // console.log(JSON.stringify(modifiedData, null, 2));
  return (
    <div>
      <div className={styles.courselistingcontainer}>
        {courseList?.map((v, i) => {
          return (
            <>
              <div
                key={i}
                onClick={() => handelSelectCource(v?.id)}
                className={`${styles.courseContainer} ${
                  courseActive == v?.id ? styles.courseSelect : ""
                }`}
              >
                <div className={styles.courseimgContainer}>
                  <img src={v?.icon ? v?.icon : courseimg} alt={v?.title} />
                </div>
                <h4>{v?.title}</h4>
              </div>
            </>
          );
        })}
      </div>
      <div className={styles.sectionListingContainer}>
        {/* {
            mainData?.
        } */}
        {mainData?.sections?.map((v, i) => {
          return (
            <>
              <div
                onClick={() => handelSelectCource(courseActive, v?.id)}
                className={`${styles.sectionContainer} ${
                  sectionActive == v?.id ? styles.sectionSelect : ""
                }`}
              >
                {v?.section}
              </div>
            </>
          );
        })}
      </div>
      {sectionActive ? (
        <>
          <div className={styles.perfSection}>
            <div className={`${styles.classPerformance}`}>
              <div className={styles.nameandLegend}>
                <h2>Overall Class Performance</h2>
                <div className={styles.Legend}>
                  <span className={styles.doit}>Do it yourself</span>
                  <span className={styles.mcq}>MCQs</span>
                  <span className={styles.worksheet}>Worksheet</span>
                </div>
              </div>
              <CustomSimpleBarChart val={mainData?.class_performance} />
            </div>
          </div>

          <div className={styles.donutsContainer}>
            <div className={`${styles.CurriculumPerformance} ${styles.leftside}`}>
              <h2>Overall Students Performance</h2>
              <div className={`${styles.overallprogress}`}>
                <ReportCircularProgress
                  variant="determinate"
                  // value={mainData?.curriculum_programs_performance?.overall_avg}
                  value={mainData?.overall_student_performance?.weighted_avg}
                />
              </div>
            </div>
            <div className={`${styles.CurriculumPerformance} ${styles.rightside}`}>
              <h2>Overall Curriculum Progress</h2>
              <div className={styles.curriculum}>
                <div className={`${styles.subjectProgress}`}>
                  {mainData?.curriculum_programs_performance?.chapters?.map(
                    (v) => {
                      return (
                        <div className={`${styles.difflevelwiseProgress}`}>
                          <div className={`${styles.showprogresstext}`}>
                            <h3>{v?.chapter}</h3>
                            <h3>{v?.avg}%</h3>
                          </div>
                          <ReportProgress
                            variant="determinate"
                            value={
                              // mainData?.overall_student_performance
                              //   ?.percentage_hard
                              v?.avg
                            }
                          />
                        </div>
                      );
                    }
                  )}
                </div>
                <div className={`${styles.overallprogress}`}>
                  <ReportCircularProgress
                    variant="determinate"
                    value={
                      mainData?.curriculum_programs_performance?.overall_avg
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          {/* <div className={styles.performanceSection}>
            <div className={styles.studentPerformance}>
              <h2>Overall Students Performance</h2>
              <div className={`${styles.overallprogress}`}>
                <ReportCircularProgress
                  variant="determinate"
                  value={mainData?.curriculum_programs_performance?.overall_avg}
                />
              </div>
              <div className={`${styles.difflevelwiseProgress}`}>
                <div className={`${styles.showprogresstext}`}>
                  <h3>Easy</h3>
                  <h3>
                    {mainData?.overall_student_performance?.percentage_easy}%
                  </h3>
                </div>
                <ReportProgress
                  variant="determinate"
                  value={mainData?.overall_student_performance?.percentage_easy}
                />
              </div>
              <div className={`${styles.difflevelwiseProgress}`}>
                <div className={`${styles.showprogresstext}`}>
                  <h3>Medium</h3>
                  <h3>
                    {mainData?.overall_student_performance?.percentage_medium}%
                  </h3>
                </div>
                <ReportProgress
                  variant="determinate"
                  value={
                    mainData?.overall_student_performance?.percentage_medium
                  }
                />
              </div>
              <div className={`${styles.difflevelwiseProgress}`}>
                <div className={`${styles.showprogresstext}`}>
                  <h3>Hard</h3>
                  <h3>
                    {mainData?.overall_student_performance?.percentage_hard}%
                  </h3>
                </div>
                <ReportProgress
                  variant="determinate"
                  value={mainData?.overall_student_performance?.percentage_hard}
                />
              </div>
            </div>

            <div className={styles.overAllperformance}>
              <div className={`${styles.classPerformance}`}>
                <h2>Over All Class Performance</h2>
                <CustomSimpleBarChart val={mainData?.class_performance} />
              </div>
              <div className={`${styles.curriculumPrograms}`}>
                <h2>Curriculum Programs</h2>
                <div className={`${styles.curriculumProgramsInner}`}>
                  <div className={`${styles.overallprogress}`}>
                    <ReportCircularProgress
                      variant="determinate"
                      value={
                        mainData?.overall_student_performance?.weighted_avg
                      }
                    />
                  </div>
                  <div className={`${styles.subjectProgress}`}>
                    {mainData?.curriculum_programs_performance?.chapters?.map(
                      (v) => {
                        return (
                          <div className={`${styles.difflevelwiseProgress}`}>
                            <div className={`${styles.showprogresstext}`}>
                              <h3>{v?.chapter}</h3>
                              <h3>{v?.avg}%</h3>
                            </div>
                            <ReportProgress
                              variant="determinate"
                              value={
                                // mainData?.overall_student_performance
                                //   ?.percentage_hard
                                v?.avg
                              }
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>*/}
          <div>
            {/* hiiii */}
            {mainData?.class_performance?.data?.length}
            {mainData?.class_performance?.data?.length < 0 ? (
              <div>hello</div>
            ) : (
              ""
            )}
            {/* {
         mainData?.class_performance?.map((v,i)=>{
           return(
             <div>
             {v}
             </div>
           )
         })
       } */}
          </div>

          <div className={`${styles.StudentOrderConatainer}`}>
            <h2>Students order</h2>
            <div className={styles.tableContainer}>
              <div className={`${styles.mainTable} ${styles.gradianlow}`}>
                <h2>Low Performers</h2>
                <ul className={`${styles.mainListing}`}>
                  <li>
                    <div className={`${styles.numberShow}`}>Rollno.</div>
                    <div className={`${styles.nameShow}`}>Name</div>
                  </li>
                  {lowP?.map((v) => {
                    return (
                      <li>
                        <div className={`${styles.numberShow}`}>{v?.id}</div>
                        <div className={`${styles.nameShow}`}>{v?.name}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={`${styles.mainTable} ${styles.gradianavg}`}>
                <h2>Average Performers</h2>
                <ul className={`${styles.mainListing}`}>
                  <li>
                    <div className={`${styles.numberShow}`}>Rollno.</div>
                    <div className={`${styles.nameShow}`}>Name</div>
                  </li>
                  {avgP?.map((v) => {
                    return (
                      <li>
                        <div className={`${styles.numberShow}`}>{v?.id}</div>
                        <div className={`${styles.nameShow}`}>{v?.name}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className={`${styles.mainTable} ${styles.gradianhigh}`}>
                <h2>Higher Performers</h2>
                <ul className={`${styles.mainListing}`}>
                  <li>
                    <div className={`${styles.numberShow}`}>Rollno.</div>
                    <div className={`${styles.nameShow}`}>Name</div>
                  </li>
                  {highP?.map((v) => {
                    return (
                      <li>
                        <div className={`${styles.numberShow}`}>{v?.id}</div>
                        <div className={`${styles.nameShow}`}>{v?.name}</div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ReportPage;

const studentdta = [
  {
    id: 1,
    title: "abc",
  },
  {
    id: 2,
    title: "pqr",
  },
  {
    id: 3,
    title: "xyz",
  },
  {
    id: 4,
    title: "abc",
  },
  {
    id: 5,
    title: "pqr",
  },
];

{
  /* <div className={styles.performanceSection}>
            <div className={styles.studentPerformance}>
              <h2>Overall Students Performance</h2>
              <div className={`${styles.overallprogress}`}>
                <ReportCircularProgress
                  variant="determinate"
                  value={mainData?.curriculum_programs_performance?.overall_avg}
                />
              </div>
              <div className={`${styles.difflevelwiseProgress}`}>
                <div className={`${styles.showprogresstext}`}>
                  <h3>Easy</h3>
                  <h3>
                    {mainData?.overall_student_performance?.percentage_easy}%
                  </h3>
                </div>
                <ReportProgress
                  variant="determinate"
                  value={mainData?.overall_student_performance?.percentage_easy}
                />
              </div>
              <div className={`${styles.difflevelwiseProgress}`}>
                <div className={`${styles.showprogresstext}`}>
                  <h3>Medium</h3>
                  <h3>
                    {mainData?.overall_student_performance?.percentage_medium}%
                  </h3>
                </div>
                <ReportProgress
                  variant="determinate"
                  value={
                    mainData?.overall_student_performance?.percentage_medium
                  }
                />
              </div>
              <div className={`${styles.difflevelwiseProgress}`}>
                <div className={`${styles.showprogresstext}`}>
                  <h3>Hard</h3>
                  <h3>
                    {mainData?.overall_student_performance?.percentage_hard}%
                  </h3>
                </div>
                <ReportProgress
                  variant="determinate"
                  value={mainData?.overall_student_performance?.percentage_hard}
                />
              </div>
            </div>

            <div className={styles.overAllperformance}>
              <div className={`${styles.classPerformance}`}>
                <h2>Over All Class Performance</h2>
                <CustomSimpleBarChart val={mainData?.class_performance} />
              </div>
              <div className={`${styles.curriculumPrograms}`}>
                <h2>Curriculum Programs</h2>
                <div className={`${styles.curriculumProgramsInner}`}>
                  <div className={`${styles.overallprogress}`}>
                    <ReportCircularProgress
                      variant="determinate"
                      value={
                        mainData?.overall_student_performance?.weighted_avg
                      }
                    />
                  </div>
                  <div className={`${styles.subjectProgress}`}>
                    {mainData?.curriculum_programs_performance?.chapters?.map(
                      (v) => {
                        return (
                          <div className={`${styles.difflevelwiseProgress}`}>
                            <div className={`${styles.showprogresstext}`}>
                              <h3>{v?.chapter}</h3>
                              <h3>{v?.avg}%</h3>
                            </div>
                            <ReportProgress
                              variant="determinate"
                              value={
                                // mainData?.overall_student_performance
                                //   ?.percentage_hard
                                v?.avg
                              }
                            />
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div> */
}
