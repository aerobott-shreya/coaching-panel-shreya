import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import styles from "./drawer.module.css";
import InputField from "../Input/InputFields";
import { useEffect } from "react";
import {
  Button,
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
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { useContext } from "react";
import { token_api } from "../../Utils/Network";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

export default function AddStudentDrawer({ open, ...props }) {
  const { gradeList, instituteList } = useContext(UserCredsContext);
  // const [valueD, setValueD] = React.useState(dayjs(new Date()));
  const [valueD, setValueD] = React.useState(null);
  const [newDate, setNewDate] = React.useState("");
  
  const[sectionList, setSectionList] = React.useState()
  const [showField, setShowField] =React.useState(true);

  const [state, setState] = React.useState({
    right: false,
  });
  const [addStudentInfo, setAddStudentInfo] = React.useState({
    first_name: "",
    last_name: "",
    phone: "",
    title: "",
    age: "",
    grade: null,
    dob: null,
    gender: null,
    fathers_name: "",
    mother_name: "",
    occupation: "",
    section:null,
    mother_tongue: "",
    income: null,
    dream_career: "",
    parents_dream: "",
    a_concern: "",
    extra: "",
    relationship: null,
    institute:null,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    setState({ ...state, [anchor]: open });
    if (open == false) {
      setAddStudentInfo({});
    }
  };
  const handleDateChange = (e) => {
    var d = new Date(e);

    var dd = d.getDate();
    var mm = d.getMonth() + parseInt(1);
    var yyyy = d.getFullYear();
    setValueD(e);
    setNewDate(yyyy + "-" + mm + "-" + dd);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" && value.length > 10) {
      return;
    }

    setAddStudentInfo({
      ...addStudentInfo,
      [name]: value,
    });
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const data = {
      first_name: addStudentInfo?.first_name,
      last_name: addStudentInfo?.last_name,
      email: addStudentInfo?.email,
      phone: addStudentInfo?.phone,
      gender: addStudentInfo?.gender,
      profile: {
        title: addStudentInfo?.title,
        dob: newDate || null,
        grade_id: addStudentInfo?.grade ,
        institute: addStudentInfo?.institute ,
        section_id:addStudentInfo?.section || "",
      },
      guardian: [
        {
          relationship: 1,
          income: addStudentInfo?.income,
          occupation: addStudentInfo?.occupation,
          education: addStudentInfo?.education,
          father_name: addStudentInfo?.fathers_name,
          mother_tongue: addStudentInfo?.mother_tongue,
        },
      ],
      extra_information: {
        dream_career: addStudentInfo?.dream_career,
        area_of_concer: addStudentInfo?.a_concern,
        hobbies: addStudentInfo?.hobbies,
        likes: addStudentInfo?.likes,
        dislikes: addStudentInfo?.dislikes,
      },
    };

    console.log("addstudenthitapi", data);

    token_api
      .post(`/counseling/add/student/create_student/`, data)
      .then((response) => {
        if (response.data.data) {
          alert("Student Created Succesfully");
          setAddStudentInfo({});
          setState({ ...state, ["right"]: false });
          return;
        }
      })
      .catch((err) => {
        alert("Error!Please try again");
      });

  };

  const getSectionList = () => {
    token_api
    .get(`base/v1/section/?institute_id=${addStudentInfo?.institute}`)
    .then((res) => {
     
      let modifiedArray = res?.data.data?.map((item) => {
        return {
          id: item?.id,
          title: item?.title,
        };
       
      });
      if (addStudentInfo?.institute > 0){
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
  },[addStudentInfo?.institute])
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 550 }}
      role="presentation"
    >
      <div style={{ marginTop: "14%" }}>
        <div style={{ marginBottom: "2%" }}>
          <span style={{ padding: "15px", fontSize: "20px" }}>
            Add Students Details
          </span>
        </div>

        <form onSubmit={handleAddStudent}>
          <div className={styles.flexFields}>
            <InputField
              label="First Name"
              name="first_name"
              required
              onChange={handleChange}
              value={addStudentInfo.first_name}
            />
            <InputField
              label="Last Name"
              name="last_name"
              required
              onChange={handleChange}
            />
          </div>

          <div className={styles.flexFields}>
            <InputField
              label="Phone"
              name="phone"
              type="number"
              required
              onChange={handleChange}
              value={addStudentInfo.phone}
            />
            <InputField
              label="Title"
              name="title"
              required
              onChange={handleChange}
              value={addStudentInfo.title}
            />
          </div>
          <div className={styles.flexFields}>
            {/* <InputField label="Age" name="age" onChange={handleChange} /> */}
            <LocalizationProvider  dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label="DOB"
                defaultValue="DOB"
                inputFormat="MM/DD/YYYY"
                value={valueD}
                onChange={(e) => handleDateChange(e)}
                renderInput={(params) => (
                  <TextField size="small" sx={{width:"47.5%"}} name="dob" {...params} />
                )}
              />
            </LocalizationProvider>

            <div style={{ width: "48%" }}>
              <FormControl fullWidth required>
                <InputLabel  required size="small" id="demo-simple-select-label">
                  Grade
                </InputLabel>
                <Select
               
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={addStudentInfo.grade}
                  label="Grade"
                  name="grade"
                  onChange={(e) => handleChange(e, "userObject")}
                  style={{ width: "100%" }}
                  size="small"
                >
                  {gradeList.map((item, idx) => {
                    return (
                      <MenuItem value={item.id}>
                        {item.title}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
          </div>

          <div className={styles.flexFields}>
          <FormControl fullWidth required>
                <InputLabel size="small" id="demo-simple-select-label">
                Institute
                </InputLabel>
                <Select
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={addStudentInfo.institute}
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
          <FormControl fullWidth required disabled={showField}>
                <InputLabel size="small" id="demo-simple-select-label">
                Section
                </InputLabel>
                <Select
                  labelId="demo-simple-select-disabled-label"
                  id="demo-simple-select-disabled"
                  value={addStudentInfo.section}
                
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
              <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="gender"
                value={addStudentInfo.gender}
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

            {/* <div style={{ marginBottom: "10px" }} className={styles.divider}></div>

          <div style={{ marginLeft: "53px" }}>
            <InputField
              label="Father's Name"
              name="fathers_name"
              onChange={handleChange}
            />
          </div> */}
          </div>
          <div
            style={{ marginBottom: "10px" }}
            className={styles.divider}
          ></div>
          <div style={{ marginBottom: "2%" }}>
            <span style={{ padding: "15px", fontSize: "20px" }}>
              Guardian Details
            </span>
          </div>

          <div className={styles.flexFields}>
            <InputField
              label="Fathers Name"
              name="fathers_name"
              onChange={handleChange}
            />
            <InputField
              label="Father's Occupation"
              name="occupation"
              onChange={handleChange}
            />
          </div>

          <div className={styles.flexFields}>
            <InputField
              label="Mother tongue"
              name="mother_tongue"
              onChange={handleChange}
            />
            <InputField
              label="Parents Monthly Income"
              name="income"
              type="number"
              onChange={handleChange}
            />
          </div>

          <div
            style={{ marginBottom: "10px" }}
            className={styles.divider}
          ></div>

          <div style={{ marginBottom: "2%" }}>
            <span style={{ padding: "15px", fontSize: "20px" }}>
              Other Details
            </span>
          </div>

          {/* <div className={styles.flexFields}>
            <InputField label="Likes" name="likes" onChange={handleChange} />
            <InputField
              label="Dislikes"
              name="dislikes"
              onChange={handleChange}
            />
          </div>
          <div className={styles.flexFields}>
            <InputField
              label="Dream Career(Self)"
              name="dream_career"
              onChange={handleChange}
            />

            <InputField
              label="Hobbies"
              name="hobbies"
              onChange={handleChange}
            />
          </div>

          <div className={styles.flexFields}>
            <InputField
              label="Sibblings"
              name="siblings"
              onChange={handleChange}
            />

            <InputField
              label="Area of Concern"
              name="a_concern"
              onChange={handleChange}
            />
          </div> */}
          {/* <div className={styles.flexFields}>
            <InputField
              label="Extra Information"
              multiline={true}
              rows={3}
              name="extra"
              onChange={handleChange}
            />
          </div> */}
          <div className={styles.flexFields}>
            <InputField
              label="Strong Academic Subjects"
              name="strong"
              onChange={handleChange}
            />

            <InputField
              label="Weak Academic Subjects"
              name="weak"
              onChange={handleChange}
            />
          </div>


          <div className={styles.flexFields}>
            <InputField
              label="MG Dream Career"
              multiline={true}
              rows={3}
              name="dream_career"
              onChange={handleChange}
            />
          </div>

          <div className={styles.btnClasses}>
            {/* <Button variant='contained' >Add Test Details</Button>   */}
            <Button variant="contained" type="submit">
              Add Students
            </Button>
          </div>
        </form>
      </div>
    </Box>
  );

  useEffect(() => {
    setState({ ...state, ["right"]: open });
  }, [open]);

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            size="small"
            variant="contained"
            onClick={toggleDrawer(anchor, true)}
            sx={{ backgroundColor: "#ffffff", color: "#118a8a" }}
          >
            Add Student
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            // open={open}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
