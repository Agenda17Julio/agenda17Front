import { useEffect } from 'react';
import { ChipsOptions, ModalOptions } from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { setListConv } from "../actions/convocatoria";
import { clearActiveFab, clearCalendarDate, closeModal } from "../actions/ui";
import { i_redux } from '../interfaces/redux';



const Materialize = (ref:any, ref_chip:any) => {

    const dispatch = useDispatch();
    const { ui:{ modal }, conv: { users,active } } = useSelector((info:i_redux) => info);
    const mapData = (data:Array<any>) => data.map((elem:any) => elem.tag);
    const usuarios = users as string[];
    let data_usr:any = {}

    for (const i in usuarios) {
        data_usr = { ...data_usr, [usuarios[i]]: null }
    }


    let modalInstance: M.Modal;
    let instanceChips:M.Chips;
    
    const opciones:ModalOptions = {
        opacity: 0.5,
        inDuration: 250,
        outDuration: 250,
        preventScrolling: true,
        startingTop: '4%',
        endingTop: '10%',
        dismissible: true,
        onCloseEnd: () => {},
        onOpenEnd: () => {},
        onOpenStart: () => {},
        onCloseStart: () => {
            dispatch(closeModal())
            dispatch(clearCalendarDate());
            dispatch(clearActiveFab());
        }
    }


    const opcionesChips:ChipsOptions = {
        data:                   [],
        placeholder:	        'Destinatarios',
        secondaryPlaceholder:	'+Add',
        autocompleteOptions:	{
            data: {},
            limit: Infinity,
            minLength: 1
        },
        limit:	                Infinity,
        onChipAdd: () => { 
            instanceChips.chipsData.forEach(({tag}:{tag:string}, index:number) => {
                if(!validateEmail(tag)){
                    instanceChips.deleteChip( index );
                }
            })
            dispatch(setListConv(mapData(instanceChips.chipsData)))
        },
        onChipSelect: () => {},
        onChipDelete: () => dispatch(setListConv(mapData(instanceChips.chipsData))),
          
    }

    useEffect(() => {
        modalInstance = M.Modal.init(ref.current, opciones);    
        instanceChips = M.Chips.init(ref_chip.current, opcionesChips);
        instanceChips.autocomplete.options.data = data_usr;


        if( active?.to ){
            for (const i in active.to) {
                instanceChips.addChip({tag:active.to[i]})
            }
        }
        
        if( modal ) modalInstance.open();

        return () => {
            modalInstance.destroy();
            instanceChips.destroy();
        };

    },[ref,modal,ref_chip]);
}


function validateEmail(email:string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


export default Materialize;