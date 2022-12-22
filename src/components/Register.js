import React from 'react';
import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const handleRegister = data =>{
        console.log(data)
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleRegister)}>
                <input {...register("name")} type="text" placeholder='Your Name....' />
                <input {...register("phone")} type="text" placeholder='Your Phone....' />
                <input {...register("email")} type="email" placeholder='Your Email....' />
                <input {...register("address")} type="text" placeholder='Your Address....' />
                <input {...register("password")} type="password" placeholder='Your Password....' />
                <button type='submit'>Register</button>
            </form>
        </div>
    );
};

export default Register;