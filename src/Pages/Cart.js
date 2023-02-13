import React from "react";
import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import {cartActions} from "../redux/slices/cartSlice";
import { useSelector, useDispatch } from "react-redux";

import CommonSection from "../UI/CommonSection";
import Helmet from "../Components/Helmet/Helmet"
import "../Styles/Cart.css";
import { Link } from "react-router-dom";
const Cart = () => {
    const cartItems = useSelector(state => state.cart.cartItems);

    const totalAmount = useSelector(state => state.cart.totalAmount)
    return(
        <>
            <Helmet>
                <CommonSection title='Shopping Cart'/>
                <section className="shopping__cart">
                    <Container>
                        <Row>
                            <Col lg='9'>
                                {
                                    cartItems.length === 0 ? (<h2 className="fs-4 text-center">No item added to the cart</h2>)
                                    : (<table className="table bordered">
                                            <thead>
                                                <tr>
                                                    <th>Images</th>
                                                    <th>Title</th>
                                                    <th>Price</th>
                                                    <th>Qty</th>
                                                    <th>Delete</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    cartItems.map((item, index) => {
                                                        return(
                                                            <Tr item={item} key={index}/>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>)
                                }
                            </Col>
                            <Col lg='3'>
                                <div className="total__amount d-flex align-items-center justify-content-between">
                                    <h6>Subtotal</h6>
                                    <span className="fs-4 fw-bold">${totalAmount}</span>
                                </div>
                                <p className="fs-6 mt-2">taxes and shipping will calculate in checkout</p>
                                <div>
                                    <button className="shop__btn w-100">
                                        <Link to='/shop'>Continue Shopping</Link>
                                    </button>
                                    <button className="shop__btn w-100 ">
                                        <Link to='/checkout'>Checkout</Link>
                                    </button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </Helmet>
        </>
    )
}

const Tr = ({item}) => {
    const dispatch = useDispatch()
    const deleteProduct = () =>{
        dispatch(cartActions.deleteItem(item.id))
    }
    return(
        <tr>
            <td><img src={item.imgUrl} alr=''/></td>
            <td>{item.productName}</td>
            <td>${item.price}</td>
            <td>{item.quantity}px</td>
            <td><motion.i whileTap={{scale: 1.2}} onClick={deleteProduct} className="ri-delete-bin-line"></motion.i></td>
        </tr>
    )
}
export default Cart