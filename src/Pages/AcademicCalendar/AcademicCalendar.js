import React from 'react';
import { Route, Routes } from 'react-router-dom';
import CustomCalendar from '../../Components/CustomCalendar/CustomCalendar';
import Holiday from '../Calendar/Holiday/Holiday';
import Exams from '../Calendar/Exams/Exams';
import Test from '../Calendar/Test/Test';
import Birthday from '../Calendar/Birthday/Birthday';
import DailyClasses from '../Calendar/DailyClasses/DailyClasses';

function AcademicCalendar(props) {    
    return (
        <>
            <Routes>
                <Route exact strict path="daily-classes" element={<DailyClasses />} />
                <Route exact strict path="holidays" element={<Holiday />} />
                <Route exact strict path="special-events" element={<CustomCalendar />} />
                <Route exact strict path="exams" element={<Exams />} />
                <Route exact strict path="tests" element={<Test />} />
                <Route exact strict path="birthdays" element={<Birthday />} />
                <Route exact strict path="fee-due-dates" element={<CustomCalendar />} />
            </Routes>
        </>
    )
}

export default AcademicCalendar;