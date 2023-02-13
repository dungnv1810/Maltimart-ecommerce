import React from "react";
import {Container, Row} from "reactstrap";
import { NavLink } from "react-router-dom";

import userAuth from "../Customhooks/userAuth"
import "../Styles/AdminNav.css"
const AdminNav = () => {
    const {currentUser} = userAuth()
    const admin__nav = [
        {
            path: '/dashboard',
            display: 'Dashboard'
        },
        {
            path: '/dashboard/all-products',
            display: 'All-Products'
        },
        {
            path: '/dashboard/orders',
            display: 'Orders'
        },
        {
            path: '/dashboard/user',
            display: 'Users'
        },
    ]
    return(
        <>
            <header className="admin__header">
                <div className="admin__nav-top">
                    <Container>
                        <div className="admin__nav-wrapper-top">
                            <div className="logo">
                                <h2>Multimmart</h2>
                            </div>
                            <div className="search__box">
                                <input type='text' placeholder="Search..."/>
                                <span><i className="ri-search-line"></i></span>
                            </div>
                            <div className="admin__nav-top-right">
                                <span><i className="ri-notification-3-line"></i></span>
                                <span><i className="ri-settings-2-line"></i></span>
                                <img src={currentUser && currentUser.photoURL} alt=''/>
                            </div>
                        </div>
                    </Container>
                </div>
            </header>
            <section className="admin__menu p-0">
                <Container>
                    <Row>
                        <div className="admin__navigation">
                            <ul className="admin__menu-list">
                                {
                                    admin__nav.map((item, index) => {
                                        return(
                                            <li key={index} className="admin__menu-item">
                                                <NavLink className={navClass => navClass.isActive ? "active__admin-menu" : ""} to={item.path}>{item.display}</NavLink>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default AdminNav