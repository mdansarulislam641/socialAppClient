import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import {  FaRegHeart } from "react-icons/fa";
import { toast } from 'react-hot-toast';
import app from '../../firebase/firebase.config';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading';
const PostCard = ({postInfo}) => {
    const {user} = useContext(AuthContext)
    const {_id, description, image ,publishedDate,  name} = postInfo ;
    const [like , setLike] = useState(false);
    const [comment , setComment] = useState(false);
    //get like for each post 
    const {data:likes=[]}= useQuery({
      queryKey:['like'],
      queryFn:async()=>{
        const res =await fetch(`https://social-media-app-server-indol.vercel.app/like/${_id}`)
        const data = await res.json()
        return data ;
      }
    })

console.log("like",likes,_id)
    const handleLick = () =>{
        setLike(!like)
        // post like server
        fetch(`https://social-media-app-server-indol.vercel.app/like`,{
          method:'POST',
          headers:{
            'content-type':'application/json'
          },
          body:JSON.stringify({postId:_id})
        })
        .then(res=>res.json())
        .then(data=>{
          if(data.acknowledged){
            localStorage.setItem('like', like )
            toast.success('successfully added like')
            refetch()
          }
        })
       
    }
    const handleComment = () =>{
        setComment(!comment)
        // console.log(comment)
    }

    // get comment per post
    const {data:comments=[], refetch} = useQuery({
      queryKey:['comment', _id],
      queryFn:async()=>{
        const res = await fetch(`https://social-media-app-server-indol.vercel.app/comment/${_id}`)
        const data = await res.json();
       return data ;
      }
    })

console.log(comments)
    const handleSendMessage = (event) =>{
      event.preventDefault()
      const message = event.target.message.value ;
      const commentInfo = {
        comment:message ,
        postId:_id ,
      }
      fetch(`https://social-media-app-server-indol.vercel.app/comment`,{
        method:'POST',
        headers:{
          'content-type':'application/json'
        },
        body:JSON.stringify(commentInfo)
      })
      .then(res=>res.json())
      .then(data=>{
        
        if(data.acknowledged){
          toast.success('successfully added comment')
          refetch()
          event.target.reset();
        }
      })
    }
  
   
    return (
        <div className="card my-10 w-full bg-base-100 shadow-xl">
        <figure><img src={image} className='h-64 object-fill w-full' alt="images" /></figure>

        <div className="card-body">
            <h2 className='text-xl font-extrabold font-mono'>{name && 'Author :'+ name}</h2>
            <h2 className='font-bold my-0' >Published Date : {publishedDate}</h2>
          <p className='text-xl'>{description.length > 10 && description.slice(0,100)}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary"><Link to={`/postDetails/${_id}`}>Show Details</Link></button>
          </div>
        
      <div className='w-full py-5'>
      {
            user && user.uid ?    <div className='flex items-center w-full justify-between'>
              
               <div>
               
                <FaRegHeart className={`text-3xl ${like? 'text-red-500' : ''}  rounded-full `} onClick={handleLick}></FaRegHeart>
               
              
                <button>like:{likes?.length}</button>
              
               </div>

                <div className='lg:flex items-center gap-2'>
                  
                   {
                    comment ? <>
                 <div className=''>
                <form onSubmit={handleSendMessage}>
                <div>
                   <input name='message' type="text" className='input md:w-full input-bordered transition-all duration-1000 ' placeholder='Write Your Comment Here.'/>
                   </div>
                     <div className='my-3 text-right'>
                        <button onClick={()=> setComment(!comment)} className='text-xl mr-2 border border-black px-2 py-1 rounded-full btn-outline'>Cancel</button>
                        <button className='text-xl border border-black px-2 py-1 rounded-full bg-base-300'>send</button>
                     </div>
                </form>
                 </div>
                    </>:''
                   }
                 {
                    !comment &&   <input onClick={handleComment} className='border transition-all duration-500 py-2 px-2 md:px-3  rounded text-xl' type="text" placeholder='Write Your comment' />
                 }
                </div>
            </div> : <h3 className='text-xl text-center'>Please <Link className='text-red-500 underline' to='/login'>Login</Link> For Comment and Like</h3>
        }
      </div>
      <p className='text-xl font-semibold mt-5 '>comments:{comments?.length}</p>
        <div>
          {
            comments?.map((cmt, idx) => <div key={idx}>
              <p>{cmt.comment}</p>
            </div>)
          }
        </div>
        </div>
      </div>
    );
};

export default PostCard;