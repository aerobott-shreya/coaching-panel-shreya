import React from 'react'
import { Route, Routes } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import ContentVideos from '../ContentVideos/ContentVideos'
import CustomVideo from '../CustomVideoPlayer/CustomVideo';
import CustomVideoPlayer from '../CustomVideoPlayer/CustomVideoPlayer'

function ContentVideoDashboard() {

  return (
    <div>
        <Routes>
            <Route strict exact path="videoslist" element={<ContentVideos />} />
            <Route strict exact path="videoPlayer" element={<CustomVideoPlayer />} />
            {/* <Route strict exact path="videoPlayer" element={<CustomVideo />} /> */}

        </Routes>
    </div>
  )
}

export default ContentVideoDashboard