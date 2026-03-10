import React, { useEffect, useState } from 'react'
import { api_call_token } from '../../../Utils/Network';
import styles from './index.module.css';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AlarmIcon from '@material-ui/icons/Alarm';

function CounsellorList({
    goToPath= () => {},
}) {

  const [session, setSession] = useState([])

  useEffect(() => {
    sessions();
  }, []);

  const sessions = () => {
    api_call_token
    .get(`counseling/all_slots/counselor_slots/`)
    .then((res) => {
      console.log(res, "rrrrrrrrr")
      setSession(res.data.data);
    })
    .catch(err => console.log(err));
  }
  return (
    <div style={{width: '70%'}}>
               
        <p>Counseling Session</p>
        <div>
          {session.map((val , idx) => (
            <div className={styles.session_con}>
              <div>
                <span style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{val?.slot?.session_name}</span>
                <div className={styles.box_content_cc}>
                  <div style={{display: 'flex', AlignItem : 'center'}}><CalendarTodayIcon style={{ marginRight: '10px'}}/>{val?.date}</div>
                  <div style={{display: 'flex', AlignItem : 'center'}}><AlarmIcon style={{ marginRight: '10px'}}/>{val?.slot?.time_slot?.commence} - {val?.slot?.time_slot?.conclude}</div>
                  <div>Price: {val?.slot?.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>


    </div>
  )
}

export default CounsellorList