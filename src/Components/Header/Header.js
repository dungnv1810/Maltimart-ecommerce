import React, {useRef, useEffect} from "react";
import { Container, Row } from "reactstrap";
import {Link, NavLink, useNavigate} from "react-router-dom"
import {motion} from "framer-motion";

import {signOut} from "firebase/auth"
import { auth } from "../../Firebase.config";

import { useSelector } from "react-redux";
import useAuth from "../../Customhooks/userAuth"

import user_icon from "../../assets/images/user-icon.png"
import logo from "../../assets/images/eco-logo.png"
import "./Header.css"
import { toast } from "react-toastify";

const nav__link = [
    {
        id: 1,
        path: 'home',
        display: 'Home'
    },
    {
        id: 2,
        path: 'shop',
        display: 'Shop'
    },
    {
        id: 3,
        path: 'cart',
        display: 'Cart'
    },
]

const Header = () => {
    const headerRef = useRef(null)
    const totalQuantity = useSelector(state=> state.cart.totalQuantity)

    const {currentUser} = useAuth()

    const profileActionRef = useRef(null)

    const menuRef = useRef(null)
    const stickyHeaderFunc = () => {
        window.addEventListener('scroll',()=>{
            if(document.body.scrollTop > 80 || document.documentElement.scrollTop > 80){
                headerRef.current.classList.add('sticky__header')
            }else{
                headerRef.current.classList.remove('sticky__header')
            }
        })
    }
    const menuToggle = () => menuRef.current.classList.toggle('nav__active')


    useEffect(()=>{
        stickyHeaderFunc()
        return () => window.removeEventListener('scroll', stickyHeaderFunc)
    })

    const navigate = useNavigate()
    const navigateToCart = () => {
        navigate('/cart')
    }

    const toggleProfileActions = () => profileActionRef.current.classList.toggle("show__profileActions")

    const logout = () => {
        signOut(auth).then(()=>{
            toast.success('Logged out')
            navigate('/home')
        }).catch(err => {
            toast.error(err.message)
        })
    }
    return(
        <>
            <header className="header" ref={headerRef}>
                <Container>
                    <Row>
                        <div className="nav__wrapper">
                            <div className="logo">
                                <img src={logo} alt=''/>
                                <div>
                                    <h1>Multimart</h1>
                                </div>
                            </div>
                            <div className="navigation" ref={menuRef} onClick={menuToggle}>
                                <ul className="menu">
                                    {
                                        nav__link.map((item, array, index) => {
                                            return(
                                                <li className="nav__item" key={item.id}>
                                                    <NavLink to={item.path} className={(navClass) => navClass.isActive ? "nav__active" : ""}>{item.display}</NavLink>
                                                </li>
                                            )
                                        })
                                    }
                                </ul>
                            </div>
                            <div className="nav__icons">
                                <span className="fav__icon">
                                    <i className="ri-heart-line"></i>
                                    <div className="badge">1</div>
                                </span>
                                <span className="cart__icon" onClick={navigateToCart}>
                                    <i className="ri-shopping-bag-line"></i>
                                    <div className="badge">{totalQuantity}</div>
                                </span>
                                <div className="profile">
                                    <motion.img 
                                        whileTap={{scale: 1.1}} 
                                        src={currentUser ? currentUser.photoURL : user_icon} 
                                        alt='' 
                                        onClick={toggleProfileActions}
                                    />
                                    <div 
                                        className="profile__action" 
                                        ref={profileActionRef}
                                        onClick={toggleProfileActions}
                                    >
                                        {
                                            currentUser ? <span onClick={logout}>Logout</span> : 
                                            <div className="profile__login">
                                                <Link to='/signup'>Signup</Link>
                                                <Link to='/login'>Login</Link>
                                                <Link to='/dashboard'>Dashboard</Link>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="mobile__menu">
                                    <span onClick={menuToggle}><i className="ri-menu-line"></i></span>
                                </div>
                            </div>
                        </div>
                    </Row>
                </Container>
            </header>
        </>
    )
}
export default Header