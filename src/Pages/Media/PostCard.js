import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import { FaBeer, FaHandHoldingHeart, FaRegHeart } from "react-icons/fa";
import { toast } from 'react-hot-toast';
const PostCard = ({postInfo}) => {
    const {user} = useContext(AuthContext)
    const {_id, description, image, react ,publishedDate,  name} = postInfo ;
    const [like , setLike] = useState(false);
    const [comment , setComment] = useState(false);
    const handleLick = () =>{
        setLike(!like)
        localStorage.setItem('like', like )
        toast.success('successfully added like')
    }
    const handleComment = () =>{
        setComment(!comment)
        console.log(comment)
    }

    return (
        <div className="card my-10 w-full bg-base-100 shadow-xl">
        <figure><img src={image} className='h-64 object-fill w-full' alt="images" /></figure>

        <div className="card-body">
            <h2 className='text-xl font-extrabold font-mono'>{name && 'Author :'+ name}</h2>
            <h2 className='font-bold my-0' >Published Date : {publishedDate}</h2>
          <p className='text-xl'>{description.length > 10 && description.slice(0,100)}</p>
          <h3 className='text-xl font-extrabold font-mono'>React: {react ? react : 0}</h3>
          <div className="card-actions justify-end">
            <button className="btn btn-primary"><Link to={`/postDetails/${_id}`}>Show Details</Link></button>
          </div>
        
      <div className='w-full py-5'>
      {
            user && user.uid ?    <div className='flex items-center w-full justify-between'>
              
               <div>
               
                <FaRegHeart className={`text-3xl ${like? 'text-red-500' : ''}  rounded-full `} onClick={()=>handleLick(!like)}></FaRegHeart>
               
              
                <button>like</button>
               </div>

                <div className='lg:flex items-center gap-2'>
                  
                   {
                    comment ? <>
                 <div className=''>
                 <div>
                   <input type="text" className='input md:w-full input-bordered transition-all duration-1000 ' placeholder='Write Your Comment Here.'/>
                   </div>
                     <div className='my-3 text-right'>
                        <button onClick={()=> setComment(!comment)} className='text-xl mr-2 border border-black px-2 py-1 rounded-full btn-outline'>Cancel</button>
                        <button className='text-xl border border-black px-2 py-1 rounded-full bg-base-300'>send</button>
                     </div>
                 </div>
                    </>:''
                   }
                 {
                    !comment &&    <label htmlFor=""><button onClick={handleComment} className='border transition-all duration-500 py-2 px-2 md:px-3 bg-base-300 rounded text-xl'>comment</button></label>
                 }
                </div>
            </div> : <h3 className='text-xl text-center'>Please <Link className='text-red-500 underline' to='/login'>Login</Link> For Comment and Like</h3>
        }
      </div>
    
        </div>
      </div>
    );
};

export default PostCard;