import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
    Row, 
    Col, 
    Image, 
    ListGroup, 
    Card, 
    Button
} from 'react-bootstrap';
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";



const ProductScreen = () => {
    // STATE
    const {id: productId} = useParams();
    const {data: product, isLoading, error} = useGetProductDetailsQuery(productId);


    // FUNCTIONS:


    // RENDERED ELEMENTS
    return (
        <>
            <Link className="btn btn-light my-3" to='/'>Retour</Link>

            {isLoading ? (
                <Loader/>
            ) : error ? (
                <Message variant='danger'>{error.data?.message || error.error}</Message>
            ) : (
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
                                <ListGroup.Item className='d-flex justify-content-center'>
                                    <Button
                                    className="btn btn-block"
                                    type='button'
                                    disabled={product.countInStock === 0}
                                    >
                                        + Panier
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            ) }
            
        </>
    );
};

export default ProductScreen;