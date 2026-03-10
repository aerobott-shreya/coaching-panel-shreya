import React, { useContext, useEffect, useState } from "react";
import TableComp from "../../Components/TableComp/TableComp";
import { api_token } from "../../Utils/Network";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputField from "../../Components/Input/InputField";

import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import moment from 'moment';
import { MenuItem, Select } from "@mui/material";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: "flex",
  "&:active": {
    "& .MuiSwitch-thumb": {
      width: 15,
    },
    "& .MuiSwitch-switchBase.Mui-checked": {
      transform: "translateX(9px)",
    },
  },
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(12px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(["width"], {
      duration: 200,
    }),
  },
  "& .MuiSwitch-track": {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255,255,255,.35)"
        : "rgba(0,0,0,.25)",
    boxSizing: "border-box",
  },
}));

function StudentAttendance({ getCountData = () => { } }) {
  // var currentDate = new Date();
  const { classList } = useContext(UserCredsContext)
  const [content, setContent] = useState([]);
  const [dataModel, setDataModel] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const currentDate = new Date();
  const [values, setValues] = React.useState(currentDate);
  const [value, setValue] = React.useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [filterObj, setFilterObj] = useState({});


  useEffect(() => {
    let start = moment(value[0]?.$d).format("YYYY-MM-DD");
    let end = moment(value[1]?.$d).format("YYYY-MM-DD");

    let order = filterObj;
    order.from_date = start;
    order.to_date = end;
    getStudent(order);
  }, [value]);

  useEffect(() => {
    let order = filterObj;
    order.date = moment(values?.$df).format("YYYY-MM-DD");
    getStudent(order)
  }, [values])


  const pageChange = (value) => {
    let obj = filterObj;
    obj.page = value;
    getStudent(obj);
  };

  const getStudent = (paramObj = { ...filterObj }) => {
    let pages = filterObj;
    api_token
      .get(`/profile/v1/web_student_attendance_listing/`, { params: { ...paramObj } })
      .then((res) => {
        let arr = [];
        let datas = res.data.data;
        datas.map((v, i) => {
          let val = {
            id: v?.user?.id,
            name: `${v?.user?.first_name} ${v?.user?.last_name}`,
            class: v?.class_of_student,
            attendance: `${v?.overall_attendance} %`,
            isPresent: v?.is_present,
          };
          arr.push(val);
        });
        if (res.data.max_pages) {
          setMaxPage((prev) => res.data.max_pages);
        }
        if (res.data.page) {
          pages.page = res.data.page;
          setCurrentPage((prev) => res.data.page);
        }
        if (res.data.count) {
          setPageSize((prev) => res.data.count);
        }
        setDataModel(arr);
      })
      .catch((err) => console.log(err));

    setContent([
      { field: "id", headerName: "Roll No.", width: 100, sortable: false },
      { field: "name", headerName: "Name", flex: 1 },
      { field: "class", headerName: "Class", flex: 1 },
      {
        field: "Actions",
        headerName: `Today's Attendance`,
        flex: 1,
        renderCell: (params) => {
          const currentRow = params.row;

          const handleClick = (event) => {
            setIsChecked(event.target.checked);
            let data = {};
            if (event.target.checked) {
              data = {
                present_students: [currentRow?.id],
                absent_students: [],
                date: moment(values?.$d).format("YYYY-MM-DD"),
              };
            } else {
              data = {
                present_students: [],
                absent_students: [currentRow?.id],
                date: moment(values?.$d).format("YYYY-MM-DD"),
              };
            }

            api_token
              .post(`/calendar/v1/attendance_by_school/`, data)
              .then((res) => {
                if (res.data.data) {
                  getStudent(pages);
                  getCountData();
                }
              })
              .catch((err) => console.log(err));
            console.log(data, "currentPath");
            // console.log(currentRow.id, event.target.checked, "currentPath");
          };
          return (
            <>
              <Stack direction="row" spacing={1} alignItems="center">
                <Typography>
                  {currentRow?.isPresent ? (
                    <span style={{ color: "green" }}>P</span>
                  ) : (
                    <span style={{ color: "red" }}>A</span>
                  )}
                </Typography>
                <AntSwitch
                  checked={currentRow?.isPresent ? true : false}
                  onClick={(e) => handleClick(e)}
                  inputProps={{ "aria-label": "ant design" }}
                />
              </Stack>
            </>
          );
        },
      },
      { field: "attendance", headerName: "Overall Attendane", flex: 1 },
    ]);
  };

  // console.log(moment(values).format("YYYY-MM-DD"), "DATAS")

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <InputField
                label="Search By Name"
                onChange={(v) => {
                  let ord_id = v.target.value;
                  let obj = filterObj;
                  if (ord_id) {
                    obj.q = ord_id;
                    obj.page = 1;
                  }
                  else { delete obj.q; delete obj.page }
                  getStudent(obj);
                }}
                width="100%"
                size="md"
              />
            </Grid>
            <Grid item xs={6}>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Class"
                onChange={(v) => {
                  let ord_id = v.target.value;
                  let obj = filterObj;
                  if (ord_id) {
                    obj.class_of_student = ord_id;
                  }
                  else { delete obj.classes_id }
                  getStudent(obj);
                }}
                style={{ width: '50%' }}
              >
                {classList && classList.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
              </Select>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Select Date for Attendance"
                  value={values}
                  onChange={(newValue) => {
                    setValues(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} style={{width:'100%'}} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={5}>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                localeText={{ from_date: "From", end_date: "To" }}
              >
                <DateRangePicker
                  value={value}
                  onChange={(newValue) => {
                    setValue(prev => newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} />
                      <Box sx={{ mx: 2 }}> - </Box>
                      <TextField {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div>
        <TableComp
          rows={dataModel}
          columns={content}
          currentPage={currentPage}
          maxPage={maxPage}
          pageSize={pageSize}
          pageChange={pageChange}
        />
      </div>
    </div>
  );
}

export default StudentAttendance;
