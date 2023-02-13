import React from "react";
import { Outlet } from "react-router-dom";

import userAuth from "../Customhooks/userAuth";
import { Navigate } from "react-router-dom";
const ProtectedRoute = () => {
    const {currentUser} = userAuth()
    return currentUser ? <Outlet/> : <Navigate to='login'/>
}
export default ProtectedRoute