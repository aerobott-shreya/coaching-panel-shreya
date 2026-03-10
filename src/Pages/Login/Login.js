import React, { useState, useEffect, useContext } from "react";
import { api_call, setApiToken, login_api } from "../../Utils/Network";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import styles from "./login.module.css";
import { UserCredsContext } from "../../ContextApi/UserCredContext/UserCredsContext";
import Logos from "../../Asset/IMAGE/logo.png";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import ForgetPassword from '../../Component/DialogBox/ForgotPassword';


const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Login() {
  const history = useHistory();
  const { LoginType, updateLoginType, setToken, setUser, userType, updateUserType, loadChapters } =
    useContext(UserCredsContext);
  const [errors, setErrors] = useState({});
  const classes = useStyles();
  const [err, setErr] = useState({});
  const [value, setValue] = React.useState(8);
  const [flow, SetFlow] = useState(0);
  const [loginD, setLogin] = useState({
    username: "",
    password: "",
  });
  const temp = {};
  const handelLoginData = (event) => {
    console.log(event.target.value);
    setErr({})
    const { name, value } = event.target;

    setLogin({ ...loginD, [name]: value });
  };

  const Forgot = () => {
    updateLoginType(13);
  }

  const OpenList = () => {
    updateLoginType(1);
    // updateLoginData({
    //   code: "+91",
    //   phone: "9773526679",
    //   otp: "",
    //   type: "logins",
    // });
  };

  const validate = () => {
    let returnValue = true;
    temp.username = (loginD.username === "") ? "Please enter username" : "";
    temp.password = (loginD.password === "") ? "Please enter password" : "";
    setErr({
      ...temp,
    });
    var found = Object.keys(temp).filter(function (key) {
      return temp[key].includes("Please");
    });
    if (found.length) {
      returnValue = false;
    }
    return returnValue;
  }

  const SubmitLogins = () => {
    console.log("welcome");

    if(!validate()){
      return null;
    }
    var loginDetails = {
      username: loginD.username,
      password: loginD.password,
    };

    api_call
      .get(`auth/user/unique_username_check/?username=${loginD.username}`)
      .then((response) => {
        const { user_type } = response.data.data;
        // if (user_type && user_type !== 1) {
        api_call
          .post(`/auth/user/login/`, loginDetails)
          .then((response) => {
            // console.log(response.data, "errros");
            localStorage.setItem(
              "network_access_token_inst",
              response.data.data.token.access
            );
            setApiToken(response.data.data.token.access);
            setToken(response.data.data.token);
            setUser(response.data.data.user);
            history.push("/batches");
            updateLoginType(10);
            loadChapters();
          })
          .catch((error) => {
            if (error) {
              // console.log(error.response.data.error.message, "ErrorLogin");
              const { message } = error.response.data.error;
              setErrors({ message });
            }
          });
        //   } else {
        //   //   setDisplayType(5);
        //   }
      })
      .catch((error) => {
        if (error) {
          // console.log(error.response.data.error.message, "ErrorLogin");
          const {message} = error.response.data.error;
          setErrors({message})
        }
      });
  };
  return (
    <div>
      <div className={styles.login_main}>
        <img src={Logos} alt="Logo" className={styles.head_logo} />
        <div className={styles.login_cont}>
          <TextField
            id="outlined-basic"
            label="Username"
            onChange={handelLoginData}
            variant="outlined"
            name="username"
            style={{ width: "90%" }}
          />
          <p className="error-message-text">
                      {err !== undefined && err.username}
                    </p>
        </div>
        <div className={styles.login_cont}>
          <TextField
            id="outlined-basic"
            type="password"
            onChange={handelLoginData}
            label="Password"
            name="password"
            variant="outlined"
            style={{ width: "90%" }}
          />
          <p className="error-message-text">
                      {err !== undefined && err.password}
                    </p>
        </div>
        <p className={styles.wrong}>{errors.message}</p>

        <button className={styles.btns} onClick={SubmitLogins}>
          Sign in
        </button>
        <button className={styles.btns} onClick={OpenList}>
          Sign up
        </button>

        <Link to='/' style={{
                            fontSize: '18px',
                            paddingLeft: '20px  ',
                            paddingTop: '10px',
                            color: 'rgb(0, 112, 210  )'

                          }}> <div onClick={()=>updateLoginType(13)}>Forgot Your Password? </div></Link>


      </div>

{/*       

      {flow === 1 && <ForgetPassword />} */}
    </div>
  );
}

export default Login;
