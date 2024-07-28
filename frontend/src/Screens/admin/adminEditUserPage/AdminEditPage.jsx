import React, { useEffect, useState } from "react";
import Image from "react-bootstrap/Image";
import { Form, Button } from "react-bootstrap";

import FormContainer from "../../../components/USER/FormContainer/FormContainer.jsx";

import { toast } from "react-toastify";
import LoaderSpinner from "../../../components/USER/LoaderSpinner/Loader.jsx";

import { useAdminUpdateUserMutation } from "../../../slices/admin/adminApiSlice.js";
import { productUpload } from "../../../firebase/firebase.js";
import { editUservalidateForm } from "../../../components/USER/validation/Validation.js";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function AdminEditUserPage() {


  const{adminUsersCollection} = useSelector(state=>state.Users);
  const { id } = useParams();


  const [userId, setUserId] = useState(id);
  const [photo, setPhoto] = useState("");
  const [updatedPhoto, setUpdatedPhoto] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [firebaseLoader, setFirebaseLoader] = useState(false);



  const [adminUpdateUser, { isLoading }] = useAdminUpdateUserMutation();

const navigate = useNavigate();

  useEffect(() => {
    const user = adminUsersCollection.find((user) => user._id === id);
    console.log(user);
    if (user) {
      setUserId(user._id);
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setPhoto(user.photo || "");
      
    }
  }, [adminUsersCollection, id]);

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

    if (!editUservalidateForm(name, email, phone)) {
      return;
    } else {
      try {
        
        let url = null;
        if (updatedPhoto) {
          setFirebaseLoader(true);
          url = await productUpload(updatedPhoto);
          setFirebaseLoader(false);
        }

        const response = await adminUpdateUser({
          _id:userId,
          name,
          email,
          phone,
          photo: url,

         
        }).unwrap();

        

       
       
        toast.success(response.message);
        navigate("/admin/dashboard");
      } catch (err) {
        console.error(err);
       toast.error(err?.data?.message || err.error)
       
      }
    }
  };
  return (
    <FormContainer>
      <h1 className="text-center">User Profile</h1>

      <div className="d-flex justify-content-center height-100px">
        <Image
          src={photo}
          fluid
          style={{ borderRadius: "50%", height: "300px", width: "300px" }}
        />
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

      
        {isLoading || firebaseLoader ? (
          <LoaderSpinner />
        ) : (
          <Button type="submit" variant="primary" className="mt-3">
            Update
          </Button>
        )}
      </Form>
    </FormContainer>
  );
}

export default AdminEditUserPage;
