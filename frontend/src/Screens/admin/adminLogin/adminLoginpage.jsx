import React, { useState,  } from "react";
import {  useNavigate } from "react-router-dom";
import { Form, Button,  } from "react-bootstrap";

import FormContainer from "../../../components/USER/FormContainer/FormContainer";
import { useAdminLoginMutation } from "../../../slices/admin/adminApiSlice";
import { SetAdminCredentials } from "../../../slices/admin/adminauthSlice";
import { toast } from "react-toastify";
import LoaderSpinner from "../../../components/USER/LoaderSpinner/Loader";
import { useDispatch } from "react-redux";
import { LoginvalidateForm } from "../../../components/USER/validation/Validation";



function AdminLoginPage() {
  const [password, SetPassword] = useState("");
  const [email, setEmail] = useState("");
  const [adminLogin, { isLoading }] = useAdminLoginMutation();
  const dispatch = useDispatch();
const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!LoginvalidateForm(email, password)) {
      return;
    } else {
      try {
        const response = await adminLogin({ email, password }).unwrap();
  
        dispatch(SetAdminCredentials({ ...response }));  
        navigate("/admin/dashboard");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }

    
  };

  return (
    <FormContainer>
      <h1>Admin Sign In</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {isLoading? <LoaderSpinner />: <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>}
       
      </Form>

     

      
    </FormContainer>
  );
}

export default AdminLoginPage;
