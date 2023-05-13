import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import Message from '../components/Message';
import { addToCart, removeFromCart } from '../slices/cartSlice';




const CartScreen = () => {
    //STATE 
    const navigate = useNavigate();
    const dispatch = useDispatch();

    //Global state
    const cart = useSelector((state) => state.cart);
    const { cartItems } = cart;



    //FUNCTIONS:
    //To add to cardhandler
    const addToCartHandler = async (product, qty) => {
        dispatch(addToCart({...product, qty}));
    };

    // To remove items from cart
    const removeFromCartHandler = async (id) => {
        dispatch(removeFromCart(id));
    };

    // TO check out handler
    const checkOutHandler = () => {
        navigate('/login?redirect/shipping');
    };



    // RENDERED ELEMENTS
    return (
    <Row>
        {/* Col 1 */}
        <Col md={8}>
            <h1 style={{marginBottom: '20px'}}>Panier</h1>
            {cartItems.length === 0 ? (
                <Message>
                    Votre panier est vide <Link to='/'>Retour à l'accueil</Link>
                </Message>
            ) : (
                <ListGroup variant='flush'>
                    {cartItems.map((item) => (
                        <ListGroup.Item key={item._id}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} alt={item.name} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                   <Link to={`/product/${item._id}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    {item.price}€
                                </Col>
                                <Col md={2}>
                                    <Form.Control
                                    as='select'
                                    value={item.qty}
                                    onChange={(e) => addToCartHandler(item, Number(e.target.value))}
                                    >
                                        {[...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x + 1} value={x + 1}>
                                                {x + 1}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button 
                                    type='button' 
                                    variant='light'
                                    onClick={() => removeFromCartHandler(item._id)}
                                    >
                                        <FaTrash/>
                                    </Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>

        {/* Col 2 */}
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>
                            Total {cartItems.reduce((acc, item) => acc + item.qty, 0)} article(s)
                        </h2>
                        {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}€
                    </ListGroup.Item>
                    <ListGroup.Item className='d-flex justify-content-center'>
                        <Button 
                        type='button' 
                        className='btn-block' 
                        disabled={cartItems.length === 0}
                        onClick={checkOutHandler}
                        >
                            Valider mon panier
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    )
}

export default CartScreen