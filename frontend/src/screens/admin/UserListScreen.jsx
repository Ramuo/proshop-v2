import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTimes, FaTrash, FaEdit, FaCheck } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {toast} from 'react-toastify';


import {
    useDeleteUserMutation,
    useGetUsersQuery,
} from '../../slices/usersApiSlice';



const UserListScreen = () => {
  const { data: users, isLoading, error, refetch } = useGetUsersQuery();


  const [deleteUser] = useDeleteUserMutation();



  //FUNCTIONS:
  const deleteUserHandler = async (id) => {
    if(window.confirm("Êtes-vous sûr de supprimer?")){
        try {
            await deleteUser(id);
            refetch();
            toast.success('Utilisateur supprimé avec succès')
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }

  };


  //RENDERED ELEMENTS:
  return (
    <>
      <h1>Clients</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>CLIENT</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                <td>
                  {user.isAdmin ? (
                    <FaCheck style={{ color: 'green' }} />
                  ) : (
                    <FaTimes style={{ color: 'red' }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <FaEdit/>
                    </Button>
                  </LinkContainer>

                  <Button 
                  variant='danger'
                  className='btn-sm'
                  onClick={() => deleteUserHandler(user._id)}
                  >
                    <FaTrash style={{color: 'white'}}/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;