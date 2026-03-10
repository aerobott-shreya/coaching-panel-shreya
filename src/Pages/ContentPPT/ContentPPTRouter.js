import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Contentppt from './Contentppt'
import Contentppt from './Contentppt'
import ContentPPTchapterSlides from '../../Components/ContentPPTchapterSlides/ContentPPTchapterSlides'
import { Route, Routes } from 'react-router-dom'
// import ContentPPtEditSlideImg from '../../Components/ContentPPtEditSlideImg/ContentPPtEditSlideImg'
// import ContentPPtEdit from '../ContentPptEdit/ContentPPtEdit'
// import ContentPPTchapterSlides from '../../Components/ContentPPTchapterSlides/ContentPPTchapterSlides'

function ContentPPTRouter() {
  return (
    <div>
        <Routes>
            <Route exact strict path="view" element={<Contentppt />} />
            {/* <Route exact strict path="edit" element={<ContentPPtEdit />} /> */}
            <Route exact strict path='view/:pptID' element={< ContentPPTchapterSlides/>} />
        </Routes>
    </div>
  )
}

export default ContentPPTRouter