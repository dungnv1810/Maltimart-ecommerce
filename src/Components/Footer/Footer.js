import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";

import "./Footer.css"
import logo from "../../assets/images/eco-logo.png"
const Footer = () => {
    const year = new Date().getFullYear()
    return(
        <>
            <section className="footer">
                <Container>
                    <Row>
                        <Col lg='4' md='6' className="mb-4">
                            <div className="logo">
                                <div>
                                    <h1 className="text-white">Multimart</h1>
                                </div>
                            </div>
                                <p className="footer__text mt-4">
                                    Lorem ipsum dolor sit amet consectetur, adipisicing 
                                    elit. Quaerat nulla repellat quo eaque alias corporis
                                    Laboriosam repellendus odit fugit eos! Id, labore.
                                </p>
                        </Col>
                        <Col lg='3' md='3' className="mb-4">
                            <div className="footer__quick-link">
                                <h4 className="quick__link-title">Top Categories</h4>
                                <ListGroup>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Mobile Phone</Link>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Modern Sofa</Link>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Arm Chair</Link>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Amart Watches</Link>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>
                        <Col lg='2' md='3' className="mb-4">
                            <div className="footer__quick-link">
                                <h4 className="quick__link-title">Useful Links</h4>
                                <ListGroup>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Shop</Link>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Cart</Link>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Login</Link>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0">
                                        <Link to='#'>Privacy Policy</Link>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>
                        <Col lg='3' md='4'>
                            <div className="footer__quick-link">
                                <h4 className="quick__link-title">Contact</h4>
                                <ListGroup className="footer__contact">
                                    <ListGroupItem className="ps-0 border-0 list__item">
                                        <span><i className="ri-map-pin-line"></i></span>
                                        <p>Phu Do, Nam Tu Niem, HaNoi, VietNam</p>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0 list__item">
                                        <span><i className="ri-phone-line"></i></span>
                                        <p>0345 630 366</p>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0 list__item">
                                        <span><i className="ri-mail-line"></i></span>
                                        <p>dungcoi459@gmail.com</p>
                                    </ListGroupItem>
                                    <ListGroupItem className="ps-0 border-0">
                                        <span></span>
                                    </ListGroupItem>
                                </ListGroup>
                            </div>
                        </Col>
                        <Col lg='12' className="text-center">
                            <p className="footer__copyright">
                                Copyright {year} developped by Muhibur Rahman. All right reserved
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default Footer