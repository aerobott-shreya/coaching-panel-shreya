import React, { useState, useEffect } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import styles from './index.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import check from '../../Assets/icons/check.png';
import cross from '../../Assets/icons/cross.png';
import print from "../../Assets/icons/printer.png";
import edit from "../../Assets/icons/edit.png";
import Delete from "../../Assets/icons/Delete.png";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { api_token } from '../../Utils/Network';
import DrawerComp from '../../Components/DrawerComp/DrawerComp';
import InputField from '../../Components/Input/InputField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Stack from '@mui/material/Stack';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import moment from "moment";
import { checkEmptyObject } from '../../Utils/Utils';



function StudentFeesArea() {
    let { id } = useParams();
    let navigate = useNavigate();
    const [pending, setPending] = useState({});
    const [value, setValue] = React.useState(dayjs());
    const [open, setOpen] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState([]);
    const [details, setDetails] = useState({
        id: null,
        paid_amount: 0,
        invoice_id: 0,
        payment_method_id: null,
        paid_on: "",
    })
    let year = ["January", "Feburary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

    useEffect(() => {
        getPending();
        getPayment();
    }, []);

    const openData = () => {
        navigate('/dashboard/fees/feelist')
    }

    const getPayment = () => {
        api_token
        .get(`base/v1/payment_method`)
        .then((res) => {
            setPaymentMethod(res.data.data);
        })
        .catch(err => {
            console.log(err)
        })
    }

    const getPending = () => {
        api_token
            .get(`payment/v1/student_fees/${id}`)
            .then((res) => {
                if (res.data.data) {
                    setPending(res.data.data);
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

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

    const submitValue = () => {

        let data = checkEmptyObject(details);
        if(data){
            let {id, ...rest} = details;
            api_token
            .patch(`payment/v1/student_fees_transaction/${details?.id}/`, {...rest})
            .then((res) => {
                if(res.data.data){
                    alert("Details Updated Successfully")
                    setOpen(false)
                    setDetails({
                        id: null,
                        paid_amount: 0,
                        invoice_id: 0,
                        payment_method_id: null,
                        paid_on: "",
                    })
                }
            })
            .catch(err => {
                // console.log(err.response.data.error.fields[0].message[0])
                let error = err?.response?.data?.error?.fields[0]?.message[0];
                alert(error);
            })

        }else{
            alert("Please Enter Valid Details")
        }


    }

    const handleChange = (newValue) => {
        let dateString = moment(newValue.$d).format('YYYY-MM-DD');
        setDetails({ ...details, paid_on: dateString })
        setValue(newValue);
    };

    const editData = (e) => {
        console.log(e)

        const { invoice_id, paid_amount, paid_on } = e;
        setValue(paid_on)
        setDetails({ ...details,id: e?.id || null , invoice_id, paid_amount, paid_on, payment_method_id: e?.payment_method?.id || null });
        setOpen(true)
    }
    // console.log(details, "pending")

    return (
        <div>
            <h1>Pending Fees</h1>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div className={`${styles.displayData} ${styles.boxContainer}`}>
                    <div className={styles.mr_right}>
                        <ArrowBackIcon className={styles.arrowContainer}
                            onClick={() => openData()}
                        />
                    </div>
                    <div>
                        <div className={styles.displayData}>
                            <div className={`${styles.textBold} ${styles.dataRoll}`}>Roll No: {pending?.user?.profile?.roll_number}</div>
                            <div className={`${styles.textBold} ${styles.dataName}`}>{`${pending?.user?.first_name} ${pending?.user?.last_name}`}</div>
                        </div>
                        <div>
                            Grade: {pending?.user?.profile?.class_of_student?.title}
                        </div>
                        <div>
                            Student Id: {pending?.user?.id}
                        </div>
                    </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    Next Fee Payment Date: {pending?.next_due_on}
                </div>
            </div>


            <div className={styles.mainPending}>
                <TableContainer>
                    <Table sx={{ width: '100%' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                {headData.map((v, i) => <TableCell>{v.title}</TableCell>)}
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


                            {pending && pending?.transactions?.map((row, id) => {
                                let demo = row.balance_due_on.split('-');

                                return (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    // onClick={() => openData()}
                                    >
                                        {<TableCell component="th" scope="row">
                                            {id + 1}
                                        </TableCell>}
                                        < TableCell component="th" scope="row">
                                            {row?.invoice_id || '---'}
                                        </TableCell>
                                        {<TableCell component="th" scope="row">
                                            {
                                                year[demo[1] - 1]
                                            }
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {row?.payment_method?.title || "---"}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {row?.paid_on || "---"}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {/* {pending?.total_fee_amount} */}
                                            {row?.balance_fee_amount}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {row?.paid_amount || "0.00"}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {row?.pending_amount || "0.00"}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            {(row?.invoice_id) ?
                                                <img src={check} alt="image" /> : <img src={cross} alt="image" style={{ width: '25px', height: '25px' }} />}
                                        </TableCell>}
                                        {<TableCell component="th" scope="row">
                                            <div>
                                                {/* <img src={print} alt="image" className={styles.icons} /> */}
                                                <img src={edit} alt="image" className={styles.icons} onClick={() => editData(row)} />
                                                {/* <img src={Delete} alt="image" className={styles.icons} /> */}
                                            </div>


                                        </TableCell>}
                                    </TableRow>
                                )
                            }
                            )}

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div>
                <DrawerComp open={open} onClose={() => setOpen(false)} anchor="right">
                    <div className={styles.mainContainer}>
                        <h3>Edit Fees</h3>
                        <div style={{ margin: '20px 0' }}>
                            <InputField type="number" value={details?.paid_amount} name="paid_amount" label="Paid Amount" width="100%" onChange={handleChangeSet} />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <InputField type="number" value={details?.invoice_id} name="invoice_id" label="Invoice Id" width="100%" onChange={handleChangeSet} />
                        </div>
                        <div style={{ margin: '20px 0' }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <Stack spacing={3}>
                                    <DesktopDatePicker
                                        label="Paid on"
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
                            <InputLabel className={` ${styles.fontNormal} font-regular`} id="demo-simple-select-label">Payment Method</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={details?.payment_method_id}
                                name="payment_method_id"
                                label="Payment Method"
                                onChange={(e) => handleDrop(e, "payment_method_id")}
                            >
                                {paymentMethod && paymentMethod.map((v, i) => (<MenuItem value={v?.id}>{v?.title}</MenuItem>))}
                            </Select>
                        </FormControl>
                    </div>
                        <div>
                            <Button onClick={submitValue} variant="contained">Add</Button>
                        </div>
                    </div>
                </DrawerComp>
            </div>

        </div>
    )
}

export default StudentFeesArea


const headData = [{
    title: 'Srno',
    id: 1,
}, {
    title: 'Invoice ID',
    id: 2
}, {
    title: 'Month',
    id: 3
}, {
    title: 'Method',
    id: 4
}, {
    title: 'Payment Date',
    id: 5
}, {
    title: 'Total Amount',
    id: 6
}, {
    title: 'Amt. Paid',
    id: 7
}, {
    title: 'Outstanding Amt',
    id: 8
}, {
    title: 'Paid',
    id: 9
}, {
    title: 'Action',
    id: 10
}];

const tableData = [{
    id: 1,
    user_id: 'AB1234BD23',
    month: 'September',
    method: 'Card',
    paymentDate: '22/12/22',
    pending: '18,000/-',
    amtPaid: '27,000/-',
    outstanding: '00.00',
    paid: true,
},
{
    id: 1,
    user_id: 'AB1234BD23',
    month: 'September',
    method: 'Card',
    paymentDate: '22/12/22',
    pending: '18,000/-',
    amtPaid: '9,000/-',
    outstanding: '9,000/-',
    paid: false,
}]