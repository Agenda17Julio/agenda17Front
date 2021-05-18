import M, { ModalOptions } from "materialize-css";
import { DetailedHTMLProps, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearActiveFab, clearCalendarDate, closeModal } from "../../actions/ui";
import { i_redux } from "../../interfaces/redux";


const Modal = ({ children }:DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>) => {

    const ref = useRef(null);
    let modalInstance:any;
    const dispatch = useDispatch();

    const { modal,fab } = useSelector((info:i_redux) => info.ui);

    useEffect(() => {
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
                dispatch(clearActiveFab())
            }
        }
        modalInstance = M.Modal.init((ref.current as any), opciones);   
        
        if( modalInstance && modal ) modalInstance.open()

    },[ref,modalInstance, modal]);

    return <div id="modal1" className="modal" ref={ ref }> 
        <div className="modal-content">
                <h4>{
                    fab?.plus ? 'Crear Convocatoria' : 'Editar Convocatoria'
                }</h4>
                { children } 
        </div>
        
    </div>
}

export default Modal;