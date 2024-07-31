import React from 'react'
import {Outlet} from 'react-router-dom'
import Header from './components/USER/Header/Header'
import { Container } from 'react-bootstrap'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
    <Header/>

   <ToastContainer theme='dark' />
 <Container className='my-5 mx-auto custom-form-container '>
   
 <Outlet/>
 
 </Container>
    </>
  )
}

export default App