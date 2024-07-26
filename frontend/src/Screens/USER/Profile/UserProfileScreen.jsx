import React, { useEffect, useState } from "react";
import Image from 'react-bootstrap/Image'
import { Form, Button } from "react-bootstrap";

import FormContainer from "../../../components/USER/FormContainer/FormContainer";
import { useSelector } from "react-redux";
import { SetCredentials } from "../../../slices/user/authSlice";
import { toast } from "react-toastify";
import LoaderSpinner from "../../../components/USER/LoaderSpinner/Loader";
import { useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../../slices/user/usersApiSlice";
import {productUpload} from '../../../firebase/firebase.js'
import { RegistervalidateForm } from "../../../components/USER/validation/Validation.js";


function UserProfileScreen() {
  const { userInfo } = useSelector((state) => state.auth);
  const [photo,setPhoto] = useState("/defaultProfile.png")
  const [updatedPhoto,setUpdatedPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firebaseLoader,setFirebaseLoader] = useState(false);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateUser, { isLoading}] = useUpdateUserMutation();
  useEffect(() => {
    setName(userInfo.name ?? "");
    setEmail(userInfo.email ?? "");
    setPhone(userInfo.phone ?? "");
    setPhoto(userInfo.photo??"");
  }, [userInfo.setName, userInfo.setEmail, userInfo.setPhone]);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPhoto(event.target.result);
        setUpdatedPhoto(file);
      };
      reader.readAsDataURL(file);

      
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!RegistervalidateForm(name,email,phone,password,confirmPassword)) {
      return;
    } else {
      try {
        setFirebaseLoader(true);
        let url ='';
if(updatedPhoto){
   url =  await productUpload(updatedPhoto);

  
}
        
        const response = await updateUser({
          name,
          email,
          phone,
          photo:url,

          password,

          
        }).unwrap();
        dispatch(SetCredentials({ ...response }));

        setPassword("");
        setConfirmPassword("");
        setFirebaseLoader(false);
        toast.success("Profile Details updated");
      } catch (errors) {
        toast(errors?.data?.message || errors.error);
      }
    }
  };
  return (
    <FormContainer>


      <h1 className="text-center">User Profile</h1>

      <div className="d-flex justify-content-center height-100px">
    <Image src={photo} fluid style={{ borderRadius: "50%", height: "300px", width: "300px" }} />

  </div>

      <Form onSubmit={submitHandler}>
      <Form.Group className="my-2" controlId="photo">
          <Form.Label>Change Profile Photo</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          ></Form.Control>
        </Form.Group>



        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="phone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        {(isLoading||firebaseLoader) ? <LoaderSpinner />: <Button type="submit" variant="primary" className="mt-3">
          Update
        </Button>}
       
      </Form>

     
    </FormContainer>
  );
}

export default UserProfileScreen;
