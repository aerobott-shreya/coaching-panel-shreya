import React from 'react'
import styles from './index.module.css';

function GoLiveList() {
  return (
    <div>
      {
        [1,2,3].map((v,i) => (
          <div key={i} className={styles.live_main}>
            <div className={styles.mb}>Demo</div>
            <div className={styles.side_box}>
              <div>1:00pm - 3:00pm</div>
              <div><button>Go Live</button></div>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default GoLiveList