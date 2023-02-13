
import React, {useState} from "react";
import { toast } from "react-toastify";
import {Container, Row, Col, Form, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";

import {db, storage} from "../Firebase.config"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";


const AddProducts = () => {
    const [enterTitle, setEnterTitle] = useState('');
    const [enterShortDesc, setEnterShortDesc] = useState('');
    const [enterDescription, setEnterDescription] = useState('');
    const [enterCategory, setEnterCategory] = useState('');
    const [enterPrice, setEnterPrice] = useState('');
    const [enterProductImg, setEnterProductImg] = useState(null);

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const addProduct = async(e) => {
        e.preventDefault()
        setLoading(true)

        // const product ={
        //     title: enterTitle,
        //     shortDesc: enterShortDesc,
        //     description: enterDescription,
        //     category: enterCategory,
        //     price: enterPrice,
        //     imgUrl: enterProductImg,
        // }

        try{
            const docRef = await collection(db, 'products')
            const storageRef = ref(storage, `productImages/${Date.now() + enterProductImg.name}`)
            const uploadTask = uploadBytesResumable(storageRef, enterProductImg)
            uploadTask.on(()=>{
                toast.err('images not uploaded!')
            }, ()=>{
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=>{
                    await addDoc(docRef, {
                        title: enterTitle,
                        shortDesc: enterShortDesc,
                        description: enterDescription,
                        category: enterCategory,
                        price: enterPrice,
                        imgUrl: downloadURL,
                    })
                })
            })
            setLoading(false)
            toast.success('product successfrully added!');
            navigate('/dashboard/all-products')
        }catch(err){
            toast.err('product not added!')
            setLoading(false)
        }
    }
    return(
        <>
            <section>
                <Container>
                    <Row>
                        <Col lg='12'>
                            <h4>Add Products</h4>
                            {
                                loading ? (
                                    <div className="text-center">
                                        <h5>Loading...</h5>
                                    </div>
                                ) : (
                                    <Form onSubmit={addProduct}>
                                        <FormGroup className="form__group">
                                            <span>Product title</span>
                                            <input required type='text' value={enterTitle} onChange={(e) => setEnterTitle(e.target.value)} placeholder="Double sofa"/>
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Short Description</span>
                                            <input required type='text' value={enterShortDesc} onChange={(e) => setEnterShortDesc(e.target.value)} placeholder="Lorem..."/>
                                        </FormGroup>
                                        <FormGroup className="form__group">
                                            <span>Description</span>
                                            <input required type='text' value={enterDescription} onChange={(e) => setEnterDescription(e.target.value)} placeholder="Description..."/>
                                        </FormGroup>
                                        <div className="d-flex align-items-senter justify-content-between gap-5">
                                            <FormGroup className="form__group w-50">
                                                <span>Price</span>
                                                <input required type='number' value={enterPrice} onChange={(e) => setEnterPrice(e.target.value)} placeholder="$100"/>
                                            </FormGroup>
                                            <FormGroup className="form__group w-50">
                                                <span>Category</span>
                                                <select value={enterCategory} onChange={(e) => setEnterCategory(e.target.value)} className="w-100 p-2">
                                                    <option>Category</option>
                                                    <option value='chair'>Chair</option>
                                                    <option value='sofa'>Sofa</option>
                                                    <option value='mobile'>Mobile</option>
                                                    <option value='watch'>Watch</option>
                                                    <option value='wireless'>Wireless</option>
                                                </select>
                                            </FormGroup>
                                        </div>
                                        <div>
                                            <FormGroup className="form__group">
                                                <span>Product Images</span>
                                                <input required onChange={(e) => setEnterProductImg(e.target.files[0])} type='file'/>
                                            </FormGroup>
                                        </div>
                                        <button className="buy__btn mt-3" type="submit">Add Product</button>
                                    </Form>
                                )
                            }
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    )
}
export default AddProducts