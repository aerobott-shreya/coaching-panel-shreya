import React, { useContext } from "react";
import Navbar from "../../Component/Navbar";
import { UserCredsContext } from "../../ContextApi/UserCredContext/UserCredsContext";

function Home({ props }) {
  const { user, logout } = useContext(UserCredsContext);
  var name;
  const Logout = () => {
    logout();
    props.history.push("/");
  };

  let x = localStorage.getItem("user_creds");
  const val = JSON.parse(x)
  // console.log(val, "Local");

  if (user.first_name && user.first_name !== undefined) {
    name = user.first_name;
  } else {
    name = val.user.first_name
  }
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1>Welcome</h1>
        <div>
          <p>{name}</p>
        </div>
        <p onClick={Logout}> Logout</p>
      </div>
    </div>
  );
}

export default Home;
