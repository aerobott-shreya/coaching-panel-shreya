import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import dragIcon from "../../Assets/filedrag.png";
// import CustomSnackBar from "Components/CustomSnackBar/CustomSnackBar";

import InputField from "../Input/InputField";
import { useState, useEffect } from "react";
import styles from "./detail.module.css";
import TestEditDialog from "./TestEditDialog";
import {
  Autocomplete,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { EditReducer } from "./EditReducer";
import { useReducer } from "react";
import { api_open, api_token } from "../../Utils/Network";
import axios from "axios";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { useContext } from "react";
import { base_url } from "../../Utils/Network";
import { useRef } from "react";
import CustomSnackBar from "../CustomSnackBar/CustomSnackBar";

export default function StudentsDetailsDrawer({
  state,
  callbackFunction,
  selectedStudent,
  extraInfoObject,
  setState,

  ...props
}) {
  const { token_data } = useContext(UserCredsContext);
  const { gradeList, instituteList } = useContext(UserCredsContext);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const[sectionList, setSectionList] = React.useState()
  const [showField, setShowField] = React.useState(true);
  const fileInput = useRef(null);
  const [snackbarData, setSnackbarData] = React.useState({
    message: "",
    open: false,
    responseType: "",
  });

  const handleAddTestDetails = () => {
    setTestEditView(1);
  };
  const [subjectList, setSubjectList] = useState([]);
  // const [instituteList, setInstituteList] =useState([]);
  const [studentDetails, setStudentDetails] = useState({
    id: "",
    first_name: "",
    last_name: "",
    grade: "",
    phone: "",
    gender: null,
    title: "",
    institute:null,
    section:null,
  });

  console.log(studentDetails, gradeList, "student_detailsss");

  const [guardianDetails, setGuardianDetails] = useState({
    id: "",
    first_name: "",
    last_name: "",
    occupation: "",
    mother_tongue: "",
    income: "",
  });

  console.log(selectedStudent, "selectedStudent");

  const [extraInfo, setExtraInfo] = useState({
    likes: "",
    dislikes: "",
    hobbies: "",
    siblings: "",
    area_of_concern: "",
    dream_career: "",
    extra: "",
    weak: "",
    mind_dream_career: "",
    strong_academic_subjects: "",
  });

  const [mindgraphDetails, setMindGraphDetails] = useState({
    student_id: "",
    file_upload: "",
    subject_id: "",
    subMindAuto: null,
  });

  console.log("MindGraphdetails", mindgraphDetails);

  const [valueD, setValueD] = React.useState(dayjs("2014-08-18T21:11:54"));

  const [detailState, dispatch] = useReducer(EditReducer, initialState);

  const { first_name, last_name, phone, title, dob,institute } = detailState;

  const [addStudentInfo, setAddStudentInfo] = React.useState({
    first_name: "",
    last_name: "",
    phone: "",
    title: "",
    age: "",
    grade: null,
    dob: null,
    institute:"",
    section:"",
    gender: null,
    fathers_name: "",
    mother_name: "",
    occupation: "",
    mother_tongue: "",
    income: "",
    dream_career: "",
    parents_dream: "",
    a_concern: "",
    extra: "",
    relationship: null,
  });

  const [formErrors, setFormErrors] = useState({});

  const [testEditView, setTestEditView] = useState("0");

  const handleClearStates = () => {
    setFile(null);
    setFileName("");
    setMindGraphDetails({
      student_id: "",
      file_upload: "",
      subject_id: "",
    });
    setExtraInfo({
      likes: "",
      dislikes: "",
      hobbies: "",
      siblings: "",
      area_of_concern: "",
      dream_career: "",
      extra: "",
      weak: "",
      strong_academic_subjects: "",
    });

    setGuardianDetails({
      id: "",
      first_name: "",
      last_name: "",
      grade: "",
      phone: "",
      gender: null,
      title: "",
      income: "",
      occupation: "",
    });
    setFormErrors({});
  };

  const handleDateChange = (e) => {
    var d = new Date(e);

    var dd = d.getDate();
    var mm = d.getMonth() + parseInt(1);
    var yyyy = d.getFullYear();
    setValueD(e);

    dispatch({
      type: "field",
      fieldName: "dob",
      payload: yyyy + "-" + mm + "-" + dd,
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  //  console.log(selectedStudent?.student_details[0], "selectedStudent")
  const handleDrop = (e) => {
    e.preventDefault();

    if (e?.target?.files) {
      setFileName(e.target.files[0]);

      // file = e.target.files[0];
    } else if (e?.dataTransfer?.files) {
      setFileName(e.dataTransfer.files[0]);

      // file = e.dataTransfer.files[0];
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      setFile(reader.result);
    };
  };

  const handleClick = () => {
    fileInput.current.click();
  };

  const handleAutoComplete = (e, val) => {
    console.log("AUTOTOTO", val);
    setMindGraphDetails({
      ...mindgraphDetails,
      subject_id: val?.id,
      subMindAuto: val,
    });
  };

  const handleChangeExtra = (e) => {
    const { name, value } = e.target;

    setExtraInfo({
      ...extraInfo,
      [name]: value,
    });
  };
  const handleUpdateStudentDetails = () => {};

  const validateMind = () => {
    let errors = {
      error: false,
    };

    if (!fileName) {
      errors.file = "Upload a file.";
      errors.error = true;
    }

    if (!mindgraphDetails?.subject_id) {
      errors.subject_mind = "Select subject.";
      errors.error = true;
    }

    setFormErrors(errors);

    return errors;
  };

  const mindGrapherReport = () => {
    let valResult = validateMind();
    console.log("ValResults", valResult);

    const { error } = valResult;
    if (error) return;
    var formData = new FormData();

    formData.append("user_id", studentDetails?.id);
    formData.append("subject_id", mindgraphDetails?.subject_id);
    formData.append("file", fileName);

    axios({
      method: "post",
      url: `${base_url}counseling/mindgraph/report/mind_grapher/`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token_data.access}`,
      },
    })
      .then((response) => {
        console.log("MIndResponse", response);
        if (response?.status == 201) {
          // alert("File was uploaded successfully.");
          // handleClearStates();
          // setState(false);
          setSnackbarData({
            message: "Mindgraph details updated successfully",
            open: true,
            responseType: "success",
          });
          setFile(null);
          setFileName("");
          setMindGraphDetails({
            ...mindgraphDetails,
            student_id: "",
            file_upload: "",
            subject_id: "",
            subMindAuto: null,
          });
        }
      })
      .catch((err) => {
        // alert("Error in uploading file, please try again.");
        setSnackbarData({
          message: "Error while updating mindgraph details",
          open: true,
          responseType: "error",
        });
      });
    const timeOut = setTimeout(handleOpen, 3000);
    function handleOpen() {
      setSnackbarData({
        message: "",
        open: false,
        responseType: "success",
      });
    }
  };

  console.log(selectedStudent, "selectedStudenttttt");

  const handleExtraInfo = (e) => {
    e.preventDefault();

    let data = {
      user_id: studentDetails?.id,
      // user: {
      //   phone: studentDetails?.phone,
      // },
      extra_information: {
        likes: extraInfo?.likes,
        dislikes: extraInfo?.dislikes,
        dream_career: extraInfo?.dream_career,
        area_of_concern: extraInfo?.area_of_concern,
        hobbies: extraInfo?.hobbies,
        siblings: extraInfo?.siblings,
        strong_academic_subjects: extraInfo?.strong_academic_subjects,
        weak_academic_subjects: extraInfo?.weak,
        mind_dream_career: extraInfo?.mind_dream_career,
      },
    };
    console.log("extraaaaasss", data, extraInfo);

    api_token
      .post(
        `/counseling/add/student/update_student_profile/?user=${studentDetails?.id}`,
        data
      )
      .then((response) => {
        setSnackbarData({
          message: "Extra information updated successfully.",
          open: true,
          responseType: "success",
        });
      })
      .catch((err) => {
        setSnackbarData({
          message: "Error while updating extra information",
          open: true,
          responseType: "error",
        });
      });

    const timeOut = setTimeout(handleOpen, 3000);
    function handleOpen() {
      setSnackbarData({
        message: "",
        open: false,
        responseType: "success",
      });
    }
  };

  const handleChangePersonalDetails = (e) => {
    e.preventDefault();
    let student_id = studentDetails?.id;

    let data = {
      user_id: studentDetails?.id,
      user: {
        first_name: studentDetails?.first_name,
        last_name: studentDetails?.last_name,

        gender: studentDetails?.gender,
        phone: studentDetails?.phone,
      },
      profile: {
        dob: dob,
        grade_id: studentDetails?.grade,
        institute:studentDetails?.institute,
        section_id:studentDetails?.section
      },
    };

    console.log("Cheldatad", data);

    api_token
      .post(`counseling/add/student/update_student_profile/`, data)
      .then((response) => {
        console.log("ChekStudentsssss", response);
        setSnackbarData({
          message: "Personal details updated successfully.",
          open: true,
          responseType: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setSnackbarData({
          message: "Error while updating personal details",
          open: true,
          responseType: "error",
        });
      });
    const timeOut = setTimeout(handleOpen, 3000);
    function handleOpen() {
      setSnackbarData({
        message: "",
        open: false,
        responseType: "success",
      });
    }

    console.log(dob, "dobbb");
  };

  const handleChangeGuardianDetails = (e) => {
    e.preventDefault();
    let student_id = studentDetails?.id;
    let data = {
      user_id: student_id,
      guardian: [
        {
          id: guardianDetails?.id ? guardianDetails?.id : "",
          first_name: guardianDetails?.first_name,
          last_name: guardianDetails?.last_name,
          occupation: guardianDetails?.occupation,
          mother_tongue: guardianDetails?.mother_tongue,
          parents_monthly_income: guardianDetails?.income,
        },
      ],
    };

    console.log("GuardianDetailsDDDDDD", data);

    api_token
      .post(`counseling/add/student/update_student_profile/`, data)
      .then((response) => {
        console.log("ChekStudentsssss", response);
        setSnackbarData({
          message: "Guardian details updated successfully.",
          open: true,
          responseType: "success",
        });
      })
      .catch((err) => {
        console.log(err);
        setSnackbarData({
          message: "Error while updating guardian details",
          open: true,
          responseType: "error",
        });
      });

    const timeOut = setTimeout(handleOpen, 3000);
    function handleOpen() {
      setSnackbarData({
        message: "",
        open: false,
        responseType: "success",
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("qwqwqwqwqwqwqw", name, value);
    setStudentDetails({
      ...studentDetails,
      // first_name: e.target.value,
      // last_name : value,
      // phone : value
      [name]: value,
    });
    dispatch({
      type: "field",
      fieldName: name,
      payload: value,
    });
  };

  const handleChangeGuardian = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "name-value");
    setGuardianDetails({
      ...guardianDetails,
      // first_name: e.target.value,
      // last_name : value,
      // phone : value
      [name]: value,
    });
    dispatch({
      type: "field",
      fieldName: name,
      payload: value,
    });
  };

  const getSubjectList = () => {
    api_open
      .get("base/subject/")
      .then((response) => {
        let newArray = response.data.data.map((sub, index) => {
          return {
            id: sub?.id,
            label: sub?.title,
          };
        });

        setSubjectList(newArray);
      })
      .catch((error) => console.log(error));
  };

  // const getInstituteList = () => {
  //   api_token
  //   .get("base/institute/listing")
  //   .then((res) => {
  //       console.log(res?.data?.data, "getInstituteList");
  //       setInstituteList(res?.data?.data)
  //   })
  // }
  // useEffect(() =>{
  //   getInstituteList()
  // }, [])

  useEffect(() => {
    setValueD(selectedStudent?.dob);

    if (selectedStudent?.student_guardian) {
      setGuardianDetails({
        ...guardianDetails,
        id: selectedStudent?.student_guardian[0]?.id,
        first_name: selectedStudent?.student_guardian[0]?.first_name,
        last_name: selectedStudent?.student_guardian[0]?.last_name,
        occupation: selectedStudent?.student_guardian[0]?.occupation,
        mother_tongue: selectedStudent?.student_guardian[0]?.mother_tongue,
        income: selectedStudent?.student_guardian[0]?.parents_monthly_income,
      });
    }
    if (selectedStudent?.student_profile) {
      setStudentDetails({
        ...studentDetails,
        title: selectedStudent?.student_profile[0]?.title,
        id: selectedStudent?.user_detail?.id,
        first_name: selectedStudent?.user_detail?.first_name,
        last_name: selectedStudent?.user_detail?.last_name,
        phone: selectedStudent?.user_detail?.phone,
        // title: selectedStudent?.student_profile?.title,
        grade: selectedStudent?.student_profile[0]?.grade?.id,
        // grade: {
        //   id: selectedStudent?.student_profile[0]?.grade?.id,
        //   title: selectedStudent?.student_profile[0]?.grade?.title,
        // },
        gender: selectedStudent?.user_detail?.gender,
        institute: selectedStudent?.student_profile[0]?.institute,
        section: selectedStudent?.student_profile[0]?.section?.id,
        aptitude: selectedStudent?.aptitude,
        interest: selectedStudent?.interest,
        aptitude_offline: selectedStudent?.offline_aptitude_test_attempted,
        interest_offline: selectedStudent?.offline_interest_test_attempted,
      });
    }

    setExtraInfo({
      ...extraInfo,
      likes: extraInfoObject?.likes,
      dream_career: extraInfoObject?.dream_career,
      area_of_concern: extraInfoObject?.area_of_concern,
      mind_dream_career: extraInfoObject?.mind_dream_career,
      strong_academic_subjects: extraInfoObject?.strong_academic_subjects,
      weak: extraInfoObject?.weak_academic_subjects,
      dream_career: extraInfoObject?.dream_career,
    });
    getSubjectList();
  }, [selectedStudent]);

  console.log(guardianDetails, "guardianDetailsss");

  console.log("SelectEdStudetssd", studentDetails);
  const getSectionList = () => {
    api_token
    .get(`base/v1/section/?institute_id=${studentDetails?.institute}`)
    .then((res) => {
     
      let modifiedArray = res?.data.data?.map((item) => {
        return {
          id: item?.id,
          title: item?.title,
        };
       
      });
      if (studentDetails?.institute > 0){
        setShowField(false)
      }
      setSectionList([...modifiedArray])
    })
    .catch((err) =>{
      console.log(err);
    })
  }
  console.log(sectionList, "getSectionList");
  useEffect(() =>{
    getSectionList()
  },[studentDetails?.institute])

  const list = (anchor) => {
    return (
      <>
        <Box
          sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 550 }}
          role="presentation"
        >
          <div style={{ marginTop: "14%" }}>
            <div>
              <span className={styles.drawerHeading}>Students Details</span>
            </div>

            <form onSubmit={handleChangePersonalDetails}>
              <div style={{ marginTop: "10px" }} className={styles.flexFields}>
                <InputField
                  label="First Name"
                  value={first_name ? first_name : studentDetails?.first_name}
                  onChange={handleChange}
                  name="first_name"
                />
                <InputField
                  label="Last Name"
                  value={last_name ? last_name : studentDetails.last_name}
                  onChange={handleChange}
                  name="last_name"
                />
              </div>

              <div className={styles.flexFields}>
                <InputField
                  label="Phone"
                  name="phone"
                  type="number"
                  required
                  value={phone ? phone : studentDetails?.phone}
                  onChange={handleChange}
                />
                <InputField
                  label="Title"
                  name="title"
                  required
                  onChange={handleChange}
                  value={title ? title : studentDetails?.title}
                />
              </div>
              <div className={styles.flexFields}>
                {/* <InputField label="Age" name="age" onChange={handleChange} /> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="DOB"
                    inputFormat="MM/DD/YYYY"
                    value={valueD}
                    onChange={(e) => handleDateChange(e)}
                    renderInput={(params) => (
                      <TextField size="small" name="dob" {...params} />
                    )}
                  />
                </LocalizationProvider>

                <div></div>

                <div style={{ width: "48%" }}>
                  <FormControl fullWidth>
                    <InputLabel size="small" id="demo-simple-select-label">
                      Grade
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-disabled-label"
                      id="demo-simple-select-disabled"
                      value={studentDetails?.grade}
                      label="Grade"
                      name="grade"
                      onChange={(e) => handleChange(e, "userObject")}
                      style={{ width: "100%" }}
                      size="small"
                    >
                      {gradeList.map((item, idx) => {
                        return (
                          <MenuItem value={item?.id}>
                            <em>{item.title}</em>
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </div>
              </div>

              <div className={styles.flexFields}>
          <FormControl fullWidth>
                <InputLabel size="small" id="demo-simple-select-label">
                    Institute
                </InputLabel>
                <Select
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={studentDetails?.institute}
                  label="Institute"
                  name="institute"
                  onChange={(e) => handleChange(e, "userObject")}
                  style={{ width: "100%" }}
                  size="small"
                >
                  {instituteList.map((item, idx) => {
                    return (
                      <MenuItem value={item.id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
          </div>
          <div className={styles.flexFields}>
          <FormControl fullWidth disabled={showField}>
                <InputLabel size="small" id="demo-simple-select-label">
                Section
                </InputLabel>
                <Select
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={studentDetails.section}
                  label="Section"
                  name="section"
                  onChange={(e) => handleChange(e, "userObject")}
                  style={{ width: "100%" }}
                  size="small"
                >
                  {sectionList?.map((item, idx) => {
                    return (
                      <MenuItem value={item.id}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
          </div>

              <div className={styles.flexFields}>
                <FormControl>
                  <FormLabel id="demo-radio-buttons-group-label">
                    Gender
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="gender"
                    value={studentDetails?.gender}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    <FormControlLabel
                      value="2"
                      control={<Radio />}
                      label="Female"
                      onChange={(e) => handleChange(e, "userObject")}
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Male"
                      onChange={(e) => handleChange(e, "userObject")}
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className={`${styles.alignCenter}`}>
                <Button type="submit" size="small" variant="contained">
                  Update personal details
                </Button>
              </div>
            </form>

            <div
              style={{ marginBottom: "10px" }}
              className={styles.divider}
            ></div>
            <div style={{ marginBottom: "2%" }}>
              <span style={{ padding: "15px", fontSize: "20px" }}>
                Guardian Details
              </span>
            </div>

            <form onSubmit={handleChangeGuardianDetails}>
              <div className={styles.flexFields}>
                <InputField
                  label="First Name"
                  name="first_name"
                  value={guardianDetails?.first_name}
                  onChange={handleChangeGuardian}
                />
                <InputField
                  label="Last Name"
                  name="last_name"
                  value={guardianDetails?.last_name}
                  onChange={handleChangeGuardian}
                />
              </div>

              <div className={styles.flexFields}>
                <InputField
                  label="Mother tongue"
                  name="mother_tongue"
                  value={guardianDetails?.mother_tongue}
                  onChange={handleChangeGuardian}
                />
                <InputField
                  label="Parents Monthly Income"
                  name="income"
                  type="number"
                  value={guardianDetails?.income}
                  onChange={handleChangeGuardian}
                />
              </div>

              <div className={styles.flexFields}>
                <InputField
                  label="Father's Occupation"
                  name="occupation"
                  value={guardianDetails?.occupation}
                  onChange={handleChangeGuardian}
                />
              </div>
              <div className={`${styles.alignCenter}`}>
                <Button type="submit" variant="contained" size="small">
                  Update Guardian Details
                </Button>
              </div>
            </form>

            <div
              style={{ marginBottom: "10px" }}
              className={styles.divider}
            ></div>

            <div style={{ marginBottom: "2%" }}>
              <span style={{ padding: "15px", fontSize: "20px" }}>
                Other Details
              </span>
            </div>

            <form onSubmit={handleExtraInfo}>
              <div className={styles.flexFields}>
                <InputField
                  label="Strong Academic Subjects"
                  name="strong_academic_subjects"
                  value={extraInfo?.strong_academic_subjects}
                  onChange={handleChangeExtra}
                />
                <InputField
                  label="Weak Academic Subjects"
                  name="weak"
                  value={extraInfo?.weak}
                  onChange={handleChangeExtra}
                />
              </div>
              <div className={styles.flexFields}>
                <InputField
                  label="MG Dream Career"
                  multiline={true}
                  rows={3}
                  name="mind_dream_career"
                  value={extraInfo?.mind_dream_career}
                  onChange={handleChangeExtra}
                />
              </div>

              <div
                style={{ marginBottom: "10px" }}
                className={`${styles.alignCenter}`}
              >
                <Button type="submit" variant="contained" size="small">
                  Update Details
                </Button>
              </div>
            </form>

            <div
              style={{ marginBottom: "10px" }}
              className={styles.divider}
            ></div>
            <div style={{ marginBottom: "2%" }}>
              <span style={{ padding: "15px", fontSize: "20px" }}>
                Mindgraph Details
              </span>
            </div>

            <form>
              <div className={styles.flexFields}>
                <Autocomplete
                  value={mindgraphDetails?.subMindAuto}
                  disablePortal
                  id="combo-box-demo"
                  onChange={(event, newValue) => {
                    handleAutoComplete(event, newValue);
                  }}
                  options={subjectList}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Subjects"
                      error={formErrors.subject_mind}
                      helperText={formErrors.subject_mind}
                    />
                  )}
                />
              </div>
              <div style={{ margin: "20px" }}>
                <div>
                  <div>
                    {/* <DragDrop setBulkFile={setBulkFile} /> */}

                    {fileName && !file && (
                      <p
                        style={{
                          color: "green",
                          margin: "0 auto",
                          marginBottom: "10px",
                          width: "90%",
                        }}
                      >
                        File {fileName?.name} saved successfully. Please click
                        on upload.{" "}
                      </p>
                    )}

                    {fileName === "" && (
                      <div style={{ marginTop: "10px" }}>
                        <div
                          onDragOver={handleDragOver}
                          onDrop={handleDrop}
                          className={styles.dropBoxStyles}
                        >
                          <div
                            className={styles.flexStyleDropBox}
                            onClick={handleClick}
                          >
                            <p>
                              <img src={dragIcon} alt="dradanddrop" />
                            </p>

                            <p>Drag & Drop the Files or click here</p>

                            <input
                              ref={fileInput}
                              type="file"
                              // id="myfile"

                              // name="myfile"

                              onChange={handleDrop}
                              style={{ display: "none" }}
                            ></input>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* <small style={{ color: "#cc0000" }}>
                    {errorFlag ? "Excel files exeeds maximum limit" : ""}
                  </small> */}
                </div>
                {formErrors?.file && (
                  <small style={{ color: "#d32f2f" }}>{formErrors?.file}</small>
                )}
              </div>

              <div
                className={`${styles.alignCenter}`}
                onClick={mindGrapherReport}
              >
                <Button variant="contained" size="small">
                  Update Mindgraph Details{" "}
                </Button>
              </div>
            </form>

            <div
              style={{ marginBottom: "10px" }}
              className={styles.divider}
            ></div>

            <div>
              <span className={styles.drawerHeading}>Test Status - Online</span>
            </div>

            <div style={{ marginTop: "10px" }} className={styles.flexFields}>
              <InputField
                label="Aptitude"
                name="aptitude"
                value={studentDetails?.aptitude}
              />
              <InputField
                label="Interest"
                name="interest"
                value={studentDetails?.interest}
              />
            </div>

            <div>
              <span className={styles.drawerHeading}>
                Test Status - Oflline
              </span>
            </div>

            <div style={{ marginTop: "10px" }} className={styles.flexFields}>
              <InputField
                label="Aptitude"
                name="aptitude"
                value={
                  studentDetails?.aptitude_offline == true
                    ? "Completed"
                    : "Pending"
                }
              />
              <InputField
                label="Interest"
                name="interest"
                value={
                  studentDetails?.interest_offline == true
                    ? "Completed"
                    : "Pending"
                }
              />
            </div>

            <div className={styles.btnClasses}>
              <TestEditDialog userId={studentDetails?.id} />
              {/* <Button variant="contained" onClick={handleUpdateStudentDetails}>
                Update Student Details
              </Button> */}
            </div>
          </div>
        </Box>
      </>
    );
  };

  return (
    <>
      <div>
        {["right"].map((anchor) => (
          <React.Fragment key={anchor}>
            {/* <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button> */}
            <Drawer
              anchor={anchor}
              open={state}
              onClose={() => {
                handleClearStates();
                setState(false);
              }}
            >
              {selectedStudent && list(anchor, studentDetails)}
              {/* {testEditView == 1 && testEdit(anchor)} */}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
      <CustomSnackBar
        message={snackbarData.message}
        openSnack={snackbarData.open}
        severity={snackbarData.responseType}
      />
    </>
  );
}

const initialState = {
  first_name: "",
  last_name: "",
  phone: "",
  title: "",
  age: "",
  grade: null,
  dob: null,
  gender: null,
  fathers_name: "",
  // mother_name: "",
  occupation: "",
  mother_tongue: "",
  income: "",
  dream_career: "",
  parents_dream: "",
  a_concern: "",
  extra: "",
  relationship: null,
};
