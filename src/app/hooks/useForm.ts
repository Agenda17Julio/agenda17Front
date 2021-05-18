import { useState } from 'react';

const UseForm = ( init:any ) => {
    const [value, setValue] = useState(init);

    const reset = () => setValue(init);

    const inputOnChange = (e:Event) => {
        const target = e.target as HTMLInputElement;
        const { name, value, checked, type,files } = target;
        let val:any = value;

        switch( type ){
            case 'checkbox':
               val = checked;
            break;
            case 'file': 
                val = files;
            break;
        }

        setValue((prevState:any) => ({
            ...prevState,
            [name]: val
        }))
    }

    return [
        value,
        inputOnChange,
        setValue,
        reset
    ]
}   


export default UseForm;