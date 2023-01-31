import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Carousel, Col, ListGroup, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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

    console.log(product)

    return (
        <div>
            <h1>{product.brand}</h1>
            <h2>{product.title}</h2>
            <Row>
                {/* Prodduct Description */}
                <Col lg={9}>
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
                    <p>{product.description}</p>
                </Col>

                {/* Releated Products */}
                <Col lg={3}>
                    <h3>Releated Products</h3>
                    <ListGroup variant="flush" style={{ cursor: "pointer" }}>
                        {
                            releatedProducts.map(productReleated => (
                                <ListGroup.Item key={productReleated.id} onClick={() => navigate(`/product/${productReleated.id}`)}>
                                    {productReleated.title}
                                    <img src={productReleated.images?.[0].url} alt="" className='img-fluid' style={{ height: 50, objectFit: "contain", textAlign: "right", flexDirection: "row", justifyContent: "right", alignItems: "right" }} />
                                </ListGroup.Item>
                            ))
                        }
                    </ListGroup>

                </Col>
            </Row>

        </div>
    );
};

export default ProductDetail;