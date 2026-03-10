import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContentAddAssignQuestion from '../ContentAddAssignQuestion/ContentAddAssignQuestion'
import ContentAssignments from '../ContentAssignments/ContentAssignments'
import ContentCreateAssignment from '../ContentCreateAssignment/ContentCreateAssignment'

function ContentAssignmentDashboard({access}) {
    return (
        <div>
            <Routes>
                <Route strict exact path="assignList" element={<ContentAssignments access={access} />} />
                <Route strict exact path="createAssignment" element={<ContentCreateAssignment access={access} />} />
                <Route strict exact path="addQuestion/:id" element={<ContentAddAssignQuestion  access={access} />} />
            </Routes>
        </div>
    )
}

export default ContentAssignmentDashboard