import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading';
import PostCard from '../Media/PostCard';

const MostViewPost = () => {
    const {data=[], isLoading} = useQuery({
        queryKey:[],
        queryFn:async()=>{
            const res = await fetch('https://social-media-app-server-indol.vercel.app/postInformation');
            const data = await res.json();
            return data
        }
        
    })
    // if(isLoading){
    //     return <Loading></Loading>
    // }
    return (
        <section>
            <div className='max-w-screen-xl mx-auto'>
                <div className='w-1/3 mx-auto my-10'>
                    {
                        data && data.map(item=><PostCard
                        key={item._id}
                        postInfo={item}
                        ></PostCard>)
                    }

                </div>
            </div>
        </section>
    );
};

export default MostViewPost;