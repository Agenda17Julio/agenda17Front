import { useState } from 'react';

const UseForm = ( init:any ) => {
    const [value, setValue] = useState(init);

    const reset = () => setValue(init);

    const inputOnChange = (e:Event) => {
        const target = e.target as HTMLInputElement;
        const { name, value, checked, type } = target;
        const val = type === 'checkbox' ? checked : value ;

        setValue((prevState:any) => ({
            ...prevState,
            [name]: val
        }))
    }

    return [
        value,
        inputOnChange,
        reset
    ]
}   


export default UseForm;