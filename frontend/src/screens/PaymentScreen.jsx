import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {Form, Button, Col} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import {savePaymentMethod} from '../slices/cartSlice';




const PaymentScreen = () => {
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);
    const {shippingAddress} = cart;


    useEffect(() => {
        if(!shippingAddress){
            navigate('/shipping');
        }
    }, [shippingAddress, navigate]);


    //FUNCTIONS
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    return (
        <FormContainer>
           <CheckoutSteps step1 step2 step3/>

            <h1>Paiement</h1>

            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Methode de paiement</Form.Label>
                    <Col>
                        <Form.Check
                        type='radio'
                        className='my-2'
                        label='Pay-Pal or Credit Card'
                        id= 'PayPal'
                        name='paymentMethod'
                        value='PayPal'
                        checked
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        ></Form.Check>

                    </Col>
                </Form.Group>

                <Button type='submit'variant='primary'>
                    Suivant
                </Button>
            </Form>

        </FormContainer>
    )
}

export default PaymentScreen