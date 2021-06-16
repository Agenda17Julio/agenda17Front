import types from '../types';
import { i_conv_state as i_state, i_conv_action as i_action } from '../interfaces/reducers/convocatoria';


const init:i_state = {
    typeList: 'all'
}

const convocatoriaReducer = (state = init, action:i_action):i_state => {

    const { loadConv,loadActiveConv,activeConv,clearActiveConv,addConv,
        listToConv,clearListToConv,deleteActiveConv,getUsers,typeListConv,updateActiveConv } = types;
    const { type, payload } = action;
    

    switch( type ) {
        case loadConv:
            if(payload)
                state = {
                    ...state,
                    convocatorias: payload.convocatorias
                }
            break;
        case typeListConv:
            if( payload )
                state = {
                    ...state,
                    typeList: payload.typeList
                }
            break;
        case loadActiveConv:
            if(payload)
                state = {
                    ...state,
                    actives: payload.actives
                }
            break;
        case deleteActiveConv:
            if(payload?.aux)
                state = {
                    ...state,
                    actives: state.actives?.filter(conv => {
                        if(conv.id?.toString() !== payload.aux?.id?.toString()) return conv;
                    }) 
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
        case updateActiveConv:
            if(payload?.aux && state.actives) {
                state = {
                    ...state,
                    actives: state.actives?.map(conv => {
                        if(conv.id == payload.aux?.id ){
                            return payload.aux as any
                        } else {
                            return conv;
                        }
                    }) 
                }
            } else if( state.convocatorias && payload?.aux ){
                state = {
                    ...state,
                    convocatorias: {
                        data: state.convocatorias.data.map(conv => {
                            if(conv.id == payload.aux?.id ){
                                return payload.aux as any
                            } else {
                                return conv;
                            }
                        }),
                        registros: state.convocatorias.registros
                    }
                }
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
        
        case getUsers: state = { ...state, users: payload?.users }; break;

    }

    return state;
}


export default convocatoriaReducer;