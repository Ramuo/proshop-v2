
import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from 'react-toastify';


import {
    useGetUserDetailsQuery,
    useUpdateUserMutation
} from '../../slices/usersApiSlice';




const UserEditScreen = () => {
  const {id: userId} = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  

//ACTIONS
  const {
    data: user, 
    isLoading, 
    refetch, 
    error
  } = useGetUserDetailsQuery(userId);

  const [updateUser, {isLoading: loadingUpdate}] = 
  useUpdateUserMutation();


  // FUNCTIONS/
  
  useEffect(() => {
    if(user){
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
     
    };
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
        await updateUser({userId, name, email, isAdmin});
        toast.success("Mofifié avec succès");
        refetch();
        navigate('/admin/userlist');
    } catch (err) {
        toast.error(err?.data?.message || err.error);
    }
   };


  //REBDERED ELEMENTS
  return <>
    <Link to='/admin/userlist' className='btn btn-light my-3'>
      Retour
    </Link>

    <FormContainer>
      <h1>Éditer utilisateur</h1>
      {loadingUpdate && <Loader/>}

      {isLoading ? (
      <Loader/>
      ): error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Nom</Form.Label>
            <Form.Control
            type='text'
            name={name}
            value={name}
            onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' className='my-2'>
            <Form.Label>E-mail</Form.Label>
            <Form.Control
            type='email'
            name={email}
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='isAdmin' className='my-2'>
            <Form.Check
            type='checkbox'
            label='Administrateur'
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.value)}
            ></Form.Check>
          </Form.Group>

          <Button
          type='submit'
          variant='primary'
          style={{marginTop: '1rem'}}>
            Modifier
          </Button>
        </Form>
      )}
    </FormContainer>
  </>
};

export default UserEditScreen;





