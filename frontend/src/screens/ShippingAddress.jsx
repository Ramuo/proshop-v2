import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';


import { saveShippingAddress } from '../slices/cartSlice';





const ShippingScreen = () => {
    //STATE
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    


    const navigate = useNavigate();
    const dispatch = useDispatch();

    //FUNCTIONS
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        navigate('/payment');
    };


    return (
        <FormContainer>
        
          <CheckoutSteps step1 step2/>
          
          <h1>Livraison</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className='my-2' controlId='address'>
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                type='text'
                placeholder='Votre addresse'
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group className='my-2' controlId='city'>
              <Form.Label>Ville</Form.Label>
              <Form.Control
                type='text'
                placeholder='Votre ville'
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group className='my-2' controlId='postalCode'>
              <Form.Label>Code postal </Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter postal code'
                value={postalCode}
                required
                onChange={(e) => setPostalCode(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Form.Group className='my-2' controlId='country'>
              <Form.Label>Pays</Form.Label>
              <Form.Control
                type='text'
                placeholder='Votre pays'
                value={country}
                required
                onChange={(e) => setCountry(e.target.value)}
              ></Form.Control>
            </Form.Group>
    
            <Button type='submit' variant='primary'>
              Suivant
            </Button>
          </Form>
        </FormContainer>
      );
    };
    
    export default ShippingScreen;