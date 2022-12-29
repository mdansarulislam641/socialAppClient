import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';


const GoogleSignIn = () => {
    const {handleGoogleLogIn} = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location?.state?.from?.pathname || '/';
    const handleGoogleSignIn = () =>{
        handleGoogleLogIn()
        .then(result =>{
            const info = {
                email : result?.user?.email,
                name: result?.user?.displayName,
            }
            fetch('https://localhost:5000/users',{
                method:"POST",
                headers:{
                    'content-type':'application/json'
                },
                body:JSON.stringify(info)
            })
            .then(res=>res.json())
            .then(data=>{
                if(data.acknowledged){
                    toast.success('successfully log in')
                    navigate(from,{replace:true})
                  
                }
            })
          
        })
    }

    return (
        <button onClick={handleGoogleSignIn} type='submit' className="btn btn-primary">Google</button>
    );
};

export default GoogleSignIn;