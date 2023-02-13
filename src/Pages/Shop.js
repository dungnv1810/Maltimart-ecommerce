import React, {useState} from "react";
import { Container, Row, Col } from "reactstrap";

import "../Styles/Shop.css"
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../UI/CommonSection";
import ProductList from "../UI/ProductsList"

import products from "../assets/data/products"
const Shop = () => {
    const [productsData, setProductsData] = useState(products)
    const handleFilter = (e) => {
        const filtervalue = e.target.value
        if(filtervalue === 'sofa'){
            const filterProducts = products.filter(item => item.category === 'sofa');
            setProductsData(filterProducts)
        }else if(filtervalue === 'mobile'){
            const filterProducts = products.filter(item => item.category === 'mobile');
            setProductsData(filterProducts)
        }else if(filtervalue === 'chair'){
            const filterProducts = products.filter(item => item.category === 'chair');
            setProductsData(filterProducts)
        }if(filtervalue === 'watch'){
            const filterProducts = products.filter(item => item.category === 'watch');
            setProductsData(filterProducts)
        }
        if(filtervalue === 'wireless'){
            const filterProducts = products.filter(item => item.category === 'wireless');
            setProductsData(filterProducts)
        }
        // if(filtervalue === 'mobile'){
        //     const filterProducts = products.filter(item => item.category === 'mobile');
        //     setProductsData(filterProducts)
        // }
        // if(filtervalue === 'chair'){
        //     const filterProducts = products.filter(item => item.category === 'chair');
        //     setProductsData(filterProducts)
        // }
        // if(filtervalue === 'watch'){
        //     const filterProducts = products.filter(item => item.category === 'watch');
        //     setProductsData(filterProducts)
        // }
        // if(filtervalue === 'wireless'){
        //     const filterProducts = products.filter(item => item.category === 'wireless');
        //     setProductsData(filterProducts)
        // }
    }

    const handleSearch = (e) =>{
        const searchTerm = e.target.value
        const searchProducts = 
        products.filter(item => item.productName.toLowerCase()
        .includes(searchTerm.toLowerCase()));
        setProductsData(searchProducts)
    }
    return(
        <>
            <Helmet title={'Shop'}>
                <CommonSection title={'Products'}/>
                <section className="select__search">
                    <Container>
                        <Row>
                            <Col lg='3' md='6'>
                                <div className="filter__widget">
                                    <select onChange={handleFilter}>
                                        <option>Filter By Category</option>
                                        <option value='sofa'>Sofa</option>
                                        <option value='mobile'>Mobile</option>
                                        <option value='chair'>Chair</option>
                                        <option value='watch'>Watch</option>
                                        <option value='wireless'>Wireless</option>
                                    </select>
                                </div>
                            </Col>
                            <Col lg='3' md='6' className="text-end">
                                <div className="filter__widget">
                                    <select>
                                        <option>Sort By</option>
                                        <option value='ascending'>Ascending</option>
                                        <option value='descending'>Descending</option>
                                    </select>
                                </div>
                            </Col>
                            <Col lg='6' md='12'>
                                <div className="search__box">
                                    <input onChange={handleSearch} type='text' placeholder="Search....."/>
                                    <span><i className="ri-search-line"></i></span>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
                <section className="products__data">
                    <Container>
                        <Row>
                            {
                                productsData.length === 0 ? 
                                (<h1 className="text-center">No products are found!</h1>) 
                                : (<ProductList data={productsData}/>)
                            }
                        </Row>
                    </Container>
                </section>
            </Helmet>
        </>
    )
}
export default Shop