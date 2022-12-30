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
            const res = await fetch(`https://social-media-app-server-indol.vercel.app/postInformation/${id}`);
            const data = await res.json();
            return data ;
        }
    })

    const {_id, description, image, react ,  name} = data ;
      // get comment per post
      const {data:comments=[]} = useQuery({
        queryKey:['comment', id],
        queryFn:async()=>{
          const res = await fetch(`https://social-media-app-server-indol.vercel.app/comment/${id}`)
          const data = await res.json();
         return data ;
        }
      })

      console.log(comments)
    if(isLoading){
        return <Loading></Loading>
    }
    return (
       <section className='pt-20 h-[100vh] bg-base-300'>
         <div className="  max-w-screen-xl mx-auto w-full flex bg-base-100 shadow-xl">
       <div>
       <figure><img src={image} className='h-64 object-fill w-full' alt="images" /></figure>
       </div>

        <div className="card-body">
            <h2 className='text-xl font-extrabold font-mono'>{'Author :'+ name}</h2>
          <p className='text-xl'>{description}</p>
          <div className="">
          <h2 className='text-xl font-semibold'>Comments:{comments.length}</h2>
            {
              comments?.map(cmt=> <div>
                
                 <ul>
                  <li className='text-xl'>{cmt.comment}</li>
                </ul>
               </div>
                
              )
            }
          </div>
    
        </div>
      </div>
       </section>
    );
};

export default PostDetails;