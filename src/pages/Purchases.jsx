import React, { useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';

const Purchases = () => {

    const purchases = useSelector(state => state.purchases)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [])


    return (
        <div>
            <h1>Purchases</h1>
            <Row xs={1} md={2} lg={3} className="g-4    ">
                {purchases.map(purchases => (
                    <Col >
                        <Card key={purchases.id} style={{ cursor: "pointer", height: "350px", boxShadow: "2px 2px 8px rgb(0 0 0 / 20%)", }} onClick={() => navigate(`/product/${purchases.product.id}`)}>
                            <Card.Img style={{ height: 200, objectFit: "contain", padding: "1rem", height: "200px" }} variant="top" src={purchases.product?.images[0].url} />
                            <hr />
                            <Card.Body>
                                <Card.Title>{purchases.product?.title}</Card.Title>
                                <Card.Text >
                                    <b>{purchases.product?.price}</b>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div >
    );
};

export default Purchases;