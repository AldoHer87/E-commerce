import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Card, Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addCartThunk } from '../store/slices/cart.slice,';
import { filterProductsCategoryThunk } from '../store/slices/products.slice';

const ProductDetail = () => {

    const { id } = useParams();
    const [product, setProduct] = useState({});
    const dispatch = useDispatch();
    const releatedProducts = useSelector(state => state.products);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}/`)
            .then(res => {
                setProduct(res.data)
                dispatch(filterProductsCategoryThunk(res.data.categoryId))
            });
    }, [id])

    const [rate, setRate] = useState("");

    const addToCart = (id) => {
        const cartAdd = {
            quantity: rate,
            productId: product.id
        }
        dispatch(addCartThunk(cartAdd));
    }

    return (
        <div>
            <h1>{product.brand}</h1>
            <h2>{product.title}</h2>
            <Row>
                {/* Prodduct Description */}
                <Col lg={7}>
                    <Carousel variant='dark'>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={product.images?.[0].url}
                                alt="First slide"
                                style={{ height: 500, objectFit: "contain", padding: "2rem" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={product.images?.[1].url}
                                alt="Second slide"
                                style={{ height: 500, objectFit: "contain", padding: "2rem" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={product.images?.[2].url}
                                alt="Third slide"
                                style={{ height: 500, objectFit: "contain", padding: "2rem" }}
                            />
                        </Carousel.Item>
                    </Carousel>
                </Col>
                <Col style={{ paddingTop: "2rem" }} lg={5}>
                    <h1>${product.price}</h1>
                    <br />
                    <input
                        type="number"
                        value={rate}
                        onChange={e => setRate(e.target.value)}
                        style={{ height: "45px" }}
                    />
                    <Button onClick={addToCart} variant="primary">Add to cart</Button>
                    <br />
                    <br />
                    <p>{product.description}</p>
                </Col>
            </Row>
            <br />
            <br />
            <br />
            {/* Releated Products */}
            <div><h3>Releated Products</h3></div>
            <Row xs={1} md={2} lg={2} className="g-4">
                {
                    releatedProducts.map(productReleated => (
                    <Col>
                        <Card style={{height: "100%", textAlign: "center"}} key={productReleated.id} onClick={() => navigate(`/product/${productReleated.id}`)}>
                            <Card.Img variant="top" src={productReleated.images?.[0].url} alt="" className='img-fluid' style={{ height: "10rem", objectFit: "contain", textAlign: "right", flexDirection: "row", justifyContent: "right", alignItems: "right", paddingTop: "2rem" }} />
                            <Card.Body>
                                <Card.Title>{productReleated.title}</Card.Title>
                                <Card.Title>{productReleated.price}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                    ))
                }
            </Row>

        </div>
    );
};

export default ProductDetail;