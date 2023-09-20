'use client'
import { useState, useContext, Fragment} from 'react'
import CalculatorButton from '../CalculatorButton'
import CALCULATOR_BUTTON from '@/constants/Button'
import { CalculationContext } from '@/context/CalculationProvider'

export default function CalculatorComponent({setFormData}: any) {
    const {fromValues, setFormValues, calculatorInputValue, setCalculatorInputValue} = useContext<any>(CalculationContext);
    const [toggleValue, setToggleValue] = useState('');

    
    function handleClick(label: string, type: 'number' | 'operator' | 'function'){

        if(label === '='){
            const expression = calculatorInputValue;
            try {
                const expressionWithDivision = expression.replace(/%/g, '/100*');
                const val = eval(expressionWithDivision);
                setCalculatorInputValue(val);
                setFormValues({
                    ...fromValues,
                    expression : expression,
                    result : val,
                })
                return;
            } catch (error) {
                setCalculatorInputValue('Invalid input');
                return;
            }
        } 
        if(label === 'AC') setCalculatorInputValue('');
        if(type === 'number' || type === 'operator' || label === '%')
            setCalculatorInputValue((prev:String)=> prev + label)
    }
    return (
        <div className='w-[300px]'>
            <div className='bg-calculator-display py-1 px-2 text-[2.5rem] text-white w-full h-[80px] flex justify-end items-center' style={{overflowWrap: 'break-word'}}>
                {calculatorInputValue}
            </div>
            <div className='grid grid-cols-4 gap-[1px] bg-calculator-display'>
                {CALCULATOR_BUTTON.map(({ label, type, id}) =><Fragment key={id}>
                    <CalculatorButton displayKey={label} varient={type} onclick={()=>{
                        handleClick(label, type)
                    }}/>
                    </Fragment>
                )}
            </div>
        </div>
    )
}
