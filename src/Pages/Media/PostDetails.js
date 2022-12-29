import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Shared/Loading';

const PostDetails = () => {
    const {loading , setLoading} = useContext(AuthContext)
    const {id} = useParams();
    const {data={} , isLoading} = useQuery({
        queryKey:['postInformation' ],
        queryFn:async()=>{
            const res = await fetch(`http://localhost:5000/postInformation/${id}`);
            const data = await res.json();
            return data ;
        }
    })
    const {_id, description, image, react ,  name} = data ;
    if(isLoading){
        return <Loading></Loading>
    }
    return (
       <section>
         <div className="max-w-screen-xl mx-auto w-full flex bg-base-100 shadow-xl">
       <div>
       <figure><img src={image} className='h-64 object-fill w-full' alt="images" /></figure>
       </div>

        <div className="card-body">
            <h2 className='text-xl font-extrabold font-mono'>{'Author :'+ name}</h2>
          <p className='text-xl'>{description}</p>
          <h3 className='text-xl font-extrabold font-mono'>React: {react ? react : 0}</h3>
          <div className="card-actions justify-end">
          </div>
    
        </div>
      </div>
       </section>
    );
};

export default PostDetails;