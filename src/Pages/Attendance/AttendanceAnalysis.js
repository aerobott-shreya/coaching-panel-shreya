import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CustomAttendanceTable from '../../Components/CustomAttendanceTable/CustomAttendanceTable';
import CustomCircularProgress from '../../Components/CustomCircularProgress/CustomCircularProgress';
import CustomPieChart from '../../Components/CustomPieChart/CustomPieChart';
import styles from './Attendance.module.css';

const BoxShadow = ({ header, ...props }) => {
    return (
        <div className={styles.boxShadow}>
            <div className={styles.header}>{header}</div>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

function AttendaceAnalysis() {
    const location = useLocation();
    useEffect(() => {
        const { pathname } = location;
    }, [location])
    return (
        <div className={styles.attendanceContainer}>
            <h2 className={styles.attendanceHeader} >Attendance</h2>
            <div className={styles.aContentC}>
                <div className={styles.aContentTopC}>
                    <div className={styles.aTopL}>
                        <div className={styles.dougnutFlexC}>
                            {attendanceArray.map((item, idx) => {
                                return (
                                    <div className={styles.dougnutCountC}>
                                        <BoxShadow header={item.title}>
                                            <div className={styles.circularProgC}>
                                                <div className={styles.customCir}>
                                                    <CustomCircularProgress value={item.attendance} />
                                                </div>
                                                <div className={styles.cirPer}>
                                                    <span>{item.attendance}%</span>
                                                </div>
                                            </div>
                                        </BoxShadow>
                                    </div>
                                )
                            })}
                        </div>
                        <div>
                            <BoxShadow header="Staff">
                                <CustomAttendanceTable headData={tableHead} tableData={staffData} type="hidden" />
                            </BoxShadow>
                        </div>
                    </div>
                    <div className={styles.aTopR}>
                        <BoxShadow header="Teachers">
                            <CustomAttendanceTable headData={teacherHead} tableData={teachersData} />
                        </BoxShadow>
                    </div>
                </div>
                <div className={styles.aContentBottomC}>
                    <BoxShadow header="Students">
                        <CustomAttendanceTable headData={tableHead} tableData={studentsData} type="UserHidden" />
                    </BoxShadow>
                </div>
            </div>
        </div>
    )
}

export default AttendaceAnalysis;

const attendanceArray = [{
    title: 'Students',
    attendance: 75,
    color: "#303972",
}, {
    title: 'Teachers',
    attendance: 90,
    color: "#FCC435",
}, {
    title: 'Staff',
    attendance: 60,
    color: "#FCC43E",
}]

const tableHead = [{
    title: 'Roll no',
    id: 1,
}, {
    title: 'Name',
    id: 2
}, {
    title: 'ID',
    id: 3
},
{
    title: 'Class',
    id: 4
},
{
    title: 'Today',
    id: 5
}, {
    title: 'Attendance',
    id: 6
}]

const teacherHead = [{
    title: 'ID',
    id: 1,
}, {
    title: 'Name',
    id: 2
}, {
    title: 'Designation',
    id: 3
},
{
    title: 'User_ID',
    id: 4
},
{
    title: 'Today',
    id: 5
}, {
    title: 'Attendance',
    id: 6
}]

const staffData = [{
    name: "Pravin Upadhyay",
    id: 1,
    user_id: 'AD123456',
    day: "P",
    attendance: 30
}, {
    name: "Rikita Sheth",
    id: 3,
    user_id: 'AD123456',
    day: "P",
    attendance: 60
}, {
    name: "Rocy Rawlo",
    id: 2,
    user_id: 'AD123456',
    day: "A",
    attendance: 40
}]


const studentsData = [{
    name: "Sandesh Sakhare",
    id: 1,
    user_id: 'AD123456',
    class: '6A',
    day: "P",
    attendance: 95
}, {
    name: "Prasad Tandel",
    id: 1,
    user_id: 'AD123456',
    class: "6B",
    day: "P",
    attendance: 35
}, {
    name: "Yogin Patil",
    id: 1,
    user_id: 'AD123456',
    class: '7C',
    day: "P",
    attendance: 65
}]


const teachersData = [{
    name: "Wasim Patel",
    id: 1,
    designation: "HOD",
    user_id: 'AD123456',
    day: "P",
    attendance: 40
}, {
    name: "Darshan",
    id: 2,
    designation: "Ass. Prof",
    user_id: 'AD123456',
    day: "A",
    attendance: 60
}, {
    name: "Kaustubh",
    id: 3,
    designation: "Ass. Prof",
    user_id: 'AD123456',
    day: "P",
    attendance: 90
}]