import { useEffect } from 'react';
import { ChipsOptions, ModalOptions } from "materialize-css";
import { useDispatch, useSelector } from "react-redux";
import { setListConv } from "../actions/convocatoria";
import { clearActiveFab, clearCalendarDate, closeModal } from "../actions/ui";
import { i_redux } from '../interfaces/redux';



const Materialize = (ref:any, ref_chip:any) => {

    const dispatch = useDispatch();
    const { ui:{ modal }, conv: { users } } = useSelector((info:i_redux) => info);
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
        onChipAdd: () => dispatch(setListConv(mapData(instanceChips.chipsData))),
        onChipSelect: () => {},
        onChipDelete: () => dispatch(setListConv(mapData(instanceChips.chipsData))),
          
    }

    useEffect(() => {
        modalInstance = M.Modal.init(ref.current, opciones);    
        instanceChips = M.Chips.init(ref_chip.current, opcionesChips);
        instanceChips.autocomplete.options.data = data_usr;
        
        if( modal ) modalInstance.open();

        return () => {
            modalInstance && modalInstance.destroy();
            instanceChips && instanceChips.destroy();
        };
    },[ref,modal,ref_chip]);

}


export default Materialize;