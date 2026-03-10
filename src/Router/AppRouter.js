import React, { useEffect, useContext } from 'react';
import { Route, Routes, useLocation, useNavigate, Navigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material";
import { UserCredsContext } from "../ContextApi/UserCredsContext/UserCredsContext";
import Authentication from '../Authentication/Authentication';
import Dashboard from '../Dashboard/Home';
import PageNotFound from '../Pages/PageNotFound/PageNotFound';
import Protected from '../Components/Protected/Protected';

function AppRouter() {

    const { theme } = useContext(UserCredsContext);
    const userToken = useContext(UserCredsContext);
    const { access } = userToken.token_data;
    console.log(access, "access")


    let navigate = useNavigate();
    const location = useLocation();



    useEffect(() => {
        if (location.pathname === "/" || location.pathname === "/login") {
            navigate("/login");
        }
    }, []);



    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return (
        <>
            <ThemeProvider theme={theme}>
                <Routes>
                    {/* <Route strict exact path="/login" element={<Authentication />} /> */}
                    <Route strict exact path="/login" element={
                        !access ? (
                            < Authentication />
                        ) : (
                            <Navigate replace to={"/dashboard/courses"} />
                        )
                    } />
                    <Route strict exact path="/forgotpassword" element={<Authentication />} />
                    <Route path="/dashboard/*" element={
                        <Protected isSignedIn={access}>
                            <Dashboard />
                        </Protected>
                    } />
                    <Route path="/404" element={<PageNotFound />} />
                </Routes>
            </ThemeProvider>
        </>
    )
}

export default AppRouter;


