import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../contexts/AuthProvider';


const ModalEdit = ({userData, submit , setSubmit , refetch}) => {
    const  {user} = useContext(AuthContext)
    
   
    const handleEditInfo = event =>{
        event.preventDefault();
        const name = event.target.name.value ;
        const collage = event.target.collage.value ;
        const address = event.target.address.value ;
        const image = event.target.image.files[0];
        const formData = new FormData();
        formData.append('image', image);
         // upload image in imgbb
         fetch(`https://api.imgbb.com/1/upload?&key=${process.env.REACT_APP_IMG_BB_KEY}`,{
            method:'POST',
            body:(formData)
        })
        .then(res=>res.json())
        .then(result =>{
           
                const imageUrl = result.data.display_url ;
                const information = {
                    name,
                    collage,
                    address,
                    image : imageUrl,
                }

                // send data server to database
                fetch(`https://social-media-app-server-indol.vercel.app/users/${user?.email}`,{
                    method:"PUT",
                    headers:{
                        'content-type':'application/json'
                    },
                    body:JSON.stringify(information)
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.acknowledged){
                        toast.success('successfully edited details')
                        refetch()
                        setSubmit(false)
                    }
                })
                
                })
      
    }

    return (
        <div>
<input type="checkbox" id="Edit-modal" className="modal-toggle" />
<div className="modal">
  <div className="modal-box">
        <div>
            <form onSubmit={handleEditInfo}>
                <input className='input input-bordered w-full text-xl' type="text" name='name' defaultValue={userData?.name} />
                <div className='my-2'>
                <label >Select profile</label>
                <input className='input my-1 py-2 input-bordered w-full text-xl' type="file" name='image' />
                </div>
                <input className='input my-3 input-bordered w-full text-xl' type="text" name='address' defaultValue={userData && userData.address } placeholder='your address' />
                <input className='input  input-bordered w-full text-xl' type="text" name='collage' defaultValue={userData && userData.collage} placeholder='your collage' />
                
                <div className="modal-action">
                <button htmlFor='Edit-modal' className='btn btn-primary'>{setSubmit ? 'Update': 'loading'}</button>
       <label htmlFor="Edit-modal" className="btn">Cancel</label>
     </div>
            </form> 
        </div>
   
  </div>
</div>
        </div>
    );
};

export default ModalEdit;