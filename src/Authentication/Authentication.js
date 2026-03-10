import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import tri_bottom from '../Assets/tri_bottom.png';
import tri_right from '../Assets/tri_right.png';
import InputField from '../Components/Input/InputField';
import styles from './Login.module.css';
// import ranveer_1 from '../Assets/ranveer_1.png';
import ranveer_1 from '../Asset/IMAGE/rightlogin.png';
import ed5logo from '../Asset/IMAGE/logo.png';
import FormFields from './FormFields';
import { FORGOT_PASSWORD, LOGIN } from '../Utils/Global';
import { UserCredsContext } from '../ContextApi/UserCredsContext/UserCredsContext';

function Login() {
    let navigate = useNavigate();
    const { pathname } = useLocation();
    const [type, setType] = useState();
    const { setUserState } = useContext(UserCredsContext);

    useEffect(() => {
        let _type = getAuthType(pathname);
        setType(_type);
    }, [pathname]);

    const getAuthType = (_string) => {
        if (_string.includes(LOGIN)) return LOGIN
        if (_string.includes(FORGOT_PASSWORD)) return FORGOT_PASSWORD
    }

    const handleRoute = (_url) => {
        navigate(`/${_url}`)
    }

    const handleSubmit = () => {

    }
    return (
        <div>
            <div className={styles.loginPageContainer}>
                <div className={styles.wrapper}>
                    <div className={styles.loginForm} action="#" method="#">
                        <div className={styles.loginLeftSection}>
                            <div>
                            </div>
                            <img src={ranveer_1} className={styles.ranveerImage} />
                        </div>
                        <div>
                            <div className={styles.loginRightSection}>
                                <div style={{ textAlign: 'center' }}>
                                    <img src={ed5logo} style={{ width: '30%', marginTop: "15px" }} />
                                </div>
                                <div className={styles.inputForm}>
                                    <div>
                                        <FormFields type={type} handleSubmit={handleSubmit} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <img src={tri_bottom} className={styles.leftFloatImage} />
                <img src={tri_right} className={styles.rightFloatImage} />
            </div>
        </div>
    )
}

export default Login;

{/* <Button onClick={() => handleRoute('dashboard')}>Dashboard</Button>
            <br />
            <p style={{textAlign:'center'}}>login page</p> */}