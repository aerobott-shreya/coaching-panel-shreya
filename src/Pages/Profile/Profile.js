import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import TableComp from '../../Components/TableComp/TableComp'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BoxContainer from '../../Components/BoxContainer/BoxContainer';
import { api_token, base_url, _access_token } from '../../Utils/Network';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from "./index.module.css";
import DialogBox from '../../Components/DialogBox/DialogBox';
import InputField from '../../Components/Input/InputField';
import axios from 'axios';
import Parents from "../../File/Parents.xlsx";
// import Student from "../../File/Students.xlsx";
import Student from "../../File/Students_2.xlsx";
import Teacher from "../../File/Teachers.xlsx";
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';


function Profile(props) {
    let navigate = useNavigate();
    const { pathname } = useLocation();
    const [profile, setProfile] = useState("");
    const [file, setFile] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dataModel, setDataModel] = useState([]);
    const [content, setContent] = useState([]);
    const [pageSize, setPageSize] = useState(10);
    const [maxPage, setMaxPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterObj, setFilterObj] = useState({});
    const { token_data  } = useContext(UserCredsContext);
    // console.log(token_data?.access, "09wdufoaiwejfhgwuefgk");
    
    useEffect(() => {
        if (pathname.includes("teacher")) {
            setProfile("Teacher");
            setFilterObj({})
            getTeacher();
        } else if (pathname.includes("student")) {
            setProfile("Student")
            setFilterObj({})
            getProfile();
        } else if (pathname.includes("parents")) {
            setProfile("Parents");
            setFilterObj({})
            getParents();
        }
    }, [pathname]);


    const getTeacher = (paramObj = { ...filterObj }, page = 1) => {
        api_token
            .get(`profile/v1/teachers/`, { params: { ...paramObj, page } })
            .then((res) => {
                let arr = [];
               
                let datas = res.data.data;
                console.log(datas, "DATAS")
                datas.map((v, i) => {
                    const classData = [];
                    const subData = [];
                    v.grade.map(info => {
                        classData.push(info.title)
                    })
                    // v.subject.map(info => {
                    //     subData.push(info.title)
                    // })
                    let val = {
                        id: v.id,
                        name: `${v?.user?.first_name} ${v?.user?.last_name}`,
                        email: v?.user?.email,
                        phone: v?.user?.phone,
                        // subject: subData,
                        class: classData,
                    };
                    arr.push(val);
                });

                if (res.data.max_pages) {
                    setMaxPage(res.data.max_pages);
                }

                if (res.data.count) {
                    setPageSize(res.data.count);
                }
                setDataModel(arr);
                setContent([{ field: 'id', headerName: 'Staff Id', width: 100, sortable: false },
                { field: 'name', headerName: 'Name', flex: 1 },
                // { field: 'subject', headerName: 'Subject', flex: 1 },
                { field: 'class', headerName: 'Class', flex: 1 },
                { field: 'email', headerName: 'Email', flex: 1 },
                { field: 'phone', headerName: 'Phone', flex: 1 },
                {
                    field: 'Actions', headerName: 'Actions', width: 200, renderCell: (params) => {
                        return (
                            <>
                                <EditIcon
                                    // onClick={() => handleClick()} 
                                    style={{ cursor: 'pointer' }} />
                                {/* <DeleteIcon onClick={() => handleData()} style={{ cursor: 'pointer' }} /> */}
                            </>
                        );
                    }
                }]);
            })
            .catch((err) => console.log(err))
    }


    const getParents = (paramObj = { ...filterObj }, page = 1) => {
        api_token
            .get(`profile/v1/student_guardian/`, { params: { ...paramObj, page } })
            .then((res) => {
                let arr = [];
                let datas = res.data.data;
                datas.map((v, i) => {
                    let val = {
                        id: v.id,
                        name: `${v?.user?.first_name} ${v?.user?.last_name}`,
                        relation: v?.relationship?.title,
                        occupation: v?.occupation,
                    };
                    arr.push(val);
                });
                if (res.data.max_pages) {
                    setMaxPage(res.data.max_pages);
                }

                if (res.data.count) {
                    setPageSize(res.data.count);
                }
                setDataModel(arr);
                setContent([{ field: 'id', headerName: 'Sr no', width: 100, sortable: false },
                { field: 'name', headerName: 'Name', flex: 1 },
                { field: 'relation', headerName: 'Relation', flex: 1 },
                { field: 'occupation', headerName: 'Occupation', flex: 1 },
                {
                    field: 'Actions', headerName: 'Actions', width: 400,
                    sortable: false,
                    flex: 1,
                    renderCell: (params) => {
                        return (
                            <>
                                <EditIcon
                                    // onClick={() => handleClick()} 
                                    style={{ cursor: 'pointer' }} />
                                {/* <DeleteIcon onClick={() => handleData()} style={{ cursor: 'pointer' }} /> */}
                            </>
                        );
                    }
                }]);
            })
            .catch((err) => console.log(err))
    }


    const getProfile = (paramObj = { ...filterObj }, page = 1) => {
        api_token
            .get(`profile/v1/student/`, { params: { ...paramObj, page } })
            .then((res) => {
                let arr = [];
                let datas = res.data.data;
                datas.map((v, i) => {
                    let val = {
                        id: v.id,
                        rollno: v.roll_number,
                        name: `${v?.user?.first_name} ${v?.user?.last_name}`,
                        email: v?.user?.email,
                        board: v?.board?.title || "",
                        class: v?.class_of_student?.title || "",
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
                    // { field: 'id', headerName: 'Roll no', width: 100, sortable: false },
                    { field: 'rollno', headerName: 'Roll no', flex: 1 },
                    { field: 'name', headerName: 'Name', flex: 1 },
                    { field: 'email', headerName: 'Email', flex: 1 },
                    { field: 'board', headerName: 'Board', flex: 1 },
                    // { field: 'class', headerName: 'Class', flex: 1 },
                    // { field: 'grade', headerName: 'Grade', flex: 1 },
                    // { field: 'section', headerName: 'Section', flex: 1 },
                    {
                        field: 'Actions', headerName: 'Actions', flex: 1,
                        sortable: false,
                        // align: 'right',
                        flex: 1,
                        renderCell: (params) => {
                            return (
                                <>
                                    <EditIcon
                                        // onClick={() => handleClick()}
                                        style={{ cursor: 'pointer' }} />
                                    {/* <DeleteIcon onClick={() => handleData()} style={{ cursor: 'pointer' }} /> */}
                                </>
                            );
                        }
                    }]);
            })
            .catch((err) => console.log(err));
    }


    const submitbulk = (val) => {
        console.log(val, "VAL")
        setFile(null);
        setOpenDialog(true)
    }

    const SubmitFile = async (v) => {
        let endpoint;
        if (v == "Teacher") {
            endpoint = 'extract_teacher';
        } else if (v == "Student") {
            endpoint = 'extract_student';
        } else {
            endpoint = 'extract_guardian';
        }

        // console.log(endpoint)

        let data = {
            file: file,
        }
        const formData = new FormData();
        if (data.file) formData.append('file', data.file)
        try {

            await axios({
                method: "Post",
                url: `${base_url}external/v1/${endpoint}/`,
                data: formData,
                config: { headers: { 'Content-Type': 'multipart/form-data' } },
                headers: { 'Authorization': `Bearer ${token_data?.access}` },
            })
                .then(response => {
                    // setLoading(false)
                    // console.log(response?.data?.message, "rRRRRRRR")
                    if (response.status === 200 || response.status === 201) {
                        if (response.data) {
                            alert(`${response?.data?.message} `)
                            setFile(null);
                            setOpenDialog(false);
                            // getEbookData();

                        }
                    }
                })
                .catch(error => {
                    console.log(error, 'error');
                })
        } catch (error) {
            console.log(error);
        }
    }

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }


    /******** handle Data *****/

    const handleDatas = (value,data, type ) => {
        console.log(value, type, "ValueType")
        if (type == "Student") {
            navigate(`/dashboard/profile/${value}`, {state: props})
        } else if (type == "Teacher") {
            navigate(`/dashboard/teacherprofile/${value}`, {state: props})
        } else if (type == "Parents") {
            navigate(`/dashboard/parents/${value}`, {state: props})
        }
    }

    const pageChange = (value, type) => {

        if (type == "Student") {
            getProfile({}, value);
        } else if (type == "Teacher") {
            getTeacher({}, value);
        } else if (type == "Parents") {
            getParents({}, value);
        }
    }

    const handleData = () => {
        alert("delete")
    }

    const href = window.location.href;
    const handleCreateClick = () => {
        if (pathname.includes("student")) {
            navigate(`/dashboard/profile/create`, { state: { newuser: href } })
        } else if (pathname.includes("teacher")) {
            navigate(`/dashboard/profile/CreateTeacher`)
        } else if (pathname.includes("parents")) {
            navigate(`/dashboard/profile/CreateParents`)
        }

    }

    console.log(props, "Propssssssssss")
    return (
        <div>

            {/* <div>{profile}</div> */}
            {/* <BoxContainer>{profile}</BoxContainer> */}

            <div>
                <h1 className={styles.profileHead}>{profile}</h1>


                <div className={styles.btnContainer} >
                   {props?.writeAccess && <Button onClick={() => submitbulk(profile)}>Bulk Upload</Button>}
                    <div style={{ marginLeft: "auto", marginRight: '15px' }}>

                        <InputField
                            label="Search By Name"
                            autoComplete="off"
                            onChange={(v) => {
                                let ord_id = v.target.value;
                                let obj = filterObj;
                                if (ord_id) obj.q = ord_id;
                                else delete obj.q;

                                if (profile == "Student")
                                    getProfile(obj);
                                else if (profile == "Teacher")
                                    getTeacher(obj);
                                else if (profile == "Parents")
                                    getParents(obj);
                            }}
                            size="small" />

                    </div>
                    {/* <Button onClick={handleCreateClick} variant="contained">Create</Button> */}
                    {/*** Permision Button below ***/}
                    
                    <Button onClick={handleCreateClick} variant="contained" disabled={!props?.writeAccess}>Create</Button>
                    {/* <button className={styles.createBtn} onClick={handleCreateClick}>Create</button> */}
                </div>

            </div>
            <TableComp rows={dataModel} columns={content} currentPage={currentPage} handledata={handleDatas} profile={profile} maxPage={maxPage} pageSize={pageSize} pageChange={pageChange} />

            <div>
                <DialogBox open={openDialog} onClose={() => setOpenDialog(false)} dataSend={() => SubmitFile(profile)}>
                    <div>
                        <h3>Upload {profile} File</h3>
                        <p>Get Sample File here
                            {
                                (profile == "Parents") ? 
                                    <a href={Parents} download> Click to download</a> :
                                    (profile == "Teacher") ?
                                    <a href={Teacher} download> Click to download</a> :
                                    <a href={Student} download> Click to download</a> 
                            }
                        </p>
                        <input type="file" accept='file/*' onChange={handleChange} />
                    </div>
                </DialogBox>
            </div>
        </div>
    )
}

export default Profile