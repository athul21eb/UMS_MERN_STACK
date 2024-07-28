import { toast } from "react-toastify";

export const editUservalidateForm = (name, email, phone) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,}$/;

    if (!name||name.trim()==="") {
        toast.error('Name is required');
        return false;
    }
    if (!email) {
        toast.error('Email is required');
        return false;
    }
    if (!emailRegex.test(email)) {
        toast.error('Invalid email format');
        return false;
    }
    if (!phone) {
        toast.error('Phone number is required');
        return false;
    }
    if (!phoneRegex.test(phone)) {
        toast.error('Phone number must be at least 10 digits');
        return false;
    }
 
    
    return true;
};

export const RegistervalidateForm = (name, email, phone, password, confirmPassword,Registerprofile=false) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10,}$/;

    if (!name||name.trim()==="") {
        toast.error('Name is required');
        return false;
    }
    if (!email) {
        toast.error('Email is required');
        return false;
    }
    if (!emailRegex.test(email)) {
        toast.error('Invalid email format');
        return false;
    }
    if (!phone) {
        toast.error('Phone number is required');
        return false;
    }
    if (!phoneRegex.test(phone)) {
        toast.error('Phone number must be at least 10 digits');
        return false;
    }
   if(Registerprofile){
    if (!password||password.trim()==="") {
        toast.error('Password is required');
        return false;
    }
   }
    if (password.trim()!==""&&password.length < 8) {


        toast.error('Password must be at least 8 characters');
        return false;
    }
    if (password !== confirmPassword) {
        toast.error('Passwords do not match');
        return false;
    }
    return true;
};

export const LoginvalidateForm = ( email, password, ) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   

  
    if (!email) {
        toast.error('Email is required');
        return false;
    }
    if (!emailRegex.test(email)) {
        toast.error('Invalid email format');
        return false;
    }
   
   
    if (!password||password.trim()==="") {
        toast.error('Password is required');
        return false;
    }
    if (password.length < 8) {
        toast.error('Password must be at least 8 characters');
        return false;
    }
   
    return true;
};