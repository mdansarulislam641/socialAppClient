import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

import GoogleSignIn from '../Shared/GoogleSignIn';

const Login = () => {
    const {handleSubmit, register} = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';
   
    const {logInUser} = useContext(AuthContext);
    const handleLogin = data =>{
        logInUser(data.email,data.password)
        .then(result=>{
           toast.success(`successfully login`)
           navigate(from, {replace:true})
        })
        .catch(error =>{
            toast.success(error.message)
        })
       
    }
    return (
        <div className="hero min-h-screen bg-base-200">
           <div className="hero-content w-full">
             <div  className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
               <div className="card-body">
             <form onSubmit={handleSubmit(handleLogin)}>
             <div className='text-center text-3xl mb-5 font-mono font-semibold'>
                         <h1>LogIn Now</h1>
                     </div>
                 <div className="form-control">
                   <input type="email" {...register('email')}  placeholder="Email" className="input input-bordered" required/>
                 </div>
                 <div className="form-control mt-5">
                   <input type="password" {...register('password')} placeholder="password" className="input input-bordered" required/>
                 </div>
                 <div className="form-control mt-6">
                   <button type='submit' className="btn btn-primary">Login</button>
                 </div>
                 
                 <div>
                     <p>Haven't an account <Link to='/register' className='text-red-900 link link-hover  text-xl'>Register</Link></p>
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

export default Login;