
import {Link, useParams} from 'react-router-dom';
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader'


import {useGetOrderDetailsQuery} from '../slices/ordersApiSlice';



const OrderScreen = () => {
    const { id: orderId } = useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);

    return isLoading ? <Loader/> : error ? <Message variant='danger'></Message>
    : (
        <>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Livraison</h2>
                            <p>
                                <strong>Name: </strong> {order.user.name}
                            </p>
                            <p>
                                <strong>E-mail: </strong> {order.user.email}
                            </p>
                            <p>
                                <strong>Adresse: </strong> 
                                {order.shippingAddress.address}, {order.shippingAddress.city}, {' '}
                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                            </p>

                            {order.isDelivered ? (
                                <Message variant='success'>Livré le {order.deliveredAt}</Message>
                            ) : (
                                <Message variant='danger'>Non Livré</Message>
                            )}
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <h2>Méthode de Paiment</h2>
                            <p>
                                <strong>Méthode: </strong> 
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? (
                                <Message variant='success'> Réglé le {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Non réglé</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Article(s) commandé(s)</h2>
                            {order.orderItems.map((item, index) => (
                                <ListGroup.Item key={index}>
                                    <Row>
                                        <Col md={1}>
                                            <Image src={item.image} alt={item.name} fluid rounded/>
                                        </Col>
                                        <Col>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name} {' '}
                                            </Link>
                                        </Col>
                                        <Col md={4}>
                                            {item.qty} x {item.price}€ = {item.qty * item.price}€
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Récapitulatif</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Article(s):</Col>
                                    <Col>
                                        {order.itemsPrice}€
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Livraison:</Col>
                                    <Col>
                                        {order.shippingPrice}€
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                <Col>TVA:</Col>
                                <Col>{order.taxPrice}€</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                <Col>Total:</Col>
                                <Col>{order.totalPrice}€</Col>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen;


