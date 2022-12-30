import React, { useContext } from 'react';
import AddPost from '../AddPost';
import MostViewPost from '../MostViewPost';

const Home = () => {
    return (
        <div className='bg-gray-300'>
            <AddPost></AddPost>
            <MostViewPost></MostViewPost>
        </div>
    );
};

export default Home;