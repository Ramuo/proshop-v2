
import {useState, useEffect} from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';
import {toast} from 'react-toastify';


import {
  useUpdateProductMutation, 
  useGetProductDetailsQuery,
  useUploadProductImageMutation
} from '../../slices/productsApiSlice';




const ProductEditScreen = () => {
  const {id: productId} = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState('');

//ACTIONS
  const {
    data: product, 
    isLoading, 
    refetch, 
    error
  } = useGetProductDetailsQuery(productId);

  const [updateProduct, {isLoading: loadingUpdate}] = 
  useUpdateProductMutation();

  const [uploadProductImage, {loadingUpload}] = 
  useUploadProductImageMutation();

  
  
  // FUNCTIONS/
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      });
  
      toast.success('Produit modifié avec succèss');
      refetch();
      navigate('/admin/productList');
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    };
  };

  useEffect(() => {
    if(product){
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setDescription(product.description);
      setCountInStock(product.countInStock);
    };
  }, [product]);

  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    };

  }; 


  //REBDERED ELEMENTS
  return <>
    <Link to='/admin/productList' className='btn btn-light my-3'>
      Retour
    </Link>

    <FormContainer>
      <h1>Éditer un produit</h1>
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

          <Form.Group controlId='price' className='my-2'>
            <Form.Label>Prix</Form.Label>
            <Form.Control
            type='number'
            name={price}
            value={price} 
            onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image' className='my-2'>
            <Form.Label>Image</Form.Label>
            <Form.Control
            type='text'
            name={image}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
            <Form.Control
            label='File'
            onChange={uploadFileHandler}
            type='file'
            ></Form.Control>
            {loadingUpload && <Loader/>}
          </Form.Group> 

          <Form.Group controlId='brand' className='my-2'>
            <Form.Label>Marque</Form.Label>
            <Form.Control
            type='text'
            name={brand}
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='countInStock' className='my-2'>
            <Form.Label>Quantité en stock</Form.Label>
            <Form.Control
            type='number'
            name={countInStock}
            value={countInStock}
            onChange={(e) => setCountInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='category' className='my-2'>
            <Form.Label>Categorie</Form.Label>
            <Form.Control
            type='text'
            name={category}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='description' className='my-2'>
            <Form.Label>Description</Form.Label>
            <Form.Control
            type='text'
            name={description}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
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

export default ProductEditScreen;