import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => { 

  const navigate = useNavigate()
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  const [phno, getPhno] = useState("");
  const [address, getAddress] = useState("");
  const [name, getName] = useState("");

  //getting current user
  console.log(auth?.currentUser?.email)

  const handleSubmit = async (e) => {
    if(password.length>=6){
      e.preventDefault()
      try{      
        await createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
          const user = userCredential.user
          console.log(user)
          navigate("/login")          
        })
        const userData = {
          name: name,
          email: email,
          phone_no: phno,
          address: address,
          ssn: null
        }
        const backendresponse = await axios.post("https://tax-track-updated.onrender.com/add_user", userData);
        console.log(backendresponse.data)
      } catch(error) {
        console.log("sign in error", error)
      }
    } else {
      alert('Password should be atleast 6 characters!')
    }  
        
  }

  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center absolute'>
          <div className='relative inset-1 bg-slate-300 rounded-lg z-10 p-5 w-[350px] h-[610px]'>
          <div className='text-center text-black font-bold text-3xl mb-1'>TaxTrack</div>
          <div className='text-center text-black font-bold text-[24px] mb-3'>Register</div>
            <div className='relative flex flex-col justify-center items-center'>
              <form onSubmit={ handleSubmit }>
              <div className='mb-6'>
                  <label className='text-black font-semibold text-lg'>Enter name:</label><br/>
                  <input className='w-[270px] h-[32px] rounded-sm p-2' onChange={ (e) => { getName(e.target.value) } } type='text' placeholder='Enter name'/>
                </div>
                <div className='mb-3'>
                  <label className='text-black font-semibold text-lg'>Enter email:</label><br/>
                  <input className='w-[270px] h-[32px] rounded-sm p-2' onChange={ (e) => { getEmail(e.target.value) } } type='text' placeholder='Enter email'/>
                </div>
                <div className='mb-6'>
                  <label className='text-black font-semibold text-lg'>Enter password:</label><br/>
                  <input className='w-[270px] h-[32px] rounded-sm p-2' onChange={ (e) => { getPassword(e.target.value) } } type='password' placeholder='Enter password'/>
                </div>
                <div className='mb-6'>
                  <label className='text-black font-semibold text-lg'>Enter phone number:</label><br/>
                  <input className='w-[270px] h-[32px] rounded-sm p-2' onChange={ (e) => { getPhno(e.target.value) } } type='number' placeholder='Enter phone number'/>
                </div>
                <div className='mb-6'>
                  <label className='text-black font-semibold text-lg'>Enter address:</label><br/>
                  <input className='w-[270px] h-[32px] rounded-sm p-2' onChange={ (e) => { getAddress(e.target.value) } } type='text' placeholder='Enter address'/>
                </div>
                <button className='bg-blue-700 text-white text-xl font-semibold w-[270px] h-[40px] rounded-sm' type='submit'>Register</button>
              </form>
              <div className='mt-2'>Have an account? <Link className='text-blue-700' to="/login">Login</Link></div>
            </div>
          </div>
      </div>
    </>
  )
}

export default RegisterPage