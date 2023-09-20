'use client'
import { useContext } from 'react';
import { CalculationContext } from '@/context/CalculationProvider';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function SaveFrom() {

    const {fromValues, setFormValues} = useContext<any>(CalculationContext);
    const router = useRouter();
    const session = useSession();

    function handleSubmit(e: any){
        e.preventDefault();
        setFormValues({...fromValues, email : 'lalitkhu@gmail.com'})
        fetch('/api/calculation',{
            method : 'post',
            body : JSON.stringify(fromValues),
        }).then((res)=>{
            return res.json();
        }).then(result=>{
            console.log(result)
            router.refresh();
        }).catch(err=>{
            console.log(err)
        })
    }

    return (
        <form className='flex justify-between gap-4' onSubmit={handleSubmit}>
            <input type='text' name='name' className='px-2 py-1 border-2 rounded-md border-gray-200' placeholder='Enter name' onChange={(e)=>{
                setFormValues({
                    ...fromValues,
                    name : e.target.value
                })
            }} required/>
            { session.status !== 'unauthenticated' && <button type='submit' className='bg-blue-700 px-4 py-1 rounded-md text-white'>Save</button>}
        </form>
    )
}
