import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';

const AddPost = () => {
    const {user} = useContext(AuthContext)
    const handlePostSubmit = event =>{
        event.preventDefault();
        const postInfo = event.target.postInfo.value ;
        const image = event.target.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
        // get post date
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 
        let yyyy = today.getFullYear();
        today = mm + '/' + dd + '/' + yyyy;

        // upload image in imgbb
        fetch(`https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_IMG_BB_KEY}`,{
            method:'POST',
            body:(formData)
        })
        .then(res=>res.json())
        .then(result =>{
            if(result.status){
                const imageUrl = result.data.display_url ;
                const postInformation = {
                    description: postInfo ,
                    image : imageUrl,
                    name:user && user?.displayName ,
                    publishedDate: today
                }
                // post information store in database
                fetch('http://localhost:5000/postInformation',{
                    method:'POST',
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(postInformation)
                })
                .then(res=>res.json())
                .then(data=>{
                    if(data.acknowledged){
                        toast.success('post published successfully')
                        event.target.reset();
                    }
                })
            }
         
        })
    }
    return (
        <main >
            <section className='bg-gray-300 py-10 rounded-2xl  '>
                <div className='text-center my-10 max-w-screen-xl mx-auto'>
                    <form onSubmit={handlePostSubmit}>
                       <div>
                       <textarea name="postInfo" id="" cols="30" rows="10" className='input input-bordered resize-none w-1/3 py-2 text-bold placeholder:text-gray-500 placeholder:font-bold placeholder:font-mono h-32' placeholder='write something About Your Post'></textarea>
                       </div>
                      <div>
                      <input name='image' className='w-1/3 my-3 py-5 bg-gray-100 file-input-info file:w-1/3 text-center rounded text-xl cursor-pointer px-10 file:text-mono' type="file"/>
                     
                      </div>
                      <div>
                        <button className='btn btn-primary px-10 text-xl w-1/3 '>POST</button>
                      </div>
                     
                    </form>
                </div>
            </section>
        </main>
    );
};

export default AddPost;