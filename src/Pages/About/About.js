import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { FaEdit, FaHome, FaSchool } from 'react-icons/fa';
import {MdSchool } from 'react-icons/md';
import { AuthContext } from '../../contexts/AuthProvider';
import Loading from '../../Shared/Loading';
import ModalEdit from './ModalEdit';
import './Custom.css';
import PostCard from '../Media/PostCard';
const About = () => {
    const {user} = useContext(AuthContext);
    const [submit , setSubmit] = useState(true);
    const {data={},isLoading , refetch} = useQuery({
        queryKey:['users', user?.email],
        queryFn: async () => {
            const res = await fetch(`https://social-media-app-server-indol.vercel.app/users/${user?.email}`)
            const data = await res.json()
            return data ;
        }
    })
  
    const {data:myPost=[]} = useQuery({
        queryKey:['postInformation',user?.email],
        queryFn:async()=>{
            const res =await fetch(`https://social-media-app-server-indol.vercel.app/usersPost/${user?.email}`);
            const data = await res.json()
            return data;
        }
    })
console.log(myPost)
// if(isLoading){
//     return <Loading></Loading>
// }
 
    return (
        <section>
 

          <div className='max-w-screen-xl mx-auto'>
          <div className=''>
                    <h3><label  className='text-right text-xl font-bold flex items-center text-red-700 underline cursor-pointer' htmlFor="Edit-modal"><FaEdit></FaEdit> Edit</label></h3>
                <div className='flex gap-5 items-center mx-auto w-1/2'>
              <div>
              <figure>
                    <img className='rounded-full w-64 h-64' src= { data?.image ? data.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMSf2dVvnhae5B08RSVdC6Qcl26KkICkQQXyjFamDDnQ&s'} alt="" />

                </figure>
               
              
              </div>
               <div>
               <h2 className='text-2xl font-bold font-mono'>{data?.name}</h2>
               <h2 className='text-xl font-bold font-mono'><span>0 Flowing</span><span> | </span><span>0 Flowers</span></h2>
               <strong className='flex items-center gap-1'><MdSchool className='text-xl text-blue-700'></MdSchool> {data.collage }</strong>
               <address className='flex items-center gap-1'><FaHome className='text-blue-700 text-xl'></FaHome>{data.address }  </address>

               </div>
                </div>
            </div>
              {/* my post all */}
            <section className='mt-40'>
                <h2 className='text-3xl font-bold text-center mb-20'>Your All Post</h2>
            <div className='w-96'>
                    {
                        myPost && myPost.map(item =><PostCard 
                        key={item._id}
                        postInfo={item}
                        ></PostCard>)
                    }
                </div>
            </section>
          </div>
              

                        {submit ? <ModalEdit userData={data} submit={submit} setSubmit={setSubmit} refetch={refetch}></ModalEdit> : ''}
        </section>
    );
};

export default About;