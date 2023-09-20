type CalculatorButtonObjProps = {
    id: string,
    label: string,
    type: 'number' | 'operator' | 'function'
}
const CALCULATOR_BUTTON : CalculatorButtonObjProps[] = [
    { id: 'clear', label: 'AC', type: 'function' },
    { id: 'delete', label: '+/-', type: 'function' },
    { id: 'percentage', label: '%', type: 'function' },
    { id: 'divide', label: '/', type: 'operator' },
    { id: 'seven', label: '7', type: 'number' },
    { id: 'eight', label: '8', type: 'number' },
    { id: 'nine', label: '9', type: 'number' },
    { id: 'multiply', label: '*', type: 'operator' },
    { id: 'four', label: '4', type: 'number' },
    { id: 'five', label: '5', type: 'number' },
    { id: 'six', label: '6', type: 'number' },
    { id: 'subtract', label: '-', type: 'operator' },
    { id: 'one', label: '1', type: 'number' },
    { id: 'two', label: '2', type: 'number' },
    { id: 'three', label: '3', type: 'number' },
    { id: 'add', label: '+', type: 'operator' },
    { id: 'zero', label: '0', type: 'number' },
    { id: 'decimal', label: '.', type: 'number' },
    { id: 'equals', label: '=', type: 'operator' },
];

export default CALCULATOR_BUTTON;