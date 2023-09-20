import { MouseEventHandler } from 'react';
import './styles.css';
type CalculatorButtonProps = {
    displayKey: string;
    varient: 'number' | 'operator' | 'function',
    onclick : MouseEventHandler<HTMLButtonElement>,
}


function CalculatorButton({ displayKey, varient, onclick}: CalculatorButtonProps) {


    function getColorBasedOnVarientProp(varient:string){
        switch(varient){
            case 'number' : 
                return 'bg-calculator-btn-1'
            case 'function' :
                return 'bg-calculator-btn-2'
            case 'operator' : 
                return 'bg-calculator-btn-3'
        }
    }
    return (
        <button className={`${getColorBasedOnVarientProp(varient)} ${displayKey === '0' ? 'grid-span-2':''} text-white px-4 h-[70px] text-[1.5rem]`} onClick={onclick} > 
            {displayKey}
        </button>
    )
}


export default CalculatorButton;