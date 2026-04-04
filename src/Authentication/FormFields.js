import React, { useReducer, useContext } from 'react';
import InputField from '../Components/Input/InputField';
import styles from './Login.module.css';
import { Button } from '@mui/material';
import { FORGOT_PASSWORD, LOGIN, OTP_FIELD } from '../Utils/Global';
import { loginReducer } from './loginReducer';
import { api_open, setToken } from '../Utils/Network';
import { useNavigate } from 'react-router-dom';
import OTP from './OTP';
import CustomTimer from '../Components/CustomTImer/CustomTimer';
import { UserCredsContext } from '../ContextApi/UserCredsContext/UserCredsContext';

const FormHeader = ({ type, email, ...props }) => {
    return (
        <>
            {type === LOGIN && <div>
                <p className={styles.formTitle} style={{ color: '#9CCFCF' }}>Login</p>
                <p className={styles.formDescp}>Explore the best experience</p>
            </div>}
            {type === FORGOT_PASSWORD && <div>
                <p className={styles.formTitle} style={{ color: '#9CCFCF' }}>Did you forget the Password?</p>
                <p className={styles.formDescp}>Enter your registered mobile number or email Id</p>
            </div>}
            {type === OTP_FIELD && <div>
                <p className={styles.formTitle} style={{ color: '#9CCFCF' }}>The final step</p>
                <p className={styles.formDescp}>Enter the OTP code that has been sent to {email}</p>
            </div>
            }
        </>
    )
}

function FormFields({ type, handleSubmit, ...props }) {
    let navigate = useNavigate();

    const [state, dispatch] = useReducer(loginReducer, initialState);
    const { username, password, otp, isLoading, error, isLoggedIn, showOtp, email } = state;
    const { setUserState } = useContext(UserCredsContext);
    const handleChange = (e) => {
        const { name, value } = e.target;
        dispatch({
            type: 'field',
            fieldName: name,
            payload: value,
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();

        // Prevent normal login flow logic if this is a forgot password attempt
        if (type === FORGOT_PASSWORD) {
            console.warn("OTP Verification Needs Implementation");
            return;
        }

        dispatch({ type: "login" })
        const data = {
            "username": username,
            "password": password
        }
        api_open.post(`/auth/user/institute_login/`, data)
            .then(response => {
                console.log(response, "resp");
                if (response?.data?.data && response.status == 200) {
                    const { token, user } = response.data.data;
                    setUserState(user, token);
                    dispatch({ type: 'success' });
                    // localStorage.setItem("coaching_user_cred_context", JSON.stringify(user));
                    // localStorage.setItem("token_coaching", token.access);
                    setToken(token.access)
                    navigate(`/dashboard/courses`);
                } else {
                    dispatch({ type: 'error' });
                }
            })
            .catch(error => {
                console.log(error);
                dispatch({ type: 'error' });
            })
    }

    const handleRoute = (_url) => {
        navigate(`/${_url}`)
    }

    const handleOtp = async (e) => {
        // Prevent form submission which tries to incorrectly log the user in
        e.preventDefault();

        try {
            const data = { username: username };

            // TODO: Please replace with the correct OTP generation API endpoint here
            const response = await api_open.post('/auth/user/generate_otp/', data);

            console.log(response, "OTP Generation Response");

            // The API returns 200 OK even if the user isn't found, so we must check the application-level status
            if (response.data && response.data.data && response.data.data.status === false) {
                console.log("Backend rejected OTP generation:", response.data.data.message);
                dispatch({ type: 'field', fieldName: 'error', payload: response.data.data.message });
                return;
            }

            dispatch({ type: 'toggleotp' });
        } catch (err) {
            console.log("Failed to send OTP:", err);
            dispatch({ type: 'field', fieldName: 'error', payload: 'Failed to send OTP (Network error)' });
        }
    }

    const userForm = () => {
        return (
            <div className={styles.leftContainerA}>
                <FormHeader type={type} showOtp />
                <form onSubmit={onSubmit} className={styles.authFormContainer}>
                    <div>
                        <InputField style={{ background: 'white', width: "100%", marginBottom: '15px' }} label="Username" value={username} placeholder="username" name="username" onChange={handleChange} size="normal" type="text" error={error === "" ? false : true} />
                    </div>
                    {type === LOGIN && (
                        <div style={{ width: "100%" }}>
                            <InputField style={{ background: 'white', width: "100%", marginBottom: '15px' }} label="Password" value={password} placeholder="password" name="password" onChange={handleChange} size="normal" type="password" error={error === "" ? false : true} />
                        </div>
                    )}
                    <p style={{ fontSize: "14px", color: "red" }}>{error} &nbsp;</p>

                    {type === LOGIN &&
                        (<>
                            <p className={styles.forgotPassword} style={{ color: "#9CCFCF" }} onClick={() => handleRoute(FORGOT_PASSWORD)}>Forgot Password?</p>
                            <br />
                            <Button type='submit' size="large" style={{ width: "100%" }} variant="contained" >Login</Button>
                        </>)
                    }
                    {type === FORGOT_PASSWORD &&
                        (<>
                            <p className={styles.forgotPassword} style={{ color: "#9CCFCF" }} onClick={() => handleRoute(LOGIN)}>Back to login</p>
                            <br />
                            <Button type='button' size="large" style={{ width: "100%" }} variant="contained" onClick={handleOtp}>Get OTP</Button>
                        </>)
                    }
                </form>
            </div>
        )
    }

    const otpForm = () => {
        return (
            <>
                <div className={styles.leftContainerA}>
                    <FormHeader type={OTP_FIELD} email={email} />
                    <form onSubmit={onSubmit} className={styles.authFormContainer}>
                        <OTP />
                        <p className={styles.forgotPassword} style={{ color: "#9CCFCF", margin: "25px 0px 20px" }} >Resend OTP <CustomTimer /></p>
                        <br />
                        <Button type='submit' size="large" style={{ width: "100%" }} variant="contained" >Verify</Button>
                    </form>
                </div>
            </>
        )
    }

    return (
        <div>
            {!showOtp && userForm()}
            {showOtp && otpForm()}
        </div>
    )
}

export default FormFields;

const initialState = {
    username: '',
    password: '',
    isLoading: false,
    error: '',
    isLoggedIn: false,
    showOtp: false,
    otp: '',
    email: ""
};