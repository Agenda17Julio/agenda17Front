import { useEffect, useRef } from "react";
import { Chips,ChipsOptions } from 'materialize-css';
import { useDispatch } from "react-redux";
import { setListConv } from "../../actions/convocatoria";


const ChipsSelector = () => {
    const ref = useRef(null);
    let instance:any;

    const dispatch = useDispatch();

    const mapData = (data:Array<any>) => data.map((elem:any) => elem.tag);

    useEffect(() => {
        const opciones:ChipsOptions = {
            data:                   [],
            placeholder:	        'Destinatarios',
            secondaryPlaceholder:	'+Add',
            autocompleteOptions:	{ 
                data: {
                    'jbpaig@gmail.com': null,
                    'pepe.37285@gmail.com': null,
                    'carla@gmail.com': null,
                    'antonioLazzo@gmail.com':null
                },
                limit: Infinity,
                minLength: 1
            },
            limit:	                Infinity,
            onChipAdd: () => dispatch(setListConv(mapData(instance.chipsData))),
            onChipSelect: () => {},
            onChipDelete: () => dispatch(setListConv(mapData(instance.chipsData))),
        };

        instance = Chips.init((ref.current as any), opciones);   
        
        

    },[ref,instance])

    return <div className="chips chips-autocomplete" ref={ ref }> </div>
}

export default ChipsSelector;