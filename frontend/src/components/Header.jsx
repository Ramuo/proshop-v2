import {useSelector} from 'react-redux';
import {LinkContainer} from 'react-router-bootstrap';
import {Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';


function Header() {
    //STATE
    //Global state
    const {cartItems} = useSelector((state) => state.cart)
    const {userInfo} = useSelector((state) => state.auth)
   

    //FUNCTIONS
    const logoutHandler = () => {

    }


    //RENDERED ELEMENTS
    return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt="Proshop" />
                        Proshop
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar' />
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className="ms-auto">
                        <LinkContainer to='/cart'>
                            <Nav.Link>
                                <FaShoppingCart/>Panier
                                {cartItems.length > 0 && (
                                    <Badge pill bg='danger' style={{marginLeft: '5px'}} >
                                        {cartItems.reduce((a, c) => a + c.qty, 0)}
                                    </Badge>
                                )}
                            </Nav.Link>
                        </LinkContainer>

                       {userInfo ? (
                        <>
                            <NavDropdown title={userInfo.name} id='username'>
                                <LinkContainer to='/profile'>
                                <NavDropdown.Item>Profil</NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Item onClick={logoutHandler}>
                                    Déconnexion
                                </NavDropdown.Item>
                            </NavDropdown>
                        </>
                        ) : (
                            <LinkContainer to='/login'>
                            <Nav.Link>
                                <FaUser /> Connexion
                            </Nav.Link>
                            </LinkContainer>
                        )}
                        
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    );
};

export default Header