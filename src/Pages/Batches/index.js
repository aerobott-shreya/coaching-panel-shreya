import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Dialog, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import moment from "moment";
import axios from "axios";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import styles from "./index.module.css";
import Sidebar from "../../Component/Sidebar";
import { api_call_token, base_url } from "../../Utils/Network";
import { UserCredsContext } from "../../ContextApi/UserCredContext/UserCredsContext";
import {
  BatchForm,
  LiveCourseListView,
  BatchListView,
  BatchSingleView,
  VariantOverview,
  VariantAttendanceView,
  VariantStudentView,
  StudentDetailsPopup,
} from "./Ui";

const colorOptions = [
  "#d581d6",
  "#d6819f",
  "#d68d8d",
  "#e59881",
  "#d6d678",
  "#95d681",
  "#81d6a1",
  "#81d6ce",
  "#81bad6",
  "#92b2d6",
];

const hrefArr = window.location.href.split("/");
const href = hrefArr[6]
  ? { vrntid: parseInt(hrefArr[6]), btchId: parseInt(hrefArr[5]) }
  : hrefArr[5]
  ? { btchId: parseInt(hrefArr[5]) }
  : {};

export default function Batches() {
  const { user, base_items } = useContext(UserCredsContext);
  const [loading, setLoading] = useState(true);
  const [instructorOptions, setInstructorOptions] = useState([]);
  const [liveCourseList, setLiveCourseList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [batchSelected, setBatchSelected] = useState({});
  const [batchEditEnabled, setBatchEditEnabled] = useState(false);
  const [batchData, setBatchData] = useState({});
  const [variantSelected, setVariantSelected] = useState({});
  const [variantEditEnabled, setVariantEditEnabled] = useState(false);
  const [variantData, setVariantData] = useState({});
  const [sidebarMenuSelected, setSidebarMenuSelected] = useState("Overview");
  const [studentList, setStudentList] = useState([]);
  const [studentSelected, setStudentSelected] = useState({});
  const [attendanceDates, setAttendanceDates] = useState([]);
  const [attendanceSelectedDate, setAttendanceSelectedDate] = useState("");
  const [attendanceMarkedList, setAttendanceMarkedList] = useState([]);
  const [addStudentPopup, setAddStudentPopup] = useState(false);
  const [msgType, setMsgType] = useState("warning");
  const [msg, setMsg] = useState("");
  const [nextPage, setNextPage] = useState(2);
  const observer = useRef();
  const history = useHistory();

  useEffect(() => window.scrollTo(0, 0), [
    batchSelected,
    variantSelected,
    sidebarMenuSelected,
  ]);

  useEffect(() => {
    getBatchList();
    getLiveCourseList();
    getInstructors();
    if (href.btchId) {
      if (href.vrntid) getVariantData(href.vrntid);
      getBatchData(href.btchId);
    } else history.push("/batches");
  }, []);

  useEffect(() => {
    if (batchSelected.id && variantSelected.id && variantSelected.id !== -1) {
      setSidebarMenuSelected("Overview");
      getStudents();
    } else setAttendanceMarkedList([]);
  }, [variantSelected, batchSelected]);

  const getLiveCourseList = () => {
    api_call_token
      .get(
        `/offline/panel/calendar/?day=${moment().format(
          "DD"
        )}&month=${moment().format("MM")}&year=${moment().format("YYYY")}`
      )
      .then((r) => setLiveCourseList(r.data.data))
      .catch((e) => console.log(e));
  };

  const lastItemRef = React.useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && nextPage) {
          getBatchList("", nextPage, batchList);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, nextPage]
  );

  const getBatchList = (keyword = "", page = 1, list = []) => {
    setBatchList(list);
    setLoading(true);
    api_call_token
      .get("/offline/panel/batch/", {
        params: { page: page, page_size: 5, q: keyword },
      })
      .then((response) => {
        setNextPage(response.data.next_page);
        setBatchList([...list, ...response.data.data]);
        setLoading(false);
      })
      .catch((error) => setLoading(false));
  };

  const getBatchData = (batchId = 0, remove = false) => {
    if (remove)
      api_call_token
        .delete(`/offline/panel/batch/${batchId}/`)
        .then((re) => console.log(re.data))
        .catch((e) => console.log(e));
    else
      api_call_token
        .get(`/offline/panel/batch/${batchId}/`)
        .then((re) => setBatchSelected(re.data.data))
        .catch((e) => console.log(e));
  };

  const getVariantData = (variantId = 0, remove = false) => {
    if (remove)
      api_call_token
        .delete(`/base/variable_product/${variantId}/`)
        .then((re) => {
          if (re.data.data === "Validity is Deleted") {
            setMsgType("success");
            setMsg("Variant deleted successfully");
            getBatchData(batchSelected.id);
          } else setMsg(re.data.data);
        })
        .catch((e) => console.log(e));
    else
      api_call_token
        .get(`/base/variable_product/${variantId}/`)
        .then((re) => setVariantSelected(re.data.data))
        .catch((e) => console.log(e));
  };

  const batchFormHandler = (payload = {}, type = 1) => {
    console.log(payload, "PP")
    if (type === 1) {
      payload = {
        ...payload,
        validity_data: [
          {
            ...payload.validity_data,
            start: moment(payload.validity_data.start).format("YYYY-MM-DD"),
            start_time: moment(payload.validity_data.commence).format(
              "HH:mm:ss"
            ),
            end: moment(payload.validity_data.end).format("YYYY-MM-DD"),
            end_time: moment(payload.validity_data.conclude).format("HH:mm:ss"),
            discount_type:
              payload.validity_data.discount_type === "Percentage" ? 1 : 2,
          },
        ],
      };
      api_call_token
        .post("/offline/panel/batch/", payload)
        .then((response) => getBatchList())
        .catch((e) => console.log(e));
      goToPath("/batches");
    } else if (type === 2) {
      payload = {
        id: payload.id,
        title: payload.title,
        category_id: [],
        session_id: batchData.session?.id,
        grade_id: batchData.grade?.id,
        board_id: batchData.board?.id,
        subject_id: [batchData.subject?.id],
        instructor_ids: [batchData.instructor?.id],
      };
      api_call_token
        .patch(`/offline/panel/batch/${payload.id}/`, payload)
        .then((response) => {
          setBatchSelected(response.data.data);
          setBatchData({});
          setBatchEditEnabled(false);
          getBatchList();
          getLiveCourseList();
        })
        .catch((e) => console.log(e));
    } else if (type === 3) {
      payload = {
        validity_data: [
          ...batchSelected.validity
            .filter((v) => v.id !== variantSelected.id)
            .map((v) => (v = { ...v, user: 1 })),
          {
            ...payload,
            user: 1,
            start: moment(payload.start).format("YYYY-MM-DD"),
            start_time: moment(payload.startTime).format("HH:mm:ss"),
            end: moment(payload.end).format("YYYY-MM-DD"),
            end_time: moment(payload.endTime).format("HH:mm:ss"),
          },
        ],
      };
      api_call_token
        .patch(`/offline/panel/batch/${batchSelected.id}/`, payload)
        .then((response) => {
          setBatchSelected(response.data.data);
          variantSelected.id > 0
            ? getVariantData(variantSelected.id)
            : setVariantSelected(response.data.data?.validity[0]);
          setVariantData({});
          setBatchSelected(response.data.data);
          setVariantEditEnabled(false);
          getBatchList();
          getLiveCourseList();
        })
        .catch((e) => console.log(e));
    }
  };

  const getStudents = () => {
    api_call_token
      .post(
        `/offline/panel/batch/${batchSelected.id}/get_students/?page=1&page_size=80`,
        { validity_id: variantSelected.id }
      )
      .then((response) => {
        setStudentList(response.data.data);
        getVariantSelectableDates();
      })
      .catch((error) => { });
  };

  const getVariantSelectableDates = () => {
    if (moment().isBetween(variantSelected.start, variantSelected.end)) {
      let selectableDates = [];
      let dateDiff = moment(variantSelected.start).diff(moment(), "days");
      for (let atndDate = 0; atndDate >= dateDiff; atndDate--) {
        const m = moment().add(atndDate, "days");
        if (variantSelected[m.format("dddd").toLowerCase()])
          selectableDates.push(m.format("dddDDYYYY-MM-DD"));
      }
      setAttendanceDates(selectableDates);
      setAttendanceSelectedDate(selectableDates[0]);
      getAttendance(selectableDates[0].slice(5));
    } else {
      setAttendanceDates([]);
      setAttendanceSelectedDate("");
    }
  };

  const getAttendance = (selectedDate = moment().format("YYYY-MM-DD")) => {
    api_call_token
      .get(
        `/offline/panel/attendance/?batch=${batchSelected.id}&validity=${variantSelected.id}&date=${selectedDate}`
      )
      .then((res) => {
        if (res.data.data?.length) {
          if (res.data.data.length === studentList.length)
            setAttendanceMarkedList([
              0,
              ...res.data.data.map((a) => (a = a.student?.id)),
            ]);
          else
            setAttendanceMarkedList(
              res.data.data.map((a) => (a = a.student?.id))
            );
        } else setAttendanceMarkedList([]);
      })
      .catch((e) => console.log(e));
  };

  const submitAttendance = (selectedDate = "") => {
    let arr = studentList.map(
      (stdnt) =>
        (stdnt = {
          student_id: stdnt.id,
          status: attendanceMarkedList.some((atndId) => stdnt.id === atndId),
          batch: batchSelected.id,
          validity: variantSelected.id,
          date: selectedDate,
        })
    );
    api_call_token
      .post("/offline/panel/attendance/", arr)
      .then(
        (res) => (
          setMsgType("success"), setMsg("Attendance Marked successfully")
        )
      )
      .catch((e) => console.log(e));
  };

  const getStudentAttendanceReport = (stdId = 0, month = moment().month()) => {
    if (stdId)
      api_call_token
        .post(
          "/offline/create_pdf/",
          {
            student_id: stdId,
            batch: batchSelected.id,
            validity: variantSelected.id,
            month: parseInt(month) + 1,
          },
          { responseType: "arraybuffer" }
        )
        .then((re) => {
          if (re.data.byteLength < 99) {
            setMsg("No student record found for this month.");
          } else {
            var file = new Blob([re["data"]], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          }
        })
        .catch((e) => console.log(e));
    else
      api_call_token
        .post(
          "/offline/teacher_create_pdf/",
          {
            batch: batchSelected.id,
            validity: variantSelected.id,
            month: parseInt(month) + 1,
          },
          { responseType: "arraybuffer" }
        )
        .then((re) => {
          if (re.data.Status) {
            setMsg(re.data.Status);
          } else {
            var file = new Blob([re["data"]], { type: "application/pdf" });
            var fileURL = URL.createObjectURL(file);
            window.open(fileURL);
          }
        })
        .catch((e) => console.log(e));
  };

  const addStudent = (importFile = false) => {
    if (importFile) {
      const _access_token = localStorage.getItem("network_access_token_inst");
      const fmData = new FormData();
      fmData.append("validity_id", variantSelected.id);
      fmData.append("file", importFile);
      axios
        .post(
          base_url +
            `/offline/panel/batch/${batchSelected.id}/add_students_excel/`,
          fmData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${_access_token}`,
            },
          }
        )
        .then((r) => {
          if (r.data.data.status) getStudents();
          else setMsg("Something went wrong !");
        })
        .catch((e) => console.log(e));
    } else
      api_call_token
        .get(`/auth/users/?phone=${studentSelected.phone}&user_type=1`)
        .then(
          (re) => re.data.data?.length && confirmAddStudent(re.data.data[0].id)
        )
        .catch((e) => console.log(e));
  };

  const confirmAddStudent = (studentId = 0) => {
    api_call_token
      .post(`offline/panel/batch/${batchSelected.id}/add_student/`, {
        students: [studentId],
        validity_id: variantSelected.id,
      })
      .then((re) => console.log(re.data))
      .catch((e) => console.log(e));
    api_call_token
      .post("offline/add_student_to_purchase/", {
        validity: variantSelected.id,
        user: studentId,
        course: batchSelected.id,
        payment_status: 2,
        payment_method: 4,
      })
      .then((re) => getStudents())
      .catch((e) => console.log(e));
  };

  const goLiveHandler = (id = batchSelected.id) => {
    api_call_token
      .get(`content/course/${id}/issue_token/`)
      .then((res) => {
        const redirectjitsi = res.data.data;
        if (res.status === 200) {
          api_call_token
            .post(`/content/meeting/participant/`, {
              user_type: 3,
              domain: redirectjitsi.domain,
              meeting_room: redirectjitsi.meeting_room,
              participant: "129",
            })
            .then((par_res) => {
              // console.log("jitsi post res ", par_res);
              window.open(redirectjitsi.url);
            });
        }
      });
  };

  const goToPath = (path = "") => history.push(path);

  const getInstructors = () => {
    api_call_token
      .get("/profile/instructor/")
      .then((response) => {
        setInstructorOptions(
          response.data.data.map(
            (i) =>
              (i = {
                id: i.id,
                title: `${i.first_name} ${i.last_name}`,
              })
          )
        );
      })
      .catch((error) => { });
  };

  const VariantView = (
    <>
      <Sidebar
        menuHeader="Variant"
        selectedMenu={sidebarMenuSelected}
        menuItems={["Overview", "Attendance", "Student"]}
        onChange={(v) =>
          variantEditEnabled
            ? setMsg("Please submit edited variant details first!")
            : setSidebarMenuSelected(v)
        }
      />
      {sidebarMenuSelected === "Overview" ? (
        <VariantOverview
          batchSelected={batchSelected}
          batchFormHandler={batchFormHandler}
          colorOptions={colorOptions}
          setVariantData={setVariantData}
          setVariantEditEnabled={setVariantEditEnabled}
          variantSelected={variantSelected}
          variantData={variantData}
          setVariantSelected={setVariantSelected}
          variantEditEnabled={variantEditEnabled}
          userType={user.user_type}
          goLiveHandler={goLiveHandler}
          goToPath={goToPath}
          goBack={() => (
            goToPath("/batches/" + batchSelected.id), setVariantSelected({})
          )}
        />
      ) : sidebarMenuSelected === "Attendance" ? (
        <VariantAttendanceView
          variantSelected={variantSelected}
          studentList={studentList}
          setStudentSelected={setStudentSelected}
          attendanceDates={attendanceDates}
          attendanceMarkedList={attendanceMarkedList}
          setAttendanceMarkedList={setAttendanceMarkedList}
          submitAttendance={submitAttendance}
          attendanceSelectedDate={attendanceSelectedDate}
          setAttendanceSelectedDate={setAttendanceSelectedDate}
          getAttendance={getAttendance}
          getStudentAttendanceReport={getStudentAttendanceReport}
          goBack={() => (
            goToPath("/batches/" + batchSelected.id), setVariantSelected({})
          )}
        />
      ) : (
        <VariantStudentView
          variantSelected={variantSelected}
          studentList={studentList}
          setStudentSelected={setStudentSelected}
          setAddStudentPopup={setAddStudentPopup}
          goBack={() => (
            goToPath("/batches/" + batchSelected.id), setVariantSelected({})
          )}
        />
      )}
    </>
  );

  return (
    <>
      <div style={{ display: "flex" }}>
        <Switch>
          <Route exact path="/batches/create">
            <BatchForm
              onDone={batchFormHandler}
              boardOptions={base_items.board}
              gradeOptions={base_items.grade}
              instructorOptions={instructorOptions}
              sessionOptions={base_items.session}
              subjectOptions={base_items.subject}
              validityOptions={base_items.validity_period}
              colorOptions={colorOptions}
              goToPath={goToPath}
            />
          </Route>
          <Route exact path="/batches/:batchId/:variantId">
            {VariantView}
          </Route>
          <Route exact path="/batches/:batchId">
            <BatchSingleView
              setSidebarMenuSelected={setSidebarMenuSelected}
              setVariantEditEnabled={setVariantEditEnabled}
              batchData={batchData}
              batchEditEnabled={batchEditEnabled}
              batchFormHandler={batchFormHandler}
              batchSelected={batchSelected}
              setBatchData={setBatchData}
              setBatchEditEnabled={setBatchEditEnabled}
              setBatchSelected={setBatchSelected}
              setVariantData={setVariantData}
              setVariantSelected={setVariantSelected}
              boardOptions={base_items.board}
              gradeOptions={base_items.grade}
              instructorOptions={instructorOptions}
              sessionOptions={base_items.session}
              subjectOptions={base_items.subject}
              userType={user.user_type}
              getVariantData={getVariantData}
              goToPath={goToPath}
            />
          </Route>
          <Route exact path="/batches">
            <div className={styles.mainBatchLiveContainer}>
              <LiveCourseListView
                styles={styles}
                liveCourseList={liveCourseList}
                setBatchSelected={setBatchSelected}
                setVariantSelected={setVariantSelected}
                getBatchData={getBatchData}
                goLiveHandler={goLiveHandler}
                goToPath={goToPath}
              />
              <BatchListView
                batchList={batchList}
                lastItemRef={lastItemRef}
                loading={loading}
                setBatchData={setBatchData}
                setBatchSelected={setBatchSelected}
                setBatchEditEnabled={setBatchEditEnabled}
                userType={user.user_type}
                goToPath={goToPath}
                getBatchList={getBatchList}
              />
            </div>
          </Route>
          <Route path="/">
            <Redirect to="/batches" />
          </Route>
        </Switch>
      </div>
      {/* <div style={{ display: "flex" }}>
        {!batchSelected.id && batchEditEnabled ? (
          <BatchForm
            onDone={batchFormHandler}
            boardOptions={base_items.board}
            gradeOptions={base_items.grade}
            instructorOptions={instructorOptions}
            sessionOptions={base_items.session}
            subjectOptions={base_items.subject}
            colorOptions={colorOptions}
          />
        ) : !batchSelected.id && !variantSelected.id ? (
          <div className={styles.mainBatchLiveContainer}>
            <LiveCourseListView
              styles={styles}
              liveCourseList={liveCourseList}
              setBatchSelected={setBatchSelected}
              setVariantSelected={setVariantSelected}
              getBatchData={getBatchData}
              goLiveHandler={goLiveHandler}
            />
            <BatchListView
              batchList={batchList}
              lastItemRef={lastItemRef}
              loading={loading}
              setBatchData={setBatchData}
              setBatchSelected={setBatchSelected}
              setBatchEditEnabled={setBatchEditEnabled}
              userType={user.user_type}
            />
          </div>
        ) : batchSelected.id && !variantSelected.id ? (
          <BatchSingleView
            setSidebarMenuSelected={setSidebarMenuSelected}
            setVariantEditEnabled={setVariantEditEnabled}
            batchData={batchData}
            batchEditEnabled={batchEditEnabled}
            batchFormHandler={batchFormHandler}
            batchSelected={batchSelected}
            setBatchData={setBatchData}
            setBatchEditEnabled={setBatchEditEnabled}
            setBatchSelected={setBatchSelected}
            setVariantData={setVariantData}
            setVariantSelected={setVariantSelected}
            boardOptions={base_items.board}
            gradeOptions={base_items.grade}
            instructorOptions={instructorOptions}
            sessionOptions={base_items.session}
            subjectOptions={base_items.subject}
            userType={user.user_type}
            getVariantData={getVariantData}
          />
        ) : (
          VariantView
        )}
      </div> */}
      {addStudentPopup && (
        <Dialog
          onClose={() => (setStudentSelected({}), setAddStudentPopup(false))}
          aria-labelledby="add student popup"
          open
          fullWidth
        >
          <div
            style={{ height: "max-content" }}
            className={styles.studentDetails}
          >
            <h2>Add Student</h2>
            <div style={{ margin: "20px 30%" }}>
              <TextField
                required
                label="Phone Number"
                name="student_phone"
                onChange={(e) => setStudentSelected({ phone: e.target.value })}
                value={studentSelected.phone}
                style={{ width: "100%" }}
              />
              <Button
                onClick={() => (addStudent(), setAddStudentPopup(false))}
                color="primary"
                variant="contained"
                style={{ margin: "20px 10%", width: "80%" }}
              >
                Add
              </Button>
              <h5 style={{ textAlign: "center", margin: "5px 0" }}>OR</h5>
              <Button
                color="primary"
                variant="contained"
                style={{ margin: "20px 10%", width: "80%" }}
                component="label"
              >
                Bulk Import
                <input
                  type="file"
                  hidden
                  onChange={(e) => (
                    addStudent(e.target.files[0]), setAddStudentPopup(false)
                  )}
                />
              </Button>
            </div>
          </div>
        </Dialog>
      )}
      {studentSelected.id && (
        <StudentDetailsPopup
          setStudentSelected={setStudentSelected}
          studentSelected={studentSelected}
          getStudentAttendanceReport={getStudentAttendanceReport}
        />
      )}
      {msg && (
        <Snackbar open autoHideDuration={3000} onClose={() => setMsg("")}>
          <Alert severity={msg.includes("success") ? "success" : "warning"}>
            {msg}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}
