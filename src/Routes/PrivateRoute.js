import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Loading from '../Shared/Loading';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useContext(AuthContext);
    const location = useLocation();
      if(loading){
          return <Loading></Loading>
      }
    if(!user){
      return <Navigate to='/login' state={{from:location}} replace></Navigate>
    }
    else{
      return  children;
    }
  };
export default PrivateRoutes;