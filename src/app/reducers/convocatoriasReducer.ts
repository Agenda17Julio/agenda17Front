import types from '../types';
import { i_conv_state as i_state, i_conv_action as i_action } from '../interfaces/reducers/convocatoria';


const init:i_state = {
    events: undefined,
    actives: undefined,
    active: undefined,
    aux: undefined
}

const convocatoriaReducer = (state = init, action:i_action):i_state => {

    const { loadConv,loadActiveConv,activeConv,clearActiveConv,addConv,listToConv,clearListToConv } = types;
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
        case addConv:
            if( state.actives && payload?.aux )
                state = {
                    ...state,
                    actives: [ ...state.actives, payload.aux]
                }
            break;
        case listToConv:
            state = {
                ...state,
                listConv: payload?.listConv
            }
            break;
        case clearListToConv:
            state  = { ...state, listConv: init.listConv } 
            break;
    }

    return state;
}


export default convocatoriaReducer;