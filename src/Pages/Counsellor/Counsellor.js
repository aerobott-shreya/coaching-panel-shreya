import React from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import CreateSession from './UI/CreateSession'
import styles from "./index.module.css";
import GoLiveList from './UI/GoLiveList';
import CounsellorList from './UI/CounsellorList';
import moment from "moment";
import { api_call_token } from '../../Utils/Network';

function Counsellor() {

    const history = useHistory();
    const goToPath = (path = "") => history.push(path);


    const FormHandle = (payload) => {
        api_call_token
        .post("counseling/all_slots/register_instructor/", payload)
        .then((res) => {
            alert('successfully added')
        })
        .catch((err) => {
            console.log(err)
        })
    }
  return (
    <div>
        <Switch>
            <Route exact path="/counsellor/create">
                <CreateSession 
                onDone={FormHandle}
                goToPath={goToPath}
                />
            </Route>
            <Route exact path="/counsellor">
                <div className={styles.main_counsellor}>
                    {/* <GoLiveList /> */}
                    <div>
            <button onClick={() => goToPath('/counsellor/create')} className={styles.btn_cc}>Create Session</button>
        </div>
                    <CounsellorList 
                    goToPath={goToPath}
                    
                    />
                </div>
            </Route>

        </Switch>
    </div>
  )
}

export default Counsellor