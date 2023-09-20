'use client'
import React from 'react';
export default function SignupForm() {

    const formRef = React.useRef<HTMLFormElement>(null)

    function submitHanlder(e:any) {
        e.preventDefault();
        const form = new FormData(formRef.current || undefined)
        const email = form.get('username');
        const password = form.get('password');
        singup({email, password});

        
    }

    return (
        <form className="bg-white p-6 max-w-[500px] m-auto mt-36 rounded-lg shadow-md" onSubmit={submitHanlder} ref={formRef}>
            <h1 className="text-3xl text-gray-700 font-bold text-center mb-8">Sign Up</h1>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Email</label>
                <input
                    className="border p-2 w-full rounded"
                    type="email"
                    name='username'
                    required
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">
                    Password
                </label>
                <input
                    className="border p-2 w-full rounded"
                    type="password"
                    name='password'
                    required
                    maxLength={20}
                    minLength={6}
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
                Sign Up
            </button>
        </form>
    )
}

async function singup(data : any){
    try {
        const res = await fetch('/api/signup',{
                        method : 'post',
                        body :JSON.stringify(data)
                    })
        const result  = await res.json();
        if(result?.status === 'success')
            return true;
        if(res.status === 409)
            alert('Email already exists');
        return false;
        
    } catch (error) {
        alert("Faild to send data")
    }  
}