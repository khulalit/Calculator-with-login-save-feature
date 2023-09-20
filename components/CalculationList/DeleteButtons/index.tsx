'use client'
import React, {useContext} from 'react'
import Image from 'next/image'
import GarbageIcon from '@/assets/garbage.svg'
import RefreshIcon from '@/assets/refresh.svg'
import { useRouter} from 'next/navigation'
import { CalculationContext } from '@/context/CalculationProvider'

export default function DeleteButtons({id, expression} : {id: String | undefined, expression: String}) {

  const router = useRouter();
  const {setCalculatorInputValue} = useContext<any>(CalculationContext);

  async function deleteCalculation(id : String | undefined) {
    if(!id) return;
    try {
      const res = await fetch('/api/calculation', {
        method : 'delete',
        body : JSON.stringify({
          id : id
        })
      });
      const data = await res.json();
      router.refresh();
      return data.calculations;
      
    } catch (error) {
      return false;
    }
  
  }

  return (
    <>
    <button onClick={()=>{
      setCalculatorInputValue(expression)
    }}><Image src={RefreshIcon} alt='icon' height={20}/></button><button onClick={async ()=>{
        const res = await deleteCalculation(id);
        console.log(res)
      }}><Image src={GarbageIcon} alt='icon' height={20}/></button>
    </>
  )
}
