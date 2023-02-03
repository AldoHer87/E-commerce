import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, InputGroup, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterProductsCategoryThunk, filterProductsTitleThunk, getProductsThunk } from '../store/slices/products.slice';
import '../styles/home-screen.css'


const Home = () => {

    const dispatch = useDispatch();
    const productsList = useSelector(state => state.products);
    const [categories, setCategories] = useState([]);
    const [productSearch, setProductSearch] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk());

        axios.get('https://e-commerce-api-v2.academlo.tech/api/v1/categories/')
            .then(res => setCategories(res.data))
    }, [])

    console.log(categories)

    return (
        <div className='home'>
            <Row>
                {/* Categories */}
                <Col style={{paddingTop: "2em", paddingRight: "2rem"}} lg={3}>
                    <h1 style={{fontSize: "20px"}}>Categories</h1>
                    <ListGroup>
                        {
                            categories.map(category => (
                                <ListGroup.Item
                                    onClick={() => dispatch(filterProductsCategoryThunk(category.id))}
                                    key={category.name}
                                    style={{ cursor: "pointer" }}
                                >
                                    {category.name}
                                </ListGroup.Item >
                            ))
                        }
                    </ListGroup>
                </Col>

                {/* Products */}
                <Col lg={9}>
                    <h1>Home</h1>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Category"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={productSearch}
                            onChange={e => setProductSearch(e.target.value)}
                        />
                        <Button
                            onClick={() => dispatch(filterProductsTitleThunk(productSearch))}
                            variant="outline-secondary"
                            id="button-addon2"
                        >
                            Search
                        </Button>
                    </InputGroup>
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {productsList.map(product => (
                            <Col>
                                <Card key={product.id} style={{cursor: "pointer", gap: "2rem", height: "100%" }} onClick={() => navigate(`/product/${product.id}`)}>
                                    <Card.Img style={{ height: 200, objectFit: "contain", padding: "1rem", height: "200px" }} variant="top" src={product.images[0].url}  />
                                    <Card.Body>
                                        <Card.Title>{product.title}</Card.Title>
                                        <Card.Title><b>${product.price}</b></Card.Title>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Home;