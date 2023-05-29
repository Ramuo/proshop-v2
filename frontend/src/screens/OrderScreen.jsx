
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';


import {
  useGetOrderDetailsQuery,
  useGetPaypalClientIdQuery,
  usePayOrderMutation,
  useDeliverOrderMutation
} from '../slices/ordersApiSlice';





const OrderScreen = () => {
    const { id: orderId } = useParams();

    const {
        data: order,
        refetch,
        isLoading,
        error,
    } = useGetOrderDetailsQuery(orderId);


    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();

    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation();

    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();

    const {
        data: paypal, 
        isLoading: loadingPayPal, 
        error: errorPayPal
    } = useGetPaypalClientIdQuery();

    const {userInfo} = useSelector((state) => state.auth);
        
    useEffect(() => {
        if(!errorPayPal  && !loadingPayPal && paypal.clientId){
            const loadPayPalScript = async () => {
                paypalDispatch({
                    type: 'resetOptions',
                    value: {
                        'client-id': paypal.clientId,
                        currency: 'EUR',
                    },
                });
                paypalDispatch({
                    type: 'setLoadingStatus',
                    value: 'pending'
                });
            };
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadPayPalScript();
                }
            };
        }

    }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

    //FUNCTIONS/

    function onApprove(data, actions) {
        return actions.order.capture().then( async function (details){
            try {
                await payOrder({orderId, details});
                refetch();
                toast.success("Paiement réussi");
            } catch (err) {
                toast.error(err?.data?.message || err.message) ;
            }
        });
    };

    //TO TEST PAYPAL PAYMENT
    // async function onApproveTest () {
    //     await payOrder({orderId, details: {payer: {} } });
    //     refetch();
    //     toast.success("Paiement réussi");
    // };

    function onError (err) {
        toast.error(err.message);
    };

    function createOrder (data, actions){
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice,
                    },
                },
            ],
        }).then((orderId) => {
            return orderId;
        });
    };

    const delivereOrderHandler = async () => {
        try {
            await deliverOrder(orderId);
            refetch();
            toast.success("Command Livré");
        } catch (err) {
            toast.error(err?.data?.message || err.message);
        }
    };



    //RENDERED ELEMENTS

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
                                <Message variant='success'> Payé le {order.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Non payé</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Articles commandés</h2>
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
                                <h2>Ma commande</h2>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Prix:</Col>
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

                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader/>}

                                    {isPending ? (
                                        <Loader/>
                                    ) : (
                                        <div>
                                            {/* <Button 
                                            onClick={onApproveTest} 
                                            style={{marginBottom : '10px'}}
                                            >
                                                Tester paiement
                                            </Button> */}

                                            <div>
                                                <PayPalButtons
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                ></PayPalButtons>
                                            </div>
                                        </div>
                                    )}
                                </ListGroup.Item>
                            )}

                            {loadingDeliver && <Loader/>}

                            {userInfo && 
                            userInfo.isAdmin && 
                            order.isPaid && 
                            !order.isDelivered && (
                                <ListGroup.Item>
                                    <Button 
                                    type='button' 
                                    className='btn btn-block'
                                    onClick={delivereOrderHandler}
                                    >
                                        Marquer comme livré
                                    </Button>
                                </ListGroup.Item>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default OrderScreen;


