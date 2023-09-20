'use client'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { useSession } from 'next-auth/react'
import Link from 'next/link';

export default function Header() {

    const {data: session} = useSession();

    const [open, setOpen] = useState(false);

    return (
        <div className='absolute left-0 top-0 text-white bg-blue-700 px-4 py-2'>
            {open && session ? "Welcome user  ":''}
            {open ?
            session?.user ? <button className=" border-2 border-white rounded-lg px-2 mr-2" onClick={()=>{
                signOut();
            }}>Sign Out</button> : <Link href='/api/auth/signin' className='border-2 border-white rounded-lg px-2 mr-2'>Sign In</Link> : null}
            <button className='font-extrabold text-white' onClick={()=>setOpen(!open)}>
                {open ? 'X' : '>'}
            </button>
        </div>
    )
}
