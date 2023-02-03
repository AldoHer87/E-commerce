import React, { useEffect } from 'react';
import { Button, Card, Col, Offcanvas, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartThunk, toPurchasesThunk } from '../store/slices/cart.slice,';

const PurchasesSidebar = ({ show, handleClose }) => {

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    let total = 0;
    cart.forEach(product => {
        const productTotal = Number(product.product.price) * product.quantity;
        total += productTotal
    })

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
                            <Card key={cart?.id} style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${purchases.product.id}`)}>
                                <Card.Img style={{ height: 200, objectFit: "contain", padding: "1rem" }} variant="top" src={cart.product?.images[2].url} />
                                <Card.Body>
                                    <Card.Title>{cart.product?.title}</Card.Title>
                                    <hr />
                                    <Card.Text>
                                        <b>Price: ${cart.product?.price}</b>
                                        <br />
                                        <b>Quantity: {cart.quantity}</b>
                                    </Card.Text>
                                    {/* <Button variant="danger">Delete</Button> */}
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Offcanvas.Body>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Total</Card.Title>
                    <Card.Text>
                        <h2>${total.toFixed(2)}</h2>
                    </Card.Text>
                    <Button onClick={() => dispatch(toPurchasesThunk())} variant="primary" style={{width: "80%"}}>Checkout</Button>
                </Card.Body>
            </Card>
        </Offcanvas>
    );
};

export default PurchasesSidebar;