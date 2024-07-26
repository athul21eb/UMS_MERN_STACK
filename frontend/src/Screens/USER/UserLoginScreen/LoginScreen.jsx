import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";

import FormContainer from "../../../components/USER/FormContainer/FormContainer";
import { useLoginMutation } from "../../../slices/user/usersApiSlice";
import { SetCredentials } from "../../../slices/user/authSlice";
import { toast } from "react-toastify";
import LoaderSpinner from "../../../components/USER/LoaderSpinner/Loader";
import { useDispatch } from "react-redux";
import { LoginvalidateForm } from "../../../components/USER/validation/Validation";
function UserLoginScreen() {
  const [password, SetPassword] = useState("");
  const [email, setEmail] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!LoginvalidateForm(email, password)) {
      return;
    } else {
      try {
        const response = await login({ email, password }).unwrap();
  
        dispatch(SetCredentials({ ...response }));
        navigate("/dashboard");
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }

    
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>

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

        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>

      {isLoading && <LoaderSpinner />}

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default UserLoginScreen;