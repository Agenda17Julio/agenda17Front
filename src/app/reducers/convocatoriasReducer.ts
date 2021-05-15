import types from '../types';
import { i_conv_state as i_state, i_conv_action as i_action } from '../interfaces/reducers/convocatoria';


const init:i_state = {
    events: undefined,
    actives: undefined,
    active: undefined
}

const convocatoriaReducer = (state = init, action:i_action):i_state => {

    const { loadConv,loadActiveConv,activeConv,clearActiveConv } = types;
    const { type, payload } = action;
    

    switch( type ) {
        case loadConv:
            if(payload)
                state = {
                    ...state,
                    events: payload.events
                }
            break;
        case loadActiveConv:
            if(payload)
                state = {
                    ...state,
                    actives: payload.actives
                }
            break;
        case activeConv: 
            if(payload)
                state = {
                    ...state,
                    active: payload.active
                }
            break;
        case clearActiveConv :
            state = {
                ...state,
                active: init.active
            }
            break;
    }

    return state;
}


export default convocatoriaReducer;