import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../Shared/Loading';
import PostCard from './PostCard';

const Media = () => {
    const {data:postInformation = [], isLoading} = useQuery({
        queryKey:['postInformation'],
        queryFn:async()=>{
           const res = await fetch('https://social-media-app-server-indol.vercel.app/postInformation')
           const data = await res.json()
           return data ;
        }
        
    })

    console.log(postInformation)
    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <main>
            <section>
            <div className='max-w-screen-xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            {
                postInformation.length > 0 && postInformation.map(info =><PostCard key={info._id}
                postInfo = {info}
                ></PostCard>)
            }
        </div>
            </section>
        </main>
    );
};

export default Media;