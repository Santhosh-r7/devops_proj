import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../../config/firebase';
import { useUser } from './UserContext.jsx';

const LoginPage = () => {

  const { setUser } = useUser()
  const navigate = useNavigate()
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");

  //getting current user
  console.log(auth?.currentUser?.email)

  const handleSubmit = async (e) => {
      e.preventDefault()
      try{      
        await signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
          const user = userCredential.user
          setUser(user)
          console.log(user)
          navigate("/home")
        })
      } catch(error) {
        alert("Incorrect email or password!")
        console.log("sign in error", error)
      }        
  }

  

  return (
    <>
      <div className='w-full min-h-screen flex justify-center items-center absolute'>
          <div className='relative inset-1 bg-slate-300 rounded-lg z-10 p-5 w-[350px] h-[360px]'>
          <div className='text-center text-black font-bold text-3xl mb-1'>TaxTrack</div>
          <div className='text-center text-black font-bold text-[24px] mb-3'>Login</div>
            <div className='relative flex flex-col justify-center items-center'>
              <form onSubmit={ handleSubmit }>
                <div className='mb-3'>
                  <label className='text-black font-semibold text-lg'>Enter email:</label><br/>
                  <input className='w-[270px] h-[32px] rounded-sm p-2' onChange={ (e) => { getEmail(e.target.value) } } type='text' placeholder='Enter email'/>
                </div>
                <div className='mb-6'>
                  <label className='text-black font-semibold text-lg'>Enter password:</label><br/>
                  <input className='w-[270px] h-[32px] rounded-sm p-2' onChange={ (e) => { getPassword(e.target.value) } } type='password' placeholder='Enter password'/>
                </div>
                <button className='bg-blue-700 text-white text-xl font-semibold w-[270px] h-[40px] rounded-sm' type='submit'>Login</button>
              </form>
              <div className='mt-2'>Don't have an account? <Link className='text-blue-700' to="/register">Register</Link></div>
            </div>
          </div>
      </div>
    </>
  )
}

export default LoginPage