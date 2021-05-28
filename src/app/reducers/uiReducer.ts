import { i_ui_action as i_action, i_ui_state as i_state } from '../interfaces/reducers/ui';
import types from '../types';

const init:i_state = {
    loading: false,
    modal: false,
    fab: {
        plus: undefined,
        edit: undefined,
        del: undefined
    },
    calendarDate: new Date(),
    pagina: 1
}

const uiReducer = ( state = init, action: i_action ):i_state => {
    const { startLoading, stopLoading,openModal,closeModal,setCalendarDate,
        activePlusFab,activeEditFab,clearActiveFab,clearCalendarDate,setPag, clearPag } = types;
    
    const { type,payload } = action;

    switch( type ){
        case startLoading:
            state = {
                ...state,
                loading: true
            }
            break;
        case stopLoading:
            state = {
                ...state,
                loading: init.loading
            };
            break;
        case openModal: 
            state = {
                ...state,
                modal: true
            }
            break;
        case closeModal:
            state = {
                ...state,
                modal: init.modal
            }
            break;
            case activePlusFab: 
            state = {
                ...state,
                fab: {
                    plus: true,
                    edit: false,
                    del: false
                }
            }
            break;
        case activeEditFab:
            state = {
                ...state,
                fab: {
                    plus: false,
                    edit: true,
                    del: true
                }
            }
            break;
        case clearActiveFab:
            state = {
                ...state,
                fab: init.fab
            };
            break;
        case setCalendarDate:
            if(payload)
                state = {
                    ...state,
                    calendarDate: payload?.calendarDate
                }
            break;
        case clearCalendarDate:
            state = {
                ...state,
                calendarDate: init.calendarDate
            }
            break;
        case setPag:
            if(payload?.pagina)
                state = {
                    ...state, 
                    pagina: payload.pagina
                }
            break;
        case clearPag:
            state = {
                ...state,
                pagina: init.pagina
            }
            break;
    }


    return state;
}

export default uiReducer;