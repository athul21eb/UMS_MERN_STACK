import React from "react";
import { Navbar, Nav, Container,NavDropdown,} from "react-bootstrap";

import {LinkContainer} from 'react-router-bootstrap'
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useLogoutMutation } from "../../../slices/user/usersApiSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { ClearCredentials } from "../../../slices/user/authSlice";
import { toast } from "react-toastify";
import {  useAdminLogoutMutation } from "../../../slices/admin/adminApiSlice";
import { ClearAdminCredentials } from "../../../slices/admin/adminauthSlice";
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
function Header() {

  const [logout] = useLogoutMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {userInfo} = useSelector((state)=>state.auth);
const {adminInfo} = useSelector(state=>state.adminAuth);

const [adminLogout] = useAdminLogoutMutation();
  const logOutHandler = async() => {  

    try {
const res = await logout().unwrap();

navigate('/');
toast.success(res.message);
      

    } catch (err) {
      console.log(err);

    }
    
  }
  const adminLogOutHandler = async() => {  

    try {
const res = await adminLogout().unwrap();

navigate('/admin');
toast.success(res.message);
      

    } catch (err) {
      console.log(err);

    }
    
  }

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Button
          color="inherit"
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ marginLeft:5 }}
       / >
        <Container>
     
        
      
          <Navbar.Brand href="/">UMS MERN APP</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              {userInfo&&(<NavDropdown title={userInfo.name} >
                <LinkContainer to="/profile">
                
                <NavDropdown.Item >Profile</NavDropdown.Item>
                </LinkContainer>
              
                <NavDropdown.Item onClick={() => {
        if (window.confirm("Are you sure you want to logout?")) {
          logOutHandler();
        }
    }}>Logout</NavDropdown.Item>
               
              </NavDropdown>)}
              
              {adminInfo&&(<NavDropdown title={adminInfo.name} >
              
                <LinkContainer to="/admin/addUser">
                
                <NavDropdown.Item >Add User</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item
                onClick={() => {
        if (window.confirm("Are you sure you want to logout?")) {
            adminLogOutHandler();
        }
    }}>Logout</NavDropdown.Item>
               
              </NavDropdown>)}
              
              
          
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
