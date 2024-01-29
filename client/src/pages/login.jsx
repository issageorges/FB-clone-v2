import React from 'react';
import { useUserContext } from "../context/user-context";
import Footer from '../components/footer';
export default function Login() {
  const { loginHandler } = useUserContext();

  return (
    <>
    <div className="flex items-center justify-center  bg-gray-100 px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-start w-full max-w-4xl bg-white shadow-md">
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="text-5xl font-bold text-blue-600 mb-4">facebook</h2>
          <p className="text-xl">Connect with friends and the world around you on Facebook.</p>
        </div>
        <div className="md:w-1/2 p-6">
          <form onSubmit={loginHandler} className="flex flex-col">
            <input className="mb-3 p-2 border rounded-md" type="email" name="email" placeholder="Email or phone number" />
            <input className="mb-3 p-2 border rounded-md" type="password" name="password" placeholder="Password" />
            <button type="submit" className="mb-3 p-2 bg-blue-600 text-white rounded-md">Log In</button>
            <a href="#" className="text-sm text-blue-700 hover:underline">Forgot password?</a>
            <hr className="my-4" />
            <button type="button" className="p-2 bg-green-600 text-white rounded-md">Create New Account</button>
          </form>
        </div>
     
      </div>
      
    </div>
       <Footer/>
       </>
    
  );
}

