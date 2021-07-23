import { ModalOptions } from "materialize-css";
import { useRef } from "react";
import { useEffect } from "react";
import { createPortal } from "react-dom";


const portal_modal_actas = document.getElementById('portal-modal-actas') as HTMLElement;

const ModalActas = ({ children, isOpen, setOpenModal }:{children:any,isOpen:boolean, setOpenModal:Function}) => {


    let modalInstance = useRef<any>(null);
    const ref_modal = useRef<any>(null);

    useEffect(() => {
        const modalOptions:ModalOptions = {
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
                setOpenModal(false);
            }
        }
        const modal = ref_modal.current as HTMLElement;
        modalInstance.current = M.Modal.init(modal, modalOptions);
        
        return () =>  modalInstance.current.destroy();
    
    },[modalInstance, setOpenModal]);

    
    useEffect(() => {
        if( isOpen ) {
            modalInstance.current.open();
        }else {
            modalInstance.current.close();
        }
    },[isOpen, modalInstance]);


    return createPortal(<div ref={ ref_modal } className='modal'>
        { children }
    </div>, portal_modal_actas)
}

export default ModalActas;