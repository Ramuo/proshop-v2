import {useSelector, useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {LinkContainer} from 'react-router-bootstrap';
import {Badge, Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';


import { useLogoutMutation } from '../slices/usersApiSlice';
import {logout} from '../slices/authSlice';



function Header() {
    //STATE
    //Global state
    const {cartItems} = useSelector((state) => state.cart)
    const {userInfo} = useSelector((state) => state.auth)
   
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const [logoutApiCall] = useLogoutMutation();

    //FUNCTIONS
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (err) {
            console.log(err);
        }
    }


    //RENDERED ELEMENTS
    return (
    <header>
        <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
            <Container>
                <LinkContainer to='/'>
                    <Navbar.Brand>
                        <img src={logo} alt="Proshop" />
                        ProGadget
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
                        
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/productlist'>
                                    <NavDropdown.Item>Produits</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Clients</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/orderlist'>
                                    <NavDropdown.Item>Commandes</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    </header>
    );
};

export default Header