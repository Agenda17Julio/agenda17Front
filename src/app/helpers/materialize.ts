import { ModalOptions } from "materialize-css";

import { clearActiveFab, clearActiveFile, clearCalendarDate, clearDelActiveFile, closeModal } from "../actions/ui";


export const Modal = ( dispatch:Function ):ModalOptions => {

    return {
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
            dispatch(closeModal());
            dispatch( clearActiveFile() );
            dispatch( clearDelActiveFile() );
            dispatch(clearCalendarDate());
            dispatch(clearActiveFab());
        }
    }
}