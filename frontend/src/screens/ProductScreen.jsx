import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Row, 
    Col, 
    Image, 
    ListGroup, 
    Card, 
    Button,
    Form
} from 'react-bootstrap';
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";
import { useDispatch, useSelector } from "react-redux";
import {addToCart} from '../slices/cartSlice';
import {toast} from 'react-toastify';


import { 
    useGetProductDetailsQuery, 
    useCreateReviewMutation 
} from "../slices/productsApiSlice";




const ProductScreen = () => {
    const { id: productId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();
  
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
   

    // Data from global state
    const {
      data: product,
      isLoading,
      refetch,
      error,
    } = useGetProductDetailsQuery(productId);

    const [
        createReview, 
        {isLoading: loadingProductReview}
    ] = useCreateReviewMutation();

    const {userInfo} = useSelector((state) => state.auth);
  
    // FUNCTIONS:
    //Function to add items in cart
    const addToCartHandler = () => {
        dispatch(addToCart({ ...product, qty }));
        navigate('/cart');
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        try {
            await createReview({productId, rating, comment}).unwrap();
            refetch();
            toast.success('Merci pour votre avis');
            setComment('');
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };
    
    // RENDERED ELEMENTS
    return (
        <>
            <Link className="btn btn-light my-3" to='/'>Retour</Link>

            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error.data?.message || error.error}</Message>
            ) : (
                <>
                     <Meta title={product.name}/>
                    <Row>
                        <Col md={5}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>

                        <Col md={4}>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={`${product.numReviews} avis`}/>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Prix: {product.price}€
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>

                        <Col md={3}>
                            <Card>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Prix:</Col>
                                            <Col>
                                                <strong>{product.price}€</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>stock:</Col>
                                            <Col>
                                                <strong>{product.countInStock > 0 ? 'Disponible' : 'Épuisé' }</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Quantité</Col>
                                                <Col>
                                                <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                                >
                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))}
                                                </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item className='d-flex justify-content-center'>
                                        <Button
                                        className="btn btn-block"
                                        type='button'
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                        >
                                            + Panier
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>

                    <Row className="review">
                        <Col md={6}>
                            <h2>Avis</h2>
                            {product.reviews.length === 0 && <Message variant='info'>Aucun avis</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map((review) => (
                                   <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating}/>
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                   </ListGroup.Item> 
                                ))}

                                <ListGroup.Item>
                                    <h2>Laisser votre avis</h2>

                                    {loadingProductReview && <Loader/>}
                                    
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating' className='my-2'>
                                                <Form.Label>Avis</Form.Label>
                                                <Form.Control
                                                as='select'
                                                value={rating}
                                                onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value="">Choisir...</option>
                                                    <option value="1">1 étoile</option>
                                                    <option value="2">2 étoiles</option>
                                                    <option value="3">3 étoiles</option>
                                                    <option value="4">4 étoiles</option>
                                                    <option value="5">5 étoiles</option>
                                                </Form.Control>
                                            </Form.Group>

                                            <Form.Group controlId="comment" className='my-2'>
                                                <Form.Label>Commentaire</Form.Label>
                                                <Form.Control
                                                as='textarea'
                                                row='3'
                                                placeholder="Laisser un commentaire"
                                                onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>

                                            <Button 
                                            disabled={loadingProductReview} 
                                            variant="primary"
                                            type='submit'>
                                                Envoyer
                                            </Button>

                                        </Form>
                                    ) : (
                                        <Message>
                                           veuillez <Link to='/login'>vous connecter</Link> pour laisser un avis.{ ''}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            ) }    
        </>
    );
};

export default ProductScreen;