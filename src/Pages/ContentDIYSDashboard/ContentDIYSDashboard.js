import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ContentDIYS from '../ContentDIYS/ContentDIYS'
import ContentDIYSCreateTest from '../ContentDIYSCreateTest/ContentDIYSCreateTest'
import ContentDIYSAddQuestion from '../ContentDIYSAddQuestion/ContentDIYSAddQuestion'

function ContentDIYSDashboard({access}) {
  return (
    <div>
      <Routes>
        <Route strict exact path="doityourselflist" element={<ContentDIYS access={access}/>} />
        <Route strict exact path='doityourselfcreateTest' element={<ContentDIYSCreateTest />} />
        <Route strict exact path="viewTest/:id" element={<ContentDIYSAddQuestion access={access} />} /> 
      </Routes>
    </div>
  )
}

export default ContentDIYSDashboard
