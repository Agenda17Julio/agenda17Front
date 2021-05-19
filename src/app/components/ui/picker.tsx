import {Timepicker } from "materialize-css";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { i_redux } from "../../interfaces/redux";


const Picker = () => {

    const ref = useRef(null);
    let Instance:any;
    // const dispatch = useDispatch();

    const { calendarDate } = useSelector((info:i_redux) => info.ui);

    useEffect(() => {

        Instance = Timepicker.init((ref.current as any));   
        
        if( Instance ) Instance.open()

    },[ref,Instance]);

    return <input type="text" className="timepicker" ref={ ref }/>
}

export default Picker;