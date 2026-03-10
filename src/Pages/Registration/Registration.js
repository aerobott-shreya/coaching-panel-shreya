import React,  { useState, useEffect, useContext } from 'react'
import RightLogin from "../../Asset/IMAGE/rightlogin.png"
import Login from '../Login/Login'
import styles from "./Registration.module.css"
import { UserCredsContext } from "../../ContextApi/UserCredContext/UserCredsContext";
import CoachingInstituteRegistration from "../../Component/CoachingInstituteRegistration/CoachingInstituteRegistration";
import TeachersRegistration from "../../Component/TeachersRegistration/TeachersRegistration";
import DialogBox from '../../Component/DialogBox/DialogBox';
import TypeSelect from '../../Component/DialogBox/TypeSelect';
import Logins from '../../Component/DialogBox/Logins';
import Authenticate from '../../Component/DialogBox/Authenticate';
import Batches from '../Batches';
import ForgetPassword from '../../Component/DialogBox/ForgotPassword';

function Registration() {
    const { LoginType, updateLoginType,setToken, setUser, userType, updateUserType } =
    useContext(UserCredsContext);

    // console.log(LoginType, "x!")
    return (
        <div className={styles.main_Log}>
            <div className={styles.login_cont}>
                {LoginType === 0 && <Login />}
                {LoginType === 1 && <TypeSelect />}
                {LoginType === 2 && <Logins /> }
                {LoginType === 3 && <Authenticate /> }
                {LoginType === 4 && <TeachersRegistration /> }
                {LoginType === 5 && <CoachingInstituteRegistration /> }
                {LoginType === 13 && <ForgetPassword />}
                {/* {userType === 0 && <Login />}
                {userType === 8 && <TeachersRegistration /> }
                {userType === 7 && <CoachingInstituteRegistration />} */}
            </div>
            <div className={styles.log_img}>
                <img src={RightLogin} alt="Rightlogin" style={{width: '100%'}}/>
            </div>
        </div>
    )
}

export default Registration
