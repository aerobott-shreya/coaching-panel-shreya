import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AttendanceAnalysis from './AttendanceAnalysis';
import OverallAttendance from './OverallAttendance';

function Attendance(props) {
    return (
        <div>
            <Routes>
                <Route exact strict path="students" element={<OverallAttendance type="1" />} />
                {/* <Route exact strict path="students" element={<AttendanceAnalysis />} /> */}
                {/* <Route exact strict path="teachers" element={<OverallAttendance type="2" />} /> */}
            </Routes>
        </div>
    )
}

export default Attendance;