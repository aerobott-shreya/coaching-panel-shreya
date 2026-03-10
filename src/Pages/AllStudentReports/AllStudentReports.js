import React from 'react'
import styles from "./index.module.css"
import CustomMultipleSelect from "../../Components/CustomMultipeSelect/CustomMultipleSelect";
import InputField from "../../Components/Input/InputField";
import StudentsTable from "../../Components/StudentsTable/StudentsTable";
// import styles from "./students.module.css";
import { api_token, open_api, token_api } from "../../Utils/Network";
import { useEffect, useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
} from "@mui/material";
import { UserCredsContext } from "../../ContextApi/UserCredsContext/UserCredsContext";
import { useContext } from "react";
// import AddStudentDrawer from "../../Components/AddStudentDrawer/AddStudentDrawer";
import InstituteMultipleSelect from "../../Components/InstituteMultipleSelect/InstituteMultipleSelect";
import StudentsTableOffline from "../../Components/StudentTableOffline/StudentTableOffline";
import DrawerComponent from "../../Components/DrawerComp/DrawerComp";

function AllStudentReports() {

    const { gradeList, userState } = useContext(UserCredsContext);
    const [openDrawerComponent, setOpenDrawerComponent] = useState(false);
  
    const [instituteList, setInstituteList] = useState([]);
  
    const [filterData, setFilterData] = useState({
      searchParam: "",
      grade: [],
      institute: [],
      test_mode: "",
      test_type: "",
    });
  
    const [listData, setlistData] = useState([]);
    const [paginationData, setPaginationData] = useState(1);
    const [pageState, setPageState] = useState(1);
    const [listMode, setListMode] = useState(3);
  
    console.log(gradeList , userState?.institute?.id,"contentmanegmentstudent");
    const handleFilter = (e, typeSelect) => {
      if (typeSelect === "grade") {
        return;
      }
      const { name, value } = e.target;
      setFilterData({ ...filterData, [name]: value });
      // if (name === "grade") {
      //   getStudentsList(filterData.searchParam, value, filterData.date);
      // }
    };
  
    useEffect(() => {
      getStudentsList(
        filterData.searchParam,
        filterData.grade,
        filterData.date,
        filterData.test_mode,
        filterData.test_type
      );
    }, [pageState]);
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        getStudentsList(
          filterData.searchParam,
          filterData.grade,
          filterData.institute,
          filterData.test_mode
        );
      }, 600);
  
      return () => clearTimeout(delayDebounceFn);
    }, [filterData.searchParam]);
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        getStudentsList(
          filterData.searchParam,
          filterData.grade,
          filterData.institute,
          filterData.test_mode,
          filterData.test_type
        );
      }, 600);
  
      return () => clearTimeout(delayDebounceFn);
    }, [filterData.test_type]);
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        getStudentsList(
          filterData.searchParam,
          filterData.grade,
          filterData.institute
        );
      }, 600);
  
      return () => clearTimeout(delayDebounceFn);
    }, [filterData.grade]);
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        getStudentsList(
          filterData.searchParam,
          filterData.grade,
          filterData.institute
        );
      }, 600);
  
      return () => clearTimeout(delayDebounceFn);
    }, [filterData.institute]);
  
    useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
        getStudentsList(
          filterData.searchParam,
          filterData.grade,
          filterData.institute,
          filterData.test_mode
        );
      }, 600);
  
      return () => clearTimeout(delayDebounceFn);
    }, [filterData.test_mode]);
  
    useEffect(() => {
        api_token
        .get(`/profile/institute/`)
        .then((response) => {
          setInstituteList(response.data.data);
        })
        .catch((err) => {});
    }, []);
  
    const handleChangeMode = (e) => {
      const { name, value } = e.target;
      setFilterData({
        ...filterData,
        [name]: value,
      });
      setListMode(value);
    };
  
    const callBackType = (type, id) => {
      if (type == "test_type") {
        setFilterData({
          ...filterData,
          [type]: id,
        });
  
        return;
      }
  
      if (type === "grade") {
        setFilterData({
          ...filterData,
          [type]: id,
        });
        return;
      }
  
      if (type === "institute") {
        setFilterData({
          ...filterData,
          [type]: id,
        });
        return;
      }
    };
  
    const getStudentsList = (
      _search,
      _grade,
      _institute,
      test_mode,
      _test_type
    ) => {
      var search = _search === undefined ? "" : _search;
      var url_param = "";
  
      if (test_mode) {
        if (test_mode == 3) {
          url_param = "";
        } else {
          url_param = `test_mode=${test_mode}`;
        }
      }
      if (_search) {
        url_param =
          url_param === ""
            ? `phone=${decodeURI(search)}`
            : `${url_param}&phone=${decodeURI(search)}`;
      }
      if (_grade.length !== 0) {
        url_param =
          url_param === "" ? `grade=${_grade}` : `${url_param}&grade=${_grade}`;
      }
      // if (_institute) {
      //   url_param =
      //     url_param === ""
      //       ? `institute=${_institute}`
      //       : `${url_param}&institute=${_institute}`;
      // }
      if (_test_type) {
        url_param =
          url_param === ""
            ? `test_type_submited=${_test_type}`
            : `${url_param}&test_type_submited=${_test_type}`;
      }
  
      if (search || _grade.length != 0 || test_mode || _test_type) {
        api_token
          .get(`/counseling/dashboard/student/p2/?institute=${userState?.institute?.id}&${url_param}&page=${pageState}`)
          .then((response) => {
            setlistData(response.data.data);
            setPageState(response.data.page);
            setPaginationData(response.data);
          })
          .catch((err) => {});
      } else {
        api_token
          .get(`/counseling/dashboard/student/p2/?institute=${userState?.institute?.id}&${url_param}&page=${pageState}`)
          .then((response) => {
            setlistData(response.data.data);
            setPageState(response.data.page);
            setPaginationData(response.data);
          })
          .catch((err) => {});
      }
    };
  
    const { page, previous_page, max_pages, total_count, count } = paginationData;
  return (
    <div className={styles.container}>
      {/* <AddStudentDrawer/> */}
      <div className={styles.filterBox}>
        <div style={{ width: "20%" }}>
          <FormControl fullWidth>
            <InputLabel size="small" id="demo-simple-select-label">
              Test Mode
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              // value={age}
              name="test_mode"
              label="Test Mode"
              size="small"
              onChange={handleChangeMode}
            >
              <MenuItem value={1}>Online</MenuItem>
              <MenuItem value={2}>Offline</MenuItem>
              <MenuItem value={3}>All</MenuItem>
            </Select>
          </FormControl>
        </div>

        {/* <div style={{ width: "20%" }}>
          <InstituteMultipleSelect
            size="small"
            label="School"
            name="institute"
            namesArray={instituteList}
            value={filterData.institute}
            callBack={callBackType}
          />
        </div> */}

        <div style={{ width: "20%" }}>
          <CustomMultipleSelect
            size="small"
            label="Grade"
            name="grade"
            namesArray={gradeList}
            callBack={callBackType}
            value={filterData.value}
          />
        </div>

        <div style={{ width: "20%" }}>
          <CustomMultipleSelect
            size="small"
            label="Tests"
            name="test_type"
            namesArray={testArray}
            callBack={callBackType}
            value={filterData.test_type}
          />
        </div>

        <InputField
          label="Search"
          onChange={handleFilter}
          name="searchParam"
          value={filterData.searchParam}
        />
      </div>
      <div className={styles.tableContainer}>
        {/* {listMode == 1 ? (
          <StudentsTable data={listData} />
        ) : (
          <StudentsTableOffline data={listData} />
        )} */}

        {listMode == 1 && (
          <StudentsTable data={listData} instituteListProps={instituteList} />
        )}
        {listMode == 2 && (
          <StudentsTableOffline
            data={listData}
            instituteListProps={instituteList}
          />
        )}
        {listMode == 3 && (
          <StudentsTable data={listData} instituteListProps={instituteList} />
        )}

        <Pagination
          count={max_pages}
          size="large"
          variant="outlined"
          shape="rounded"
          onChange={(e, value) => setPageState(value)}
        />
      </div>

      <DrawerComponent
        // open={openDrawerComponent}
        anchor={"right"}
        // onClose={() => setOpenDrawerComponent((prev) => !prev)}
      >
        {/* {children} */}
      </DrawerComponent>
    </div>
  )
}

export default AllStudentReports


const gradeArray = ["Class VI", "Class VII", "Class VIII", "Class IX"];

const testArray = [
  {
    id: "1",
    title: "Aptitude",
  },
  {
    id: "2",
    title: "Interest",
  },
  {
    id: "3",
    title: "Academics",
  },
];