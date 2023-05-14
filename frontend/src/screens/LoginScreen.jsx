import {useState} from 'react';
import {Link} from 'react-router-dom';
import {Form, Button, Row, Col, FormGroup, FormLabel} from 'react-bootstrap';
import FormContainer from '../components/FormContainer';




const LoginScreen = () => {
    //STATE 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');



    // FUNCTIONS:
    const submitHandler = (e) => {
        e.preventDefault();

        console.log('submit');
    };


    //RENDERED ELEMENTS:
    return (
        <FormContainer>
            <h1>Connexion</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='email' className='my-3'>
                    <FormLabel>E-mail</FormLabel>
                    <Form.Control
                    type='email'
                    placeholder='Votre E-mail'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                </FormGroup>

                <FormGroup controlId='password' className='my-3'>
                    <FormLabel>Mot de passe</FormLabel>
                    <Form.Control
                    type='password'
                    placeholder='Votre Mot de passe'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button type='submit' variant='primary' className='mt-3'>
                    Envoyer
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    Nouveau utilisateur ? <Link to='/register'>S'inscrire</Link>
                </Col>
            </Row>
        </FormContainer>
    );
};

export default LoginScreen