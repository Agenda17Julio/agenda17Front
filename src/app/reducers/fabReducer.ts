import { i_fab_action as i_action, i_fab_state as i_state } from '../interfaces/reducers/fab';
import types from '../types';

const init:i_state = {
    plus: undefined,
    editDelete: undefined
}

const fabReducer = ( state = init, action: i_action ):i_state => {
    const { activePlusFab,activeEditFab,clearActiveFab } = types;
    const { type } = action;
    

    switch( type ) {
        case activePlusFab: 
            state = {
                ...state,
                plus: true,
                editDelete: false
                
            }
            break;
        case activeEditFab:
            state = {
                ...state,
                plus: false,
                editDelete: true
                
            }
            break;
        case clearActiveFab:
            state = init;
            break;
    }

    return state;
}

export default fabReducer;