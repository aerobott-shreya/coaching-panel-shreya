import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContentCreateTest from '../ContentCreateTest/ContentCreateTest'
import ContentQA from '../ContentQA/ContentQA'
import ContentQAAddQuestion from '../ContentQAAddQuestion/ContentQAAddQuestion'
import ContentQACreateTest from '../ContentQACreateTest/ContentQACreateTest'
import ContentTest from '../ContentTest/ContentTest'
import ContentTestAddQuestion from '../ContentTestAddQuestion/ContentTestAddQuestion'

function ContentQADashboard({access}) {
  return (
    <div>
        <Routes>
            {/* <Route strict exact path="qalist" element={<ContentTest />} /> */}
            <Route strict exact path="qalist" element={<ContentQA access={access}/>} />
            <Route strict exact path="createTest" element={<ContentQACreateTest />} />
            <Route strict exact path="addQuestion/:id" element={<ContentQAAddQuestion access={access} />} /> 

            {/* <Route strict exact path="createTest" element={<ContentCreateTest />} /> */}
            {/* <Route strict exact path="addQuestion/:id" element={<ContentTestAddQuestion/>} />  */}
        </Routes>
    </div>
  )
}

export default ContentQADashboard