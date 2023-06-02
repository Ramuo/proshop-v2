import {LinkContainer} from 'react-router-bootstrap';
import {Table, Button, Row, Col} from 'react-bootstrap';
import {FaEdit, FaTrash} from 'react-icons/fa';
import {toast} from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';

import {useGetProductsQuery} from '../../slices/productsApiSlice';
import { useCreateProductMutation } from '../../slices/productsApiSlice';




const ProductListScreen = () => {
  const {data: products, isLoading, error, refetch} = useGetProductsQuery();


  //FUNCTIONS:
  const deleteHandler = (id) => {
    console.log('delete', id)
  };


  const [createProduct, { isLoading: loadingCreate }] =
  useCreateProductMutation();

  const createProductHandler = async () => {
    if(window.confirm("Êtes-vous sûr de créer un produit")){
      try {
        await createProduct();
        refetch();
        toast.success("Produit créé avec succès")
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    };
  };

  //RENDERED ELEMENTS
  return <>
    <Row className='align-items-center'>
      <Col>
        <h1>Produits</h1>
      </Col>
      <Col className='text-end'>
        <Button className='btn-sm m-3' onClick={createProductHandler}>
          <FaEdit/> Ajouter Produit
        </Button>
      </Col>
    </Row>

    {loadingCreate && <Loader/>}

    {isLoading ? (<Loader/>
      ) : (error
      ) ? (<Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>NOM</th>
                <th>Prix</th>
                <th>CATEGORIE</th>
                <th>MARQUE</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}€</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm mx-2'>
                        <FaEdit/>
                      </Button>
                    </LinkContainer>
                    <Button 
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(product._id)}
                    >
                      <FaTrash style={{color: 'white'}}/>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* Pagination */}
        </>
      )  }
  </>
};

export default ProductListScreen;