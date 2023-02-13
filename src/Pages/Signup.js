import React, {useState} from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db, storage} from "../Firebase.config";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {setDoc, doc} from "firebase/firestore"

import {toast} from "react-toastify"

import "../Styles/Signuo.css"
import Helmet from "../Components/Helmet/Helmet"
import { async } from "@firebase/util";
const Signup = () => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    // 
    const signup = async(e) => {
        e.preventDefault()
        setLoading(true)
        try{
            // post email, password
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user

            // post file images
            const storageRef = ref(storage, `images/${Date.now() + username}`);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on((err)=>{
                toast.err(err.message)
            },()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL)=>{
                    // update user profile
                    await updateProfile(user, {
                        displayName: username,
                        photoURL: downloadURL,
                    });
                    // store user data in firestore database
                    await setDoc(doc(db,'users', user.uid),{
                        uid: user.uid,
                        displayName: username,
                        email,
                        photoURL: downloadURL,
                    })
                })
            })


            setLoading(false)
            toast.success('Account created')
            navigate('/login')
        }catch(err){
            toast.error("Something went wrong")
            setLoading(false)
        }
    }


    return(
        <>
            <Helmet title={'Signup'}>
                <section className="Signup">
                    <Container>
                        <Row>
                            {
                                loading ? (
                                    <Col lg='12' className="text-center">
                                        <h6>Loding...</h6>
                                    </Col>
                                ) : (
                                    <Col lg='6' className="m-auto text-center">
                                        <h3 className="fw-bold fs-4 mb-4">Signup</h3>
                                        <Form className="auth__from" onSubmit={signup}>
                                            <FormGroup className="form__group">
                                                <input value={username} onChange={(e)=>setUserName(e.target.value)} type='text' placeholder="UserName"/>
                                            </FormGroup>
                                            <FormGroup className="form__group">
                                                <input value={email} onChange={(e)=>setEmail(e.target.value)} type='email' placeholder="Enter your email"/>
                                            </FormGroup>
                                            <FormGroup className="form__group">
                                                <input value={password} onChange={(e)=>setPassword(e.target.value)} type='password' placeholder="Enter your password"/>
                                            </FormGroup>
                                            <FormGroup className="form__group">
                                                <input type='file' onChange={(e)=>setFile(e.target.files[0])}/>
                                            </FormGroup>
                                            <button type="submit" className="buy__btn auth__btn">Create an Account</button>
                                            <p>Already have an account? <Link to='/login'>Login</Link></p>
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
export default Signup