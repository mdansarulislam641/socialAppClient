import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Header = () => {
  const navigate = useNavigate()
    const {user , logOutUser} = useContext(AuthContext)
    const menuItem = <>
            
        <Link to='/'>Home</Link>
        <Link to='/media'>Media</Link>
        
        {
            user && user.uid ? <>
            <Link to='/message'>Message</Link>
            <Link to='/about'>About</Link>
            <button>{user.displayName}</button>

            </> : <>
             <Link to='/login'>Login</Link>
             <Link to='/register'>Register</Link>
            </>
        }
       
       
    
    </>
    const handleSignOut = () =>{
        logOutUser()
        .then(()=>{
            toast.success('successfully log out')
            navigate('/')
        })
        .catch(e =>{
            toast.error(e.message)
        })
    }
    return (
      
    <div className="navbar bg-base-100 mx-auto max-w-screen-xl">
    <div className="navbar-start">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>{menuItem}</li>
        </ul>
      </div>
     <Link className='text-xl font-bold' to='/'>Social App</Link>
    </div>
    <div className="navbar-center hidden lg:flex">
      <ul className="menu menu-horizontal px-1">
       <li>{menuItem}</li>
      </ul>
    </div>
   {
    user && user.uid &&  <div className="navbar-end">
    <button onClick={handleSignOut} className='btn btn-outline'>SignOut</button>
    </div>
   }
  </div>

    );
};

export default Header;