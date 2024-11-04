import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useMain } from '../hooks/useMain';

const PrivateRoute = ({ role }) => {
    const location = useLocation();
    const context = useMain();
    let authFlag = true;

    useEffect(() => {
        getData();
    }, [location]);

    const getData = async () => {
        if (!localStorage.getItem('hrms_token') || !JSON.parse(localStorage.getItem('hrms_user'))) {
            authFlag = false;
        }
        else {
            // let currentTs = new Date().getTime();
            // let rememberTs = JSON.parse(localStorage.getItem('hrms_token')).expiry;
            // if (rememberTs < currentTs) {
            //     if (JSON.parse(localStorage.getItem('hrms_token')).rememberMe) {
            //         // increase the time limit
            //         localStorage.setItem("hrms_token", JSON.stringify({ ...JSON.parse(localStorage.getItem("hrms_token")), expiry: currentTs + (24 * 60 * 60 * 1000) }))
            //     }
            //     else {
            //         // logout the user 
            //         authFlag = false;
            //     }
            // }

            if (authFlag) {
                let userRole = JSON.parse(localStorage.getItem('hrms_user')).role;
                if (!role.includes(userRole)) {
                    authFlag = false;
                }
                else {
                    const verify = await context.verify(userRole);
                    console.log(verify);
                    if (!verify.success) {
                        authFlag = false;
                    }
                    else {
                        context.setUser(verify.user);
                        localStorage.setItem('hrms_user', JSON.stringify(verify.user));
                    }
                }
            }
        }

        if (!authFlag) {
            localStorage.removeItem('hrms_token');
            localStorage.removeItem('hrms_user');
            window.location.href = "/login";
        }

        // if(!authFlag && ( role.length===1 && ['USER', 'ADMIN'].some(e=>role.includes(e)) ))
        // {

        // }
    };

    return (
        <Outlet />
    )
}

export default PrivateRoute