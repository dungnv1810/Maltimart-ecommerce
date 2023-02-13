import React, {useState} from "react";
import { Container, Row, Col, } from "reactstrap";
import { db } from "../Firebase.config";
import {doc, deleteDoc} from "firebase/firestore";
import {toast} from "react-toastify"

import UserGetData from "../Customhooks/UserGetData";
const AllProducts = () => {
    const deleteProduct = async(id) => {
        await deleteDoc(doc(db,'products', id))
        toast.success('Delete!')
    }


    const { data: productsData, loading} = UserGetData('products');
    
    return(
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Image</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Price</th>
                                        <th> Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        loading ? <h3 className="py-5">Loading...</h3> : (
                                                productsData.map((item, index) => {
                                                    return(
                                                        <tr key={item.id}>
                                                            <td>
                                                                <img src={item.imgUrl} alt=''/>
                                                            </td>
                                                            <td>
                                                                {item.title}
                                                            </td>
                                                            <td>
                                                                {item.category}
                                                            </td>
                                                            <td>
                                                                ${item.price}
                                                            </td>
                                                            <td>
                                                                <button onClick={()=>deleteProduct(item.id)} className="btn btn-danger">Delete</button>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                        )
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
export default AllProducts