import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PendingListView from '../PendingListView/PendingListView';
import StudentFeesArea from '../StudentFeesArea/StudentFeesArea';

function PendingFeeList(props) {
  return (
    <div>
           <Routes>
                <Route exact strict path="feelist" element={<PendingListView />} />
                <Route exact strict path="studentFees/:id" element={<StudentFeesArea />} />
            </Routes>
    </div>
  )
}

export default PendingFeeList