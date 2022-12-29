import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

import GoogleSignIn from '../Shared/GoogleSignIn';

const Register = () => {
  // authProvider functions import
  const {createNewUser , updateUserProfile} = useContext(AuthContext);
    const { register, handleSubmit} = useForm();
    const navigate = useNavigate();
    const handleRegister = data =>{
        console.log(data)
        //user register auth function call here
        createNewUser(data.email, data.password) 
        .then(result =>{
          // store users information in database
          const userInfo = {
            name:data.name,
            email:data.email,
          }
          updateUserProfile(data.name)
          .then(()=>{
          fetch(`http://localhost:5000/users`,{
            method:'POST',
            headers:{
              'content-type':'application/json'
            },
            body:JSON.stringify(userInfo)
          })
          .then(res => res.json())
          .then(data=> {
            console.log(data)
            toast.success('successfully register')
          })
          })
          .catch(e=>{
            console.log(e.message)
            toast.error(e.message)
          })

         
        
        })
        .catch(e =>{
          console.log(e.message)
        })
    }


    return (
      <div className="hero min-h-screen bg-base-200">
           
      <div className="hero-content w-full">
     
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
         <form  onSubmit={handleSubmit(handleRegister)}>
         <div className='text-center text-3xl font-mono font-semibold'>
                    <h1>Register Now</h1>
                </div>
            <div className="form-control">
              <input type="text" {...register('name')}  placeholder="Name" className="input input-bordered" />
            </div>
            <div className="form-control my-3">
              <input type="text" {...register('email')}  placeholder="Email" className="input input-bordered" />
            </div>
            <div className="form-control">
              <input type="password" {...register('password')} placeholder="password" className="input input-bordered" />
            
            </div>
            <div className="form-control mt-6">
              <button type='submit' className="btn btn-primary">Register</button>
            </div>
            
            <div>
                <p>Already have an account <Link to='/login' className='text-red-900 link text-xl'>Login</Link></p>
            </div>
         </form>
         <div className="form-control mt-3">
             <GoogleSignIn></GoogleSignIn>
            </div>
          </div>
        </div>
     
       
      </div>
    </div>
    );
};

export default Register;