import React, { useState, } from 'react'

import { Form, Button, } from 'react-bootstrap';

import FormContainer from '../../../components/USER/FormContainer/FormContainer'

import { toast } from 'react-toastify';
import LoaderSpinner from '../../../components/USER/LoaderSpinner/Loader';
import { useDispatch } from 'react-redux';
import { RegistervalidateForm } from '../../../components/USER/validation/Validation';
import { useAdminAddUserMutation } from '../../../slices/admin/adminApiSlice';
import { useNavigate } from 'react-router-dom';

function AdminAddUserPage() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone,setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
   const [adminAddUser,{isloading} ] = useAdminAddUserMutation(); 
   
const navigate= useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
      
        if (!RegistervalidateForm(name,email,phone,password,confirmPassword,true)) {
          return;
      }else{
        try {
          
          const response = await adminAddUser({ name,email,phone,password}).unwrap();
          
       toast.success(response.message);
          navigate('/admin/dashboard');
         

        } catch (err) {
        
          toast.error(err?.data?.message||err.error);
        }
      }}
  return (
    <FormContainer>
    <h1>Add user</h1>
    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          placeholder='Enter name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>
     

      <Form.Group className='my-2' controlId='phone'>
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type='number'
          placeholder='Enter Phone number'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Enter password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>
      <Form.Group className='my-2' controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Confirm password'
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

     

{isloading?(<LoaderSpinner/>): <Button type='submit' variant='primary' className='mt-3'>
        Add User
      </Button>}

  
    </Form>
    
    
  </FormContainer>
  )
}

export default AdminAddUserPage