import { i_ui_action as i_action, i_ui_state as i_state } from '../interfaces/reducers/ui';
import types from '../types';

const init:i_state = {
    loading: false,
    modal: false,
    fab: {
        plus: false,
        edit: false,
        del: false,
        view: false
    },
    calendarDate: new Date(),
    pagina: 1,
    files: [],
    activefile: undefined,
    delactivefile: false
}

const uiReducer = ( state = init, action: i_action ):i_state => {
    const { startLoading, stopLoading, openModal, closeModal, setCalendarDate,
        activePlusFab, activeEditFab, clearActiveFab, clearCalendarDate, setPag, 
        clearPag, setFiles,deleteFileLocal,setActiveFile,clearDelActiveFile,
        clearActiveFile,delActiveFile,clearAllFiles,activeView } = types;
    
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
                    del: false,
                    view: false
                }
            }

            break;
        case activeView: 
            state = {
                ...state,
                fab: {
                    plus: false,
                    edit: false,
                    del : false,
                    view: true
                }
            }

            break;
        case activeEditFab:
            state = {
                ...state,
                fab: {
                    plus: false,
                    edit: true,
                    del: true,
                    view: false
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
        case setFiles:
            state = {
                ...state,
                files: payload?.files
            }
            break;
        case deleteFileLocal: {
            state = {
                ...state,
                files: state.files?.filter(f => f.name !== payload?.filename)
            }
            break;
        }
        case setActiveFile:
            state = {
                ...state,
                activefile: payload?.activefile
            }
            break;
        case clearActiveFile: 
            state = {
                ...state,
                activefile: init.activefile
            }
            break;
        case delActiveFile:
            state = {
                ...state,
                delactivefile: true
            }
            break;
        case clearDelActiveFile:
            state = {
                ...state,
                delactivefile: init.delactivefile
            }
            break;
        case clearAllFiles:
            state = {
                ...state,
                files: init.files
            }
            break;
    }


    return state;
}

export default uiReducer;