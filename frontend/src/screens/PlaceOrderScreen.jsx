
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import {Button, Row, ListGroup, Col, Card, Image} from 'react-bootstrap';
import CheckoutSteps from '../components/CheckoutSteps';
import {toast} from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';


import {useCreateOrderMutation} from '../slices/ordersApiSlice';
import { clearCartItems } from '../slices/cartSlice';



const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }else if(!cart.paymentMethod){
            navigate('/payment');
        }

    }, [cart.shippingAddress.address, cart.paymentMethod, navigate]);

    //FUNCTIONS/
    const placeOrderHandler = async () => {
        try {
          const res = await createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
          }).unwrap();
          dispatch(clearCartItems());
          navigate(`/order/${res._id}`);
        } catch (err) {
          toast.error(err);
        }
    };

    return (
        <>
        <CheckoutSteps step1 step2 step3 step4/>

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                           <h2>Livraison</h2> 
                            <p>
                                <strong>Adresse: </strong>
                                {cart.shippingAddress.address},{' '}
                                {cart.shippingAddress.city},{' '}
                                {cart.shippingAddress.postalCode},{' '}
                                {cart.shippingAddress.country}
                           </p> 
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <h2>Paiement</h2> 
                            <strong>Méthode: </strong>
                            {cart.paymentMethod}
                        </ListGroup.Item>
                        <ListGroup.Item>
                           <h2>Commande</h2> 
                            {cart.cartItems.lenght === 0 ? (
                                <Message>Votre panier est vide</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                               <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded/>
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item._id}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col> 
                                                <Col md={4}>
                                                    {item.qty} x {item.price}€ = {item.qty * item.price}€
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
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
                                        {cart.itemsPrice}€
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Livraison:</Col>
                                    <Col>
                                        {cart.shippingPrice}€
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                <Col>TVA:</Col>
                                <Col>{cart.taxPrice}€</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                <Col>Total:</Col>
                                <Col>{cart.totalPrice}€</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                {error && <Message variant='danger'>{error}</Message>}
                            </ListGroup.Item>

                            <ListGroup.Item className='d-flex justify-content-center'>
                                <Button 
                                type='button' 
                                className='btn-block'
                                disabled={cart.cartItems.lenght === 0}
                                onClick={placeOrderHandler}
                                >
                                    Valider la commande
                                </Button>

                                {isLoading && <Loader/>}
                            </ListGroup.Item>
                        </ListGroup>

                    </Card>
                </Col>
            </Row>
        </>
    );
};

export default PlaceOrderScreen;


