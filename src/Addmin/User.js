import React from "react";
import { Container, Row, Col } from "reactstrap";
import {toast} from "react-toastify"

import UserGetData from "../Customhooks/UserGetData";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase.config";

const User = () => {
    const {data: usersData, loading} = UserGetData('users');

    const deleteUser = async(id) => {
        await deleteDoc(doc(db,'users', id))
        toast.success('user deleted!')
    }
    return(
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <h4 className="fw-bold">Users</h4>
                        </Col>
                        <Col lg='12' className="pt-5">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <h5 className="pt-5 lw-bold">Loading...</h5> : 
                                        usersData.map((item, index) => {
                                            return(
                                                <tr key={item.uid}>
                                                    <td>
                                                        <img src={item.photoURL} alt=''/>
                                                    </td>
                                                    <td>{item.displayName}</td>
                                                    <td>{item.email}</td>
                                                    <td>
                                                        <button onClick={() => {deleteUser(item.uid)}} className="btn btn-danger">Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default User