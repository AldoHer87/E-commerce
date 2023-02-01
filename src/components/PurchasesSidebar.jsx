import React, { useEffect } from 'react';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk } from '../store/slices/cart.slice,';

const PurchasesSidebar = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getCartThunk());
    }, [])

    return (
        <Offcanvas placement="end" show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Your Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Row lg={1} className="g-3">
                {cart.map(cart => (
                    <Col>
                        <Card key={cart.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${purchases.product.id}`)}>
                            <Card.Img style={{ height: 200, objectFit: "contain", padding: "1rem" }} variant="top" src={cart.product.images[0].url} />
                            <Card.Body>
                                <Card.Title>{cart.product.title}</Card.Title>
                                <Card.Text>
                                    <b>{cart.product.price}</b>
                                </Card.Text>
                                <Button variant="danger">Delete</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            </Offcanvas.Body>
        </Offcanvas>
    );
};

export default PurchasesSidebar;