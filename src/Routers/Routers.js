import React from "react";
import {Routes, Route, Navigate} from "react-router-dom"

import Home from "../Pages/Home";
import Shop from "../Pages/Shop";
import Cart from "../Pages/Cart";
import ProductDetails from "../Pages/ProductDetails";
import Checkout from "../Pages/Checkout";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ProtectedRoute from "./ProtectedRoute";

import AddProducts from "../Addmin/AddProducts";
import AllProducts from "../Addmin/AllProducts";
import Dashboard from "../Addmin/Dashboard";
import User from "../Addmin/User";
import Oders from "../Addmin/Oders";

const Routers = () => {
    return(
        <>
            <Routes>
                <Route path="/" element={<Navigate to='home'/>}/>
                <Route path="home" element={<Home/>}/>
                <Route path="shop" element={<Shop/>}/>
                <Route path="shop/:id" element={<ProductDetails/>}/>
                <Route path="cart" element={<Cart/>}/>
                <Route path="/*" element={<ProtectedRoute/>}>
                    <Route path="checkout" element={<Checkout/>}/>
                    <Route path="dashboard" element={<Dashboard/>}/>
                    <Route path="dashboard/all-products" element={<AllProducts/>}/>
                    <Route path="dashboard/add-product" element={<AddProducts/>}/>
                    <Route path="dashboard/user" element={<User/>}/>
                    <Route path="dashboard/oders" element={<Oders/>}/>
                </Route>

                {/* <Route path="checkout" element={<ProtectedRoute>
                    <Checkout/>
                </ProtectedRoute>}/> */}

                <Route path="login" element={<Login/>}/>
                <Route path="signup" element={<Signup/>}/>
            </Routes>
        </>
    )
}
export default Routers