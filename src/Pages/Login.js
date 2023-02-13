import React, {useState} from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link, useNavigate} from "react-router-dom";

import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../Firebase.config";
import {toast} from "react-toastify"

import "../Styles/Login.css"
import Helmet from "../Components/Helmet/Helmet"
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const signIn = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user
            console.log(user)
            setLoading(false)
            toast.success('Successfully  logged in')
            navigate('/checkout')
            
        }catch(err){
            setLoading(false)
            toast.error(err.message)
        }
    }
    return(
        <>
            <Helmet title={'Login'}>
                <section className="login">
                    <Container>
                        <Row>
                            {
                                loading ? (
                                    <Col lg='12' className="text-center">
                                        <h5 className="fw-bold">Loding...</h5>
                                    </Col>
                                ) : (
                                    <Col lg='6' className="m-auto text-center">
                                        <h3 className="fw-bold fs-4 mb-4">Login</h3>
                                        <Form className="auth__from" onSubmit={signIn}>
                                            <FormGroup className="form__group">
                                                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="Enter your email"/>
                                            </FormGroup>
                                            <FormGroup className="form__group">
                                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder="Enter your password"/>
                                            </FormGroup>
                                            <button type="submit" className="buy__btn auth__btn">Login</button>
                                            <p>Don't have an account? <Link to='/signup'>Create an account</Link></p>
                                        </Form>
                                    </Col>
                                )
                            }
                        </Row>
                    </Container>
                </section>
            </Helmet>
        </>
    )
}
export default Login