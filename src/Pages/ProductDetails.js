import React, {useState, useRef} from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { cartActions } from "../redux/slices/cartSlice";
import {toast} from "react-toastify"

import products from "../assets/data/products";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import ProductsList from "../UI/ProductsList"

import "../Styles/ProductDetailt.css"
const ProductDetailt = () => {
    const {id} = useParams()
    const product = products.find(item => item.id === id)
    const {productName, imgUrl, category, price, shortDesc, description, reviews, avgRating} = product
    
    const [tab, setTab] = useState('desc');

    const [rating, setRating] = useState(null);
    const relatedProducts = products.filter(item => item.category === category)
    
    
    const reviewUser = useRef('')
    const reviewMsg = useRef('')
    const submitHandler = (e) => {
        e.preventDefault();
        const reviewUserName = reviewUser.current.value;
        const reviewUserMsg = reviewMsg.current.value;

        const reviewObj = {
            userName: reviewUserName,
            text: reviewUserMsg,
            rating, 
        }
        console.log(reviewObj)
        toast.success(`Review submited ${reviewObj.userName}, ${reviewObj.text}, ${reviewObj.rating}`)
    }
    
    const dispatch = useDispatch()
    const addToCart = () => {
        dispatch(cartActions.addItem({
            id,
            image: imgUrl,
            productName,
            price
        }))
        toast.success('Product added successfully')
    }

    return(
        <>
            <Helmet title={productName}>
                <CommonSection title={productName}/>
                <section className="products">
                    <Container>
                        <Row>
                            <Col lg='6'>
                                <img src={imgUrl} alt=''/>
                            </Col>
                            <Col lg='6'>
                                <div className="products__details">
                                    <h2>{productName}</h2>
                                    <div className="products__rating">
                                        <div>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-s-fill"></i></span>
                                            <span><i className="ri-star-half-s-fill"></i></span>
                                        </div>
                                        <p>
                                            (<span>{avgRating}</span>ratings)
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex align-items-center">
                                    <span className="product__price">${price}</span>
                                    <span>Category: {category}</span>
                                </div>
                                <p className="mt-3">{shortDesc}</p>
                                <motion.button 
                                    onClick={addToCart} 
                                    whileTap={{scale: 1.1}} 
                                    className="shop__btn">Add to Cart</motion.button>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section >
                    <Container>
                        <Row>
                            <Col lg='12'>
                                <div className="tab__wrapper">
                                    <h6 className={`${tab === 'desc' ? 'active__tab' : ''}`} onClick={()=>setTab('desc')}>Description</h6>
                                    <h6 className={`${tab === 'rew' ? 'active__tab' : ''}`} onClick={()=>setTab('rew')}>Reviews ({reviews.length})</h6>
                                </div>
                                {
                                    tab === 'desc' ? 
                                    (
                                        <div className="tab__content mt-4">
                                            <p>{description}</p>
                                        </div>) 
                                    : (<div className="products__wrapper mt-4">
                                        <div className="review__wrapper">
                                            <ul>
                                                {
                                                    reviews.map((item, index) => {
                                                        return(
                                                            <li key={index} className="mb-4">
                                                                <h6>Jhon Doe</h6>
                                                                <span>{item.rating} (rating)</span>
                                                                <p>{item.text}</p>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <div className="review__form">
                                                <h4>Leave your experience</h4>
                                                <form action="" onSubmit={submitHandler}>
                                                    <div className="form__group">
                                                        <input 
                                                            ref={reviewUser}
                                                            required
                                                            type='text'
                                                            autoComplete="off"
                                                            value=""
                                                            nam=""
                                                            onChange={null}
                                                            placeholder="Enter email"      
                                                        />
                                                    </div>
                                                    <div className="form__group d-flex align-items-center gap-5 rating__group">
                                                        <motion.span whileTap={{scale: 1.2}} onClick={()=>setRating(1)}>1<i className="ri-star-s-fill"></i></motion.span>
                                                        <motion.span whileTap={{scale: 1.2}} onClick={()=>setRating(2)}>2<i className="ri-star-s-fill"></i></motion.span>
                                                        <motion.span whileTap={{scale: 1.2}} onClick={()=>setRating(3)}>3<i className="ri-star-s-fill"></i></motion.span>
                                                        <motion.span whileTap={{scale: 1.2}} onClick={()=>setRating(4)}>4<i className="ri-star-s-fill"></i></motion.span>
                                                        <motion.span whileTap={{scale: 1.2}} onClick={()=>setRating(5)}>5<i className="ri-star-s-fill"></i></motion.span>
                                                    </div>
                                                    <div className="form__group">
                                                        <textarea 
                                                            ref={reviewMsg} 
                                                            rows={4} 
                                                            type='text' 
                                                            placeholder="Review Message..."
                                                        />
                                                    </div>
                                                    <motion.button 
                                                    type="submit" 
                                                    whileTap={{scale: 1.1}} 
                                                    className="add__btn">Submit</motion.button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </Col>
                            <Col lg='12' className="">
                                <div className="related__title">You might  also like</div>
                            </Col>
                            <ProductsList data={relatedProducts}/>
                        </Row>
                    </Container>
                </section>
            </Helmet>
        </>
    )
}
export default ProductDetailt