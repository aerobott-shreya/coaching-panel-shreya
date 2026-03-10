import React, { useContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import { api_token } from '../../Utils/Network';
import TableComp from '../../Components/TableComp/TableComp';
import { DataGrid } from '@mui/x-data-grid';
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

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

function StudentsAssign() {
  const { state } = useLocation();
  const { userState } = useContext(UserCredsContext);
  const [dataModel, setDataModel] = useState([]);
  const [content, setContent] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [maxPage, setMaxPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [filterObj, setFilterObj] = useState({
    test_id: state?.courseId, // test is basically course
    grade: state?.grade,
    institute: userState?.institute?.id,
  });


  useEffect(() => {
    // getAssignStudents(state?.id, userState?.institute?.id);
    getProfile();
  }, [])


  const getAssignStudents = (grade, institute) => {
    api_token
      .get(`profile/v1/student/?grade=${grade}&institute=${institute}`)
      .then((res) => {
        console.log(res);
      })
      .catch(err => console.log(err))
  }

  const getProfile = (paramObj = { ...filterObj }, page = 1) => {
    // let pages = filterObj;

    api_token
      .get(`profile/v1/student/`, { params: { ...paramObj, page } })
      .then((res) => {
        let arr = [];
        let datas = res.data.data;
        datas.map((v, i) => {
          let val = {
            id: v.id,
            userID: v?.user?.id,
            // rollno: v.roll_number,
            name: `${v?.user?.first_name} ${v?.user?.last_name}`,
            email: v?.user?.email,
            // board: v?.board?.title || "",
            class: v?.grade?.title || "",
            is_purchased_course: v?.is_purchased_course,
            // grade: v?.grade?.title || "",
            // section: v?.section?.title,
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
          { field: 'id', headerName: 'Roll no', width: 100, sortable: false },
          // { field: 'rollno', headerName: 'Roll no', flex: 1 },
          { field: 'name', headerName: 'Name', flex: 1 },
          { field: 'email', headerName: 'Email', flex: 1 },
          // { field: 'board', headerName: 'Board', flex: 1 },
          { field: 'class', headerName: 'Class', flex: 1 },
          {
            field: "Actions",
            headerName: `Assigned Students`,
            flex: 1,
            renderCell: (params) => {
              const currentRow = params.row;

              const handleClick = (event) => {
                setIsChecked(event.target.checked);
                console.log(currentRow, "CCCCCCcc")
                let data = {};
                // if (event.target.checked) {
                //   data = {
                //     present_students: [currentRow?.id],
                //     absent_students: [],
                //     date: moment(values?.$d).format("YYYY-MM-DD"),
                //   };
                // } else {
                //   data = {
                //     present_students: [],
                //     absent_students: [currentRow?.id],
                //     date: moment(values?.$d).format("YYYY-MM-DD"),
                //   };
                // }

                api_token
                .post(`/offline/add_student_to_purchase/`, {
                  validity: 696,
                  user: currentRow.userID,
                  course: state?.courseId,
                  payment_status: 2,
                  payment_method: 4
                })
                .then((res) => {

                  getProfile(filterObj)
                }

                ).catch(err => console.log(err))

                  // api_token
                  // .post(`/offline/add_student_to_purchase/`, {
                  //     validity: 696,
                  //     user: currentRow.userID,
                  //     course: state?.courseId,
                  //     payment_status: 2,
                  //     payment_method: 4
                  // })
                  // .then((res) => {
                  //     if(res){
                  //         api_token
                  //         .post(`/offline/panel/batch/${state?.courseId}/add_student/`, {
                  //         students: [currentRow.userID],
                  //         validity_id: 696})
                  //         .then((res) => {
                  //             getProfile(filterObj)
                  //         }).catch(err => console.log(err))
                  //     }
                  // }).catch(err => console.log(err))

                  // api_token
                  //   .post(`/calendar/v1/attendance_by_school/`, data)
                  //   .then((res) => {
                  //     if (res.data.data) {
                  //     //   getStudent(pages);
                  //     //   getCountData();
                  //     }
                  //   })
                  //   .catch((err) => console.log(err));
                  // console.log(data, "currentPath");
                  // console.log(currentRow.id, event.target.checked, "currentPath");
                };
                return (
                  <>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>
                        {currentRow?.is_purchased_course ? (
                          <span style={{ color: "green" }}>A</span>
                        ) : (
                          <span style={{ color: "red" }}>NA</span>
                        )}
                      </Typography>
                      <AntSwitch
                        checked={currentRow?.is_purchased_course ? true : false}
                        onClick={(e) => handleClick(e)}
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    </Stack>
                  </>
                );
              },
            },
                ]);
      })
      .catch((err) => console.log(err));
  }

  const pageChange = (value) => {
    let obj = filterObj;
    obj.page = value;
    getProfile(obj);
  };

  console.log(dataModel, content, "GGGGGGGGGGG")
  return (
    <div>
      <h2>Assign Students</h2>

      {/* <DataGrid
                rows={dataModel}
                columns={content}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
            /> */}

      <TableComp rows={dataModel} columns={content} currentPage={currentPage} maxPage={maxPage} pageSize={pageSize} pageChange={pageChange} />

    </div>
  )
}

export default StudentsAssign