import React, { useEffect, useState } from "react";
import { api_token } from "../../Utils/Network";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

function DashboardCourse() {
  let navigate = useNavigate();
  const [courseLists, setCourseList] = useState([]);
  const [paginationData, setPaginationData] = useState(1);
  const [pageState, setPageState] = useState(1);
  const { page, previous_page, max_pages, total_count, count } = paginationData;

  useEffect(() => {
    getCourseList();
  }, [pageState]);

  const getCourseList = () => [
    api_token
      .get(`/content/v1/course/listing?page=${pageState}`)
      .then((res) => {
        console.log(res);
        setCourseList(res.data.data);
        setPageState(res.data.page);
        setPaginationData(res.data);
      })
      .catch((err) => {
        console.log(err);
      }),
  ];

  const PassData = (v) => {
    navigate(`/dashboard/courses/assign`, {
      state: { grade: v.grade, courseId: v.id },
    });
  };

  console.log(courseLists, "CourseList");

  return (
    <div>
      <h2>Courses</h2>

      <div className={styles.mainBox}>
        {courseLists &&
          courseLists.map((v, i) => (
            <div className={styles.colorData} onClick={() => PassData(v)}>
              <div>{v?.title}</div>
              <div>{v?.student_count}</div>
            </div>
          ))}
      </div>
      <div style={{marginTop:"20px"}}>
        <Pagination
          count={max_pages}
          size="large"
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => setPageState(value)}
        />
      </div>
    </div>
  );
}

export default DashboardCourse;
