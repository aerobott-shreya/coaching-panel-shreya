import React, { useState, useEffect, useContext } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './index.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { api_token } from "../../Utils/Network";
import { Button, Pagination, TablePagination } from "@mui/material";
import DrawerComp from "../../Components/DrawerComp/DrawerComp";
import InputField from "../../Components/Input/InputField";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { UserCredsContext } from '../../ContextApi/UserCredsContext/UserCredsContext';
import moment from "moment";
import { checkEmptyObject } from "../../Utils/Utils";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Autocomplete from '@mui/material/Autocomplete';

// import CustomProgress from '../CustomProgress/CustomProgress';

function PendingListView() {
    let navigate = useNavigate();
    const [pending, setPending] = useState([]);
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState([]);
    const [paycycle, setPayCycle] = useState([]);
    const [academic, setAcademic] = useState([]);
    const [value, setValue] = React.useState(dayjs());
    const { boardList, gradeList, classList, sectionList } = useContext(UserCredsContext);
    const [details, setDetails] = useState({
        total_fee_amount: null,
        next_fee_amount: null,
        next_due_on: '',
        reminder_count: '0',
        user_id: null,
        academic_year_id: '',
        pay_cycle_id: '',
    })
    const [filterObj, setFilterObj] = useState({});

    const [max_page, setMaxPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    useEffect(() => {
        // getPending();
        getPayCycle();
        getAcademicYear();
        getOrders();
    }, []);


    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    const getAcademicYear = () => {
        api_token
            .get(`base/v1/academic_year/`)
            .then((res) => {
                if (res.data.data) {
                    setAcademic(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const getPayCycle = () => {
        api_token
            .get(`base/v1/pay_cycle/`)
            .then((res) => {
                setPayCycle(res.data.data);
            })
            .catch(err => console.log(err))
    }

    const getPending = () => {
        api_token
            .get(`payment/v1/student_fees/`)
            .then((res) => {
                if (res.data.data) {
                    setPending(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const handleChange = (newValue) => {
        let dateString = moment(newValue.$d).format('YYYY-MM-DD');
        setDetails({ ...details, next_due_on: dateString })
        setValue(newValue);
    };

    const handleChangeSet = (e) => {
        const { name, value } = e.target;
        setDetails({
            ...details,
            [name]: value,
        })
    }

    const handleDrop = (e, name) => {
        console.log(e.target.value, name);
        setDetails({
            ...details,
            [name]: e.target.value,
        })
    }


    const openData = (e) => {
        console.log(e)
        navigate(`/dashboard/fees/studentFees/${e?.id}`)
    }


    const handleChanges = (e) => {
        console.log(e.target.value)
        let value = e.target.value;
        api_token
            .get(`profile/v1/student/?class_of_student=${value}`)
            .then((res) => {
                setDetails({ ...details, user_id: null })
                setUser(res.data.data);
            })
            .catch(err => console.log(err));
    }

    const submitValue = () => {
        console.log(details, "details")
        let value = checkEmptyObject(details);
        if (value) {
            api_token
                .post(`payment/v1/student_fees/`, details)
                .then((res) => {
                    if (res.data.data) {
                        alert("Successfully added Fee")
                        getOrders();
                        // getPending();
                        setOpen(false);
                        setDetails({
                            total_fee_amount: null,
                            next_fee_amount: null,
                            next_due_on: '',
                            reminder_count: '0',
                            user_id: null,
                            academic_year_id: '',
                            pay_cycle_id: '',
                        })
                    }
                })
                .catch(err => console.log(err))
        } else {
            alert("Please Enter the Valid Details")
        }

    }

    const getOrders = (paramObj = { ...filterObj }, list = [], page = 1) => {
        const outputObj = Object.entries(paramObj).reduce((acc, [key, value]) => {
            if (value !== false && value !== null && value !== undefined && value !== '') {
                acc[key] = value;
            }
            return acc;
        }, {});
        console.log(outputObj, "ParamObj")

        api_token
            .get(`payment/v1/student_fees/`, { params: {...outputObj, page} })
            .then((res) => {
                if (res.data.data) {
                    setPending(res.data.data);
                    setMaxPage(res.data.max_pages);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const setPageState = (e, value) => {
        getOrders(filterObj, [], e);
    }

    console.log(details, "details")
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                <h1>Pending Fees</h1>
                <div><Button onClick={() => setOpen(true)}>Add Student Fee</Button></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'end', marginBottom: '20px' }}>
                <div style={{ margin: '5px' }}>
                    <InputField
                        label="Search By Name"
                        onChange={(v) => {
                            let ord_id = v.target.value;
                            let obj = filterObj;
                            if (ord_id) obj.q = ord_id;
                            else delete obj.q;
                            getOrders(obj);
                        }} 
                        size="md" />

                </div>
                <div style={{ margin: '5px' }}>
                    <Autocomplete
                        id="free-solo2-demo"
                        freeSolo
                        size="md"
                        onChange={(e, value) => {
                            let obj = filterObj;
                            if (value) {
                                obj.class = value.id;
                            } else {
                                delete obj.class;
                                delete obj.class_id;
                            }
                            getOrders(obj);
                        }}
                        options={classList}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Class" />}
                        style={{ width: '150px' }}
                    />
                </div>
                <div style={{ margin: '5px' }}>
                    <Autocomplete
                        id="free-solo2-demo"
                        freeSolo
                        size="md"
                        onChange={(e, value) => {
                            let obj = filterObj;
                            if (value) {
                                obj.o = value.id;
                            } else {
                                delete obj.o;
                            }
                            getOrders(obj);
                        }}
                        options={orders}
                        getOptionLabel={(option) => option.title}
                        renderInput={(params) => <TextField {...params} label="Sort By" />}
                        style={{ width: '150px' }}
                    />
                </div>

                <div style={{ margin: '5px' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Basic example"
                            value={filterObj?.next_due_on}
                            onChange={(e) => {
                                let obj = filterObj;
                                if (e) obj.next_due_on = moment(e.$d).format('YYYY-MM-DD');
                                else delete obj.next_due_on;
                                getOrders(obj)
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

            </div>
            <div className={styles.mainPending}>
                <TableContainer>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headData && headData.map((v, i) => <TableCell>{v.title}</TableCell>)}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {/* <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                {tableData.map((v,i) =>  
                                <TableCell component="th" scope="row">
                             
                                </TableCell>)}
                                </TableRow> */}


                            {pending && pending.map((row, id) => {
                                return (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        onClick={() => openData(row)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {<TableCell component="th" scope="row">
                                            {id + 1}
                                        </TableCell>}
                                        < TableCell component="th" scope="row">
                                            {row?.user?.id}
                                        </TableCell>
                                        {<TableCell component="th" scope="row">
                                            {`${row?.user?.first_name} ${row?.user?.last_name}`}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {row?.user?.profile?.class_of_student?.title}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {row?.next_due_on}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {row?.next_fee_amount}
                                        </TableCell>}
                                    </TableRow>
                                )
                            }
                            )}

                        </TableBody>


                    </Table>
                </TableContainer>
            </div>
            <div style={{justifyContent: 'end', marginBottom: '10px'}}>
            <Pagination
                    count={max_page}
                    size="large"
                    variant="outlined"
                    shape="rounded"
                    onChange={(e, value) => setPageState(value)}
                />
            </div>

            <DrawerComp anchor="right" onClose={() => setOpen(false)} open={open}>
                <div className={styles.mainContainer}>
                    <h3>Add Student Fee</h3>
                    <div style={{ margin: '20px 0' }}>
                        <InputField type="number" name="total_fee_amount" label="Total Fee" width="100%" onChange={handleChangeSet} />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <InputField type="number" name="next_fee_amount" label="Next Fee" width="100%" onChange={handleChangeSet} />
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <Stack spacing={3}>
                                <DesktopDatePicker
                                    label="Next Due on"
                                    inputFormat="MM/DD/YYYY"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </Stack>
                        </LocalizationProvider>
                    </div>
                    <div style={{ margin: '20px 0' }}>
                        <FormControl fullWidth>
                            <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Class</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={userDetails?.class_id}
                                name="class_id"
                                label="Class"
                                onChange={(e) => handleChanges(e)}
                            >
                                {classList && classList.map((v, i) => (<MenuItem value={v.id}>{v.title}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <FormControl fullWidth>
                            <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">User</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={userDetails?.class_id}
                                name="user_id"
                                label="User"
                                onChange={(e) => handleDrop(e, "user_id")}
                            >
                                {user && user.map((v, i) => (<MenuItem value={v?.user?.id}>{v?.user?.first_name}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <FormControl fullWidth>
                            <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Pay Cycle</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={userDetails?.class_id}
                                name="pay_cycle_id"
                                label="Pay Cycle"
                                onChange={(e) => handleDrop(e, "pay_cycle_id")}
                            >
                                {paycycle && paycycle.map((v, i) => (<MenuItem value={v?.id}>{v?.bill_cycle_str}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{ margin: '20px 0' }}>
                        <FormControl fullWidth>
                            <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Academic Year</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // value={userDetails?.class_id}
                                name="academic_year_id"
                                label="Academic Year"
                                onChange={(e) => handleDrop(e, "academic_year_id")}
                            >
                                {academic && academic.map((v, i) => (<MenuItem value={v?.id}>{v?.title}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button onClick={submitValue} variant="contained">Add</Button>
                    </div>

                </div>
            </DrawerComp>
        </div>
    )
}

export default PendingListView


const orders = [{
    id: "total_pending_amount",
    title: "Ascending",
}, {
    id: "-total_pending_amount",
    title: "Descending",
}];
const headData = [{
    title: 'Srno',
    id: 1,
}, {
    title: 'Stu. ID',
    id: 2
}, {
    title: 'Name',
    id: 3
},
{
    title: 'Grade',
    id: 4
},
{
    title: 'Due Data',
    id: 5
}, {
    title: 'Pending Amount',
    id: 6
}];

const tableData = [{
    id: 1,
    user_id: 'AB1234BD23',
    name: "Yogin Patil",
    grade: 'VI A',
    dueDate: '22/12/22',
    pending: '18,000/-'
},
{
    id: 2,
    user_id: 'AB1234BD23',
    name: "Yogesh Kiratward",
    grade: 'VII A',
    dueDate: '22/12/22',
    pending: '18,000/-'
},
{
    id: 3,
    user_id: 'AB1334BD23',
    name: "Prasad Tandel",
    grade: 'VI B',
    dueDate: '22/12/22',
    pending: '12,000/-'
},
{
    id: 4,
    user_id: 'AB1904BD23',
    name: "Akshata",
    grade: 'VI A',
    dueDate: '22/12/22',
    pending: '11,000/-'
}]