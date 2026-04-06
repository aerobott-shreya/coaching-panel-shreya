import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContentCreateTest from '../ContentCreateTest/ContentCreateTest'
import ContentTest from '../ContentTest/ContentTest'
import ContentTestAddQuestion from '../ContentTestAddQuestion/ContentTestAddQuestion'

function ContentTestDashboard({access}) {
  return (
    <div>
        <Routes>
            <Route strict exact path="testList" element={<ContentTest access={access} />} />
            <Route strict exact path="createTest" element={<ContentCreateTest />} />
            <Route strict exact path="viewTest/:id" element={<ContentTestAddQuestion access={access}/>} /> 
        </Routes>
    </div>
  )
}

export default ContentTestDashboard