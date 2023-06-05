import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {FaSearch} from 'react-icons/fa'


const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams();
  const [keyword, setKeyword] = useState(urlKeyword);


  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
        setKeyword('');
        navigate(`/search/${keyword.trim()}`);
    } else{
        navigate('/');
    }
};

  return (
    <Form onSubmit={submitHandler} className='d-flex'>
        <InputGroup>
            <Form.Control
            type='text'
            name='q'
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Rechercher'
            />
            <Button
            className='bg-primary'
            variant="outline-primary"
            type='submit'
            id='button-search'
            >
                <FaSearch style={{color: 'white'}}/>
            </Button>
        </InputGroup>
    </Form>
  );
};

export default SearchBox;



