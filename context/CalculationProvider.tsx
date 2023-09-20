'use client' 
import React, { createContext, useState} from 'react';

export const CalculationContext = createContext({});

type FormValueType = {
    name: String,
    expression : String,
    result : Number,
}



export default function CalculationProvider({children} : {
    children: React.ReactNode
}){


    const [fromValues, setFormValues] = useState<FormValueType | null>(null);
    const [calculatorInputValue, setCalculatorInputValue] = useState('');

    return <CalculationContext.Provider value={{fromValues, setFormValues,calculatorInputValue, setCalculatorInputValue}}>
        {children}
    </CalculationContext.Provider>
}